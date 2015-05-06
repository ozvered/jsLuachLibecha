var myNS = myNS || {};

myNS.H_G_year = function () {
  // private members
  var _MCArr=[];
  var _headF = 0;
  var _lengthF = 0;
  var _hName = "", _gName = 0;

  var _Add = function (MonthCollection) {
    _MCArr.push(MonthCollection);
  };

  var _RemoveAt = function (idx) {
      _MCArr.splice(idx,1);
  };

  var _Remove = function (MonthCollection) {
    for (var i in _mArr) {
      if(  _MCArr[i]=== MonthCollection)
        _RemoveAt(i);
    }
  };


 
  
  return { // public parts (aka interface)
  headF : _headF,
  lengthF : _lengthF,
  MCArr : _MCArr,
  hName : _hName,
  gName : _gName,
  Add : _Add
  };
};
//---------------------------------------------------------------------------
function CREATEyear1(argv){
var myYear = new myNS.H_G_year();
var     hName='',gName='',
        argc = argv.length, //*const char **
        year,   //* Hebrew year (A.M.) *
        g,      //* Gregorian flag *
        kvia,   //* excess of length of the Hebrew year over 353 *
        Wd = 0,     //* day in the week (mod. 7) *
        Hm,     //* month in the Hebrew year (0:12) *
        Gm,     //* month in the Gregorian year (0:11) *
        Hl,     //* length of Hebrew month Hm *
        Gl,     //* length of Gregorian month Gm *
        Hd,     //* day in the Hebrew month (1:Hl) *
        Gd,     //* day in the Gregorian month (1:Gl) *
        skip,   //* empty cells to skip *
    
        dflag = 0,  //* Israel/Diaspora style *
        hflag = 0,  //* English/Hebrew printout *
        jflag = 0  //* Gregorian/Julian calendar *
      //  p='';
           
 
 var l = argv.length;//new

 while (--argc > 2)
 {

     if (argv.substring(l - argc - 1, 1) == "-")
     {
         argc=--argc;
         switch (argv.substring(l - argc, 1))
         {
             case "e":   //* English printout *
                 hflag = 0;
                 break;
             case "h":   //* Hebrew printout *
                 hflag = 1;
                 break;
             case "i":   //* Israel style *
                 dflag = 0;
                 break;
             case "d":   //* Diaspora style *
                 dflag = 1;
                 break;
             case "g": //* Gregorian calendar *
                 jflag = 0;
                 break;
             case "j":   //* Julian Calendar *
                 jflag = 1;
                 break;
             default:
                 // illegal option
                 argc = 1;
                 break;
         }
     }

     else
     {
        
         var year = 0;
       
         try { year = (argv.substring(l - argc - 1)); }
         catch (error)
         {
             // illegal argument
             argc = 1;
         }
      }
 }

 if (hflag == 1)
 {
     hName = "לוח לשנת " + " " + alef(year);
 }
 else
 {
     hName = "Calendar for " + year;
 }
 
myYear.gName=year;

 g = (jflag != 1 && year >= 5343) ? 1 : 0;



 var GR=Gauss(year - 1, (g == 1 ? true : false));
 Gd = GR[0];
 Wd = GR[1];

 GR = Gauss(year, (g == 1 ? true : false)) 
 kvia  = GR[0]- Gd + 12;;
 year -= 3760;

 if (hflag == 1)
 {
     gName = "שנים " + (g == 1 ? "גרגור" : "יול") + "יניות " + (year - 1) + "-" + (year);
 }
 else
 {
     gName = (g == 1 ? "Gregor" : "Jul") + "ian years " + (year - 1) + "-" + (year);
 }

 if (hflag == 1)
 {
     hName = hName + " נוסח " + (dflag == 1 ? "הגולה" : "ישראל");
 }
 else
 {
     hName =  hName + " Style" + (dflag == 1 ? "Diaspora" : "Israel");
 }

 //----------------------------------

  var Nmonth;
  var hMcol = new myNS.MonthCollection(hName, gName);
  {
         Nmonth = new myNS.Month( "Tishri", "תשרי"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Heshvan", "חשון"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Kislev", "כסלו"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Tevet", "טבת"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Shevat", "שבט"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Adar I", "אדר א"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "", ""); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Nisan", "ניסן"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Iyyar", "אייר"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Sivan", "סיון"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Tammuz", "תמוז"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Av", "אב"); hMcol.Add(Nmonth);
         Nmonth = new myNS.Month( "Elul", "אלול"); hMcol.Add(Nmonth);

  };

  hMcol.SetAllMonthsLength("30,0,0,29,30,30,29,30,29,30,29,30,29");

  myYear.Add(hMcol);

  var gMcol = new myNS.MonthCollection(hName, gName);
  {

     Nmonth = new myNS.gMonth( "Jan", "ינו","January", "ינואר"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Feb", "פבר","February", "פברואר"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Mar", "מרס","March", "מרס"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Apr", "אפר","April", "אפריל"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "May", "מאי","May", "מאי"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Jun", "יוני","June", "יוני"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Jul", "יולי","July", "יולי"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Aug", "אוג","August", "אוגוסט"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Sep", "ספט","September", "ספטמבר"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Oct", "אוק","October", "אוקטובר"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Nov", "נוב","November", "נובמבר"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Dec", "דצמ","December", "דצמבר"); gMcol.Add(Nmonth);
     Nmonth = new myNS.gMonth( "Jan", "ינו","January", "ינואר"); gMcol.Add(Nmonth);
  };
  

  gMcol.SetAllMonthsLength("31,0,31,30,31,30,31,31,30,31,30,31,31");

  myYear.Add(gMcol);
  //----------------------------------
         
  gMcol.MArr[1].Mlength = 28;
  if ((year % 4 == 0 && (g == 0 || year % 100 != 0)) || year % 400 == 0)
  {
      kvia++;
      gMcol.MArr[1].Mlength++;
  }
  if (hflag == 1)
  {
      hMcol.MArr[6].hebName = (kvia >= 30) ? "אדר ב" : "אדר";
  }
  else
  {
      hMcol.MArr[6].engName = (kvia >= 30) ? "Adar II" : "Adar";
  }
  hMcol.MArr[1].Mlength = (kvia % 30 == 2) ? 30 : 29;
  hMcol.MArr[2].Mlength = (kvia % 30 == 0) ? 29 : 30;
  Wd += 2;
  if (Gd <= 21)
  {
      Gd += 10;
      Gm = 7;
  }
  else if (Gd <= 51)
  {
      Gd -= 21;
      Gm = 8;
  }
  else
  {
      Gd -= 51;
      Gm = 9;
  }

  myYear.head = Wd;
 
  for (Hm = 0; Hm < 13; Hm++)
  {
      var hMonthTitle = "";
      var gMonthTitle = ""; 
      var hDate = 0;
      if (Hm == 5 && kvia < 30) Hm++;
      Hl = hMcol.MArr[Hm].Mlength;
      skip = (Wd - 1) % 7;
      Wd += Hl;
      BuildMonthDays(Hm, Hl, (skip + 1) % 7, (kvia >= 30) ? 1 : 0, dflag, hflag, year + 3760, myYear);
      //------------------------------ Gd
      Gl = gMcol.MArr[Gm].Mlength;
      if (Gl - Gd >= Hl - 1)
      {
 
          gMonthTitle = (hflag==1 ? gMcol.MArr[Gm].hebName : gMcol.MArr[Gm].engName);

          for (Hd = 1; Hd <= Hl; Hd++)
          {
             AddMonthGDays(Hm, hDate++, Gd++, Gm, year, myYear);
          }
      }
      else if (gMcol.MArr[Gm+1].Mlength + Gl - Gd >= Hl - 1)
      {
    
          gMonthTitle = (hflag == 1 ? (gMcol.MArr[Gm]).shortHebName + "-" + (gMcol.MArr[Gm + 1]).shortHebName : (gMcol.MArr[Gm]).shortEngName + "-" + (gMcol.MArr[Gm + 1]).shortEngName);
     
          if (year == 1583 && Hm != 1)
          {
              Gd -= 10;
              Hl = 18;
          }
          for (Hd = 1; Gd <= Gl; Hd++)
          {
              AddMonthGDays(Hm, hDate++, Gd++,Gm,year, myYear);
          }
          Gl = gMcol.MArr[++Gm].Mlength;
          for (Gd = 1; Hd <= Hl; Hd++)
          {
              AddMonthGDays(Hm, hDate++, Gd++, Gm, year, myYear);
          }
          if (Hl == 18)
          {
              Hl = 30;
              for (Gd += 10; Hd <= Hl; Hd++)
              {
                  AddMonthGDays(Hm, hDate++, Gd++, Gm, year, myYear);
              }
          }
      }
      else
      {
          gMonthTitle = (hflag == 1 ? (gMcol.MArr[Gm].shortHebName + "-" + gMcol.MArr[Gm + 2].shortHebName) : (gMcol.MArr[Gm].shortEngName + "-" + gMcol.MArr[Gm + 2].shortEngName));
          
          for (Hd = 1; Gd <= Gl; Hd++)
          {
              AddMonthGDays(Hm, hDate++, Gd++,Gm,year, myYear);
          }
          Gl = gMcol.MArr[++Gm].Mlength;
          for (Gd = 1; Gd <= Gl; Hd++)
          {
              AddMonthGDays(Hm, hDate++, Gd++, Gm, year, myYear);
          }
          Gl = gMcol.MArr[++Gm].Mlength;
          for (Gd = 1; Hd <= Hl; Hd++)
          {
              AddMonthGDays(Hm, hDate++, Gd++, Gm, year, myYear);
          }
      }
      if (Gd > Gl)
      {
          Gd -= Gl;
          Gm++;
      }
      if (Gm >= 12) Gm -= 12;

      hMcol.MArr[Hm].gName = gMonthTitle;
  }

  return myYear;
 
}

