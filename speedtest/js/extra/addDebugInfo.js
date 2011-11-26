;(function(){
var doubleQuotedStrongRE  = /\"([^\\\"]*\\.)*[^\"]*\"/.source;
var quotedStrongRE = doubleQuotedStrongRE.replace(/\"/g, '\'');
var regExpRE = /([\(\[=,\!&\|\+\-\*\/\^%\:\?~><]|return|throw)\s*\/([^\\\/]*\\.)*[^\/]*\/[a-z]*/.source;
var lineCommentRE = /\/\/[^\n]*\n/.source;
var blockCommentRE = /\/\*[\s\S]*?\*\//.source;
var functionRE = /function/.source;
var matchRE = RegExp([
  /([\s\S]*?)/.source,
  '((',
    [
      functionRE,
      quotedStrongRE,
      doubleQuotedStrongRE,
      lineCommentRE,
      blockCommentRE,
      regExpRE,
      '$'//,
    ].join(')|('),
  '))'//,
].join(''), 'g');  

//console.log(matchRE);

var _fGetLineNo = function(s /*! :String */)
{
  var lastCRLFPos = -1, lineNo = 0;
  return function(p) /*! :Number */
  {
    while(lastCRLFPos < p)
    {
      lastCRLFPos = s.indexOf('\n', lastCRLFPos + 1) >>> 0;
      ++lineNo;
    }
    
    return (lastCRLFPos == p) ? lineNo + 1: lineNo;
  };
};

var _fileNameToId = function(fileName /*! :String */) /*! :String */
{
  return fileName
    .replace(/[\\\/]/g, '$')
    .replace(/\.|[^a-zA-Z_$]/g, '_')
  ;
};

SafeJS._addDebugInfo = function(s/*! :String */ , fileName /*! :String */) /*! :String */
{
  var fileNameId = _fileNameToId(fileName);
  //s = '(function ' + fileNameId + '(){' + s + '\n}).call(this)';
  var lastLineNo = -1;
  var lineShift = 0;
  var _getLineNo = _fGetLineNo(s);
  matchRE.lastIndex = 0;
  var match;
  var out = '';
  while(matchRE.lastIndex < s.length && (match = matchRE.exec(s)))
  {
    out += match[0];
    if(match[2] == 'function')
    {
      var p = matchRE.lastIndex;
      var fnName = /\s*([a-z0-9_\$]*)(\s*)\(/i.exec(s.slice(p));
      if(fnName[1] == '')
      {
        var lineNo = _getLineNo(p);
        if(lineNo == lastLineNo)
          lineShift++;
        else
          lineShift = 0;
        out += ' ' + fileNameId + '_L' + lineNo + ((lineShift > 0) ? '_S' + lineShift : '');
        lastLineNo = lineNo;
        matchRE.lastIndex = s.indexOf('(', matchRE.lastIndex) >>> 0;
      }
    }
  }
  return out;
};
}).call(this)