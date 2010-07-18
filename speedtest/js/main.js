(function($G)
{
  var $A = $G.$A = {};
  var $d = document;
  
  var _dom = function(id)
  {
    return $d.getElementById(id);
  };
  
  var console = $A.console = 
  {
    log: function()
    {
      var text = Array.prototype.join.call(arguments, '');
      
      _dom('log').appendChild($d.createElement('div')).appendChild($d.createTextNode(text));
    }
  };
  
  var _speedTest = (function()
  {
    var isTestRunning = false;
    
    var isNeedToStopTest = false;
    
    $A._stopTest = function()
    {
      isNeedToStopTest = true;
    };
    
    var warmUpStartTime, warmUpTime = 4000;
    
    var _dummy = function()
    {
    
    };
    
    var _warmUpCPU = function()
    {
      if(isNeedToStopTest)
      {  
        isTestRunning = false;
        
        return;
      }
      
      
      var i = 1000000; while(i--)
        _dummy();
        
      if((new Date() - warmUpStartTime) < warmUpTime)
        setTimeout(_warmUpCPU, 0);
      else
        setTimeout(_iterate, 0);
    };
    
    var fns, n, curFnIndex;
    
    var _iterate = function()
    {
      if(isNeedToStopTest)
      {  
        isTestRunning = false;
        
        return;
      }
        
      var d = new Date();
      
      fns[curFnIndex](n);
      
      console.log(curFnIndex + ': ' + (new Date() - d) +  ' ms');
      
      if(++curFnIndex < fns.length)
        return setTimeout(_iterate, 0);
    
      isTestRunning = false;
    };    
    
    return function(fnsArg, nArg)
    {
      if(isTestRunning)
        return;
        
      isTestRunning = true;
      isNeedToStopTest = false;
      fns = fnsArg;
      curFnIndex = 0;
      warmUpStartTime = +new Date();
      warmUpTime = parseFloat(_dom('cpu-warmup-time-value').value);
      n = nArg;
      
      //_iterate();
      _warmUpCPU();
    };
  })();  
  
  $A._onRunClick = function()
  {
    var code = _dom('code-value').value;
    
    (new Function('console, _speedTest', code))(console, _speedTest);
  };
  
  $A._onStopClick = function()
  {
    $A._stopTest();
  };
  
  window.onload = function()
  {
    xedit.bind(_dom('code').firstChild);
  };
  
})(this);  