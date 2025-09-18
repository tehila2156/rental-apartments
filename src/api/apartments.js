import axios from "axios";


export const getAll=()=>
{
    return axios.get(`http://localhost:3001/apartment/getAll`)
}

export const getByAdvertiserCode=(code)=>
{
  const token = localStorage.getItem("token");

  //ככה שולחים דרך הURL
    return axios.get(`http://localhost:3001/apartment/getByAdvertiserCode/${code}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}


export const getByApartmentCode=(code)=>
{

  //ככה שולחים דרך הURL
    return axios.get(`http://localhost:3001/apartment/getById/${code}`  
    
    )
}

export const lesthen5beds=()=>
{
const token = localStorage.getItem("token");
    return axios.get(`http://localhost:3001/apartment/getByLessThen5Beds`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )

}




export const updateApartment=(user,id)=>
{
const token = localStorage.getItem("token");
    return axios.put(`http://localhost:3001/apartment/update/${id}`,user  ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )

}


export const del=(id)=>
{
const token = localStorage.getItem("token");
    return axios.delete(`http://localhost:3001/apartment/deleteApartment/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )

}






export const lessthen500shac=()=>
{
const token = localStorage.getItem("token");
    return axios.get(`http://localhost:3001/apartment/getByLessThen500Price`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )

}

export const Morethen500sh=()=>
{
const token = localStorage.getItem("token");
    return axios.get(`http://localhost:3001/apartment/getByMoreThen500Price`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )

}
export const Morethen1500sh1=()=>
{
const token = localStorage.getItem("token");
    return axios.get(`http://localhost:3001/apartment/getByMoreThen500Price`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )

}



export const Morethen5beds=()=>
{
const token = localStorage.getItem("token");
    return axios.get(`http://localhost:3001/apartment/getByMoreThen5Beds`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )

}




 export const add=(newApartment)=>
{
    const token = localStorage.getItem("token");
    return axios.post(`http://localhost:3001/apartment/Add_apartment`, newApartment,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )
}

