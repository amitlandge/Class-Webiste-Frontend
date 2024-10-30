import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../constants/server.js";
import { toast } from "react-toastify";

const useGetData = (url) => {
  const [data, setData] = useState();
  const getInitialData = async () => {
    console.log(`${server}/${url}`);
    try {
      const res = await axios.get(`${server}/${url}`, {
        withCredentials: true,
      });
      setData(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went Wrong");
    }
  };
  useEffect(() => {
    getInitialData();
  }, []);
  return [data, getInitialData];
};

export { useGetData };
