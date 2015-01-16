var myNS = myNS || {};
myNS.Day = function (hDate, wdDate, gDate) {
  // private members
  
  var _hebDate = hDate;
  var _gregorianDate = gDate;
  var _weekDay = wdDate;
  var _specialTitle = '';
 
  return { // public parts (aka interface)
    hebDate : _hebDate,
    weekDay : _weekDay,
    gregorianDate : _gregorianDate,
    specialTitle : _specialTitle
  };
 
};
myNS.moedDay = function (hDate, wdDate, gDate, kTime,yTime) { // Inherits DAY
 
    //Fields:
    var _inTime=kTime;
    var _outTime=yTime;

    //the next code inherits DAY ...
    var SuperDay = new myNS.Day(hDate, wdDate, gDate);
    this.prototype = SuperDay.prototype;
    for (var i in SuperDay) {
        this[i] = SuperDay[i];
    }
    
      return { // public parts (aka interface)
        hebDate : SuperDay.hebDate,
        weekDay : SuperDay.weekDay,
        gregorianDate : SuperDay.gregorianDate,
        specialTitle : SuperDay.specialTitle,
        inTime : _inTime,
        outTime : _outTime
      };

}
            
myNS.sDay = function (hDate, wdDate, gDate, kTime,yTime, wParasha) { // Inherits moedDay
    //Fields:
    var _shabatTitle=wParasha;

    //the next code inherits moedDay ...
    var SuperDay = new myNS.moedDay(hDate, wdDate, gDate, kTime,yTime);
    this.prototype = SuperDay.prototype;
    for (var i in SuperDay) {
        this[i] = SuperDay[i];
    }
    
      return { // public parts (aka interface)
        hebDate : SuperDay.hebDate,
        weekDay : SuperDay.weekDay,
        gregorianDate : SuperDay.gregorianDate,
        specialTitle : SuperDay.specialTitle,
        inTime : SuperDay.inTime,
        outTime : SuperDay.outTime,
        shabatTitle : _shabatTitle
      };

}
//----------------------------------------------
