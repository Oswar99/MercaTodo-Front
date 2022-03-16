import React, { useEffect, useState } from "react";
import "../css/main.css";
import useFormHelper from "../helpers/useFormHelper";
import {postFile} from "../services/file.service"

interface IFileUp2{
    father?: string,
}

const FileUp2: React.FC<IFileUp2> = ({father}) => {
    const [update, setUpdate] = useState(true);
    const [selected, setSelected] = useState([{file: ""}]);
    const states = useState({
        selectedFiles: null,
    });

    const {
        values,
        updateValues,
    } = useFormHelper(states);

    async function onFileChange(e: any) {
        updateValues({
            selectedFiles: e.target.files,
        });
        const lst : {file:string}[] = [];
        for(let element of e.target.files){
            lst.push({
                file: URL.createObjectURL(element)
            })
        };
        setSelected(lst);
        setUpdate(false);
    };

    useEffect(()=>{
        const onUploadFiles = async () => {
            if (father && !update) {
                setUpdate(true);
                for(let element of values.selectedFiles){
                    const formData = new FormData();
    
                    formData.append(
                        "file",
                        element,
                        element.name
                    );
        
                    formData.append('_method', 'PUT');
     
                    await postFile(formData, father);
                }
                window.location.reload();
            };
        };
        onUploadFiles();
    }, [update, father, values.selectedFiles]);

    return (
        <div className="rounded-lg shadow text-center">
            <div className="rounded form-group inputDnD">
                <label className="sr-only" htmlFor="file">Selecciona un archivo</label>
                <input
                    id="file"
                    type="file"
                    name="file"
                    accept="image/*"
                    className="form-control-file text-primary font-weight-bold"
                    onChange={onFileChange}
                    data-title="Arrastra tu archivo o haz click aqui."
                    multiple
                />
            </div>
            <div className="rounded-lg container-fluid">
                {(selected[0].file) && selected.map((val:any, index)=>
                    <img src={val.file} alt={index.toString()} key={index} width="100px" />
                )}
            </div>
        </div>
    )
}

export default FileUp2;