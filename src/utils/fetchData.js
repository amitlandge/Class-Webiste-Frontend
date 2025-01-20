import axios from "axios";
import { server } from "../constants/server";

export const fetchData = async (prop) => {
  const [, url] = prop.queryKey;
  const res = await axios.get(`${server}/${url}`);
  return res.data;
};
