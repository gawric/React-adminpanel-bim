import React, { lazy } from 'react'


async function NetworkChangeNameThemeClassific(propsCallback , propsAlert , classifictheme_id , nameTheme){
    console.log("NetworkChangeNameThemeClassific ");
    console.log(classifictheme_id);
    console.log(nameTheme);
    await componentDidMount(propsCallback , propsAlert , classifictheme_id , nameTheme) ;
}

async function componentDidMount(propsCallback, propsAlert , classifictheme_id , nameTheme) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/classifictheme-rest/changetheme?nametheme="+nameTheme+"&classifictheme_id="+classifictheme_id, requestOptions)
    .then(data => { 
        console.log("NetworkChangeNameThemeClassific responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkChangeNameThemeClassific responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkChangeNameThemeClassific: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
       propsCallback.callbackChangeName(datum);
       //console.log("NetworkChangeNameThemeClassific-> Получили результат")
       //console.log(datum)
      
    }).catch(err=>{
        //console.log(err)
        propsAlert.showAlertMessage("Сетевая ошибка " + err  , true)
    });
        
}



export default NetworkChangeNameThemeClassific; 