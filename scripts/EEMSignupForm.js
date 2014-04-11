//--------------------------------------------------------------------
// You may set the Signup Form Context by passing one of the following
//   supported values thru the Query String:
//   * NewSubscriber (Default): Upon submission, addes a new subscriber
//       with all information supplied on the Signup Form.
//   * UpdSubscriber: Updates an existing subscriber with the information
//       supplied thru the Signup Form.
//     NOTE: Expects SID to be provided thru the Query String.
//   * Preview: Performs validation of submission without actually adding
//       a subscriber.
//--------------------------------------------------------------------
function SFContextInit (ctrlID)
{
    var hidSFContext;
    var lblPreview;
    var sfContext;

    sfContext = Request.QueryString["SFContext"];
    hidSFContext = document.getElementById (ctrlID);
    if ( hidSFContext == null )
        hidSFContext = document.getElementById ('SFContext'); //%% 
    hidSFContext.value = (sfContext != null) ? sfContext : "NewSubscriber";

    if ( hidSFContext.value == "Preview" )
    {
        lblPreview = document.getElementById ('lblPreview');
        if ( lblPreview != null )
            lblPreview.style.display = '';
    }

    return (hidSFContext);
}

function EEMSFQuestion (ctrl, name, id, type, isReq, text, multiAnswerList)
{
    this.Ctrl = ctrl;
    this.Name = name;
    this.ID = id;
    this.Type = type;
    this.IsReq = isReq;
    this.Text = text;
    this.MultiAnswerList = multiAnswerList;
}

function EEMSFQuestionAnswer (ctrl, name, questionID, answerID)
{
    this.Ctrl = ctrl;
    this.Name = name;
    this.QuestionID = questionID;
    this.AnswerID = answerID;
}

function EEMSFQuestionCtrlHandler (ctrl, matches)
{
    var eemSFQuestion;
    var id;
    var type;
    var isReq;
    var text;

    id = (matches.length > 0) ? matches[1] : -1;
    type = ctrl.getAttribute ('eemSFQType');
    isReq = ctrl.getAttribute ('eemSFQIsReq').toLowerCase();
    text = ctrl.getAttribute ('eemSFQText');

    eemSFQuestion = new EEMSFQuestion (ctrl, ctrl.name, id, type, isReq, text, null);

    return (eemSFQuestion);
}

function EEMSFQuestionAnswerCtrlHandler (ctrl, matches)
{
    var sfQAnswer;
    var answerID;
    var questionID;

    answerID = (matches.length > 1) ? matches[1] : -1;
    questionID = (matches.length > 2) ? matches[2] : -1;
    sfQAnswer = new EEMSFQuestionAnswer (ctrl, ctrl.name, questionID, answerID);

    return (sfQAnswer);
}

function SFInit()
{
    SFContextInit ('hidSFContext');
    SFStageInit ('hidSFStage');
    SFErrorInit ('tblSFError', 'tdSFError');
}

