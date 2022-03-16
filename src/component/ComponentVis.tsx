import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { encodeToken } from "../helpers/setup.helper";
import iconDelete from "../img/g-icons/baseline_delete_white_24dp.png";
import { deleteFile } from "../services/file.service";


interface IComponentVis {
    elements: any[],
    interval?: number,
    width?: string,
    height?: string,
    deleteButton? : boolean;
}

const ComponentVis: React.FC<IComponentVis> = ({ elements, interval }) => {
    return (
        <Carousel className="rounded-lg shadow-sm" fade interval={interval ? interval : 1000} style={{ borderStyle: "solid", borderWidth: 1, borderColor: "#E0F8E0" }} >
            {elements.map((val: any, index) =>
                <Carousel.Item key={index}>
                    {val.imagen}
                    <Carousel.Caption>
                        <h3>{val.titulo}</h3>
                        <p>{val.descripcion}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            )}
        </Carousel>
    )
};

export const ComponentVis2: React.FC<IComponentVis> = ({ elements, interval, width, height, deleteButton }) => {
    const [visible, setVisible] = useState(false);

    async function deleteImage(data: any){
        if(deleteButton){
            const d: string = encodeToken({
                key: localStorage.getItem("acc"),
                filter: {route : data.route}
            });
            await deleteFile(d).then(v=>{
                if(v.data.successed){
                    window.location.reload();
                };
            });
        };
    };

    if (elements.length > 0) {
        return (
            <Carousel className="rounded-lg" fade interval={interval ? interval : 1000} style={{}} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} >
                {elements.map((val: any, index) =>
                    <Carousel.Item key={index}>
                        <img src={val.file} alt={val.route} className="rounded-lg" style={{ width: width ? width : "100%", height: height ? height : "" }} />
                        <Carousel.Caption style={(visible && deleteButton) ? { color: "black" } : { display: "none" }}>
                            <button className="btn btn-danger" onClick={()=> deleteImage(val)}>
                                <img src={iconDelete} width="22px" alt="delete" style={{marginRight:5}} />
                                Eliminar
                            </button>
                            <hr />
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        )
    } else {
        return (
            <img src="http://pngimg.com/uploads/box/box_PNG49.png" alt={"Error"} className="rounded-lg" style={{ width: width ? width : "100%", height: height ? height : "" }} />
        )
    }
};

export default ComponentVis;