const express = require("express");
const router = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const rateLimiter = require("./middleware/rateLimiter.js");
const cors = require("cors");
const path = require("path");
const { clerkMiddleware } = require("./middleware/clerkAuth");

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(clerkMiddleware);
app.use(express.json());
app.use(rateLimiter);

if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
		})
	);
}

app.use((req, res, next) => {
	console.log(`📌 Request made. Method: ${req.method}. Req URL: ${req.url}`);
	next();
});

app.use("/api/notes", router);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
	});
}

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`🟢 Server Online, port: ${PORT}`);
	});
});