function SFValidateFields()
{
    var txtSFEmail;
    var ctrlQuestion;
    var eemSFQIsReq;
    var eemSFQuestion;
    var qIDList;
    var nIdx;
    var isAllValid = true;
    var isReqValid = true;
    var isReqFieldValid = true;
    var isValid = true;
    var errMsg = "";

    // Validate Email address.
    txtSFEmail = document.getElementById ('txtSFEmail');
	var email = txtSFEmail.value;
	email = email.replace(new RegExp(/^\s+/),""); //Remove leading white space
	email = email.replace(new RegExp(/\s+$/),""); //Remove trailing white space
	txtSFEmail.value = email;
    isValid = SFIsValidEmail (email);
    if ( txtSFEmail.value == "" )
        errMsg += '* Please provide a valid email address;\n  (e.g. johndoe@mydomain.com).\n';
    else if ( !isValid )
        errMsg += '* "' + txtSFEmail.value + '" does not seem to be a valid email address;\n  (e.g. johndoe@mydomain.com).\n';
    isAllValid = (isAllValid && isValid);

	// Get all controls with name matching "eemSFQuestion<#>".
	qIDList = SFGetFormVarMatches (/eemSFQuestion(\d*)/, 'input,select,div', EEMSFQuestionCtrlHandler);
    
    // Validate all required questions.
    for (nIdx = 0; nIdx < qIDList.length; nIdx++)
    {
        eemSFQuestion = qIDList[nIdx];
    	ctrlQuestion = eemSFQuestion.Ctrl;

		eemSFQIsReq = ctrlQuestion.getAttribute ('eemSFQIsReq').toLowerCase();

		if ( eemSFQIsReq == null || eemSFQIsReq != 'true' )
			continue;

        isReqFieldValid = SFValidateRequiredField (eemSFQuestion);
        if ( !isReqFieldValid )
            errMsg += '* ' + ctrlQuestion.getAttribute ('eemSFQText') + ' is required.\n'

        isReqValid = (isReqValid && isReqFieldValid)
    }
    isAllValid = (isAllValid && isReqValid);

    // Validate that Captcha text.
    txtSFCaptcha = document.getElementById ('txtSFCaptcha');
    isValid = (txtSFCaptcha.value != "");
    if ( !isValid )
        errMsg += "* Please type in the ACCESS CODE to proceed.\n";
    isAllValid = (isAllValid && isValid);

    // On errors, popup alert to the user.
    if ( errMsg != "" )
    {
        errMsg = "Please correct the following errors:\n\n" + errMsg;
	    alert (errMsg);
    }

    return ((isAllValid && errMsg == ""));
}

function SFValidateRequiredField (eemSFQuestion)
{
	var chkBoxList;
    var hidSFQuestionType;
    var eemSFQType;
    var hidSFQuestion;
    var ctrlQuestion;
    var questionID;
    var eemEEMSFQuestionAnswer;
    var multiIDList;
    var nIdx;
    var isValid = true;

    ctrlQuestion = eemSFQuestion.Ctrl;
    questionID = eemSFQuestion.ID;
    eemSFQType = ctrlQuestion.getAttribute ('eemSFQType');
	if ( eemSFQType == null || eemSFQType == '' )
		return (isValid);

	switch ( eemSFQType )
	{
		case "1":	// Text
		case "5":	// Number
		case "6":	// Date
		case "7":	// Phone
            if ( ctrlQuestion.value == "" )
                isValid = false;
            break;
		case "4":	// List
            if ( ctrlQuestion.value == "" || ctrlQuestion.value == "-99" )
				isValid = false;
            break;
        case "3":	// Multi
            multiIDList = SFGetFormVarMatches (eval('/eemSFAnswer(\\d.*)_Question(' + questionID + ')/'), 'input', EEMSFQuestionAnswerCtrlHandler);
            eemSFQuestion.MultiAnswerList = multiIDList; //%% 
			isValid = false;
			
			for (nIdx = 0; nIdx < multiIDList.length; nIdx++)
			{
                eemEEMSFQuestionAnswer = multiIDList[nIdx].Ctrl;
				if ( eemEEMSFQuestionAnswer.type == "checkbox" )
				{
					isValid = (isValid || eemEEMSFQuestionAnswer.checked);
				}
			}
            break;
	}

    return (isValid);
}

