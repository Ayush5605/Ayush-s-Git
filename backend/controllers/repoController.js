export const createRepository=()=>{
    res.send("Repository created !");
};

export const getAllRepositories=()=>{
    res.send("Fetching repositories");
};

export const fetchRepositoryById=()=>{
    res.send("fetching repo by ID")
};

export const fetchRepositoryByName=()=>{
    res.send("fetching repo by name");
};

export const fetchRepositoriesForCurrentUser=()=>{
    res.send("fetching repo for current user");
};

export const updateRepositoryById=()=>{
    res.send("updating repo");
};

export const togglevisibilityById=()=>{
    res.send("toggle visibility");
};

export const deleteRepositoryById=()=>{
    res.send("deleting repo");
};