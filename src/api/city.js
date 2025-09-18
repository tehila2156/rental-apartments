import axios from "axios";


export const getAllc=()=>
{
    return axios.get(`http://localhost:3001/city/getAll`)
}
export const addCity = (city) => {
  return axios.post("http://localhost:3001/city/Add_city", city);
};


