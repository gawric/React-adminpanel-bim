import React, { lazy } from 'react'


 function EventTreeOpenNodeCl(openid , props){
     console.log("eventOpenNodes: " + openid)
     props.callbackOpenNodeTree(openid);
} 



  export default EventTreeOpenNodeCl; 