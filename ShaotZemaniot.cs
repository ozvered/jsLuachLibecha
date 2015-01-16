using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WpfApplication1
{
    class ShaotZemaniot
    {
       public static  int[] arrComulativeDays = {1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366};
 

  // ===================================== Kinssat / Yetziat Shabbath Handlers ======================
  
  public static bool isGregorianLeapYear(int y) 
  {
    return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
  }

  /*
   * Returns the amount of days passed since the beginning of the year.
   */
  public static int daysSinceYearBegun( int dy, int mn, int yr) 
  {
    mn--;
    // Add the number of days passed + 1 if the current year is a leap year.
    return arrComulativeDays[mn] + dy + (((mn > 2 && isGregorianLeapYear(yr))==true)?1:0);
  }
         
  /*
   * This extremely complicated function, calculates the sunrise and sunset times.
   * Sunrise is stored at ret$[1]
   * Sunset is stored at ret$[2]
   * (ret$[0] - returns the status of the execution where 0 means success.
   */  
  
static double[] suntime(
  int dy, int mn, int yr,
  int sundeg, int sunmin,
  int londeg, int lonmin, string ew,
  int latdeg, int latmin, string ns,
  int timezone)
  {
      int ewi = 1, nsi = -1, status ;
      double sunrise = 0.0, sunset = 0.0;
 
 if (ew == "W")
      ewi = -1;
    else
      ewi = 1;
  
    if (ns == "N")
      nsi = 1;
    else
      nsi = -1;
      
  
    int success = 0;  // error code stored here.
    status = success;
    float longitude = ((float)(londeg + lonmin/60.0) * ewi);
    float latitude  = ((float)(latdeg + latmin/60.0) * nsi);

	int yday = daysSinceYearBegun(dy, mn, yr);
    var A = 1.5708; 
    var B = 3.14159; 
    var C = 4.71239; 
    var D = 6.28319;      
    var E = 0.0174533 * latitude; 
    var F = 0.0174533 * longitude; 
    var G = 0.261799 * timezone;
  
    var R = Math.Cos(0.01745 * (sundeg + sunmin/60.0));
  
    var J=0.0;
  
    // twice through the loop
    //    i=0 is for sunrise
    //    i=1 is for sunset
    for (int i = 0; i < 2; i++) 
      { 
    
        if(i!=1)
          J =  A;  // sunrise 
        else
          J = C;  // sunset
    
        var K = yday + ((J - F) / D); 
        var L = (K * .017202) - .0574039;              // Solar Mean Anomoly 
        var M = L + .0334405 * Math.Sin(L);            // Solar True Longitude 
        M += 4.93289 + (3.49066E-04) * Math.Sin(2 * L);
        
        // Quadrant Determination 
        if (D == 0) {
          // SHOULD NOT HAPPEN - ERROR HAS OCCURRED.  
          status = 1;
        } 
    
        while(M < 0)
          M = (M + D);
    
        while(M >= D)
          M = (M - D);
    
        if ((M / A) - Math.Floor(M / A) == 0)
          M += 4.84814E-06;
    
        var P = Math.Sin(M) / Math.Cos(M);                   // Solar Right Ascension 
        P = Math.Atan2(.91746 * P, 1); 
    
        // Quadrant Adjustment 
        if (M > C)
          P += D;
        else {
          if (M > A)
            P += B;
        } 
    
        var Q = .39782 * Math.Sin(M);      // Solar Declination 
        Q = Q / Math.Sqrt(-Q * Q + 1);     // This is how the original author wrote it! 
        Q = Math.Atan2(Q, 1); 
    
        var S = R - (Math.Sin(Q) * Math.Sin(E)); 
        S = S / (Math.Cos(Q) * Math.Cos(E)); 
    
        if(Math.Abs(S) > 1)
          status = 1;  // uh oh! no sunrise/sunset
    
        S = S / Math.Sqrt(-S * S + 1); 
        S = A - Math.Atan2(S, 1); 
    
        if(1!=i)
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
        
        if(1!=i)
          sunrise = V;  // sunrise
        else
          sunset = V;  // sunset
      } 

    double[] returnArray = {status,sunrise,sunset};
  
    return returnArray;
  }
  
  /*
   * Converts the time received from the function "suntime" to a 24 hour time.
   * ret$ = "hour : minutes" 
   */
  static string adjustTime(Double t) 
  {
    Double hour;
    Double min;
  
    Double time = t;
  
    hour = Math.Floor(time);
  
    min  = Math.Floor((time - hour) * 60.0 + 0.5);
  
    if (min >= 60) {
       hour += 1;
       min  -= 60;
    }
    
    var ReturnTime = hour + ":" + ((min < 10) ? "0" : "") + min;
  
    return ReturnTime;
  
  }


  /*
   * This function calculates the Knissat & Yetziaat shabbath times.
   * It is currently set to calculate the time based on ofek otniel (day light saving time applies)
   */
  public static string[] calculateZmaniKinsatVeyetziatShabbath(int dayG,int monthG,int yearG, string hebDate)
  {
  //'OTNIEL
    string NorthOrSouth = "N";
    int latd = 31;
    int latm = 25;
    string EastOrWest = "E";
    int lngd = 35;
    int lngm = 00;
    int tz = 2;
    string[] arrZmanimRet = {"",""};//= Array(2);
    var yom = new DateTime (yearG, monthG, dayG);
    // Check daylight saving time.
    // Daylight saving time in Israel: From the friday before the 2nd of April untill 10th of Tishrei.
   //--- hebDate=GregToHeb(new Date (yearG, monthG, dayG));
    var hebDateApril2= hebDate.Substring(0,2)+"/3/2";

    var mdyDate = hebDate.Split('/');
    string[] mdyDateApril2 = hebDateApril2.Split('/');
    
    // If after the 2nd of April
    if ((monthG > 3) && (dayG > 1))
    {
      // If we are in the same hebrew year as the 2nd of april it means we are before the
      // 10th of Tishrei - hence Daylight saving time applies.
      if (mdyDate[2] == mdyDateApril2[2]) 
      {
        tz++;
      }
      // If we are a year after the 2nd of April, check to see if we are before the 10th
      // of Tishrei - DST still applies.
      else if ((System.Convert.ToInt32(mdyDate[2]) > System.Convert.ToInt32(mdyDateApril2[2]))
              && (System.Convert.ToInt32(mdyDate[0]) == 1)
              && (System.Convert.ToInt32(mdyDate[1]) < 10))
      {
        tz++;
      }
      
    }
    // motzei shabbat (3 small stars)
    Double[] time = suntime(dayG, monthG/*+1*/, yearG, 98, 30, lngd, lngm, EastOrWest, latd, latm, NorthOrSouth, tz);

    // If Sunset and sunrise have been calculated successfully.
    if(time[0] == 0)
    {
      // Set zman Yetsiat shabbath.
      arrZmanimRet[1] = adjustTime(time[2]);

    }
    
    // Kinssat Shabbath
    var day_before = yom.AddDays(- 1);
    int db = day_before.Day;
    int mb = day_before.Month;// +1;
    int yb = day_before.Year;

    time = suntime(db, mb, yb, 90, 50, lngd, lngm, EastOrWest, latd, latm, NorthOrSouth, tz);
    // Set zman Kinssat shabbath
    arrZmanimRet[0] = adjustTime(time[2] - 22.0/60.0);
  

   
     return arrZmanimRet;
  }
/*
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
*/
    }
}
