const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

let clients = [];

wss.on("connection", (ws) => {
clients.push(ws);

ws.on("close", () => {
clients = clients.filter(c => c !== ws);
});
});

function broadcast(event){
clients.forEach(c => {
c.send(JSON.stringify({ event }));
});
}

// Webhooks TikFinity
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
server.listen(PORT, ()=> console.log("Server running"));
