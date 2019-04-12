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
_require("$jb/$jb.UnitTest.js").
_require("../js/nonCopyingString.js", true).
//_require("$jb/$jb.HighLight._js.js").
_require("../js/base.js").
_completed(function($G, $jb, $A){

var _instanceofTest = function(_ut, a)
{
  _ut(
    function()
    {
      this._testValue("" + (Object(a) instanceof String), "true", "test1");

      this._final();
    }
  );
};

var _sliceTest = function(_ut, a, sliceName)
{
  _ut(
    function()
    {
      this._testValue("" + a[sliceName](0), "12345", "test1");
      this._testValue("" + a[sliceName](1), "2345", "test2");
      this._testValue("" + a[sliceName](4), "5", "test3");
      this._testValue("" + a[sliceName](5), "", "test4");
      this._testValue("" + a[sliceName](60), "", "test5");
      
      this._testValue("" + a[sliceName](-1), "5", "test6");
      this._testValue("" + a[sliceName](-2), "45", "test7");
      this._testValue("" + a[sliceName](-5), "12345", "test8");
      this._testValue("" + a[sliceName](-6), "12345", "test9");
      this._testValue("" + a[sliceName](-60), "12345", "test10");

      this._testValue("" + a[sliceName](0, 1), "1", "test11");
      this._testValue("" + a[sliceName](1, 2), "2", "test12");
      this._testValue("" + a[sliceName](4, 5), "5", "test13");
      this._testValue("" + a[sliceName](5, 6), "", "test14");
      this._testValue("" + a[sliceName](60, 61), "", "test15");
      
      this._testValue("" + a[sliceName](-2, -1), "4", "test16");
      this._testValue("" + a[sliceName](-3, -2), "3", "test17");
      this._testValue("" + a[sliceName](-5, -4), "1", "test18");
      this._testValue("" + a[sliceName](-6, -5), "", "test19");
      this._testValue("" + a[sliceName](-60, -59), "", "test20");

      this._testValue("" + a[sliceName](0, -4), "1", "test21");
      this._testValue("" + a[sliceName](1, -3), "2", "test22");
      this._testValue("" + a[sliceName](3, -1), "4", "test23");
      
      this._testValue("" + a[sliceName](-2, 4), "4", "test24");
      this._testValue("" + a[sliceName](-3, 3), "3", "test25");
      this._testValue("" + a[sliceName](-5, 1), "1", "test26");

      this._testValue("" + a[sliceName](0, -5), "", "test27");
      this._testValue("" + a[sliceName](1, -4), "", "test28");
      this._testValue("" + a[sliceName](3, -2), "", "test29");
      
      this._testValue("" + a[sliceName](-2, 3), "", "test30");
      this._testValue("" + a[sliceName](-3, 2), "", "test31");
      this._testValue("" + a[sliceName](-5, 0), "", "test32");

      this._testValue("" + a[sliceName](0, -6), "", "test33");
      this._testValue("" + a[sliceName](1, -5), "", "test34");
      this._testValue("" + a[sliceName](3, -3), "", "test35");
      this._testValue("" + a[sliceName](0, -60), "", "test36");
      
      this._testValue("" + a[sliceName](-2, 2), "", "test37");
      this._testValue("" + a[sliceName](-3, 1), "", "test38");

      this._final();
    }
  );
};

var _concatTest = function(_ut, a)
{
  _ut(
    function()
    {
      this._testValue("" + a.concat(1.4, true, [1, 2, 3], 3, "!", /\s+/g), "123451.4true1,2,33!/\\s+/g", "test39");
      
      this._final();
    }
  );
};


var _substringTest = function(_ut, a, substringName)
{
  _ut(
    function()
    {
      this._testValue("" + a[substringName](0), "12345", "test1");
      this._testValue("" + a[substringName](1), "2345", "test2");
      this._testValue("" + a[substringName](4), "5", "test3");
      this._testValue("" + a[substringName](5), "", "test4");
      this._testValue("" + a[substringName](60), "", "test5");
      
      this._testValue("" + a[substringName](-1), "12345", "test6");
      this._testValue("" + a[substringName](-2), "12345", "test7");
      this._testValue("" + a[substringName](-5), "12345", "test8");
      this._testValue("" + a[substringName](-6), "12345", "test9");
      this._testValue("" + a[substringName](-60), "12345", "test10");

      this._testValue("" + a[substringName](0, 1), "1", "test11");
      this._testValue("" + a[substringName](1, 2), "2", "test12");
      this._testValue("" + a[substringName](4, 5), "5", "test13");
      this._testValue("" + a[substringName](5, 6), "", "test14");
      this._testValue("" + a[substringName](60, 61), "", "test15");
      
      this._testValue("" + a[substringName](-2, -1), "", "test16");
      this._testValue("" + a[substringName](-3, -2), "", "test17");
      this._testValue("" + a[substringName](-5, -4), "", "test18");
      this._testValue("" + a[substringName](-6, -5), "", "test19");
      this._testValue("" + a[substringName](-60, -59), "", "test20");

      this._testValue("" + a[substringName](0, -4), "", "test21");
      this._testValue("" + a[substringName](1, -3), "1", "test22");
      this._testValue("" + a[substringName](3, -1), "123", "test23");
      
      this._testValue("" + a[substringName](-2, 4), "1234", "test24");
      this._testValue("" + a[substringName](-3, 3), "123", "test25");
      this._testValue("" + a[substringName](-5, 1), "1", "test26");

      this._testValue("" + a[substringName](0, -5), "", "test27");
      this._testValue("" + a[substringName](1, -4), "1", "test28");
      this._testValue("" + a[substringName](3, -2), "123", "test29");
      
      this._testValue("" + a[substringName](-2, 3), "123", "test30");
      this._testValue("" + a[substringName](-3, 2), "12", "test31");
      this._testValue("" + a[substringName](-5, 0), "", "test32");

      this._testValue("" + a[substringName](0, -6), "", "test33");
      this._testValue("" + a[substringName](1, -5), "1", "test34");
      this._testValue("" + a[substringName](3, -3), "123", "test35");
      this._testValue("" + a[substringName](0, -60), "", "test36");
      
      this._testValue("" + a[substringName](-2, 2), "12", "test37");
      this._testValue("" + a[substringName](-3, 1), "1", "test38");

      this._final();
    }
  );
};

var _substrTest = function(_ut, a, substrName)
{
  _ut(
    function()
    {
      this._testValue("" + a[substrName](0), "12345", "test1");
      this._testValue("" + a[substrName](1), "2345", "test2");
      this._testValue("" + a[substrName](4), "5", "test3");
      this._testValue("" + a[substrName](5), "", "test4");
      this._testValue("" + a[substrName](60), "", "test5");
      
      this._testValue("" + a[substrName](-1), "5", "test6");
      this._testValue("" + a[substrName](-2), "45", "test7");
      this._testValue("" + a[substrName](-5), "12345", "test8");
      this._testValue("" + a[substrName](-6), "12345", "test9");
      this._testValue("" + a[substrName](-60), "12345", "test10");

      this._testValue("" + a[substrName](0, 1), "1", "test11");
      this._testValue("" + a[substrName](1, 2), "23", "test12");
      this._testValue("" + a[substrName](4, 5), "5", "test13");
      this._testValue("" + a[substrName](5, 6), "", "test14");
      this._testValue("" + a[substrName](60, 61), "", "test15");
      
      this._testValue("" + a[substrName](-2, -1), "", "test16");
      this._testValue("" + a[substrName](-3, -2), "", "test17");
      this._testValue("" + a[substrName](-5, -4), "", "test18");
      this._testValue("" + a[substrName](-6, -5), "", "test19");
      this._testValue("" + a[substrName](-60, -59), "", "test20");

      this._testValue("" + a[substrName](0, -4), "", "test21");
      this._testValue("" + a[substrName](1, -3), "", "test22");
      this._testValue("" + a[substrName](3, -1), "", "test23");
      
      this._testValue("" + a[substrName](-2, 4), "45", "test24");
      this._testValue("" + a[substrName](-3, 3), "345", "test25");
      this._testValue("" + a[substrName](-5, 1), "1", "test26");

      this._testValue("" + a[substrName](0, -5), "", "test27");
      this._testValue("" + a[substrName](1, -4), "", "test28");
      this._testValue("" + a[substrName](3, -2), "", "test29");
      
      this._testValue("" + a[substrName](-2, 3), "45", "test30");
      this._testValue("" + a[substrName](-3, 2), "34", "test31");
      this._testValue("" + a[substrName](-5, 0), "", "test32");

      this._testValue("" + a[substrName](0, -6), "", "test33");
      this._testValue("" + a[substrName](1, -5), "", "test34");
      this._testValue("" + a[substrName](3, -3), "", "test35");
      this._testValue("" + a[substrName](0, -60), "", "test36");
      
      this._testValue("" + a[substrName](-2, 2), "45", "test37");
      this._testValue("" + a[substrName](-3, 1), "3", "test38");

      this._final();
    }
  );
};


var _indexOfTest = function(_ut, a)
{
  _ut(
    function()
    {
      this._testValue(a.indexOf(1), 0, "test1");
      this._testValue(a.indexOf(1, 0), 0, "test2");
      this._testValue(a.indexOf(1, 1), -1, "test3");
      this._testValue(a.indexOf(1, 60), -1, "test4");
      this._testValue(a.indexOf(1, -5), 0, "test5");
      this._testValue(a.indexOf(1, -6), 0, "test6");
      this._testValue(a.indexOf(1, -60), 0, "test7");

      this._testValue(a.indexOf(5), 4, "test8");
      this._testValue(a.indexOf(5, 4), 4, "test9");
      this._testValue(a.indexOf(5, 5), -1, "test10");
      this._testValue(a.indexOf(5, 6), -1, "test11");
      this._testValue(a.indexOf(5, 60), -1, "test12");

      this._testValue(a.indexOf(6), -1, "test13");

      this._testValue(a.indexOf(3, -3), 2, "test14");
      this._testValue(a.indexOf(3, -2), 2, "test15");
      this._testValue(a.indexOf(3, -4), 2, "test16");
      this._testValue(a.indexOf(3, 10), -1, "test17");

      this._final();
    }
  );
};

var _lastIndexOfTest = function(_ut, a)
{
  _ut(
    function()
    {
      this._testValue(a.lastIndexOf(1), 0, "test18");
      this._testValue(a.lastIndexOf(1, 0), 0, "test19");
      this._testValue(a.lastIndexOf(1, 1), 0, "test20");
      this._testValue(a.lastIndexOf(1, 60), 0, "test21");
      this._testValue(a.lastIndexOf(1, -1), 0, "test22");
      this._testValue(a.lastIndexOf(1, -5), 0, "test23");
      this._testValue(a.lastIndexOf(1, -6), 0, "test24");
      this._testValue(a.lastIndexOf(1, -60), 0, "test25");
      
      this._testValue(a.lastIndexOf(5), 4, "test26");
      this._testValue(a.lastIndexOf(5, 3), -1, "test27");
      this._testValue(a.lastIndexOf(5, 4), 4, "test28");
      this._testValue(a.lastIndexOf(5, 5), 4, "test29");
      this._testValue(a.lastIndexOf(5, 6), 4, "test30");
      this._testValue(a.lastIndexOf(5, 60), 4, "test31");

      this._testValue(a.lastIndexOf(6), -1, "test32");
      
      this._testValue(a.lastIndexOf(3, -2), -1, "test33");
      this._testValue(a.lastIndexOf(3, -3), -1, "test34");
      this._testValue(a.lastIndexOf(3, -4), -1, "test35");
      
      this._final();
    }
  );
};

var _charAtTest = function(_ut, a)
{
  _ut(
    function()
    {
      this._testValue(a.charAt(0), '1', "test1");
      this._testValue(a.charAt(4), '5', "test2");
      this._testValue(a.charAt(-1), '', "test3");
      this._testValue(a.charAt(-10), '', "test4");
      this._testValue(a.charAt(5), '', "test5");
      this._testValue(a.charAt(50), '', "test6");
      
      this._final();
    }
  );
};

var _charCodeAtTest = function(_ut, a)
{
  _ut(
    function()
    {
      this._testValue(a.charCodeAt(0), 49, "test1");
      this._testValue(a.charCodeAt(4), 53, "test2");
      this._testValue(isNaN(a.charCodeAt(-1)), true, "test3");
      this._testValue(isNaN(a.charCodeAt(-10)), true, "test4");
      this._testValue(isNaN(a.charCodeAt(5)), true, "test5");
      this._testValue(isNaN(a.charCodeAt(50)), true, "test6");
      
      this._final();
    }
  );
};

$A._main = function()
{
  var _ut = $jb.UnitTest._test;
  
  $jb.UnitTest.prototype.groupOutEl = $d.body.appendChild($d.createElement('div'));
  $jb.UnitTest.prototype.groupOutEl.className = 'unit-tests';
  
  _instanceofTest(_ut, '0123456'._ncSlice(1, -1));
  
  _sliceTest(_ut, '12345', '_ncSlice');
  _sliceTest(_ut, '0123456'._ncSlice(1, -1), '_ncSlice');
  
  _concatTest(_ut, '12345');
  _concatTest(_ut, '0123456'._ncSlice(1, -1));

  _substringTest(_ut, '12345', '_ncSubstring');
  _substringTest(_ut, '0123456'._ncSlice(1, -1), '_ncSubstring');

  _substrTest(_ut, '12345', '_ncSubstr');
  _substrTest(_ut, '0123456'._ncSlice(1, -1), '_ncSubstr');

  _indexOfTest(_ut, '12345');
  _indexOfTest(_ut, '0123456'._ncSlice(1, -1));

  _lastIndexOfTest(_ut, '12345');
  _lastIndexOfTest(_ut, '0123456'._ncSlice(1, -1));
  
  _charAtTest(_ut, '12345');
  _charAtTest(_ut, '0123456'._ncSlice(1, -1));

  _charCodeAtTest(_ut, '12345');
  _charCodeAtTest(_ut, '0123456'._ncSlice(1, -1));
  
  return;
  
  //$G._hlLog();
};

$G._domReady($A._main);

});

// 21719
// 19042
// 20481