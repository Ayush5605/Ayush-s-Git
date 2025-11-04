import React,{useState,useEffect} from "react";
import "./dashboard.css";

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
                    // API returns an array of repositories
                    setRepositiories(Array.isArray(data) ? data : (data.repositories || []));
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


    useEffect(()=>{
        const normalizedQuery=(searchQuery || '').toLowerCase();
        if(!normalizedQuery){
            setSearchResult(repositiories);
        }else{
            const filteredRepo=repositiories.filter((repo)=>
                (repo.name || '').toLowerCase().includes(normalizedQuery)
            );
            setSearchResult(filteredRepo);
        }
    },[searchQuery,repositiories]);
    return(
    <section id="dashboard">
        <aside>
            <h4>Suggested Repositiories</h4>
            {suggestedRepositiories.map((repo)=>{
                return <div key={repo._id}>
                    <h4>{repo.name}</h4>
                    <h4>{repo.description}</h4>
                </div>
            })}
        </aside>
        <main>
             <h4>Your Repositiories</h4>
             <div>
                <input type="text" 
                value={searchQuery}
                 placeholder="Search..."
                 onChange={(e)=>{setSearchQuery(e.target.value)}}></input>
             </div>
            {searchResult.map((repo)=>{
                return <div key={repo._id}>
                    <h4>{repo.name}</h4>
                    <p>{repo.description}</p>
                </div>
            })}

        </main>
        <aside>
            <h3>Upcoming events</h3>
            <ul>
                <li>
                    <p>Tech conference- Nov-15</p>
                </li>
                <li>
                    <p>Developer Meetup- Nov-25</p>
                </li>
                <li>
                    <p>React Summit- Dec-5</p>
                </li>
            </ul>
        </aside>
    </section>
    )
}

export default Dashboard;