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

#ifndef JAVASCRIPT
#include "variant.h"
#include "settimeout.h"
#include "websocket.h"
#endif


#ifndef JAVASCRIPT
#if defined(_WIN32) && !defined(__GNUC__)
#define _CRTDBG_MAP_ALLOC
#include <crtdbg.h>
#endif /* _WIN32 */
#endif


#ifndef JAVASCRIPT
#define null 0
#define true 1
#define false 0
#endif

#ifdef JAVASCRIPT 
#define BEGIN_TRY() try{
#define END_TRY() }catch(e){}
#else
#define BEGIN_TRY()
#define END_TRY()
#endif

#ifdef JAVASCRIPT 
#define _delete(a,b) delete a[b]
#else
#define _delete(a,b) a.delete_(b)
#endif

//
// Debufg print
//

#ifdef JAVASCRIPT
println = function(src)
#else
void println(var src)
#endif
{
#ifdef JAVASCRIPT
	alert(src);
#else
	printf("%s\n", ((std::string)src).c_str());
#endif
}

#ifndef JAVASCRIPT
void println(const char* a)
{
	var aa;
	aa = a;
	println(aa);
}
#endif


//
// 
//


#ifndef JAVASCRIPT
void reconnect();
#endif


#ifdef JAVASCRIPT
func=function()
#else
void func()
#endif
{
	println("timeout");
}


#ifdef JAVASCRIPT
onmessage = function(n,str)
#else
void onmessage(var n, var str)
#endif
{
	println("onmessage(" + str + ")");
}


#ifdef JAVASCRIPT
ontimeout=function()
#else
void ontimeout()
#endif
{
	println("ontimeout()");
	//websocket_send(0, "abcdefg\n");
	//setTimeout(ontimeout, 1000 * 10);
}



#ifdef JAVASCRIPT
onopen = function(n)
#else
void onopen(var n)
#endif
{
	//println("onopen()");
	//setTimeout(ontimeout, 1000*10);
}


#ifdef JAVASCRIPT
onerror = function(n)
#else
void onerror(var n)
#endif
{
	//println("onerror()");
	websocket_close(0);
	setTimeout(reconnect, 1000*10);
}


#ifdef JAVASCRIPT
onclose = function(n)
#else
void onclose(var n)
#endif
{
	//println("onclose()");
	websocket_close(0);
	setTimeout(reconnect, 1000 * 10);
}


var url = "ws://127.0.0.1:12345/websocket/chat/23412";


#ifdef JAVASCRIPT
reconnect=function()
#else
void reconnect()
#endif
{
	//println("reconnect()");

	websocket_open(0, url);
	websocket_onopen(0, onopen);
	websocket_onclose(0, onclose);
	websocket_onerror(0, onerror);
	websocket_onmessage(0, onmessage);
}

#ifdef JAVASCRIPT
onClickSendMessageButton = function()
#else
void onClickSendMessageButton()
#endif
{
	println("onClickSendMessageButton()");
	websocket_send(0, "abcdefg\n");
}




#ifndef JAVASCRIPT
void main_main() {
#endif

	//println("hello");

	reconnect();

	//println("end");




#ifndef JAVASCRIPT
}
#endif


#ifndef JAVASCRIPT
int main(int argc, char* argv[])
{
	main_main();
	for (;;){
		loopTimeout(1000);
		websocket_loop(1000);
		sleepTimeout(1000);
	}
	return 0;
}
#endif

