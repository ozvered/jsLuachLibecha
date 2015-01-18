//=================================================================================================
 var arrComulativeDays = new Array(1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366);
//=================================================================================================
  
// ===================================== Kinssat / Yetziat Shabbath Handlers ======================
  
  function isGregorianLeapYear(y) 
  {
    return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
  }

  /*
   * Returns the amount of days passed since the beginning of the year.
   */
  function daysSinceYearBegun(dy, mn, yr) 
  {
    mn--;
    // Add the number of days passed + 1 if the current year is a leap year.
    return arrComulativeDays[mn] + dy + (mn > 2 && isGregorianLeapYear(yr));
  }
  

  /*
   * This extremely complicated function, calculates the sunrise and sunset times.
   * Sunrise is stored at ret$[1]
   * Sunset is stored at ret$[2]
   * (ret$[0] - returns the status of the execution where 0 means success.
   */  
  function suntime(
  dy, mn, yr,
  sundeg, sunmin,
  londeg, lonmin, ew,
  latdeg, latmin, ns,
  timezone)
  {
	var ewi = 1, nsi = -1, status,
		sunrise = 0.0, sunset = 0.0;
    if (ew == "W")
      ewi = -1;
    else
      ewi = 1;
  
    if (ns == "N")
      nsi = 1;
    else
      nsi = -1;
      
  
    var success = 0;  // error code stored here.
    status = success;
    var longitude = (londeg + lonmin/60.0) * ewi;
    var latitude  = (latdeg + latmin/60.0) * nsi;
  
	var yday = daysSinceYearBegun(dy, mn, yr);
     
    var A = 1.5708; 
    var B = 3.14159; 
    var C = 4.71239; 
    var D = 6.28319;      
    var E = 0.0174533 * latitude; 
    var F = 0.0174533 * longitude; 
    var G = 0.261799 * timezone;
  
    var R = Math.cos(0.01745 * (sundeg + sunmin/60.0));
  
    var J;
  
    // twice through the loop
    //    i=0 is for sunrise
    //    i=1 is for sunset
    for (i = 0; i < 2; i++) 
      { 
    
        if(!i)
          J =  A;  // sunrise 
        else
          J = C;  // sunset
    
        var K = yday + ((J - F) / D); 
        var L = (K * .017202) - .0574039;              // Solar Mean Anomoly 
        var M = L + .0334405 * Math.sin(L);            // Solar True Longitude 
        M += 4.93289 + (3.49066E-04) * Math.sin(2 * L);
        
        // Quadrant Determination 
        if (D == 0) {
          // SHOULD NOT HAPPEN - ERROR HAS OCCURRED.  
          status = 1;
        } 
    
        while(M < 0)
          M = (M + D);
    
        while(M >= D)
          M = (M - D);
    
        if ((M / A) - Math.floor(M / A) == 0)
          M += 4.84814E-06;
    
        var P = Math.sin(M) / Math.cos(M);                   // Solar Right Ascension 
        P = Math.atan2(.91746 * P, 1); 
    
        // Quadrant Adjustment 
        if (M > C)
          P += D;
        else {
          if (M > A)
            P += B;
        } 
    
        var Q = .39782 * Math.sin(M);      // Solar Declination 
        Q = Q / Math.sqrt(-Q * Q + 1);     // This is how the original author wrote it! 
        Q = Math.atan2(Q, 1); 
    
        var S = R - (Math.sin(Q) * Math.sin(E)); 
        S = S / (Math.cos(Q) * Math.cos(E)); 
    
        if(Math.abs(S) > 1)
          status = 1;  // uh oh! no sunrise/sunset
    
        S = S / Math.sqrt(-S * S + 1); 
        S = A - Math.atan2(S, 1); 
    
        if(!i)
          S = D - S;  // sunrise
    
        var T = S + P - 0.0172028 * K - 1.73364;  // Local apparent time 
        var U = T - F;                            // Universal timer 
        var V = U + G;                            // Wall clock time 
        
        // Quadrant Determination 
        if(D == 0) {
          // SHOULD NOT HAPPEN - ERROR HAS OCCURRED.
          status = 1;
        } 
        
        while(V < 0)
          V = V + D;
        while(V >= D)
          V = V - D;
        V = V * 3.81972; 
    
        if(!i)
          sunrise = V;  // sunrise
        else
          sunset = V;  // sunset
      } 

    var returnArray = new Array(status,sunrise,sunset);
  
    return returnArray;
  }
  
  /*
   * Converts the time received from the function "suntime" to a 24 hour time.
   * ret$ = "hour : minutes" 
   */
  function adjustTime(t) 
  {
    var hour;
    var min;
  
    var time = t;
  
    var hour = Math.floor(time);
  
    var min  = Math.floor((time - hour) * 60.0 + 0.5);
  
    if (min >= 60) {
       hour += 1;
       min  -= 60;
    }
    
    var ReturnTime = hour + ":" + ((min < 10) ? "0" : "") + min;
  
    return ReturnTime;
  
  }

  /*
   * This function calculates the Knissat & Yetziaat shabbath times.
   * It is currently set to calculate the time based on Jerusalem (no day light saving time)
   // Kinssat Shabbath
    var day_before = new Date(yom.getTime() - 86400000);
    db = day_before.getDate();
    mb = day_before.getMonth() + 1;
    yb = day_before.getUTCFullYear();
   */
  function calculateZmaniKinsatVeyetziatShabbath(dayG,monthG,yearG,hebDate)
  {
  //'OTNIEL
   var  NorthOrSouth = "N";
   var  latd = 31;
   var  latm = 25;
   var  EastOrWest = "E";
   var  lngd = 35;
   var  lngm = 00;
   var  tz = 2;
   var arrZmanimRet = Array(2);
  
    var yom = new Date (yearG, monthG, dayG);
	/*
    // Check daylight saving time.
    // Daylight saving time in Israel: From the friday before the 2nd of April untill 10th of Tishrei.
    //--- hebDate=GregToHeb(new Date (yearG, monthG, dayG));
    var hebDateApril2= hebDate.substring(0,4)+"/3/2";
    var mdyDate = hebDate.split("/");
    var mdyDateApril2 = hebDateApril2.split("/");
    
    // If after the 2nd of April
    if ((monthG > 2) && (dayG > 1))
    {
      // If we are in the same hebrew year as the 2nd of april it means we are before the
      // 10th of Tishrei - hence Daylight saving time applies.
      if (mdyDate[0] == mdyDateApril2[0]) 
      {
        tz++;
      }
      // If we are a year after the 2nd of April, check to see if we are before the 10th
      // of Tishrei - DST still applies.
      else if ((mdyDate[0] > mdyDateApril2[0])
              && (mdyDate[1] == 1)
              && (mdyDate[1] < 10))
      {
        tz++;
      }
      
    }
	*/
    // motzei shabbat (3 small stars)
    var time = suntime(dayG, monthG/*+1*/, yearG, 98, 30, lngd, lngm, EastOrWest, latd, latm, NorthOrSouth, tz);

    // If Sunset and sunrise have been calculated successfully.
    if(time[0] == 0)
    {
      // Set zman Yetsiat shabbath.
      arrZmanimRet[1] = adjustTime(time[2]);

    }
    
    // Kinssat Shabbath
    var day_before = new Date(yom.getTime() - 86400000);
    var db = day_before.getDate();
    var mb = day_before.getMonth();
	if(mb==0)mb=12;
    var yb = day_before.getUTCFullYear();

    time = suntime(db, mb, yb, 90, 50, lngd, lngm, EastOrWest, latd, latm, NorthOrSouth, tz);
    // Set zman Kinssat shabbath
    arrZmanimRet[0] = adjustTime(time[2] - 22.0/60.0);
	/* try to calculate mid day
	time =  suntime(dayG, monthG, yearG, 91, 19, lngd, lngm, EastOrWest, latd, latm, NorthOrSouth, tz);
    arrZmanimRet[0] = adjustTime(time[1] );
    arrZmanimRet[1] = adjustTime(time[1]+0.5*(time[2]-time[1]) );

   */
     return arrZmanimRet;
  }

  function showZmaniKinsatVeyetziatShabbath()
  {
  var i=0;
  
  var ii;
  var ZmaniShabbath = Array(2);
  
  var now = new Date();
  
  var mm = now.getMonth()
  var yyyy = now.getUTCFullYear()
  var mmyyyy = new Date()
  
  var firstDayDisplayed=getFirstDayGregorian();
  var day1=getFirstDayOfTheMonth();
  
  var prevM = getPreviousMonth();
  var nextM = getNextMonth();
  
  var prevY = mm == 0 ? currYear-- : currYear;
  var nextY = mm == 11 ? currYear++ : currYear;
    
  var maxDaysPreviousMonth = maxDays((prevM),currYear);
  var maxDaysCurrMonth=maxDays(currMonth,currYear);

  // Set all zmani shabbath for fridays of the previous month;
  for (ii=0 ; ii<day1 ; ii++){
    if ((ii % 7) == 5) // If Friday
    {
      ZmaniShabbath = 
                calculateZmaniKinsatVeyetziatShabbath(eval(firstDayDisplayed +"+"+ ii),prevM,prevY);
    
      if (toolTipCellText[ii] != "")    //event description will be displayed in a new line
          toolTipCellText[ii] += "<BR>"
      toolTipCellText[ii] += "כניסת שבת: " + ZmaniShabbath[0];

      if (toolTipCellText[ii+1] != "")    //event description will be displayed in a new line
          toolTipCellText[ii+1] += "<BR>"
      toolTipCellText[ii+1] += "צאת שבת: " + ZmaniShabbath[1];
    }
  }
  // Set all zmani shabbath for fridays of the current month;
  for (ii=day1;ii<=day1+maxDaysCurrMonth-1;ii++){
    if (ii % 7 == 5) // If Friday
    {
      ZmaniShabbath = 
                calculateZmaniKinsatVeyetziatShabbath(eval(ii-day1+1),currMonth,currYear);

      if (toolTipCellText[ii] != "")    //event description will be displayed in a new line
          toolTipCellText[ii] += "<BR>"
      toolTipCellText[ii] += "כניסת שבת: " + ZmaniShabbath[0];

      if (toolTipCellText[ii+1] != "")    //event description will be displayed in a new line
          toolTipCellText[ii+1] += "<BR>"
      toolTipCellText[ii+1] += "צאת שבת: " + ZmaniShabbath[1];
    }
  }
  // Set all zmani shabbath for fridays of the following month;
  for (ii=day1+maxDaysCurrMonth;ii<=41;ii++)
  {
		if (ii % 7 == 5) // If Friday
		{
		  ZmaniShabbath = 
					calculateZmaniKinsatVeyetziatShabbath(eval(ii - maxDaysCurrMonth + 1),nextM,nextY);
		  if (toolTipCellText[ii] != "")    //event description will be displayed in a new line
			  toolTipCellText[ii] += "<BR>"
		  toolTipCellText[ii] += "כניסת שבת: " + ZmaniShabbath[0];
		
		  if (toolTipCellText[ii+1] != "")    //event description will be displayed in a new line
			  toolTipCellText[ii+1] += "<BR>"      
		  toolTipCellText[ii+1] += "צאת שבת: " + ZmaniShabbath[1];

		}
		   
	  }
 }