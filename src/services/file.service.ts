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

export function postFile(data:FormData, father: string = "root", descripcion: string = "Sin Descripcion"): Promise<any>{
    return new Promise<any>( resolve => {
        axios.post(`${query}/files`, data, {responseType: 'blob', headers:{body: encodeToken({key:localStorage.getItem("acc"), father: father, descripcion: descripcion}) }})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function deleteFile(data: string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.delete(`${query}/files/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getFiles(data:any): Promise<any>{
    return new Promise<any>( resolve => {
        const id: string = encodeToken(data);
        axios.get(`${query}/files/${id}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getFile(id:any): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken(id);
        axios.get(`${query}/file/${data}`, {responseType: 'blob'})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};