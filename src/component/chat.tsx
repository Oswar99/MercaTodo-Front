import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import { decodeToken, getServer } from '../helpers/setup.helper';
import { getChats, getMessages, getUser } from '../services/services.service';
import { UpdatingView2 } from './ComponentUpdatingView';


interface IChat {
  producto: string,
  cliente: string,
  vendedor: string,
  off: string,
  from: string,
  setUpdd: (t: boolean) => void;
};

export const ViewChats: React.FC = () => {
  const [upd, setUpd] = useState(false);
  const [upd2, setUpd2] = useState(false);
  const [chats, setChats] = useState([]);
  const [Messages, setMessages] = useState([]);
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState({
    _id: "",
    enabled: false,
    verified: false,
    user_type: ""
  });

  function onSelect(txt: string) {
    setSelected(txt);
    const data = {
      key: localStorage.getItem("acc"),
      filter: {
        id: txt
      }
    };
    getMessages(data).then(t => {
      if (t.data.successed) {
        setMessages(decodeToken(t.data.key))
      };
    });
  };

  useEffect(() => {
    if (!upd) {
      setUpd(true);
      setUpd2(true);
      const t = localStorage.getItem("us-01");
      setUser(decodeToken(t!));
      getChats().then(v => {
        if (v.data.successed) {
          setChats(decodeToken(v.data.key));
          setUpd2(false);
        };
      });
    };
  }, [upd, chats]);

  return (
    <div className=''>

      <div className='row'>
        <div className='col-md-3 rounded'>
          {chats.map((val: any, index) =>
            <ElmentViewChat key={index} element={val} setSelected={onSelect} us={user} setMessage={setMessages} />
          )}
          {chats.length === 0 && !upd2 && 
            <small>No hay chats</small>
          }
          {upd2 && (
            <UpdatingView2 />
          )}
        </div>
        {Messages.length > 0 &&
          <div className='col-md-9 rounded row' style={{ backgroundColor: "#F2F2F2", alignItems: "end" }}>
            <div className='col-md-12'>
              {selected && (
                <div className="rounded bg-white py-2 row justify-content-center shadow-sm" style={{ marginTop: 5, marginBottom: 5 }}>
                  <Link to={`/detalles/${selected.split("-")[0]}`}>Ver detalles del producto</Link>
                </div>
              )}
              <div className='thinBar2' style={{ maxHeight: window.innerHeight * 0.62, overflowY: "auto" }}>
                {Messages.map((val: any, index) =>
                  <div key={index} className={`col-md-12 d-flex ${(val.of === user._id) ? 'justify-content-end' : ''}`} style={{ marginBottom: 5, marginTop: 5 }}>
                    <div className={"bg-white py-2 px-4 rounded"}>
                      <h6>{val.message}</h6>
                      <small>{new Date(val.date).toLocaleString()}</small>
                    </div>
                  </div>
                )}
              </div>

              <div className=' bg-white rounded-lg shadow-sm py-2 container-fluid text-center col-md-12' style={{ marginBottom: 15, marginTop: 15 }}>
                {selected ?
                  <ChatComponent
                    producto={selected.split("-")[0]}
                    cliente={selected.split("-")[1]}
                    vendedor={selected.split("-")[2]}
                    from={(selected.split("-")[1] === user._id) ? selected.split("-")[2] : selected.split("-")[1]}
                    off={user._id}
                    setUpdd={setUpd}
                  />
                  :
                  <h6>Seleccione una conversacion</h6>
                }
              </div>
            </div>
          </div>
        }
        {Messages.length === 0 && (
          <div className='col-md-9 text-center' style={{}}>
          </div>
        )}
      </div>
    </div>

  )
};

interface IEVC {
  element: string,
  us: any,
  setMessage: (t: []) => void;
  setSelected: (e: string) => void;
};

const ElmentViewChat: React.FC<IEVC> = ({ element, setSelected, us, setMessage }) => {
  const [user, setUser] = useState({ name: "", dep: "" });
  const [upd, setUpd] = useState(false);
  const [upd2, setUpd2] = useState(true);
  const socket = socketIOClient(getServer());

  useEffect(() => {
    if (!upd) {
      socket.emit("join_room", element);
      socket.on("receive_message", (data: any) => {
        setMessage(data)
      });
      setUpd(true);
      const data = {
        key: localStorage.getItem("acc"),
        filter: {
          _id: (element.split("-")[1] === us._id) ? element.split("-")[2] : element.split("-")[1]
        }
      };
      getUser(data).then(c => {
        if (c.data.successed) {
          setUser(decodeToken(c.data.key));
        };
        setUpd2(false);
      });
    };
  }, [upd, upd2, element, us, socket, setMessage]);

  if (upd2) {
    return (<div></div>)
  }

  return (
    <div onClick={() => { setSelected(element) }} className="btn container-fluid rounded-lg shadow-sm py-2" style={{ borderStyle: "solid", borderWidth: 0.5, borderColor: "#F3F781" }}>
      <h6 className="rounded py-1" style={{ backgroundColor: "#F5F6CE" }} ><b>{(element.split("-")[1] === us._id) ? "Vendedor" : "Cliente"}</b></h6>
      <h6>{user.name}</h6>
      <small>{user.dep}</small>
    </div>
  )
}

const ChatComponent: React.FC<IChat> = ({ producto, cliente, off, from, vendedor, setUpdd }) => {
  const [upd, setUpd] = useState(false);
  const [txt, setTxt] = useState("");
  const socket = socketIOClient(getServer());

  async function emitMessage() {
    const data = {
      from: from,
      of: off,
      message: txt,
      id: `${producto}-${cliente}-${vendedor}`,
      product: producto,
      date: new Date(),
    }
    socket.emit("send_message", data);
    setTxt("");
    setUpdd(false);
  };

  useEffect(() => {
    if (!upd) {
      setUpd(true);
      const room = `${producto}-${cliente}-${vendedor}`;
      socket.emit("join_room", room);
    };

  }, [upd, producto, cliente, vendedor, socket]);

  return (
    <div className='container-fluid'>
      <div className="py-2 row" style={{}} >
        <input className='form-control col-md-10' onChange={(e) => { setTxt(e.target.value) }} value={txt} placeholder="Enviar un Mensaje al Vendedor" />
        <button className='btn btn-primary col-md-2' onClick={emitMessage} >Enviar</button>
      </div>
    </div>
  );
}

export default ChatComponent;