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

export function getFile(id:any): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken(id);
        axios.get(`${query}/document/${data}`, {responseType: 'blob'})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getInfFile(id:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.get(`${query}/archivo/${id}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function postUser(data: any): Promise<any>{
    return new Promise<any>( resolve => {
        const t = encodeToken(data);
        axios.post(`${query}/users`, {key:t})
            .then(result => resolve(result) )
            .catch(error => resolve( {data: {successed:false, message: error.message}} ) );
    });
};