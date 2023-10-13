import express, { Application } from 'express'
import cookieParser from 'cookie-parser'

const app: Application = express()

// Using Middlewares
app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Importing Routes
import post from '../routes/postRoute'
import user from '../routes/userRoute'
import path from 'path'

// const user = require("./routes/user");

app.get('/api/health', (req, res) => {
    res.send('Api is Running')
})

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Render Code
if (process.env.USE_STATIC_BUILD === 'true') {
    const reactBuildPath = path.join('./react-static')
    const staticMiddleware = express.static(reactBuildPath)
    app.use(staticMiddleware)
    app.use('*', staticMiddleware)

    const assetsPath = path.join('./react-static/assets')
    app.use('/assets', express.static(assetsPath))
} else {
    // Redirect to /api/health
    app.use('*', (req, res) => {
        res.redirect('/api/health')
    })
}


export default app