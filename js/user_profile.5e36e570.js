"use strict";(self["webpackChunkHeimatoutiao"]=self["webpackChunkHeimatoutiao"]||[]).push([[932],{8996:function(e,t,a){a.r(t),a.d(t,{default:function(){return v}});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"user-profile"},[t("van-nav-bar",{attrs:{title:"个人信息","left-arrow":""},on:{"click-left":function(t){return e.$router.back()}}}),t("van-cell",{attrs:{title:"头像",center:"","is-link":""}},[t("van-image",{attrs:{src:e.userProfile.photo,round:"",fit:"cover",width:"30",height:"30"}})],1),t("van-cell",{attrs:{title:"昵称","is-link":"",value:e.userProfile.name},on:{click:function(t){e.showEditNameShow=!0}}}),t("van-cell",{attrs:{title:"性别","is-link":"",value:0===e.userProfile.gender?"男":"女"}}),t("van-cell",{attrs:{title:"生日","is-link":"",value:e.userProfile.birthday}}),t("van-popup",{style:{height:"100%"},attrs:{position:"bottom"},model:{value:e.showEditNameShow,callback:function(t){e.showEditNameShow=t},expression:"showEditNameShow"}},[t("update-name",{on:{close:function(t){e.showEditNameShow=!1},"update-name":function(t){e.userProfile.name=t}},model:{value:e.userProfile.name,callback:function(t){e.$set(e.userProfile,"name",t)},expression:"userProfile.name"}})],1)],1)},l=[],s=function(){var e=this,t=e._self._c;return t("div",[t("van-nav-bar",{staticClass:"nav-bar-vant",attrs:{title:"修改昵称","left-text":"取消","right-text":"完成"},on:{"click-left":function(t){return e.$emit("close")},"click-right":e.onClickRight}}),t("van-field",{attrs:{rows:"2",type:"textarea",maxlength:"7",placeholder:"请输入昵称","show-word-limit":""},model:{value:e.localName,callback:function(t){e.localName=t},expression:"localName"}})],1)},o=[],n=a(7756),r={name:"UpdateName",props:{value:{type:String,required:!0}},data(){return{localName:this.name}},methods:{async onClickRight(){this.$toast.loading({message:"保存中...",forbidClick:!0});try{await(0,n.Lj)({name:this.localName}),this.$toast.success("保存成功"),this.$emit("input",this.localName),this.$emit("close")}catch(e){e&&e.response&&409===e.response.status&&this.$toast.fail("昵称已存在")}}}},c=r,u=a(1001),h=(0,u.Z)(c,s,o,!1,null,"fae4bb12",null),m=h.exports,f={name:"UserProfile",data(){return{userProfile:{},showEditNameShow:!1}},components:{UpdateName:m},created(){this.loadUserProfile()},methods:{async loadUserProfile(){const{data:e}=await(0,n.et)();this.userProfile=e}}},d=f,p=(0,u.Z)(d,i,l,!1,null,"7e617573",null),v=p.exports}}]);
//# sourceMappingURL=user_profile.5e36e570.js.map