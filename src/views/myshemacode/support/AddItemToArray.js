
import React, { lazy } from 'react'


function AddItemToArray(datum , arrclone2 , arrclone1){
    if(datum.length > 0){
      datum.map((items , sIndex) => {
      
          if(items.typecode == 2){
            if(arrclone2.length < 10){
              arrclone2.push(items)
            }
            
          }
          else
          {
            if(arrclone1.length < 10){
              arrclone1.push(items)
            }
            
          }
        
      });
  
    }

}






export default AddItemToArray; 