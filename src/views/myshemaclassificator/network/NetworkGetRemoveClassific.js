import React, { lazy } from 'react'


async function NetworkGetRemoveClassific(props ,  propsAllData){
    console.log("NetworkGetRemoveClassific >")
     console.log(propsAllData)
    if(isValidData(propsAllData)){
        propsAllData.alert.alertNetworkNotValid(false);
        await componentDidMount(props , propsAllData);
        propsAllData.showmessage.alertNetworkShowMessageReuqest(true , "");
      }
      else{
        propsAllData.alert.alertNetworkNotValid(true);
      }
}

function isValidData(propsAllData)
{
  if(propsAllData.classific_id === null ||propsAllData.selectRuleId === null || propsAllData.selectRowstable === null || propsAllData.nameClassific === null)
  {
    return false;
  }

  return true;
}

async function componentDidMount(props  , propsAllData) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/classific-rest/removeClassific?id="+propsAllData.classific_id, requestOptions)
    .then(data => { 
        console.log("Данные NetworkGetRemoveClassific: ")
        console.log(data)
        if (!data.ok) {
          if(data.status != 404){
              throw new Error(data.statusText)
          }
          else{
              console.log("Данные NetworkGetRemoveClassific: > возвращаю пустоту!")
              return "";
          }
      }
      console.log("NetworkGetRemoveClassific> Конвертируем дату")
      console.log(data)
      props.removeNodes(propsAllData.classific_id);
      return data.json() 
    }).then(datum => {
      //console.log("NetworkGetRemoveClassific> Отрабатываем датум!!!")
      // props.removeNodes();

    }).catch(err=>{
        //console.log("ERROR not connection to server")
        propsAllData.showmessage.alertNetworkShowMessageReuqest(false , err);
    });
        
}



export default NetworkGetRemoveClassific; 