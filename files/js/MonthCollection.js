var myNS = myNS || {};

myNS.MonthCollection = function (hName, eName) {
  // private members
  var _mArr=[];
  var _hebName = hName;
  var _engName = eName;

  var _Add = function (Month) {
    _mArr.push(Month);
  };

  var _RemoveAt = function (idx) {
      _mArr.splice(idx,1);
  };

  var _Remove = function (Month) {
    for (var i in _mArr) {
      if(  _mArr[i]=== Month)
        _RemoveAt(i);
    }
  };


  var _SetAllMonthsLength = function (strL) {
    var strArrayL=strL.split(',');
    for (var i in strArrayL) {
       _mArr[i].Mlength= parseInt(strArrayL[i]);
    }
  };

  var _GetSumDays = function () {
    var acml=0
    for (var i in _mArr) {
      acml+=_mArr[i].Mlength;
    }
    return acml;
  };
  
  
  return { // public parts (aka interface)
  hebName : _hebName,
  engName : _engName,
	MArr : _mArr,
	Count : _mArr.length,
  Add : _Add,
  RemoveAt : _RemoveAt,
  SetAllMonthsLength : _SetAllMonthsLength,
  GetSumDays : _GetSumDays
  };
};

//---------------------------------------------------------------------------
