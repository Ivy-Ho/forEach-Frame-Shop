(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c01f7a2"],{1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination"},[t._m(0),e("li",{staticClass:"page-item"},t._l(t.pages.total_pages,(function(a){return e("a",{key:a,staticClass:"page-link",class:{active:t.pages.curent_page===a},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.updatePage(a)}}},[t._v(" "+t._s(a))])})),0),t._m(1)])])])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"page-item"},[e("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v("Previous")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"page-item"},[e("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v("Next")])])}],r={name:"Pagination",props:["pages"],methods:{updatePage:function(t){this.$emit("update",t)}}},n=r,o=e("2877"),c=Object(o["a"])(n,s,i,!1,null,null,null);a["a"]=c.exports},"32ca":function(t,a,e){},"6a04":function(t,a,e){"use strict";var s=e("32ca"),i=e.n(s);i.a},"99af":function(t,a,e){"use strict";var s=e("23e7"),i=e("d039"),r=e("e8b5"),n=e("861d"),o=e("7b0b"),c=e("50c4"),d=e("8418"),l=e("65f0"),p=e("1dde"),u=e("b622"),m=e("2d00"),h=u("isConcatSpreadable"),_=9007199254740991,f="Maximum allowed index exceeded",v=m>=51||!i((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),g=p("concat"),b=function(t){if(!n(t))return!1;var a=t[h];return void 0!==a?!!a:r(t)},C=!v||!g;s({target:"Array",proto:!0,forced:C},{concat:function(t){var a,e,s,i,r,n=o(this),p=l(n,0),u=0;for(a=-1,s=arguments.length;a<s;a++)if(r=-1===a?n:arguments[a],b(r)){if(i=c(r.length),u+i>_)throw TypeError(f);for(e=0;e<i;e++,u++)e in r&&d(p,u,r[e])}else{if(u>=_)throw TypeError(f);d(p,u++,r)}return p.length=u,p}})},efd9:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"orders container"},[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("h2",{staticClass:"mt-3 text-center"},[t._v("後台訂單管理列表")]),e("table",{staticClass:"table mt-4"},[t._m(0),e("tbody",t._l(t.orders,(function(a){return e("tr",{key:a.id},[e("td",[t._v(t._s(a.created.timestamp))]),e("td",[t._v(t._s(a.created.datetime))]),e("td",[t._v(" "+t._s(a.payment)+" ")]),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:a.paid,expression:"item.paid"}],staticClass:"form-check-input ml-1",attrs:{type:"checkbox",id:"paid"},domProps:{checked:Array.isArray(a.paid)?t._i(a.paid,null)>-1:a.paid},on:{change:[function(e){var s=a.paid,i=e.target,r=!!i.checked;if(Array.isArray(s)){var n=null,o=t._i(s,n);i.checked?o<0&&t.$set(a,"paid",s.concat([n])):o>-1&&t.$set(a,"paid",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(a,"paid",r)},function(e){return t.setOrderPaid(a)}]}}),e("label",{staticClass:"form-check-label ml-4",attrs:{for:"paid"}},[a.paid?e("span",{staticClass:"text-success"},[t._v("已付款")]):e("span",{staticClass:"text-danger"},[t._v("未付款")])])]),e("td",{staticClass:"text-right"},[t._v(" "+t._s(t._f("thousands")(a.amount))+" ")]),e("td",[e("button",{staticClass:"btn btn-outline-primary btn-sm",attrs:{type:"button",disabled:t.loadingBtn===a.id},on:{click:function(e){return t.openModal(a)}}},[t.loadingBtn===a.id?e("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):t._e(),t._v(" 訂單明細 ")])])])})),0)]),e("Pagination",{attrs:{pages:t.pagination},on:{update:t.getOrders}}),e("div",{staticClass:"modal",attrs:{id:"orderModal",tabindex:"-1","aria-labelledby":"orderModal","aria-hidden":"true"}},[t.tempOrder.user?e("Ordermodal",{attrs:{"temp-order":t.tempOrder},on:{update:t.closeModal}}):t._e()],1)],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",[t._v(" 訂單編號 ")]),e("th",[t._v(" 下單時間 ")]),e("th",[t._v(" 付款方式 ")]),e("th",[t._v(" 付款狀態 ")]),e("th",[t._v(" 應付金額 ")]),e("th",[t._v(" 編輯 ")])])])}],r=(e("99af"),e("1799")),n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content border-0"},[t._m(0),e("div",{staticClass:"modal-body"},[e("section",{staticClass:"mb-4"},[e("h3",{staticClass:"border-bottom pb-2"},[t._v("訂購人資料")]),e("p",[t._v("姓名 : "+t._s(t.tempOrder.user.name))]),e("p",[t._v("電話 : "+t._s(t.tempOrder.user.tel))]),e("p",[t._v("信箱 : "+t._s(t.tempOrder.user.email))]),e("p",[t._v("地址 : "+t._s(t.tempOrder.user.address))])]),e("section",[e("h3",{staticClass:"border-bottom pb-2"},[t._v("訂單資訊")]),e("p",[t._v("訂購商品項目 :")]),t._l(t.tempOrder.products,(function(a){return e("ul",{key:a.product.title},[e("li",[t._v(t._s(a.product.title)+" "),e("small",[t._v(" "+t._s(t._f("thousands")(a.product.price))+" x "+t._s(a.quantity)+" "+t._s(a.product.unit)+" ")])])])})),t.tempOrder.coupon?e("p",[t._v("優惠券 : "+t._s(t.tempOrder.coupon.title))]):t._e(),e("p",[t._v("應付總金額 : "+t._s(t._f("thousands")(parseInt(t.tempOrder.amount)+100)))]),e("p",[t._v("訂單備註 : "+t._s(t.tempOrder.message))]),e("p",[t._v("付款方式 : "+t._s(t.tempOrder.payment))]),e("p",[t._v("付款狀態 : "),t.tempOrder.paid?e("span",{staticClass:"text-success"},[t._v("已付款")]):e("span",{staticClass:"text-danger"},[t._v("未付款")])])],2)]),t._m(1)])])])},o=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-dark text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("訂單明細")]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary text-white",attrs:{type:"button","data-dismiss":"modal"}},[t._v("關閉")])])}],c={name:"Ordermodal",props:["tempOrder"]},d=c,l=(e("6a04"),e("2877")),p=Object(l["a"])(d,n,o,!1,null,null,null),u=p.exports,m={name:"Orders",components:{Ordermodal:u,Pagination:r["a"]},data:function(){return{orders:[],tempOrder:{},pagination:{},token:"",isNew:"",loadingBtn:"",isLoading:!1,fullPage:!0}},props:[" token "],methods:{openModal:function(t){var a=this;this.loadingBtn=t.id;var e="".concat("https://course-ec-api.hexschool.io/","api/").concat("8a9d1554-1794-46f4-9f77-1517fa6cb261","/admin/ec/orders/").concat(t.id);this.$http.get(e).then((function(t){a.tempOrder=t.data.data,$("#orderModal").modal("show"),a.loadingBtn=""})).catch((function(){a.loadingBtn=""}))},getOrders:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io/","api/").concat("8a9d1554-1794-46f4-9f77-1517fa6cb261","/admin/ec/orders?page= ").concat(a);this.$http.get(e).then((function(a){t.orders=a.data.data,t.pagination=a.data.meta.pagination,t.isLoading=!1})).catch((function(){t.isLoading=!1}))},closeModal:function(){this.getOrders(),$("#orderModal").modal("hide")},setOrderPaid:function(t){var a=this;this.isLoading=!0;var e="",s="";t.paid?(s="".concat("https://course-ec-api.hexschool.io/","api/").concat("8a9d1554-1794-46f4-9f77-1517fa6cb261","/admin/ec/orders/").concat(t.id,"/paid"),e="已付款"):(s="".concat("https://course-ec-api.hexschool.io/","api/").concat("8a9d1554-1794-46f4-9f77-1517fa6cb261","/admin/ec/orders/").concat(t.id,"/unpaid"),e="未付款"),this.$http.patch(s,t.id).then((function(){a.$bus.$emit("message:push","已修改訂單付款狀態為 ".concat(e),"success"),a.getOrders(),a.isLoading=!1})).catch((function(){a.$bus.$emit("message:push","出現錯誤!","danger"),a.isLoading=!1}))}},created:function(){this.getOrders()}},h=m,_=Object(l["a"])(h,s,i,!1,null,null,null);a["default"]=_.exports}}]);
//# sourceMappingURL=chunk-2c01f7a2.9c540188.js.map