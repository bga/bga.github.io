/**
  @file
  @author  Fyodorov "bga" Alexander <bga.email@gmail.com>
 
  @section LICENSE
 
  Experimental common javascript RIA library http://github.com/bga/jbasis

  Copyright (c) 2009-2010, Fyodorov "Bga" Alexander <bga.email@gmail.com>
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
      * Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
      * Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
      * The name of the developer may not be used to endorse or promote
        products derived from this software without specific prior
        written permission.

  THIS SOFTWARE IS PROVIDED BY FYODOROV "BGA" ALEXANDER "AS IS" AND ANY EXPRESS OR
  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
  IN NO EVENT SHALL FYODOROV "BGA" ALEXANDER BE LIABLE FOR ANY DIRECT, INDIRECT,
  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

$jb.Loader._scope().
//_require("$jb/$G.Object.js").
//_require("$jb/$jb.UnitTest.js").
//_require("$jb/$jb.HighLight._js.js").
_require("../js/nonCopyingString.js", true).
_require("../js/base.js").
//_require("/p/jbasis/test/_js/base.js").
_completed(function($G, $jb, $A){

var _now = Date.now || function(){ return +new Date(); };

var _calcSplitPoint = function(n)
{
  var _test1 = function(c)
  {
    var d = _now(), strL = str;
    
    var i = n; while(i--)
    {  
      //var j = c; while(j--)
        strL.slice(0, c);
        //'1111111111111111'.replace(/1/g, '2');
    }
    
    return _now() - d;
  };
  var _test2 = function(c)
  {
    var d = _now(), strL = str;
    
    var i = n; while(i--)
    {  
      //var j = 100 - c; while(j--)
        strL._ncSlice(0, c);
        //'1111111111111111'.replace(/1/g, '2');
    }
    
    return _now() - d;
  };

  var _findAB = function()
  {
    if(a < 100000 && _test1(a) < _test2(a))
    {
      a <<= 1;
      str += str;
      
      return setTimeout(_findAB, 0);
    }
    
    if(a >= 100000)
      return console.log('slice always faster then _ncSlice');
    
    b = a;
    
    a >>= 1;
    
    console.log('bound a = ', a);
    
    str += str;
    b <<= 1;
    
    console.log('bound b = ', b);
    
    setTimeout(_findC, 0);
  };
  
  var _findC = function()
  {
    if(b - a > 2)
    {
      c = (a + b) >> 1;
      
      if(_test1(c) > _test2(c))
        b = c;
      else
        a = c;
        
      return setTimeout(_findC, 0);  
    }
  
    console.log('result a = ', a);
    console.log('_test1', _test1(a));
    console.log('_test2', _test2(a));

    console.log('result b = ', b);
    console.log('_test1', _test1(b));
    console.log('_test2', _test2(b));

    console.log('result c = ', c);
    console.log('_test1', _test1(c));
    console.log('_test2', _test2(c));
  
    c <<= 4;
    var i = 4; while(i--)
      str += str;
    
    setTimeout(_graphData, 0);
  };
  
  var _graphData = function()
  {
    if((c >>= 1))
    {  
      console.log('c = ', c, '_test1', _test1(c), '_test2', _test2(c));
      setTimeout(_graphData, 0)
    }
  };

  var str = '1', a = 1;
  var b, c;
  

  _findAB();

};

$A._main = function()
{
  _calcSplitPoint(3000);
  
  return;
  
  //$G._hlLog();
};

$G._domReady($A._main);

});

// 21719
// 19042
// 20481