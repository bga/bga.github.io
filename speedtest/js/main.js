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
      var text = Array.prototype.join.call(arguments, ' ');
      
      _dom('log').appendChild($d.createElement('pre')).appendChild($d.createTextNode(text));
    },
    assert: function(expr, msg)
    {
      if(!expr)
        throw msg || '';
    }
  };
  
  var Queue = function()
  {
    
  };
  
  var _speedTest = (function()
  {
    var isTestRunning = false;
    
    var isNeedToStopTest = false;
    
    $A._stopTest = function()
    {
      isNeedToStopTest = true;
    };
    
    var warmUpStartTime, warmUpEndTime = 0, warmUpTime = 4000, warmDownTime = 250;
    
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
      {
        setTimeout(_warmUpCPU, 0);
      }
      else
      {  
        warmUpEndTime = +new Date();
        setTimeout(_iterate, 0);
      }
    };
    
    var fns, n, curFnIndex, indexes;
    
    var _collectKeys = function(fnsArg)
    {
      if(fnsArg instanceof Array)
      {
        var i = fnsArg.length, indexes = new Array(i)
        
        while(i--)
          indexes[i] = i;
        
        return indexes; 
      }
      else // Object
      {
        var indexes = [], j = 0;
        
        for(var i in fnsArg)
        {
          if(fnsArg.hasOwnProperty(i))
            indexes[j++] = i;
        }
        
        // keep lexical order xbrowser
        indexes.sort(function(a, b){ return 2*(a > b) - 1; });
        
        return indexes;
      }
    };
    
    var _iterate = function()
    {
      if(isNeedToStopTest)
      {  
        isTestRunning = false;
        
        return;
      }
        
      var d = new Date();
      var key = indexes[curFnIndex];
      
      if(typeof(fns[key]) == 'function')
      {
        fns[key](n);
        
        console.log(key + ': ' + (new Date() - d) +  ' ms');
      }
      else
      {
        console.log(key + ': skipped');
      }
      
      if(++curFnIndex < indexes.length)
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
      indexes = _collectKeys(fnsArg);
      n = nArg;
      
      if(new Date() - warmUpEndTime > warmDownTime)
      {
        warmUpStartTime = +new Date();
        warmUpTime = parseFloat(_dom('cpu-warmup-time-value').value);
        _warmUpCPU();
      }
      else
      {
        setTimeout(_iterate, 0);
      }
      
      //_iterate();
    };
  })();  
  
  $A._onCodeTextareaKeyUp = function(e)
  {
    if(!e)
      e = event;
      
    if(e.keyCode == 13 && e.ctrlKey)
    {  
      e.stopPropagation();
      e.preventDefault();
        
      setTimeout($A._onRunClick, 0);
    }
  };
  
  $A._onRunClick = function()
  {
    var code = _dom('code-value').value;
    code = SafeJS._desugarfyJS(code)
    code = SafeJS._addDebugInfo(code, 'run.js')

    Function('console, _speedTest, _log', code.replace(/\r/g, ''))(console, _speedTest, console.log);
  };
  
  $A._onStopClick = function()
  {
    $A._stopTest();
  };
  
  var _attachEvent = (('addEventListener' in $d)) ? 
    function(v, type, _fn)
    {
      v.addEventListener(type, _fn, false);
    } :
    (function()
    {
      var _stopPropagation = function()
      {
        this.cancelBubble = true;
      };
      var _preventDefault = function()
      {
        this.returnValue = false;
      };
      
      return function(v, type, _fn)
      {
        v.attachEvent('on' + type, 
          function()
          { 
            var e = $d.createEventObject(event);
            
            e.preventDefault = _preventDefault;
            e.stopPropagation = _stopPropagation;
            e.target = e.srcElement;
            e.currentTarget = v;
            
            return _fn(e);
          }
        ); 
      } 
    })()
    ;
  
  _attachEvent(window, 'load',
    function()
    {
      //xedit.bind(_dom('code').firstChild);
      
      _attachEvent(_dom('code-value'), 'keyup', $A._onCodeTextareaKeyUp);
    }
  );

if('WebKitPoint' in $G)
{
  (function($G)
  {
    var _wrap = function(Class)
    {
      var _toString = Class.prototype.toString; 
      
      Class.prototype.toString = function()
      {
        if(this.stack)
          $G.console.error('stack trace\n' + this.stack);

        return _toString.call(this);
      };
    };

    _wrap($G.Error);
  })($G);
}
  
  
})(this);
