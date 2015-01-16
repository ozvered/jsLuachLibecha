using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WpfApplication1
{
    class Month
    {
        //Fields:
        string hebName;
        string engName;
        public ArrayList daysArr;
   
        int headF;
        int lengthF;
        int zorderF;

        //Properties:
        public string hName { get { return hebName; } set { hebName = value; } }
        public string eName { get { return engName; } set { engName = value; } }
        public int head { get { return headF; } set { headF = value; } }
        public int length { get { return lengthF; } set { lengthF = value; } }
        public int zorder { get { return zorderF; } set { zorderF = value; } }
 
        //C'tors:
 
        public Month()
          : this("", "")
        {
        }

        public Month(string engName, string hebName)
        {
            hName = hebName;
            eName = engName;
            daysArr = new ArrayList();
        }

        //Methods:
        public void AddDay(Day newDay)
        {
            daysArr.Add(newDay);
        }
    }

    class hMonth : Month
    {
        //Fields:
        string gregorianName;
        public string gName { get { return gregorianName; } set { gregorianName = value; } }

        public hMonth(string engName, string hebName)
            : base(engName, hebName)
        {

        }

    }
    class gMonth : Month
    {
        //Fields:
        string shebName;
        string sengName;
        public string shName { get { return shebName; } set { shebName = value; } }
        public string seName { get { return sengName; } set { sengName = value; } }

        public gMonth(string engName, string hebName)
            : base(engName, hebName)
        {
          
        }    

        public gMonth(string shortHebName, string shortEngName, string hebName, string engName)
            : base(engName, hebName)
        {
            shName = shortHebName;
            seName = shortEngName;
        }

        //Methods:
        public void SetShortNames(string shortEngName, string shortHebName)
        {
            shName = shortHebName;
            seName = shortEngName;
            return;
        }
    }


}