function SFValidateRequiredField_InpField (ctrlQuestion, questionID) //%% 
{
	var chkBoxList;
    var hidSFQuestionType;
    var hidSFQuestion;
    var eemEEMSFQuestionAnswer;
    var multiIDList;
    var nIdx;
    var isValid = true;

    hidSFQuestionType = document.getElementById ('hidSFQuestionType'+questionID);
    if ( hidSFQuestionType.value == null || hidSFQuestionType.value == '' )
        return (isValid);

	switch ( hidSFQuestionType.value )
	{
		case "1":	// Text
		case "5":	// Number
		case "6":	// Date
		case "7":	// Phone
            if ( ctrlQuestion.value == "" )
                isValid = false;
            break;
		case "4":	// List
            if ( ctrlQuestion.value == "" || ctrlQuestion.value == "-99" )
				isValid = false;
            break;
		case "3":	// Multi
		    multiIDList = ctrlQuestion.value.split (',');
			//% alert ('multiIDList = '+multiIDList);
			isValid = false;
			if ( multiIDList.length > 0 )
			{
				//% alert ('multiIDList.length = '+multiIDList.length);
				for (nIdx = 0; nIdx < multiIDList.length-1; nIdx++)
				{
					//%% eemEEMSFQuestionAnswer = document.getElementById ('eemSFQuestion'+questionID+'_Answer'+multiIDList[nIdx]);
					eemEEMSFQuestionAnswer = document.getElementById ('eemSFAnswer'+multiIDList[nIdx]+'_Question'+questionID);
					if ( eemEEMSFQuestionAnswer.type == "checkbox" )
					{
						//% alert ('eemEEMSFQuestionAnswer.checked = '+eemEEMSFQuestionAnswer.checked);
						isValid = (isValid || eemEEMSFQuestionAnswer.checked);
					}
				}
			}

            break;
	}

    return (isValid);
}

//--------------------------------------------------------------------
// You may set the Signup Form Context by passing one of the following
//   supported values thru the Query String:
//   * Signup (Default): Indicates user is in the signup stage.
//   * Completion: Indicates the user has submitted their signup form
//		 information and should see the completion message.
//--------------------------------------------------------------------
function SFStageInit (ctrlID)
{
    var tblSFError;
    var tblSFCompletion;
    var tblSFMain;
    var hidSFStage;
    var sfStage;

    sfStage = Request.QueryString["SFStage"];
    hidSFStage = document.getElementById (ctrlID);
    hidSFStage.value = (sfStage != null) ? sfStage : "Signup";

    tblSFError = document.getElementById ('tblSFError');
    tblSFCompletion = document.getElementById ('tblSFCompletion');
    tblSFMain = document.getElementById ('tblSFMain');
    switch ( hidSFStage.value )
    {
		case "Completion":
			tblSFCompletion.style.display = '';
			break;
		case "Signup":
		default:
			tblSFCompletion.style.display = 'none';
			break;
    }
}

function SFErrorInit (tblSFErrorID, tdSFErrorID)
{
    var tblSFError;
    var tdSFError;
    var sfErr;

    sfErr = Request.QueryString["SFError"];
	tblSFError = document.getElementById (tblSFErrorID);
	tdSFError = document.getElementById (tdSFErrorID);
    if ( sfErr == undefined )
		sfErr = "";
	tdSFError.innerHTML = sfErr;
	tblSFError.style.display = (sfErr == "") ? "none" : "";
}

function SFValidateTextField (controlField, bDate, bNumber, bPhone)
{
    var textValue = controlField.value;
    if (bDate)
    {
        if (!SFIsValidDate(textValue))
        {
            window.alert(textValue + " is not a valid date format.  Enter date with mm/dd/yyyy format.");
            controlField.focus();
            return false;
        }
    }
    else if (bNumber)
    {
        if(!SFIsValidNumber(textValue))
        {
            window.alert(textValue + " is not a valid number.");
            controlField.focus();
            return false;
        }
    }
    else if (bPhone)
    {
        var isValidPhone = validatePhoneNumber(textValue);
		if (!isValidPhone)
		{
			window.alert(textValue + " is not a valid phone number.  Enter a valid phone number.");
			controlField.focus();
			return false;
		}
    }

    return (true);
}

