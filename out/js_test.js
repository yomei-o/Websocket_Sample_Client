//
// Debufg print
//
println = function(src)
{
 alert(src);
}
//
// 
//
func=function()
{
 println("timeout");
}
onmessage = function(n,str)
{
 println("onmessage(" + str + ")");
}
ontimeout=function()
{
 println("ontimeout()");
 websocket_send(0, "abcdefg\n");
 setTimeout(ontimeout, 1000 * 10);
}
onopen = function(n)
{
 println("onopen()");
 setTimeout(ontimeout, 1000*10);
}
onerror = function(n)
{
 println("onerror()");
 websocket_close(0);
 setTimeout(reconnect, 1000*10);
}
onclose = function(n)
{
 println("onclose()");
 websocket_close(0);
 setTimeout(reconnect, 1000 * 10);
}
reconnect=function()
{
 println("reconnect()");
 websocket_open(0, "ws://127.0.0.1:12345/websocket/aa");
 websocket_onopen(0, onopen);
 websocket_onclose(0, onclose);
 websocket_onerror(0, onerror);
 websocket_onmessage(0, onmessage);
}
 println("hello");
 websocket_open(0, "ws://127.0.0.1:12345/websocket/aa");
 websocket_onopen(0, onopen);
 websocket_onclose(0, onclose);
 websocket_onerror(0, onerror);
 websocket_onmessage(0, onmessage);
 println("end");
