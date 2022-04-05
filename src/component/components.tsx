import React, { useEffect, useState } from "react";
import fv from "../img/g-icons/favorite.png";
//import cart from "../img/g-icons/cart.png";
import { Link } from "react-router-dom";
import { getFile, getFiles } from "../services/file.service";
import { decodeToken, encodeToken } from "../helpers/setup.helper";
import mt from "../img/mercatodo.png";
import { bg_head } from "../css/colors";
import { getReports } from "../services/user.service";

export const LstReports: React.FC = () => {
  const [update, setUpdate] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!update) {
      setUpdate(true);
      getReports(encodeToken({ key: localStorage.getItem("acc") })).then(v => {
        if (v.data.successed) {
          const t = decodeToken(v.data.key);
          setElements(t)
          console.log(t)
        };
      });
    };
  }, [update, elements]);

  return (
    <div className="container-fluid">
      {elements.map((val: any, index) =>
        <div key={index} className="row rounded shadow-sm">
          <div className="col-md-9 py-2">
            <h4><b>{val.title}</b></h4>
            <h6>{val.description}</h6>
            <h6><b>Usuario reportado: </b><Link to={`/usuarios/${val.userReported}`}>{val.reported[0].user_name}</Link></h6>
          </div>
          <div className="col-md-3">
          </div>
          <div className="col-md-12 rounded text-center" style={{backgroundColor:"#F2F2F2"}}>
            <b>Reportado por: </b><Link to={`/usuarios/${val.reportedBy}`}>{val.informer[0].user_name}</Link><b> - {new Date(val.date).toLocaleString()}</b>
          </div>
        </div>
      )}
    </div>
  )
};


interface ISetDep {
  setDep: (e: string) => void;
  place?: string,
}
export const SelectDepartament: React.FC<ISetDep> = ({ setDep, place }) => {

  return (
    <select className="form-control" onChange={(e) => setDep(e.target.value)} >
      <option value="" >{place ? place : "Seleccionar Departamento"}</option>
      <option value="ATLANTIDA" >ATLANTIDA</option>
      <option value="CHOLUTECA" >CHOLUTECA</option>
      <option value="COLON" >COLON</option>
      <option value="COMAYAGUA" >COMAYAGUA</option>
      <option value="COPAN" >COPAN</option>
      <option value="CORTES" >CORTES</option>
      <option value="EL PARAISO" >EL PARAISO</option>
      <option value="FRANCISCO MORAZAN" >FRANCISCO MORAZAN</option>
      <option value="GRACIAS A DIOS" >GRACIAS A DIOS</option>
      <option value="INTIBUCA" >INTIBUCA</option>
      <option value="ISLAS DE LA BAHIA" >ISLAS DE LA BAHIA</option>
      <option value="LA PAZ" >LA PAZ</option>
      <option value="LEMPIRA" >LEMPIRA</option>
      <option value="OCOTEPEQUE" >OCOTEPEQUE</option>
      <option value="OLANCHO" >OLANCHO</option>
      <option value="SANTA BARBARA" >SANTA BARBARA</option>
      <option value="VALLE" >VALLE</option>
      <option value="YORO" >YORO</option>
    </select>
  )
}

export const CardE2: React.FC = () => {
  return (
    <div className="container-fluid rounded bg-light col-md-4">
      <div className="row">
        <div className="col-md-4">
          dasnfiasdasffas
        </div>
        <div className="col-md-8">
          <img src="https://anthoncode.com/wp-content/uploads/2020/01/logo-batman-old.png" alt="d" width="100%" ></img>
        </div>
      </div>
    </div>
  )
}

interface ICardE {
  val: any,
  main?: boolean
  classValue?: string
}

