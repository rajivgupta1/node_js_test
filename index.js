import express from "express"

const app= express()

const PORT = 8000;

import path from "path";
import fs from "fs"

const __dirname = path.resolve();
const fn = __dirname + "/userList.csv";


console.log(__dirname);


//middleware
app.use(express.urlencoded ());

// routers
app.get("/register", (req, res) =>{
    console.log(req.query);

    // res.send("<h1> You are in the registration</h1>");
     res.sendFile(__dirname + "/src/regForm.html");
});

app.post("/register", (req, res) =>{
    console.log(req.body);

const {email, password} = req.body;
const str = `${email}, ${password} \n`;

fs.appendFile(fn, str, (error) =>{
    error? console.log(error.message) : console.log('added to the file');
});
 
    // res.send("<h1> You are in the register and u may login now</h1>");
    res.sendFile(__dirname + "/src/regForm.html");

});





// login
app.get("/login", (req, res) =>{
    console.log("recived request to home login");

    res.send("<h1> You are in the login");

    
});



// root router, home page

app.get("/", (req, res) =>{
    console.log("recived request to home router");

    res.send(`
    
    <h1> You are in the homepage<h1>
    
    <a href="/register"> <button>Register</button></a>
    
    `);
});

// make our server available on http request

app.listen(PORT, error=>{
    error? console.log(error.message) :
    console.log(`Server running at http://localhost:${PORT}`)
});