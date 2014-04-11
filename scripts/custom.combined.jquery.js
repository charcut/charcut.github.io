// Div RollOver-Onclick Script
function switch1(div) {
var option=['first','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirtheen','fourtheen','fiftheen','sixtheen','seventheen','eightheen','ninetheen','twenty','twentyone','twentytwo','twentythree','twentyfour','twentyfive','twentysix','twentyseven','twentyeight','twentynine','thirty','thirtyone','thirtytwo','thirtythree','thirtyfour','thirtyfive'];
for(var i=0; i<option.length; i++) {
if (document.getElementById(option[i])) {
obj=document.getElementById(option[i]);
obj.style.display=(option[i]==div)? "block" : "none";
}
}
}
window.onload=function () {switch1('first');}


// Validate Form Script
function MM_validateForm() { //v4.0
  if (document.getElementById){
    var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
    for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=document.getElementById(args[i]);
      if (val) { nm=val.name; if ((val=val.value)!="") {
        if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
          if (p<1 || p==(val.length-1)) errors+='- Your email address is invalid.\n';
        } else if (test!='R') { num = parseFloat(val);
          if (isNaN(val)) errors+='- Telephone-Number must contain a number.\n';
          if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
            min=test.substring(8,p); max=test.substring(p+1);
            if (num<min || max<num) errors+='- '+nm+' must contain a number between '+min+' and '+max+'.\n';
      } } } else if (test.charAt(0) == 'R') errors += '- '+nm+' is required.\n'; }
    } if (errors) alert('Please correct the following error(s):\n'+errors);
    document.MM_returnValue = (errors == '');
} }


// Clear Form Script
function clickclear(thisfield, defaulttext) {
if (thisfield.value == defaulttext) {
thisfield.value = "";
}
}

function clickrecall(thisfield, defaulttext) {
if (thisfield.value == "") {
thisfield.value = defaulttext;
}
}

