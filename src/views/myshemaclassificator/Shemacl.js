import Tree from '@naisutech/react-tree'
import React, { useEffect, useState  , useRef} from "react";
import  OnSelectTreeEvent  from "./eventclassification/EventTreeCl";
import  OnSelectCompare  from "./eventclassification/EventSelectCompareCl";
import  OnSelectPages  from "./eventclassification/EventPaginationCl";
import  OnEventKeyWord  from "./eventclassification/EventAddKeyWord";
import  EventBtnKeyWord  from "./eventclassification/EventBtnKeyWord";
import  EventRemoveKeyWord  from "./eventclassification/EventRemoveKeyWord";
import  EventSelectRule  from "./eventclassification/EventSelectRule";
import  NetworkPostClassific from "./network/NetworkPostClasific";
import  EventSelectRowsTable from "./eventclassification/EventSelectRowsTable";
import NetworkGetAllClassific from "./network/NetworkGetAllClassific";
import NetworkPostUpdateClassific from "./network/NetworkPostUpdateClassific"
import NetworkGetClassifiId from "./network/NetworkGetClassifiId"
import NetworkGetAllParentClassific from "./network/NetworkGetAllParentClassific"
import NetworkGetRemoveClassific from "./network/NetworkGetRemoveClassific"
import NetworkGetAllThemeClassificShema from './network/NetworkGetAllThemeClassificShema'
import ShemaclCodeUI from './support/ShemaclCodeUI'
import EventTreeOpenNodeCl from "./eventclassification/EventTreeOpenNodeCl"
import SupportTreeSearchNode from "./support/supportTreeSearchNode"
import  Window  from "./modalwindows/WindowsModalCl";
import ReactDOM from 'react-dom';
import tableIcons from "./MaterialTableIcons";
import MaterialTable from 'material-table';


