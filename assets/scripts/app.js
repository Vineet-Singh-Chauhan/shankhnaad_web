// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuAD2I1GWL7-j8aPhRQJRxpDLMRwF-mHk",
  authDomain: "shakhnaad.firebaseapp.com",
  projectId: "shakhnaad",
  storageBucket: "shakhnaad.appspot.com",
  messagingSenderId: "107472168572",
  appId: "1:107472168572:web:1fc946bd3d09f13d7f4bf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {getDatabase,ref,set,child,update,remove} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
const db = getDatabase();




// js scripts

//listening for a submit
document.querySelector(".contact-form").addEventListener("submit",submitForm);
document.querySelector(".registration-form").addEventListener("submit",submitForm);
function submitForm(e){
    e.preventDefault();
    //getting input values 
    const form = e.target.parentElement.querySelector("form");
    const name = form.querySelector(".name").value;
    const email = form.querySelector(".email").value;
    const phone = form.querySelector(".phone").value;
    const message = form.querySelector(".message").value;
    validation(form,name,email,phone,message);
    
}

//setting error and suceess msgs
function setErrorMsg(input, errormsgs){
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
function setSuccessMsg(input){
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
function saveContactInfo(form,name,email,phone,message){
    set(ref(db,"queries/"+message),{
        userEmail : email,
        userPhone : phone,
        userName:name
    }).then(()=>{
        swal("Recieved! "+ name, "Your message has been recieved , we will reply shortly", "success");
        form.reset();
        Array.from(form.querySelectorAll(".fa-circle-check")).forEach((element)=>{
            element.classList.add("invisible");
            element.classList.remove("visible");
        })
        
    }).catch(()=>{
        swal("Error! " , "Something went wrong,Try again later. If error persist contact our team ", "error");
        form.reset();
        Array.from(form.querySelectorAll(".fa-circle-check")).forEach((element)=>{
            element.classList.add("invisible");
            element.classList.remove("visible");
        })
    })
}




function validation(form,name,email,phone,message){
    let nameregex =/^[a-zA-Z][a-zA-Z\s]+$/;
    let emailregex = /[a-zA-Z0-9]+@(gmail|yahoo|outlook|duck)\.com/;
    let phoneregex = /^[6-9]\d{9}$/;

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
    if(message.trim()==0){
        setErrorMsg( form.querySelector(".message"), "Message cannot be blank ");
        return;
    }
    else{
        setSuccessMsg( form.querySelector(".message"));
    }

    saveContactInfo(form,name,email,phone,message);
}