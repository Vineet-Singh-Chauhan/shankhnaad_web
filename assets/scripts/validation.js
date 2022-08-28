import { setErrorMsg, setSuccessMsg ,saveContactInfo,createNewUser,dbref,createCampusAmbassador } from "./utilities.js";
import {checkreferral} from "../referralCodes/sample.js"
import {get,child} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

export async function validation(form){
    let nameregex =/^[a-zA-Z][a-zA-Z\s]+$/;
    let emailregex = /[a-zA-Z0-9]+@(gmail|yahoo|outlook|duck)\.com/;
    let phoneregex = /^[6-9]\d{9}$/;

    //reading Inputs
    const name =  form.querySelector(".name").value;
    const email = form.querySelector(".email").value;
    const phone = form.querySelector(".phone").value;


    // Universal Validation
    if(!nameregex.test(name)){
        setErrorMsg( form.querySelector(".name"), "Please fill this field. Name should contain alphabets only");
        return;
    }
    else{
        setSuccessMsg(form.querySelector(".name"));
    }
    if(!emailregex.test(email)){
        setErrorMsg( form.querySelector(".email"), "Enter a valid e-mail address");
        return;
    }
    else{
        setSuccessMsg(form.querySelector(".email"));
    }
    if(!phoneregex.test(phone)){
        setErrorMsg( form.querySelector(".phone"), "Enter a valid mobile number");
        return;
    }
    else{
        setSuccessMsg( form.querySelector(".phone"));
    }
    

    //Entries for contact Form
    if(form.classList.contains("contact-form")){
        const message = form.querySelector(".message").value;

    //Contact Form specific Validations
        if(message.trim()==0){
            setErrorMsg( form.querySelector(".message"), "Message cannot be blank ");
            return;
        }
        else{
            setSuccessMsg( form.querySelector(".message"));
        }
        saveContactInfo(form,name,email,phone,message);
    }

    //Entries for registration Forms 
    else if(form.classList.contains("registration-form")){
        let   branch = form.querySelector(".branch").value;
        const year = form.querySelector(".year").value;
        const refCode = (form.querySelector(".ref-code").value);
        const events = form.querySelectorAll(".event");
        const selectedEvents = [];
        Array.from(events).forEach((e)=>{
            if(e.checked){
                selectedEvents.push(e.value);
            }
        })

        //Registration Form specific Validations
        if(branch==0){
            setErrorMsg( form.querySelector(".branch"), "Please select your branch ");
            return;
        }
        else{
            setSuccessMsg( form.querySelector(".branch"));
        }

        if(year==0){
            setErrorMsg( form.querySelector(".year"), "Please select your year ");
            return;
        }
        else{
            setSuccessMsg( form.querySelector(".year"));
        }
       
        if(await checkreferral(refCode)){
            setSuccessMsg( form.querySelector(".ref-code"));
        }
        else{
            
            setErrorMsg(form.querySelector(".ref-code"),"Invalid referral code");
            return;
        }
        if(selectedEvents.length==0){
            alert("Please select atleast one event to participate");
            return;
        }
        createNewUser(form,name,email,phone,branch,year,refCode,selectedEvents);

    //     get(child(dbref,"Registrations/"+name)).then( async (snapshot)=>{
    //     if(snapshot.exists()){
    //         alert("This User already exists");
    //     }
    //     else{
            
    //         if(await checkreferral(refCode)){
    //             //PENDING TO SETSUCCESSMSG
    //         }
    //         else{
                
    //             //PENDING TO SETERRORMSG
    //             alert("Invalid referral code");
    //             return;
    //         }
    //      createNewUser(form,name,email,phone,branch,year,refCode,selectedEvents);
    //     }
    // })        
    }

    //entries for CampusAmbassador form
    else if(form.classList.contains("campusAmbassadorRegistration")){
        const refCode = (form.querySelector(".ref-code").value);
        const regScore = (form.querySelector(".regScore").value);
        const initScore = (form.querySelector(".initScore").value);

    //Campus Ambassador Form specific Validations
        if(refCode===""){
            setErrorMsg(form.querySelector(".ref-code"),"Referral Code cannot be blank");
            return;
        }
        else{
            setSuccessMsg(form.querySelector(".ref-code"));
        }

        if(initScore===""){
            setErrorMsg(form.querySelector(".initScore"),"Initial Score cannot be blank");
            return;
        }
        else{
            setSuccessMsg(form.querySelector(".initScore"));
        }
        
        get(child(dbref,`campusAmbassadors/`+refCode)).then((snapshot)=>{
            if(snapshot.exists()){
                alert("This User already exists");
            }
            else{
                createCampusAmbassador(form,name,email,phone,refCode,regScore,initScore);
            }
        })
    }
}