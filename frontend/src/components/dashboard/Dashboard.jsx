import React,{useState,useEffect} from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

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
        <><Navbar/>
    <section id="dashboard">
        <aside id="left">
            <h4>Suggested Repositiories</h4>
            <button className="refresh-btn">Refresh Suggestions</button>
            {suggestedRepositiories.map((repo)=>{
                return <div key={repo._id}>
                    <h4>{repo.name}</h4>
                    <h4>{repo.description}</h4>
                    <button className="follow-btn">Follow</button>
                </div>
            })}
        </aside>
        <main>
             <h4>Your Repositiories</h4>
             <div>
                <input type="text" 
                value={searchQuery}
                 placeholder="Search repositories..."
                 onChange={(e)=>{setSearchQuery(e.target.value)}}></input>
             </div>
            <div>
                <button className="action-btn">New Repository</button>
                <button className="action-btn">Import Repository</button>
                <button className="action-btn">Filter</button>
            </div>
            {searchResult.map((repo)=>{
                return <div key={repo._id}>
                    <h4>{repo.name}</h4>
                    <div className="repo-actions">
                        <button className="repo-btn">View</button>
                        <button className="repo-btn">Settings</button>
                    </div>
                    {/* <p>{repo.description}</p> */}
                </div>
            })}

        </main>
        <aside id="right">
            <h3>Upcoming events</h3>
            <button className="view-all-btn">View All Events</button>
            <ul>
                <li>
                    <p>Tech conference- Nov-15</p>
                    <button className="event-btn">Register</button>
                </li>
                <li>
                    <p>Developer Meetup- Nov-25</p>
                    <button className="event-btn">Register</button>
                </li>
                <li>
                    <p>React Summit- Dec-5</p>
                    <button className="event-btn">Register</button>
                </li>
            </ul>
        </aside>
    </section>
    </>
    )
}

export default Dashboard;