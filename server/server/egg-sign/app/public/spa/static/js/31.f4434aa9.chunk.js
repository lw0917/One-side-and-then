(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{502:function(t,n,e){"use strict";e.d(n,"b",function(){return r}),e.d(n,"c",function(){return u}),e.d(n,"d",function(){return o}),e.d(n,"a",function(){return c}),e.d(n,"e",function(){return i}),e.d(n,"f",function(){return d});var a=e(6);function r(){return Object(a.a)("/exam/examType")}function u(){return Object(a.a)("/exam/getQuestionsType")}function o(){return Object(a.a)("/exam/subject")}function c(t){return Object(a.a)("/exam/questions",{method:"POST",body:t})}function i(t){var n=[];for(var e in t)t[e]&&n.push("".concat(e,"=").concat(t[e]));var r="?"+n.join("&");return console.log(r),Object(a.a)("/exam/questions/condition".concat(r))}function d(t){return Object(a.a)("/exam/questions/update",{method:"PUT",body:t})}},579:function(t,n,e){"use strict";e.d(n,"g",function(){return r}),e.d(n,"j",function(){return u}),e.d(n,"h",function(){return o}),e.d(n,"a",function(){return c}),e.d(n,"c",function(){return i}),e.d(n,"f",function(){return d}),e.d(n,"b",function(){return s}),e.d(n,"d",function(){return f}),e.d(n,"i",function(){return p}),e.d(n,"k",function(){return l}),e.d(n,"e",function(){return m});var a=e(6),r=function(){return Object(a.a)("/manger/grade")},u=function(){return Object(a.a)("/manger/grade/new")},o=function(){return Object(a.a)("/manger/room")},c=function(t){return Object(a.a)("/manger/grade",{method:"POST",body:t})},i=function(t){return Object(a.a)("/manger/grade/delete",{method:"DELETE",body:t})},d=function(t){return Object(a.a)("/manger/grade/update",{method:"PUT",body:t})},s=function(t){return Object(a.a)("/manger/room",{method:"POST",body:t})},f=function(t){return Object(a.a)("/manger/room/delete",{method:"DELETE",body:t})},p=function(){return Object(a.a)("/manger/student")},l=function(){return Object(a.a)("/manger/student/new")},m=function(t){var n=t.student_id;return Object(a.a)("/manger/student/".concat(n),{method:"DELETE"})}},776:function(t,n,e){"use strict";e.r(n);var a=e(16),r=e(81),u=e.n(r),o=e(579),c=e(502);function i(){return Promise.all([Object(o.h)(),Object(c.d)()])}function d(){return Promise.all([Object(o.i)(),Object(o.k)()])}n.default={namespace:"student",state:{foundationData:[],allStudents:[],paginationMsg:{current:1,pageSize:20,showSizeChanger:!0},allRoom:[],allSubject:[]},effects:{delStudent:u.a.mark(function t(n,e){var a,r,c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.payload,r=e.put,c=e.call,t.next=4,c(o.e,a);case 4:return t.next=6,r({type:"getAllStudent"});case 6:case"end":return t.stop()}},t,this)}),getOtherData:u.a.mark(function t(n,e){var a,r,o;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.put,r=e.call,t.next=3,r(i);case 3:return o=t.sent,t.next=6,a({type:"saveOtherData",payload:{allRoom:o[0].data,allSubject:o[1].data}});case 6:case"end":return t.stop()}},t,this)}),getAllStudent:u.a.mark(function t(n,e){var a,r,o;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.put,r=e.call,t.next=3,r(d);case 3:return o=t.sent,t.next=6,a({type:"saveFoundationData",payload:o[0].data.concat(o[1].data)});case 6:return t.next=8,a({type:"saveStudent",payload:o[0].data.concat(o[1].data)});case 8:case"end":return t.stop()}},t,this)}),searchContent:u.a.mark(function t(n,e){var r,o,c,i,d,s,f;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.payload,o=e.put,c=e.select,i=["student_name","room_id"],t.next=5,c(function(t){return t.student.foundationData});case 5:return d=t.sent,s=c(function(t){return Object(a.a)({},t.student.paginationMsg,{current:1,pageSize:20})}),t.next=9,o({type:"changePagination",payload:s});case 9:return f=d.filter(function(t){return r[i[0]].trim()?r[i[0]].trim()===t[i[0]].trim():!r[i[1]]||r[i[1]]===t[i[1]]}),t.next=12,o({type:"saveStudent",payload:f});case 12:case"end":return t.stop()}},t,this)})},reducers:{saveFoundationData:function(t,n){var e=n.payload;return Object(a.a)({},t,{foundationData:e})},saveStudent:function(t,n){var e=n.payload;return Object(a.a)({},t,{allStudents:e})},saveOtherData:function(t,n){var e=n.payload;return Object(a.a)({},t,e)},changePagination:function(t,n){var e=n.payload;return Object(a.a)({},t,{paginationMsg:Object(a.a)({},e)})}}}}}]);
//# sourceMappingURL=31.f4434aa9.chunk.js.map