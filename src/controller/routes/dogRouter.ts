import express from "express";
import dogController from "../DogController";



export const dogRouter = express.Router();


dogRouter.get("/index", dogController.getIndex);

dogRouter.post("/create", dogController.create);

dogRouter.get("/show", dogController.getShow);

