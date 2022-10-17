import React, { useState , useEffect, useRef } from "react";
import NetworkPostFindPageData from './network/NetworkPostFindPageData'
import NetworkPostFindPrefixClassTs from './network/NetworkPostFindPrefixClassTs'


import {
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CForm,
    CFormLabel,
    CFormInput,
    CFormText,
    CRow,
    CPagination,
    CPaginationItem,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormCheck,
    CFormSelect
  } from '@coreui/react'


 
function TableAllItems(listBoxChecked , listDataAll , listAllRows , propsSelectData , propsAlert , props , propsSetData , propsBoxCheked) {

      console.log("TableAllItems ЗАПУСК Обновления >>> ")
      console.log(propsSelectData.selectDataNoScan)
      const refInit = useRef(true);
      const [valueListData, setValueListData] = useState([])  
      const [valueTextBoxPrefix, setValueTextBoxPrefix] = useState("")  
      const [valueListBoxUpdate, setValueListBoxUpdate] = useState([])  
      
   
      //setBoxCheked(listBoxChecked)

      useEffect(() => {
          setValueListData(listAllRows);
          setValueListBoxUpdate(listBoxChecked)
      });

  function callbackPages(result , selectData){
    props.callBackNoSortPages(result , selectData);
    setValueListData(result);
  }

  function callbackPrefix(result , selectData){
    props.callBackNoSortPages(result , selectData);
    setValueListData(result);
  }

  var first = false;


  function selectEvent(e , propsSelectData , props , propsAlert , propsSetData){
        var timestamp = e.target.value;

        if(!!timestamp){
            console.log("WORK timestamp")
            setValueListData([]);
            propsSelectData.selectDataNoScan = timestamp;
            propsSetData.callBackSetNoSortPages(timestamp);
            enterValueEventSelect(e);
        }
        //очищаем поле поисковика
        setValueTextBoxPrefix("");
       
  }

  function enterValueEventSelect(e){
    var prefixText = e.target.value;
    //console.log("enetrValue>>>")
    //console.log(prefixText)
    if(!!prefixText){
     // console.log("The Runnn>>>")
      NetworkPostFindPageData(propsSelectData , {callbackPages} , propsAlert, 0 )
      
    }
 
  }


  function enterValueEvent(e){
    var prefixText = e.target.value;
    console.log("enetrValue>>>")
    console.log(prefixText)
    if(!!prefixText){
     // console.log("The Runnn>>>")
      NetworkPostFindPrefixClassTs(propsSelectData , {callbackPrefix}, propsAlert , prefixText , listBoxChecked)
    }
    setValueTextBoxPrefix(prefixText);
  }

 function handleCheck(e){
    console.log("Сработал CheckBox e >>> " + e)
    console.log(propsSelectData.selectDataNoScan)
    listBoxChecked = changeId(listBoxChecked , e.target.id , e.target.checked);
    var s = Array.from(listBoxChecked);
    setValueListBoxUpdate(s = 0);
    propsBoxCheked.callBackSetCheckBox(listBoxChecked)
   
  }

  function changeId(arr , id , status){

    arr = addZeroArr(arr);

    if(arr.length > id){
      if(status == true){
        arr[id] = 1;
      }
      else{
        arr[id] = 0;
      }
    }

    return arr

  }

  function addZeroArr(arr){
    console.log(arr)
    
    if(Array.isArray(arr)){
      arr.map((items , sIndex) =>{
        arr[sIndex] = 0;
      });
    }
    else{
    }
  
    console.log(arr)
    return arr;
  }

  function selectData(items , sIndex , data , dataSelect){
        //если выбранная дата совпадает и датой из списка делаем ее как выбранную 
        if(data == dataSelect){
          console.log("ОБНАРУЖИЛИ Совпадение даты! 1")
          return (
            <option value={items} key={sIndex} selected="true" id="-1">{dataSelect}</option>
         );
        }
        else{
          return (
            <option value={items} key={sIndex} id="-1">{data}</option>
         );
        }
  }

  function elseDataEmpty(items){
          //если дата не заполнена 
          if(!propsSelectData.selectDataNoScan){
            console.log("сработала путая селект дата")
            console.log(propsSelectData.selectDataNoScan)
           propsSelectData.selectDataNoScan = items
        }
  }

  if(Array.isArray(valueListData) & Array.isArray(valueListBoxUpdate))
  {

    return <>
       <CCard className="mb-4">
        <CRow>
          <CCol>
            <div className="d-grid gap-1">
                <div className="p-2 bg-light border margin">Все не классифицированные данные</div>
            </div>
          </CCol>
         </CRow>
       <CCardBody>
       <CRow>
          <CCol xs={6}>
            <CFormSelect size="sm"  onChange={ e => selectEvent(e , propsSelectData , {callbackPages} , propsAlert , propsSetData) }  className="mb-3" aria-label="Выберите дату и название сканирования">
               <option>Выберите дату и название сканирования</option>
                {
                 listDataAll.map((items , sIndex) => {
                    var ts = new Date(items);
                    var data = ts.toLocaleDateString() + " " +  ts.toLocaleTimeString()
                    elseDataEmpty(items);

                    var tsSelect = new Date(propsSelectData.selectDataNoScan);
                    var dataSelect = tsSelect.toLocaleDateString() + " " +  tsSelect.toLocaleTimeString()

                    if(first == false){
                        first = true;
                        return selectData(items , sIndex  ,data , dataSelect);
                    }
                    else{
                        return selectData(items , sIndex  ,data , dataSelect);
                    
                    }
                   
                })}
              </CFormSelect>
          </CCol>
      </CRow>
       <CForm>
         <div className="mb-3">
          <CFormLabel htmlFor="inputText5">Поиск</CFormLabel>
          <CFormInput type="text" id="inputText5" value={valueTextBoxPrefix} onChange={ e => enterValueEvent(e) }  aria-describedby="passwordHelpBlock" />
          <CFormText id="textHelpBlock">
            Производим поиск по выбранным полям!
          </CFormText>
         </div>
       </CForm>
      <CRow className="mb-3">
      {
        valueListBoxUpdate.map((items , sIndex) => 
        {
                    var nameBox = "Классификатора";
                   if(sIndex == 0){nameBox="Классификатора"}
                   if(sIndex == 1){nameBox="Наиме. констр."}
                   if(sIndex == 2){nameBox="Баз. Уровень"}
                   if(sIndex == 3){nameBox="Материал"}

                   if(items == 1){
                     //console.log(nameBox)
                    return (
                    <CCol>
                      <CFormCheck key={sIndex}  id={sIndex} label={nameBox} onChange={handleCheck} defaultChecked="true" />
                    </CCol>
                    )
                   }
                   else{
                    return (
                    <CCol>
                      <CFormCheck key={sIndex}  id={sIndex} label={nameBox} onChange={handleCheck}  />
                    </CCol>
                    )
                  }
                 
        })
      }
     

       </CRow>
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
         <CPaginationItem onClick={() => NetworkPostFindPageData(propsSelectData , {callbackPages} , propsAlert, 0 )} >1</CPaginationItem>
         <CPaginationItem onClick={() => NetworkPostFindPageData(propsSelectData , {callbackPages} , propsAlert, 1 )} >2</CPaginationItem>
         <CPaginationItem onClick={() => NetworkPostFindPageData(propsSelectData , {callbackPages} , propsAlert, 2 )} >3</CPaginationItem>
         <CPaginationItem>Next</CPaginationItem>
       </CPagination>
       </CCardBody>
       <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
          </CRow>
        </CCardFooter>
      </CCard>
      </>
  }
  else
  {
     // console.log("ARRRAY is NO TRUE")
return <>
   <CCard className="mb-4">
      <CRow>
          <CCol>
            <div className="d-grid gap-1">
                <div className="p-2 bg-light border margin">Все данные сканирования выбранные из списка</div>
            </div>
          </CCol>
         </CRow>
       <CCardBody>
       <CRow>
          <CCol xs={6}>
          <CFormSelect size="sm" className="mb-3" aria-label="Выберите дату и название сканирования">
            <option>Выберите дату сканирования</option>
            <option>Нет данных</option>
          </CFormSelect>
          </CCol>
        </CRow>
       <CForm>
         <div className="mb-3">
          <CFormLabel htmlFor="inputText5">Поиск</CFormLabel>
          <CFormInput type="text" id="inputText5" aria-describedby="passwordHelpBlock" />
          <CFormText id="textHelpBlock">
            Производим поиск по выбранным полям!
          </CFormText>
         </div>
       </CForm>
       <CTable>
         <CTableHead color="dark">
          <CTableRow>
           <CTableHeaderCell scope="col">No</CTableHeaderCell>
           <CTableHeaderCell scope="col">Классификатор</CTableHeaderCell>
           <CTableHeaderCell scope="col">Наименование констр.</CTableHeaderCell>
           <CTableHeaderCell scope="col">Базовый Уровень</CTableHeaderCell>
           <CTableHeaderCell scope="col">Длина, м</CTableHeaderCell>
           <CTableHeaderCell scope="col">Ширина, м</CTableHeaderCell>
           <CTableHeaderCell scope="col">Площадь, м</CTableHeaderCell>
           <CTableHeaderCell scope="col">Кол-во</CTableHeaderCell>
           <CTableHeaderCell scope="col">Объем</CTableHeaderCell>
           <CTableHeaderCell scope="col">Материал</CTableHeaderCell>
          </CTableRow>
         </CTableHead>
        </CTable>
       </CCardBody>
       <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
          </CRow>
        </CCardFooter>
      </CCard>
      </>
  }
    
  }


export default TableAllItems; 