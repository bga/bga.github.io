this._sjsBind = function _sjsBind(_fn, that){
  return  function(){ return _fn.apply(that, arguments) }
}
this.yes = true
this.no = false
