function callendar(){
	this.build = function(){
		this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		this.days_of_the_week = ["sun","mon","tue","wed","thu","fri","sat"]
		this.date = new Date();
		this.today = new Date();
		this.x;
		this.y;

		this.wrapper = document.createElement('div');
		this.wrapper.setAttribute("id","calendario");
		this.header = document.createElement('div');;
		this.body = document.createElement('div');
		this.style();
	}
	// styles the callendar
	this.style = function()
	{
		styleSheet = document.createElement("style");
		string = ""
		+"#calendario{"		//->  
		+	"font-size: 10pt;"
	  	+	"font-family: Verdana, Geneva, sans-serif;"
		+	"width:220px;"
		+	"display:flex;"
		+	"flex-direction:column;"
		+	"background-color: white;"
	  	+	"border:solid lightgrey 1px;"
	  	+	"border-radius: 5px;"
	  	+	"overflow: hidden;"
		+"}"
		+"#calendario > div:first-child{" //-> header
		+	"display:flex"
		+"}"
		+"#calendario > div:first-child > span:first-child{" //-> left arrow/decrease month button
		+"cursor:pointer;"
	  	+	"width: 0; "
	  	+	"height: 0; "
		+	"border-top: 8px solid transparent;"
		+	"border-bottom: 8px solid transparent; "
		+	"border-right:7px solid black; "
		+	"margin-left: 15px;"
		+	"margin-top: 15px;"
		+"}"
		+"#calendario>div:nth-child(1)>span:nth-child(1):hover{"
	  	+	"border-right:7px solid grey; "
		+"}"
		+"#calendario > div:first-child > span:nth-child(2){" 	//-> month and year 
		+	"width: 100%;"
	  	+	"text-align: center;"
	  	+	"font-weight:bold;"
	    +	"height: 40px;"
	    +	"line-height: 40px;"
		+"}"
		+"#calendario > div:first-child > span:nth-child(3){" 	//-> right arrow/increase month button
		+	"cursor:pointer;"
	    +	"width: 0;"
		+	"height: 0;"
		+	"border-top: 8px solid transparent;"
		+	"border-bottom: 8px solid transparent;"
		+	"border-left: 7px solid black;"
		+	"margin-right: 15px;"
		+	"margin-top: 15px;"
		+"}"
		+"#calendario > div:nth-child(2){" 	//-> days of the week
		+	"line-height: 20px;"
	    +	"color:red;"
	    +	"display:flex"
		+"}"
		+"#calendario > div:nth-child(2)>span{" //-> each day of the week
		+	"width: 100%;"
		+	"text-align:center;"
		+"}"
		+"#calendario > div:nth-child(3){" 	//-> days of the wrapper
		+	"overflow: hidden;"
	  	+	"width:1000%;"
	  	+	"display:flex"
		+	""
		+"}"
		+"#calendario > div:nth-child(3) > span{" //-> days of the month element
		+	"width:100%"
		+"}"
		+"#calendario > div:nth-child(3) > span > div{"	//-> 7 days of the month (one line)
		+	"width: 220px;"
 		+	"line-height: 25px;"
		+	"display:flex;"
		+	"calendar.appendChild(header);"
		+	"calendar.appendChild(daysWeek);"
		+	"days = document.createElement('div');"
		+	""
		+"}"
		+"#calendario > div:nth-child(3) > span > div >span{" //-> each day of the month
		+	"width: 100%;"
		+	"text-align:center;"
		+	"cursor:pointer;"
		+	""
		+"}"
		+"#calendario>div:nth-child(3)>div>span:hover{"
		+	"background-color: #216ba5;"
		+	"color:white;"
		+  	"transition:background-color .2s;"
		+"}"
		+"#calendario>div:nth-child(1)>span:nth-child(3):hover{"
		+  	"border-left:7px solid grey;"
		+"}"
		+"";
		styleContent = document.createTextNode(string);
		styleSheet.appendChild(styleContent);
		document.head.appendChild(styleSheet);
	}
	this.dayStyle = function(day){
		if(newDate.getMonth()<this.date.getMonth()){
			day.setAttribute("onclick","call.previousMonth();selectDay("+newDate.getTime()+")");
			day.style.color="lightgrey";
		}else if(newDate.getMonth()>this.date.getMonth()){
			day.setAttribute("onclick","nextMonth();selectDay("+newDate.getTime()+")");
			day.style.color="lightgrey";
		}else if(this.today.getDate() == newDate.getDate() &this.today.getMonth()==newDate.getMonth() &this.today.getYear()==newDate.getYear() ){
			day.style.backgroundColor="lightgrey";
			day.setAttribute("onclick","selectDay("+newDate.getTime()+")");
			day.setAttribute("class","selectedDay");
		}else{
			day.setAttribute("onclick","selectDay("+newDate.getTime()+")");
		}
	}
	this.daysUpdate = function(){
		var daySection=document.createElement("span");
		daySection.style.transition="width .2s";
		newDate = getFirstSunday(this.date);
		for(i = 0;i < 6;i++){
			var days = document.createElement('div');
			for(j = 0;j<7;j++){
				var day = document.createElement('span');
				var text = document.createTextNode(newDate.getDate());
				days.appendChild(day);
				this.dayStyle(day);
				day.appendChild(text);
				newDate.setDate(newDate.getDate() + 1);
			}
			daySection.appendChild(days);
		}
		return daySection;
	}
	this.nextMonth = function(){
		this.date.setMonth(this.date.getMonth() + 1);
		
		//TODO: rename tantFaz
		var tantoFaz = this.body.firstChild;
		tantoFaz.style.width="0px";
		tantoFaz.style.overflow="hidden";
		setTimeout(function(){
			call.body.removeChild(call.body.firstChild);
		},200);
		this.body.appendChild(this.daysUpdate());
		dateHolder.innerHTML= this.months[this.date.getMonth()]+" "+(this.date.getYear()+1900);
	}
	this.previousMonth = function()
	{
		this.date.setMonth(this.date.getMonth() - 1);
		setTimeout(function(){
			call.body.removeChild(call.body.lastChild);
		},200);
		this.body.insertBefore(this.daysUpdate(),this.body.firstChild);
		//TODO: rename tantoFaz
		var tantoFaz=this.body.firstChild;
		tantoFaz.style.transition="width .2s";
		tantoFaz.style.width="0px";
		setTimeout(function(){
			tantoFaz.style.width="220px";
		},1);
		tantoFaz.style.overflow="hidden";
		dateHolder.innerHTML= this.months[this.date.getMonth()]+" "+(this.date.getYear()+1900);
	}
	this.open = function(aaa)
	{
		calendar = document.getElementById("calendario");
		//TODO: rename aaa
		this.currentElement = aaa;
		this.x=aaa.offsetLeft;
		this.y=aaa.offsetTop;
		this.build();
		//TODO: move contruct to constructor
		construct();
		calendar = this.wrapper;
		dateDaysSpan = call.daysUpdate();
		call.body.appendChild(dateDaysSpan);
		calendar = document.body.appendChild(calendar);
		calendar.style.position = "fixed";
		calendar.style.top = this.y+"px";
		if(this.x-110>=0){
			calendar.style.left = (this.x-110)+"px";	
		}else{
			calendar.style.left = "0px";	
		}
		setTimeout(function(){
			document.addEventListener("click", closeCalendar);
		},10);
	}
}
call = new callendar();
function construct(){
	dateHolder = document.createElement("span");
	dateHolderText= document.createTextNode(call.months[call.today.getMonth()]+" "+(call.today.getYear()+1900));
	dateHolder.appendChild(dateHolderText);

	decMonthBut = document.createElement("span");
	decMonthBut.setAttribute("onclick","call.previousMonth()");
	call.header.appendChild(decMonthBut);
	call.header.appendChild(dateHolder);
	incMonthBut = document.createElement("span");
	incMonthBut.setAttribute("onclick","call.nextMonth()");
	call.header.appendChild(incMonthBut);
	call.wrapper.appendChild(call.header);
	weekDays = document.createElement('div');
	weekDay = [];
	weekDayText = [];
	for(i=0;i<7;i++){
		weekDay.push(document.createElement("span"));
		weekDayText.push(document.createTextNode(call.days_of_the_week[i]));
	}
	for(i=0;i<7;i++){
		weekDay[i].appendChild(weekDayText[i]);
		weekDays.appendChild(weekDay[i]);
	}
	call.wrapper.appendChild(weekDays);
	call.wrapper.appendChild(call.body);
}


function getFirstSunday(date){
	var otherDate = new Date;
	if(date){
		otherDate.setTime(date);
	}
	otherDate.setDate(1);
	if(otherDate.getDay()==0){
		otherDate.setDate(otherDate.getDate() - 7);	
	}else{
		otherDate.setDate(otherDate.getDate() - otherDate.getDay());	
	}
	return otherDate;
}
function selectDay(a){
	var otherDate = new Date;
	otherDate.setTime(a);
	document.body.removeChild(calendar);
}
function closeCalendar(a){
	teste=0;
	x = a.target;
	while(x != document.body){
		if(x.id=="calendario"||x.getAttribute("onclick")=="setup(this)"){
			teste = 1;
		}
		x = x.parentNode;
	}
	if(!teste){
		document.body.removeChild(document.getElementById("calendario"));
		document.removeEventListener("click", closeCalendar,false);
	}
}