function SFIsValidDate(dateStr, format)
{
    if (format == null)
        { format = "MDY"; }
    format = format.toUpperCase();
    if (format.length != 3)
        { format = "MDY"; }

    if ( (format.indexOf("M") == -1) || (format.indexOf("D") == -1) || (format.indexOf("Y") == -1) )
        { format = "MDY"; }

    if (format.substring(0, 1) == "Y") 
    { // If the year is first
        var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
        var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
    } 
    else if (format.substring(1, 2) == "Y") 
    { // If the year is second
        var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/
        var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/
    } 
    else 
    { // The year must be third
        var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/
        var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
    }

    // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
    if ( (reg1.test(dateStr) == false) && (reg2.test(dateStr) == false) )
        { return false; }

    var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
    // Check to see if the 3 parts end up making a valid date
    if (format.substring(0, 1) == "M") 
        { var mm = parts[0]; } 
    else if (format.substring(1, 2) == "M") 
        { var mm = parts[1]; } 
    else 
        { var mm = parts[2]; }

    if (format.substring(0, 1) == "D") 
        { var dd = parts[0]; } 
    else if (format.substring(1, 2) == "D") 
        { var dd = parts[1]; } 
    else 
        { var dd = parts[2]; }

    if (format.substring(0, 1) == "Y") 
        { var yy = parts[0]; } 
    else if (format.substring(1, 2) == "Y") 
        { var yy = parts[1]; } 
    else 
        { var yy = parts[2]; }

    if (parseFloat(yy) <= 50) 
        { yy = (parseFloat(yy) + 2000).toString(); }

    if (parseFloat(yy) <= 99) 
        { yy = (parseFloat(yy) + 1900).toString(); }

    var dt = new Date(parseFloat(yy), parseFloat(mm)-1, parseFloat(dd), 0, 0, 0, 0);
    if (parseFloat(dd) != dt.getDate()) 
        { return false; }

    if (parseFloat(mm)-1 != dt.getMonth()) 
        { return false; }

    return true;
}

function SFIsValidNumber(numberStr)
{
    var objRegExp  =  /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    // Check for numeric characters
    return objRegExp.test(numberStr);
}

function SFValidatePhoneNumber(numberStr)
{
    //Store all the illegal characters here
	var illegalChars = ""; 

	//process to remove non-numbers and spaces
	for(var i = 0; i < numberStr.length; i++) 
	{
		var character = numberStr.charAt(i);
		if(isNaN(character) && character != "-" && character != "(" && character != ")" && character != " " 
			&& character != "+" && character != ".") 
			illegalChars += character;
	}

	return (illegalChars.length == 0);	
}

function SFValidateEmailField (controlField)
{
    var textValue = controlField.value;

    if ( !SFIsValidEmail (textValue) )
    {
        window.alert(textValue + " does not seem to be a valid email address; (e.g. johndoe@mydomain.com).");
        controlField.focus();
        return false;
    }

    return true;
}

function SFIsValidEmail (emailStr)
{
    var regExEmailBad = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/; // not valid 
    var regExEmailOK = /^.+\@(\[?)[a-zA-Z0-9_\-\.]+\.([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/; // valid 

    return ((!regExEmailBad.test(emailStr) && regExEmailOK.test(emailStr)));
    //return true;
}

// e.g. qIDList = SFGetFormVarMatches (/^eemSFQuestion\d*$/, 'input,div');
function SFGetFormVarMatches(regEx, ctrlTypes, formVarMatchHandler)
{
    var ctrlType;
    var aryCtrlTypes;
    var aryCtrls1;
    var aryCtrlsFnd = null;
    var aryCtrlsMatch;
    var matches;
    var userData;
    var ctrlID;
	
    aryCtrlsMatch = new Array(0);
    aryCtrlTypes = ctrlTypes.split (',');
    for (nIdx = 0; nIdx < aryCtrlTypes.length; nIdx++)
    {
		aryCtrlsFnd = document.getElementsByTagName (aryCtrlTypes[nIdx]);
		for (nIdx2 = 0; nIdx2 < aryCtrlsFnd.length; nIdx2++)
        {
            ctrlID = aryCtrlsFnd[nIdx2].name;
            matches = regEx.exec (ctrlID);
		    if (matches == null)
				continue;

            if ( formVarMatchHandler != null )
                userData = formVarMatchHandler (aryCtrlsFnd[nIdx2], matches);

			aryCtrlsMatch.push (userData);
		}
    }
    
    return (aryCtrlsMatch);
}

SFInit();
