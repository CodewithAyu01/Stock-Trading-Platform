require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// ✅ CORS FIXED: Ab ye tumhare Render URLs ko allow karega
app.use(cors({
    origin: [
      "http://localhost:3000", 
      "http://localhost:3001",
      "https://stock-trading-platform-49y0.onrender.com", // Tumhara Frontend
      "https://stock-trading-platform2.onrender.com"     // Tumhara Dashboard
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- MODELS ---
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

const Holding = mongoose.model("Holding", new mongoose.Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
}));

const PositionsSchema = new mongoose.Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});

const Order = mongoose.model("Order", new mongoose.Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
}));

const Position = mongoose.model("position", PositionsSchema);

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// --- ROUTES ---

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await Holding.find({});
    res.status(200).json(allHoldings);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await Position.find({}); 
    res.status(200).json(allPositions);
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new Order({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ success: false, message: "Wrong password" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, username: user.username, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// ✅ Basic Route for Health Check
app.get("/", (req, res) => {
    res.send("Server is running smoothly!");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));