import express from "express";
const app = express();

const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Marcus Bieber", email: "biebermarcus1@gmail.com" },
  { id: 2, name: "Lukas", email: "lukas@irgendwo.de" },
  { id: 3, name: "Keule", email: "karsten@irgendwo.de" },
];

app.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === Number(userId));
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/user", (req, res) => {
  const body = req.body;
  const newId = users.length + 1;
  const newUser = { id: newId, ...body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  users = users.filter((user) => user.id !== Number(userId));
  res.status(204);
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const body = req.body;
  const userIndex = users.findIndex((user) => user.id === Number(userId));
  if (userIndex !== -1) {
    users[userIndex] = { id: userId, ...body };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
