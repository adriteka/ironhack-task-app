import{r as d,c,b as e,w as l,v as r,e as v,k as n,i as _,j as f,F as w,h as g,a as b,m as h}from"./index.d2713152.js";import{u as y}from"./tasks.00301769.js";import"./supabase.c5c58315.js";const k=e("h3",null,"Log In",-1),x=e("label",{for:"email"},"E-mail",-1),S=e("label",{for:"password"},"Password",-1),V=e("button",{type:"submit"},"Log in!",-1),E={__name:"Login",setup(N){const i=h(),u=y(),t=d({email:{value:"",error:!1},password:{value:"",error:!1}}),m=async()=>{try{await u.logIn("abcn007@gmail.com","123456"),i.push({name:"home"})}catch(s){console.log("on submit login:",s)}};return(s,o)=>{const p=g("router-link");return b(),c(w,null,[k,e("form",{onSubmit:o[2]||(o[2]=v(a=>m(),["prevent"]))},[x,l(e("input",{"onUpdate:modelValue":o[0]||(o[0]=a=>t.value.email.value=a),type:"email",id:"email"},null,512),[[r,t.value.email.value]]),S,l(e("input",{"onUpdate:modelValue":o[1]||(o[1]=a=>t.value.password.value=a),type:"password",id:"password"},null,512),[[r,t.value.password.value]]),V],32),e("p",null,[n(" Not registered yet? "),_(p,{to:{name:"signup"}},{default:f(()=>[n("Sign up!")]),_:1})])],64)}}};export{E as default};
