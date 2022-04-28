"use strict";(self["webpackChunkcustomersurveysystem3"]=self["webpackChunkcustomersurveysystem3"]||[]).push([[609],{66621:(e,l,a)=>{a.r(l),a.d(l,{default:()=>ve});var t=a(83673),i=a(98880),o=a(62323);const r={class:"q-pa-lg"},n={class:"q-pa-md"},s={class:"row",style:{"padding-bottom":"20px"}},u={class:"row inline"},d={class:"row items-center justify-end"},v={class:"row items-center justify-end"},c={class:"q-pa-md"},p={key:1,class:"row"},f={class:"col-md-4"},m={class:"row inline"},h={class:"col-md-4 offset-md-4"},b={class:"row inline"},g={class:"q-pa-md"},w={class:"col-4 q-table__title"},y=(0,t.Uk)("Customer Satisfaction Measurement "),x={class:"col absolute-right"},S={key:0,class:"row"},D={key:0},C={key:1},_={class:"q-pa-md"},F={key:0},H={key:1},M=(0,t._)("div",{class:"text-h6"},"File Error",-1),N=(0,t.Uk)(" Please double check excel file uploaded ");function A(e,l,a,A,k,V){const q=(0,t.up)("q-toggle"),E=(0,t.up)("q-select"),R=(0,t.up)("q-btn"),Y=(0,t.up)("q-date"),W=(0,t.up)("q-popup-proxy"),O=(0,t.up)("q-icon"),P=(0,t.up)("q-input"),U=(0,t.up)("q-form"),T=(0,t.up)("q-file"),Z=(0,t.up)("q-space"),z=(0,t.up)("q-td"),I=(0,t.up)("q-tr"),Q=(0,t.up)("q-table"),B=(0,t.up)("viewsurveyanswer"),j=(0,t.up)("q-dialog"),L=(0,t.up)("q-card-section"),$=(0,t.up)("q-card-actions"),G=(0,t.up)("q-card"),J=(0,t.Q2)("close-popup");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("div",r,[(0,t._)("div",n,[(0,t.Wm)(q,{modelValue:e.showFilter,"onUpdate:modelValue":l[0]||(l[0]=l=>e.showFilter=l),label:"Show Filters"},null,8,["modelValue"])]),e.showFilter?((0,t.wg)(),(0,t.j4)(U,{key:0,ref:"dateform",onSubmit:l[8]||(l[8]=l=>e.dataUpdateWithDate())},{default:(0,t.w5)((()=>[(0,t._)("div",s,[(0,t.Wm)(E,{modelValue:e.division,"onUpdate:modelValue":[l[1]||(l[1]=l=>e.division=l),l[2]||(l[2]=l=>e.fillSectionList())],options:e.divisionsWithServ,label:"Division",style:{width:"200px"}},null,8,["modelValue","options"]),(0,t.Wm)(E,{modelValue:e.service,"onUpdate:modelValue":l[3]||(l[3]=l=>e.service=l),options:e.services,label:"Service",style:{width:"200px","margin-left":"40px"}},null,8,["modelValue","options"])]),(0,t._)("div",u,[(0,t.Wm)(P,{outlined:"",filled:"",mask:"date",modelValue:e.beforeDate,"onUpdate:modelValue":l[5]||(l[5]=l=>e.beforeDate=l),"lazy-rules":"",rules:[l=>l<=e.afterDate||"Field should be earlier than after date"],placeholder:"mm/dd/yy",hint:"Start Date"},{append:(0,t.w5)((()=>[(0,t.Wm)(O,{name:"event",class:"cursor-pointer"},{default:(0,t.w5)((()=>[(0,t.Wm)(W,{ref:"qDateProxy","transition-show":"scale","transition-hide":"scale"},{default:(0,t.w5)((()=>[(0,t.Wm)(Y,{modelValue:e.beforeDate,"onUpdate:modelValue":l[4]||(l[4]=l=>e.beforeDate=l)},{default:(0,t.w5)((()=>[(0,t._)("div",d,[(0,t.wy)((0,t.Wm)(R,{label:"Close",color:"primary",flat:""},null,512),[[J]])])])),_:1},8,["modelValue"])])),_:1},512)])),_:1})])),_:1},8,["modelValue","rules"]),(0,t.Wm)(P,{outlined:"",filled:"",mask:"date",style:{"padding-left":"25px"},modelValue:e.afterDate,"onUpdate:modelValue":l[7]||(l[7]=l=>e.afterDate=l),"lazy-rules":"",rules:[l=>l>=e.beforeDate||"Field should be later than before date"],placeholder:"mm/dd/yy",hint:"End Date"},{append:(0,t.w5)((()=>[(0,t.Wm)(O,{name:"event",class:"cursor-pointer"},{default:(0,t.w5)((()=>[(0,t.Wm)(W,{ref:"qDateProxy","transition-show":"scale","transition-hide":"scale"},{default:(0,t.w5)((()=>[(0,t.Wm)(Y,{modelValue:e.afterDate,"onUpdate:modelValue":l[6]||(l[6]=l=>e.afterDate=l)},{default:(0,t.w5)((()=>[(0,t._)("div",v,[(0,t.wy)((0,t.Wm)(R,{label:"Close",color:"primary",flat:""},null,512),[[J]])])])),_:1},8,["modelValue"])])),_:1},512)])),_:1})])),_:1},8,["modelValue","rules"]),(0,t.Wm)(R,{type:"submit",label:"Go",color:"primary",style:{"margin-left":"25px",width:"70px",height:"25px"}})])])),_:1},512)):(0,t.kq)("",!0),(0,t.wy)((0,t._)("div",c,[(0,t.Wm)(q,{modelValue:e.showFunctions,"onUpdate:modelValue":l[9]||(l[9]=l=>e.showFunctions=l),label:"Show Functions"},null,8,["modelValue"])],512),[[i.F8,"PMD"==e.userLoggedin.role.name||"Management"==e.userLoggedin.role.name]]),e.showFunctions?((0,t.wg)(),(0,t.iD)("div",p,[(0,t._)("div",f,[(0,t._)("div",m,[(0,t.Wm)(T,{modelValue:e.importFile,"onUpdate:modelValue":l[10]||(l[10]=l=>e.importFile=l),ref:"uploadRefButton",label:"Import Data ",accept:".csv,.xls,.xlsx",color:"primary"},{prepend:(0,t.w5)((()=>[(0,t.Wm)(O,{name:"attach_file"})])),_:1},8,["modelValue"]),(0,t.Wm)(R,{type:"submit",label:"Import Data",class:"q-mt-md",color:"primary",onClick:l[11]||(l[11]=l=>e.fileUpload(e.importFile)),style:{"margin-left":"25px"}})])]),(0,t._)("div",h,[(0,t._)("div",b,[(0,t.Wm)(R,{type:"submit",label:"Generate Raw Data",class:"q-mt-md",color:"primary",onClick:l[12]||(l[12]=l=>e.generateExcel())}),(0,t.Wm)(R,{type:"submit",label:"Generate PDF Report",class:"q-mt-md",color:"primary",onClick:l[13]||(l[13]=l=>e.generatePDF()),style:{"margin-left":"15px"}})])])])):(0,t.kq)("",!0)]),(0,t._)("div",g,[e.rows?((0,t.wg)(),(0,t.j4)(Q,{key:0,class:"overallAverage",rows:e.rows,columns:e.cols,"row-key":"name",onRowClick:e.onRowClick,loading:e.loading,filter:e.filter,pagination:e.pagination,"onUpdate:pagination":l[17]||(l[17]=l=>e.pagination=l),"visible-columns":e.visibleColumns,onRequest:e.onRequest,"binary-state-sort":"",separator:"cell"},{top:(0,t.w5)((a=>[(0,t._)("div",w,[y,(0,t.Wm)(P,{class:"placeholderClass",borderless:"",dense:"",debounce:"300",modelValue:e.filter,"onUpdate:modelValue":l[14]||(l[14]=l=>e.filter=l),placeholder:"Search"},{append:(0,t.w5)((()=>[(0,t.Wm)(O,{class:"searchClass",name:"search"})])),_:1},8,["modelValue"])]),(0,t._)("div",x,[(0,t.Wm)(R,{flat:"",round:"",dense:"",icon:a.inFullscreen?"fullscreen_exit":"fullscreen",onClick:a.toggleFullscreen,class:"q-ml-md"},null,8,["icon","onClick"])]),(0,t.Wm)(Z),e.$q.screen.gt.xs?((0,t.wg)(),(0,t.iD)("div",S,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.toggles,(a=>((0,t.wg)(),(0,t.iD)("div",{key:a.val},[(0,t.Wm)(q,{modelValue:e.visibleColumns,"onUpdate:modelValue":l[15]||(l[15]=l=>e.visibleColumns=l),val:a.val,color:"yellow",label:a.label},null,8,["modelValue","val","label"])])))),128))])):((0,t.wg)(),(0,t.j4)(E,{key:1,modelValue:e.visibleColumns,"onUpdate:modelValue":l[16]||(l[16]=l=>e.visibleColumns=l),multiple:"",borderless:"",dense:"","options-dense":"","display-value":e.$q.lang.table.columns,"emit-value":"","map-options":"",options:e.cols,"option-value":"name",style:{"min-width":"150px"}},null,8,["modelValue","display-value","options"]))])),"bottom-row":(0,t.w5)((()=>[(0,t.Wm)(I,null,{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.visibleColumnsAverage,(e=>((0,t.wg)(),(0,t.j4)(z,{key:e.id},{default:(0,t.w5)((()=>[e.tsrNo?((0,t.wg)(),(0,t.iD)("p",D,"Average: ")):0!=e.value&&!isNaN(e.value)&&e.visible?((0,t.wg)(),(0,t.iD)("p",C,(0,o.zw)(e.value),1)):(0,t.kq)("",!0)])),_:2},1024)))),128))])),_:1})])),_:1},8,["rows","columns","onRowClick","loading","filter","pagination","visible-columns","onRequest"])):(0,t.kq)("",!0)]),(0,t._)("div",_,[(0,t.Wm)(Q,{title:e.titleOverall,rows:e.rowsOverall,columns:e.colsOverall,loading:e.overallLoading,"row-key":"name",separator:"cell",class:"overallAverage","binary-state-sort":"",style:{height:"500px"},"rows-per-page-options":[0]},{"bottom-row":(0,t.w5)((()=>[(0,t.Wm)(I,null,{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.overAllAverage,(e=>((0,t.wg)(),(0,t.j4)(z,{key:e.key},{default:(0,t.w5)((()=>[e.dimension?((0,t.wg)(),(0,t.iD)("p",F,"Average: ")):((0,t.wg)(),(0,t.iD)("p",H,(0,o.zw)(e.value),1))])),_:2},1024)))),128))])),_:1})])),_:1},8,["title","rows","columns","loading"])]),(0,t.Wm)(j,{modelValue:e.prompt,"onUpdate:modelValue":l[19]||(l[19]=l=>e.prompt=l)},{default:(0,t.w5)((()=>[(0,t.Wm)(B,{modelValue:e.tsrData,"onUpdate:modelValue":l[18]||(l[18]=l=>e.tsrData=l),cols:e.cols},null,8,["modelValue","cols"])])),_:1},8,["modelValue"]),(0,t.Wm)(j,{modelValue:e.uploadDialog,"onUpdate:modelValue":l[20]||(l[20]=l=>e.uploadDialog=l)},{default:(0,t.w5)((()=>[(0,t.Wm)(G,null,{default:(0,t.w5)((()=>[(0,t.Wm)(L,{class:"bg-primary text-white"},{default:(0,t.w5)((()=>[M])),_:1}),(0,t.Wm)(L,null,{default:(0,t.w5)((()=>[N])),_:1}),(0,t.Wm)($,{align:"right"},{default:(0,t.w5)((()=>[(0,t.wy)((0,t.Wm)(R,{flat:"",label:"OK",color:"primary"},null,512),[[J]])])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}a(90246),a(7098),a(10071);var k=a(61959),V=a(26873),q=a(93422),E=(a(12841),a(48825)),R=a(5474),Y=a(74798),W=a.n(Y),O=a(24334),P=a.n(O),U=a(93617),T=a(55093);const Z=(0,t.aZ)({name:"Admin",components:{viewsurveyanswer:T.Z},setup(){let e;const l=(0,U.oR)(),a=(0,k.iH)(["tsrNo","division","service","industry","Overall Rating","publishedDate"]),i=(0,k.iH)([]),o=(0,k.iH)([]),r=(0,E.Z)(),n=(0,k.iH)(null),s=(0,k.iH)([]),u=(0,k.iH)([]),d=(0,k.iH)([]),v=(0,k.iH)([]),c=((0,k.iH)(0),(0,k.iH)("")),p=(0,k.iH)(""),f=(0,k.iH)(null),m=(0,k.iH)(!1),h=(0,k.iH)(!1);let b=Date.now();b=W()().year();const g=(0,k.iH)("position"),w=(0,k.Fl)((()=>P()(y.value,g.value))),y=(0,k.iH)([]),x=(0,k.iH)([]),S=(0,k.iH)([]),D=(0,k.iH)([]),C=(0,k.iH)(""),_=(0,k.iH)(!0),F=(0,k.iH)({sortBy:"desc",descending:!1,page:1,rowsPerPage:10,rowsNumber:5}),H=(0,k.iH)([]),M=(0,k.iH)(null),N=(0,k.iH)([]),A=(0,k.iH)([]),Y=(0,k.iH)(null);(0,t.YP)(p,((e,l)=>{let a=e.toString();return de(a)})),(0,t.YP)(c,((e,l)=>{let a=e.toString();return de(a)}));const O=(0,k.qj)({}),Z=(0,k.iH)([]),z=(0,k.iH)([]),I=((0,k.iH)([]),(0,k.iH)(null)),Q=(0,k.iH)([]),B=(0,k.iH)([]),j=(0,k.iH)(!0),L=(0,k.iH)("Overall Agency Citizen/ Client Satisfaction Score YTD "+(new Date).getFullYear()),$=(0,k.iH)([]),G=(0,k.iH)([]),J=(0,k.iH)([]),K=(0,k.iH)([]),X=(0,k.iH)([]),ee=(0,k.iH)([]),le=(0,k.iH)(!1),ae=(0,k.iH)(!1),te=(0,k.Fl)((()=>l.getters["auth/getUserProfile"]));function ie(){A.value=i.value.filter((e=>e.division==M.value)).map((e=>e.service))}async function oe(e,l,a,t,i,o,r,n){try{return i&&o?n?await(0,V.MF)(e,l,a,t,i,o,r,n):await(0,V.MF)(e,l,a,t,i,o,r,""):n?await(0,V.MF)(e,l,a,t,"","",r,n):await(0,V.MF)(e,l,a,t,"","",r,"")}catch(s){throw s}}function re(e){let l=[];return e.map((function(e){let a={tsrNo:e.tsrNo,submittedAt:ue(e.submittedAt),division:e.division,industry:e.industry,service:e.service,section:e.section},t=e.answers.map((e=>e.question));t=t.filter((function(e){return null!=e}));for(let l=0;l<t.length;l++)""!=e.answers[l].question&&(a[e.answers[l].question]=e.answers[l].value);l.push(a)})),l}function ne(){let e=[];if(0==D.value.length){D.value.push({name:"tsrNo",align:"left",label:"TSR Number",field:"tsrNo",sortable:!0}),D.value.push({name:"division",align:"left",label:"Division",field:"division"}),D.value.push({name:"service",align:"left ",label:"Service",field:"service"}),D.value.push({name:"industry",align:"left",label:"Industry",field:"industry"});for(let e=0;e<w.value.length;e++)if(5!=w.value[e].question_type){let l={name:"",align:"left",label:"",field:""};l.name=w.value[e].description,l.label=w.value[e].description,l.field=w.value[e].id;let a={val:w.value[e].description,label:l.label};H.value.push(a),D.value.push(l)}D.value.push({name:"publishedDate",align:"left",label:"Submitted Date",field:"submittedAt"})}return x.value.map((function(l){let a={tsrNo:l.tsrNo,submittedAt:ve(l.submittedAt),division:l.division,industry:l.industry,service:l.service,section:l.section},t=l.answers.map((e=>e.question));for(let e=0;e<t.length;e++)""!=l.answers[e].question&&(a[l.answers[e].question]=l.answers[e].value);e.push(a)})),e}async function se(e){j.value=!0,Q.value.length>0&&(Q.value=[]),c.value&&p.value&&(L.value="Overall Agency Citizen/ Client Satisfaction Score-"+W()(c.value).format("MMMM-YYYY")+" to "+W()(p.value).format("MMMM-YYYY")),Q.value.push({name:"Dimension",align:"left",label:"Dimension",field:"dimension",style:"width: 300px"});let l=[];Q.value.push({name:"Score",align:"left",label:"Score All in Service",field:"scoreservice",style:"width: 300px"}),l=await(0,V.TB)(c.value,p.value);for(let t=0;t<e.length;t++)Q.value.push({name:e[t].division,align:"left",label:e[t].division,field:e[t].division,sortable:!0});for(let t=0;t<B.value.length;t++){let e=l.filter((e=>e.description===B.value[t].dimension));for(let l=0;l<e.length;l++)B.value[t][[e[l].division]]=parseFloat(e[l].avgVal.toFixed(2))}for(let t=0;t<B.value.length;t++){const{dimension:e,id:l,scoreservice:i,...o}=B.value[t];let r=0,n=0;for(var a in o)0!=o[a]&&(isNaN(o[a])?r+=0:r+=o[a],n++);let s=parseFloat((Math.round(r/n*100)/100).toFixed(2));isNaN(s)&&(s=0),B.value[t]["scoreservice"]=s}I.value=await Me(Q.value,B.value)}function ue(e){return W()(e).format("YYYY/MM/DD")}function de(e){return W()(e).format("YYYY-MM-DD")}function ve(e){return W()(e).format("MMMM")}async function ce(l){if(n.value){pe();let a=l.name.split("-");if(a){let t=a[a.length-1].split(".");if(t){let a=await _e(l);const i=R.xlsx.utils.sheet_to_json(R.xlsx.read(a,{type:"binary",cellDates:!0}).Sheets["Details of CSF forms"]);let o=await Fe(i,t[0]);0==o?r.notify({message:"Responses Migrated",color:"positive",icon:"success"}):1==o?r.notify({message:"Responses Not Migrated, Error found: ",color:"negative",icon:"failed"}):2==o&&r.notify({color:"red-5",textColor:"white",icon:"warning",message:"Duplicate TSR found in file"}),e=void 0,r.loading.hide()}}}else r.notify({color:"red-5",textColor:"white",icon:"warning",message:"File field Empty"})}function pe(){r.loading.show({message:"Please wait for data to be imported..",boxClass:"bg-grey-2 text-grey-9",spinnerColor:"primary"})}function fe(){r.loading.show({message:"Please wait for data to be loaded",boxClass:"bg-grey-2 text-grey-9",spinnerColor:"primary"})}function me(){e=void 0,r.loading.hide()}function he(e,l,a,t){var i=[];if(2==a){let a=l.map((e=>e)),t=l.map((e=>e.label));i.push(t);let o=e.map((e=>e));o.forEach((function(e){var l=[];a.forEach((function(a){e[a.field]?[a.label]&&l.push(e[a.field]):l.push("")})),i.push(l)}))}else if(3==a){let a=l.map((e=>e)),t=[];t.push({}),t.push({}),o.value.forEach((e=>{t.push({text:e.division,colSpan:e.count});for(let l=0;l<e.count-1;l++)t.push({})})),i.push(t);let r=l.map((e=>e.label));i.push(r);let n=e.map((e=>e));n.forEach((function(e){var l=[];a.forEach((function(a){e[a.field]?[a.label]&&l.push(e[a.field]):l.push({text:""})})),i.push(l)}))}else if(4==a){let a=l.map((e=>e)),t=[];t.push({}),o.value.forEach((e=>{t.push({text:e.division,colSpan:e.count});for(let l=0;l<e.count-1;l++)t.push({})})),t.push({}),i.push(t);let r=l.map((e=>e.label));i.push(r);let n=e.map((e=>e));n.forEach((function(e){var l=[];a.forEach((function(a){e[a.field]?[a.label]&&l.push(e[a.field]):l.push({text:"0"})})),i.push(l)}))}else if(5==a){let a=l.map((e=>e)),t=l.map((e=>e.label));i.push(t);let o=e.map((e=>e)),r=0,n=0,s=0,u=0,d=0,v=0,c=0,p=0,f=0,m=0,h=0,b=0;o.forEach((function(e){r%12==0&&(i.push(["Division: ",e.division,"","","","","","","",""]),i.push(["Service: ",e.service,"","","","","","","",""]),r+=2);var l=[];a.forEach((function(a){if(e[a.field]){if(12==a.field&&e[a.field])if(5==e.id||4==e.id){let l=parseFloat(e[a.field]);c+=l,l=l/100*e.countsDivision,m+=l}else if(3==e.id){let l=parseFloat(e[a.field]);p+=l,l=l/100*e.countsDivision,h+=l}else if(e.id<=2){let l=parseFloat(e[a.field]);f+=l,l=l/100*e.countsDivision,b+=l}[a.label]&&l.push(e[a.field])}else l.push("")})),i.push(l),r+=1,(r+4)%12!=0&&8!=r||(n=e.countsDivision,i.push(["No of Respondents: ",n,"","","","","","","",""]),i.push(["No. and % of customers who rated the service as very satisfactory or better: ",Math.round(m),c.toFixed(2).toString()+"%","","","","","","",""]),i.push(["No. and % of customers who rated the service as satisfactory or better: ",Math.round(h),p.toFixed(2).toString()+"%","","","","","","",""]),i.push(["No. and % of customers who rated the service as Fair or Poor: ",Math.round(b),f.toFixed(2).toString()+"%","","","","","","",""]),r+=4,s+=n,u+=m,d+=h,v+=b,c=0,p=0,f=0,h=0,m=0,b=0)})),i.push(["Total Summary of Citizen/Client Satisfaction Survey CCSS Rating ","","","","","","","","",""]),i.push(["No. and % of customers who rated the Center's service as very satisfactory or better",Math.round(u),(u/s*100).toFixed(2).toString()+"%","","","","","","",""]),i.push(["No. and % of customers who rated the Center's service as satisfactory or better",Math.round(d),(d/s*100).toFixed(2).toString()+"%","","","","","","",""]),i.push(["No. and % of customers who rated the service as Fair or Poor",Math.round(v),(v/s*100).toFixed(2).toString()+"%","","","","","","",""]),i.push(["Total No. of Respondents : ",s,"","","","","","","",""])}else if(6==a){let a=l.map((e=>e)),t=l.map((e=>e.label));i.push(t);let o=e.map((e=>e)),r="",n="",s=0;o.forEach((function(e){e.service&&e.division&&(r!=e.division||0==s?(i.push([{text:"Division: ",border:[!0,!0,!1,!1]},{text:e.division,colSpan:3,border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!0,!1]}]),i.push([{text:"Service: ",border:[!0,!0,!1,!1]},{text:e.service,colSpan:3,border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!0,!1]}]),s+=2):n!=e.service&&i.push([{text:"Service: ",border:[!0,!0,!1,!1]},{text:e.service,colSpan:3,border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!1,!1]},{text:"",border:[!1,!0,!0,!1]}])),r=e.division,n=e.service,s++;var l=[];a.forEach((function(a){e[a.field]?[a.label]&&l.push({text:e[a.field]}):l.push("")})),i.push(l)}))}return i}function be(e){G.value=(0,q.WH)(i.value),$.value=(0,q.DU)(i.value,e),K.value=(0,q.v)(i.value),J.value=(0,q.tY)(i.value,e),ee.value=(0,q._T)(w.value),X.value=(0,q.x7)(w.value,i.value,e)}function ge(e,l){return e.division<l.division?-1:e.division>l.division?1:0}function we(e,l){return e.service<l.service?-1:e.service>l.service?1:0}async function ye(){let e=[];if(c.value&&p.value)e=await xe(c.value,p.value);else{let l=(new Date).getFullYear(),a=new Date(l,0,1),t=new Date;e=await xe(a,t)}if(be(e),0==e.length)r.notify({message:"No data found, PDF Creation Failed",color:"negative",position:"top"});else{e=e.sort(ge),e=e.sort(we);let t=re(e),o=Q.value.map((({field:e,label:l})=>({field:e,label:l}))),r=D.value.map((({field:e,label:l})=>({field:e,label:l}))),n=G.value.map((({field:e,label:l})=>({field:e,label:l}))),s=r.filter((function(e){return 4!=e.field})),u=c.value?ve(c.value):"January",d=p.value?ve(p.value):ve(Date.now());var l={pageSize:"LEGAL",pageOrientation:"landscape",pageMargins:[40,60,40,40],header:{stack:[{text:"METALS INDUSTRY RESEARCH AND DEVELOPMENT CENTER",style:"header",fontSize:11},{text:"CUSTOMER SURVEY MANAGEMENT REPORT",style:"header",fontSize:13},{text:"TECHNICAL AND SCIENTIFIC EQUIPMENT",style:"header",fontSize:13},{text:"As of 31 December 2020",style:"header",fontSize:11},{text:"FOR WHICH ROBERT O DIZON, EXECUTIVE DIRECTOR, IS ACCOUNTABLE, HAVING ASSUMED SUCH ACCOUNTABILITY ON JANUARY 2016",style:"header",bold:!1,fontSize:11}],margin:[34,28.91,34,21.54]},footer:function(e,l){return{table:{widths:[100],body:[[{text:"Page "+e+" of "+l,alignment:"center"}]]},layout:"noBorders"}},content:[{text:"Overall Agency Citizen/ Client Satisfaction Score",style:"tableHeader"},{text:u+" - "+d,style:"tableHeader"},{table:{headerRows:1,body:he(B.value,o,2,i.value)},style:"tableOverallAgency"},{text:"Customer Satisfaction Measurement",style:"tableHeader",pageBreak:"before",pageOrientation:"landscape"},{table:{headerRows:1,body:he(t,s,6,i.value)},style:"table"},{text:"Overall Performance of the Center Based on CSS Responses",style:"tableHeader",pageBreak:"before",pageOrientation:"landscape"},{table:{headerRows:2,body:he($.value,n,3,i.value)},style:"table"},{text:"Number of Customers and CSM Respondents Per Service Area",style:"tableHeader",pageBreak:"before",pageOrientation:"landscape"},{table:{headerRows:2,body:he(J.value,K.value,4,i.value)},style:"table"},{text:"Summary of Citizen/Client Satisfaction Survey CCSS Rating",style:"tableHeader",pageBreak:"before",pageOrientation:"landscape"},{table:{headerRows:1,body:he(X.value,ee.value,5,i.value)},style:"table"}],pageBreakBefore:function(e,l,a,t){return 1===e.headlineLevel&&0===l.length},styles:{header:{fontSize:14,bold:!0,alignment:"center"},tableHeader:{bold:!0,fontSize:16,alignment:"center"},table:{fontSize:10,alignment:"center"},tableOverallAgency:{fontSize:16,alignment:"center"}}},a=R.pdfMake.createPdf(l);a.open()}}async function xe(e,l){let a,t=[],i=W()(e).month(),o=W()(e).year(),r=Math.floor(W()(l).diff(W()(e),"months",!0));for(let n=0;n<=r;n++)a=await(0,V.jH)(i,o),a.forEach((e=>{t.push(e)})),11==i?(i=0,o+=1):i+=1;return t}async function Se(){let e,l=[];if(c.value&&p.value)l=await xe(c.value,p.value),e=W()(c.value).format("MMMM-YYYY")+" - "+W()(p.value).format("MMMM-YYYY");else{let a=(new Date).getFullYear(),t=new Date(a,0,1),i=new Date;l=await xe(t,i),e="January "+a+" - "+W()(Date.now()).format("MMMM-YYYY")}if(0==l.length)r.notify({message:"No data found,  Excel Creation Failed",color:"negative",position:"top"});else{be(l),l=l.sort(ge),l=l.sort(we);let r=re(l),d=Q.value.map((({field:e,label:l})=>({field:e,label:l}))),v=D.value.map((({field:e,label:l})=>({field:e,label:l}))),c=G.value.map((({field:e,label:l})=>({field:e,label:l}))),p=v.filter((function(e){return 4!=e.field}));var a=R.xlsx.utils.json_to_sheet(he(B.value,d,2,i.value));let f=he(r,p,6,i.value),m=f.map((function(e){return Array.isArray(e)?e[0]&&!e[0].hasOwnProperty("text")?e:e.map((e=>e.text)):e}));var t=R.xlsx.utils.json_to_sheet(m);let h=he($.value,c,3,i.value),b=h.map((function(e){if(Array.isArray(e))for(let l=0;l<e.length;l++)if(e[l]&&e[l].hasOwnProperty("colSpan")){let a=parseInt(e[l]["colSpan"]),t=e[l]["text"];for(let i=0;i<a;i++)e[l+i]=t}return e}));var o=R.xlsx.utils.json_to_sheet(b);let g=he(J.value,K.value,4,i.value),w=g.map((function(e){if(Array.isArray(e))for(let l=0;l<e.length;l++)if(e[l]&&e[l].hasOwnProperty("colSpan")){let a=parseInt(e[l]["colSpan"]),t=e[l]["text"];for(let i=0;i<a;i++)e[l+i]=t}return e}));var n=R.xlsx.utils.json_to_sheet(w),s=R.xlsx.utils.json_to_sheet(he(X.value,ee.value,5,i.value)),u=R.xlsx.utils.book_new();R.xlsx.utils.book_append_sheet(u,a,"Overall Agency Citizen Score"),R.xlsx.utils.book_append_sheet(u,t,"Customer Satisfaction Measure"),R.xlsx.utils.book_append_sheet(u,o,"Overall Performance CSS"),R.xlsx.utils.book_append_sheet(u,n,"Number of Customers Per Service"),R.xlsx.utils.book_append_sheet(u,s,"Summary of Citizen CCSS Rating"),R.xlsx.writeFile(u,e.toString()+" CSMS Raw Data .xlsx")}}async function De(){fe(),F.value.page=1;let e=await f.value.validate();e&&(await Ne({pagination:F.value,filter:void 0}),await se(o.value)),me()}function Ce(e,l){m.value=!0,O.value=l}async function _e(e){var l=new FileReader;return new Promise(((a,t)=>{l.onerror=()=>{l.abort(),t(new DOMException("Problem parsing input file."))},l.onload=()=>{a(l.result)},l.readAsArrayBuffer(e)}))}async function Fe(e,l){let a=[];e.forEach((e=>{let t=e.Month.toString()+" "+l.toString(),i=new Date(t);const o={division:e.Division,service:e.Service,industry:e.Sector,tsrNo:e.TSRNo,submittedAt:i};let r=[];for(var n in e)if(e.hasOwnProperty(n)){n=n.split(",");let l=e.TSRNo;if(n[1]){const a={answerid:"",value:e[n].toString(),question:n[1].toString(),tsrNo:l};r.push(a)}}o["answers"]=r,a.push(o)}));const t=new Set(a.map((e=>e.tsrNo))),i=a.map((e=>e.tsrNo)),o=Array.from(t);o.filter((e=>!i.includes(e))).concat(i.filter((e=>!o.includes(e))));if(t.size<a.length)return 2;for(const r of a){let e=[],l=await(0,V.ZS)(e,r.answers,r.tsrNo,r.industry,r.service,r.division,r.submittedAt,"");if("200"!=l)return 1}return await Ne({pagination:F.value,filter:void 0}),0}async function He(e,l,a,t,i){let o;if(o=M.value||Y.value?4:1,c.value&&p.value?x.value=a?await oe(e,l,M.value,Y.value,c.value,p.value,o,a):await oe(e,l,M.value,Y.value,c.value,p.value,o,""):x.value=a?await oe(e,l,M.value,Y.value,b+"-01-01",b+"-12-31",o,a):await oe(e,l,M.value,Y.value,b+"-01-01",b+"-12-31",o,""),s.value=ne(),t){const e="desc"===t?i?(e,l)=>e.name>l.name?-1:e.name<l.name?1:0:(e,l)=>e.name>l.name?1:e.name<l.name?-1:0:i?(e,l)=>parseFloat(l[t])-parseFloat(e[t]):(e,l)=>parseFloat(e[t])-parseFloat(l[t]);s.value.sort(e)}return s.value}function Me(e,l){let a=e.map((e=>({field:e.field,label:e.name}))),t=[];for(let o=0;o<a.length;o++){let e={};e[a[o].field]=[],e["id"]=a[o].label;let r=l.map((function(e){return e[a[o].field]}));var i=r.filter((function(e){if(void 0!=e||""==e||!isNaN(e))return e}));let n=0;for(let l=0;l<i.length;l++)isNaN(i[l])||(n+=parseFloat(i[l]));let s=parseFloat((Math.round(n/i.length*100)/100).toFixed(2));isNaN(s)?e["value"]=0:e["value"]=s,e["visible"]=!1,t.push(e)}return t}async function Ne(e){const{page:l,rowsPerPage:a,sortBy:t,descending:i}=e.pagination,o=e.filter;if(_.value=!0,j.value=!0,c.value&&p.value)c.value=ue(c.value),p.value=ue(p.value),M.value||Y.value?V.d$.value=await(0,V.sD)(M.value,Y.value,c.value,p.value,o):V.d$.value=await(0,V.d$)(c.value,p.value,o);else{let e=(new Date).getFullYear();M.value||Y.value?V.d$.value=await(0,V.kJ)(M.value,Y.value,e,o):V.d$.value=await(0,V.bO)(e,o)}if(0==B.value.length)for(let u=0;u<w.value.length;u++){let e={dimension:w.value[u].description,id:w.value[u].id};2==w.value[u].question_type&&B.value.push(e)}_.value=!0,F.value.rowsNumber=V.d$.value;const r=(l-1)*a,n=0===a?V.d$.value:a,s=await He(r,n,o,t,i);z.value=[...new Set(x.value.map((e=>e.division)))].filter((function(e){return null!==e})),S.value.splice(0,S.value.length,...s),Z.value=Me(D.value,S.value),F.value.page=l,F.value.rowsPerPage=a,F.value.sortBy=t,F.value.descending=i,_.value=!1,j.value=!1}return(0,t.Jd)((()=>{void 0!==e&&(clearTimeout(e),r.loading.hide())})),(0,t.bv)((async()=>{console.log("mounted"),fe();try{y.value=await(0,V.ld)()}catch(e){console.log("error",error)}i.value=await(0,V.nh)(),N.value=[...new Set(i.value.map((e=>e.division)))],o.value=await(0,V.P_)();await(0,V.ld)();await Ne({pagination:F.value,filter:void 0}),await se(o.value),me()})),{rowsTable:s,rowsFilter:u,answers:v,listOfTsr:d,cols:D,generateExcel:Se,generatePDF:ye,beforeDate:c,afterDate:p,prompt:m,uploadDialog:h,onRowClick:Ce,viewsurveyanswer:T.Z,tsrData:O,dateform:f,dateTime:ue,filter:C,onRequest:Ne,pagination:F,rows:S,loading:_,finalAverageDataRow:Z,rowsOverall:B,colsOverall:Q,overallLoading:j,overAllAverage:I,titleOverall:L,importFile:n,fileUpload:ce,showLoading:pe,dataUpdateWithDate:De,division:M,service:Y,services:A,divisions:o,fillSectionList:ie,divisionsWithServ:N,showFilter:le,showFunctions:ae,visibleColumns:a,visibleColumnsAverage:(0,k.Fl)((()=>(Z.value.forEach((e=>{let l=Object.values(a.value);l.includes(e.id)?e.visible=!0:e.visible=!1})),Z.value.filter((e=>e.visible))))),toggles:H,userLoggedin:te}}});var z=a(28886),I=a(68689),Q=a(63314),B=a(64689),j=a(24554),L=a(83944),$=a(85836),G=a(2165),J=a(64974),K=a(17132),X=a(62025),ee=a(18186),le=a(24600),ae=a(83884),te=a(69721),ie=a(46778),oe=a(10151),re=a(25589),ne=a(99367),se=a(60677),ue=a(7518),de=a.n(ue);Z.render=A;const ve=Z;de()(Z,"components",{QToggle:z.Z,QForm:I.Z,QSelect:Q.Z,QInput:B.Z,QIcon:j.Z,QPopupProxy:L.Z,QDate:$.Z,QBtn:G.Z,QFile:J.Z,QTable:K.Z,QSpace:X.Z,QTr:ee.Z,QVirtualScroll:le.Z,QTd:ae.Z,QBadge:te.Z,QDialog:ie.Z,QCard:oe.Z,QCardSection:re.Z,QCardActions:ne.Z}),de()(Z,"directives",{ClosePopup:se.Z})}}]);