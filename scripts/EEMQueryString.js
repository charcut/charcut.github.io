//-------------------------------------------------------------------
// Downloaded from: http://www.apriori-it.co.uk/Javascript_Request_Object_Report.asp?as_q=swineshead+guitar+pickup&num=10&hl=en&btnG=Google+Search&as_epq=&as_oq=&as_eq=&lr=lang_en&as_ft=i&as_filetype=&as_qdr=all&as_occt=any&as_dt=i&as_sitesearch=&as_rights=&safe=images
//-------------------------------------------------------------------

var Referrer = new ReferrerConstructor();
var Request = new RequestConstructor(); //%% Object;

function ReferrerConstructor()
{
    var arrDomain;
    var arrAllDomain;
    var ait_arrRef;
    var ait_strQS;
    var arrQS_values;
    var ait_arrPair;

    // Init [All] field
    this.All = document.referrer.toString();
    if (this.All == "")
        this.All = window.location.toString();

    // Init [Page] field
    ait_arrRef = this.All.split("?");
    this.Page = ait_arrRef[0];

    // Init [Domain] field
    arrAllDomain = this.All.split("//");
    arrDomain = arrAllDomain[1].split("/");
    this.Domain = arrDomain[0];

    //%% // Init [Page] field
    //%% ait_arrRef = this.All.split("?");
    //%% this.Page = ait_arrRef[0];

    // Init [QueryString] field
    this.QueryString = new Object;
    if (ait_arrRef.length > 1)
        ait_strQS = ait_arrRef[1];
    else
        ait_strQS = "";

    arrQS_values = ait_strQS.split("&");
    for (var i = 0; i < arrQS_values.length; i++)
    {
        ait_arrPair = arrQS_values[i].split("=");
        this.QueryString[ait_arrPair[0]] = UNESCAPE(ait_arrPair[1]);
    }
    this.QueryString["FieldCount"] = arrQS_values.length;

    // Init [Enumerate] field
    this.Enumerate = Referrer_Enumerate;
}

function Referrer_Enumerate()
{
    var strEnumerate;
    var iEQS;
    var ait_QUOTE;

    //%% Alert ('Referrer_Enumerate');

    strEnumerate = "Referrer.Domain = " + Referrer.Domain + "<br>";
    strEnumerate += "Referrer.Page = " + Referrer.Page + "<br>";

    if (Referrer.QueryString.FieldCount < 2)
    {
        strEnumerate += "<br>No Referrer.QueryString Values<br><br>";
        document.write (strEnumerate);
        return;
    }

    iEQS = 0;
    ait_QUOTE = String.fromCharCode(34);
    strEnumerate += "<br>There are " + Referrer.QueryString.FieldCount + " name/value pairs in the Referrer.QueryString Object<br><br>";

    strEnumerate += "<table border=1><tr><td align=center><b>Name</b></td><td align=center><b>Value</b></td></tr>";
    for (var ITEM in Referrer.QueryString)
    {

        if (iEQS <= (Referrer.QueryString["FieldCount"]-1))
        {
            strEnumerate += "<tr><td>Referrer.QueryString[" + ait_QUOTE + ITEM + ait_QUOTE + "]</td><td>" + UNESCAPE(Referrer.QueryString[ITEM]) + " </td></tr>";
        }
        iEQS +=1;
    }
    strEnumerate += "</table>";

    document.write(strEnumerate);
}

function RequestConstructor()
{
    var ait_QUOTE;
    var ait_arrRef;
    var ait_strQS;
    var arrQS_values;
    var ait_arrPair;

    //%% ait_QUOTE = String.fromCharCode(34);

    // Init [All] field
    this.All = window.location.toString();

    // Init [Page] field
    ait_arrRef = this.All.split("?");
    this.Page = ait_arrRef[0];

    // Init [Domain] field
    arrAllDomain = this.All.split("//");
    arrDomain = arrAllDomain[1].split("/");
    this.Domain = arrDomain[0];

    // Init [QueryString] field
    this.QueryString = new Object;
    if (ait_arrRef.length > 1)
        ait_strQS = ait_arrRef[1];
    else
        ait_strQS = "";

    arrQS_values = ait_strQS.split("&")
                   for (var i = 0; i < arrQS_values.length; i++)
    {
        ait_arrPair = arrQS_values[i].split("=");
        this.QueryString[ait_arrPair[0]] = UNESCAPE(ait_arrPair[1]);  
    }
    this.QueryString["FieldCount"] = arrQS_values.length;

    // Init [Enumerate] field
    this.Enumerate = Enumerate;
}


function Enumerate()
{
    var ait_QUOTE;
    var iEQS;
    var strEnumerate;
    var iCOUNTER;

    if (Request.QueryString.FieldCount < 1)
    {
        strEnumerate = "<br>No Request.QueryString Values<br>";
        document.write(strEnumerate);
        return;
    }

    iEQS = 0;
    iCOUNTER = 0;
    ait_QUOTE = String.fromCharCode(34);
    strEnumerate = "<table border=1><tr><td align=center><b>Name</b></td><td align=center><b>Value</b></td></tr>";
    for (var ITEM in Request.QueryString)
    {

        if (iEQS <= (Request.QueryString["FieldCount"]-1))
        {
            if (Request.QueryString[ITEM] != "undefined")
            {
                strEnumerate += "<tr><td>Request.QueryString[" + ait_QUOTE + ITEM + ait_QUOTE + "]</td><td>" + UNESCAPE(Request.QueryString[ITEM]) + " </td></tr>";
                iCOUNTER += 1;
            }
        }

        iEQS +=1;
    }
    strEnumerate += "</table>";

    if (iCOUNTER > 0)
    {
        strEnumerate = "<br><br>There are " + Request.QueryString["FieldCount"] + " name/value pair[s] in the Request.QueryString Object:<br><br>" + strEnumerate;
        document.write (strEnumerate);
    }
    else
    {
        Request.QueryString["FieldCount"] = 0;
        document.write ("<br>No Request.QueryString values found<br>");
    }
}

function UNESCAPE(U_VALUE)
{
    U_VALUE = unescape(U_VALUE);
    while (U_VALUE.indexOf("+") > -1)
        U_VALUE = U_VALUE.replace("+", " ");
    return (U_VALUE);
}
