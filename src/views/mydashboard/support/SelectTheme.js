import React, { useState , useEffect } from "react";
import NetworkPostSelectTheme from './network/NetworkPostSelectTheme'


import {
    CCol,
    CFormSelect,
    CRow
  } from '@coreui/react'



  function selectEvent(e , propsSelectData , props , propsAlert){
    var selectData = e.target.value;
    if(!!selectData){
      //console.log("SelectDataScanner>>>timestamp");
      //console.log(selectData);
      if(isValid(selectData , propsSelectData.selectDataScaner)){
        NetworkPostSelectTheme(propsSelectData.selectDataScaner , props , selectData, propsAlert)
      }
      else{
        console.log("SelectDataScanner>>> не верные данные!")
      }
      
    }
    
  }

  function isValid(selectData , datascaner){
    if(selectData !== "Выберите тему для просмотра" & !!datascaner){
      return true;
    }

    return false;
  }

function SelectTheme(listTheme, propsSelectData, props , propsAlert ) {

  

  useEffect(() => {
    //setValueCodeInput(inCode)
  });



  if(Array.isArray(listTheme))
  {
          //console.log("ARRRAY is TRUE")
          return <>
          <CRow>
              <CCol xs={6}>
              <CFormSelect onChange={ e => selectEvent(e , propsSelectData , props , propsAlert) } size="sm" className="mb-3" aria-label="Выберите правило для просмотра">
               <option>Выберите тему для просмотра</option>
                {
                 listTheme.map((items , sIndex) => {
                   return (
                      <option value={items.classifictheme_id} key={sIndex}>{items.name}</option>
                   );
                })}
              </CFormSelect>
          </CCol>
      </CRow>
      </>
  }
  else
  {
      //console.log("ARRRAY is NO TRUE")
      return <>
          <CRow>
        <CCol xs={6}>
          <CFormSelect size="sm" className="mb-3" aria-label="Выберите правило для просмотра">
            <option>Выберите тему для просмотра</option>
            <option>Нет данных</option>
          </CFormSelect>
        </CCol>
      </CRow>
      </>
  }

    
  }


export default SelectTheme; 