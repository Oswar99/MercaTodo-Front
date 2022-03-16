import axios from "axios";
import { encodeToken, getServer } from "../helpers/setup.helper";

axios.interceptors.request.use(
    config =>{
        config.headers.authorization = encodeToken({key:`Bearer ${process.env.REACT_APP_KEY!}`, user: localStorage.getItem("acc")});
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);

const query: string = getServer();
//const query: string = `${process.env.REACT_APP_API!}`;

export function postCategory(data:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.post(`${query}/categories`, {key : data})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getAllCategoryByFilter(data:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.get(`${query}/categories/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function deleteCategories(data:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.delete(`${query}/categories/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};