const path = require("path");
const express = require("express");
const app = express();

// Serve all files inside the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Default route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Travlr server running at http://localhost:${PORT}`);
});
