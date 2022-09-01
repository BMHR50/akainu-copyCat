const app = require('./http/app')

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})