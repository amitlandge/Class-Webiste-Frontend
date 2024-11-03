import axios from "axios";
import { useState } from "react";
import { server } from "../constants/server.js";
import { toast } from "react-toastify";

const usePostUpdate = () => {
  const [loader, setLoader] = useState(false);

  const postUpdate = async (data) => {
    try {
      setLoader(true);
     
      let res;
      if (data.method === "POST") {
        console.log(`${server}/${data.url}`);
        res = await axios.post(`${server}/${data.url}`, data.payload, {
          withCredentials: true,
          headers: data?.headers
            ? data?.headers
            : { "Content-Type": "application/json" },
        });
      } else if (data.method === "PUT") {
        res = await axios.put(`${server}/${data.url}`, data.payload, {
          withCredentials: true,
          headers: data?.headers
            ? data?.headers
            : { "Content-Type": "application/json" },
        });
      } else if (data.method === "DELETE") {
        res = await axios.delete(`${server}/${data.url}`, {
          withCredentials: true,
          headers: data?.headers
            ? data?.headers
            : { "Content-Type": "application/json" },
        });
      }
      if (res.status === 200) {
        if (data?.message) {
          setLoader(false);
          toast.success(data.message);
        }
      }
      return res;
    } catch (error) {
      setLoader(false);
      
      toast.error(error?.response?.data?.message || "Something went Wrong");
    }
  };

  return [loader, postUpdate];
};

export { usePostUpdate };
