// import { useState } from "react";
// import { Router, Switch, Link } from "react-router-dom";
import { API_all } from "../config.json";


function List({ data ,action }) {
  // console.log(data);

  // action
//  const copy =(i) =>{
//     const copyText = document.getElementById(`short${i}`);
//     console.log(copyText);
//     {copyText.select()}
//     {copyText.setSelectionRange(0, 99999)} /* For mobile devices */
//     {document.execCommand("copy");}
//     console.log("Copied!");
//   }

  return (
    <div>
      {data.length > 0 ? (
        data.map((info, i) => {
          return (
            <div key={i} className="card shadow">
              <div className="card-body py-1 px-1">
                <div className="row mx-0">
                  {/*  */}
                  <div className="col-5 px-1">
                    <h6 className="text-center mb-0 text-danger">
                      <a target="_blank" href={info.orginalUrl} rel="noreferrer">
                        {info.orginalUrl}
                      </a>
                    </h6>
                  </div>
                  {/*  */}
                  <div className="col-5 px-1 ">
                    <h6 className="text-center mb-0">
                      <a
                        target="_blank"
                        href={ API_all + info.shortUrl}
                        rel="noreferrer"
                        onClick={()=>{action.update(true)}}
                        >
                        {/* <h6 id={`short${i}`} value={window.location.origin + "/" + info.shortUrl}> */}
                        { API_all + info.shortUrl}
                        {/* </h6> */}

                      </a>
                      {/* <i className="fa fa-copy px-2" style={{cursor : "copy"}} onClick={()=>copy(i)} ></i> */}
                    </h6>
                  </div>
                  {/*  */}
                  <div className="col-2 px-1">
                    <h4 className="text-center mb-0">
                      <span className="badge badge-success">{info.clicks}</span>
                    </h4>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="card shadow">
          <div className="card-body py-1 px-1">
            <div className="row mx-0">
              {/*  */}
              <div className="col px-1">
                <h5 className="text-center mb-0 text-danger">
                  -- No data found --
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
