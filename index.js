const express = require("express");
const fs= require("fs");
const path = require("path");
const app = express();

const Folder = "Current_timeStamp";


//Default Route
app.get("/", function (req, res) {
  if (req.url === "/") {
    res.send(`
    <h2 style="color: blue; text-align: center;">Dinesh Mern Stack Developer </h2>
    <div style="color: blue; text-align: center;">This is Node Server Task 1</div><br>
    <div style="text-align: center;">
        <a href="/create">
        <button style="background: #8000ff; color:white; border-style: none; width:200px; height:30px;">Create timestamp</button>
        </a>
    </div><br>
    <div style="text-align: center; border-style: none;">
        <a href="/get_data">
        <button style="background: #8000ff; color:white; border-style: none; width:200px; height:30px;">Get timestamp</button>
        </a>
    </div>
    `);
  } else {
    res.status(404).end(`
    <h1>Somthing Wrong</h1>
    `);
  }
});

//create a directory
if (!fs.existsSync(Folder)) {
    fs.mkdirSync(Folder);
  } 

// 1. write API end point which will create a text file in a particular folder.
app.get("/create", (req, res) => {

  // a)content of the file should be the current timestamp.
  const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  // b)The filename should be current date-time.txt
  fs.writeFileSync(
    path.join(__dirname, Folder, "/date-time.txt"), 
    `Last created timestamp format is MM/DD/YY ${time}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File was created successfully");
      }
    }
  );

  if (req.url === "/create") {
    res.sendFile(path.join(__dirname, Folder, "date-time.txt"));
  } else {
    res.status(500).end(`
    <h1>Somthing Wrong</h1>
    `);
  }
});


// 2) write API endpoint to retrieve all the text files in that particular folder.

app.get('/get_data',(req,res)=>{
  const folderPath = path.join(__dirname,Folder);
  const fileContent = fs.readdirSync(folderPath).map(file=>{
    const filePath = path.join(folderPath,file)
    return{
      filename : file,
      Last_time: fs.readFileSync(filePath,'utf-8')
    }
  });
  res.json(fileContent)
})

// listening the server
app.listen(3005, () => console.log("Server running on http://localhost:3005"));