import express from "express";
import mongoose from 'mongoose';

const { connect, connection } = mongoose;  
const app = express();
const port = 3000;
import expressLayouts from 'express-ejs-layouts';
import adminRoutes from "./src/routes/president.js";
import sekereteriRouter from "./src/routes/sekereteri.js";
import umusanzuRoute from "./src/routes/contabure.js";
import authRouter from "./src/routes/auth.js";
import UserRouter from "./src/routes/user.js";
import ubwitabireRoute from "./src/routes/ubwitabire.js";

connect("mongodb://127.0.0.1:27017/isezeranoDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/abaririmbyi", sekereteriRouter);
app.use("/umusanzu", umusanzuRoute);
app.use('/nyobozi', adminRoutes);
app.use('/users', UserRouter);
app.use('/auth', authRouter);
app.use('/attendance', ubwitabireRoute);

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
