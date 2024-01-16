import express from "express";
import mongoose from 'mongoose';

const { connect, connection } = mongoose;  
const app = express();
const port = 3000;
import expressLayouts from 'express-ejs-layouts';
import adminRoutes from "./routes/president.js";
import sekereteriRouter from "./routes/sekereteri.js";
import umusanzuRoute from "./routes/contabure.js";
import authRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";

connect("mongodb://127.0.0.1:27017/isezeranoDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/abaririmbyi", sekereteriRouter);
app.use("/umusanzu", umusanzuRoute);
app.use('/nyobozi', adminRoutes);
app.use('/users', UserRouter);
app.use('/auth', authRouter);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
