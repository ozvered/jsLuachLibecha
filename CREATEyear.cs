using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WpfApplication1
{
    class H_G_year : IEnumerable
    {
        //Fields:
        public ArrayList mcArr;
        

        int headF;
        int lengthF;

        //Properties:
        public int head { get { return headF; } set { headF = value; } }
        public int length { get { return lengthF; } set { lengthF = value; } }
        public string hName = "", gName = "";
        //C'tors:
        public H_G_year()
           
        {
            mcArr = new ArrayList();
         }  
        
        //Methods:
        public void Add(MonthCollection newMonthCollection)
        {
            mcArr.Add(newMonthCollection);
        }

        public static H_G_year CREATEyear1(string argv)
        {
              H_G_year myYear= new H_G_year();
              int argc = argv.Length, //*const char **
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
                  jflag = 0;  //* Gregorian/Julian calendar *

              char p;   
              MonthCollection hMcol = new MonthCollection()
              {
    
                    new hMonth( "Tishri", "תשרי"),
                    new hMonth( "Heshvan", "חשון"),
                    new hMonth( "Kislev", "כסלו"),
                    new hMonth( "Tevet", "טבת"),
                    new hMonth( "Shevat", "שבט"),
                    new hMonth( "Adar I", "אדר א"),
                    new hMonth( "", ""),
                    new hMonth( "Nisan", "ניסן"),
                    new hMonth( "Iyyar", "איר"),
                    new hMonth( "Sivan", "סיון"),
                    new hMonth( "Tammuz", "תמוז"),
                    new hMonth( "Av", "אב"),
                    new hMonth( "Elul", "אלול")

              };
              hMcol.SetAllMonthsLength("30,0,0,29,30,30,29,30,29,30,29,30,29");

              myYear.Add(hMcol);

             MonthCollection gMcol = new MonthCollection()
              {
    
                new gMonth( "January", "ינואר" ),
                new gMonth( "February", "פברואר" ),
                new gMonth( "March", "מרס" ),
                new gMonth( "April", "אפריל" ),
                new gMonth( "May", "מאי" ),
                new gMonth( "June", "יוני" ),
                new gMonth( "July", "יולי" ),
                new gMonth( "August", "אוגוסט" ),
                new gMonth( "September", "ספטמבר" ),
                new gMonth( "October", "אוקטובר" ),
                new gMonth( "November", "נובמבר" ),
                new gMonth( "December", "דצמבר" ),
                new gMonth( "January", "ינואר" )
              };
            
            ((gMonth)gMcol[0]).SetShortNames("Jan", "ינו");
            ((gMonth)gMcol[1]).SetShortNames("Feb", "פבר");
            ((gMonth)gMcol[2]).SetShortNames("Mar", "מרס");
            ((gMonth)gMcol[3]).SetShortNames("Apr", "אפר");
            ((gMonth)gMcol[4]).SetShortNames("May", "מאי");
            ((gMonth)gMcol[5]).SetShortNames("Jun", "יוני");
            ((gMonth)gMcol[6]).SetShortNames("Jul", "יולי");
            ((gMonth)gMcol[7]).SetShortNames("Aug", "אוג");
            ((gMonth)gMcol[8]).SetShortNames("Sep", "ספט");
            ((gMonth)gMcol[9]).SetShortNames("Oct", "אוק");
            ((gMonth)gMcol[10]).SetShortNames("Nov", "נוב");
            ((gMonth)gMcol[11]).SetShortNames("Dec", "דצמ");
            ((gMonth)gMcol[12]).SetShortNames("Jan", "ינו");
            gMcol.SetAllMonthsLength("31,0,31,30,31,30,31,31,30,31,30,31,31");

            myYear.Add(gMcol);
               int l = argv.Length;//new

               while (--argc > 2)
               {

                   if (argv.Substring(l - argc - 1, 1) == "-")
                   {
                       --argc;
                       switch (argv.Substring(l - argc - 1, 1))
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
                      
                       year = 0;
                     
                       try { year = System.Convert.ToInt32(argv.Substring(l - argc - 1)); }
                       catch (Exception ex)
                       {
                           // illegal argument
                           argc = 1;
                       }
                    
                       if (hflag == 1)
                       {
                           myYear.hName = "לוח לשנת " + " " + alef(year);
                       }
                       else
                       {
                           myYear.hName = "Calendar for " + year.ToString();
                       }
                    
                       g = (jflag != 1 && year >= 5343) ? 1 : 0;



                       Gd = Gauss(year - 1, (g == 1 ? true : false), ref Wd);
                       int psevdoWd = 0;
                       kvia = Gauss(year, (g == 1 ? true : false), ref psevdoWd) - Gd + 12;
                       /**/
                       year -= 3760;
                 
                       if (hflag == 1)
                       {
                           myYear.gName = "שנים " + (g == 1 ? "גרגור" : "יול") + "יניות " + (year - 1).ToString() + "-" + (year).ToString();
                       }
                       else
                       {
                           myYear.gName = (g == 1 ? "Gregor" : "Jul") + "ian years " + (year - 1).ToString() + "-" + (year).ToString();
                       }
                   
                       if (hflag == 1)
                       {
                           myYear.hName = myYear.hName + " נוסח " + (dflag == 1 ? "הגולה" : "ישראל");
                       }
                       else
                       {
                           myYear.hName = myYear.hName + " Style" + (dflag == 1 ? "Diaspora" : "Israel");
                       }
                    
                        gMcol[1].length = 28;
                        if ((year % 4 == 0 && (g == 0 || year % 100 != 0)) || year % 400 == 0)
                        {
                            kvia++;
                            gMcol[1].length++;
                        }
                        if (hflag == 1)
                        {
                            hMcol[6].hName = (kvia >= 30) ? "אדר ב" : "אדר";
                        }
                        else
                        {
                            hMcol[6].eName = (kvia >= 30) ? "Adar II" : "Adar";
                        }
                        hMcol[1].length = (kvia % 30 == 2) ? 30 : 29;
                        hMcol[2].length = (kvia % 30 == 0) ? 29 : 30;
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
                            string hMonthTitle = "";
                            string gMonthTitle = ""; 
                            int hDate = 0;
                            if (Hm == 5 && kvia < 30) Hm++;
                            Hl = hMcol[Hm].length;
                            skip = (Wd - 1) % 7;
                            Wd += Hl;
                            BuildMonthDays(Hm, Hl, (skip + 1) % 7, (kvia >= 30) ? 1 : 0, dflag, hflag, year + 3760, ref myYear);
                            //------------------------------ Gd
                            Gl = gMcol[Gm].length;
                            if (Gl - Gd >= Hl - 1)
                            {
                       
                                gMonthTitle = (hflag==1 ? gMcol[Gm].hName : gMcol[Gm].eName);
                      
                                for (Hd = 1; Hd <= Hl; Hd++)
                                {
                                   AddMonthGDays(Hm, hDate++, Gd++, Gm, year, ref myYear);
                                }
                            }
                            else if (gMcol[Gm+1].length + Gl - Gd >= Hl - 1)
                            {
                          
                                gMonthTitle = (hflag == 1 ? ((gMonth)gMcol[Gm]).shName + "-" + ((gMonth)gMcol[Gm + 1]).shName : ((gMonth)gMcol[Gm]).seName + "-" + ((gMonth)gMcol[Gm + 1]).seName);
                           
                                if (year == 1583 && Hm != 1)
                                {
                                    Gd -= 10;
                                    Hl = 18;
                                }
                                for (Hd = 1; Gd <= Gl; Hd++)
                                {
                                    AddMonthGDays(Hm, hDate++, Gd++,Gm,year, ref myYear);
                                }
                                Gl = gMcol[++Gm].length;
                                for (Gd = 1; Hd <= Hl; Hd++)
                                {
                                    AddMonthGDays(Hm, hDate++, Gd++, Gm, year, ref myYear);
                                }
                                if (Hl == 18)
                                {
                                    Hl = 30;
                                    for (Gd += 10; Hd <= Hl; Hd++)
                                    {
                                        AddMonthGDays(Hm, hDate++, Gd++, Gm, year, ref myYear);
                                    }
                                }
                            }
                            else
                            {
                                gMonthTitle = (hflag == 1 ? ((gMonth)gMcol[Gm]).shName + "-" + ((gMonth)gMcol[Gm + 2]).shName : ((gMonth)gMcol[Gm]).seName + "-" + ((gMonth)gMcol[Gm + 2]).seName);
                                
                                for (Hd = 1; Gd <= Gl; Hd++)
                                {
                                    AddMonthGDays(Hm, hDate++, Gd++,Gm,year, ref myYear);
                                }
                                Gl = gMcol[++Gm].length;
                                for (Gd = 1; Gd <= Gl; Hd++)
                                {
                                    AddMonthGDays(Hm, hDate++, Gd++, Gm, year, ref myYear);
                                }
                                Gl = gMcol[++Gm].length;
                                for (Gd = 1; Hd <= Hl; Hd++)
                                {
                                    AddMonthGDays(Hm, hDate++, Gd++, Gm, year, ref myYear);
                                }
                            }
                            if (Gd > Gl)
                            {
                                Gd -= Gl;
                                Gm++;
                            }
                            if (Gm >= 12) Gm -= 12;

                            ((hMonth)hMcol[Hm]).gName = gMonthTitle;
                        }
                   }
               }
            return myYear;
        }

        #region IEnumerable Members

        public IEnumerator GetEnumerator()
        {
            return mcArr.GetEnumerator();
        }

        #endregion
        static int seq = 0;
        static int
        AddMonthGDays(int month, /* Hebrew Month (0:12) */
                int Hd,     //* day in the Hebrew month (0:Hl-1) *
                int Gd,     //* day in the Gregorian month (1:Gl) *
                int Gm,     //* month in the Gregorian year (0:11) *
                int Gy,     //* Gregorian year *

                ref H_G_year myYear
            )
        {
                Day currDay = ((Day)((Month)((MonthCollection)myYear.mcArr[0]).mArr[month]).daysArr[Hd]);
                currDay.gDate = Gd.ToString();
                string hebYear=(3760+Gy).ToString();
                if(Gm>7 && month<4)Gy=Gy-1;
                Gm = Gm + 1;//-->(1:12) 
                if (Gm > 12) { Gm = 1; Gy++; }
                month = month + 1;//-->(1:12) 
                if (currDay.GetType().ToString() == "WpfApplication1.sDay" || currDay.GetType().ToString() == "WpfApplication1.moedDay")
                {
                    string[] ZmaniKinsatVeyetziatShabbath = ShaotZemaniot.calculateZmaniKinsatVeyetziatShabbath(Gd, Gm, Gy, hebYear + "/" + month + "/" + currDay.hDateNum.ToString());
                    ((moedDay)currDay).kTime = ZmaniKinsatVeyetziatShabbath[0];
                     ((moedDay)currDay).yTime = ZmaniKinsatVeyetziatShabbath[1];
                }
            return 0;
        }
        static int
        BuildMonthDays(int month, /* Hebrew Month (0:12) */
                int length, /* Length of the month (29:30) */
                int head, /* Week day of the first day of the month (0:6) */
                int leap, /* leap year (0:1) */
                int dflag, /* Israel/Diaspora style */
                int hflag,  /* English/Hebrew printout */
                int year, /* Hebrew year */
                ref H_G_year myYear
            )
        {
            ((Month)((MonthCollection)myYear.mcArr[0]).mArr[month]).head = head;
            int short_kislev = 0;
            string[] holiday = new string[30];
            bool[] Holyholiday = new bool[30];
            int k;
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
            int i, j;
            string[] sholiday = new string[5];
            string[] special = new string[5];

            string[][] week = new string[7][];
            week[0] = new string[2] { "Sa", "ש" };
            week[1] = new string[2] { "Su", "א" };
            week[2] = new string[2] { "M", "ב" };
            week[3] = new string[2] { "Tu", "ג" };
            week[4] = new string[2] { "W", "ד" };
            week[5] = new string[2] { "Th", "ה" };
            week[6] = new string[2] { "F", "ו" };

            string[][] portion = new string[54][];
            portion[0] = new string[2] { "Bereshit", "בראשית" };
            portion[1] = new string[2] { "Noach", "נח" };
            portion[2] = new string[2] { "Lech-Lecha", "לך־לך" };
            portion[3] = new string[2] { "Vayera", "וירא" };
            portion[4] = new string[2] { "Chayei-Sarah", "חיי־שרה" };
            portion[5] = new string[2] { "Toldot", "תולדת" };
            portion[6] = new string[2] { "Vayetze", "ויצא" };
            portion[7] = new string[2] { "Vayishlach", "וישלח" };
            portion[8] = new string[2] { "Vayeshev", "וישב" };
            portion[9] = new string[2] { "Miketz", "מקץ" };
            portion[10] = new string[2] { "Vayigash", "ויגש" };
            portion[11] = new string[2] { "Vayechi", "ויחי" };
            portion[12] = new string[2] { "Shemot", "שמות" };
            portion[13] = new string[2] { "Vaera", "וארא" };
            portion[14] = new string[2] { "Bo", "בא" };
            portion[15] = new string[2] { "Beshalach", "בשלח" };
            portion[16] = new string[2] { "Yitro", "יתרו" };
            portion[17] = new string[2] { "Mishpatim", "משפטים" };
            portion[18] = new string[2] { "Teruma", "תרומה" };
            portion[19] = new string[2] { "Tetzave", "תצוה" };
            portion[20] = new string[2] { "Ki-Tisa", "כי־תשא" };
            portion[21] = new string[2] { "Vayakhel", "ויקהל" };
            portion[22] = new string[2] { "Pekudei", "פקודי" };
            portion[23] = new string[2] { "Vayikra", "ויקרא" };
            portion[24] = new string[2] { "Tzav", "צו" };
            portion[25] = new string[2] { "Shemini", "שמיני" };
            portion[26] = new string[2] { "Tazri’a", "תזריע" };
            portion[27] = new string[2] { "Metzora", "מצרע" };
            portion[28] = new string[2] { "Acharei-Mot", "אחרי־מות" };
            portion[29] = new string[2] { "Kedoshim", "קדשים" };
            portion[30] = new string[2] { "Emor", "אמר" };
            portion[31] = new string[2] { "Behar", "בהר" };
            portion[32] = new string[2] { "Bechukotai", "בחקתי" };
            portion[33] = new string[2] { "Bamidbar", "במדבר" };
            portion[34] = new string[2] { "Naso", "נשא" };
            portion[35] = new string[2] { "Beha’alotcha", "בהעלתך" };
            portion[36] = new string[2] { "Shelach", "שלח" };
            portion[37] = new string[2] { "Korach", "קרח" };
            portion[38] = new string[2] { "Chukat", "חקת" };
            portion[39] = new string[2] { "Balak", "בלק" };
            portion[40] = new string[2] { "Pinchas", "פינחס" };
            portion[41] = new string[2] { "Matot", "מטות" };
            portion[42] = new string[2] { "Mase’ei", "מסעי" };
            portion[43] = new string[2] { "Devarim", "דברים" };
            portion[44] = new string[2] { "Vaetchanan", "ואתחנן" };
            portion[45] = new string[2] { "Ekev", "עקב" };
            portion[46] = new string[2] { "Re’e", "ראה" };
            portion[47] = new string[2] { "Shoftim", "שפטים" };
            portion[48] = new string[2] { "Ki-Tetze", "כי־תצא" };
            portion[49] = new string[2] { "Ki-Tavo", "כי־תבוא" };
            portion[50] = new string[2] { "Nitzavim", "נצבים" };
            portion[51] = new string[2] { "Vayelech", "וילך" };
            portion[52] = new string[2] { "Ha’azinu", "האזינו" };
            portion[53] = new string[2] { "Vezot-Habracha", "וזאת־הברכה" };

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
                Day newDay;
                sDay newSDay=null;
                moedDay newMDay=null;
                if (((j + head) % 7) == 0)// shabas
                {
                    newSDay = new sDay((j + 1).ToString(), week[(j + head) % 7][hflag]);
                    newDay = (Day)newSDay;
                }
                else if (holiday[j] != null && Holyholiday[j])
                {
                    newMDay = new moedDay((j + 1).ToString(), week[(j + head) % 7][hflag]);
                    newDay = (moedDay)newMDay;
                }
                else
                {
                    newDay = new Day((j + 1).ToString(), week[(j + head) % 7][hflag]);
                }

                newDay.hDateNum = j + 1;
                if(hflag == 1)
                {
                    newDay.hDate=alef(j + 1);
                }

                if (holiday[j] != null) newDay.spTitle=holiday[j];
           
                
       
                if (((j + head) % 7) > 0)//not shabas
                {
                   ((Month)((MonthCollection)myYear.mcArr[0]).mArr[month]).AddDay(newDay);
                   continue;
                }
                if (sholiday[++i] != null)//special shabas - in holiday?
                {
                    newSDay.wParasha=sholiday[i];
                     ((Month)((MonthCollection)myYear.mcArr[0]).mArr[month]).AddDay(newSDay);
                    sholiday[i] = null;
                    continue;
                }
                //regular shabas
                ((Month)((MonthCollection)myYear.mcArr[0]).mArr[month]).AddDay(newSDay);
                /* Print reading sequence */
                /* Check for possible joined reading */
                string curPortion = portion[seq - 1][hflag];
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
                newSDay.wParasha=curPortion;
                 if (++seq > 53)
                    seq = 1;
            }
            return 1;
        }


        static string alef(int n)
        {
            string fputs = "";
            string[][] digits = new string[3][];
            digits[0] = new string[9] { "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט" };
            digits[1] = new string[9] { "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ" };
            digits[2] = new string[9] { "ק", "ר", "ש", "ת", "קת", "רת", "שת", "תת", "קתת" };


            string[] special = new string[2] { "וט", "זט" };
            int i = 0;

            while (n > 0)
            {
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

        static string Reverse(string str)
        {
            char[] chars = str.ToCharArray();
            Array.Reverse(chars);
            return new string(chars);
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
        public const double T = (33.0 + 14.0 / 24.0);
        public const double L = ((1.0 + 485.0 / 1080.0) / 24.0 / 19.0);
        public const double K = ((29.0 + (12.0 + 793.0 / 1080.0) / 24.0) / 19.0);

        /* Derived constants */
        public const double m0 = (T - 10.0 * K + L + 14.0);
        public const double m1 = ((21.0 + 589.0 / 1080.0) / 24.0); /* 13*19*K mod 1 */
        public const double m2 = ((15.0 + 204.0 / 1080.0) / 24.0); /* 1 - (12*19*K mod 1) */
        public static int Gauss(int year, bool g, ref int c)
        {
            int a, b, M;
            double m;
            a = (12 * year + 17) % 19;
            b = year % 4;
            m = m0 + K * a + b / 4.0 - L * year;
            if (m < 0) m--;
            M = System.Convert.ToInt32(Math.Floor(m));
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
                M += (year - 3760) / 100 - (year - 3760) / 400 - 2;
            return M;
        }

              
    }
}
