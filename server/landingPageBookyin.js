
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./src/middlewares/error")
const { sequelize } = require("./src/models")
const authRouter = require("./src/routers/auth");
const customerRouter = require("./src/routers/customer");
const packageRouter = require("./src/routers/package");
const requestRouter = require("./src/routers/request");
const contactRouter = require("./src/routers/contact");
const serviceRouter = require("./src/routers/service");
const settingsRouter = require("./src/routers/settings");
const path = require("path")

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    const indexPath = path.join(__dirname, "./dist/index.html");
    res.sendFile(indexPath);
  } else {
    next();
  }
});

app.use("/api/auth", authRouter);
app.use("/api/customers", customerRouter);
app.use("/api/packages", packageRouter);
app.use("/api/requests", requestRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/services", serviceRouter);
app.use("/api/settings", settingsRouter);

app.use(errorMiddleware)

const port = process.env.PORT;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});