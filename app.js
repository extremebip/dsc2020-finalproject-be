const express = require('express');
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use((req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey === undefined) {
        return res
            .status(403)
            .json({ status: false, code: 403, message: "API key not found" });
    }
    else if (apiKey !== "DSC2020BACKEND") {
        return res
            .status(403)
            .json({ status: false, code: 403, message: "Invalid API key" });
    }
    next();
});

app.use('/api/v1/provinces', require('./src/routes/v1/province'));

app.listen(port, console.log('Initializing server...'))
    .on('error', (error) => {
        console.log('An Error has occured ', error);
        process.exit(1);
    })
    .on('listening', () => {
        console.log(`Server running, please check localhost:${port}`);
    });