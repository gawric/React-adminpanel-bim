import React, { lazy } from 'react'
import Json from 'react'

async function NetworkPostClassific(e , props , propsAllData , valuesThemeId){
    console.log("NetworkPostClassific >")
    console.log(propsAllData)
    propsAllData = setDefualtParentId(propsAllData)
    if(isValidData(propsAllData, valuesThemeId)){
      propsAllData.alert.alertNetworkNotValid(false);
      await componentDidMount(propsAllData , props , valuesThemeId);
      propsAllData.showmessage.alertNetworkShowMessageReuqest(true , "");
    }
    else{
      propsAllData.alert.alertNetworkNotValid(true);
    }
   
}

function setDefualtParentId(propsAllData)
{
  if(propsAllData.dataTree.length == 0 ){
    propsAllData.parentidclassific = -1
    propsAllData.classific_id = -1
  }

  return propsAllData;
}
function isValidData(propsAllData, valuesThemeId)
{
  if(propsAllData.selectRuleId === null 
    || propsAllData.selectRowstable === null 
    || propsAllData.nameClassific === null 
    || propsAllData.codeid === null || valuesThemeId === -1)
  {
    return false;
  }
  //если мы создаем самую первую запись мы присваиваем -1 ей а потом и prantId
  if(propsAllData.classific_id === null){
    propsAllData.classific_id = -1
  }
  return true;
}
async function componentDidMount(propsAllData , props , valuesThemeId) {

    var jsonArr = parceArrToJson(propsAllData.arr)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({coderule: propsAllData.selectRuleId , 
          codecolumn: propsAllData.selectRowstable ,
          nameclassific: propsAllData.nameClassific  , 
          classifictheme_id: valuesThemeId , 
          parentidclassific: propsAllData.classific_id, 
          keycode : {code_id: propsAllData.codeid , keycode: propsAllData.keycode },
          replacename: propsAllData.replaceName  , listkeyword: jsonArr})
    };

    console.log("NetworkPostClassific > ")
    console.log(requestOptions)
    

     fetch('http://localhost:8081/classific-rest/addCm' , requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

     
      return response.json() 
    })
    .then(datum => {
      props.addNewNodes(datum)
   })
    .catch(err=>{
      propsAllData.showmessage.alertNetworkShowMessageReuqest(false , err);
  })

  //console.log("succes = " + succes);
}

function parceArrToJson(arr){
  var jsonArr = [];
  arr.map((subItems, sIndex) => {  
    subItems.map((subItemsW, sIndex1) => {  
      jsonArr.push(structJson(subItemsW))
    })
  })
  return jsonArr;
}

function structJson(subItemsW ){
      return { namekeyword: subItemsW };
}


export default NetworkPostClassific; 