const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

// =====================
// STATE
// =====================

let endTime = 0;
let bonus = false;

// =====================
// HELPERS
// =====================

function now(){
return Date.now();
}

// =====================
// STATE API
// =====================

app.get("/state",(req,res)=>{
const remaining = Math.max(0, Math.floor((endTime - now()) / 1000));

res.json({
time: remaining,
running: remaining > 0,
bonusActive: bonus
});
});

// =====================
// START (1 min)
// =====================

app.post("/start",(req,res)=>{
endTime = now() + 60 * 1000;
bonus = false;
res.send("OK");
});

app.get("/start",(req,res)=>{
endTime = now() + 60 * 1000;
bonus = false;
res.send("OK");
});

// =====================
// +30 SEC
// =====================

app.post("/30",(req,res)=>{
endTime += 30 * 1000;
bonus = true;
res.send("OK");
});

app.get("/30",(req,res)=>{
endTime += 30 * 1000;
bonus = true;
res.send("OK");
});

// =====================
// END
// =====================

app.post("/end",(req,res)=>{
endTime = now();
bonus = false;
res.send("OK");
});

app.get("/end",(req,res)=>{
endTime = now();
bonus = false;
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
console.log("🚀 Timer stable running");
});
