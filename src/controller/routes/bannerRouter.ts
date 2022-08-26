import express from "express";
import bannerController from "../BannerController";


export const bannerRouter = express.Router();


bannerRouter.post("/create", bannerController.create);

bannerRouter.get("/all", bannerController.getBanner);
bannerRouter.get("/id", bannerController.getBannerByID);
