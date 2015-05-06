
function gDay(wd){
var Day;
if(wd=="ש")
Day=6;
else
Day=wd.charCodeAt(0)-1488;
return Day;
} 
function FullHWD(wd){
if(wd>6)wd=wd-7;
switch(wd)
{
	case 0: return 'ראשון';
	case 1: return 'שני';
	case 2: return 'שלישי';
	case 3: return 'רביעי';
	case 4: return 'חמישי';
	case 5: return 'שישי';
	case 6: return 'שבת';
}
} 			
function gMonth(gmIdx){
if(gmIdx==12)gmIdx=0;
   return gmIdx;
}
function GENERATEllArr(initGD,ChebYear,listLength,sentYear/*optional*/){
	var llArr=[],AditionalLlArr=[] ;      
	var CGy=initGD.getFullYear();// Current Gregorian

	var argv = "-h"+ChebYear;

	if(sentYear==undefined || sentYear.gName!=ChebYear) sentYear=CREATEyear1(argv);
	
	CGy=CGy+((CGy+'').substring(4,3)==argv.substring(5,7)?0:1);// if sent date before january so jump one gregorean year forward
	
	var GEOFhebYear=new Date(CGy, sentYear.MCArr[0].MArr[12].daysArr[28].gregorianMonth, 
	parseInt(sentYear.MCArr[0].MArr[12].daysArr[28].gregorianDate));//Gregorian END date of calculated heb year
	if(GEOFhebYear-initGD<0)// if sent date after end of cuurent heb january so jump one heb year forward
	{
		ChebYear++;
		argv = "-h"+ChebYear;
		sentYear=CREATEyear1(argv);
	}
	var hFlag = (argv.indexOf("-h") > -1) ? 1 : 0;
	//---------------------------------------
	 var item,mIdx,Month,d,mINT,Hday,diff,passed,Flag=true;
	 //---------------------------------------   
	for (var m in sentYear.MCArr[0].MArr)
	if(Flag && sentYear.MCArr[0].MArr[m].daysArr.length>0)
	{
		Month=sentYear.MCArr[0].MArr[m];
		//----------------------------
		var EmName=Month.gName,HmName =(hFlag==1? Month.hebName:Month.engName);
		//----------------------------
		for (var dIDX in Month.daysArr)
		if(Flag)
		{
			d=Month.daysArr[dIDX];
			if(
			initGD.getDay()==gDay(d.weekDay) && initGD.getMonth()==gMonth(d.gregorianMonth) && initGD.getDate()
			==d.gregorianDate)
			{
				//===========================
				mINT=parseInt(m);Hday=parseInt(dIDX)+1;
				for(var i=0;i<listLength;i++)
				if(Flag)
				{
				mIdx=(mINT<6?(mINT+1):m)
				eval("item=data['"+mIdx+"_"+(Hday+i)+"']");
					if(item!=undefined)
					{
					llArr.push("יום "+FullHWD(gDay(d.weekDay)+i)+" "+alef(Hday+i)+" "+HmName+" - "+	item.hilula+'<br>'+item.limud);	
					}
					else
					{
						diff=(listLength-i);
						passed=i;
						if(diff>1) {
								initGD.setDate(initGD.getDate()+passed)
								var GBOFhebNextYear=new Date(CGy, sentYear.MCArr[0].MArr[0].daysArr[0].gregorianMonth, 
								parseInt(sentYear.MCArr[0].MArr[0].daysArr[0].gregorianDate));//Gregorian BEGIN date of calculated heb year
								GBOFhebNextYear.setFullYear(GBOFhebNextYear.getFullYear()+1)//Gregorian BEGIN date of calculated heb next year
								if(GEOFhebYear-initGD<0)// if sent date after end of cuurent heb january so jump one heb year forward
									ChebYear++;
								AditionalLlArr=GENERATEllArr(initGD,ChebYear,diff,sentYear);
								llArr=llArr.concat(AditionalLlArr);
								}
						
						Flag=false;
					}
				}
				//===========================
			}
		}
	}					
	return llArr;

	

}

 