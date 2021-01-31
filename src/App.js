import "./App.css";
import {useState, useEffect} from 'react'
// import { Router, Switch, Link } from "react-router-dom";
import Navbar from "./components/Nav";
import Home from "./components/Home";
import List from "./components/List";
import { API_all } from "./config.json";

function App() {
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated]= useState(true)

  useEffect(()=>{
    if( isUpdated){
     fetch('https://short-link-api-app-01.herokuapp.com/')
     .then((response)=>response.json())
     .then((data)=>{
        setIsUpdated(false);
       //  console.log(data); 
         setData(data.data);
       })
     }
   })

  const updateState=(flag)=>{
    setIsUpdated(flag)
   // console.log("call update");
  }

  
 
    
  // action
  return (
    <>
      <Navbar />
      <div className="row mt-5 pt-5 mx-0">
        <div className="col-lg-7 col-md-8 col-sm-9 m-auto">
          <Home action={{update: updateState.bind(this)}} />
        </div>
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-lg-7 col-md-8 col-sm-9 m-auto">
          <button
            className="btn btn-secondary m-auto shadow"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            List of Short Links{" "}
            <span style={{ fontSize: 18 }} className="badge badge-info">
              {data.length}
            </span>
          </button>
          <div className="collapse my-3" id="collapseExample">
            <div className="card p-2 shadow">
              {/* .............. */}
              <div className="row mx-0 mb-2">
                {/*  */}
                <div className="col-5 px-1">
                  <h5 className="text-center mb-0">
                    Url
                  </h5>
                </div>
                {/*  */}
                <div className="col-5 px-1 ">
                  <h5 className="text-center mb-0">
                    Short
                  </h5>
                </div>
                {/*  */}
                <div className="col-2 px-1">
                  <h5 className="text-center mb-0">Click</h5>
                </div>
                {/*  */}
              </div>

              {/* .............. */}
              <List data={data} action={{update: updateState.bind(this)}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
