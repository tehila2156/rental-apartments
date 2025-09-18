import axios from "axios";


export const getAllcategory=()=>
{
    return axios.get(`http://localhost:3001/category/getAll`)
}
export const addCategory = (category) => {
  return axios.post("http://localhost:3001/category/Add_category", category);
};

