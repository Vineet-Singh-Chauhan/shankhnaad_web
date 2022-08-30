import {db} from "../firebase/firebase.js"
import {ref,get,set,child,update} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
//email template
import {emailBody} from "../email_templates/template1.js";
export const dbref =ref(db);


//setting error and suceess msgs
export function setErrorMsg(input, errormsgs){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    const icon = formControl.querySelector('.fa-circle-exclamation');
    small.classList.add("text-danger","d-block");
    small.classList.remove("text-success","d-none");
    icon.classList.add("text-danger","visible");
    icon.classList.remove("text-success","invisible");
    formControl.querySelector('.fa-circle-check').classList.remove("text-success","visible");
    small.innerText=errormsgs;
}
export function setSuccessMsg(input){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    const icon = formControl.querySelector('.fa-circle-check');
    small.classList.remove("d-block");
    small.classList.add("d-none");
    formControl.querySelector('.fa-circle-exclamation').classList.remove("text-danger","visible");
    formControl.querySelector('.fa-circle-exclamation').classList.add("text-danger","invisible");
    icon.classList.add("text-success","visible");
}


//save infos to firebase
export function saveContactInfo(form,name,email,phone,message){
    set(ref(db,"Queries/"+name),{
        userEmail : email,
        userPhone : phone,
        query:message
    }).then(()=>{
        swal("Recieved! "+ name, "Your message has been recieved , we will reply shortly", "success");
        clearForm(form);
        
    }).catch(()=>{
        swal("Error! " , "Something went wrong,Try again later. If error persist contact our team ", "error");
        clearForm(form);
    })
} 


export function createIndividualUser(form,infoPack){
    let count = 0;
    infoPack.selectedEvents.forEach((e)=>{
        
            set(ref(db,`Registrations/individualRegistrations/${e}/`+infoPack.name),{
                age   : infoPack.age,
                email : infoPack.email,
                phone : infoPack.phone,
                whatsApp:infoPack.whatsApp,
                candidateType:infoPack.candidateType,
                institute:infoPack.institute,
                city:infoPack.city,
                course:infoPack.course,
                yearOrClass:infoPack.yearOrClass,
                sample:infoPack.sample,
                refCode:infoPack.refCode,
                ID:infoPack.ID,
                infoSource:infoPack.infoSource,
            }).then(count++)
        
    })
   
    const registrationCompleted = () => {
        swal("Hurray! "+ infoPack.name, "You have been registered successfully", "success");
        clearForm(form);
        sendMail(true,infoPack.email);
        
    }
    if(count==infoPack.selectedEvents.length){
        registrationCompleted();
    }
    else{
        swal("Error! " , "Something went wrong,Try again later. If error persist contact our team ", "error");
        clearForm(form);
        sendMail(false,infoPack.email);
    }
}


export function createTeamUser(form,infoPack){
    let count = 0;
    infoPack.selectedEvents.forEach((e)=>{
        
            set(ref(db,`Registrations/teamRegistrations/${e}/`+infoPack.teamName),{
                leaderName: infoPack.leaderName,
                teamSize   : infoPack.teamSize,
                email : infoPack.email,
                phone : infoPack.phone,
                whatsApp:infoPack.whatsApp,
                candidateType:infoPack.candidateType,
                institute:infoPack.institute,
                city:infoPack.city,
                sample:infoPack.sample,
                refCode:infoPack.refCode,
                ID:infoPack.ID,
                infoSource:infoPack.infoSource,
            }).then(count++)
        
    })
   
    const registrationCompleted = () => {
        swal("Hurray! "+ infoPack.leaderName, "You have been registered successfully", "success");
        clearForm(form);
        sendMail(true,infoPack.email);
        
    }
    if(count==infoPack.selectedEvents.length){
        registrationCompleted();
    }
    else{
        swal("Error! " , "Something went wrong,Try again later. If error persist contact our team ", "error");
        clearForm(form);
        sendMail(false,infoPack.email);
    }
}





// export function createNewUser(form,name,email,phone,branch,year,refCode,selectedEvents){
//     let count = 0;
//     selectedEvents.forEach((e)=>{
//         if(form.classList.contains("individualRegistration")){
//             set(ref(db,`Registrations/individualRegistrations/${e}/`+name),{
//                 userEmail : email,
//                 userPhone : phone,
//                 userBranch:branch,
//                 userYear:year,
//                 refCode:refCode,
                
//             }).then(count++)
//         }
//         else if(form.classList.contains("teamRegistration")){
//             set(ref(db,`Registrations/teamRegistrations/${e}/`+name),{
//                 userEmail : email,
//                 userPhone : phone,
//                 userBranch:branch,
//                 userYear:year,
//                 refCode:refCode
//             }).then(count++)
//         }
        
//     })
   
//     const registrationCompleted = () => {
//         swal("Hurray! "+ name, "You have been registered successfully", "success");
//         clearForm(form);
//         sendMail(true,email);
        
//     }
//     if(count==selectedEvents.length){
//         registrationCompleted();
//     }
//     else{
//         swal("Error! " , "Something went wrong,Try again later. If error persist contact our team ", "error");
//         clearForm(form);
//         sendMail(false,email);
//     }
// }


export function createCampusAmbassador(form,name,email,phone,refCode,regScore,initScore){
    set(ref(db,"campusAmbassadors/"+refCode),{
        name:name,
        email : email,
        phone : phone,
        regScore:regScore,
        initScore:initScore,
        finalScore:""
    }).catch(()=>{
        swal("Error! " , "Something went wrong,Try again later. If error persist contact our team ", "error");
        clearForm(form);
    })
}



//sending mail

function sendMail(regStatus,email){
    if(regStatus){
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "vineetschauhan4@gmail.com",
            Password : "7586D602325D5DA935D0E99A92E168D22EAF",
            To : `${email}`,
            From : "vineetschauhan4@gmail.com",
            Subject : `Shanknaad registration ${regStatus?" Successful ":" unsuccessful"}`,
            Body : `${emailBody}`
        });
    }
}

//clear form
export function clearForm(form){
    form.reset();
        Array.from(form.querySelectorAll(".fa-circle-check")).forEach((element)=>{
            element.classList.add("invisible");
            element.classList.remove("visible");
        });
}
