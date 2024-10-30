import axios from "axios";
import { server } from "../constants/server.js";
import { useDispatch } from "react-redux";
import { isAuthenticated, isNotAuthenticated } from "../redux/reducers/auth.js";
import { toast } from "react-toastify";

import { getEnrollDetails } from "../redux/reducers/enroll.js";

const useUser = () => {
  const dispatch = useDispatch();
  const loadUser = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/getMyProfile`, {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        dispatch(isAuthenticated(res.data?.user));
      } else {
        dispatch(isNotAuthenticated());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went Wrong");
      dispatch(isNotAuthenticated());
    }
  };
  return [loadUser];
};
const useEnroll = () => {
  const dispatch = useDispatch();
  const getInitialData = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/enrollDetails`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(getEnrollDetails(res.data?.enrolldetails));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went Wrong");
    }
  };

  return { getInitialData };
};

export { useUser, useEnroll };
