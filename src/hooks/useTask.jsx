import React, { useEffect, useState } from "react";

const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://employee-management-server-nu.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);
  return [tasks, loading];
};

export default useTask;
