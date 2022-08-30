import { setErrorMsg, setSuccessMsg ,saveContactInfo,createIndividualUser,createTeamUser,dbref,createCampusAmbassador } from "./utilities.js";
import {checkreferral} from "../referralCodes/sample.js"
import {get,child} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

export async function validation(form){

    let nameregex =/^[a-zA-Z][a-zA-Z\s]+$/;
    let emailregex = /[a-zA-Z0-9]+@(gmail|yahoo|outlook|duck)\.com/;
    let phoneregex = /^[6-9]\d{9}$/;

    //reading Inputs
    const name =  form.querySelector(".name");
    const email = form.querySelector(".email");
    const phone = form.querySelector(".phone");


    // Universal Validation
    if(!nameregex.test(name.value)){
        setErrorMsg(name, "Please fill this field. Name should contain alphabets only");
        return;
    }
    else{
        setSuccessMsg(name);
    }



    if(!emailregex.test(email.value)){
        setErrorMsg(email, "Enter a valid e-mail address");
        return;
    }
    else{
        setSuccessMsg(email);
    }


    if(!phoneregex.test(phone.value)){
        setErrorMsg(phone, "Enter a valid mobile number");
        return;
    }
    else{
        setSuccessMsg(phone);
    }
    

    //Entries for contact Form
    if(form.classList.contains("contact-form")){
        const message = form.querySelector(".message");

        
        //Contact Form specific Validations
        if(message.value.trim()==0){
            setErrorMsg( message, "Message cannot be blank ");
            return;
        }
        else{
            setSuccessMsg( message);
        }
        saveContactInfo(form,name.value,email.value,phone.value,message.value);
    }


    //Entries for registration Forms 
    else if(form.classList.contains("registration-form")){
        
        const whatsApp = form.querySelector(".whatsappNumber");
        const candidateType  = form.querySelector(".candidateType");
        const institute  = form.querySelector(".institute");
        const city = form.querySelector(".city");
        const sample = form.querySelector(".sample");
        const refCode = (form.querySelector(".ref-code"));
        const ID = form.querySelector(".ID");
        const events = form.querySelectorAll(".event");
        const infoSource = form.querySelector(".infoSource");
        const otherInstitute  = form.querySelector(".customInput");
        const selectedEvents = [];
        Array.from(events).forEach((e)=>{
            if(e.checked){
                selectedEvents.push(e.value);
            }
        })

        //Registration Form specific Validations
        
        if(whatsApp.value!=""){
            if(!phoneregex.test(whatsApp.value)){
                setErrorMsg( whatsApp, "Invalid Number");
                return;
            }
            else{
                setSuccessMsg(whatsApp);
            }
        }
        if(candidateType.value==0){
            setErrorMsg( candidateType, "Please select an option");
            return;
        }
        else{
            setSuccessMsg(candidateType)
        }

        let instituteName = null;
        if(institute.value==0||institute.value==""){
            setErrorMsg(institute,"Please select an option");
            return;
        }
        else{
            
            if(institute.value=="OTHER"){
                
                
                if(otherInstitute.value==""){
                    setErrorMsg(institute,"Please select an option");
                    return;
                }
                else{
                    instituteName = otherInstitute.value;
                }
               ;
                
            }
            institute.value!="OTHER"?instituteName = institute.value:instituteName = otherInstitute.value ;
            setSuccessMsg(institute);
        }
        if(sample.value==0||sample.value==""){
            setErrorMsg(sample,"This field cannot be blank");
            return;
        }
        else{
            setSuccessMsg(sample);
        }
        if(ID.value==0||ID.value==""){
            setErrorMsg(ID,"This field cannot be blank");
            return;
        }else{
            setSuccessMsg(ID);
        }

       
        if(await checkreferral(refCode.value)){
            setSuccessMsg( refCode);
        }
        else{
            
            setErrorMsg(refCode,"Invalid referral code");
            return;
        }
        if(selectedEvents.length==0){
            alert("Please select atleast one event to participate");
            return;
        }


        //Entries for Individual registration
        if(form.classList.contains("individualRegistration")){
            const age = form.querySelector(".age");
            const course = form.querySelector(".course");
            const yearOrClass = form.querySelector(".year_or_class");


            //Individual Specific Validations
            if(age.value==""||age.value==0){
                setErrorMsg(age,"Please enter a valid age")
                return;
            }
            else{
                setSuccessMsg(age);
            }

            const infoPack = {
                name:name.value,
                age:age.value,
                email:email.value,
                phone:phone.value,
                whatsApp:whatsApp.value,
                candidateType:candidateType.value,
                institute:instituteName,
                city:city.value,
                course:course.value,
                yearOrClass:yearOrClass.value,
                sample:sample.value,
                refCode:refCode.value,
                ID:ID.value,
                selectedEvents:selectedEvents,
                infoSource:infoSource.value,
            }
            createIndividualUser(form,infoPack);
        }

        //Entries for team registration
        else if(form.classList.contains("teamRegistration")){

            const teamName = document.querySelector(".teamName");
            const teamSize = document.querySelector(".teamSize");

            // team specific validations
            if(!nameregex.test(teamName.value)){
                setErrorMsg(teamName, "Please fill this field. Name should contain alphabets only");
                return;
            }
            else{
                setSuccessMsg(teamName);
            }
            if(teamSize.value<=1){
                setErrorMsg(teamSize, "Please fill this field. Team size must be 2 or more");
                return;
            }
            else{
                setSuccessMsg(teamSize);
            }

            const infoPack = {
                teamName:teamName.value,
                teamSize:teamSize.value,
                leaderName:name.value,
                email:email.value,
                phone:phone.value,
                whatsApp:whatsApp.value,
                candidateType:candidateType.value,
                institute:instituteName,
                city:city.value,
                sample:sample.value,
                refCode:refCode.value,
                ID:ID.value,
                selectedEvents:selectedEvents,
                infoSource:infoSource.value,
            }
            createTeamUser(form,infoPack);
        }


       
    }


    //entries for CampusAmbassador form
    else if(form.classList.contains("campusAmbassadorRegistration")){
        const refCode = (form.querySelector(".ref-code"));
        const regScore = (form.querySelector(".regScore"));
        const initScore = (form.querySelector(".initScore"));

    //Campus Ambassador Form specific Validations
        if(refCode.value===""){
            setErrorMsg(refCode,"Referral Code cannot be blank");
            return;
        }
        else{
            setSuccessMsg(refCode);
        }

        if(initScore.value===""){
            setErrorMsg(initScore,"Initial Score cannot be blank");
            return;
        }
        else{
            setSuccessMsg(initScore);
        }

        
        
        get(child(dbref,`campusAmbassadors/`+refCode.value)).then((snapshot)=>{
            if(snapshot.exists()){
                alert("This User already exists");
            }
            else{
                createCampusAmbassador(form,name.value,email.value,phone.value,refCode.value,regScore.value,initScore.value);
            }
        })
    }
}