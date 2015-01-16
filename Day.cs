using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WpfApplication1
{
    class Day
    {
        //Fields:
        string hebDate;
        string gregorianDate;
        string weekDay;
        string specialTitle;
 

        //Properties:
        public string hDate { get { return hebDate; } set { hebDate = value; } }
        public int hDateNum;

        public string wdDate { get { return weekDay; } set { weekDay = value; } }
        public string gDate { get { return gregorianDate; } set { gregorianDate = value; } }
        public string spTitle { get { return specialTitle; } set { specialTitle = value; } }
 
        //C'tors:

        public Day()
            : this("", "")
        {
        }

        public Day(string hebDate, string weekDay)
        {
            hDate = hebDate;
            wdDate = weekDay;
        }

        public Day(string hebDate, string gregorianDate, string specialTitle)
        {
            hDate = hebDate;
            gDate = gregorianDate;
            spTitle = specialTitle;
        }
        //Methods:
      

    }
    class moedDay : Day
    {
        //Fields:
        string inTime;
        string outTime;

        //Properties:
        public string kTime { get { return inTime; } set { inTime = value; } }
        public string yTime { get { return outTime; } set { outTime = value; } }

        public moedDay(string hebDate, string gregorianDate, string specialTitle)
            : base(hebDate, gregorianDate, specialTitle)
        {
 
        }

        public moedDay(string hebDate, string gregorianDate)
            : base(hebDate, gregorianDate)
        {

        }
        public moedDay(string hebDate, string gregorianDate, string inTime, string outTime)
            : base(hebDate, gregorianDate)
        {
            kTime = inTime;
            yTime = outTime;
        }
    }
    class sDay : moedDay //shabat
    {
        //Fields:
        string shabatTitle;

        //Properties:
        public string wParasha { get { return shabatTitle; } set { shabatTitle = value; } }

        public sDay()
            : base("", "")
        {

        }
        public sDay(string hebDate, string gregorianDate)
            : base(hebDate, gregorianDate)
        {

        }

 
        public sDay(string hebDate, string gregorianDate, string specialTitle)
            : base(hebDate, gregorianDate, specialTitle)
        {
 
        }

        public sDay(string shabatTitle, string hebDate, string gregorianDate, string specialTitle)
            : base(hebDate, gregorianDate, specialTitle)
        {
            wParasha = shabatTitle;
        }

        //Methods:
       
    }
}
