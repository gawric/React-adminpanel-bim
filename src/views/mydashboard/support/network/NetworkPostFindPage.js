import React, { lazy } from 'react'


async function NetworkPostFindPage(propsSelectData , props , propsAlert , page){
    console.log("NetworkPostFindPrefix>>>> ")
    await componentDidMount(propsSelectData , props , propsAlert , page);
}

function isValid(value){

}

async function componentDidMount(propsSelectData , props , propsAlert , page) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({classific_id: propsSelectData.selectClassific , 
            theme_id: propsSelectData.selectTheme ,
            datetime: propsSelectData.selectDataScaner,
            page: page})};

    await fetch("http://localhost:8081/dashboard-rest/findPages", requestOptions)
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
        console.log("NetworkPostFindPage Result>>>>>")
        console.log(datum)
        props.callbackGetFindPage(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkPostFindPage; 