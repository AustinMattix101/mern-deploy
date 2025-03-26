const dotenv = require("dotenv");
dotenv.config({ path: "./.env" }); // initialize configuration
const express = require("express");
const { json, urlencoded } = require("express");
const { join, resolve } = require("path");

// Config
const connectDB = require("./config/db.js");
const Onhttps = require("./config/https.js");

// Middlewares
const errorHandler = require("./middlewares/error.js");

// Routers
const apiRouter = require("./routes/api.js");
const authRouter = require("./routes/auth.js");
const TwoFARouter = require("./routes/TwoFA.js");
const privateRouter = require("./routes/private.js");
const adminRouter = require("./routes/admin.js");
const profileRouter = require("./routes/profile.js");
// const uploadRouter = require("./routes/uploadFile.js");
// const uploadsRouter = require("./routes/uploadFiles.js");

    // Connoect DB
    connectDB();

// Express
const app = express();

    // Secure Socket Layers SSL
    // Onhttps(app);

// app.all('*', (req, res, next) => {
//     if (req.secure) return next();
//     else { 
//         res.redirect(307, "https://" + req.hostname + ":" + process.env.SECURE_PORT + req.url);
//     }
// });
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/api', express.static(join('./server/public')));
app.use('/api/auth', authRouter);
app.use('/api/twofa', TwoFARouter);
app.use('/api/private', privateRouter); // User Privillege
app.use('/api/admin', adminRouter); // Admin Privillege
app.use('/api/profile', profileRouter);
// app.use('/api/upload', uploadRouter);
// app.use('/api/uploads', uploadsRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(join('./public_html')));

    app.get('*', (req, res) =>
        res.sendFile(
            resolve('./', 'public_html', 'index.html')
        )
    );

} else {
    app.get('/', (req, res)  => res.send('Please set to production!'));
}

// Error Handler (Should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 5000;

// Start the Express Server
const server = app.listen(PORT, () => {
    console.log(`HTTP Proxy [Unsecure] running on PORT: ${ PORT }`);
});

process.on("unhandleRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});