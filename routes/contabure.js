import { Router } from 'express';
const umusanzuRoute = Router();
import Umusanzu from "../models/Umusanzu.js";
import Nyobozi from '../models/nyobozi.js';

umusanzuRoute.get("/login", (req, res) => {
    res.render("teacher/teacherLogin");
});
umusanzuRoute.get("/option", (req,res) => {
    res.render("teacher/option")
})
umusanzuRoute.post("/login", async (req, res) => {
    const username = req.body.username;
    

    const umuyobozi = await Nyobozi.findOne({username: username})
    
    if(umuyobozi){
        const kurebaUmusanzu = await Umusanzu.find()
        res.status(200).json(kurebaUmusanzu)
          //res.redirect("/teacher/option");  
    }
    else{
        res.render("teacher/teacherLogin", {
            error : "Please Enter Correct Password and username !!"
        })
    }
});
umusanzuRoute.get("/add", (req, res) => {
    res.render("teacher/addstudent");
});

umusanzuRoute.post("/add", async (req, res) => {
    const umusanzu = new Umusanzu({
        names : req.body.names,
        ukwezi_1 : req.body.ukwezi_1,
        ukwezi_2 : req.body.ukwezi_2,
        ukwezi_3 : req.body.ukwezi_3,
        ukwezi_4 : req.body.ukwezi_4,
        ukwezi_5 : req.body.ukwezi_5,
        ukwezi_6 : req.body.ukwezi_6,
        ukwezi_7 : req.body.ukwezi_7,
        ukwezi_8 : req.body.ukwezi_8,
        ukwezi_9 : req.body.ukwezi_9,
        ukwezi_10 : req.body.ukwezi_10,
        ukwezi_11 : req.body.ukwezi_11,
        ukwezi_12 : req.body.ukwezi_12,
    })
    try {
        const UmusanzuMushya = await umusanzu.save();
        res.status(200).json(UmusanzuMushya)
        //res.redirect("/teacher/add");
      } catch {
        res.send("error")
    }
});

umusanzuRoute.get("/viewall", async (req, res) => {
    const allStudents = await Student.find() 
    res.render("teacher/viewall", {student : allStudents})
});
umusanzuRoute.get("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.redirect("/teacher/viewall")
});
umusanzuRoute.get("/edit/:id", async (req, res) => {
    const user = await Student.findById(req.params.id)
    res.render("teacher/edit", {user : user})
});
umusanzuRoute.post("/edit/:id", async (req, res) => {
    const user = await Student.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/teacher/viewall")
});

export default umusanzuRoute;