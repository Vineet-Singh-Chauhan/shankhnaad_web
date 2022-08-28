import {db} from "../firebase/firebase.js"
import {ref,query,orderByChild, onValue} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

const que = query(ref(db,"campusAmbassadors"),orderByChild("regScore"));

function render(arr){
    let SNo=0;
    let table= document.querySelector(".tablebody");
    table.innerHTML="";
    arr.forEach((e)=>{
      const newRow = document.createElement('tr');
      newRow.innerHTML = `<tr><th scope="row">${++SNo}</th><td class="CAName">${e[0]}</td><td class="CAScore">${e[1]}</td><tr>`
      table.appendChild(newRow);
    })
}

function getDataRealTime(){
  onValue(que,(snapshot)=>{
        if(snapshot.exists()){
          const map1 = new Map();
          snapshot.forEach((e)=>{
            map1.set(e.val().name,e.val().regScore)
          })
          let arr=[...map1].sort((a, b) => (a[1] < b[1]) ? 1 : (a[1] === b[1]) ? ((a[0]> b[0]) ? 1 : -1) : -1 );
          render(arr)
        }
    })
}
getDataRealTime()
