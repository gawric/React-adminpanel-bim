import React, { lazy } from 'react'


async function NetworkDeleteThemeClassific(propsCallback , propsAlert , idTheme){
    console.log("NetworkDeleteThemeClassific ");
    console.log(idTheme);
    if(validData(idTheme) == true){
        await componentDidMount(propsCallback , propsAlert , idTheme) ;
    }
    else{
        console.log("NetworkDeleteThemeClassific не верные данные!")
        propsAlert.showAlertMessage("Не верные данные! "  , true)
    }
    
}

function validData(idTheme){
    if(idTheme == 0){
        return false;
    }

    return true;
}

async function componentDidMount(propsCallback, propsAlert , idTheme) {
    const requestOptions = {
        method: 'DELETE',
    };
    await fetch("http://localhost:8081/classifictheme-rest/removetheme/"+idTheme, requestOptions)
    .then(data => { 
        console.log("NetworkDeleteThemeClassific responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkDeleteThemeClassific responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkDeleteThemeClassific: > возвращаю пустоту!")
                 return "";
             }
        }

        propsCallback.callbackDeleteName(idTheme);
        return "{}"; 
    })
    
    .then(datum => {
      // propsCallback.callbackDeleteName(datum);
       console.log("NetworkDeleteThemeClassific-> Получили результат")
       console.log(datum)
      
    }).catch(err=>{
        //console.log(err)
        propsAlert.showAlertMessage("Сетевая ошибка " + err  , true)
    });
        
}



export default NetworkDeleteThemeClassific; 