function callendar(){
	this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	this.days_of_the_week = ["sun","mon","tue","wed","thu","fri","sat"]
	this.today = new Date();
	this.date = new Date();
	this.wrapper = document.createElement('div');
	this.wrapper.setAttribute("id","calendario");
	this.header = document.createElement('div');;
	this.dateHolder = document.createElement("span");
	this.body = document.createElement('div');
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
			day.setAttribute("onclick","call.previousMonth();call.select_day("+newDate.getTime()+")");
			day.style.color="lightgrey";
		}else if(newDate.getMonth()>this.date.getMonth()){
			day.setAttribute("onclick","call.nextMonth();call.select_day("+newDate.getTime()+")");
			day.style.color="lightgrey";
		}else if(this.today.getDate() == newDate.getDate() &this.today.getMonth()==newDate.getMonth() &this.today.getYear()==newDate.getYear() ){
			day.style.backgroundColor="lightgrey";
			day.setAttribute("onclick","call.select_day("+newDate.getTime()+")");
			day.setAttribute("class","selectedDay");
		}else{
			day.setAttribute("onclick","call.select_day("+newDate.getTime()+")");
		}
	}
	this.daysUpdate = function(){
		var daySection=document.createElement("span");
		daySection.style.transition="width .2s";
		newDate = this.get_first_sunday(this.date);
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
		
		var current = this.body.firstChild;
		current.style.width="0px";
		current.style.overflow="hidden";
		setTimeout(function(){
			call.body.removeChild(call.body.firstChild);
		},200);
		this.body.appendChild(this.daysUpdate());
		this.dateHolder.innerHTML= this.months[this.date.getMonth()]+" "+(this.date.getYear()+1900);
	}
	this.previousMonth = function()
	{
		this.date.setMonth(this.date.getMonth() - 1);
		setTimeout(function(){
			call.body.removeChild(call.body.lastChild);
		},200);
		var aaaaaa= this.daysUpdate();
		var current = this.body.insertBefore(aaaaaa,this.body.firstChild);
		current.style.width="0px";
		current.style.transition="width .2s linear .2s";
		current.style.width="220px";
		current.style.overflow="hidden";
		this.dateHolder.innerHTML= this.months[this.date.getMonth()]+" "+(this.date.getYear()+1900);
	}
	this.open = function(aaa)
	{
		calendar = document.getElementById("calendario");
		if(!this.wrapper.firstChild)
		{
			this.style();
			this.construct();
		}else{
			this.date = new Date();
			this.dateHolder.innerHTML= this.months[this.date.getMonth()]+" "+(this.date.getYear()+1900);
			console.log("reste");
			//TODO: reset days
		}
		//TODO: rename aaa
		this.currentElement = aaa;
		this.x=aaa.offsetLeft;
		this.y=aaa.offsetTop;
		dateDaysSpan = call.daysUpdate();
		call.body.appendChild(dateDaysSpan);
		if(!calendar){
			calendar = document.body.appendChild(this.wrapper);
		}
		this.wrapper.style.position = "fixed";
		this.wrapper.style.top = this.y+"px";
		if(this.x-110>=0){
			this.wrapper.style.left = (this.x-110)+"px";	
		}else{
			this.wrapper.style.left = "0px";	
		}

	}

	this.construct = function(){
		var dateHolderText= document.createTextNode(call.months[call.today.getMonth()]+" "+(call.today.getYear()+1900));
		this.dateHolder.appendChild(dateHolderText);

		var previous_month_button = document.createElement("span");
		previous_month_button.setAttribute("onclick","call.previousMonth()");
		call.header.appendChild(previous_month_button);
		call.header.appendChild(this.dateHolder);
		var next_month_button = document.createElement("span");
		next_month_button.setAttribute("onclick","call.nextMonth()");

		call.header.appendChild(next_month_button);
		call.wrapper.appendChild(call.header);

		week_days = document.createElement('div');
		day_of_the_week = [];
		day_of_the_week_text = [];
		for(i=0;i<7;i++){
			day_of_the_week.push(document.createElement("span"));
			day_of_the_week_text.push(document.createTextNode(call.days_of_the_week[i]));
			day_of_the_week[i].appendChild(day_of_the_week_text[i]);
			week_days.appendChild(day_of_the_week[i]);
		}
		call.wrapper.appendChild(week_days);
		call.wrapper.appendChild(call.body);
	}
	this.get_first_sunday = function(date){
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
	this.select_day = function(a){
		var otherDate = new Date;
				otherDate.setTime(a);
		this.currentElement.value = otherDate.getDate()+"/"+(otherDate.getMonth()+1)+"/"+(otherDate.getYear()+1900);

		this.close();
	}
	this.close = function(a){
		teste=0;
		calendar = document.getElementById("calendario");
		if(a)
		{
			if(a.target)
			{
				x = a.target;
				while(x != document.body && x!= document.documentElement){
					if(x.id=="calendario"||x.getAttribute("onclick")=="call.open(this)"){
						teste = 1;
					}
					x = x.parentNode;
				}	
			}
		}
		if(!teste && calendar || !a){
			while (call.body.firstChild) {
			    call.body.removeChild(call.body.firstChild);
			}
			document.body.removeChild(calendar);
		}
	}
}
call = new callendar();
document.addEventListener("click", call.close);