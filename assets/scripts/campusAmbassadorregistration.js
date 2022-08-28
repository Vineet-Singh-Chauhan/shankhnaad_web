// import { validation } from "./validation";

document.querySelector(".campusAmbassadorRegistration").addEventListener("submit",submitForm);
function submitForm(e){
    e.preventDefault();
    
    //getting input values 
    const form =  e.target;
    const name =  form.querySelector(".name").value.trim();
    const email = form.querySelector(".email").value;
    const phone = form.querySelector(".phone").value;

    if(form.classList.contains("contact-form")){
        const message = form.querySelector(".message").value;
        validation(form,name,email,phone,message);
    }
    else if(form.classList.contains("campusAmbassadorRegistration")){
        const refCode = (form.querySelector(".ref-code").value);
        const regScore = (form.querySelector(".regScore").value);
        const initScore = (form.querySelector(".initScore").value);

        validation(form,name,email,phone,refCode,regScore,initScore)
    }
    else if(form.classList.contains("registration-form")){
        let branch = form.querySelector(".branch").value;
        const year = form.querySelector(".year").value;
        const refCode = (form.querySelector(".ref-code").value);
        const message = null;
        const events = form.querySelectorAll(".event");
        const selectedEvents = [];
        Array.from(events).forEach((e)=>{
            if(e.checked){
                selectedEvents.push(e.value);
            }
        })
        validation(form,name,email,phone,message,branch,year,refCode,selectedEvents);
    }
}