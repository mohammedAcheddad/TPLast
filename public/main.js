import { addMemo } from "./Quest.js";

const submit = document.getElementById("submit")
const input = document.getElementById("input")
const select = document.getElementById("select")


submit.addEventListener('click', ()=>{
    console.log("hello")
    const a = input.value 
    const b = select.value
    addMemo(a,b);
})