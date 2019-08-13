const express = require("express");
require("./services/passport");
// const authRoutes = require("./routes/authRoutes");

const app = express();

// authRoutes(app);

require("./routes/authRoutes")(app);
// same as const authRoutes = require("./routes/authRoutes"); authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
