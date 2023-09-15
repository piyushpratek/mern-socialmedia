import express, { Application } from 'express'
import cookieParser from 'cookie-parser'

const app: Application = express()

// Using Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// Importing Routes
import post from '../routes/postRoute'
// const user = require("./routes/user");

app.get('/api/health', (req, res) => {
    res.send('Api is Running')
})

// Using Routes
app.use("/api/v1", post);
// app.use("/api/v1", user);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });


export default app