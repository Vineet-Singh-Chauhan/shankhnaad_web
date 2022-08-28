function handleIndividualForm(){
    document.querySelector(".individualRegistration").classList.remove("d-none");
    document.querySelector(".teamRegistration").classList.add("d-none");
}
function handleTeamForm(){
    document.querySelector(".individualRegistration").classList.add("d-none");
    document.querySelector(".teamRegistration").classList.remove("d-none");
}