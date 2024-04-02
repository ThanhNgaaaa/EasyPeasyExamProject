import axios from "axios";

const request = axios.create({
    baseURL:'https://localhost:7121/api/'
})
export const get=async(path,option={})=>{
    const response= await request.get(path, option);
    return response;
}
export const post = async(path,option={})=>{
    const response= await request.post(path, option);
    return response;
}
export default request;