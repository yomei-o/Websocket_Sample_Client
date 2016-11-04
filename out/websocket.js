//
// debug func
//
println = function(str)
{
 alert(str);
}
strlength = function(src)
{
 var ret = 0;
 if (src == null || src == "")return ret;
 ret = src.length;
 return ret;
}
//
// statics 
//
var ws_handle = new Array();
var ws_url = new Array();
var ws_onopen = new Array();
var ws_onerror = new Array();
var ws_onclose = new Array();
var ws_onmessage = new Array();
var ws_stat = new Array();
//
// functions
//
websocket_isusing=function(n)
{
 var ret = false;
 if (n<0 || n>=20)return ret;
 if (ws_handle[n] != null)return ret;
 ret = true;
 return ret;
}
websocket_open=function(n,str)
{
 var n_ = n;
 if (n<0 || n>=20)return -1;
 if (ws_handle[n]!=null)return -1;
 ws_handle[n] = null;
 ws_url[n] = str;
 ws_onopen[n] = null;
 ws_onerror[n] = null;
 ws_onclose[n] = null;
 ws_onmessage[n] = null;
 ws_stat[n]=0;
 try{
  ws_handle[n] = new WebSocket(str);
 }catch (e){}
 if (ws_handle[n] == null){
  return -1;
 }
 ws_handle[n].onmessage = function(evt){
  if (ws_onmessage[n_] != null)ws_onmessage[n_](n_, evt.data);
 }
 ws_handle[n].onopen = function(evt){
  if (ws_onopen[n_] != null)ws_onopen[n_](n_);
 }
 ws_handle[n].onerror = function(evt){
  if (ws_onerror[n_] != null)ws_onerror[n_](n_);
 }
 ws_handle[n].onclose = function(evt){
  if (ws_onclose[n_] != null)ws_onclose[n_](n_);
 }
 return 0;
}
websocket_close = function(n)
{
 if (n < 0 || n >= 20 || ws_handle[n] == null)return -1;
 try{
  ws_handle[n].close();
 }catch (e){}
 ws_onopen[n] = null;
 ws_onerror[n] = null;
 ws_onmessage[n] = null;
 ws_onclose[n] = null;
 ws_handle[n] = null;
 ws_url[n] = null;
 ws_stat[n] = 0;
 return 0;
}
websocket_send = function(n, str)
{
 var ret = -1;
 if (n < 0 || n >= 20 || ws_handle[n] == null)return -1;
 if (strlength(str) < 1)return -1;
 try{
  ws_handle[n].send(str);
  ret=0;
 }
 catch (e){}
 return ret;
}
//
//
//
websocket_onmessage = function(n, func)
{
 if (n<0 || n >= 20 || ws_handle[n] == null)return;
 ws_onmessage[n] = func;
}
websocket_onclose = function(n, func)
{
 if (n<0 || n >= 20 || ws_handle[n] == null)return;
 ws_onclose[n] = func;
}
websocket_onopen = function(n, func)
{
 if (n<0 || n >= 20 || ws_handle[n] == null)return;
 ws_onopen[n] = func;
}
websocket_onerror = function(n, func)
{
 if (n<0 || n >= 20 || ws_handle[n] == null)return;
 ws_onerror[n] = func;
}
//
//
//
//
//
//
