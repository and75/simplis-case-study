"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8248],{8248:(R,h,l)=>{l.r(h),l.d(h,{SubscribeModule:()=>j});var p=l(6814),a=l(5548),c=l(95),v=l(553),d=l(9862),_=l(2096),M=l(8645);const x={now:()=>(x.delegate||Date).now(),delegate:void 0};class P extends M.x{constructor(o=1/0,t=1/0,i=x){super(),this._bufferSize=o,this._windowTime=t,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,o),this._windowTime=Math.max(1,t)}next(o){const{isStopped:t,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:s,_windowTime:u}=this;t||(i.push(o),!r&&i.push(s.now()+u)),this._trimBuffer(),super.next(o)}_subscribe(o){this._throwIfClosed(),this._trimBuffer();const t=this._innerSubscribe(o),{_infiniteTimeWindow:i,_buffer:r}=this,s=r.slice();for(let u=0;u<s.length&&!o.closed;u+=i?1:2)o.next(s[u]);return this._checkFinalizedStatuses(o),t}_trimBuffer(){const{_bufferSize:o,_timestampProvider:t,_buffer:i,_infiniteTimeWindow:r}=this,s=(r?1:2)*o;if(o<1/0&&s<i.length&&i.splice(0,i.length-s),!r){const u=t.now();let b=0;for(let m=1;m<i.length&&i[m]<=u;m+=2)b=m;b&&i.splice(0,b+1)}}}var O=l(3020),g=l(9397),f=l(6306),e=l(2029),T=l(6466);let C=(()=>{class n{constructor(t,i){this.http=t,this.authService=i,this.ApiServiceUrl=`${v.N.apiUrl}`}get Header(){return new d.WM}getActivities(){return this.http.get(`${this.ApiServiceUrl}activities`,{headers:this.Header}).pipe((0,g.b)(i=>this.log("fetched getActivities (all)")),(0,f.K)(this.handleError("getActivities (all)",[])))}searchActivities(t){return t.trim()?this.http.get(`${this.ApiServiceUrl}activities/search?q=${t}`,{headers:this.Header}).pipe((0,g.b)(r=>this.log(`fetched AppSearch matching "${t}"`)),(0,f.K)(this.handleError("AppSearch",[]))):(0,_.of)([])}saveSubscription(t){console.log(t);const i=`${this.ApiServiceUrl}subscription/save`,r=new FormData;return r.append("subscription",JSON.stringify(t)),this.http.post(i,r,{headers:this.Header}).pipe((0,g.b)(s=>this.log("fetched saveSubscription")),(0,f.K)(this.handleError("saveSubscription",[])))}downloadPDF(t){return this.http.get(`${v.N.apiUrl}agreements/pdf?id=${t}`,{headers:this.Header,responseType:"blob",reportProgress:!0,observe:"events"}).pipe(function y(n,o,t){let i,r=!1;return n&&"object"==typeof n?({bufferSize:i=1/0,windowTime:o=1/0,refCount:r=!1,scheduler:t}=n):i=null!=n?n:1/0,(0,O.B)({connector:()=>new P(i,o,t),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}(1),(0,f.K)(this.handleError("downloadPdf")))}handleError(t="operation",i){return r=>(console.error(r),console.log(`${t} failed: ${r.message}`),(0,_.of)(i))}log(t){console.info(t)}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(d.eN),e.LFG(T.e))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var S=l(5204),w=l(5861);class A{constructor(o){this.currentStep=o.currentStep,this.validStep=o.validStep,this.activity=null==o?void 0:o.activity,this.customer=null==o?void 0:o.customer,this.agreement=null==o?void 0:o.agreement,this.treated=null==o?void 0:o.treated}}function Z(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"li",3),e.NdJ("click",function(){const s=e.CHM(t).index,u=e.oxw(2);return e.KtG(u.setStep(s))}),e.qZA()}2&n&&e.Q6J("ngClass","active"===o.$implicit?"active":"disabled")}function I(n,o){if(1&n&&(e.TgZ(0,"ol",1),e.YNc(1,Z,1,1,"li",2),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.tSteps)}}let E=(()=>{class n{constructor(){this.steps=3,this.current=1,this.stepEvent=new e.vpe,this.tSteps=[]}ngOnInit(){for(let t=0;t<this.steps;t++)this.tSteps.push(this.current-1===t?"active":"disabled")}ngOnChanges(t){for(const r in t){const s=t[r],u=s.currentValue;s.isFirstChange()||this.setStep(u-1)}}setStep(t){this.tSteps=this.tSteps.map((i,r)=>t<r?"disabled":"active"),this.tSteps[t]="active",this.current=t+1,console.log(this.current),this.stepEvent.emit(this.current)}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-stepper"]],inputs:{steps:"steps",current:"current"},outputs:{stepEvent:"stepEvent"},features:[e.TTD],decls:1,vars:1,consts:[["class","stepper",4,"ngIf"],[1,"stepper"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"ngClass","click"]],template:function(t,i){1&t&&e.YNc(0,I,2,1,"ol",0),2&t&&e.Q6J("ngIf",i.tSteps)},dependencies:[p.mk,p.sg,p.O5],styles:['ol.stepper[_ngcontent-%COMP%]{--default-b: lightgrey;--default-c: black;--active-b: var(--ion-color-primary);--active-c: white;--circle: 2.5em;--b: 5px;display:flex;list-style:none;justify-content:space-between;background:linear-gradient(var(--default-b) 0 0) no-repeat 50% calc((var(--circle) - var(--b)) / 2)/100% var(--b);margin:20px;padding:0;font-size:22px;font-weight:700;counter-reset:step;overflow:hidden}ol.stepper[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:grid;place-items:center;gap:5px;font-family:sans-serif;position:relative}ol.stepper[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:counter(step) " ";counter-increment:step;display:grid;place-content:center;aspect-ratio:1;height:var(--circle);border:5px solid #fff;box-sizing:border-box;background:var(--default-b);color:var(--default-c);border-radius:50%;font-family:monospace;z-index:1}ol.stepper[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]:before{background:var(--active-b);color:var(--active-c)}ol.stepper[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]:after{content:"";position:absolute;height:var(--b);right:100%;top:calc((var(--circle) - var(--b)) / 2);width:100vw;background:var(--active-b)}']}),n})();function J(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"li",15),e.NdJ("click",function(){const s=e.CHM(t).$implicit,u=e.oxw(3);return e.KtG(u.setActivity(s))}),e._uU(1),e.qZA()}if(2&n){const t=o.$implicit;e.xp6(1),e.Oqu(t.name)}}function N(n,o){if(1&n&&(e.TgZ(0,"ul"),e.YNc(1,J,2,1,"li",14),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.findedActivities)}}function U(n,o){1&n&&(e.TgZ(0,"div",9),e._UZ(1,"ion-spinner",16),e.qZA())}function q(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"form")(1,"fieldset"),e._UZ(2,"div",9),e.TgZ(3,"legend"),e._uU(4,"L'activit\xe9 que vous souhaitez assurer ? "),e.qZA(),e.TgZ(5,"ion-input",10),e.NdJ("ngModelChange",function(r){e.CHM(t);const s=e.oxw();return e.KtG(s.query=r)})("keyup",function(r){e.CHM(t);const s=e.oxw();return e.KtG(s.filter(r))}),e.qZA(),e.TgZ(6,"div",11)(7,"h5"),e._uU(8),e.qZA(),e.TgZ(9,"div",12),e.YNc(10,N,2,1,"ul",7),e.YNc(11,U,2,0,"div",13),e.qZA()()()()}if(2&n){const t=e.oxw();e.xp6(5),e.Q6J("clearInput",!0)("ngModel",t.query),e.xp6(3),e.Oqu(t.getAutocompleteLabel()),e.xp6(2),e.Q6J("ngIf",t.findedActivities),e.xp6(1),e.Q6J("ngIf",!t.findedActivities)}}function F(n,o){1&n&&e._UZ(0,"ion-icon",25)}function k(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"form",17),e.NdJ("ngSubmit",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.saveCustomer())}),e.TgZ(1,"fieldset")(2,"legend"),e._uU(3,"Quelques informations sur votre entreprise !"),e.qZA(),e._UZ(4,"ion-input",18)(5,"ion-input",19)(6,"ion-input",20)(7,"ion-input",21)(8,"ion-input",22),e.qZA(),e.TgZ(9,"ion-button",23),e._uU(10),e.YNc(11,F,1,0,"ion-icon",24),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("formGroup",t.formData),e.xp6(4),e.Q6J("clearInput",!0),e.xp6(1),e.Q6J("clearInput",!0),e.xp6(1),e.Q6J("clearInput",!0),e.xp6(1),e.Q6J("clearInput",!0),e.xp6(1),e.Q6J("clearInput",!0),e.xp6(1),e.Q6J("disabled",!t.formData.valid),e.xp6(1),e.hij(" ",t.getStepButtonTitle()," ")}}function L(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"form")(1,"fieldset",26)(2,"legend"),e._uU(3,"Notre offre sur mesure pour vous !"),e.qZA(),e.TgZ(4,"ion-card",27)(5,"ion-card-header")(6,"ion-card-title"),e._uU(7),e.qZA(),e.TgZ(8,"ion-card-subtitle"),e._uU(9),e.qZA()(),e.TgZ(10,"ion-card-content",15),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.downloadPDF())}),e.TgZ(11,"div",28)(12,"div"),e._UZ(13,"ion-icon",29),e.qZA(),e.TgZ(14,"div"),e._uU(15,"T\xe9l\xe9chargez votre devis"),e.qZA()()()()(),e.TgZ(16,"ion-button",30),e._uU(17),e._UZ(18,"ion-icon",25),e.qZA()()}if(2&n){const t=e.oxw();e.xp6(7),e.hij("",t.subscription.activity.price," \u20ac"),e.xp6(2),e.Oqu(t.subscription.activity.name),e.xp6(8),e.hij(" ",t.getStepButtonTitle()," ")}}const Q=[{path:"",component:(()=>{class n{constructor(t,i){this.subscribeService=t,this.loadingCtrl=i,this.activities=null,this.findedActivities=null,this.actionSubmitted=!1,this.query="",this.subscription=new A({currentStep:1,validStep:[0],activity:null,customer:null,agreement:null,treated:!1}),this.customer={id:null,raison_sociale:"",siret:"",adresse_postale:"",email:"",telephone:null}}ngOnInit(){this.setForm(),this.lastActivities()}ngOnDestroy(){this.findedActivities=null}getStepButtonTitle(){return 3==this.subscription.currentStep?"Je finalise mon achat":"Poursuivre ma souscription "}showLoading(t){var i=this;return(0,w.Z)(function*(){i.loading=yield i.loadingCtrl.create({message:t}),i.loading.present()})()}lastActivities(){this.activities=null,this.subscribeService.getActivities().subscribe(t=>{1==t.status&&(this.activities=t.data,this.findedActivities=this.activities)})}searchActivities(){this.activities=null,this.subscribeService.searchActivities(this.query).subscribe(t=>{1==t.status&&(this.findedActivities=null,this.findedActivities=t.data)})}filter(t){this.query.length>=2&&(this.actionSubmitted=!0,this.findedActivities=null,setTimeout(()=>{this.searchActivities()},2e3))}setStep(t){console.log(t),this.subscription.currentStep=t}setActivity(t){this.subscription.activity=t,this.query=t.name,setTimeout(()=>{this.subscription.currentStep=2},2e3)}getAutocompleteLabel(){return this.actionSubmitted&&1==this.subscription.currentStep?"S\xe9lectionnez une activit\xe9 dans le r\xe9sultat":"Les activit\xe9 le plus recherche"}setForm(){this.formData=new c.cw({raison_sociale:new c.NI(this.customer.raison_sociale,{validators:[c.kI.required]}),siret:new c.NI(this.customer.siret,{validators:[c.kI.required]}),adresse_postale:new c.NI(this.customer.siret,{validators:[c.kI.required]}),email:new c.NI(this.customer.email,{validators:[c.kI.required]}),telephone:new c.NI(this.customer.telephone,{validators:[c.kI.required]})},{updateOn:"blur"})}saveCustomer(){"VALID"==this.formData.status&&(this.actionSubmitted=!0,this.subscription.customer={...this.subscription.customer,...this.formData.value},this.saveSubscription(this.formData.value))}saveSubscription(t){this.showLoading("Nous traitons vos donn\xe9es..."),this.subscribeService.saveSubscription(this.subscription).subscribe(i=>{console.log(i),1==i.status&&(this.loading.spinner=null,this.loading.message="Merci pour votre patience",setTimeout(()=>{this.loading.dismiss().then(()=>{this.subscription.currentStep=3})},2e3))})}downloadPDF(){this.subscribeService.downloadPDF("2").subscribe(t=>{switch(t.type){case d.dt.Sent:case d.dt.ResponseHeader:case d.dt.DownloadProgress:break;case d.dt.Response:const i=(window.URL||window.webkitURL).createObjectURL(t.body);window.open(i,"_blank"),setTimeout(()=>{window.URL.revokeObjectURL(i)},9e5)}})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(C),e.Y36(a.HT))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-subscribe"]],decls:11,vars:5,consts:[[3,"fullscreen"],[1,"main"],[1,"container"],[1,"box-subscribe"],["src","http://static.localhost/assets/img/simplis-logo-B100.svg","alt","L'assurance professionnelle des Auto-Entrepreneurs et des Ind\xe9pendants",1,"logo"],["color","secondary",1,"claimer"],[3,"current","stepEvent"],[4,"ngIf"],[3,"formGroup","ngSubmit",4,"ngIf"],[1,"loader"],["placeholder","Entrez du texte","id","query","name","query","helperText","Rechercher parmi nos profils assurables",3,"clearInput","ngModel","ngModelChange","keyup"],[1,"autocomplete"],[1,"scroller"],["class","loader",4,"ngIf"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],["name","dots","color","light"],[3,"formGroup","ngSubmit"],["type","text","formControlName","raison_sociale","label","Raison sociale","labelPlacement","floating","helperText","Le nom de votre entreprise","errorText","Ce champ est obligatoire","autocomplete","false","errorText","Ce champ est obligatoire",3,"clearInput"],["type","text","formControlName","siret","label","Siret","labelPlacement","floating","helperText","Votre numero de Siret","errorText","Ce champ est obligatoire","autocomplete","false",3,"clearInput"],["type","text","formControlName","adresse_postale","label","Adresse postale","helperText","L'adresse postale de votre societ\xe8","errorText","Ce champ est obligatoire","labelPlacement","floating","autocomplete","false",3,"clearInput"],["type","email","formControlName","email","label","Email","labelPlacement","floating","autocomplete","off","helperText","L'adresse e-mail avec laquelle nous pouvons vous \xe9crire","errorText","Ce champ est obligatoire",3,"clearInput"],["type","telephone","formControlName","telephone","label","T\xe9l\xe9phone","labelPlacement","floating","autocomplete","false","helperText","Le num\xe9ro de t\xe9l\xe9phone auquel nous pouvons vous joindre","errorText","Ce champ est obligatoire",3,"clearInput"],["S","","type","submit","color","secondary",3,"disabled"],["name","arrow-forward-circle-outline",4,"ngIf"],["name","arrow-forward-circle-outline"],[1,"step3"],["color","secondary"],[1,"downLoad"],["name","download-outline","aria-label","Download devis"],["type","submit","color","secondary"]],template:function(t,i){1&t&&(e.TgZ(0,"ion-content",0)(1,"div",1)(2,"div",2)(3,"div",3),e._UZ(4,"img",4),e.TgZ(5,"p",5),e._uU(6,'"C\'est parti pour vous assurer au meilleur tarif et en quelques clics !" '),e.qZA(),e.TgZ(7,"app-stepper",6),e.NdJ("stepEvent",function(s){return i.setStep(s)}),e.qZA(),e.YNc(8,q,12,5,"form",7),e.YNc(9,k,12,8,"form",8),e.YNc(10,L,19,3,"form",7),e.qZA()()()()),2&t&&(e.Q6J("fullscreen",!0),e.xp6(7),e.Q6J("current",i.subscription.currentStep),e.xp6(1),e.Q6J("ngIf",1==i.subscription.currentStep),e.xp6(1),e.Q6J("ngIf",2==i.subscription.currentStep),e.xp6(1),e.Q6J("ngIf",3==i.subscription.currentStep&&i.subscription.treated&&i.subscription.activity))},dependencies:[p.sg,p.O5,c._Y,c.JJ,c.JL,c.On,c.F,c.sg,c.u,a.YG,a.PM,a.FN,a.Zi,a.tO,a.Dq,a.W2,a.gu,a.pK,a.PQ,a.j9,E],styles:[".main[_ngcontent-%COMP%]{height:100vh;margin:30px 0;padding:0 10Px;width:100vw}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.box-subscribe[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;max-width:400px}.box-subscribe[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{width:200px}.box-subscribe[_ngcontent-%COMP%]   .claimer[_ngcontent-%COMP%]{text-align:center;color:var(--ion-color-secondary);font-size:.9rem}.box-subscribe[_ngcontent-%COMP%]   app-stepper[_ngcontent-%COMP%]{width:70%}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:100%;text-align:center;margin-top:1rem}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{border:thick solid var(--ion-color-primary);border-radius:15px;padding-bottom:2rem}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%], .box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]{color:#fff;background:var(--ion-color-primary);font-size:1em;padding:5px 15px;border-radius:10px}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]{margin:32px -12px -32px;border-top-left-radius:0;border-top-right-radius:0}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:1rem}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]   .scroller[_ngcontent-%COMP%]{height:135px;overflow-y:scroll;margin:0 0 20px}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:flex;flex-direction:column}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{flex:auto;padding:10px;font-size:.8rem;cursor:pointer;text-align:left;border-bottom:1px solid #fff}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:var(--ion-color-secondary)}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{text-align:left;margin:15px 0}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{margin-top:2rem}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   fieldset.step3[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary)}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   fieldset.step3[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]{font-size:4rem;font-weight:700}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   fieldset.step3[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%]{font-size:1rem;font-weight:700;text-transform:uppercase}.box-subscribe[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   fieldset.step3[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:3rem}@media screen and (min-device-width: 1200px){.box-subscribe[_ngcontent-%COMP%]{min-width:500px}}"]}),n})()}];let z=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[S.Bz.forChild(Q),S.Bz]}),n})(),D=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez]}),n})(),j=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[C],imports:[p.ez,c.u5,c.UX,a.Pc,D,z]}),n})()}}]);