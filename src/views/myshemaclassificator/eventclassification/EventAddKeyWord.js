import React, { useState } from "react";
import ReactDOM from "react-dom";


import {
    CCol,
    CFormLabel,
    CListGroup,
    CListGroupItem,
    CRow,
  } from '@coreui/react'

  
function EventAddKeyWord(props , removeValue) {
    //console.log("props")
    //console.log("Попытка записи таблицы!")

    //console.log(props)
    if(emptyMultiArr(props.arr , props.page))
    {
     var fullPageArr = spliceArr(props.arr, props.page);
       //console.log(fullPageArr)
       var allIndex = 0;
        return (
          <CRow>
            <CFormLabel htmlFor="exampleFormControlTextarea1"><b>Клечевые слова</b></CFormLabel>
              {fullPageArr.map((items, index) => {
                return (
                 <CCol sm="auto" key={index}>
                   <CListGroup key={index}>
                    {
                     items.map((subItems, sIndex) => {  
                          return <CListGroupItem  component="a" id={allIndex++} onClick={(e) => {onSelectPages(e, {...props})}} color="light" key={sIndex}>{subItems}</CListGroupItem>    
                    })
                    }
                   </CListGroup>
                 </CCol>
                
              );
         })}
         
           </CRow>
      )
   }
   else{
    return (
      <CRow>
        <CFormLabel htmlFor="exampleFormControlTextarea1"><b>Клечевые слова</b></CFormLabel>
             <CCol sm="auto">
             </CCol>
       </CRow>
  )
   }
  
}

function onSelectPages(e , props){
  e.preventDefault();
  var index = e.target.id;
  var page = props.page;
  props.rv.clickKeyWord(index , page , e.target.text);
}

function emptyMultiArr(multiArr , page)
{
   
   if(multiArr[page]){
    var cildrenArr = multiArr[page]
    if(cildrenArr.length >0)
    {
      return true;
    }
    else{
      return false;
    }
  } else {
    return false;
  }
}
function spliceArr(enterArr , enterPage){
      var arrPage = enterArr[enterPage];
      var arrFullPage = []
      var arrSegment1 = []
      var arrSegment2 = []
      var arrSegment3 = []

      arrPage.map((subItems, sIndex) => {  
        
        if(sIndex < 6)
        {
         //console.log(subItems)
         if (Boolean(subItems)) {
            arrSegment1.push(subItems)
        }
        
        } 
        else if(sIndex >= 6 & sIndex < 12)
        {
          if (Boolean(subItems)) {
            arrSegment2.push(subItems)
          }
        }
        else if(sIndex >= 12 & sIndex < 18)
        {
          if (Boolean(subItems)) {
            arrSegment3.push(subItems)
          }
        }
    })

    arrFullPage.push(arrSegment1)
    arrFullPage.push(arrSegment2)
    arrFullPage.push(arrSegment3)

    
    return arrFullPage;
    
}



export default EventAddKeyWord; 