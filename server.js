const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Stockage clients WebSocket
let clients = [];

// Connexion WebSocket
wss.on("connection", (ws) => {
console.log("🔌 Client connecté");
clients.push(ws);

ws.on("close", () => {
console.log("❌ Client déconnecté");
clients = clients.filter(c => c !== ws);
});
});

// Fonction broadcast
function broadcast(event){
console.log("📡 Envoi :", event);
clients.forEach(c => {
if (c.readyState === WebSocket.OPEN) {
c.send(JSON.stringify({ event }));
}
});
}

// =======================
// ROUTES WEBHOOK
// =======================

// START TIMER
app.get("/start", (req,res)=>{
broadcast("start");
res.send("OK");
});

app.post("/start", (req,res)=>{
broadcast("start");
res.send("OK");
});

// ADD 30 SECONDS
app.get("/30", (req,res)=>{
broadcast("add30");
res.send("OK");
});

app.post("/30", (req,res)=>{
broadcast("add30");
res.send("OK");
});

// END TIMER
app.get("/end", (req,res)=>{
broadcast("reset");
res.send("OK");
});

app.post("/end", (req,res)=>{
broadcast("reset");
res.send("OK");
});

// =======================
// ROUTE TEST
// =======================
app.get("/", (req,res)=>{
res.send("Timer server OK");
});

// =======================
// LANCEMENT SERVEUR
// =======================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});
