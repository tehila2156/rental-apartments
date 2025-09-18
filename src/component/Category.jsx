import { useEffect } from "react"
import { getAllcategory } from "../api/category";



export const Category=()=>
{
    
     getAllcategory()
     .then(x=>{
        console.log(x);
     })
    return<>


    </>
}

