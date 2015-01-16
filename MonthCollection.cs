using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WpfApplication1
{
   class MonthCollection : IEnumerable
   {
    //Fields:
    public ArrayList mArr;
    string hebName;
    string engName;
    
    //C'tors:
     public MonthCollection()
     : this("", "")
     {
         mArr = new ArrayList();
     }

     public MonthCollection(string hebName, string engName)
     {
         hName = hebName;
         gName = engName;
     }
    
    //Properties:
    public int Count
    {
      get
      {
        return mArr.Count;
      }
    }

    public string hName { get { return hebName; } set { hebName = value; } }
    public string gName { get { return engName; } set { engName = value; } }
 
    //Indexers:
 
    public Month this[int idx]
    {
      get
      {
        return (Month)mArr[idx];
      }
      set
      {
        mArr[idx] = value;
      }
    }
 
    public Month this[string Name]
    {
      get
      {
        for (int i = 0; i < Count; i++)
          if (this[i].hName == Name || this[i].eName == Name)
            return this[i]; //return the Month
 
        return null;  //Month not Found!
      }
    }
 
    //Methods:
    public void SetYearNames(string HebName, string GregorianName)
    {
        hName = HebName;
        gName = GregorianName;
        return;
    }
 
    public void Add(Month newMonth)
    {
      mArr.Add(newMonth);
    }
 
    public void Remove(Month p)
    {
      mArr.Remove(p);
    }
 
    public void RemoveAt(int idx)
    {
      mArr.RemoveAt(idx);
    }

    public void SetAllMonthsLength(string strArrayL)
    {
      string[] ArrayL = strArrayL.Split(',');
 
      for (int i = 0; i < Count; i++)
      {
                this[i].length = Convert.ToInt16(ArrayL[i]);
      } 
     }
 
    public double GetSumDays()
    {
      double sum = 0;
 
      for (int i = 0; i < Count; i++)
      {
        if (this[i] is Month)
          sum += ((Month)this[i]).length;
      }
 
      return sum;
    }
 
 
    #region IEnumerable Members
 
    public IEnumerator GetEnumerator()
    {
      return mArr.GetEnumerator();
    }
 
    #endregion
  }
    
}
