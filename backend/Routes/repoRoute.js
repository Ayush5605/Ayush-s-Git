import express from "express";
import {createRepository,getAllRepositories,fetchRepositoryById,fetchRepositoryByName,fetchRepositoriesForCurrentUser,updateRepositoryById,togglevisibilityById,deleteRepositoryById} from "../controllers/repoController.js";

const repoRouter=express.Router();

repoRouter.post("/repo/create",createRepository);
repoRouter.get("/repo/all",getAllRepositories);
repoRouter.get("/repo/:id",fetchRepositoryById);
repoRouter.get("/repo/name",fetchRepositoryByName);
repoRouter.get("/repo/:userID",fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id",updateRepositoryById);
repoRouter.patch("/repo/toggle/:id",togglevisibilityById);
repoRouter.delete("/repo/delete/:id",deleteRepositoryById);


export {repoRouter};