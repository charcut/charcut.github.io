var today=new Date()

var theoccasion=new Date(today.getFullYear(), 02, 24)

var beforeOccasionText="<br><br>Until Opening</br>"
var onOccasiontext="CHARCUT Roast House <br><br>Now Open</br>"

var monthtext=new Array("Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec")
theoccasion.setMonth(theoccasion.getMonth()-1)
var showdate="("+monthtext[theoccasion.getMonth()]+" "+theoccasion.getDate()+")" 

var one_day=1000*60*60*24
var calculatediff=""

calculatediff=Math.ceil((theoccasion.getTime()-today.getTime())/(one_day))
if (calculatediff<0){ 
var nextyeartoday=new Date()
nextyeartoday.setFullYear(today.getFullYear()+1)
calculatediff=Math.ceil((nextyeartoday.getTime()-today.getTime())/(one_day)+calculatediff)
}

var pluraldayornot=(calculatediff==1)? "Day" : "Days"
if (calculatediff>0)
	document.write(""+calculatediff+" "+pluraldayornot+" "+beforeOccasionText+"")
else if (calculatediff==0)
	document.write(""+onOccasiontext+"")