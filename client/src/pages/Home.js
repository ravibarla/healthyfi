import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout";
function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log("Error :", err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Layout />
    </div>
  );
}

export default Home;
