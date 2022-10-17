import React, { lazy } from 'react'


async function NetworkDeleteCode(propsCallback , propsAlert , code_id , propsShow){
    //console.log("NetworkDeleteCode ");
    //console.log(code_id);
    propsShow.alertNetworkShowMessageInfo("Загрузка данных" , true)
    if(validData(code_id) == true){
        await componentDidMount(propsCallback , propsAlert , code_id) ;
    }
    else{
        //console.log("NetworkDeleteCode не верные данные!")
        propsAlert.showAlertMessage(true , " Не верные данные! ")
    }
    
}

function validData(code_id){
    if(code_id == 0){
        return false;
    }

    return true;
}

async function componentDidMount(propsCallback, propsAlert , code_id) {
    const requestOptions = {
        method: 'DELETE',
    };
    await fetch("http://localhost:8081/code-rest/removecode/"+code_id, requestOptions)
    .then(data => { 
        console.log("NetworkDeleteCode responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkDeleteCode responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkDeleteCode: > возвращаю пустоту!")
                 return "";
             }
        }

        propsCallback.callbackRemove(code_id);
        return "{}"; 
    })
    
    .then(datum => {
      // propsCallback.callbackDeleteName(datum);
       console.log("NetworkDeleteCode-> Получили результат")
       console.log(datum)
      
    }).catch(err=>{
        //console.log(err)
        propsAlert.showAlertMessage(true , "Сетевая ошибка " + err)
    });
        
}



export default NetworkDeleteCode; 