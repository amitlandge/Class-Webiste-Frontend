import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../constants/server.js";
import { toast } from "react-toastify";

const useCourseName = () => {
  const [data, setData] = useState();
  const getInitialData = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/course/getCourseName`, {
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

export { useCourseName };
