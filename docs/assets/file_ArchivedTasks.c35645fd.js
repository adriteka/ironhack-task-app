import{_ as r,a as c,y as d,o as n,c as _,q as i,m as l,e as p,b as u,p as k}from"./file_index.c2aba5fc.js";import{T as m}from"./file_TaskList.273c2a4d.js";const v={__name:"ArchivedTasks",setup(f){const t=c(),a=(e,s)=>e.completedAt<s.completedAt?1:-1,o=d(()=>(console.log("computed archived"),t.tasks.filter(e=>e.isArchived).sort((e,s)=>a(e,s))));return n(async()=>{await t.getAllTasks()}),(e,s)=>(u(),_("div",null,[i(m,{tasks:p(o)},{default:l(()=>[k("Archived Completed Tasks")]),_:1},8,["tasks"])]))}},T=r(v,[["__scopeId","data-v-8dbb45a1"]]);export{T as default};