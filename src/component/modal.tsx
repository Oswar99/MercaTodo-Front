import React, { useState } from "react";

interface IModalProps{
    title: string;
    description: string;
    lbl_main_btn: string;
    lbl_snd_btn?: string;
    show: boolean;
    submitting: boolean;
    completed?: boolean;
    closeModal: () => void;
    accept: (e:string) => void;  
}

const Modal: React.FC<IModalProps> = ({title,description,lbl_main_btn,lbl_snd_btn,show,closeModal,accept,submitting,completed}) => {    
    const [des, setDes] = useState("");
    return(
        <div className="modal" tabIndex={0} role="dialog" aria-hidden="true" style={ show ? {display:"block", background:"rgba(0, 3, 18, 0.3)"} : {display:"none"}   } >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                {(!submitting) && (
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ closeModal }>
                        <span aria-hidden="true">&times;</span>
                    </button>
                )}
                
              </div>
              <div className="modal-body">
                <textarea className="form-control" placeholder="Describa por el cual reporta al usuario" onChange={(e) => setDes(e.target.value)} />
              </div>
              <div className="modal-footer">
                  { (lbl_snd_btn) && (!submitting) && (!completed) && (
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={ closeModal } >{lbl_snd_btn}</button>
                  )}                
                <button type="button" className="btn btn-primary" onClick={() => {accept(des)}} disabled={ submitting? true : false } >
                    {submitting? "" : lbl_main_btn}
                    {(submitting)  && (
                        <div>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}          
                </button>

              </div>
            </div>
          </div>
        </div>
    );

}

export default Modal;