import React, { lazy } from 'react'


async function NetworkPostSelectData(data , propsSelectData , props , propsAlert){
    console.log("NetworkPostSelectData>>>> ")
    //console.log(data);
   // console.log(props)
    await componentDidMount(data , props , propsAlert);
}

function isValid(value){

}

async function componentDidMount(data , props ,propsAlert) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({classific_id: 0 , 
            theme_id: 0 ,
            datetime: data})};

    await fetch("http://localhost:8081/dashboard-rest/getCountData", requestOptions)
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
        console.log("NetworkPostSelectData Result>>>>>")
        console.log(datum)
        props.callbackSelectDataTime(datum , data);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkPostSelectData; 