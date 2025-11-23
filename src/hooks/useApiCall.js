import axios from "axios";
import { useState } from "react";

function useApiCall() {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchData(path, params) {
    try {
      setLoading(true);
      const x = await axios.get(path, { params });
      setAllData(x?.data);
    } 
    catch (error) {
      setAllData({});
      console.log(error.message);
      console.log(error.response.data);
    } 
    finally {
      setLoading(false);
    }
  }

  async function addData(path, data) {
    try {
      setLoading(true);
      const x = await axios.post(path, data);
      return x?.data;
    } 
    catch (error) {
      console.log(error.message);
      console.log(error.response.data);
    } 
    finally {
      setLoading(false);
    }
  }

  async function deleteData(path) {
    try {
        setLoading(true);
        const x = await axios.delete(path);
        // console.log(x?.data);
        return x?.data;
    } 
    catch (error) {
        console.log(error.message);
        console.log(error.response.data);    
    }
    finally {
        setLoading(false);
    }
  }

  async function modifyData(path, data) {
    try {
        setLoading(true);
        const x = await axios.put(path, data);
        return x?.data;
    } 
    catch (error) {
        console.log(error.message);
        console.log(error.response.data);
    } 
    finally {
        setLoading(false);
    }
  }

  return { allData, loading, fetchData, addData, deleteData, modifyData };
}

export default useApiCall;
