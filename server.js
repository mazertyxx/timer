const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// =====================
// ⏱ STATE
// =====================

let time = 0;
let running = false;
let last = Date.now();
let bonusActive = false;

// =====================
// UPDATE TIMER
// =====================

function update(){
if(!running) return;

const now = Date.now();
const diff = Math.floor((now - last)/1000);

if(diff > 0){
time -= diff;
last = now;

```
if(time <= 0){
  time = 0;
  running = false;
  bonusActive = false;
}
```

}
}

// =====================
// STATE FOR FRONT
// =====================

app.get("/state",(req,res)=>{
update();

res.json({
time,
running,
bonusActive
});
});

// =====================
// START (1 min)
// =====================

function startTimer(){
time = 60;
running = true;
last = Date.now();
bonusActive = false;
}

app.get("/start",(req,res)=>{
startTimer();
res.send("OK");
});

app.post("/start",(req,res)=>{
startTimer();
res.send("OK");
});

// =====================
// +30 SEC
// =====================

function add30(){
update();
time += 30;
bonusActive = true;
}

app.get("/30",(req,res)=>{
add30();
res.send("OK");
});

app.post("/30",(req,res)=>{
add30();
res.send("OK");
});

// =====================
// END
// =====================

function endTimer(){
time = 0;
running = false;
bonusActive = false;
}

app.get("/end",(req,res)=>{
endTimer();
res.send("OK");
});

app.post("/end",(req,res)=>{
endTimer();
res.send("OK");
});

// =====================
// SERVER
// =====================

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(PORT,()=>{
console.log("🚀 Timer running on "+PORT);
});
