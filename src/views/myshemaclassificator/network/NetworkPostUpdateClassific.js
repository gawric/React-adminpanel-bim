import React, { lazy } from 'react'
import Json from 'react'

function NetworkPostUpdateClassific(e , props , propsAllData , propsupd , theme_id){
    
    console.log("NetWorkUpdateClassificPost")
    console.log(propsAllData)

    propsAllData = setDefualtParentId(propsAllData)
    if(isValidData(propsAllData)){
      propsAllData.alert.alertNetworkNotValid(false);
      componentDidMount(propsAllData , propsupd , theme_id);
      //propsAllData.showmessage.alertNetworkShowMessageReuqest(true , text);
    }
    else{
      propsAllData.alert.alertNetworkNotValid(true);
    }
   
}

function setDefualtParentId(propsAllData){
  if(propsAllData.dataTree.length == 0 ){
    propsAllData.parentidclassific = -1
  }

  return propsAllData;
}
function isValidData(propsAllData){
  console.log(propsAllData)
  if(propsAllData.selectRuleId === null 
    || propsAllData.selectRowstable === null 
    || propsAllData.nameClassific === null 
    || propsAllData.classific_id === null 
    || propsAllData.codeid === null)
  {
    return false;
  }

  return true;
}
function componentDidMount(propsAllData , propsupd , theme_id) {

    var jsonArr = parceArrToJson(propsAllData.arr)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({classific_id: propsAllData.classific_id ,  
          coderule: propsAllData.selectRuleId ,
          codecolumn: propsAllData.selectRowstable ,
          nameclassific: propsAllData.nameClassific ,
          classifictheme_id: theme_id  ,
          parentidclassific: propsAllData.parentidclassific,
          keycode : {code_id: propsAllData.codeid , keycode: propsAllData.keycode },
          replacename: propsAllData.replaceName  , listkeyword: jsonArr})
    };
    console.log("NetWorkUpdateClassificPost Request =>")
    console.log(requestOptions)

    fetch('http://localhost:8081/classific-rest/updateCm' , requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      propsupd.updateNameTreeNodes(propsAllData.nameClassific , propsAllData.classific_id , propsAllData.parentidclassific)
      propsAllData.showmessage.alertNetworkShowMessageReuqest(true , "");
    }).catch(err=>{
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


export default NetworkPostUpdateClassific; 