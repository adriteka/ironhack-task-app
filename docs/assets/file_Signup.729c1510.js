import{_ as P,u as E,r,o as V,c as U,d as s,w as p,v as d,n as c,q as n,k as _,g as z,p as m,m as I,F as B,j as w,b as C,D,E as M,x as N}from"./file_index.c2aba5fc.js";const l=t=>(D("data-v-7acf86a2"),t=t(),M(),t),A=l(()=>s("h3",{class:"title is-5"},"Sign Up",-1)),F={class:"field"},T=l(()=>s("label",{for:"email",class:"label is-size-7-5 is-uppercase"},"E-mail",-1)),$={class:"control has-icons-left"},j={class:"icon is-small is-left"},q={class:"help is-danger"},L={class:"field"},G=l(()=>s("label",{for:"password",class:"label is-size-7-5 is-uppercase"},"Password",-1)),H={class:"control has-icons-left"},J={class:"icon is-small is-left"},K={class:"help is-danger"},O={class:"field"},Q=l(()=>s("label",{for:"password-repeat",class:"label is-size-7-5 is-uppercase"},"Repeat password",-1)),W={class:"control has-icons-left"},X={class:"icon is-small is-left"},Y={class:"help is-danger"},Z=l(()=>s("div",{class:"field is-center"},[s("button",{type:"submit",class:"button mt-4"},"Sign up")],-1)),ee={class:"alternative has-text-grey"},se={__name:"Signup",setup(t){const h=E(),g=N(),e=r({email:{value:"",error:null},password:{value:"",error:null},passwordRepeat:{value:"",error:null}}),i=r(null),v=r(null),f=r(null),k=()=>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(e.value.email.value)?(e.value.email.error=null,!0):(e.value.email.error="E-mail should look like 'name@domain.com'",!1),y=()=>e.value.password.value.length<6?(e.value.password.error="Password should be at least 6 characters",!1):(e.value.password.error=null,!0),b=()=>e.value.password.value!==e.value.passwordRepeat.value?(e.value.passwordRepeat.error="Passwords do not match",!1):(e.value.passwordRepeat.error=null,!0),R=async()=>{if(!k()){i.value.focus();return}if(!y()){v.value.focus();return}if(!b()){f.value.focus();return}await h.signUp(e.value.email.value,e.value.password.value),g.push({name:"login"})};return V(()=>{i.value.focus()}),(S,a)=>{const u=w("font-awesome-icon"),x=w("router-link");return C(),U(B,null,[A,s("form",{onSubmit:a[3]||(a[3]=z(o=>R(),["prevent"]))},[s("div",F,[T,s("p",$,[p(s("input",{"onUpdate:modelValue":a[0]||(a[0]=o=>e.value.email.value=o),ref_key:"inputEmail",ref:i,type:"text",id:"email",placeholder:"Enter your e-mail",class:c(["input",{"is-danger":e.value.email.error}])},null,2),[[d,e.value.email.value]]),s("span",j,[n(u,{icon:"fa-solid fa-envelope"})])]),s("p",q,_(e.value.email.error),1)]),s("div",L,[G,s("p",H,[p(s("input",{"onUpdate:modelValue":a[1]||(a[1]=o=>e.value.password.value=o),ref_key:"inputPassword",ref:v,type:"password",id:"password",placeholder:"\u25CF \u25CF \u25CF \u25CF \u25CF \u25CF",class:c(["input",{"is-danger":e.value.password.error}])},null,2),[[d,e.value.password.value]]),s("span",J,[n(u,{icon:"fa-solid fa-lock"})])]),s("p",K,_(e.value.password.error),1)]),s("div",O,[Q,s("p",W,[p(s("input",{"onUpdate:modelValue":a[2]||(a[2]=o=>e.value.passwordRepeat.value=o),ref_key:"inputPasswordRepeat",ref:f,type:"password",id:"password-repeat",placeholder:"\u25CF \u25CF \u25CF \u25CF \u25CF \u25CF",class:c(["input",{"is-danger":e.value.passwordRepeat.error}])},null,2),[[d,e.value.passwordRepeat.value]]),s("span",X,[n(u,{icon:"fa-solid fa-lock"})])]),s("p",Y,_(e.value.passwordRepeat.error),1)]),Z],32),s("div",ee,[s("p",null,[m(" Already have an account? "),n(x,{to:{name:"login"}},{default:I(()=>[m("Log in")]),_:1})])])],64)}}},oe=P(se,[["__scopeId","data-v-7acf86a2"]]);export{oe as default};
