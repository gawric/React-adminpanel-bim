import React, { lazy } from 'react'

import {
    CCard,
    CCardBody,
    CHeaderBrand, 
    CCol,
    CFormLabel,
    CFormInput,
    CButton,
    CListGroup,
    CListGroupItem,
    CRow,
    CPaginationItem,
    CPagination,
    CAlert,
    CCardHeader,
  } from '@coreui/react'
  


function ListAddTableName(valuesListNameItems , props){
 
    if(Array.isArray(valuesListNameItems))
    {
           // console.log("ARRRAY is TRUE")
            return <>
            <CListGroup>
              <CListGroupItem component="button" active>
                Список индексов 
              </CListGroupItem>
              {
                valuesListNameItems.map((items , sIndex) => {
                  return (
                    <CListGroupItem id={items.code_id}  onClick={props.handleSelectRows} component="button" key={sIndex}>{items.namecode}</CListGroupItem>
                  );
              })}
            </CListGroup>
        </>
    }
    else
    {
       // console.log("ARRRAY is NO TRUE")
        return <>
            <CListGroup>
                <CListGroupItem component="button" active>
                    Список названия кодов
                </CListGroupItem>
            </CListGroup>
        </>
    }



}






export default ListAddTableName; 