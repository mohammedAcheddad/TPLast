import { addMemo } from "./Quest.js";
let i = 0;
const submit = document.getElementById("submit")
const input = document.getElementById("input")
const select = document.getElementById("select")


submit.addEventListener('click', ()=>{
    const a = input.value 
    const b = select.value
    addMemo(a,b,i);
    i = i+1
})