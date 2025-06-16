import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spanner from "./components/Spanner";
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";


const App = () => {
  const[courses,setCourses] = useState(null);
  const[loading,setLoading] = useState(true);
  const[category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();

      // output set
      setCourses(output);
    }
    catch(error){
      toast.error("network problem");
    }

    setLoading(false);
    
  }
   useEffect( () =>{
    fetchData()
      },[]);

  return (
  <div className="min-h-screen flex flex-col bg-bgDark2">
    <div>
      <NavBar/>
    </div>
   
    <div className="bg-bgDark2">
           <div>
      <Filter filterData={filterData}
      category={category} 
      setCategory={setCategory}/>
    </div>
    <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh">
     {
      loading ? (<Spanner/>) : (<Cards courses = {courses.data} category={category}/>)
     }
    </div>
    </div>

  </div>
  );
};

export default App;
