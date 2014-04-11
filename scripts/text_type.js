var content = "Easter's hopping at CHARCUT. Click here for more details";

function twDisplayTW() {twDisplay('tw',content,0);}
loaded('tw',twDisplayTW);

var brk = '~'; // character to use for line break
var resetTime = 7; // set to 0 to not reset or seconds to delay before reset

// Typewriter Text Javascript
// copyright 13th October, 2007 by Stephen Chapman
// permission to use this Javascript on your web page is granted
// provided that all of the code in this script (including these
// comments) is used without any alteration
// you can change the values above this notice to suit your requirements
function twDisplay(id,content,num) {var delay = 20; if (num <= content.length)  
{var lt = content.substr(0,num); 
document.getElementById(id).innerHTML = lt.replace(RegExp(brk,'g'),'<br \/>'); num++; if (num > content.length) delay = resetTime * 1000;} else {document.getElementById(id).innerHTML = ''; num = 0;} if (delay > 0) setTimeout('twDisplay("'+id+'","'+content+'","'+num+'")',delay);} var pageLoaded = 0; window.onload = function() {pageLoaded = 1;}; function loaded(i,f) {if (document.getElementById && document.getElementById(i) != null) f(); else if (!pageLoaded) setTimeout('loaded(\''+i+'\','+f+')',900);}
