import React,{useState,useEffect} from "react";

const Dashboard=()=>{

    const [repositiories,setRepositiories]=useState([]);
    const [searchQuery,setSearchQuery]=useState('');
    const[suggestedRepositiories,setSuggestedRepositiories]=useState([]);
    const[searchResult,setSearchResult]=useState([]);

    useEffect(()=>{

        const userId=localStorage.getItem("userId");

        const fetchRepositiories=async()=>{

            try{
                    const response=await fetch(`http://localhost:3000/repo/user/${userId}`);

                    const data=await response.json();
                    setRepositiories(data);
            }catch(err){
                console.log(err);
            }


        };
         const fetchSuggestedRepositiories=async()=>{

            try{
                    const response=await fetch(`http://localhost:3000/repo/all`);

                    const data=await response.json();
                    setSuggestedRepositiories(data);
                    console.log(suggestedRepositiories);
            }catch(err){
                console.log(err);
            }
                    


        };
        fetchRepositiories();
        fetchSuggestedRepositiories();



    },[]);
    return(
    <h1>Dashboard</h1>
    )
}

export default Dashboard;