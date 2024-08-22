const { render } = require("ejs");
const expressUse = require("express");
const app = expressUse();
const PORT = 8000;
const HOSTNAME = "localhost";
const bodyParser = require("body-parser")
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req, res) => {
   let data =  [
    { name: "anonymous", age: 12, height: "6.5ft" },
    { name: "samuel", age: 10, height: "4.5ft" },
    { name: "Cyberpunk", age: 22, height: "5.5ft" },
  ]
  res.render("home", { data: data });
});

app.get("/user",(req, res)=>{
    fetch("https://api.github.com/users")
    .then((response) => response.json())
    .then((data) => {
      res.render("github", {data:data})
    })
})

app.get("/addUser",(req, res)=>{
  res.render("add")
})

let studentArray = []
app.post("/addName",(req, res)=>{
  studentArray.push(req.body);
  localStorage.setItem("student", JSON.stringify(studentArray))
  res.render("list", {data:studentArray})
})

app.listen(PORT, HOSTNAME, () => {
  console.log(`${HOSTNAME}: ${PORT}`);
});
