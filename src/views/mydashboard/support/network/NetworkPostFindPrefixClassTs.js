import React, { lazy } from 'react'


async function NetworkPostFindPrefixClassTs(propsSelectData , props , propsAlert , prefixName , boxCheckColumn){
    console.log("NetworkPostFindPrefixClassTs>>>> ")
    await componentDidMount(propsSelectData , props , propsAlert , prefixName , boxCheckColumn);
}

function isValid(value){

}

async function componentDidMount(propsSelectData , props , propsAlert , prefixName , boxCheckColumn) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            boxCheckColumn: boxCheckColumn,
            datetime: propsSelectData.selectDataNoScan,
            prefixName: prefixName
        })};

    await fetch("http://localhost:8081/dashboard-rest/findPrefixClassName", requestOptions)
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
        //console.log("NetworkPostFindPrefixClassTs Result>>>>>")
        //console.log(datum)
        props.callbackPrefix(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkPostFindPrefixClassTs; 