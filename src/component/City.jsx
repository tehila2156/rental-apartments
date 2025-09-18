import { useEffect } from "react"
import {  getAllc } from "../api/city";





export const City=()=>
{
     getAllc()
     .then(x=>{
        console.log(x);
     })
    return<>
    </>
}