import {
  CCard,
  CCardBody,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CDropdown,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
  CListGroup,
  CListGroupItem,
  CRow,
  CPaginationItem,
  CPagination,
  CAlert,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cilChartPie,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'



//const dataTree = []
 //var isInit = false;
 var props12 = { 
     arr: [[]], 
     page: 0,
};

 var propsRule = {visible: false , callback: null , replaceName: "" , updateName: true}
 var propsEventTree = {selectitem: null , callbackTreeSelect: null}
 var propsInputKeyWord = {dataInput: ""}
 var propsRemoveData = {indexArr: null , indexPage: null}

 var propsAllData= {classific_id: null , selectRuleId: null , 
  selectRowstable: null , 
  replaceName: null , 
  arr: [[]] , 
  alert: null , 
  parentidclassific: null , 
  showmessage: null , 
  nameClassific: null , 
  dataTree: null , 
  keycode: null ,
  codeid: null
}

  

const Shemacl = () => {
 
    const [valuesDataTree, setDataTree] = useState([]);
    const [values, setValues] = useState();
    const [valuesText, setValuesText] = useState("");
    const [valuesName, setValuesName] = useState("");
    const [valueSelectRule, setSelectRule] = useState(0);
    const [valueSelectColumn, setSelectColumn] = useState(0);
    const [valuesVisibleInputRepleace, setVisibleInputRepleace] = useState(false);
    const [showAlert, toggleShowAlert] = useState(false);
    const [valueAlertText, setAlertText] = useState("");
    const [valueAlertColor, setAlertColor] = useState("danger");
    const [valueArrTheme, setValueArrTheme] = useState([]);
    const [valuesThemeId, setValuesThemeId] = useState(-1);
    const [valuesKeycode, setValuesKeyCode] = useState("");
    const [valuesTextThemelabel, setValuesTextThemeLabel] = useState("не выбрана");
    const refInit = useRef(true);

    props12.rv = {clickKeyWord};
    propsRule.callback = {callBackDataRules};
    propsAllData.arr = props12.arr;
    propsAllData.alert = {alertNetworkNotValid};
    propsAllData.showmessage = {alertNetworkShowMessageReuqest}
    propsAllData.dataTree = valuesDataTree;
    propsEventTree.callbackTreeSelect = {callbackSelectTree}
    
   
    
    //Init()


    //Заполняем первоначальное дерево
    function initDataTree(arrClassification){
       console.log("init data props tree!!!!")
       if(arrClassification.length > 0){
        console.log(arrClassification)
         
        arrClassification.map((classificModel) => {
          parceInitTree(classificModel.classific_id , classificModel.parentidclassific , classificModel.nameclassific);
        });

         //alertNetworkShowMessageInfo("Завершили получение данных с сервера!" , false);
       }

       alertNetworkShowMessageInfo("Завершили получение данных с сервера!" , false);
    }

    //Обновляется когда нажимаем на select в деревере
    //обновляем форму
    function initDataForm(classificModel){
      console.log("init data props form!!!!")
      console.log(classificModel)
      //console.log(dataTree)
      
      if(classificModel){
        // console.log("parce data initDataForm")
         parceData(classificModel)
         alertNetworkShowMessageInfo("Завершили получение данных с сервера!" , false);
      }
   }

   

    function parceData(classificModel)
    {
      console.log("parce data parceData > ")
      console.log(classificModel)
      props12.arr = [[]]
      setSelectRule(classificModel.coderule)
      propsAllData.selectRuleId = classificModel.coderule

      visibleReplaceNameRequest(classificModel.coderule)
      setRepalceName(classificModel.coderule , classificModel.replacename)

      setSelectColumn(classificModel.codecolumn)
      propsAllData.selectRowstable = classificModel.codecolumn;

      setValuesName(classificModel.nameclassific); 
      propsAllData.nameClassific = classificModel.nameclassific;

      addKeyWord(classificModel.listkeyword)
      setParentIdToData(classificModel.parentidclassific)
      setValuesKeyCode(classificModel.keycode.keycode)

      propsAllData.keycode = classificModel.keycode.code_id;
      propsAllData.codeid = classificModel.keycode.code_id;

      propsRule.updateName = false;
      console.log(propsAllData)
      //console.log("parceData arr --->")
      //console.log(props12.arr)
    }

     function setParentIdToData(parentId){
        propsAllData.parentidclassific = parentId;
     }

     function parceAddTree(classific_id , parentidclassific , nameRules , valuesDataTree)
      {
      
       console.log("parceAddTree Пришел ответ и мы его добавляем в дерево")
       console.log(classific_id);
       console.log(parentidclassific);
       console.log(nameRules);
        //получаем результат из рекурсии возвращается 1 элементом в массиве
        //var arr = SupportTreeSearchNode(valuesDataTree , parentidclassific)
        
        var valuesDataTreePush = pushDataTree(valuesDataTree , classific_id , parentidclassific , nameRules)
        var valuesDataTree1 = removeLoading(valuesDataTreePush , parentidclassific)
        //console.log(valuesDataTree1);
        const  clonevaluesDataTree= Array.from(valuesDataTree1)
        //console.log("cloneEND")
        //console.log(clonevaluesDataTree);
        //console.log("setDatatree 1")
        setDataTree(clonevaluesDataTree)

    }
    function removeOldParentTree(valuesDataTree , parentidclassific){

      var arrDel = [];
      console.log("removeOldParentTree> входящий на удаление >")
      console.log(valuesDataTree)

        valuesDataTree.map((item , index)=>{
          if(item.parentId == parentidclassific){
            //console.log("removeOldParentTree и удаляем Нашли label " + item.label + "с парентID " + item.parentId + "Индекс " +  index)
           // console.log(item)
            arrDel.push(item.id)
          }
        })
  
        //arrDel.map((index) => {
         // console.log("removeOldParentTree> попытка удалить > " + index)
         // valuesDataTree.splice(index, 1);

       // })

      // console.log("removeOldParentTree> массив с id номерами на удаление! >")
       //console.log(arrDel)

       var valuesDataTree = valuesDataTree.filter(item => !arrDel.includes(item.id));

      //console.log("removeOldParentTree> резутьтат после удаления >")
     // console.log(valuesDataTree)

      //valuesDataTree.map((item) => {
       // console.log("removeOldParentTree> остались в массиве после удаления!  > " + item.label + " parentId " + item.parentId+ " Id " + item.id)
     // })

      return valuesDataTree;
    }
    function removeNodeTree(valuesDataTree , idclassific){

      var arrDel = [];
      console.log("removeNodeTree> входящий на удаление >")
      console.log(valuesDataTree)

        valuesDataTree.map((item , index)=>{
          if(item.id == idclassific){
            console.log("removeNodeTree и удаляем Нашли label " + item.label + "с парентID " + item.parentId + "Индекс " +  index)
            console.log(item)
            arrDel.push(item.id)
          }
        })
  
        //arrDel.map((index) => {
         // console.log("removeOldParentTree> попытка удалить > " + index)
         // valuesDataTree.splice(index, 1);

       // })

       //console.log("removeNodeTree> массив с id номерами на удаление! >")
       //console.log(arrDel)

       var valuesDataTree = valuesDataTree.filter(item => !arrDel.includes(item.id));

      //console.log("removeNodeTree> резутьтат после удаления >")
      //console.log(valuesDataTree)

      valuesDataTree.map((item) => {
        console.log("removeNodeTree> остались в массиве после удаления!  > " + item.label + " parentId " + item.parentId+ " Id " + item.id)
      })

      return valuesDataTree;
    }

 

    function updateNameTreeNodes(newname , idclassific , parentid){
      console.log("Need Update TreeView Nodes name > ")
      valuesDataTree.map((classificModel) => {
       // console.log(classificModel)
        if(classificModel.id == idclassific){
          classificModel.label = newname;
         // console.log("Совпадение найденно!")
        }
      });
     // console.log(valuesDataTree)
     // console.log("new name " + newname)
     // console.log("idclassific " + idclassific)
      const  clonevaluesDataTree= Array.from(valuesDataTree)
      console.log("setDatatree 2")
      setDataTree(clonevaluesDataTree)
    }
    function pushDataTree(valuesDataTree , classific_id , parentidclassific , nameRules){
      //console.log("pushDataTree и Добавляем  Нашли label " + nameRules + "с парентID " + parentidclassific + "classific_id " +  classific_id)
      console.log(valuesDataTree)
      console.log("valuesDataTree push 2")

      valuesDataTree = checkArrayOrNot(valuesDataTree);  
      parentidclassific = convertParentMinus1ToNull(parentidclassific)

        valuesDataTree.push({
            "id": classific_id,
            "parentId": parentidclassific,
            "label": nameRules,
          })
        return valuesDataTree;
    }

    function checkArrayOrNot(valuesDataTree){
      if (Array.isArray(valuesDataTree)) {
        //console.log("checkArrayOrNot> Yes! i am  Array!")
        return valuesDataTree;
      }
      else{
        //console.log("checkArrayOrNot> No! i am no Array!")
        return valuesDataTree = [];
      }
    }
      //treeData рутовые записи с типо null/ -1 у нас в базе
    function convertParentMinus1ToNull(parentidclassific){
      if(parentidclassific == -1){
        return parentidclassific = null;
      }

      return parentidclassific;
    }
    function removeLoading(valuesDataTree , parentidclassific){
      var ind = 0; 
      var delind = 0;

      if(valuesDataTree.length > 0)
      {
        var isSearch = false;
        valuesDataTree.map(item=>{
            if(item.parentId == parentidclassific & item.label == "Загрузка"){
             delind = ind;
             isSearch = true;
            }
            ind++
          })

          if(isSearch == true){
            valuesDataTree.splice(delind, 1);
          }
         
        return valuesDataTree
      }
      else{
        return valuesDataTree;
      }
     
    }

    function parceInitTree(classific_id , parentidclassific , nameRules)
    {
      if(parentidclassific === -1){
        console.log("valuesDataTree push 1")
        valuesDataTree.push({
          "id": classific_id,
          "parentId": null,
          "label": nameRules
        })
        

       // valuesDataTree.push({
        ////  "parentId" : classific_id,
        //  "label": "Загрузка"
       // })
      }
      console.log("setDatatree 3")
      console.log(valuesDataTree)
      setDataTree(valuesDataTree)
    }

    function addKeyWord(arr)
    {
      arr.map((number) =>
      {
        //console.log(number["namekeyword"])
        pushValue(props12.arr , number["namekeyword"] , props12.page)
      });
    }


    function updateData(inputValue){
       //console.log("Обновляем список callBack updateData inputValue: " + inputValue)
       pushValue(props12.arr , inputValue , props12.page)
       //очищаем и обновляем input text
       setValuesText("")
       propsInputKeyWord = {dataInput: ""}
    }

    function removeData(){
        if(propsRemoveData.indexArr != null & propsRemoveData.indexPage != null)
        {
            removeIndexArr(props12.arr , propsRemoveData.indexPage , propsRemoveData.indexArr);

            //очищаем и обновляем input text
            setValuesText("")
            //сбрасываем темп данные
            propsInputKeyWord = {dataInput: ""}
            //сбрасываем темп данные для удаления
            propsRemoveData.indexArr = null;
            propsRemoveData.indexPage = null;
        }
      
     }

     
    function addNewNodes(modelItem){
      //console.log("addNewNodes -> ")
      //console.log(modelItem)

      var valuesDataTreePush = pushDataTree(valuesDataTree , modelItem.classific_id , modelItem.parentidclassific , modelItem.nameclassific)
      const  clonevaluesDataTree= Array.from(valuesDataTreePush)
      setDataTree(clonevaluesDataTree)
      setValuesName("вавава");
      console.log("addNewNodes >>>>")
      console.log(clonevaluesDataTree)
    }

    function removeNodes(classificid){
      console.log("removeNodes -> ")
      //удаляем и его потомков
      var valuesDataTree1 = removeOldParentTree(valuesDataTree , classificid)
      //удяем и родителя
      var valuesDataTree2 =removeNodeTree(valuesDataTree1 , classificid)

      const  clonevaluesDataTree= Array.from(valuesDataTree2)
      console.log("setDatatree 4")
      setDataTree(clonevaluesDataTree);
      
    }

     function removeIndexArr(fullArr , pageRemove , indexRemove)
     {
            var childrenArr = fullArr[pageRemove]

            if(childrenArr.length != 0)
            {
                console.log("Удаляем Index! " + indexRemove + " Page " + pageRemove)
                childrenArr.splice(indexRemove, 1); // 2nd parameter means remove one item only
            }
            
     }

   
    function selectPage(numberPage){
        //console.log("Обновляем список callBack OnSelectPages-> selectPage: " + numberPage)
        props12.page = numberPage;
        setValues(numberPage);
     }

     function selectRules(idselect){
      
        visibleReplaceName(idselect)
        setSelectRule(idselect);
        propsAllData.selectRuleId = idselect;
       
     }

     function visibleReplaceName(idselect){
        //console.log("Обновляем список callBack selectRules-> selectRules: " + idselect)
        if(idselect == 7){
          propsRule.visible = true;
          setVisibleInputRepleace(true);
        }
        else{
          propsRule.visible = false;
          propsRule.replaceName = "";
          setVisibleInputRepleace(false);
        }
     }

     function visibleReplaceNameRequest(idselect){
      //console.log("Обновляем список callBack selectRules-> selectRules: " + idselect)
      if(idselect == 7){
        propsRule.visible = true;
        propsRule.updateName = true;
        setVisibleInputRepleace(true);
      }
      else{
        propsRule.visible = false;
        propsRule.replaceName = "";
        setVisibleInputRepleace(false);
      }
   }

     function setRepalceName(idselect , nameRepalce){
      if(idselect == 7){
        propsRule.replaceName = nameRepalce
      }
     }

     async function callbackSelectTree(selectId){
      //console.log("Входная пустота в Select Tree" + selectId);
      if(selectId != ""){
        propsEventTree.selectitem = selectId;
        propsAllData.classific_id = selectId.toString();
        //console.log("Прошла проверку и запускаем NetworkGetClassifiId" + propsEventTree.selectitem);
        await NetworkGetClassifiId({initDataForm} , selectId.toString(), {alertNetworkShowMessageReuqest} , {alertNetworkShowMessageInfo});
      }
   }
   //example opend[1,2,3]
   async function callbackOpenNodeTree(openId){
    //console.log("callbackOpenNodeTree Входная пустота в OpenNode Tree" + openId);
    if(openId != ""){
        var openIdClear = getLastId(openId)
        //console.log("Обработанный  OpenId >" + openIdClear);
        //console.log(openIdClear);
        await NetworkGetAllParentClassific({callbackGetAllParent}, openIdClear, {alertNetworkShowMessageReuqest} , {alertNetworkShowMessageInfo} , valuesThemeId);
      }
    }
    //приходит в виде массива нужно распотрошить его и выбрать нужный!
    function getLastId(openId)
    {

      if(openId.length > 1){
        return openId[openId.length - 1];
      }
      else{
        return openId
      }
    }

    function callbackGetAllParent(data){
      console.log("callbackGetAllParent ");
      console.log(data);
      if(data.length > 0)
      {
        var delparent = data[0].parentidclassific
        var valuesDataTree1 = removeOldParentTree(valuesDataTree , delparent)
        console.log("callbackGetAllParent измененный архив  > " + valuesDataTree);
        data.map((model)=>{   
          parceAddTree(model.classific_id , model.parentidclassific , model.nameclassific , valuesDataTree1)
        });  
      }

      console.log("callbackGetAllParent END");
      //console.log(dataTree);
      
    }

     function callBackDataRules(dataInput){
     // console.log("Get callback rules event text!");
      //propsRule.dataInput = dataInput;
      propsAllData.replaceName = dataInput;
     }

     function selectRowsTable(idselect){
        console.log("SelectRowsTable-> " + idselect)
        setSelectColumn(idselect)
        propsAllData.selectRowstable = idselect;
     }

    function clickKeyWord(index , page , text)
    {
       // console.log("Сработал clickKeyWord Index! " + index + " Page " + page + "Text " + text)
        setValuesText(text);  
        propsRemoveData.indexPage = page;
        propsRemoveData.indexArr = index;
        console.log(propsRemoveData)
    }


    function pushValue(arr , inputValue , page)
    {
        if(arr[page].length < 18){
            addToEndPage(arr , inputValue , page);
        }
        else{
            
            if(!addEmptyPage(arr , inputValue)){
                addToTheEnd(arr , inputValue);
            }
            
        }

    }

    function addToEndPage(arr , inputValue , page){
        //если на текущей странице есть место
        var childrenArr = arr[page];

        if(Boolean(inputValue)) 
        {
            //console.log("Push element добавляем в текущуб страницу ")
            childrenArr = childrenArr.push(inputValue)
        }

    }

    function callBackInitTheme(modelThemeClassific){

     if(Object.keys(modelThemeClassific).length > 0){

        const  clonevaluesDataTree= Array.from(modelThemeClassific)
        setValueArrTheme(clonevaluesDataTree);
     }

     alertNetworkShowMessageInfo("Получаем данные с сервера" , false);
    }
    //console.log(refInit.current)
   if(refInit.current){
    console.log("init new Сработал Ref")
    refInit.current = false;
    NetworkGetAllThemeClassificShema({callBackInitTheme} , {alertNetworkShowMessageReuqest} ,  {alertNetworkShowMessageInfo })
  }
    //async function Init()
    //{
      // -1 это рутовый id начало начал
      //if(isInit == false){
       // isInit = true;
       // await NetworkGetAllClassific({initDataTree}, "-1" , {alertNetworkShowMessageReuqest} , {alertNetworkShowMessageInfo});
        
        
        
     // }
   // }

    async function loadClassific(e){
      e.preventDefault();
      var themeId = e.target.id;
      var themenName= e.target.text;
      console.log(e)
      setValuesThemeId(themeId);
      setValuesTextThemeLabel(themenName)
      clearAllField();
      await NetworkGetAllClassific({initDataTree}, "-1" , {alertNetworkShowMessageReuqest} , {alertNetworkShowMessageInfo} , themeId);
    }

    function clearAllField(){

      setValuesName("")

      //console.log("values data tree before >>>>>")
      //console.log(valuesDataTree)

      valuesDataTree.length = 0;
      setDataTree({valuesDataTree})

      //console.log("values data tree current >>>>>")
      //console.log(valuesDataTree)
     

      //setValuesName("")
      setSelectRule(0)
      setSelectColumn(0)
      setVisibleInputRepleace(false)
      props12 = { arr: [[]], page: 0,};
    }

    function addToTheEnd(arr , inputValue){

        //если места вообще не осталось мы создаем новый и добавляем 
        //элемент уже туда
        var leghtAll = arr.length;
        var lastitem = arr[leghtAll - 1];
        var leghtLastitem = lastitem.length;
        
                if(leghtLastitem >= 18){
                    //console.log("Push element добавляем в конец всех страниц >= " + leghtLastitem)
                    arr = arr.push([inputValue])
                }
                else{
                    //console.log("Push element добавляем в конец всех страниц  <=" + leghtLastitem)
                    arr[leghtAll - 1].push(inputValue);
                }

        return arr
    }

    function addEmptyPage(arr , inputValue)
    {
        //если в первой странице закончилось место
        //мы просматриваем все и ищем где есть место
        for(var i = 0; i < arr.length; i++){
            var page = i;
            if(arr[page].length < 18)
            {
                addToEndPage(arr , inputValue , page);
                return true;
            }
            
        }
        return false;
    }
        
      
    function handleChangeInput(e){
            setValuesText(e.target.value); 
            propsInputKeyWord = {dataInput: e.target.value}
    }

    function handleChangeInputName(e){
      setValuesName(e.target.value); 
      propsAllData.nameClassific = e.target.value;
    }

  

   function alertNetworkNotValid(isValid){
     if(isValid){
       setAlertText("Не все поля были заполненны!");
       setAlertColor("danger");
       toggleShowAlert(isValid);
     }
 }

 function alertNetworkShowMessageReuqest(isSucces , text){
  if(isSucces)
  {
    setAlertText("Данные успешно сохранены!");
    setAlertColor("success");
    toggleShowAlert(true);
  }
  else{
    setAlertText("Критическая ошибка сервер не отвечает! \n " + text);
    setAlertColor("danger");
    toggleShowAlert(true);
  }

}

function alertNetworkShowMessageInfo(text , isshow){
    setAlertText(text);
    setAlertColor("info");
    toggleShowAlert(isshow);
}
function callBackSelectCodeNumber(keycode , codeid){
  console.log("callBackSelectCodeNumber >>>> ")
  setValuesKeyCode(keycode);
  propsAllData.keycode = keycode;
  propsAllData.codeid = codeid;
}
 
  return (
    <>
      <CCard className="mb-4">
       <CCardBody>
        <CRow>
         <CCol xs={6}>
          <CDropdown autoClose="true">
           <CDropdownToggle color="secondary">Выбрать схему</CDropdownToggle>
           <CDropdownMenu autoClose="true">
           {valueArrTheme.map((items , sIndex) => {
                return (
                    <CDropdownItem href="#" onClick={(e) => {loadClassific(e)}} id={items.classifictheme_id}  key={sIndex}>{items.name}</CDropdownItem>
                  );
            })}
           </CDropdownMenu>
          </CDropdown>
         </CCol>
         <CCol xs={6}>
            <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">Тема: </CFormLabel>
            <CFormLabel htmlFor="staticEmail" className="col-sm-6 col-form-label">{valuesTextThemelabel}</CFormLabel>
          </CCol>
        </CRow>
       </CCardBody>
      </CCard>
      <CCard className="mb-4">
       <CCardBody>
       <CRow>
        <CCol xs={6}>
         <Tree nodes={valuesDataTree}  onOpenClose={(e) => {callbackOpenNodeTree(e, callbackGetAllParent)}} onSelect={(e) => {OnSelectTreeEvent(e, propsEventTree)}} theme="light"/>
        </CCol>
        <CCol xs={6}>
         <CRow>
          {showAlert &&  <CAlert color={valueAlertColor} visible="true">{valueAlertText}</CAlert>}
         </CRow>
         <CRow>
         <CForm>
           <div className="mb-3">
             <CFormLabel htmlFor="inputtextname">Имя правила</CFormLabel>
             <CFormInput type="text" id="inputtextname"  value={valuesName}  onChange={handleChangeInputName}   aria-describedby="passwordHelpBlock" placeholder="Наименование правила" />
           </div>
         </CForm> 
         </CRow>
        <CForm>
         <CFormSelect  onChange={(e) => {OnSelectCompare(e, {selectRules})}} value={valueSelectRule} size="sm" className="mb-3" aria-label="Выбери правило для поиска совпадений">
           <option>Выбери правило для поиска</option>
           <option value="1">Найти только часть слова</option>
           <option value="2">Найти только при полном совпадении слова</option>
           <option value="3">Найти если цифра больше заданной</option>
           <option value="4">Найти если цифра больше или равно заданной</option>
           <option value="5">Найти если цифра меньще заданной</option>
           <option value="6">Найти если цифра меньше или равно заданной</option>
           <option value="7">Заменить часть строки</option>
         </CFormSelect>
         <CFormSelect onChange={(e) => {EventSelectRowsTable(e, {selectRowsTable})}} value={valueSelectColumn} size="sm" className="mb-3" aria-label="Выберите поле из таблицы классификатора">
           <option>Выберите поле из таблицы классификатора</option>
           <option value="1">Классификатор</option>
           <option value="2">Наименование конструкций</option>
           <option value="3">Базовый уровень</option>
           <option value="4">Длина, м</option>
           <option value="5">Ширина, м</option>
           <option value="6">Площадь, м2</option>
           <option value="7">Кол-во</option>
           <option value="8">Объем м3</option>
           <option value="9">Материал</option>
         </CFormSelect>
         {ShemaclCodeUI({callBackSelectCodeNumber}, valuesKeycode)}
         <div className="mb-3">
          <OnEventKeyWord  {...props12} />
         </div>
         <CRow>
             <CPagination size="sm" aria-label="Page navigation example">
              <CPaginationItem onClick={(e) => {OnSelectPages(e, {selectPage})}}>Previous</CPaginationItem>
              <CPaginationItem onClick={(e) => {OnSelectPages(e, {selectPage})}}>1</CPaginationItem>
              <CPaginationItem onClick={(e) => {OnSelectPages(e, {selectPage})}}>2</CPaginationItem>
              <CPaginationItem onClick={(e) => {OnSelectPages(e, {selectPage})}}>3</CPaginationItem>
              <CPaginationItem onClick={(e) => {OnSelectPages(e, {selectPage})}}>Next</CPaginationItem>
             </CPagination>
         </CRow>
         <CRow>
           <CForm className="row g-3">
            <CCol xs="auto">
             <CFormLabel htmlFor="inputtext" className="visually-hidden">Ключ. слово</CFormLabel>
             <CFormInput type="text" id="inputtext" value={valuesText}  onChange={handleChangeInput}   placeholder="Ключевое слово"/>
            </CCol>
            <CCol xs="auto">
             <CButton type="submit" className="mb-3" onClick={(e) => {EventBtnKeyWord(e, {updateData} , propsInputKeyWord.dataInput)}}>Добавить</CButton>
            </CCol>
            <CCol xs="auto">
             <CButton type="submit" className="mb-3" onClick={(e) => {EventRemoveKeyWord(e , {removeData} )}} >Удалить</CButton>
            </CCol>
          </CForm>
         </CRow>
        <EventSelectRule {...propsRule} />
         <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlTextarea1"><b>Элементы правила</b></CFormLabel>
           <CListGroup>
            <CListGroupItem color="info" >Найти только при полном совпадении слова</CListGroupItem>
            <CListGroupItem color="info" >Имя столбца Классификатор</CListGroupItem>
           </CListGroup>
         </div>
          <CRow>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
               <CButton onClick={(e) => {NetworkPostUpdateClassific(e , {removeData} , propsAllData , {updateNameTreeNodes} , valuesThemeId)}} color="success" shape="rounded-0">Сохранить</CButton>
               <CButton onClick={(e) => {NetworkPostClassific(e , {addNewNodes} , propsAllData , valuesThemeId)}} color="success" shape="rounded-0">Создать новый</CButton>
               <CButton onClick={(e) => {NetworkGetRemoveClassific({removeNodes} , propsAllData )}} color="danger" shape="rounded-0">Удалить</CButton>
          </div>
          </CRow>
        </CForm>
        </CCol>
       </CRow>
       </CCardBody>
      </CCard>
    </>
  )
}


export default Shemacl

  //<MaterialTable columns={columns} data={dataTable} icons={tableIcons} title='Классификатор'  onRowClick={(evt, selectedRow) =>setSelectedRow(selectedRow.tableData.id)}   options={{
        //  search: true,
         // rowStyle: rowData => ({
         ////   backgroundColor:
         //     selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
         // })
       // }}  />