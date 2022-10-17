import React, { lazy } from 'react'


function RemoveItemArr(arrIn , code_id){
    var arrDel = [];
    console.log("RemoveItemArr -> " + code_id)
    arrIn.map((item , index)=>{
        if(item.code_id == code_id){
          console.log("RemoveItemArr -> НАШЛИ" + code_id)
          arrDel.push(item.code_id)
        }
      })



    return  arrIn.filter(item => !arrDel.includes(item.code_id));
}






export default RemoveItemArr; 