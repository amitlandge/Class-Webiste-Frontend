import axios from "axios";
import { server } from "../constants/server";

export const fetchData = async (prop) => {
  const [, url] = prop.queryKey;
  try {
    const res = await axios.get(`${server}/${url}`, {
      withCredentials: true,
    });
    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const customError = new Error("An error occurred while creating the data");
    customError.code = error.response?.status || 500;
    customError.info = error.response?.data || null;
    throw customError;
  }
};
