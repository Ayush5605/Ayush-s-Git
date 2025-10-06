import express from "express";
import{createIssue,updateIssueById,deleteIssueById,getAllIssue,getIssueById} from "../controllers/issueController.js";

const issueRouter=express.Router();


issueRouter.post("/issue/create",createIssue);
issueRouter.put("/issue/update/:id",updateIssueById);
issueRouter.delete("/issue/delete/:id",deleteIssueById);
issueRouter.get("/issue/all",getAllIssue);
issueRouter.get("/issue/:id",getIssueById);



export {issueRouter};