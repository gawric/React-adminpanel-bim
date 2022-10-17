import React, { lazy } from 'react'


function SearchRowToArray(code_id_row , array){
    var search = null;
    array.map((item , index)=>{
        if(item.code_id == code_id_row){
            search = item;
        }
      })

      return search;
}






export default SearchRowToArray; 