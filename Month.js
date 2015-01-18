var myNS = myNS || {};

myNS.Month = function (eName, hName ) {
  // private members
  var _daysArr=[];
  var _hebName = hName;
  var _engName = eName;
   
	var _head=0;
	var _length=0;
	var _zorder=0;
	
  var _AddDay = function (newDay) {
    _daysArr.push(newDay);
  };
  
  return { // public parts (aka interface)
    hebName : _hebName,
    engName : _engName,
  	daysArr : _daysArr,
  	head : _head,
  	Mlength : _length,
  	zorder : _zorder,
    AddDay : _AddDay
  };
};

myNS.gMonth = function (seName, shName, eName, hName ) { // Inherits Month
 
    //Fields:
    var _shortHebName=shName;
    var _shortEngName=seName;

    //the next code inherits DAY ...
    var SuperMonth = new myNS.Month(eName, hName);
    this.prototype = SuperMonth.prototype;
    for (var i in SuperMonth) {
        this[i] = SuperMonth[i];
    }
    
      return { // public parts (aka interface)
        hebName : SuperMonth.hebName,
        engName : SuperMonth.engName,
        daysArr : SuperMonth.daysArr,
        head : SuperMonth.head,
        Mlength : SuperMonth.Mlength,
        zorder : SuperMonth.zorder,
        AddDay : SuperMonth.AddDay,
        shortHebName : _shortHebName,
        shortEngName : _shortEngName
      };

}

//---------------------------------------------------------------------------
