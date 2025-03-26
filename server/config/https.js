const fs = require('fs');
const https = require("https");
async function Onhttps(payload) {

    const options = {
        key: fs.readFileSync('./server/config/keys/private.pem'),
        cert: fs.readFileSync('./server/config/keys/certificate.pem')
    }

    const secureServer = await https.createServer(options, payload);
    const PORT = process.env.SECURE_PORT;
    secureServer.listen(PORT, () =>{
        console.log(`Secure Socket Layers [SSL] running on PORT: ${PORT} `);
    });

    process.on("unhandleRejection", (err, promise) => {
        console.log(`Logged Error: ${err}`);
        secureServer.close(() => process.exit(1));
    });
}

module.exports = Onhttps;