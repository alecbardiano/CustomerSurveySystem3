"use strict";(self["webpackChunkcustomersurveysystem3"]=self["webpackChunkcustomersurveysystem3"]||[]).push([[708],{76708:(e,a,t)=>{t.r(a),t.d(a,{default:()=>Ee});var l=t(83673),o=t(62323);const r={class:"q-pa-md"},i={class:"row"},u={class:"col-3"},n={class:"col-6"},s={key:1,class:"row"},d={class:"col-3"},c={class:"col-6"},v={key:2,class:"row"},m={class:"row inline"},p={class:"row items-center justify-end"},h={class:"row items-center justify-end"},w={class:"q-pa-md"},g={class:"layout-padding"},f={class:"flex wrap gutter"},b={class:"width-1of3 sm-auto"},y={class:"width-1of3 sm-auto"},D={class:"width-1of3 sm-auto"},k={class:"q-pa-md"},C={class:"layout-padding"},_={class:"flex wrap gutter"},S={class:"q-pa-md row items-start q-gutter-md"},P={class:"q-pa-md row items-start q-gutter-md"},W={class:"q-pa-md"},x={class:"q-pa-md"},H=(0,l.Uk)("Total:"),q={key:0},F={class:"q-pa-md"},A=(0,l.Uk)(" Total Actual Respondents "),V=(0,l.Uk)(" Total Actual No. of Customers Served "),T=(0,l.Uk)(" Target No. of Respondents "),R=(0,l.Uk)(" Percentage "),N={key:0},O={key:1},M={key:2},E={class:"text-h5 inline"},Y=(0,l._)("span",null,null,-1),U={class:"fixed-right"},z=(0,l.Uk)("Minimize"),Q=(0,l.Uk)("Maximize"),Z=(0,l.Uk)("Close");function j(e,a,t,j,B,L){const K=(0,l.up)("q-select"),J=(0,l.up)("q-btn"),X=(0,l.up)("q-date"),I=(0,l.up)("q-popup-proxy"),G=(0,l.up)("q-icon"),$=(0,l.up)("q-input"),ee=(0,l.up)("q-form"),ae=(0,l.up)("card-dashboard-feedback-count"),te=(0,l.up)("doughnut-chart"),le=(0,l.up)("q-card-section"),oe=(0,l.up)("q-card"),re=(0,l.up)("bar-chart"),ie=(0,l.up)("line-chart"),ue=(0,l.up)("q-th"),ne=(0,l.up)("q-tr"),se=(0,l.up)("q-td"),de=(0,l.up)("q-table"),ce=(0,l.up)("q-tooltip"),ve=(0,l.up)("q-dialog"),me=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",r,[(0,l._)("div",i,[(0,l._)("div",u,[(0,l.Wm)(K,{outlined:"",modelValue:j.modeDashboard,"onUpdate:modelValue":a[0]||(a[0]=e=>j.modeDashboard=e),style:{"max-width":"200px"},options:j.modeOptions,width:"30px",label:"Mode"},null,8,["modelValue","options"])]),(0,l._)("div",n,["Annual"==j.modeDashboard?((0,l.wg)(),(0,l.j4)(K,{key:0,outlined:"",modelValue:j.yearTsr,"onUpdate:modelValue":a[1]||(a[1]=e=>j.yearTsr=e),style:{"max-width":"200px"},"option-label":"text",options:j.yearOptions,width:"30px",label:"Year"},null,8,["modelValue","options"])):(0,l.kq)("",!0),"Quarterly"==j.modeDashboard?((0,l.wg)(),(0,l.iD)("div",s,[(0,l._)("div",d,[(0,l.Wm)(K,{outlined:"",modelValue:j.yearTsrQuarter,"onUpdate:modelValue":a[2]||(a[2]=e=>j.yearTsrQuarter=e),style:{"max-width":"200px"},"option-label":"text",options:j.yearOptions,width:"30px",label:"Year"},null,8,["modelValue","options"])]),(0,l._)("div",c,[(0,l.Wm)(K,{outlined:"",modelValue:j.quarterTSR,"onUpdate:modelValue":a[3]||(a[3]=e=>j.quarterTSR=e),"option-value":"value",style:{"max-width":"200px"},options:j.quarterOptions,width:"30px",label:"Quarter"},null,8,["modelValue","options"])])])):(0,l.kq)("",!0),"Date Range"==j.modeDashboard?((0,l.wg)(),(0,l.iD)("div",v,[(0,l.Wm)(ee,{ref:"dateform",onSubmit:a[8]||(a[8]=e=>j.submitDate())},{default:(0,l.w5)((()=>[(0,l._)("div",m,[(0,l.Wm)($,{outlined:"",filled:"",mask:"date",modelValue:j.beforeDate,"onUpdate:modelValue":a[5]||(a[5]=e=>j.beforeDate=e),"lazy-rules":"",rules:[e=>e<=j.afterDate||"Field should be earlier than after date"],placeholder:"mm/dd/yy",hint:"Start Date"},{append:(0,l.w5)((()=>[(0,l.Wm)(G,{name:"event",class:"cursor-pointer"},{default:(0,l.w5)((()=>[(0,l.Wm)(I,{ref:"qDateProxy","transition-show":"scale","transition-hide":"scale"},{default:(0,l.w5)((()=>[(0,l.Wm)(X,{modelValue:j.beforeDate,"onUpdate:modelValue":a[4]||(a[4]=e=>j.beforeDate=e)},{default:(0,l.w5)((()=>[(0,l._)("div",p,[(0,l.wy)((0,l.Wm)(J,{label:"Close",color:"primary",flat:""},null,512),[[me]])])])),_:1},8,["modelValue"])])),_:1},512)])),_:1})])),_:1},8,["modelValue","rules"]),(0,l.Wm)($,{outlined:"",filled:"",mask:"date",style:{"padding-left":"25px"},modelValue:j.afterDate,"onUpdate:modelValue":a[7]||(a[7]=e=>j.afterDate=e),"lazy-rules":"",rules:[e=>e>=j.beforeDate||"Field should be later than before date"],placeholder:"mm/dd/yy",hint:"End Date"},{append:(0,l.w5)((()=>[(0,l.Wm)(G,{name:"event",class:"cursor-pointer"},{default:(0,l.w5)((()=>[(0,l.Wm)(I,{ref:"qDateProxy","transition-show":"scale","transition-hide":"scale"},{default:(0,l.w5)((()=>[(0,l.Wm)(X,{modelValue:j.afterDate,"onUpdate:modelValue":a[6]||(a[6]=e=>j.afterDate=e)},{default:(0,l.w5)((()=>[(0,l._)("div",h,[(0,l.wy)((0,l.Wm)(J,{label:"Close",color:"primary",flat:""},null,512),[[me]])])])),_:1},8,["modelValue"])])),_:1},512)])),_:1})])),_:1},8,["modelValue","rules"]),(0,l.Wm)(J,{type:"submit",label:"Go",color:"primary",style:{"margin-left":"25px",width:"70px",height:"25px"}})])])),_:1},512)])):(0,l.kq)("",!0)])])]),(0,l._)("div",w,[(0,l._)("div",g,[(0,l._)("div",f,[(0,l._)("div",b,[(0,l.Wm)(ae,{title:"Total TSRs",backgroundColor:"green","icon-name":"local_post_office",total:j.totalTsrs},null,8,["total"])]),(0,l._)("div",y,[(0,l.Wm)(ae,{onClick:a[9]||(a[9]=e=>j.callCardData(1)),title:"Negative Feedback",backgroundColor:"red",total:j.totalNegative},null,8,["total"])]),(0,l._)("div",D,[(0,l.Wm)(ae,{onClick:a[10]||(a[10]=e=>j.callCardData(2)),title:"Positive Feedback",backgroundColor:"blue",total:j.totalPositive},null,8,["total"])])])])]),(0,l._)("div",k,[(0,l._)("div",C,[(0,l._)("div",_,[(0,l._)("div",S,[(0,l.Wm)(oe,{class:"my-card"},{default:(0,l.w5)((()=>[(0,l.Wm)(le,null,{default:(0,l.w5)((()=>[(0,l.Wm)(te,{labels:j.chartDataModelLabel,label:"Overall Performance of the Center Based on CSS Responses",chartData:j.chartDataModelData},null,8,["labels","chartData"])])),_:1})])),_:1})]),(0,l._)("div",P,[(0,l.Wm)(oe,{class:"my-card"},{default:(0,l.w5)((()=>[(0,l.Wm)(le,null,{default:(0,l.w5)((()=>[(0,l.Wm)(re,{labels:j.chartDataModelCustomersLabel,label:"Total Number of CSM Respondents Per Month",chartData:j.chartDataModelCustomersData},null,8,["labels","chartData"])])),_:1})])),_:1})])])])]),(0,l._)("div",W,[(0,l.Wm)(oe,null,{default:(0,l.w5)((()=>[(0,l.Wm)(ie,{labelkeys:j.lineChartLabel,labels:j.chartDataModelCustomersLabel,label:"Number of Customers and CSM Respondents Per Service Area",chartData:j.chartDataModelNumberPerServiceArea},null,8,["labelkeys","labels","chartData"])])),_:1})]),(0,l._)("div",x,[(0,l.Wm)(de,{rows:j.rowsOverallPerformance,class:"my-sticky-header-table",columns:j.colsOverallPerformance,"row-key":"col1",separator:"cell",title:"Overall Performance of the Center Based on CSS Responses",style:{height:"500px"},"rows-per-page-options":[0]},{header:(0,l.w5)((()=>[(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[(0,l.Wm)(ue,{key:"serviceArea",style:{width:"250px"},class:"bg-light-blue-9 black-white"}),(0,l.Wm)(ue,{key:"percentage",style:{width:"100px"},class:"bg-light-blue-9 black-white"}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.divisions,(e=>((0,l.wg)(),(0,l.j4)(ue,{key:e.name,colspan:e.count},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.division),1)])),_:2},1032,["colspan"])))),128))])),_:1}),(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.colsOverallPerformance,(e=>((0,l.wg)(),(0,l.j4)(ue,{key:e.name,class:"bg-light-blue-9 black-white"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.name),1)])),_:2},1024)))),128))])),_:1})])),"bottom-row":(0,l.w5)((()=>[(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[H])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.totalPerField,(e=>((0,l.wg)(),(0,l.j4)(se,{style:{"text-align":"center"},key:e.key},{default:(0,l.w5)((()=>[0!=e.value?((0,l.wg)(),(0,l.iD)("p",q,(0,o.zw)(e.value),1)):(0,l.kq)("",!0)])),_:2},1024)))),128))])),_:1})])),_:1},8,["rows","columns"])]),(0,l._)("div",F,[(0,l.Wm)(de,{rows:j.rowsnumberOfCustomers,columns:j.colsnumberOfCustomers,class:"my-sticky-header-table","row-key":"col1",title:"Number of Customers and CSM Respondents Per Service Area",separator:"cell","rows-per-page-options":[0]},{header:(0,l.w5)((()=>[(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[(0,l.Wm)(ue,{key:"Month",style:{width:"250px"},class:"primary"}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.divisions,(e=>((0,l.wg)(),(0,l.j4)(ue,{key:e.name,colspan:e.count},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.division),1)])),_:2},1032,["colspan"])))),128)),(0,l.Wm)(ue,{key:"Total",style:{width:"250px"},class:"primary"})])),_:1}),(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.colsnumberOfCustomers,(e=>((0,l.wg)(),(0,l.j4)(ue,{key:e.name,class:"bg-light-blue-9 black-white"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.name),1)])),_:2},1024)))),128))])),_:1})])),"bottom-row":(0,l.w5)((()=>[(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[A])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.totalActualRespondents,(e=>((0,l.wg)(),(0,l.j4)(se,{style:{"text-align":"center"},key:e.key},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.value),1)])),_:2},1024)))),128))])),_:1}),(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[V])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.divisionsAndSections.length,((e,a)=>((0,l.wg)(),(0,l.j4)(se,{style:{"text-align":"center"},key:e.key},{default:(0,l.w5)((()=>[(0,l.Wm)($,{filled:"",modelValue:j.totalActualArray[a],"onUpdate:modelValue":e=>j.totalActualArray[a]=e,modelModifiers:{number:!0},label:"Actual No. Of Customers Served"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)))),128)),(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(j.totalActualArray.reduce(((e,a)=>e+a),0)),1)])),_:1})])),_:1}),(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[T])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.divisionsAndSections.length,((e,a)=>((0,l.wg)(),(0,l.j4)(se,{style:{"text-align":"center"},key:e.key},{default:(0,l.w5)((()=>[(0,l.Wm)($,{filled:"",modelValue:j.targetNoRespondents[a],"onUpdate:modelValue":e=>j.targetNoRespondents[a]=e,modelModifiers:{number:!0},label:"Target"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)))),128)),(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(j.targetNoRespondents.reduce(((e,a)=>e+a),0)),1)])),_:1})])),_:1}),(0,l.Wm)(ne,null,{default:(0,l.w5)((()=>[(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[R])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.totalActualRespondents,((e,a)=>((0,l.wg)(),(0,l.j4)(se,{style:{"text-align":"center"},key:e.key},{default:(0,l.w5)((()=>[j.targetNoRespondents[a]?((0,l.wg)(),(0,l.iD)("div",N,(0,o.zw)((e.value/j.targetNoRespondents[a]*100).toFixed(2).toString()+"%"),1)):a===j.totalActualRespondents.length-1?((0,l.wg)(),(0,l.iD)("div",O,(0,o.zw)(j.computedTotalPercentage),1)):((0,l.wg)(),(0,l.iD)("div",M," 0% "))])),_:2},1024)))),128))])),_:1})])),_:1},8,["rows","columns"]),(0,l.Wm)(ve,{modelValue:j.cardModal,"onUpdate:modelValue":a[15]||(a[15]=e=>j.cardModal=e),maximized:j.maximizedToggle,"transition-show":"slide-up","transition-hide":"slide-down"},{default:(0,l.w5)((()=>[(0,l.Wm)(oe,null,{default:(0,l.w5)((()=>[(0,l.Wm)(le,{class:"bg-primary text-white"},{default:(0,l.w5)((()=>[(0,l._)("div",E,[Y,(0,l._)("div",U,[(0,l.Wm)(J,{dense:"",flat:"",icon:"minimize",onClick:a[11]||(a[11]=e=>j.maximizedToggle=!1),disable:!j.maximizedToggle},{default:(0,l.w5)((()=>[j.maximizedToggle?((0,l.wg)(),(0,l.j4)(ce,{key:0,class:"bg-white text-primary"},{default:(0,l.w5)((()=>[z])),_:1})):(0,l.kq)("",!0)])),_:1},8,["disable"]),(0,l.Wm)(J,{dense:"",flat:"",icon:"crop_square",onClick:a[12]||(a[12]=e=>j.maximizedToggle=!0),disable:j.maximizedToggle},{default:(0,l.w5)((()=>[j.maximizedToggle?(0,l.kq)("",!0):((0,l.wg)(),(0,l.j4)(ce,{key:0,class:"bg-white text-primary"},{default:(0,l.w5)((()=>[Q])),_:1}))])),_:1},8,["disable"]),(0,l.wy)((0,l.Wm)(J,{dense:"",flat:"",icon:"close"},{default:(0,l.w5)((()=>[(0,l.Wm)(ce,{class:"bg-white text-primary"},{default:(0,l.w5)((()=>[Z])),_:1})])),_:1},512),[[me]])])])])),_:1}),(0,l.Wm)(le,{class:"row items-left"},{default:(0,l.w5)((()=>[j.cardData?((0,l.wg)(),(0,l.j4)(de,{key:0,class:"my-sticky-header-table",title:j.cardTitle,rows:j.rows,columns:j.cardDataCols,filter:j.filter,pagination:j.pagination,"onUpdate:pagination":a[14]||(a[14]=e=>j.pagination=e),onRequest:j.onRequestCard,"binary-state-sort":"",separator:"cell"},{"top-right":(0,l.w5)((()=>[(0,l.Wm)($,{class:"placeholderClass",borderless:"",dense:"",debounce:"300",modelValue:j.filter,"onUpdate:modelValue":a[13]||(a[13]=e=>j.filter=e),placeholder:"Search"},{append:(0,l.w5)((()=>[(0,l.Wm)(G,{class:"searchClass",name:"search"})])),_:1},8,["modelValue"])])),_:1},8,["title","rows","columns","filter","pagination","onRequest"])):(0,l.kq)("",!0)])),_:1})])),_:1})])),_:1},8,["modelValue","maximized"])])],64)}t(10071);var B=t(61959),L=t(26873);const K=e=>((0,l.dD)("data-v-2f5fe920"),e=e(),(0,l.Cn)(),e),J={class:"q-pa-md row items-start q-gutter-md showhim"},X={class:"text-h6"},I={align:"center"},G={class:"ok"},$={class:"fontsizeCard"},ee=K((()=>(0,l._)("div",{class:"showme"},null,-1)));function ae(e,a,t,r,i,u){const n=(0,l.up)("q-card-section"),s=(0,l.up)("q-card");return(0,l.wg)(),(0,l.iD)("div",J,[(0,l.Wm)(s,{class:"customCard"},{default:(0,l.w5)((()=>[(0,l.Wm)(n,{class:"bg-primary text-white"},{default:(0,l.w5)((()=>[(0,l._)("div",X,(0,o.zw)(e.title),1)])),_:1}),(0,l._)("div",I,[(0,l.Wm)(n,null,{default:(0,l.w5)((()=>[(0,l._)("div",G,[(0,l._)("p",$,(0,o.zw)(e.total),1)]),ee])),_:1})])])),_:1})])}const te=(0,l.aZ)({props:["title","total","backgroundColor","iconName","tsrFeedbackData","modalFlag"],name:"CardDashboardFeedbackView",setup(e){const a=(0,B.iH)(!1),t=(0,B.iH)(!0);function l(){}return{props:e,modal:a,maximizedToggle:t,showModal:l}}});var le=t(10151),oe=t(25589),re=t(7518),ie=t.n(re);te.render=ae,te.__scopeId="data-v-2f5fe920";const ue=te;ie()(te,"components",{QCard:le.Z,QCardSection:oe.Z});t(93422);var ne=t(43653),se=(t(88603),t(11488)),de=t.n(se),ce=(t(12841),t(48825));function ve(e,a,t,o,r,i){const u=(0,l.up)("DoughnutChart",!0);return(0,l.wg)(),(0,l.iD)("div",null,[e.isDataLoaded?((0,l.wg)(),(0,l.j4)(u,{key:0,ref:"doughnutRef","chart-data":e.dataFromParent,options:e.options},null,8,["chart-data","options"])):(0,l.kq)("",!0)])}var me=t(58867),pe=t(69319);ne.Chart.register(ne.DoughnutController,ne.ArcElement),ne.Chart.register(pe.Z);const he=(0,l.aZ)({name:"DoughnutChartView",components:{DoughnutChart:me.DoughnutChart},props:{labels:{type:Array},chartData:{type:Array},label:{type:String}},setup(e){const a=(0,B.iH)(null),t=(0,B.Fl)((()=>({labels:e.labels,datasets:[{data:e.chartData,label:e.label,backgroundColor:["green","#DFFF00","#CCCC00","orange","red","#97B0C4"]}]}))),o=(0,B.Fl)((()=>e.chartData&&0!==e.chartData.length)),r=(0,B.iH)({plugins:{datalabels:{formatter:(a,t)=>{e.chartData;let l=a.toFixed(2)+"%";return l},color:"black"},legend:{position:"bottom"},title:{display:!0,text:e.label}}});return(0,l.YP)(e.chartData,((e,a)=>{})),(0,l.bv)((async()=>{})),{dataFromParent:t,options:r,props:e,doughnutRef:a,isDataLoaded:o}}});he.render=ve;const we=he;function ge(e,a,t,o,r,i){const u=(0,l.up)("BarChart",!0);return(0,l.wg)(),(0,l.j4)(u,{ref:"barRef","chart-data":e.data,options:e.options},null,8,["chart-data","options"])}ne.Chart.register(ne.BarController,ne.CategoryScale,ne.LinearScale,ne.BarElement);const fe=(0,l.aZ)({name:"BarChartView",components:{BarChart:me.BarChart},props:{labels:{type:Array},chartData:{type:Array},label:{type:String}},setup(e){const a=(0,B.iH)(null),t=((0,B.iH)([]),["#29A0B1","red","yellow","purple","orange","light blue","brown","#ECB390","pink","dark green","gray","green"]),l=(0,B.Fl)((()=>({labels:e.labels,datasets:[{label:"Month",data:e.chartData,backgroundColor:t[0]}]}))),o=(0,B.iH)({plugins:{datalabels:{color:"black"},legend:{position:"bottom",display:!1},title:{display:!0,text:e.label},responsive:!0,maintainAspectRatio:!1}});return{data:l,options:o,props:e,barRef:a}}});fe.render=ge;const be=fe;function ye(e,a,t,o,r,i){const u=(0,l.up)("LineChart",!0);return(0,l.wg)(),(0,l.j4)(u,{ref:"lineRef","chart-data":e.data,options:e.options},null,8,["chart-data","options"])}ne.Chart.register(ne.LineController,ne.CategoryScale,ne.LinearScale,ne.LineElement);const De=(0,l.aZ)({name:"LineChartView",components:{LineChart:me.LineChart},props:{labels:{type:Array},chartData:{type:Array},label:{type:String},labelkeys:{type:Array}},setup(e){const a=(0,B.iH)(null),t=(0,B.Fl)((()=>{let a=[];for(let t=0;t<e.chartData.length;t++){let o={label:e.labelkeys[t],data:e.chartData[t],borderColor:l[t]};a.push(o)}return a})),l=["blue","red","yellow","purple","orange","light blue","brown","#ECB390","pink","dark green","gray","green","red-orange"],o=(0,B.Fl)((()=>{let a={};return a["labels"]=e.labels,a["datasets"]=t.value,a})),r=(0,B.iH)({plugins:{datalabels:{color:"white"},legend:{position:"bottom",display:!0},title:{display:!0,text:e.label},responsive:!0,maintainAspectRatio:!1}});return{dataSetVal:t,data:o,options:r,props:e,lineRef:a}}});De.render=ye;const ke=De;ne.Chart.register(...ne.registerables);const Ce={name:"Dashboard",components:{CardDashboardFeedbackCount:ue,DoughnutChart:we,BarChart:be,LineChart:ke},setup(){const e=(0,B.Fl)((()=>{let e=s.value.reduce(((e,a)=>e+a),0);return e<=0?"0%":(U.value[U.value.length-1].value/e*100).toFixed(2).toString()+"%"})),a=(0,B.iH)(0),t=(0,B.iH)(0),o=(0,B.iH)(0),r=(0,B.iH)(0),i=(0,B.iH)([]),u=(0,B.iH)([]),n=(0,B.iH)(0),s=(0,B.iH)([]),d=(0,B.iH)([]),c=(0,B.iH)(null),v=(0,B.iH)((new Date).getFullYear()),m=(0,ce.Z)(),p=(0,B.iH)({sortBy:"desc",descending:!1,page:1,rowsPerPage:10,rowsNumber:5,mode:0}),h=(0,B.iH)("Annual");(0,l.YP)(h,((e,a)=>{N.value=null,O.value=null,M.value=null,w.value=null,g.value=null}));const w=(0,B.iH)(null),g=(0,B.iH)(null),f=(0,B.iH)([]),b=(0,B.iH)([]),y=(0,B.iH)([]),D=(0,B.iH)([]),k=(0,B.iH)([]),C=(0,B.iH)([]),_=(0,B.iH)([]),S=(0,B.iH)([]),P=(0,B.iH)("");let W=(0,B.iH)([]);const x=(0,B.iH)(null),H=(0,B.iH)([]),q=(0,B.iH)([]),F=(0,B.iH)([]),A=(0,B.iH)([]),V=(0,B.iH)([]),T=(0,B.iH)([]),R=(0,B.iH)([]),N=(0,B.iH)(),O=(0,B.iH)(),M=(0,B.iH)(),E=(0,B.iH)([]),Y=(0,B.iH)([]),U=(0,B.iH)([]),z=(0,B.iH)(!1);let Q;const Z=(0,B.iH)(!0),j=(0,B.iH)(!1),K=(0,B.Fl)((()=>{let e=2e3,a=[],t=v.value;while(t>=e)a.push(t),t-=1;return a})),J=[1,2,3,4],X=(0,B.iH)(["Annual","Quarterly","Date Range"]);function I(){m.loading.show({message:"Please wait for data to be loaded..",boxClass:"bg-grey-2 text-grey-9",spinnerColor:"primary"})}async function G(){let e=[],a=[],t=[];(f.value.length>0||b.value.length>0||C.value.length>0)&&(f.value=[],b.value=[],C.value=[]),A.value.forEach((a=>{f.value.push(a.servicearea),e.push(a.countOverall)}));let l=[];V.value.forEach((e=>{0==l.length&&(l=Object.keys(e)),b.value.push(e.month),a.push(e.total)})),"Date Range"==h.value?(l.pop(),l.pop(),l.pop()):(l.shift(),l.shift(),l.shift()),l.forEach((e=>{let a=V.value.map((a=>a[e]));t.push(a),C.value.push(e)})),y.value=e,D.value=a,k.value=t}async function $(e){r.value=e?await(0,L.bO)(e):await(0,L.bO)(""),a.value=await(0,L.lX)(e),t.value=await(0,L.wi)(e),o.value=await(0,L.jW)(e)}async function ee(e,l){r.value=await(0,L.d$)(e,l,""),a.value=await(0,L.pm)("","",e,l),t.value=await(0,L.kD)("","",e,l)}async function ae(){A.value=[],V.value=[],U.value=[],u.value=[],Y.value=[];let e=0;if(oe(),le(),i.value=[],N.value){let a=new Date(N.value,0,1),t=new Date(N.value,11,31),l=await(0,L.Dv)(a,t);V.value.forEach((e=>{let a=0;l.forEach((t=>{let l=t.monthYear.toString().split("-")[1];e.id==l&&(e[t.keyDiv]=t.countDiv,a+=t.countDiv)})),e.total=a}));let o=await(0,L.o6)(a,t),r=await(0,L.Fp)(a,t);A.value.forEach((a=>{o.forEach((e=>{a.id==e.value.toString()&&(a[e.keyDiv]=e.resultPercent.toString()+"%")})),r.forEach((t=>{a.id==t.value2.toString()&&(e+=t.resultPercent,a["percentage"]=t.resultPercent.toString()+"%",a["countOverall"]=parseFloat(t.resultPercent))}))}))}else if(O.value){let a,t;switch(O.value){case 1:t=new Date(M.value,0,1),a=new Date(M.value,2,31);break;case 2:t=new Date(M.value,3,1),a=new Date(M.value,5,30);break;case 3:t=new Date(M.value,6,1),a=new Date(M.value,8,30);break;case 4:t=new Date(M.value,9,1),a=new Date(M.value,11,31);break;default:}let l=await(0,L.Dv)(t,a);V.value.forEach((e=>{let a=0;l.forEach((t=>{let l=t.monthYear.toString().split("-")[1];e.id==l&&(e[t.keyDiv]=t.countDiv,a+=t.countDiv)})),e.total=a}));let o=await(0,L.o6)(t,a),r=await(0,L.Fp)(t,a);A.value.forEach((a=>{o.forEach((e=>{a.id==e.value.toString()&&(a[e.keyDiv]=e.resultPercent.toString()+"%")})),r.forEach((t=>{a.id==t.value2.toString()&&(e+=t.resultPercent,a["percentage"]=t.resultPercent.toString()+"%",a["countOverall"]=parseFloat(t.resultPercent))}))}))}else if(w.value&&g.value){let a=await(0,L.Dv)(w.value,g.value);V.value.forEach((e=>{let t=0;a.forEach((a=>{let l=a.monthYear.toString().split("-")[1];e.id==l&&(e[a.keyDiv]=a.countDiv,t+=a.countDiv)})),e.total=t}));let t=await(0,L.o6)(w.value,g.value),l=await(0,L.Fp)(w.value,g.value);A.value.forEach((a=>{t.forEach((e=>{a.id==e.value.toString()&&(a[e.keyDiv]=e.resultPercent.toString()+"%")})),l.forEach((t=>{a.id==t.value2.toString()&&(e+=t.resultPercent,a["percentage"]=t.resultPercent.toString()+"%",a["countOverall"]=parseFloat(t.resultPercent))}))}))}else{let a=await(0,L.Dv)("","");V.value.forEach((e=>{let t=0;a.forEach((a=>{let l=a.monthYear.toString().split("-")[1];e.id==l&&(e[a.keyDiv]=a.countDiv,t+=a.countDiv)})),e.total=t}));let t=await(0,L.o6)("",""),l=await(0,L.Fp)("","");A.value.forEach((a=>{t.forEach((e=>{a.id==e.value.toString()&&(a[e.keyDiv]=e.resultPercent.toString()+"%")})),l.forEach((t=>{a.id==t.value2.toString()&&(e+=t.resultPercent,a["percentage"]=t.resultPercent.toString()+"%",a["countOverall"]=parseFloat(t.resultPercent))}))}))}let a=0;q.value.forEach((e=>{let t=e.keyname,l=V.value.map((e=>(isNaN(e[t])&&(e[t]=0),e[t]))),o=l.reduce(((e,a)=>e+a),0),r={value:0};s.value.push(0),d.value.push(0),r["value"]=o,a+=o,U.value.push(r)}));let t={};t["value"]=a,U.value.push(t);let l={};l["value"]=e.toFixed(2).toString()+"%",Y.value.push(l),q.value.forEach((e=>{let a={},t=e.keyname,l=A.value.map((e=>e[t])),o=l.reduce(((e,a)=>parseFloat(e)+parseFloat(a)),0);o=Math.round(o),a["value"]=o.toFixed(2).toString()+"%",Y.value.push(a)})),Q=void 0,m.loading.hide(),G()}function te(){re(),le(),n.value=r.value-u.value.length}function le(){A.value.push({servicearea:"5 - Outstanding",id:5,countOverall:0}),A.value.push({servicearea:"4 - Very Satisfactory",id:4,countOverall:0}),A.value.push({servicearea:"3 - Satisfactory",id:3,countOverall:0}),A.value.push({servicearea:"2 - Fair",id:2,countOverall:0}),A.value.push({servicearea:"1 - Poor",id:1,countOverall:0}),A.value.forEach((e=>{q.value.forEach((a=>{let t=a.keyname;e[t]="0%",e["percentage"]="0%"}))}))}async function oe(){V.value.push({month:"January",id:1,total:0}),V.value.push({month:"February",id:2,total:0}),V.value.push({month:"March",id:3,total:0}),V.value.push({month:"April",id:4,total:0}),V.value.push({month:"May",id:5,total:0}),V.value.push({month:"June",id:6,total:0}),V.value.push({month:"July",id:7,total:0}),V.value.push({month:"August",id:8,total:0}),V.value.push({month:"September",id:9,total:0}),V.value.push({month:"October",id:10,total:0}),V.value.push({month:"November",id:11,total:0}),V.value.push({month:"December",id:12,total:0})}async function re(){T.value.push({name:"Service Area",align:"left",label:"Service Area/Rating",field:"servicearea",sortable:!0}),T.value.push({name:"Percentage (Overall)",align:"center",label:"Percentage",field:"percentage",sortable:!0}),R.value.push({name:"Month",align:"left",label:"Month",field:"month",sortable:!0}),q.value.forEach((e=>{let a=e.keyname,t={name:e.service,align:"center",label:e.service,field:a,sortable:!0};T.value.push(t),R.value.push(t)})),R.value.push({name:"Total",align:"center",label:"Total",field:"total",sortable:!0})}async function ie(e){p.value={sortBy:"desc",descending:!1,page:1,rowsPerPage:10,rowsNumber:5,mode:e},0==S.value.length&&(S.value.push({name:"tsrNo",align:"left",label:"TSR Number",field:"tsrNo"}),S.value.push({name:"division",align:"left",label:"Division",field:"division"}),S.value.push({name:"service",align:"left",label:"Service",field:"service"}),S.value.push({name:"question",align:"left",label:"Question",field:"question"}),S.value.push({name:"value",align:"left",label:"Value",field:"value"}),S.value.push({name:"date",align:"left",label:"Submitted Date",field:"submittedAt"}),S.value.push({name:"remarks",align:"left",label:"Remarks",field:"remarks"})),await se({pagination:p.value,filter:void 0}),j.value=!0}async function ne(e,a,t,l,o,r){let i=[];if(t)i=await(0,L.jR)(t,r,e,a);else if(N.value)1==r?(i=await(0,L.WZ)(e,a,N.value),P.value="Negative Feedback "+N.value.toString()):(i=await(0,L.XP)(e,a,N.value),P.value="Positive Feedback "+N.value.toString());else if(O.value)1==r?(i=await(0,L.wy)(e,a,w.value,g.value),P.value="Negative Feedback Quarter:"+O.value+" ,"+w.value.getFullYear().toString()):(i=await(0,L.Kv)(e,a,w.value,g.value),P.value="Positive Feedback Quarter:"+O.value+" ,"+w.value.getFullYear().toString());else if(w.value&&g.value)1==r?(i=await(0,L.wy)(e,a,w.value,g.value),P.value="Negative Feedback "+w.value+" - "+g.value):(i=await(0,L.Kv)(e,a,w.value,g.value),P.value="Positive Feedback "+w.value+" - "+g.value);else{let t=(new Date).getFullYear();1==r?(i=await(0,L.WZ)(e,a,t),P.value="Negative Feedback "+t.toString()):(i=await(0,L.XP)(e,a,t),P.value="Positive Feedback "+t.toString())}return i}async function se(e){console.log("props",e);const{page:l,rowsPerPage:o,sortBy:r,descending:i,mode:u}=e.pagination,n=e.filter;let s;if(N.value?(a.value=await(0,L.lX)(N.value),t.value=await(0,L.wi)(N.value)):(O.value||w.value||g.value)&&(a.value=await(0,L.pm)("","",w.value,g.value),t.value=await(0,L.kD)("","",w.value,g.value)),s=1==u?a.value:t.value,n){let e=await(0,L.V4)(n,u);p.value.rowsNumber=e;const a=0===o?e:o,t=(l-1)*o,s=await ne(t,a,n,r,i,u);W.value.splice(0,W.value.length,...s),W.value=W.value.map((e=>({value:e.value,tsrNo:e.tsrNo,division:e.division,service:e.service,submittedAt:de()(e.submittedAt).format("YYYY-MM-DD"),question:e.question,remarks:e.remarks})))}else{const e=(l-1)*o;p.value.rowsNumber=s;const a=0===o?s:o,t=await ne(e,a,n,r,i,u);W.value.splice(0,W.value.length,...t),W.value=W.value.map((e=>({value:e.value,tsrNo:e.tsr.tsrNo,division:e.tsr.division,service:e.tsr.service,submittedAt:de()(e.tsr.submittedAt).format("YYYY-MM-DD"),question:e.question.description})))}p.value.page=l,p.value.rowsPerPage=o,p.value.sortBy=r,p.value.descending=i,p.value.mode=u}async function ve(){I(),await ae(),await ee(w.value,g.value),clearTimeout(Q),m.loading.hide()}return(0,l.YP)(N,((e,a)=>{N.value&&(I(),ae(),$(e))})),(0,l.YP)(O,((e,a)=>{if(O.value){switch(I(),O.value){case 1:w.value=new Date("01/01/"+M.value),g.value=new Date("03/31/"+M.value);break;case 2:w.value=new Date("04/01/"+M.value),g.value=new Date("06/30/"+M.value);break;case 3:w.value=new Date("07/01/"+M.value),g.value=new Date("09/30/"+M.value);break;case 4:w.value=new Date("10/01/"+M.value),g.value=new Date("12/31/"+M.value);break;default:}ae(),ee(w.value,g.value)}})),(0,l.Jd)((()=>{void 0!==Q&&(clearTimeout(Q),m.loading.hide())})),(0,l.bv)((async()=>{I(),q.value=await(0,L.nh)(),H.value=await(0,L.P_)(),$(v.value),await te(),await ae()})),{totalNegative:a,totalPositive:t,totalNoFeedback:o,totalTsrs:r,CardDashboardFeedbackCount:ue,columns:E,divisions:H,divisionsAndSections:q,services:F,rowsOverallPerformance:A,rowsnumberOfCustomers:V,colsOverallPerformance:T,colsnumberOfCustomers:R,totalActualRespondents:U,totalPerField:Y,yearOptions:K,yearTsr:N,updateTables:ae,beforeDate:w,afterDate:g,chartDataModelData:y,chartDataModelLabel:f,chartDataModelCustomersLabel:b,chartDataModelCustomersData:D,chartDataModelNumberPerServiceArea:k,lineChartLabel:C,showTextCard:z,cardDataCols:S,mode:c,filter:x,cardData:_,callCardData:ie,maximizedToggle:Z,cardModal:j,cardTitle:P,pagination:p,onRequestCard:se,rows:W,currentYear:v,modeOptions:X,modeDashboard:h,yearTsrQuarter:M,quarterOptions:J,quarterTSR:O,submitDate:ve,targetNoRespondents:s,totalActualArray:d,computedTotalPercentage:e}}};var _e=t(63314),Se=t(68689),Pe=t(64689),We=t(24554),xe=t(83944),He=t(76915),qe=t(2165),Fe=t(17132),Ae=t(18186),Ve=t(92414),Te=t(83884),Re=t(46778),Ne=t(5363),Oe=t(99367),Me=t(60677);Ce.render=j;const Ee=Ce;ie()(Ce,"components",{QSelect:_e.Z,QForm:Se.Z,QInput:Pe.Z,QIcon:We.Z,QPopupProxy:xe.Z,QDate:He.Z,QBtn:qe.Z,QCard:le.Z,QCardSection:oe.Z,QTable:Fe.Z,QTr:Ae.Z,QTh:Ve.Z,QTd:Te.Z,QDialog:Re.Z,QTooltip:Ne.Z,QCardActions:Oe.Z}),ie()(Ce,"directives",{ClosePopup:Me.Z})}}]);