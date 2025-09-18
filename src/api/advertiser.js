import axios from "axios";


export const getAlladvertiser=()=>
{
    return axios.get(`http://localhost:3001/advertiser/getAll`)
}
export const sign_in=(user)=>
{
    return axios.post(`http://localhost:3001/advertiser/sign-in`, user)
}
export const sign_up=(user)=>
{
    return axios.post(`http://localhost:3001/advertiser/register`, user)
}