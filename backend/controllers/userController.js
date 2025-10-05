export const getAllUsers=(req,res)=>{
    res.send("get all users");

};

export const signup=(req,res)=>{
    res.send("signup");
};

export const login=(req,res)=>{
    res.send("login");

}

export const getUserProfile=(req,res)=>{
    res.send("get user profile");

};

export const updateUserProfile=(req,res)=>{
    console.log("update user");
};

export const deleteUser=(req,res)=>{
    console.log("Delete user");
}