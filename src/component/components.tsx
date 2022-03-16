import React, { useEffect, useState } from "react";
import fv from "../img/g-icons/favorite.png";
import cart from "../img/g-icons/cart.png";
import { Link } from "react-router-dom";

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

interface ICardE{
  val:any
}

export const CardE: React.FC<ICardE> = ({val}) => {
  return (
    <div className="card py-2 col-md-2">

      <div className="" style={{ position: "relative" }}>
        <img src="https://anthoncode.com/wp-content/uploads/2020/01/logo-batman-old.png" alt="1" width="100%" />
        <h6 style={{ marginTop: 20 }}><b>{val.name}</b></h6>
        <p>{val.description}</p>
        <p><b>Precio: </b>{val.value}</p>
      </div>

        <button className="btn btn-primary" style={{ marginBottom: 6 }}>
          <img src={cart} alt="cart" width={25} style={{ marginRight: 8 }} />
          Detalles del Producto
        </button>

        <button className="btn btn-secondary" style={{ marginBottom: 6 }}>
          <img src={fv} alt="fv" width={25} style={{ marginRight: 8 }} />
          Agregar a Favoritos
        </button>

    </div>
  )
};

export const ListE: React.FC = () => {
  
  const [update, setUpdate] = useState(true);

  if(!update){
    return(
      <Link to="/dashboard" />
    )
  }
  
  return (
    <div className="container-fluid py-2">
      <div className="row">
        <button onClick={()=>setUpdate(false)}>mover</button>
      </div>
    </div>

  )
};


