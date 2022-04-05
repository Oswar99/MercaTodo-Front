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

export function getChats(): Promise<any>{
    return new Promise<any>( resolve => {
        const data = encodeToken({key: localStorage.getItem("acc")})
        axios.get(`${query}/chats/${data}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getMessages(data:any): Promise<any>{
    return new Promise<any>( resolve => {
        const dt = encodeToken(data);
        axios.get(`${query}/messages/${dt}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};

export function getUser(data:any): Promise<any>{
    const dt = encodeToken(data);
    return new Promise<any>( resolve => {
        axios.get(`${query}/user/${dt}`)
        .then(result => resolve(result) )
        .catch(error => resolve( {data: {successed:false}} ) );
    });
};