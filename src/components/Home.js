import { useState } from "react";
// import { Router, Switch, Link } from "react-router-dom";
import { API_submit, API_all } from "../config.json";
import { nanoid } from "nanoid";

function Home({action}) {
  // data
  const [orginalUrl, setOrginalUrl] = useState("");
  const [message, setMessage] = useState();
  const [newData, setNewData] = useState();

  const msgType = {
    ok: "alert alert-success mb-2",
    notOk: "alert alert-warning mb-2",
  };

  // action
  const handleUrlChange = (e) => {
    setOrginalUrl(e.target.value);
  };

  // url validation
  function isUrl(str) {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = () => {
    if (isUrl(orginalUrl)) {
      // alert(nanoid(8))
      submit();
    } else {
      alert("Please enter a valid URL!");
      setOrginalUrl("");
    }
  };

  const submit = () => {
    const d = {
      orginalUrl: orginalUrl,
      shortUrl: nanoid(8),
    };
    fetch(API_submit, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(d),
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log("Res", res);
        if (res.response.ok) {
          action.update(res.response.ok)
          setNewData(res.data)
          setMessage(res.response);
          setOrginalUrl("")
        } else {
          setMessage(res.response);
        }
      })
      .catch((e) => {
        console.log("err: ", e);
      });
  };

  // components
  const Message = () => {
    return (
      <>
        {message && (
          <div className={message.ok ? msgType.ok : msgType.notOk} role="alert">
            {message.message}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </>
    );
  };

  // new item
  const NewItem =(info)=>{
    return (
      <div key={info.id} className="card shadow">
        <div className="card-body py-2 px-2">
        {Message()}
          <div className="row mx-0">
            {/*  */}
            <div className="col-6 px-1">
              <h6 className="text-center mb-0 text-danger">
                <a target="_blank" href={info.orginalUrl} rel="noreferrer">
                  {info.orginalUrl}
                </a>
              </h6>
            </div>
            {/*  */}
            <div className="col-6 px-1 ">
              <h6 className="text-center mb-0">
                <a
                  target="_blank"
                  href={API_all + info.shortUrl}
                  rel="noreferrer"
                  >
                  {API_all + info.shortUrl}
                  </a>
                {/* <i className="fa fa-copy px-2" style={{cursor : "copy"}} onClick={()=>copy(i)} ></i> */}
              </h6>
            </div>
            {/*  */}
            {/* <div className="col-2 px-1">
              <h4 className="text-center mb-0">
                <span className="badge badge-success">{info.clicks}</span>
              </h4>
            </div> */}
            {/*  */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card shadow mb-2">
        <div className="card-body">
          <h4 style={{ color: "#686" }} className="text-center">
            Make Your Long URL Short
          </h4>
          <div className="row m-auto mb-2">
            <div className="col-lg-10 col-md-10 col-sm-10 m-auto">
              <div className="form-group">
                <input
                  type="url"
                  className="form-control form-control-lg"
                  id="url"
                  placeholder="https://example.com/xyz?param=0..."
                  value={orginalUrl}
                  onChange={handleUrlChange}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 text-center pt-1">
              <button className="btn btn-info m-auto " onClick={handleSubmit}>
                SHORT <i className="fa fa-link"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/*  */}
        { newData && NewItem(newData)}
      {/*  */}
    </>
  );
}

export default Home;
