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
/*
 //=================================H E B R E W  -  G R E G O I A N  D A T E  C O N V E R T O R=======================
// This function returns how many months there has been from the
// first Molad until the beginning of the year nYearH
function MonSinceFirstMolad(nYearH) {
var nMonSinceFirstMolad

// A shortcut to this function can simply be the following formula
//   return Math.floor(((235 * nYearH) - 234) / 19)
// This formula is found in Remy Landau's website and he
// attributes it to Wolfgang Alexander Shochen. I will use a less
// optimized function which I believe shows the underlying logic
// better.

// count how many months there has been in all years up to last
// year. The months of this year hasn't happened yet.
nYearH --

// In the 19 year cycle, there will always be 235 months. That
// would be 19 years times 12 months plus 7 extra month for the
// leap years. (19 * 12) + 7 = 235.

// Get how many 19 year cycles there has been and multiply it by
// 235
nMonSinceFirstMolad = Math.floor(nYearH / 19) * 235
// Get the remaining years after the last complete 19 year cycle
nYearH = nYearH % 19
// Add 12 months for each of those years
nMonSinceFirstMolad += 12 * nYearH
// Add the extra months to account for the leap years
if (nYearH >= 17) {
  nMonSinceFirstMolad += 6
} else if  (nYearH >= 14) {
  nMonSinceFirstMolad += 5
} else if  (nYearH >= 11) {
  nMonSinceFirstMolad += 4
} else if  (nYearH >= 8) {
  nMonSinceFirstMolad += 3
} else if  (nYearH >= 6) {
  nMonSinceFirstMolad += 2
} else if  (nYearH >= 3) {
  nMonSinceFirstMolad += 1
}
return nMonSinceFirstMolad
}
// This function returns if a given year is a leap year.
function IsLeapYear(nYearH) {
 var nYearInCycle

// Find out which year we are within the cycle.  The 19th year of
// the cycle will return 0
nYearInCycle = nYearH % 19
return ( nYearInCycle ==  3 ||
		 nYearInCycle ==  6 ||
		 nYearInCycle ==  8 ||
		 nYearInCycle == 11 ||
		 nYearInCycle == 14 ||
		 nYearInCycle == 17 ||
		 nYearInCycle == 0)
}
// This function gets the length of a Hebrew year.
function LengthOfYear(nYearH) {
var dThisTishrei1
var dNextTishrei1
var diff

// subtract the date of this year from the date of next year
dThisTishrei1 = Tishrei1(nYearH)
dNextTishrei1 = Tishrei1(nYearH + 1)
// Java's dates are stored in milliseconds. To convert it into days
// we have to divide it by 1000 * 60 * 60 * 24
diff = (dNextTishrei1 - dThisTishrei1) / ( 1000 * 60 * 60 * 24)
return Math.round(diff)
}
// This function converts a Hebrew date into the Gregorian date
function HebToGreg(nYearH, nMonthH, nDateH) {
var nLengthOfYear
var bLeap
var dGreg
var nMonth
var nMonthLen
var bHaser
var bShalem

bLeap = IsLeapYear(nYearH)
nLengthOfYear = LengthOfYear(nYearH)

// The regular length of a non-leap year is 354 days.
// The regular length of a leap year is 384 days.
// On regular years, the length of the months are as follows

bHaser = (nLengthOfYear == 353 || nLengthOfYear == 383)
bShalem = (nLengthOfYear == 355 || nLengthOfYear == 385)

// get the date for Tishrei 1
dGreg = Tishrei1(nYearH)

// Now count up days within the year
for (nMonth = 1; nMonth <= nMonthH - 1; nMonth ++) {
  if (nMonth == 1 ||
	  nMonth == 5 ||
	  nMonth == 8 ||
	  nMonth == 10 ||
	  nMonth == 12 ) {
	nMonthLen = 30
  } else if (nMonth == 4 ||
			 nMonth == 7 ||
			 nMonth == 9 ||
			 nMonth == 11 ||
			 nMonth == 13 ) {
	  nMonthLen = 29
  } else if (nMonth == 6) {
	  nMonthLen = (bLeap ? 30 : 0)
  } else if (nMonth == 2) {
	  nMonthLen = (bShalem ? 30 : 29)
  } else if (nMonth == 3) {
	  nMonthLen = (bHaser ? 29 : 30 )
  }
  dGreg.setDate(dGreg.getDate() + nMonthLen)
}
dGreg.setDate(dGreg.getDate() + nDateH - 1)
return dGreg
}
// This function figures out the Gregorian Date that corresponds to
// the first day of Tishrei, the first month of the Hebrew
// calendar, for a given Hebrew year.
function Tishrei1(nYearH) {
    var nMonthsSinceFirstMolad
    var nChalakim
    var nHours
    var nDays
    var nDayOfWeek
    var dTishrei1

    // We want to calculate how many days, hours and chalakim it has
    // been from the time of 0 days, 0 hours and 0 chalakim to the
    // molad at the beginning of year nYearH.
    //
    // The period between one new moon to the next is 29 days, 12
    // hours and 793 chalakim. We must multiply that by the amount
    // of months that transpired since the first molad. Then we add
    // the time of the first molad (Monday, 5 hours and 204 chalakim)
    nMonthsSinceFirstMolad = MonSinceFirstMolad(nYearH)
    nChalakim = 793 * nMonthsSinceFirstMolad
    nChalakim += 204
    // carry the excess Chalakim over to the hours
    nHours = Math.floor(nChalakim / 1080)
    nChalakim = nChalakim % 1080

    nHours += nMonthsSinceFirstMolad * 12
    nHours += 5

    // carry the excess hours over to the days
    nDays = Math.floor(nHours / 24)
    nHours = nHours % 24

    nDays += 29 * nMonthsSinceFirstMolad
    nDays += 2

    // figure out which day of the week the molad occurs.
    // Sunday = 1, Moday = 2 ..., Shabbos = 0
    nDayOfWeek = nDays % 7

    // This code handles these exceptions.
    if (!IsLeapYear(nYearH) &&
        nDayOfWeek == 3 &&
        (nHours * 1080) + nChalakim >= (9 * 1080) + 204) {

    nDayOfWeek = 5
      nDays += 2
    }
    else if ( IsLeapYear(nYearH - 1) &&
              nDayOfWeek == 2 &&
              (nHours * 1080) + nChalakim >= (15 * 1080) + 589 ) {
      // This prevents the previous year from being 382 days. Check
      // the Hebrew Year 5766 for an example. If Rosh Hashanah was not
      // pushed off a day then 5765 would be 382 days
      nDayOfWeek = 3
      nDays += 1
    }
    else {
      // see rule 2 above. Check the Hebrew year 5765 for an example
      if (nHours >= 18) {
        nDayOfWeek += 1
        nDayOfWeek = nDayOfWeek % 7
        nDays += 1
      }
      // see rule 1 above. Check the Hebrew year 5765 for an example
      if (nDayOfWeek == 1 ||
          nDayOfWeek == 4 ||
          nDayOfWeek == 6) {
        nDayOfWeek += 1
        nDayOfWeek = nDayOfWeek % 7
        nDays += 1
      }
    }

    // Here we want to add nDays to creation
    nDays -= 2067025
    dTishrei1 = new Date(1900, 0, 1) // 2067025 days after creation
    dTishrei1.setDate(dTishrei1.getDate() + nDays)

    return dTishrei1
   }
function GregToHeb(dGreg) {
var nYearH
var nMonthH
var nDateH
var nOneMolad
var nAvrgYear
var nDays
var dTishrei1
var nLengthOfYear
var bLeap
var bHaser
var bShalem
var nMonthLen
var bWhile
var d1900 = new Date(1900, 0, 1)

dTishrei1 = Tishrei1(nYearH)

if (SameDate(dTishrei1, dGreg)) {
  // If we got lucky and landed on the exact date, we can stop here
  nMonthH = 1
  nDateH = 1
}
else  {
  // Here is the brute force.  Either count up or count down nYearH
  // until Tishrei 1 is <= dGreg.
  if (dTishrei1 < dGreg) {
	// If Tishrei 1, nYearH is less than dGreg, count nYearH up.
	while (Tishrei1(nYearH + 1) <= dGreg) {
	  nYearH += 1
	}
  }
  else {
	// If Tishrei 1, nYearH is greater than dGreg, count nYearH down.
	nYearH -= 1
	while (Tishrei1(nYearH) > dGreg) {
	  nYearH -= 1
	}
  }

  // Subtract Tishrei 1, nYearH from dGreg. That should leave us with
  // how many days we have to add to Tishrei 1
  nDays = (dGreg - Tishrei1(nYearH)) / (24 * 60 * 60 * 1000)
  nDays = Math.round(nDays)
  // Find out what type of year it is so that we know the length of the
  // months
  nLengthOfYear = LengthOfYear(nYearH)
  bHaser = nLengthOfYear == 353 || nLengthOfYear == 383
  bShalem = nLengthOfYear == 355 || nLengthOfYear == 385
  bLeap = IsLeapYear(nYearH)

  // Add nDays to Tishrei 1.
  nMonthH = 1
  do {

	switch (nMonthH) {
	  case 1:
	  case 5:
	  case 6:
	  case 8:
	  case 10:
	  case 12:
		nMonthLen = 30
		break
	  case 4:
	  case 7:
	  case 9:
	  case 11:
	  case 13:
		nMonthLen = 29
		break
	  case 6: // Adar A (6) will be skipped on non-leap years
		nMonthLen = 30
		break
	  case 2: // Cheshvan, see note above
		nMonthLen = (bShalem ? 30 : 29)
		break
	  case 3: // Kislev, see note above
		nMonthLen = (bHaser ? 29: 30)
		break
	}

	if (nDays >= nMonthLen) {
	  bWhile = true
	  if (bLeap || nMonthH != 5) {
		nMonthH ++
	  }
	  else {
		// We can skip Adar A (6) if its not a leap year
		nMonthH += 2
	  }
	  nDays -= nMonthLen
	}
	else {
	  bWhile = false
	}
  } while (bWhile)
  //Add the remaining days to Date
  nDateH = nDays + 1
}
return nMonthH + "/" + nDateH + "/" + nYearH
}
// Returns true if d1==d2

function SameDate(d1, d2) {
    return (d1.getFullYear() == d2.getFullYear() && 
            d1.getMonth() == d2.getMonth() && 
            d1.getDate() == d2.getDate())
  } 
*/