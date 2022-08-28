import { validation } from "./validation.js";

//listening for a submit
Array.from(document.querySelectorAll("form")).forEach((e)=>{e.addEventListener("submit",submitForm)});

function submitForm(e){
    e.preventDefault();
    //getting form 
    const form =  e.target;
    validation(form);
    
}
