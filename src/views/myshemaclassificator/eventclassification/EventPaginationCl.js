import React, { lazy } from 'react'

function onSelectPages(inputPages , props ){
    var page  = inputPages.target.outerText;
    console.log("Выбрана другая страница onSelectPages" + inputPages);
    console.log(props);
    page = sdvigNumb(page)
    props.selectPage(page)
}

function sdvigNumb(page)
{
    if(page == 0 )
    {
       return  page
    }
    else
    {
        return page - 1
    }
}



export default onSelectPages; 