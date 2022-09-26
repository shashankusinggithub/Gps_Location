import React, { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/RingLoader";
import "./index.css";
import axios from "axios";
import PTable from "./PTable";
import ClipLoader from "react-spinners/ClipLoader";


const Main = () => {
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };

  const [tempList, setTemplist] = useState([]);
  const [loading, setLoading] = useState(true);

  const override: CSSProperties = {
    display: "block",
    margin: "30vh",
    borderColor: "red",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/devices`, { headers })
      .then((response) => {
        setTemplist(response.data);
        // setLoading(false);
        setTimeout(() => {
          setLoading(false)
        }, 10000);
        return response;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers.pre);
          if ("jwt" in error.response.data) {
            localStorage.clear();
            window.location = "/";
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);

  return loading ?
  <PacmanLoader color={'#36D7B7'} loading={loading}
css={override} size={150} />  :
     ( <div className="maincontainer">
        {!loading && <PTable allList={tempList} />}
      </div>
  );
};

export default Main;
