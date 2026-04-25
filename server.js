const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));
app.use(express.json());

let clients = [];

wss.on("connection", (ws) => {
console.log("🔌 Client connecté");
clients.push(ws);

ws.on("close", () => {
console.log("❌ Client déconnecté");
clients = clients.filter(c => c !== ws);
});
});

function broadcast(event){
console.log("📡 Envoi :", event);
clients.forEach(c => {
c.send(JSON.stringify({ event }));
});
}

// Webhooks
app.get("/start", (req,res)=>{
broadcast("start");
res.send("OK");
});

app.get("/30", (req,res)=>{
broadcast("add30");
res.send("OK");
});

app.get("/end", (req,res)=>{
broadcast("reset");
res.send("OK");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> console.log("🚀 Server running"));
