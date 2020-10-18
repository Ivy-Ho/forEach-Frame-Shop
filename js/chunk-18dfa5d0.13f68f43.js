(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18dfa5d0"],{"0fd0":function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"product"},[i("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),i("section",{staticClass:"container py-5 mt-5"},[i("div",{staticClass:"row mb-3"},[i("div",{staticClass:"col-12 col-md-6"},[i("img",{staticClass:"w-100",attrs:{src:t.product.imageUrl,alt:"產品圖片"}})]),i("div",{staticClass:"col-12 col-md-6"},[i("h3",{staticClass:"mb-3"},[t._v(t._s(t.product.title))]),t.product.price?i("div",{staticClass:"mb-3"},[i("del",[i("small",[t._v("原價 "+t._s(t._f("thousands")(t.product.origin_price))+" 元")])]),i("div",{staticClass:"h4 text-primary"},[i("span",[t._v(t._s(t._f("thousands")(t.product.price)))]),t._v("元 ")])]):i("div",{staticClass:"h5"},[t._v(" "+t._s(t._f("thousands")(t.product.origin_price))+" 元 ")]),i("form",{staticClass:"mb-3 d-flex text-third"},[i("div",{staticClass:"input-group"},[i("button",{staticClass:"btn btn-outline-dark qty-btn-border text-third",attrs:{type:"button",disabled:1===t.productQty},on:{click:function(s){t.productQty=t.productQty-1}}},[i("i",{staticClass:"fa fa-minus"})]),i("input",{staticClass:"text-center qty-input-w qty-input-border text-third",attrs:{onkeyup:"value=value.replace(/^(0+)|[^\\d]+/g,'')"},domProps:{value:t.productQty}}),i("button",{staticClass:"btn btn-outline-dark qty-btn-border text-third",attrs:{type:"button"},on:{click:function(s){t.productQty=t.productQty+1}}},[i("i",{staticClass:"fa fa-plus"})])])]),i("button",{staticClass:"btn btn-danger text-white w-100 mb-1",attrs:{type:"button",disabled:t.status.loadingCart===t.product.id},on:{click:function(s){return t.addToCart(t.product.id,t.productQty)}}},[t.status.loadingCart===t.product.id?i("i",{staticClass:"spinner-grow spinner-grow-sm align-middle"}):t._e(),t._v(" 加入購物車 ")]),i("hr"),i("div",{staticClass:"d-none d-lg-block"},[t._m(0),i("p",{staticClass:"text-third"},[t._v(" "+t._s(t.product.description)+" ")]),t._m(1),i("p",{staticClass:"text-third"},[t._v(" "+t._s(t.product.content)+" ")])])])]),i("div",{staticClass:"row d-lg-none"},[i("div",{staticClass:"col-12"},[t._m(2),i("p",{staticClass:"text-third"},[t._v(" "+t._s(t.product.description)+" ")])]),i("div",{staticClass:"col-12 col-sm-6"},[t._m(3),i("p",{staticClass:"text-third"},[t._v(" "+t._s(t.product.content)+" ")])])])]),i("section",{staticClass:"bg-white"},[i("div",{staticClass:"container py-3"},[i("h4",{staticClass:"mb-3 font-weight-normal"},[t._v("精選人氣商品")]),i("Swiper")],1)])],1)},e=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("h5",{staticClass:"font-weight-normal"},[i("span",[t._v("產品描述")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("h5",{staticClass:"font-weight-normal"},[i("span",[t._v("產品規格")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("h5",{staticClass:"font-weight-normal"},[i("span",[t._v("產品描述")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("h5",{staticClass:"font-weight-normal"},[i("span",[t._v("產品規格")])])}],n=(i("99af"),i("8419")),o={components:{Swiper:n["a"]},data:function(){return{product:{},isLoading:!1,fullPage:!0,productQty:1,status:{loadingCart:""}}},created:function(){this.getProduct()},methods:{getProduct:function(){var t=this;this.isLoading=!0;var s=this.$route.params.id;this.$http.get("".concat("https://course-ec-api.hexschool.io/","api/").concat("8a9d1554-1794-46f4-9f77-1517fa6cb261","/ec/product/").concat(s)).then((function(s){t.product=s.data.data,t.isLoading=!1})).catch((function(){t.$bus.$emit("message:push","產品列表載入失敗","danger"),t.isLoading=!1}))},addToCart:function(t){var s=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.status.loadingCart=t;var a="".concat("https://course-ec-api.hexschool.io/","api/").concat("8a9d1554-1794-46f4-9f77-1517fa6cb261","/ec/shopping"),e={product:t,quantity:i};this.$http.post(a,e).then((function(){s.$bus.$emit("get-cart"),s.$bus.$emit("message:push","加入成功!","success"),s.status.loadingCart=""})).catch((function(){s.$bus.$emit("message:push","加入失敗!該產品已在購物車內~","danger"),s.status.loadingCart=""}))}}},c=o,r=(i("fbb4"),i("2877")),d=Object(r["a"])(c,a,e,!1,null,"26e6c08f",null);s["default"]=d.exports},6996:function(t,s,i){"use strict";var a=i("9c54"),e=i.n(a);e.a},8419:function(t,s,i){"use strict";var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("swiper",{staticClass:"swiper",attrs:{options:t.swiperOption}},[t._l(t.popProducts,(function(s){return i("swiper-slide",{key:s.id},[i("router-link",{attrs:{to:"/product/"+s.id,target:"_blank"}},[i("div",{staticClass:"pop-pic mb-1 mb-md-3"},[i("span",{staticClass:"sale-icon bg-warning text-white"},[t._v("sale")]),i("img",{attrs:{src:""+s.img[0],alt:""}})]),i("div",{staticClass:"text-dark text-center"},[i("h5",{staticClass:"mb-2"},[t._v(t._s(s.title))]),i("div",{staticClass:"d-flex justify-content-center"},[i("p",{staticClass:"mr-2"},[t._v(t._s(t._f("thousands")(s.price)))]),i("del",{staticClass:"text-third"},[i("small",[t._v(t._s(t._f("thousands")(s.origin_price)))])])])])])],1)})),i("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)},e=[],n=i("7212"),o=(i("bbe3"),{name:"swiper-example-free-mode",title:"Free mode / No fixed positions",components:{Swiper:n["Swiper"],SwiperSlide:n["SwiperSlide"]},data:function(){return{swiperOption:{slidesPerView:1,spaceBetween:5,freeMode:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{897:{slidesPerView:4},668:{slidesPerView:3},569:{slidesPerView:2}}},popProducts:[{id:"0EIdvmIaR4de5OWWaW8CT9BC5XSOv3ZldcMsFrtyaLXpwwOcjAFKdi2RujzhFFvu",img:["https://hexschool-api.s3.us-west-2.amazonaws.com/custom/FjhWJrGDsXr5zKtBdLafu2gDrcWMT2yM3jC1Iqrju5pxE5yUio9AYHR8JyAL9mcDIHfTCO7Y8doeAtbxXW0pnt2QBHxpqr3qwtKvAdsvsGLDUL6d2eW18gsg4MMVvuXi.jpg"],title:"北歐極簡床頭相框-簡約白",price:329,origin_price:400},{id:"BZaZG9vuu0AIZn1Ini72MmOwGakDJM8id1LDsrxstgsWcHKohYE911CB5p0emFlr",img:["https://hexschool-api.s3.us-west-2.amazonaws.com/custom/apeklq1IW0BtkvasBOyx5LwXdUfZ0F4AJJh7bI1tWaAU8WfFWgMkub0kpbKiN6WSgg81K60seJce36dsfNfoyb1ileKfsqEz0SDeFpK6nwezx9LHsd6XmjHSSZhY9Iyg.jpg"],title:"森林系木紋三件組",price:999,origin_price:1380},{id:"gspmPIPiJUHq86PitMOH9p5zf8KTGkC1A7MKSJVlV0zLRnHVsKXoVvnBLi6iaRcb",img:["https://hexschool-api.s3.us-west-2.amazonaws.com/custom/1ddF78g7I6RsldLWvFfjItpaWSXaBa0L0L00gLhQwE9JyBYdkdcMhgYXaEpneVMzSnUKKRfmZxAMUZD6CJpaL4KYdh9S4c8TauaGqBoEIum48YCkQbxRkUvhTYCnxesB.jpg"],title:"丹麥銅邊畫框",price:1050,origin_price:1390},{id:"1wThN2ceAiqhMSZ0bcd2OkASdKwKdQZFYJM6GdajZMbWIafmv3KHk8gmpYCWP7p3",img:["https://hexschool-api.s3.us-west-2.amazonaws.com/custom/tpfwwu7YHV1ahH8ofaouPu64HR06GQtCaj48ChFchzxwwwAsyT6TDtwmirNKRfIosuKoMMIrQ64r55gSLYSuCl80X7zqDELgoO0yn2VSPRLgPzj30967nW9hIRbU8MzQ.jpg"],title:"細邊幾何金屬設計框-質感黑",price:599,origin_price:720},{id:"lgUlxENCaUb8QExvczlZNUt0P0oPwKoB0r5ndFATVh0divsiXW7IybKlSlD4su4U",img:["https://hexschool-api.s3.us-west-2.amazonaws.com/custom/bBZ1oxu1gGdv7kejwhvf96rHrmgwehuA5NHMWEwIdrCuhpnkGrR64uFoENjCsxEpltjHmQ6NA3GkMsprxj2vK93GO9venGx7sTjbFyfoy5k4QV1IX1SFuJdVX7uHSXfb.jpg"],title:"細窄邊金屬畫框-香檳金",price:499,origin_price:650}]}}}),c=o,r=(i("6996"),i("2877")),d=Object(r["a"])(c,a,e,!1,null,"82616c34",null);s["a"]=d.exports},"99af":function(t,s,i){"use strict";var a=i("23e7"),e=i("d039"),n=i("e8b5"),o=i("861d"),c=i("7b0b"),r=i("50c4"),d=i("8418"),p=i("65f0"),l=i("1dde"),u=i("b622"),h=i("2d00"),f=u("isConcatSpreadable"),g=9007199254740991,m="Maximum allowed index exceeded",v=h>=51||!e((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),w=l("concat"),b=function(t){if(!o(t))return!1;var s=t[f];return void 0!==s?!!s:n(t)},C=!v||!w;a({target:"Array",proto:!0,forced:C},{concat:function(t){var s,i,a,e,n,o=c(this),l=p(o,0),u=0;for(s=-1,a=arguments.length;s<a;s++)if(n=-1===s?o:arguments[s],b(n)){if(e=r(n.length),u+e>g)throw TypeError(m);for(i=0;i<e;i++,u++)i in n&&d(l,u,n[i])}else{if(u>=g)throw TypeError(m);d(l,u++,n)}return l.length=u,l}})},"9c54":function(t,s,i){},d4c1:function(t,s,i){},fbb4:function(t,s,i){"use strict";var a=i("d4c1"),e=i.n(a);e.a}}]);
//# sourceMappingURL=chunk-18dfa5d0.13f68f43.js.map