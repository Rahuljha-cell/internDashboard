import express from "express"
import {dashboard, postDonation} from "../controllers/dashboard.js"

const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboard);
dashboardRouter.post('/', postDonation);

export default dashboardRouter