import React, { lazy } from 'react'


async function NetworkPostFindPageData(propsSelectData , props , propsAlert , page){
    console.log("NetworkPostFindPageData>>>> Входящая дата для запроса!")
    console.log(propsSelectData.selectDataNoScan)
    console.log(propsSelectData)
    await componentDidMount(propsSelectData , props , propsAlert , page);
}

function isValid(value){

}

async function componentDidMount(propsSelectData , props , propsAlert , page) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({datetime: propsSelectData.selectDataNoScan,
            page: page})};

    await fetch("http://localhost:8081/dashboard-rest/findPagesDataTs", requestOptions)
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
        //console.log("NetworkPostFindPageData Result>>>>>")
        //console.log(datum)
        props.callbackPages(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkPostFindPageData; 