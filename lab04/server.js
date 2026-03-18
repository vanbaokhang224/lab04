console.log("File is running...");
const express = require("express");
const app = express();

app.use(express.json());
app.set("json spaces", 2);

/* =========================
   DATA ROLE
========================= */
let dataRole = [
  {
    "id": "r1",
    "name": "Quản trị viên",
    "description": "Toàn quyền quản lý hệ thống",
    "creationAt": "2026-03-04T08:00:00.000Z",
    "updatedAt": "2026-03-04T08:00:00.000Z"
  },
  {
    "id": "r2",
    "name": "Biên tập viên",
    "description": "Quản lý nội dung và dữ liệu",
    "creationAt": "2026-03-04T08:00:00.000Z",
    "updatedAt": "2026-03-04T08:00:00.000Z"
  },
  {
    "id": "r3",
    "name": "Người dùng",
    "description": "Tài khoản người dùng thông thường",
    "creationAt": "2026-03-04T08:00:00.000Z",
    "updatedAt": "2026-03-04T08:00:00.000Z"
  }
];

/* =========================
   DATA USER
========================= */
let dataUser = [
  {
    "username": "nguyenvana",
    "password": "123456",
    "email": "vana@gmail.com",
    "fullName": "Nguyễn Văn A",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": true,
    "loginCount": 15,
    "role": { "id": "r1", "name": "Quản trị viên", "description": "Toàn quyền quản lý hệ thống" },
    "creationAt": "2026-03-04T08:10:00.000Z",
    "updatedAt": "2026-03-04T08:10:00.000Z"
  },
  {
    "username": "tranthib",
    "password": "123456",
    "email": "thib@gmail.com",
    "fullName": "Trần Thị B",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": true,
    "loginCount": 7,
    "role": { "id": "r2", "name": "Biên tập viên", "description": "Quản lý nội dung và dữ liệu" },
    "creationAt": "2026-03-04T08:11:00.000Z",
    "updatedAt": "2026-03-04T08:11:00.000Z"
  }
];

/* =========================
   ROLE CRUD
========================= */

// GET all roles
app.get("/roles", (req, res) => {
  res.json(dataRole);
});

// GET role by id
app.get("/roles/:id", (req, res) => {
  const role = dataRole.find(r => r.id === req.params.id);
  if (!role) return res.status(404).json({ message: "Role not found" });
  res.json(role);
});

// POST create role
app.post("/roles", (req, res) => {
  const { id, name, description } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newRole = {
    id,
    name,
    description,
    creationAt: new Date(),
    updatedAt: new Date()
  };

  dataRole.push(newRole);
  res.status(201).json(newRole);
});

// PUT update role
app.put("/roles/:id", (req, res) => {
  const index = dataRole.findIndex(r => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Role not found" });

  dataRole[index] = {
    ...dataRole[index],
    ...req.body,
    updatedAt: new Date()
  };

  res.json(dataRole[index]);
});

// DELETE role
app.delete("/roles/:id", (req, res) => {
  dataRole = dataRole.filter(r => r.id !== req.params.id);
  res.json({ message: "Deleted successfully" });
});

/* =========================
   USER CRUD
========================= */

// GET all users
app.get("/users", (req, res) => {
  res.json(dataUser);
});

// GET user by username
app.get("/users/:username", (req, res) => {
  const user = dataUser.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST create user
app.post("/users", (req, res) => {
  const {
    username,
    password,
    email,
    fullName,
    avatarUrl,
    status,
    loginCount,
    role
  } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newUser = {
    username,
    password,
    email,
    fullName,
    avatarUrl,
    status,
    loginCount: loginCount || 0,
    role,
    creationAt: new Date(),
    updatedAt: new Date()
  };

  dataUser.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:username", (req, res) => {
  const index = dataUser.findIndex(u => u.username === req.params.username);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  dataUser[index] = {
    ...dataUser[index],
    ...req.body,
    updatedAt: new Date()
  };

  res.json(dataUser[index]);
});

// DELETE user
app.delete("/users/:username", (req, res) => {
  dataUser = dataUser.filter(u => u.username !== req.params.username);
  res.json({ message: "Deleted successfully" });
});

/* =========================
   GET USERS BY ROLE
========================= */

app.get("/roles/:id/users", (req, res) => {
  const roleId = req.params.id;
  const users = dataUser.filter(u => u.role.id === roleId);
  res.json(users);
});

/* =========================
   START SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});