//---------------------------------------------------------------------------

        function AddMonthGDays(month, /* Hebrew Month (0:12) */
               Hd,     //* day in the Hebrew month (0:Hl-1) *
               Gd,     //* day in the Gregorian month (1:Gl) *
               Gm,     //* month in the Gregorian year (0:11) *
               Gy,     //* Gregorian year *

               myYear
            )
        {
                var currDay = (myYear.MCArr[0]).MArr[month].daysArr[Hd];
                currDay.gregorianDate = Gd+'';
                currDay.gregorianMonth = Gm;
				currDay.gregorianYear = Gy-(Gm>month?1:0);
				
                var hebYear=(3760+Gy);
                if(Gm>7 && month<4)Gy=Gy-1;
                Gm = Gm + 1;//-->(1:12) 
                if (Gm > 12) { Gm = 1; Gy++; }
                month = month + 1;//-->(1:12) //on the global scope

                if (currDay.hasOwnProperty('inTime'))// sDay/ moedDay
                {
                    var ZmaniKinsatVeyetziatShabbath = calculateZmaniKinsatVeyetziatShabbath(Gd, Gm, Gy, hebYear + "/" + month + "/" + currDay.hDateNum);
                    (currDay).inTime = ZmaniKinsatVeyetziatShabbath[0];
                     (currDay).outTime = ZmaniKinsatVeyetziatShabbath[1];
                }
            return 0;
        }

       function BuildMonthDays( month, /* Hebrew Month (0:12) */
                 length, /* Length of the month (29:30) */
                 head, /* Week day of the first day of the month (0:6) */
                 leap, /* leap year (0:1) */
                 dflag, /* Israel/Diaspora style */
                 hflag,  /* English/Hebrew printout */
                 year, /* Hebrew year */
                 
                 myYear
            )
        {
            ((myYear.MCArr[0]).MArr[month]).head = head;
            var short_kislev = 0;
            var holiday = new Array(30);
            var Holyholiday = new Array(30);
            var k;
            holiday[0] = holiday[29] = hflag == 0 ? "Rosh Chodesh" : "ראש חדש";
            Holyholiday[0] = Holyholiday[29] = false;
            switch (month)
            {
                case 0:
                    holiday[0] = holiday[1] = hflag == 0 ? "Rosh Hashana" : "ראש השנה";
                    Holyholiday[0] = Holyholiday[1] = true;
                    holiday[2 + (head == 5 ? 1 : 0)] = hflag == 0 ? "Tzom Gdalia" : "צום גדליה";
                    Holyholiday[2 + (head == 5 ? 1 : 0)] = false;
                    holiday[9] = hflag == 0 ? "Yom Kipur" : "יום כפור";
                    Holyholiday[10] = true;
                    for (k = 14; k < 15 + dflag; k++)
                    {
                        holiday[k] = hflag == 0 ? "Succot" : "סכות";
                        Holyholiday[k] = true;
                    }
                    for (; k < 20; k++)
                    {
                        holiday[k] = hflag == 0 ? "Chol Hamoed Succot" : "חול המועד סכות";
                        Holyholiday[k] = false;
                    }
                    holiday[20] = hflag == 0 ? "Hosha’ana Raba" : "הושענא רבה";
                    Holyholiday[20] = false;
                    Holyholiday[21] = true;
                    if (1 != dflag)
                    {
                        holiday[21] = hflag == 0 ? "Shmini Atzeret/Simchat Tora" :
                                "שמיני עצרת/שמחת תורה";
                    }
                    else
                    {
                        holiday[21] = hflag == 0 ? "Shmini Atzeret" : "שמיני עצרת";
                        holiday[22] = hflag == 0 ? "Simchat Tora" : "שמחת תורה";
                        Holyholiday[22] = true;
                    }
                    break;
                case 2:
                    short_kislev = length == 29 ? 1 : 0;
                    for (k = 24; k < 29; k++)
                    {
                        holiday[k] = hflag == 0 ? "Hannuka" : "חנוכה";
                        Holyholiday[k] = false;
                    }
                    holiday[29] = hflag == 0 ? "Hannuka/Rosh Chodesh" : "חנוכה/ראש חדש";
                    Holyholiday[29] = false;
                    break;
                case 3:
                    holiday[0] = hflag == 0 ? "Hannuka/Rosh Chodesh" : "חנוכה/ראש חדש";
                    Holyholiday[0] = false;
                    for (k = 1; k < 2 + short_kislev; k++)
                    {
                        holiday[k] = hflag == 0 ? "Hannuka" : "חנוכה";
                        Holyholiday[k] = false;
                    }
                    holiday[9 + (head == 5 ? 1 : 0)] = hflag == 0 ? "Tzom Asara B’Tevet" : "צום עשרה בטבת";
                    Holyholiday[9 + (head == 5 ? 1 : 0)] = false;
                    break;
                case 4:
                    holiday[14] = hflag == 0 ? "Tu BiShevat" : "ט״ו בשבט";
                    Holyholiday[14] = false;
                    break;
                case 6:
                    holiday[12 - 2 * (head == 2 ? 1 : 0)] = hflag == 0 ? "Taanit Ester" : "תענית אסתר";
                    Holyholiday[12 - 2 * (head == 2 ? 1 : 0)] = false;
                    holiday[13] = hflag == 0 ? "Purim" : "פורים";
                    Holyholiday[13] = false;
                    holiday[14] = hflag == 0 ? "Shushan Purim" : "שושן פורים";
                    Holyholiday[14] = false;
                    break;
                case 7:
                    for (k = 14; k < 15 + dflag; k++)
                    {
                        holiday[k] = hflag == 0 ? "Pesach" : "פסח";
                        Holyholiday[k] = true;
                    }
                    for (; k < 20; k++)
                    {
                        holiday[k] = hflag == 0 ? "Chol Hamoed Pesach" : "חול המועד פסח";
                        Holyholiday[k] = false;
                    }
                    for (; k < 21 + dflag; k++)
                    {
                        holiday[k] = hflag == 0 ? "Pesach" : "פסח";
                        Holyholiday[k] = true;
                    }
                    holiday[26 + (head == 3 ? 1 : 0)] = hflag == 0 ? "Yom Hashoa" : "יום השואה";
                    Holyholiday[26 + (head == 3 ? 1 : 0)] = false;
                    break;
                case 8:
                    holiday[k = head == 3 ? 1 : head == 2 ? 2 : head == 5 && year >= 5764 ? 4 : 3] =
                                    hflag == 0 ? "Yom Hazikaron" : "יום הזכרון";
                    Holyholiday[k = head == 3 ? 1 : head == 2 ? 2 : head == 5 && year >= 5764 ? 4 : 3] = false;
                    holiday[k + 1] = hflag == 0 ? "Yom Haatzmaut" : "יום העצמאות";
                    Holyholiday[k+1] = false;
                    holiday[13] = hflag == 0 ? "Pesach Sheni" : "פסח שני";
                    Holyholiday[13] = false;
                    holiday[17] = hflag == 0 ? "Lag Baomer" : "ל״ג בעמר";
                    Holyholiday[17] = false;
                    holiday[27] = hflag == 0 ? "Yom Yerushalaim" : "יום ירושלים";
                    Holyholiday[27] = false;
                    break;
                case 9:
                    for (k = 5; k < 6 + dflag; k++)
                    {
                        holiday[k] = hflag == 0 ? "Shavuot" : "שבועות";
                        Holyholiday[k] = true;
                    }
                    break;
                case 10:
                    holiday[16 + (head == 5 ? 1 : 0)] = hflag == 0 ? "Tzom Shiv’a Asar B’Tammuz" :
                            "צום שבעה עשר בתמוז";
                    Holyholiday[16 + (head == 5 ? 1 : 0)] = false;
                    break;
                case 11:
                    holiday[8 + (head == 6 ? 1 : 0)] = hflag == 0 ? "Tzom Tish’a B’Av" :
                            "צום תשעה באב";
                    Holyholiday[8 + (head == 6 ? 1 : 0)] = false;
                    holiday[14] = hflag == 0 ? "Tu B’Av" : "ט״ו באב";
                    Holyholiday[14] = false;
                    break;
            }
            //-------------------------------------------
            var i, j;
            var sholiday = new Array(5);
            var special = new Array(5);

            var week = new Array(7);
            week[0]=new Array("Sa", "ש");
            week[1]=new Array("Su", "א");
            week[2]=new Array("M", "ב");
            week[3]=new Array("Tu", "ג");
            week[4]=new Array("W", "ד");
            week[5]=new Array("Th", "ה");
            week[6]=new Array("F", "ו");

            var portion = new Array(54);
            portion[0]=new Array("Bereshit", "בראשית");
            portion[1]=new Array("Noach", "נח");
            portion[2]=new Array("Lech-Lecha", "לך־לך");
            portion[3]=new Array("Vayera", "וירא");
            portion[4]=new Array("Chayei-Sarah", "חיי־שרה");
            portion[5]=new Array("Toldot", "תולדת");
            portion[6]=new Array("Vayetze", "ויצא");
            portion[7]=new Array("Vayishlach", "וישלח");
            portion[8]=new Array("Vayeshev", "וישב");
            portion[9]=new Array("Miketz", "מקץ");
            portion[10]=new Array("Vayigash", "ויגש");
            portion[11]=new Array("Vayechi", "ויחי");
            portion[12]=new Array("Shemot", "שמות");
            portion[13]=new Array("Vaera", "וארא");
            portion[14]=new Array("Bo", "בא");
            portion[15]=new Array("Beshalach", "בשלח");
            portion[16]=new Array("Yitro", "יתרו");
            portion[17]=new Array("Mishpatim", "משפטים");
            portion[18]=new Array("Teruma", "תרומה");
            portion[19]=new Array("Tetzave", "תצוה");
            portion[20]=new Array("Ki-Tisa", "כי־תשא");
            portion[21]=new Array("Vayakhel", "ויקהל");
            portion[22]=new Array("Pekudei", "פקודי");
            portion[23]=new Array("Vayikra", "ויקרא");
            portion[24]=new Array("Tzav", "צו");
            portion[25]=new Array("Shemini", "שמיני");
            portion[26]=new Array("Tazri’a", "תזריע");
            portion[27]=new Array("Metzora", "מצרע");
            portion[28]=new Array("Acharei-Mot", "אחרי־מות");
            portion[29]=new Array("Kedoshim", "קדשים");
            portion[30]=new Array("Emor", "אמר");
            portion[31]=new Array("Behar", "בהר");
            portion[32]=new Array("Bechukotai", "בחקתי");
            portion[33]=new Array("Bamidbar", "במדבר");
            portion[34]=new Array("Naso", "נשא");
            portion[35]=new Array("Beha’alotcha", "בהעלתך");
            portion[36]=new Array("Shelach", "שלח");
            portion[37]=new Array("Korach", "קרח");
            portion[38]=new Array("Chukat", "חקת");
            portion[39]=new Array("Balak", "בלק");
            portion[40]=new Array("Pinchas", "פינחס");
            portion[41]=new Array("Matot", "מטות");
            portion[42]=new Array("Mase’ei", "מסעי");
            portion[43]=new Array("Devarim", "דברים");
            portion[44]=new Array("Vaetchanan", "ואתחנן");
            portion[45]=new Array("Ekev", "עקב");
            portion[46]=new Array("Re’e", "ראה");
            portion[47]=new Array("Shoftim", "שפטים");
            portion[48]=new Array("Ki-Tetze", "כי־תצא");
            portion[49]=new Array("Ki-Tavo", "כי־תבוא");
            portion[50]=new Array("Nitzavim", "נצבים");
            portion[51]=new Array("Vayelech", "וילך");
            portion[52]=new Array("Ha’azinu", "האזינו");
            portion[53]=new Array("Vezot-Habracha", "וזאת־הברכה");

            /* Mark Saturdays which fall in a holiday in Tishri, Nisan and Sivan */
            /* Mark special Saturday in Tishri */
            /* Mark 4 special Saturdays in Adar or its vicinity */
            /* Initialize reading seqequence in Tishri */
            if (month == 0)
            {
                sholiday[2] = hflag == 0 ? "Succot" : "סכות";
                if (head == 0)
                {
                    seq = 53;/*Haazinu*/
                    sholiday[0] = hflag == 0 ? "Rosh Hashana" : "ראש השנה";
                    special[1] = hflag == 0 ? "Shuva" : "שובה";
                    if (1 != dflag)
                    {
                        sholiday[3] = hflag == 0 ? "Shmini Atzeret/Simchat Tora" :
                                "שמיני עצרת/שמחת תורה";
                    }
                    else
                    {
                        sholiday[3] = hflag == 0 ? "Shmini Atzeret" : "שמיני עצרת";
                    }
                }
                else if (head == 5)
                {
                    seq = 53;/*Haazinu*/
                    special[0] = hflag == 0 ? "Shuva" : "שובה";
                    sholiday[1] = hflag == 0 ? "Yom Kipur" : "יום כפור";
                }
                else
                {
                    seq = 52;/*Vayelech*/
                    special[0] = hflag == 0 ? "Shuva" : "שובה";
                }
            }
            else if (month == 5 || (month == 4 && 1 != leap))
            {
                if (head != 5)
                    special[3 + ((head == 0) ? 1 : 0)] = hflag == 0 ? "Shekalim" : "שקלים";
            }
            else if (month == 6)
            {
                if (head == 0)
                    special[0] = hflag == 0 ? "Shekalim" : "שקלים";
                special[1] = hflag == 0 ? "Zachor" : "זכור";
                special[2 + ((head == 0 || head == 6) ? 1 : 0)] = hflag == 0 ? "Para" : "פרה";
                if (head != 6)
                    special[3 + ((head == 0) ? 1 : 0)] = hflag == 0 ? "Hachodesh" : "החודש";
            }
            else if (month == 7)
            {
                if (head == 0)
                    special[0] = hflag == 0 ? "Hachodesh" : "החודש";
                sholiday[2] = hflag == 0 ? "Pesach" : "פסח";
                if (dflag == 1 && head == 0) sholiday[3] = hflag == 0 ? "Pesach" : "פסח";
            }
            else if (month == 9 && dflag == 1 && head == 1)
            {
                sholiday[0] = hflag == 0 ? "Shavuot" : "שבועות";
            }
            i = -1;
            
            for (j = 0; j < length; j++)
            {
                var newDay,newSDay=null,newMDay=null;

                if (((j + head) % 7) == 0)// shabas
                {
                    newSDay = new myNS.sDay((j + 1)+'', week[(j + head) % 7][hflag]);
                    newDay = /*(Day)*/newSDay;
                }
                else if (holiday[j] != null && Holyholiday[j])
                {
                    newMDay = new myNS.moedDay((j + 1)+'', week[(j + head) % 7][hflag]);
                    newDay = /*(moedDay)*/newMDay;
                }
                else
                {
                    newDay = new myNS.Day((j + 1)+'', week[(j + head) % 7][hflag]);
                }

                newDay.hDateNum = j + 1;
                if(hflag == 1)
                {
                    newDay.hDate=alef(j + 1);
                }

                if (holiday[j] != null) newDay.specialTitle=holiday[j];
           
                
       
                if (((j + head) % 7) > 0)//not shabas
                {
                   (myYear.MCArr[0].MArr[month]).AddDay(newDay);
                   continue;
                }
                if (sholiday[++i] != null)//special shabas - in holiday?
                {
                    newSDay.shabatTitle=sholiday[i];
                     (myYear.MCArr[0].MArr[month]).AddDay(newSDay);
                    sholiday[i] = null;
                    continue;
                }
                //regular shabas
                (myYear.MCArr[0].MArr[month]).AddDay(newSDay);
                /* Prvar reading sequence */
                /* Check for possible joined reading */
                var curPortion = portion[seq - 1][hflag];
                if ((seq == 22 /*Vayakhel/Pekudei*/ &&
                            1 != leap && (head != 0 || i == 4)) ||//1 != leap so always seprate, if not always united except mela and rh in yom hie so head == 0 && i == 5
                        (seq == 27 /*Tazria/Metzora*/ &&
                            1 != leap) ||
                        (seq == 29 /*Acharei/Kedoshim*/ &&
                            1 != leap) ||
                        (seq == 32 /*Behar/Bechukotai*/ &&  // Eyar
                            1 != leap && (dflag == 1 || head != 2)) || // in dflag == 0 eretz yisruel so shmini of passover is not shabas and 5 shabtot in hesvan so only in eretz yisruel we seprateBehar/Bechukotai
                        (seq == 39 /*Chukat/Balak*/ && //TAMUZ 
                            dflag == 1 && head == 3) ||// if yom tov shini of shavouot in shabas so head == 3
                        (seq == 42 /*Matot/Masei*/ && //TAMUZ - AV
                            (1 != leap ||
                            (dflag == 1 && month == 11) ||// bagola  when matot in Av so shmini  of passover take one shabas
                            (month == 10 && (head == 3 || (head == 1 && i == 3)))
                            )) ||
                        (seq == 51 /*Nitzavim/Vayelech*/ && //ELUL -  no shabas between yom kipur and sucot or due to yom kipur on shabas  and so head == 4   or due to sucot on shabas  and so head == 6 
                            (head == 4 || head == 6)))
                {
                    curPortion = curPortion + "/" + portion[seq++][hflag];
                }
                if (special[i] != null)
                {
                    curPortion = curPortion + "/" + special[i];
                    special[i] = null;
                }
                newSDay.shabatTitle=curPortion;
                 if (++seq > 53)
                    seq = 1;
            }
            return 1;
        }


        function alef(n)
        {
            var fputs = "";
            var digits = new Array(3);
            digits[0] = new Array("א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט");
            digits[1] = new Array("י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ");
            digits[2] = new Array("ק", "ר", "ש", "ת", "קת", "רת", "שת", "תת", "קתת");


            var special =new Array("וט", "זט");
            var i = 0;

            while (n > 0)
            {
              n=Math.floor(n);
                if (i == 3)
                {
                    i = 0;
                    fputs += "'";
                }
                if (i == 0 && (n % 100 == 15 || n % 100 == 16))
                {
                    fputs += special[n % 100 - 15];
                    n /= 100;
                    i = 2;
                }
                else
                {
                    if (n % 10 > 0) fputs += digits[i][n % 10 - 1];
                    n /= 10;
                    i++;
                }
            }
            return Reverse(fputs);
        }

        function Reverse(str)
        {
            return str.split("").reverse().join("");;
        }



        /*
         * March date and day-of-the-week for Passover by K. F. Gauss formula
         *
         * Author:
         *      Dr. Zvi Har'El,                             ד"ר צבי הראל
         *      Department of Mathematics,              הפקולטה למתמטיקה
         *      Technion, Israel Institute of Technology, הטכניון - מט"ל
         *      Haifa 32000, Israel.                   חיפה 32000, ישראל
         *      E-Mail: rl@math.technion.ac.il
         *
         */

        /* Basic constants */
         var T = (33.0 + 14.0 / 24.0);
         var L = ((1.0 + 485.0 / 1080.0) / 24.0 / 19.0);
         var K = ((29.0 + (12.0 + 793.0 / 1080.0) / 24.0) / 19.0);

        /* Derived constants */
         var m0 = (T - 10.0 * K + L + 14.0);
         var m1 = ((21.0 + 589.0 / 1080.0) / 24.0); /* 13*19*K mod 1 */
         var m2 = ((15.0 + 204.0 / 1080.0) / 24.0); /* 1 - (12*19*K mod 1) */
        function  Gauss(year, g)
        {
          var arrGaussRet = new Array(2);
            var a, b, M;
            var c;
            var m;
            var a = (12 * year + 17) % 19;
            var b = year % 4;
            var m = m0 + K * a + b / 4.0 - L * year;
            if (m < 0) m--;
            var M = Math.floor(m);
            if (m < 0) m++;
            m -= M;
            switch (c = (M + 3 * year + 5 * b + 5) % 7)
            {
                case 0:
                    if (a <= 11 || m < m1) break;
                    c = 1; M++; break;
                case 1:
                    if (a <= 6 || m < m2) break;
                    c = 3; M += 2; break;
                case 2:
                    c = 3; M++; break;
                case 4:
                    c = 5; M++; break;
                case 6:
                    c = 0; M++; break;
            }
         
            if (g) /* Gregorian Calendar */
                M += Math.floor((year - 3760) / 100 - (year - 3760) / 400 - 2);
            arrGaussRet[0]=M;
            arrGaussRet[1]=c;
            return arrGaussRet;
        }

