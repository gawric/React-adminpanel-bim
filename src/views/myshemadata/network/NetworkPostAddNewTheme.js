import React, { lazy } from 'react'


async function NetworkPostAddNewTheme(propsCallback , propsAlert , nameTheme){
    console.log("NetworkAddNewTheme ");
    console.log(nameTheme);
    if(validData(nameTheme) == true){
        await componentDidMount(propsCallback , propsAlert , nameTheme) ;
    }
    else{
        console.log("NetworkAddNewTheme не верные данные!")
        propsAlert.showAlertMessage("Не верные данные! "  , true)
    }
    
}

function validData(nameTheme){
    if(nameTheme.trim() === ""){
        return false;
    }

    return true;
}




async function componentDidMount(propsCallback, propsAlert , nameTheme) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: nameTheme})
    };
    await fetch("http://localhost:8081/classifictheme-rest/addtheme", requestOptions)
    .then(data => { 
        console.log("NetworkPostAddNewTheme responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkPostAddNewTheme responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkPostAddNewTheme: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
       propsCallback.callbackAddNewRequest(datum);
       console.log("NetworkPostAddNewTheme-> Получили результат")
       console.log(datum)
      
    }).catch(err=>{
        //console.log(err)
        propsAlert.showAlertMessage("Сетевая ошибка " + err  , true)
    });
        
}



export default NetworkPostAddNewTheme; 