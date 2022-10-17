import React, { lazy } from 'react'


async function NetworkPostFindPrefix(propsSelectData , props , propsAlert , constructname){
    console.log("NetworkPostFindPrefix>>>> ")
    console.log(constructname);
    console.log(props)
    await componentDidMount(propsSelectData , props , propsAlert , constructname);
}

function isValid(value){

}

async function componentDidMount(propsSelectData , props , propsAlert , constructname) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({classific_id: propsSelectData.selectClassific , 
            theme_id: propsSelectData.selectTheme ,
            datetime: propsSelectData.selectDataScaner,
            constructname: constructname})};

    await fetch("http://localhost:8081/dashboard-rest/findPrefixStructName", requestOptions)
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
        console.log("NetworkPostFindPrefix Result>>>>>")
        console.log(datum)
        props.callBackPrefix(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkPostFindPrefix; 