function handleIndividualForm(){
    document.querySelector(".toggleIndividualEvents").classList.add("blur-bg");
    document.querySelector(".toggleGroupEvents").classList.remove("blur-bg");
    document.querySelector(".individualRegistration").classList.remove("d-none");
    document.querySelector(".teamRegistration").classList.add("d-none");
}
function handleTeamForm(){
    document.querySelector(".toggleIndividualEvents").classList.remove("blur-bg");
    document.querySelector(".toggleGroupEvents").classList.add("blur-bg");
    document.querySelector(".individualRegistration").classList.add("d-none");
    document.querySelector(".teamRegistration").classList.remove("d-none");
}
function togglefield(x){
    const customInput = document.querySelector(".customInput");
    if(x){
        customInput.classList.remove("d-none");
    }
    else{
    customInput.classList.add("d-none"); 
}
}