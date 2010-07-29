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

  @section DESCRIPTION
  
  some helpers functions for first tests

*/

$jb.Loader._scope().
_willDeclared("../js/base.js").
_completed(function(){

$G._log=function()
{
  var log=$d.getElementById("log");
  var div=$d.createElement("div");
  
  //div.innerHTML = Array.prototype.join.call(arguments, '').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>');
  div.appendChild($d.createTextNode(Array.prototype.join.call(arguments, ' ').replace(/([^\r])\n/g, '$1\r\n')));
  log.appendChild(div);
  
  return div
};

/*
if(window.console == null)
  window.console = {};

if(console.log == null)
{
  (function()
  {
    var log = document.getElementById("log"),
      _join = Array.prototype.join;
    
    console.log = function()
    {
      var div = $d.createElement("div");
      
      div.appendChild(document.createTextNode(_join.call(arguments, '')));
      log.appendChild(div);
      
      return div
    };
  })();  
}  
*/
//if($w.console == null)
  $w.console = {};
if($w.console.log==null)
  $w.console.log = $G._log;


  
$G._evalOut = function(expr)
{
  var div=$G._log(expr+" /* "+eval(expr)+" */");
  
  div.className="code";
};


$G._domReady=function(_func)
{
  if($d.body!=null || $d.readyState=="loaded" || $d.readyState=="complete")
  {
    $G._domReady.__fireEvent();
    
    _func();
  }
  else
  {
    $G._domReady.queue_.push(_func);
  }
};

$G._domReady.queue_=[];

$G._domReady.__fireEvent=function()
{
  var queue=$G._domReady.queue_;

  if(queue==null)
    return;
  
  for(var i=0,len=queue.length;i<len;++i)
    queue[i]();
    
  delete $G._domReady.queue_;  
};


if("addEventListener" in $d)
{
  $d.addEventListener("DOMContentLoaded",$G._domReady.__fireEvent,true);
}
else if("attachEvent" in $d)
{
  $d.attachEvent(
    "onreadystatechange",
    function()
    {
      var state=this.readyState;
      
      if(state=="loaded" || state=="interactive" || state=="complete")
        $G._domReady.__fireEvent();
    }
  );
  
  // ie such ie
  $G._domReady.checkerTheadId__=setInterval(
    function()
    {
      if($d.body==null)
        return;
        
      $G._domReady.__fireEvent();
      clearInterval($G._domReady.checkerTheadId__);
      $G._domReady.checkerTheadId__=null;
    },
    500
  );  
}
else
{
  $w.onload=$G._domReady.__fireEvent;
}

});