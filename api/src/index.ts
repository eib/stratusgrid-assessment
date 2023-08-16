import express from 'express';

const port = 8080; // TODO: migrate to an args/env-vars module
const app = express();
const server = app.listen(port, () => {
    // TODO: structured logging
    console.log(`server running on port ${port}`);
});

process.on('SIGINT', () => {
    console.log('Gracefully shutting down due to SIGINT');
    server.close();
    // TODO: might want to handle connections closing "more gracefully" (i.e. after a short delay)
    // https://stackoverflow.com/a/44794174
    // https://stackoverflow.com/a/40321400
});
