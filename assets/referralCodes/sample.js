import {db} from "../firebase/firebase.js"
import {ref,get,set,child,update} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import { dbref } from "../scripts/utilities.js";

export async function checkreferral(refCode){
    if(refCode==""){
        return true;
    }
    let referralStatus = false;
    
    await get(child(dbref,`/campusAmbassadors/${refCode}`)).then((snapshot)=>{
        if(snapshot.exists()){
            referralStatus = true;
            const updates={};
            let _currscore=snapshot.val()['regScore'];
            _currscore++;
            updates[`/campusAmbassadors/${refCode}/regScore` ] = _currscore;
            return update(ref(db), updates);
        }
        else{
            referralStatus = false;
        }
    })
    
    
    return referralStatus
}