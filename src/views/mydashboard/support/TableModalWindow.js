import React, { useState , useEffect, useRef  } from "react";
import NetworkPostGetItemsRules from './network/NetworkPostGetItemsRules'
import NetworkPostFindPage from './network/NetworkPostFindPage'


import {
    CPagination,
    CPaginationItem,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
  } from '@coreui/react'




function handleInputName(e){

}


//если дата сканирования заполненна
//если тема заполннена
//если выбрано правило
//и текст бокс модального окна не используется
function isValid(selectDataScaner , selectTheme , selectClassific , lenghtTextBox){

    if(!selectDataScaner | !selectTheme | !selectClassific | lenghtTextBox > 0){
        return false;
    }
    else{
        return true;
    }
    
}

function isVisibleModal(propsVisible){
    if(propsVisible == false){
        return false;
    }
    else{
        return true;
    }
}

    
function TableModalWindow(propsRefreshPrefix , listPrefix , propsSelectData, propsAlert , propsVisible , lenghtTextBox) {

  const [valueListData, setValueListData] = useState([])  
  const refInit = useRef(true);

  useEffect(() => {

      if(refInit.current){
        console.log("Сработал Ref")
        
        if(isValid(propsSelectData.selectDataScaner , propsSelectData.selectTheme , propsSelectData.selectClassific , lenghtTextBox ) == true){
            checkOpen(propsSelectData, propsAlert , propsVisible);
          }
          else
          {
              console.log("TableModalWindow>>>> не все поля были заполненны!!!")
          }

      }
      else
      {
        console.log("TableModalWindow>>>> refreshPrefix!!!1" + propsRefreshPrefix.refreshPrefix)
        console.log("TableModalWindow>>>> refreshZeroText!!!1" + propsRefreshPrefix.refreshZeroText)
       
        refreshZeroText(propsRefreshPrefix , propsSelectData, propsAlert , propsVisible)
        refreshPrefix(propsRefreshPrefix, listPrefix);
        refreshClose(propsRefreshPrefix);
      }
     

  });

  function refreshZeroText(propsRefreshPrefix , propsSelectData, propsAlert , propsVisible){
      if(propsRefreshPrefix.refreshZeroText){
        checkOpen(propsSelectData, propsAlert , propsVisible);
      }
  }
  function refreshPrefix(propsRefreshPrefix, listPrefix ){
    if(propsRefreshPrefix.refreshPrefix){
        setValueListData(Array.from(listPrefix));
        propsRefreshPrefix.refreshPrefix = false;
        //console.log("TableModalWindow>>>> refreshPrefix!!!2")
      }

  }

  function refreshClose(propsRefreshPrefix){
    if(propsRefreshPrefix.refreshClose){
        setValueListData([]);
        propsRefreshPrefix.refreshClose = false;
        refInit.current = true;
        console.log("TableModalWindow>>>> refreshCLose event!!!!2")
      }

  }

  function checkOpen(propsSelectData, propsAlert , propsVisible){
    if(isVisibleModal(propsVisible.visible) === true){
        //console.log("TableModalWindow>>>> отрпвляем запрос!")
        console.log(propsSelectData)
        refInit.current = false;
        NetworkPostGetItemsRules(propsSelectData, {callbackGetRulesItem} , propsAlert)
    }
    else
    {
        
        console.log("TableModalWindow>>>> модальное окно не запущенно!!!")
    }
  }

  function callbackGetRulesItem(arr){
    //console.log("TableModalWindow>>>>callbackGetRulesItem>>>>result: ")
   // console.log(arr)
   refreshTable(arr)
   propsRefreshPrefix.refreshZeroText = false;
    
}

function callbackGetFindPage(arr){
    refreshTable(arr)
}

function refreshTable(arr){
    if(arr.length >= 10){
        arr.length = 10;
        setValueListData(Array.from(arr))
        
    }
    else{
        setValueListData(Array.from(arr))
    }
}


  if(Array.isArray(valueListData))
  {
    //console.log("LIST DATA TABLE INJECT>>>>")
    //console.log(valueListData)
   return <>
       <CTable small responsive>
         <CTableHead color="dark" align="middle">
          <CTableRow>
           <CTableHeaderCell scope="col">No</CTableHeaderCell>
           <CTableHeaderCell scope="col">Классиф.</CTableHeaderCell>
           <CTableHeaderCell scope="col">Наиме. констр.</CTableHeaderCell>
           <CTableHeaderCell scope="col">Баз. Уровень</CTableHeaderCell>
           <CTableHeaderCell scope="col">Длина</CTableHeaderCell>
           <CTableHeaderCell scope="col">Ширина</CTableHeaderCell>
           <CTableHeaderCell scope="col">Площадь</CTableHeaderCell>
           <CTableHeaderCell scope="col">Кол-во</CTableHeaderCell>
           <CTableHeaderCell scope="col">Объем</CTableHeaderCell>
           <CTableHeaderCell scope="col">Материал</CTableHeaderCell>
          </CTableRow>
         </CTableHead>
         <CTableBody>
         {valueListData.map((items , sIndex) => {
                return (
                    <CTableRow key={sIndex}>
                        <CTableHeaderCell scope="row" >{sIndex}</CTableHeaderCell>
                            <CTableDataCell>{items.classficname}</CTableDataCell>
                            <CTableDataCell>{items.constructname}</CTableDataCell>
                            <CTableDataCell>{items.basedependency}</CTableDataCell>
                            <CTableDataCell>{items.longitem}</CTableDataCell>
                            <CTableDataCell>{items.widthitem}</CTableDataCell>
                            <CTableDataCell>{items.squareitem}</CTableDataCell>
                            <CTableDataCell>{items.amountitem}</CTableDataCell>
                            <CTableDataCell>{items.volumeitem}</CTableDataCell>
                            <CTableDataCell>{items.material}</CTableDataCell>
                    </CTableRow>
                  );
         })}
         </CTableBody>
        </CTable>
        <CPagination aria-label="Page navigation example">
         <CPaginationItem>Previous</CPaginationItem>
         <CPaginationItem onClick={() => NetworkPostFindPage(...propsSelectData , {callbackGetFindPage} , propsAlert, 0 )}>1</CPaginationItem>
         <CPaginationItem onClick={() => NetworkPostFindPage(propsSelectData , {callbackGetFindPage} , propsAlert, 1 )}>2</CPaginationItem>
         <CPaginationItem onClick={() => NetworkPostFindPage(propsSelectData , {callbackGetFindPage} , propsAlert, 2 )}>3</CPaginationItem>
         <CPaginationItem>Next</CPaginationItem>
       </CPagination>

      </>
  }
  else
  {
      return <>

       <CTable>
         <CTableHead color="dark">
          <CTableRow>
          <CTableHeaderCell scope="col">№</CTableHeaderCell>
           <CTableHeaderCell scope="col">Классиф.</CTableHeaderCell>
           <CTableHeaderCell scope="col">Наиме. констр.</CTableHeaderCell>
           <CTableHeaderCell scope="col">Базовый Уровень</CTableHeaderCell>
           <CTableHeaderCell scope="col">Длина</CTableHeaderCell>
           <CTableHeaderCell scope="col">Шир.</CTableHeaderCell>
           <CTableHeaderCell scope="col">Площ.</CTableHeaderCell>
           <CTableHeaderCell scope="col">Кол-во</CTableHeaderCell>
           <CTableHeaderCell scope="col">Объем</CTableHeaderCell>
           <CTableHeaderCell scope="col">Матер.</CTableHeaderCell>
          </CTableRow>
         </CTableHead>
        </CTable>

      </>
  }
  
  }


export default TableModalWindow; 