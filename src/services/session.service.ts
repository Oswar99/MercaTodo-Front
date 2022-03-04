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

export function getAccess(data:any): Promise<any>{
    return new Promise<any>( resolve => {
        const id: string = encodeToken(data);
        axios.get(`${query}/access/${id}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function userLogIn(key:string): Promise<any>{
    return new Promise<any>( resolve => {
        axios.post(`${query}/login`, {key : key})
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};
