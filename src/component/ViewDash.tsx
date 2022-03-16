import React, { useState } from "react";
import { bg_head, color, vino } from "../css/colors";

interface IDash {
    elements: { title: string, icon: any, view: any }[];
};

const ViewDash: React.FC<IDash> = ({ elements }) => {

    const [active, setActive] = useState(elements[0]);

    return (
        <div className="row py-4 bg-white">
            <div className="col-md-2 py-3 px-4" style={{borderRightStyle:"solid", borderColor: vino}}>
                {elements.map((val: any, index) =>
                    <div className="row py-1" key={index} onClick={() => { setActive(val) }}  >
                        <div className="col-md-12">

                        </div>
                        <div className="btn col-md-12 text-center rounded" style={active.title === val.title? {backgroundColor:bg_head, color:color}: {}}>
                            <h6><b>{val.title}</b></h6>
                        </div>
                        
                    </div>
                )}
            </div>
            <div className="col-md-10 py-3">
                {active.view}
            </div>
        </div>
    )
};



export default ViewDash;