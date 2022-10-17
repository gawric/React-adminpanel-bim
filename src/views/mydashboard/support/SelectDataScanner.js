import React, { useState , useEffect } from "react";
import NetworkPostSelectData from './network/NetworkPostSelectData'


import {
    CCol,
    CFormSelect,
    CRow
  } from '@coreui/react'


  function selectEvent(e , propsSelectData , props , propsAlert){
    var timestamp = e.target.value;
    if(!!timestamp)
    //console.log("SelectDataScanner>>>timestamp");
   // console.log(timestamp);
    
    if(isValid(timestamp)){
      NetworkPostSelectData(timestamp , propsSelectData , props ,propsAlert);
    }
    else{
      //console.log("SelectDataScanner>>> не верные данные!")
    }
   
  }

  function isValid(timestamp){
    if(timestamp !== "Выберите дату и название сканирования"){
      return true;
    }

    return false;
  }

function SelectDataScanner(listDataScanner , propsSelectData , props , propsAlert) {

  
    console.log("SelectDataScanner")
    
  useEffect(() => {
    //setValueCodeInput(inCode)
  });

  if(Array.isArray(listDataScanner))
  {
           //console.log("listDataScanner >>>>>");
          // console.log(listDataScanner);
          // var ts = new Date(listDataScanner[0]);
          //console.log(ts.toLocaleDateString() + "  " +  ts.toLocaleTimeString());
         // console.log("ARRRAY is TRUE")
          return <>
          <CRow>
              <CCol xs={6}>
              <CFormSelect size="sm" onChange={ e => selectEvent(e , propsSelectData , props , propsAlert) } className="mb-3" aria-label="Выберите дату и название сканирования">
               <option>Выберите дату и название сканирования</option>
                {
                 listDataScanner.map((items , sIndex) => {
                    var ts = new Date(items);
                    var data = ts.toLocaleDateString() + " " +  ts.toLocaleTimeString()
                   return (

                      <option value={items} key={sIndex}>{data}</option>
                   );
                })}
              </CFormSelect>
          </CCol>
      </CRow>
      </>
  }
  else
  {
      console.log("ARRRAY is NO TRUE")
      return <>
          <CRow>
        <CCol xs={6}>
          <CFormSelect size="sm" className="mb-3" aria-label="Выберите дату и название сканирования">
            <option>Выберите дату и название сканирования</option>
            <option>Нет данных</option>
          </CFormSelect>
        </CCol>
      </CRow>
      </>
  }

  
    
  }


export default SelectDataScanner; 