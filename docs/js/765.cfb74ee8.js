(self["webpackChunkcustomersurveymangementsystemsurvey"]=self["webpackChunkcustomersurveymangementsystemsurvey"]||[]).push([[765],{3066:(e,l,t)=>{"use strict";t.r(l),t.d(l,{default:()=>sl});t(246);var s=t(3673),a=t(2323),n=t(8880);const i=e=>((0,s.dD)("data-v-ac50da98"),e=e(),(0,s.Cn)(),e),o={class:"q-pa-md"},r={class:"row"},u={class:"q-pa-md"},d=(0,s.Uk)("Scan QR"),c={class:"row"},m={class:"q-pa-lg"},v=(0,s.Uk)(" Preferred verification: "),p={class:"row"},y={class:"q-pa-lg"},w={id:"legendPanel"},g=i((()=>(0,s._)("tr",null,[(0,s._)("th",{colspan:"2"},"Legend")],-1))),f=i((()=>(0,s._)("tr",null,[(0,s._)("th",null,"Rating"),(0,s._)("th",null,"Smiley")],-1))),h=i((()=>(0,s._)("th",null,"Poor - 1",-1))),b=i((()=>(0,s._)("th",null,"Fair - 2",-1))),_=i((()=>(0,s._)("th",null,"Satisfactory - 3",-1))),j=i((()=>(0,s._)("th",null,"Very Satisfactory - 4",-1))),k=i((()=>(0,s._)("th",null,"Excellent - 5",-1))),V={class:"row"},q={class:""},x={key:0},z={class:"row"},S={class:"questions"},C={class:"row inline"},A={class:"inputs"},Q={key:1},W={class:"questions"},Z={class:"surveyquestions"},H=i((()=>(0,s._)("div",{class:"row inline>"},[(0,s._)("div",{class:"col-4"},[(0,s._)("h5",null,"Survey Questions")])],-1))),R={class:"row"},D={class:"col-4 col-md-4"},N={class:"questions"},P={class:"row inline"},F={class:"inputs"},I={class:"row justify-end"},U={class:"text-h5 inline"},M=i((()=>(0,s._)("tr",null,[(0,s._)("th",null,"Questions"),(0,s._)("th",null,"Answers")],-1))),E={key:0,style:{"text-align":"left"}},T={key:1,style:{"text-align":"right"}},B={class:"row justify-center"},O=i((()=>(0,s._)("div",{class:"text-h6"},"How was your experience using the app?",-1))),X=i((()=>(0,s._)("div",{class:"text-h6"},"Scan QR Code",-1))),Y=(0,s.Uk)("Close"),$={class:"scan-confirmation"};function L(e,l,t,i,L,K){const J=(0,s.up)("q-input"),G=(0,s.up)("q-tooltip"),ee=(0,s.up)("q-btn"),le=(0,s.up)("q-option-group"),te=(0,s.up)("q-icon"),se=(0,s.up)("CustomSurveyField"),ae=(0,s.up)("q-card-section"),ne=(0,s.up)("q-card-actions"),ie=(0,s.up)("q-card"),oe=(0,s.up)("q-dialog"),re=(0,s.up)("q-spinner-facebook"),ue=(0,s.up)("q-form"),de=(0,s.up)("q-rating"),ce=(0,s.up)("q-space"),me=(0,s.up)("qrcode-stream"),ve=(0,s.up)("q-page"),pe=(0,s.Q2)("close-popup");return(0,s.wg)(),(0,s.j4)(ve,null,{default:(0,s.w5)((()=>[(0,s._)("div",o,[(0,s.Wm)(ue,{onSubmit:e.onSubmit,class:"q-gutter-md",ref:"surveyRefForm"},{default:(0,s.w5)((()=>[(0,s._)("div",r,[(0,s._)("div",null,[(0,s.Wm)(J,{ref:"inputRef",filled:"","lazy-rules":"",rules:[e=>!!e||"Field is required",e=>/^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/.test(e)||"Field should be a valid tsr number ex. XXX-XXX-XXX-XXX"],outlined:"",modelValue:e.TsrNo,"onUpdate:modelValue":l[0]||(l[0]=l=>e.TsrNo=l),label:"TSR Number",style:{width:"250px"},"stack-label":""},null,8,["rules","modelValue"])]),(0,s._)("div",null,[(0,s._)("div",u,[(0,s.Wm)(ee,{round:"",color:"primary",onClick:l[1]||(l[1]=l=>e.showQRStream=!0),icon:"fas fa-qrcode"},{default:(0,s.w5)((()=>[(0,s.Wm)(G,{class:"bg-white text-primary"},{default:(0,s.w5)((()=>[d])),_:1})])),_:1})])])]),(0,s._)("div",c,[(0,s._)("div",m,[v,(0,s.Wm)(le,{modelValue:e.group,"onUpdate:modelValue":l[2]||(l[2]=l=>e.group=l),options:e.options,color:"primary",inline:""},null,8,["modelValue","options"])])]),(0,s._)("div",p,[(0,s._)("div",y,[3==e.modeValidate?((0,s.wg)(),(0,s.j4)(J,{key:0,ref:"emailRef",filled:"","lazy-rules":"",rules:[e=>!!e||"Field is required",e=>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)||"Field should be a valid email ex. xxxx@mail.com"],outlined:"",modelValue:e.emailCustomerValidate,"onUpdate:modelValue":l[3]||(l[3]=l=>e.emailCustomerValidate=l),label:e.selectedLabel,style:{width:"250px"},"stack-label":""},null,8,["rules","modelValue","label"])):1==e.modeValidate?((0,s.wg)(),(0,s.j4)(J,{key:1,ref:"emailRef",filled:"","lazy-rules":"",rules:[e=>!!e||"Field is required",e=>/^(09|\+639)\d{9}$/.test(e)||"Field should be a valid mobile number ex 09xxxxxxxxx or +639xxxxxxxxx"],outlined:"",modelValue:e.emailCustomerValidate,"onUpdate:modelValue":l[4]||(l[4]=l=>e.emailCustomerValidate=l),label:e.selectedLabel,style:{width:"250px"},"stack-label":""},null,8,["rules","modelValue","label"])):((0,s.wg)(),(0,s.j4)(J,{key:2,ref:"emailRef",filled:"","lazy-rules":"",rules:[e=>!!e||"Field is required",e=>/^\d{3}-\d{4}$/.test(e)||"Field should be a valid telephone number ex xxx-xxxx"],outlined:"",modelValue:e.emailCustomerValidate,"onUpdate:modelValue":l[5]||(l[5]=l=>e.emailCustomerValidate=l),label:e.selectedLabel,style:{width:"250px"},"stack-label":""},null,8,["rules","modelValue","label"]))])]),(0,s._)("div",w,[(0,s._)("table",null,[g,f,(0,s._)("tr",null,[h,(0,s._)("th",null,[(0,s.Wm)(te,{name:"sentiment_very_dissatisfied",size:"2.0em"})])]),(0,s._)("tr",null,[b,(0,s._)("th",null,[(0,s.Wm)(te,{name:"sentiment_dissatisfied",size:"2.0em"})])]),(0,s._)("tr",null,[_,(0,s._)("th",null,[(0,s.Wm)(te,{name:"sentiment_satisfied",size:"2.0em"})])]),(0,s._)("tr",null,[j,(0,s._)("th",null,[(0,s.Wm)(te,{name:"sentiment_satisfied_alt",size:"2.0em"})])]),(0,s._)("tr",null,[k,(0,s._)("th",null,[(0,s.Wm)(te,{name:"sentiment_very_satisfied",size:"2.0em"})])])])]),(0,s._)("div",V,[(0,s._)("div",q,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.orderByPositionQuestions,((l,t)=>((0,s.wg)(),(0,s.iD)("div",{key:l.question},[(0,s._)("div",null,[0==l.children.length?((0,s.wg)(),(0,s.iD)("div",x,[(0,s._)("div",z,[(0,s._)("p",S,(0,a.zw)(l.description),1)]),(0,s._)("div",C,[(0,s._)("div",A,[3==l.id?((0,s.wg)(),(0,s.j4)(se,{key:0,modelValue:e.surveyAnswer.answers[t],"onUpdate:modelValue":l=>e.surveyAnswer.answers[t]=l,questionId:l.id,question_type:l.question_type,labelval:l.label},null,8,["modelValue","onUpdate:modelValue","questionId","question_type","labelval"])):((0,s.wg)(),(0,s.j4)(se,{key:1,modelValue:e.surveyAnswer.answers[t],"onUpdate:modelValue":l=>e.surveyAnswer.answers[t]=l,questionId:l.id,question_type:l.question_type,labelval:l.label},null,8,["modelValue","onUpdate:modelValue","questionId","question_type","labelval"]))])])])):l.children.length>0?((0,s.wg)(),(0,s.iD)("div",Q,[(0,s._)("p",W,(0,a.zw)(l.description),1),(0,s._)("div",Z,[H,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.orderByNestedSurveyQuestions(l.children),((l,n)=>((0,s.wg)(),(0,s.iD)("div",{class:"q-pa-md",key:l.id},[(0,s._)("div",R,[(0,s._)("div",D,[(0,s._)("p",N,(0,a.zw)(n+1)+". "+(0,a.zw)(l.description),1)]),(0,s._)("div",P,[(0,s._)("div",F,[(0,s.Wm)(se,{modelValue:e.subHeaderSurveyAnswer.answers[e.orderByPositionQuestions.slice(0,t).reduce(((e,l)=>e+l.children.length),0)+n],"onUpdate:modelValue":l=>e.subHeaderSurveyAnswer.answers[e.orderByPositionQuestions.slice(0,t).reduce(((e,l)=>e+l.children.length),0)+n]=l,questionId:l.id,question_type:l.question_type,labelval:l.label},null,8,["modelValue","onUpdate:modelValue","questionId","question_type","labelval"])]),(0,s._)("div",null,[e.subHeaderSurveyAnswer.answers[e.orderByPositionQuestions.slice(0,t).reduce(((e,l)=>e+l.children.length),0)+n].value<3&&""!=e.subHeaderSurveyAnswer.answers[e.orderByPositionQuestions.slice(0,t).reduce(((e,l)=>e+l.children.length),0)+n].value?((0,s.wg)(),(0,s.j4)(J,{key:0,modelValue:e.subHeaderSurveyAnswer.answers[e.orderByPositionQuestions.slice(0,t).reduce(((e,l)=>e+l.children.length),0)+n].remarks,"onUpdate:modelValue":l=>e.subHeaderSurveyAnswer.answers[e.orderByPositionQuestions.slice(0,t).reduce(((e,l)=>e+l.children.length),0)+n].remarks=l,outlined:"",label:"Remarks:",style:{width:"300px"},"stack-label":"","lazy-rules":"",rules:[e=>!!e||"Field is required"]},null,8,["modelValue","onUpdate:modelValue","rules"])):(0,s.kq)("",!0)])])])])))),128))])])):(0,s.kq)("",!0)])])))),128))])]),(0,s._)("div",I,[(0,s.Wm)(oe,{modelValue:e.prompt,"onUpdate:modelValue":l[6]||(l[6]=l=>e.prompt=l)},{default:(0,s.w5)((()=>[(0,s.Wm)(ie,{style:{"min-width":"500px"}},{default:(0,s.w5)((()=>[(0,s.Wm)(ae,{class:"bg-primary text-white"},{default:(0,s.w5)((()=>[(0,s._)("div",U,[(0,s._)("span",null,"Please Confirm Answers for TSR Number: "+(0,a.zw)(e.TsrNo),1)])])),_:1}),(0,s.Wm)(ae,{class:"row items-left"},{default:(0,s.w5)((()=>[(0,s._)("table",null,[M,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.cols,(l=>((0,s.wg)(),(0,s.iD)("tr",{key:l.id},[void 0!=e.answer.value?((0,s.wg)(),(0,s.iD)("td",E,(0,a.zw)(l.description),1)):(0,s.kq)("",!0),void 0!=e.answer.value?((0,s.wg)(),(0,s.iD)("td",T,(0,a.zw)(l.value),1)):(0,s.kq)("",!0)])))),128))])])),_:1}),(0,s.Wm)(ne,{align:"right"},{default:(0,s.w5)((()=>[(0,s.wy)((0,s.Wm)(ee,{flat:"",label:"Cancel",color:"primary"},null,512),[[pe]]),(0,s.wy)((0,s.Wm)(ee,{flat:"",label:"Submit",onClick:e.onSubmit,color:"primary"},null,8,["onClick"]),[[pe]])])),_:1})])),_:1})])),_:1},8,["modelValue"])]),(0,s._)("div",B,[(0,s.Wm)(ee,{label:"Reset Form",class:"q-ma-sm",color:"primary",onClick:e.clearFields},null,8,["onClick"]),(0,s.Wm)(ee,{class:"q-ma-sm",color:"primary",label:"Submit",onClick:e.confirmModalShow},{loading:(0,s.w5)((()=>[(0,s.Wm)(re)])),_:1},8,["onClick"])])])),_:1},8,["onSubmit"])]),(0,s.Wm)(oe,{modelValue:e.feedbackAfter,"onUpdate:modelValue":l[10]||(l[10]=l=>e.feedbackAfter=l),persistent:""},{default:(0,s.w5)((()=>[(0,s.Wm)(ie,{style:{"min-width":"350px"}},{default:(0,s.w5)((()=>[(0,s.Wm)(ae,null,{default:(0,s.w5)((()=>[O])),_:1}),(0,s.Wm)(ae,{class:"row justify-center"},{default:(0,s.w5)((()=>[(0,s.Wm)(de,{modelValue:e.ratingApp.value,"onUpdate:modelValue":l[7]||(l[7]=l=>e.ratingApp.value=l),size:"3.5em",color:"primary",icon:"star_border"},null,8,["modelValue"])])),_:1}),(0,s.Wm)(ae,{class:"q-pt-none"},{default:(0,s.w5)((()=>[(0,s.wy)((0,s.Wm)(J,{dense:"",modelValue:e.ratingApp.remarks,"onUpdate:modelValue":l[8]||(l[8]=l=>e.ratingApp.remarks=l),autofocus:"",onKeyup:l[9]||(l[9]=(0,n.D2)((l=>e.prompt=!1),["enter"]))},null,8,["modelValue"]),[[n.F8,e.ratingApp.value<=2&&e.ratingApp.value>0]])])),_:1}),(0,s.Wm)(ne,{align:"right",class:"text-primary"},{default:(0,s.w5)((()=>[(0,s.wy)((0,s.Wm)(ee,{flat:"",label:"Submit",onClick:e.submitRateAppSurvey},null,8,["onClick"]),[[pe]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,s.Wm)(oe,{modelValue:e.showQRStream,"onUpdate:modelValue":l[11]||(l[11]=l=>e.showQRStream=l)},{default:(0,s.w5)((()=>[(0,s.Wm)(ie,{style:{width:"100%"}},{default:(0,s.w5)((()=>[(0,s.Wm)(ae,{class:"row items-center bg-primary text-white"},{default:(0,s.w5)((()=>[X,(0,s.Wm)(ce),(0,s.wy)(((0,s.wg)(),(0,s.j4)(ee,{class:"float-right",dense:"",flat:"",icon:"close"},{default:(0,s.w5)((()=>[(0,s.Wm)(G,{class:"bg-white text-primary"},{default:(0,s.w5)((()=>[Y])),_:1})])),_:1})),[[pe]])])),_:1}),(0,s.Wm)(ae,{class:"bg-white"},{default:(0,s.w5)((()=>[(0,s.Wm)(me,{camera:e.camera,onDecode:e.onDecode,onInit:e.onInit},{default:(0,s.w5)((()=>[(0,s.wy)((0,s._)("div",$,null,512),[[n.F8,e.showScanConfirmation]])])),_:1},8,["camera","onDecode","onInit"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}t(71);var K=t(8825),J=t(1959);const G={key:0},ee={key:1},le={key:2};function te(e,l,t,n,i,o){const r=(0,s.up)("q-input"),u=(0,s.up)("q-tooltip"),d=(0,s.up)("q-rating");return 1==t.question_type?((0,s.wg)(),(0,s.iD)("div",G,[(0,s.Wm)(r,{outlined:"",modelValue:n.inputViewModel,"onUpdate:modelValue":l[0]||(l[0]=e=>n.inputViewModel=e),label:t.labelval,style:{width:"500px"},"stack-label":""},null,8,["modelValue","label"])])):12==n.props.questionId?((0,s.wg)(),(0,s.iD)("div",ee,[(0,s.Wm)(d,{modelValue:n.inputViewModel,"onUpdate:modelValue":l[1]||(l[1]=e=>n.inputViewModel=e),name:"answerRating",max:5,size:"3.0em",color:"grey","lazy-rules":"",rules:[e=>""==e||"Field is required"],"color-selected":[[n.colorRate(n.inputViewModel),"grey","grey","grey","grey"],["grey",n.colorRate(n.inputViewModel),"grey","grey","grey"],["grey","grey",n.colorRate(n.inputViewModel),"grey","grey"],["grey","grey","grey",n.colorRate(n.inputViewModel),"grey"],["grey","grey","grey","grey",n.colorRate(n.inputViewModel)]][n.inputViewModel?n.inputViewModel-1:0],icon:["sentiment_very_dissatisfied","sentiment_dissatisfied","sentiment_satisfied","sentiment_satisfied_alt","sentiment_very_satisfied"]},(0,s.Nv)({_:2},[(0,s.Ko)(n.rateDefinitions,((e,l)=>({name:`tip-${l+1}`,fn:(0,s.w5)((()=>[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Uk)((0,a.zw)(e),1)])),_:2},1024)]))})))]),1032,["modelValue","rules","color-selected"])])):2==t.question_type?((0,s.wg)(),(0,s.iD)("div",le,[(0,s.Wm)(d,{modelValue:n.inputViewModel,"onUpdate:modelValue":l[2]||(l[2]=e=>n.inputViewModel=e),max:5,size:"3.0em",color:"grey","color-selected":[[n.colorRate(n.inputViewModel),"grey","grey","grey","grey"],["grey",n.colorRate(n.inputViewModel),"grey","grey","grey"],["grey","grey",n.colorRate(n.inputViewModel),"grey","grey"],["grey","grey","grey",n.colorRate(n.inputViewModel),"grey"],["grey","grey","grey","grey",n.colorRate(n.inputViewModel)]][n.inputViewModel?n.inputViewModel-1:0],icon:["sentiment_very_dissatisfied","sentiment_dissatisfied","sentiment_satisfied","sentiment_satisfied_alt","sentiment_very_satisfied"]},(0,s.Nv)({_:2},[(0,s.Ko)(n.rateDefinitions,((e,l)=>({name:`tip-${l+1}`,fn:(0,s.w5)((()=>[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Uk)((0,a.zw)(e),1)])),_:2},1024)]))})))]),1032,["modelValue","color-selected"])])):(0,s.kq)("",!0)}const se={props:{modelValue:Object,question_type:Number,optionval:Array,labelval:String,questionId:Number},setup(e,{emit:l}){function t(){l("update:modelValue",{...e.modelValue,question:e.questionId})}(0,s.bv)((()=>{t()}));const a=(0,s.Fl)({get:()=>2==e.question_type?e.modelValue?parseInt(e.modelValue.value):0:e.modelValue?e.modelValue.value:"",set:t=>{if(!t)return null;l("update:modelValue",{...e.modelValue,value:t.toString()})}});function n(e){return["negative","deep-orange","positive","secondary","orange"][+e-1]}const i=["Poor","Fair","Satisfactory","Very Satisfactory","Outstanding"];return{inputViewModel:a,props:e,colorRate:n,rateDefinitions:i}}};var ae=t(4260),ne=t(4842),ie=t(8833),oe=t(8870),re=t(1504),ue=t(7518),de=t.n(ue);const ce=(0,ae.Z)(se,[["render",te]]),me=ce;de()(se,"components",{QInput:ne.Z,QRating:ie.Z,QTooltip:oe.Z,QSelect:re.Z});var ve=t(5474),pe=t(1488),ye=t.n(pe),we=(t(8603),t(4259));let ge=new Date,fe=(ye()().year(),ge);const he=async e=>await ve.api.get("tsrs/getTsrSystems/"+e).then((function(e){return e.data}));let be;const _e=async function(e,l,t,s,a,n,i,o){let r,u,d,c=200,m=0,v=(0,we.Z)();try{r=i||fe;let p={tsrNo:t,industry:s,service:a,division:n,submittedAt:r,uuid:v};if(await ve.api.post("/tsrs",p).then((e=>{u=e.data.id,d=e.data})).catch((function(e){console.log(e.response.status),e.response?(console.log(e.response.status),console.log(e.response.headers),be=e.response.status):e.request?console.log(e.request):console.log("Error",e.message)})),be)return be;for(const l of e)if(console.log("tsrsrsts",u),""!=l.question){let e={tsr:u,question:l.question,value:l.value,tsr_q_id:u+"_"+l.question,tsrNo:t},s=parseInt(e.value);s<=2&&(m=1),await ve.api.post("/answers",e)}for(const e of l){console.log("tsrsrsts",u);let l={tsr:u,question:e.question,value:e.value,tsr_q_id:u+"_"+e.question,tsrNo:t,remarks:e.remarks},s=parseInt(l.value);s<=2&&(m=1),await ve.api.post("/answers",l)}return 1==m&&await ke(d,o),c}catch(p){console.log(p)}},je=function(){return ve.api.get("/questions/withoutAns").then((function(e){return e.data}))},ke=async function(e,l){let t=e.tsrNo,s=e.uuid;return console.log("tsr",e),await ve.api.get("/tsrs/sendEmailResolution/"+t+"/"+s+"/"+l)},Ve=(e,l,t,s,a,n,i,o)=>_e(e,l,t,s,a,n,i,o),qe=(e,l,t)=>ve.api.get("/tsrs/validateSurvey/"+e+"/"+l+"/"+t).then((function(e){return e.data})),xe=e=>ve.api.get("/tsrs/countMaxDiv/"+e).then((function(e){return e.data})),ze=()=>je(),Se=e=>(e.value=e.value.toString(),ve.api.post("/ratings/",e).then((function(e){return e.data}))),Ce=e=>((0,s.dD)("data-v-4142a666"),e=e(),(0,s.Cn)(),e),Ae={class:"text-h6 inline"},Qe={class:"justify-end"},We=Ce((()=>(0,s._)("tr",null,[(0,s._)("th",null,"Questions"),(0,s._)("th",null,"Answers")],-1))),Ze={style:{"text-align":"left"}},He={style:{"text-align":"right"}};function Re(e,l,t,n,i,o){const r=(0,s.up)("q-card-section"),u=(0,s.up)("q-btn"),d=(0,s.up)("q-card-actions"),c=(0,s.up)("q-card"),m=(0,s.Q2)("close-popup");return(0,s.wg)(),(0,s.iD)("div",null,[(0,s.Uk)((0,a.zw)(e.props)+" ",1),(0,s.Wm)(c,{style:{"min-width":"500px"}},{default:(0,s.w5)((()=>[(0,s.Wm)(r,{class:"bg-primary text-white"},{default:(0,s.w5)((()=>[(0,s._)("div",Ae,[(0,s.Uk)(" TSR No. "+(0,a.zw)(e.modelValue.value.tsrNo)+" ",1),(0,s._)("div",Qe,(0,a.zw)(e.modelValue.value.publishedDate),1)])])),_:1}),(0,s.Wm)(r,{class:"q-pt-none"},{default:(0,s.w5)((()=>[(0,s._)("table",null,[We,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.headerArray,(e=>((0,s.wg)(),(0,s.iD)("tr",{key:e.field},[(0,s._)("td",Ze,(0,a.zw)(e.name),1),(0,s._)("td",He,(0,a.zw)(e.value),1)])))),128))])])),_:1}),(0,s.Wm)(d,{align:"right",class:"text-primary"},{default:(0,s.w5)((()=>[(0,s.wy)((0,s.Wm)(u,{flat:"",label:"Close"},null,512),[[m]])])),_:1})])),_:1})])}t(2100);const De=(0,s.aZ)({props:{modelValue:Object,cols:Array},setup(e){let l=e.cols.map((({align:e,sortable:l,label:t,...s})=>s));console.log("header",l);let t=(0,J.iH)([]),a=(0,J.iH)({}),n=JSON.parse(JSON.stringify(e.modelValue.value));for(var i in console.log("ANSWERRR",n),n)for(let e=0;e<l.length;e++)if(i==l[e].field){l[e].value=n[i]}return(0,s.bv)((()=>{console.log("onmounted"),console.log("cols"),console.log(l),console.log(e.modelValue.value)})),{headerArray:l,forArraySurveyDetails:t,surveyDetail:a}}});var Ne=t(151),Pe=t(5589),Fe=t(9367),Ie=t(8240),Ue=t(677);const Me=(0,ae.Z)(De,[["render",Re],["__scopeId","data-v-4142a666"]]),Ee=Me;de()(De,"components",{QCard:Ne.Z,QCardSection:Pe.Z,QCardActions:Fe.Z,QBtn:Ie.Z}),de()(De,"directives",{ClosePopup:Ue.Z});var Te=t(4334),Be=t.n(Te),Oe=t(4626);const Xe=(0,s.aZ)({name:"Survey",components:{CustomSurveyField:me,QrcodeStream:Oe.QrcodeStream},setup(){let e;console.log("QrcodeStream",Oe.QrcodeStream);const l=(0,J.iH)(!1),t=(0,J.iH)("auto"),a=(0,J.iH)(null),n=(0,J.iH)(!1),i=(0,K.Z)(),o=(0,J.iH)(null),r=(0,J.iH)([]),u=((0,J.iH)([]),(0,J.iH)(null)),d=(0,J.iH)(0),c=(0,J.iH)(null),m=(0,J.iH)(null),v=(0,J.iH)(null),p=(0,J.iH)(null),y=(0,J.iH)(null),w=(0,J.iH)(null),g=(0,J.iH)(!1),f=((0,J.iH)(null),(0,J.iH)(null)),h=(0,J.iH)("mobileNumber"),b=(0,J.iH)(1),_=(0,J.iH)("Mobile Number"),j=[{label:"Mobile Number",value:"mobileNumber"},{label:"Telephone Number",value:"telNumber"},{label:"Email",value:"email"}],k=(0,J.iH)({value:"",remarks:""});(0,s.YP)(h,((e,l)=>{let t;switch(e){case"mobileNumber":t="Mobile Number",b.value=1;break;case"telNumber":t="Telephone Number",b.value=2;break;case"email":b.value=3,t="Email";break;default:break}c.value="",_.value=t})),(0,s.YP)(m,((e,l)=>{const t=/^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/;t.test(e)&&Z(e)}));const V=(0,J.iH)(!1),q=(0,J.iH)(!1),x=(0,J.iH)([]);let z=0;const S=(0,J.iH)([]),C=(0,J.qj)({answerid:"",value:"",question:"",tsrNo:"",remarks:""}),A=(0,J.qj)({answers:[]}),Q=(0,J.qj)({answers:[]}),W=(0,J.iH)("position"),Z=async e=>{f.value=await he(e),f.value&&(p.value=f.value.indusry,v.value=f.value.service,w.value=f.value.sectionCode,y.value=f.value.division)},H=async()=>{try{r.value=await ze(),r.value=Be()(r.value,W.value),x.value=r.value.filter((e=>(e.children=r.value.filter((l=>l.parent===e.id)),null===e.parent))),console.log("questions.value.",r.value),S.value=[...new Set(r.value.map((({id:e,description:l,value:t})=>({id:e,description:l,value:t}))))],x.value.forEach((e=>{e.children.forEach((e=>{z++,r.value.forEach(((l,t)=>{e.id==l.id&&r.value.splice(t,1)}))}))})),d.value=r.value.length,E(),u.value=!1}catch(e){throw e}},R=(0,s.Fl)((()=>Be()(x.value,W.value)));function D(){i.loading.show({message:"Please wait for data to be submitted..",boxClass:"bg-grey-2 text-grey-9",spinnerColor:"primary"})}function N(){e=void 0,i.loading.hide()}function P(e){return Be()(e,W.value)}function F(){V.value=!0;for(let e=0;e<A.answers.length;e++){A.answers[e].tsrNo=m.value;for(let l=0;l<S.value.length;l++)S.value[l].id==A.answers[e].question&&(S.value[l].value=A.answers[e].value)}for(let e=0;e<z;e++){Q.answers[e].tsrNo=m.value;for(let l=0;l<S.value.length;l++)S.value[l].id==Q.answers[e].question&&(S.value[l].value=Q.answers[e].value)}}function I(){m.value="",c.value="",A.answers.forEach((e=>{e.remarks="",e.value=""})),Q.answers.forEach((e=>{e.remarks="",e.value=""})),o.value.reset()}async function U(){k.value&&await Se(k.value)}async function M(){p.value&&""!=p.value||(p.value="");let e=["ATD"],l=!0;e.forEach((async e=>{e==y.value&&(l=await xe(y.value))}));let t=await qe(c.value,m.value,b.value);if("403"==t&&i.notify({color:"red-5",textColor:"white",icon:"warning",message:"You are not authorized to submit a survey "}),"400"==t)i.notify({color:"red-5",textColor:"white",icon:"warning",message:"Duplicate TSR"});else if("403"==l)i.notify({color:"red-5",textColor:"white",icon:"warning",message:"You are not authorized to submit a survey "});else if(t&&l)if(f.value.industry&&""!=f.value.industry){D();let e=await Ve(A.answers,Q.answers,m.value,f.value.industry,f.value.service,f.value.division,"",c.value);console.log("aaaaa",e),"200"==e?(I(),N(),i.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Submitted"}),g.value=!0):"401"==e||"404"==e?(N(),i.notify({color:"red-5",textColor:"white",icon:"warning",message:"Error in submitting Form, Please check connection"})):"500"==e&&(N(),i.notify({color:"red-5",textColor:"white",icon:"warning",message:"TSR-No is Duplicate"}))}else i.notify({color:"red-5",textColor:"white",icon:"warning",message:"Industry is empty"});else i.notify({color:"red-5",textColor:"white",icon:"warning",message:"Verification error"})}function E(){for(let e=0;e<d.value;e++)A.answers.push(C);for(let e=0;e<z;e++)Q.answers.push(C)}async function T(){o.value.validate().then((e=>{if(f.value)if(Object.keys(f.value).length)if(e){let e=Q.answers.find((e=>12==e.question));e.value||""!=e.value?M():i.notify({color:"red-5",textColor:"white",icon:"warning",message:"Please answer Overall Rating Question"})}else i.notify({color:"red-5",textColor:"white",icon:"warning",message:"Please check all the fields"});else i.notify({color:"red-5",textColor:"white",icon:"warning",message:"TSR not Found"});else i.notify({color:"red-5",textColor:"white",icon:"warning",message:"Please check all the fields"})}))}async function B(e){try{await e}catch(s){console.error(s)}finally{l.value="off"===t.value}}async function O(e){if(console.log("content,",e),e){let l=e.split("|");if(l.length>0)if(/^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/.test(l[0])){switch(m.value=l[0],b.value){case 1:c.value=l[1];break;case 2:c.value=l[1];break;case 3:c.value=l[2];break;default:break}n.value=!1}else console.log("content,",l[0]),i.notify({color:"red-5",textColor:"white",icon:"warning",message:"QR invalid"})}else console.log("content, 1st else",e),/^[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}-[a-zA-Z0-9_]{0,8}$/.test(e)?(m.value=splitContent[0],n.value=!1):(console.log("content, 2nd else",e),i.notify({color:"red-5",textColor:"white",icon:"warning",message:"QR invalid"}));Y(),await $(500),X()}function X(){t.value="auto"}function Y(){t.value="off"}function $(e){return new Promise((l=>{window.setTimeout(l,e)}))}return(0,s.Jd)((()=>{void 0!==e&&(clearTimeout(e),i.loading.hide())})),(0,s.bv)((()=>{H(),E()})),{surveyRefForm:o,feedbackAfter:g,ratingApp:k,service:(0,J.iH)(null),industry:(0,J.iH)(null),comments:(0,J.iH)(null),TsrNo:m,emailCustomerValidate:c,CustomSurveyField:me,getAllQuestionsFromApi:H,submitSurvey:M,orderByPositionQuestions:R,orderByNestedSurveyQuestions:P,surveyAnswer:A,subHeaderSurveyAnswer:Q,answer:C,questions:r,onSubmit:T,prompt:V,displayQuestions:x,confirmFlag:q,viewsurveyanswer:Ee,confirmModalShow:F,cols:S,serviceData:v,industryData:p,divData:y,sectionData:w,clearFields:I,submitRateAppSurvey:U,showLoading:D,group:h,options:j,selectedLabel:_,modeValidate:b,onDecode:O,QrcodeStream:Oe.QrcodeStream,showScanConfirmation:l,camera:t,result:a,onInit:B,showQRStream:n}}});let Ye=0;setTimeout((function(){document.getElementById("legendPanel").style.visibility="hidden"}),2e3),document.addEventListener("scroll",(function(){var e=window.pageYOffset||document.documentElement.scrollTop;e>Ye?(document.getElementById("legendPanel").style.visibility="hidden",document.getElementById("legendPanel").style.opacity="0",document.getElementById("legendPanel").style.transition="visibility 0s, opacity 0.5s linear"):(document.getElementById("legendPanel").style.visibility="visible",document.getElementById("legendPanel").style.opacity="1",document.getElementById("legendPanel").style.transition="visibility 0s, opacity 0.5s linear",setTimeout((function(){document.getElementById("legendPanel").style.visibility="hidden"}),2e3)),Ye=e<=0?0:e}),!1);var $e=t(4379),Le=t(5269),Ke=t(4140),Je=t(4554),Ge=t(6778),el=t(8719),ll=t(2025);const tl=(0,ae.Z)(Xe,[["render",L],["__scopeId","data-v-ac50da98"]]),sl=tl;de()(Xe,"components",{QPage:$e.Z,QForm:Le.Z,QInput:ne.Z,QBtn:Ie.Z,QTooltip:oe.Z,QOptionGroup:Ke.Z,QIcon:Je.Z,QDialog:Ge.Z,QCard:Ne.Z,QCardSection:Pe.Z,QCardActions:Fe.Z,QSpinnerFacebook:el.Z,QRating:ie.Z,QSpace:ll.Z}),de()(Xe,"directives",{ClosePopup:Ue.Z})},6700:(e,l,t)=>{var s={"./af":5809,"./af.js":5809,"./ar":6069,"./ar-dz":481,"./ar-dz.js":481,"./ar-kw":3994,"./ar-kw.js":3994,"./ar-ly":3312,"./ar-ly.js":3312,"./ar-ma":239,"./ar-ma.js":239,"./ar-sa":1863,"./ar-sa.js":1863,"./ar-tn":9607,"./ar-tn.js":9607,"./ar.js":6069,"./az":9281,"./az.js":9281,"./be":9945,"./be.js":9945,"./bg":9384,"./bg.js":9384,"./bm":1476,"./bm.js":1476,"./bn":3345,"./bn-bd":216,"./bn-bd.js":216,"./bn.js":3345,"./bo":1713,"./bo.js":1713,"./br":9655,"./br.js":9655,"./bs":7296,"./bs.js":7296,"./ca":3049,"./ca.js":3049,"./cs":8393,"./cs.js":8393,"./cv":8039,"./cv.js":8039,"./cy":5563,"./cy.js":5563,"./da":1960,"./da.js":1960,"./de":7533,"./de-at":6674,"./de-at.js":6674,"./de-ch":7732,"./de-ch.js":7732,"./de.js":7533,"./dv":8343,"./dv.js":8343,"./el":7004,"./el.js":7004,"./en-au":2517,"./en-au.js":2517,"./en-ca":4929,"./en-ca.js":4929,"./en-gb":9722,"./en-gb.js":9722,"./en-ie":6923,"./en-ie.js":6923,"./en-il":8050,"./en-il.js":8050,"./en-in":9624,"./en-in.js":9624,"./en-nz":540,"./en-nz.js":540,"./en-sg":4375,"./en-sg.js":4375,"./eo":40,"./eo.js":40,"./es":9720,"./es-do":5595,"./es-do.js":5595,"./es-mx":180,"./es-mx.js":180,"./es-us":1563,"./es-us.js":1563,"./es.js":9720,"./et":9217,"./et.js":9217,"./eu":9474,"./eu.js":9474,"./fa":5243,"./fa.js":5243,"./fi":7645,"./fi.js":7645,"./fil":5350,"./fil.js":5350,"./fo":5622,"./fo.js":5622,"./fr":1467,"./fr-ca":3439,"./fr-ca.js":3439,"./fr-ch":4335,"./fr-ch.js":4335,"./fr.js":1467,"./fy":6026,"./fy.js":6026,"./ga":2969,"./ga.js":2969,"./gd":1347,"./gd.js":1347,"./gl":1085,"./gl.js":1085,"./gom-deva":904,"./gom-deva.js":904,"./gom-latn":9597,"./gom-latn.js":9597,"./gu":8705,"./gu.js":8705,"./he":9128,"./he.js":9128,"./hi":2821,"./hi.js":2821,"./hr":9002,"./hr.js":9002,"./hu":4814,"./hu.js":4814,"./hy-am":658,"./hy-am.js":658,"./id":9344,"./id.js":9344,"./is":8204,"./is.js":8204,"./it":376,"./it-ch":1549,"./it-ch.js":1549,"./it.js":376,"./ja":9293,"./ja.js":9293,"./jv":6401,"./jv.js":6401,"./ka":482,"./ka.js":482,"./kk":7329,"./kk.js":7329,"./km":4241,"./km.js":4241,"./kn":3566,"./kn.js":3566,"./ko":2742,"./ko.js":2742,"./ku":2915,"./ku.js":2915,"./ky":6846,"./ky.js":6846,"./lb":4959,"./lb.js":4959,"./lo":2188,"./lo.js":2188,"./lt":8967,"./lt.js":8967,"./lv":1245,"./lv.js":1245,"./me":751,"./me.js":751,"./mi":7501,"./mi.js":7501,"./mk":1643,"./mk.js":1643,"./ml":5597,"./ml.js":5597,"./mn":7612,"./mn.js":7612,"./mr":9065,"./mr.js":9065,"./ms":4703,"./ms-my":4645,"./ms-my.js":4645,"./ms.js":4703,"./mt":4365,"./mt.js":4365,"./my":3788,"./my.js":3788,"./nb":7357,"./nb.js":7357,"./ne":9109,"./ne.js":9109,"./nl":3746,"./nl-be":1985,"./nl-be.js":1985,"./nl.js":3746,"./nn":7175,"./nn.js":7175,"./oc-lnc":566,"./oc-lnc.js":566,"./pa-in":2733,"./pa-in.js":2733,"./pl":182,"./pl.js":182,"./pt":505,"./pt-br":7839,"./pt-br.js":7839,"./pt.js":505,"./ro":9578,"./ro.js":9578,"./ru":2328,"./ru.js":2328,"./sd":641,"./sd.js":641,"./se":1758,"./se.js":1758,"./si":6680,"./si.js":6680,"./sk":5016,"./sk.js":5016,"./sl":7424,"./sl.js":7424,"./sq":8635,"./sq.js":8635,"./sr":9038,"./sr-cyrl":3716,"./sr-cyrl.js":3716,"./sr.js":9038,"./ss":4771,"./ss.js":4771,"./sv":3517,"./sv.js":3517,"./sw":9419,"./sw.js":9419,"./ta":5959,"./ta.js":5959,"./te":1739,"./te.js":1739,"./tet":2264,"./tet.js":2264,"./tg":4792,"./tg.js":4792,"./th":8328,"./th.js":8328,"./tk":702,"./tk.js":702,"./tl-ph":7814,"./tl-ph.js":7814,"./tlh":797,"./tlh.js":797,"./tr":6691,"./tr.js":6691,"./tzl":6891,"./tzl.js":6891,"./tzm":6362,"./tzm-latn":7855,"./tzm-latn.js":7855,"./tzm.js":6362,"./ug-cn":7606,"./ug-cn.js":7606,"./uk":513,"./uk.js":513,"./ur":3803,"./ur.js":3803,"./uz":344,"./uz-latn":8957,"./uz-latn.js":8957,"./uz.js":344,"./vi":3,"./vi.js":3,"./x-pseudo":8842,"./x-pseudo.js":8842,"./yo":2083,"./yo.js":2083,"./zh-cn":4536,"./zh-cn.js":4536,"./zh-hk":2475,"./zh-hk.js":2475,"./zh-mo":1515,"./zh-mo.js":1515,"./zh-tw":4746,"./zh-tw.js":4746};function a(e){var l=n(e);return t(l)}function n(e){if(!t.o(s,e)){var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}return s[e]}a.keys=function(){return Object.keys(s)},a.resolve=n,e.exports=a,a.id=6700}}]);