import React, { lazy } from 'react'


async function NetworkPostGetItemsRules(propsSelectData , props , propsAlert){
    console.log("NetworkPostGetItemsRules>>>> ")
    console.log(props)
    await componentDidMount(propsSelectData , props , propsAlert);
}

function isValid(value){

}

async function componentDidMount(propsSelectData , props ,propsAlert) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({classific_id: propsSelectData.selectClassific , 
            theme_id: propsSelectData.selectTheme ,
            datetime: propsSelectData.selectDataScaner})};

    await fetch("http://localhost:8081/dashboard-rest/getListRules", requestOptions)
    .then(data => { 
        //console.log("NetworkPostSelectData responce ");
        //console.log(data)
        if (!data.ok) {
            if(data.status != 404){
               // console.log("NetworkPostSelectData responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                // console.log("Данные NetworkPostSelectData: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
        console.log("NetworkPostGetItemsRules Result>>>>>")
        console.log(datum)
        props.callbackGetRulesItem(datum);
    }).catch(err=>{
        console.log(err)
        //propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkPostGetItemsRules; 