/*

Copyright (c) 2016, Yomei Otani <yomei.otani@gmai.com>

All rights reserved.



Redistribution and use in source and binary forms, with or without

modification, are permitted provided that the following conditions are met:



1. Redistributions of source code must retain the above copyright notice,

this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,

this list of conditions and the following disclaimer in the documentation

and/or other materials provided with the distribution.



THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND

ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED

WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE

DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR

ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES

(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;

LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND

ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT

(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS

SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.



The views and conclusions contained in the software and documentation are those

of the authors and should not be interpreted as representing official policies,

either expressed or implied, of the FreeBSD Project.

*/
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
 //websocket_send(0, "abcdefg\n");
 //setTimeout(ontimeout, 1000 * 10);
}
onopen = function(n)
{
 //println("onopen()");
 //setTimeout(ontimeout, 1000*10);
}
onerror = function(n)
{
 //println("onerror()");
 websocket_close(0);
 setTimeout(reconnect, 1000*10);
}
onclose = function(n)
{
 //println("onclose()");
 websocket_close(0);
 setTimeout(reconnect, 1000 * 10);
}
var url = "ws://127.0.0.1:12345/websocket/chat/23412";
reconnect=function()
{
 //println("reconnect()");
 websocket_open(0, url);
 websocket_onopen(0, onopen);
 websocket_onclose(0, onclose);
 websocket_onerror(0, onerror);
 websocket_onmessage(0, onmessage);
}
onClickSendMessageButton = function()
{
 println("onClickSendMessageButton()");
 websocket_send(0, "abcdefg\n");
}
 //println("hello");
 reconnect();
 //println("end");
