import { Router } from "express";
const router = Router();
import { findOne } from "../models/abaririmbyi.js";

router.get("/login", (req, res) => {
  res.render("student/login");
});
router.post("/login", async (req, res) => {

    const izina = req.body.names;
    const umuririmbyi = await findOne({names : izina});
    if(!umuririmbyi){
      res.status(404).json({message: "Andika amazina yawe naeza wonjyere wingire"})
      res.render("student/login", {
        error : "Andika amazina yawe naeza wonjyere wingire"
      })
    }
    res.render("student/view", { one : individualStudent})
});

export default router;