export const CardE: React.FC<ICardE> = ({ val, main, classValue }) => {

  const [update, setUpdate] = useState(false);
  const [selected, setSelected] = useState([{ file: "" }]);
  const [up, setUp] = useState(false);

  useEffect(() => {
    if (!update) {
      setUpdate(true);
      const kfiles = {
        filter: { father: val._id }
      }
      getFiles(kfiles).then(async m => {
        if (m.data.successed) {
          const data: any[] = await decodeToken(m.data.key);
          const lst: { file: string }[] = [];
          const t:number = 10
          t.toPrecision()
          if (data.length > 0) {
            await getFile({ type: data[0]!.type, route: data[0]!.route }).then(v => {
              if (v.status === 200) {
                lst.push({
                  file: URL.createObjectURL(v.data)
                });
              };
            });
          };

          setSelected(lst);
        };
      });
    };
  }, [update, val]);

  return (
    <div className={classValue ? classValue : "card py-2 col-md-2"} onMouseOver={() => setUp(true)} onMouseLeave={() => setUp(false)} style={up ? { borderStyle: "solid", borderColor: bg_head } : {}}>

      <div className="card" style={{ position: "relative" }}>
        <div style={{height:200, alignContent:"center", display:"block"}}>
          <img src={selected[0].file ? selected[0].file : mt} alt={val.name} className="rounded-lg" style={{ width: "100%", height:"100%" }} />
        </div>
        <h6 style={{ marginTop: 20 }}><b>{val.name.substring(0,25)}</b></h6>
        <p>{new Date(val.date).toLocaleString()}</p>
        <p><b>{
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'HNL',
          }).format(val.value)
        }</b></p>
        {main && <Link className="stretched-link" to={`/detalles/${val._id}`} />}
      </div>

      {main ? (
        <button className="btn btn-secondary" style={{ marginBottom: 6 }}>
          <img src={fv} alt="fv" width={25} style={{ marginRight: 8 }} />
          Agregar a Favoritos
        </button>

      ) :
        <Link className="stretched-link" to={`/productos/${val._id}`} />
      }


    </div>
  )
};

export const CardE3: React.FC<ICardE> = ({ val }) => {

  const [update, setUpdate] = useState(false);
  const [selected, setSelected] = useState([{ file: "" }]);
  const [up, setUp] = useState(false);

  useEffect(() => {
    if (!update) {
      setUpdate(true);
      const kfiles = {
        filter: { father: val._id }
      }
      getFiles(kfiles).then(async m => {
        if (m.data.successed) {
          const data: any[] = await decodeToken(m.data.key);
          const lst: { file: string }[] = [];

          if (data.length > 0) {
            await getFile({ type: data[0]!.type, route: data[0]!.route }).then(v => {
              if (v.status === 200) {
                lst.push({
                  file: URL.createObjectURL(v.data)
                });
              };
            });
          };

          setSelected(lst);
        };
      });
    };
  }, [update, val]);

  return (
    <div className="card py-2 col-md-12" onMouseOver={() => setUp(true)} onMouseLeave={() => setUp(false)} style={up ? { borderStyle: "solid", borderColor: bg_head } : {}}>

      <div className="row">
        <div className="col-md-2">
          <img src={selected[0].file ? selected[0].file : mt} alt={val.name} className="rounded-lg" style={{ width: "100%", height: 200 }} />
        </div>
        <div className="col-md-10">
          <div className="card" style={{ position: "relative" }}>
            <h6 style={{ marginTop: 20 }}><b>{val.name}</b></h6>
            <p>{val.description}</p>
            <p>{new Date(val.date).toLocaleString()}</p>
            <p><b>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'HNL',
          }).format(val.value)}</b></p>
            <Link className="stretched-link" to={`/detalles/${val._id}`} />
          </div>

          <button className="btn btn-secondary" style={{ marginBottom: 6 }}>
            <img src={fv} alt="fv" width={25} style={{ marginRight: 8 }} />
            Agregar a Favoritos
          </button>

        </div>
      </div>



    </div>
  )
};

export const ListE: React.FC = () => {

  const [update, setUpdate] = useState(true);

  if (!update) {
    return (
      <Link to="/dashboard" />
    )
  }

  return (
    <div className="container-fluid py-2">
      <div className="row">
        <button onClick={() => setUpdate(false)}>mover</button>
      </div>
    </div>

  )
};


