import React, { useState } from "react";
import ReactDOM from "react-dom";



function supportTreeSearchNode(allArr , searchId) {
    
    if (allArr.length > 0) {

       // console.log("Enter Arr: ")
       // console.log(allArr)
        //console.log("searchId "+ searchId )

        return allArr.map(item=>{
            
            if(item.id == searchId){
               // console.log(" Найдем Arr parent id  ")
               // console.log(item)
                return item;
            }
            else{
                //console.log(" Продолжаем сканирование Arr ")
               // console.log(item)
                if(item.items.length > 0)
                {
                    var childrenArr = item.items;
                    return supportTreeSearchNode(childrenArr , searchId);
                }
            }
        })
    }
  }


export default supportTreeSearchNode; 