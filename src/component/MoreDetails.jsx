import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { useParams } from "react-router-dom";
import { getByApartmentCode } from "../api/apartments";



export const MoreDetails=()=>
{
    const { id } = useParams();
    console.log("id from useParams:", id);
      const[apartment1,setapartment1]=useState();
       useEffect(() => {
          if (id) {
            getByApartmentCode(id)
              .then((res) => {
                setapartment1(res.data);
              })
              .catch((err) => {
                console.error("Error fetching apartments:", err);
              });
          }
        }, [id]); 

    return<>
    
    {
        apartment1&&
    
    <>
     <div className="apartment-card" >
              <h5>{apartment1.apartmentName}</h5>
                          <img src={`http://localhost:3001/images/${apartment1.src}`}  alt="דירה"   style={{ width: "180px", height: "180px", objectFit: "cover" }}/>
              <br></br>
              <h5>{apartment1.description}</h5>
              <h5>{apartment1.Extras}</h5>
              מספר מיטות: <h5>{apartment1.numofbeds}</h5>
             
              מחיר: <p>₪{apartment1.price}</p>
              <p>
                עיר: {apartment1.cityCode?.cityName || apartment1.cityCode || "לא ידוע"}
              </p>
            בעל הדירה: 
             <h5>{apartment1.asvertiserCode?.name}</h5>
              <h5>{apartment1.asvertiserCode?.phone}</h5>
              <h5>{apartment1.asvertiserCode?.email}</h5>
              <hr />
            </div>
    </>
}
    </>
}