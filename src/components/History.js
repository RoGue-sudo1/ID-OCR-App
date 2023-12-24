import { useEffect } from "react";

const History = () => {
  const getData = async () => {
    
    const data = await fetch("http://localhost:5000/");
    const json = await data.json();
    console.log(json);
    
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>History</div>;
};

export default History;
