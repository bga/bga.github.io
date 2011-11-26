/*
fix _mulStr = #(s: String, n: Natural){
  fix zerro = Natural(n.Class()).ZERRO
  fix one = Natural(n.Class()).ONE
  var a = ''
  while(n != zerro)
  {
    if(n&one != zerro)
      a += s
    n >>= one
    s += s
  }
  -> a
}

location.href = '#' + _mulStr('1', 1 << 16)
*/
(function(){
var IS_SUPPORT_CONST = false && (function()
{
  try{ eval('const a = 1'); return 1 } catch(err){ return 0 }
})()

var doubleQuotedStringRE  = /\"([^\\\"]*\\.)*[^\"]*\"/.source;
var quotedStringRE = doubleQuotedStringRE.replace(/\"/g, '\'');
var regExpRE = /([\(\[=,\!&\|\+\-\*\/\^%\:\?~><]|return|throw|case)\s*\/([^\\\/]*\\.)*[^\/]*\/[a-z]*/.source;
var lineCommentRE = /\/\/[^\n]*\n/.source;
var blockCommentRE = /\/\*[\s\S]*?\*\//.source;
var functionRE = /#/.source;
var thisRE = /@/.source;
var returnRE = /\->/.source;
var multilineStringRE = /\'\'\'|\"\"\"|```/.source;
var tmlStringRE = /`/.source;
var oneWordComment = /\\/.source;
var closeBrace = /[\)\}\]]/.source;
var constRE = /\sconst\s/.source;
var fixRE = /\sfix\s/.source;
var openBracket = /\{/.source;
var matchRE = RegExp([
  /([\s\S]*?)/.source,
  '((',
    [
      multilineStringRE,
      tmlStringRE,
      constRE,
      functionRE,
      thisRE,
      returnRE,
      quotedStringRE,
      doubleQuotedStringRE,
      lineCommentRE,
      blockCommentRE,
      regExpRE,
      oneWordComment,
      closeBrace,
      fixRE,
      openBracket,
      '$'//,
    ].join(')|('),
  '))'//,
].join(''), 'g');  

//console.log(matchRE);

var _quoteString = function(s /*!: String */) /*! -> String */
{
  return s.replace(/\\/g, '\\\\').replace(/\"/g, '\\"');
};
var _trim = function(s /*!: String */) /*! -> String */
{
  return s.replace(/^\s+|\s+$/g, '');
};

var opRE = /([\(\[=,\!&\|\+\-\*\/\^%\:\?~><]|return|throw)/.source

/*
var _matchEndCurlyBracket = #(s, p, isCheckLiterals){
  var _isInLiteral = 
    isCheckLiterals && (#{
      var checkRE = RegExp(`(\/\*|\/\/|%opRE[\s\S]*[\'\"\/])[\s\S]*$`)
      -> #{
        -> checkRE.test(s.slice(matchRE.lastIndex - 1))
      }
    })() ||
    #{ -> no }
  ;
  var matchRE = /\{|\}|$/g
  matchRE.lastIndex = p
  var match
  var balance = 0
  main: while(matchRE.lastIndex < s.length && (match = matchRE.exec(s)))
  {
    switch(match[0])
    {
      case '':
        break main
      case '{':
        if(!_isInLiteral())
          balance++
        break
      case '}':
        if(!_isInLiteral() && --balance == 0)
          break main
        break
    }
  }
  -> matchRE.lastIndex
}
*/

this._tmlString = function(s /*!: String */) /*! -> String */
{
  var matchRE = /([^%]*)(?:%|$)/g;
  var out = '';
  var match
  matchRE.lastIndex = 0
  while(matchRE.lastIndex < s.length && (match = matchRE.exec(s)))
  {
    var p = matchRE.lastIndex;
    if(match[1].length > 0)
      out += '"' + _quoteString(match[1]) + '", ';
    switch(s.charAt(p))
    {
      case '':
        break;
      case '%':
        out += '"%", ';
        matchRE.lastIndex = p + 1;
        break;
      case '{':
        var i = s.indexOf('}', p);
        out += SafeJS._desugarfyJS(_trim(s.slice(p + 1, i))) + ', ';
        matchRE.lastIndex = i + 1;
        break;
      default:
        var varName = /^@?[a-z_$][a-z0-9_$]*/i.exec(s.slice(p));
        if(varName)
        {
          out += SafeJS._desugarfyJS(varName[0]) + ', ';
          matchRE.lastIndex += varName[0].length;
        }
        else
        {
          out += '"%", ';
        }
    }
  }
  if(out.slice(-2) == ', ')
    out = out.slice(0, -2)
  return out;
};

SafeJS._desugarfyJS = function(s /*! :String */) /*! -> String */
{
  s = ' ' + s + '\n'
  var oldLastIndex = matchRE.lastIndex
  matchRE.lastIndex = 0
  var match
  var out = ''
  var bracketsBalance = 0
  var wrapFn = 0
  while(matchRE.lastIndex < s.length && (match = matchRE.exec(s)))
  {
    var p = matchRE.lastIndex;
    out += match[1];
    //console.log(match[1]);
    switch(match[2])
    {
      case '"""':
      case "'''":
      case "```":
        var i = s.indexOf(match[2], p);
        var part = s.slice(p, i)
        //part = _trimMiltiLineString(part)
        //opera.postError(part)
        out += '"\\\n' + _quoteString(part).replace(/\n/g, '\\n\\\n') + '"';
        //alert(part)
        matchRE.lastIndex = i + 3;
        break;
      case '`':
        var i = s.indexOf('`', p);
        var part = s.slice(p, i)
        out += '"".concat(' + _tmlString(s.slice(p, i)) + ')';
        matchRE.lastIndex = i + 1;
        break;
      case '#':
        if(s.charAt(p) == '@')
        {  
          out += '_sjsBind('
          matchRE.lastIndex = ++p
          bracketsBalance = 0
          wrapFn = 1
        }
        out += 'function';
        if(!/^\s*\(/.test(s.slice(p)))
          out += '()';
        break;
      case '@':
        out += 'this';
        if(/^[a-z_$]/i.test(s.charAt(p)))
          out += '.';
        break;
      case '->':
        //out += 'return ';
        s = s.slice(0, p - 2) + 'return ' + s.slice(p) // hack to correct re behavior
        matchRE.lastIndex = p - 2
        break;  
      case '\\':
        var i = s.slice(p).search(/\s/);
        out += '/* ' + s.slice(p, p + i) + ' */'; 
        matchRE.lastIndex = p + i;
        break;
      case '{':
        out += '{'
        bracketsBalance++
        break
      case '}':
        bracketsBalance--
        if(wrapFn && bracketsBalance == 0)
        {
          out += '}, this)'
          wrapFn = 0
          break
        }  
      case ')':
      case ']':
        var commaMatch = out.match(/,(\s*)$/)
        if(commaMatch)
          out = out.slice(0, -commaMatch[0].length) + commaMatch[1]
        out += match[2]  
        break;
      default:
        if(match[2].slice(1, 4) == 'fix')
          match[2] = match[2].charAt(0) + 'const' + match[2].charAt(4)
        
        if(!IS_SUPPORT_CONST && match[2].slice(1, 6) == 'const')
          out += match[2].charAt(0) + 'var' + match[2].charAt(6)
        else
          out += match[2];
    }
  }
  matchRE.lastIndex = oldLastIndex;
  return out.slice(1, -1);
};
}).call(this)