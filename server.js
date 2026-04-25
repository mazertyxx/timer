const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

// =====================
// ⏱ TIMER STATE
// =====================

let time = 0;          // secondes restantes
let running = false;
let lastUpdate = Date.now();

// =====================
// 🧠 UPDATE TIMER
// =====================

function updateTimer(){
if (!running) return;

const now = Date.now();
const diff = Math.floor((now - lastUpdate) / 1000);

if (diff > 0) {
time -= diff;
lastUpdate = now;

```
if (time <= 0) {
  time = 0;
  running = false;
}
```

}
}

// =====================
// 🌐 GET STATE (overlay)
// =====================

app.get("/state", (req,res)=>{
updateTimer();

res.json({
time,
running
});
});

// =====================
// ▶️ START (1 min)
// =====================

app.post("/start", (req,res)=>{
time = 60;
running = true;
lastUpdate = Date.now();

res.json({ ok:true });
});

// START
app.get("/start", (req,res)=>{
time = 60;
running = true;
lastUpdate = Date.now();
res.send("START OK");
});

// +30
app.get("/30", (req,res)=>{
updateTimer();
time += 30;
res.send("+30 OK");
});

// END
app.get("/end", (req,res)=>{
time = 0;
running = false;
res.send("END OK");
});


// =====================
// 🚀 SERVER
// =====================

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, ()=>{
console.log("🚀 Timer server running on port " + PORT);
});
