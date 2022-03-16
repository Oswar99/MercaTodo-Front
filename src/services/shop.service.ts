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

export function postTienda(key:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.post(`${query}/shops`, {key : key})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function postProducto(key:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.post(`${query}/products`, {key : key})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function delProducto(key:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.delete(`${query}/products/${key}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function updateProducto(key:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.put(`${query}/products`, {key : key})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getAllTiendas(id:any): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken(id);
        axios.get(`${query}/shops/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getAllProductos(id:any): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken(id);
        axios.get(`${query}/products/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getAllP(id:any): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken(id);
        axios.get(`${query}/v3/products/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getLastProductos(id:any): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken(id);
        axios.get(`${query}/v2/products/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getProductByFilter(id:any): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken(id);
        axios.get(`${query}/v1/products/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};