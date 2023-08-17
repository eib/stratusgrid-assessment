import { parseSettings } from './config';
import { buildApp } from './routes';

const settings = parseSettings(process.env);
const app = buildApp(settings);

const server = app.listen(settings.port, () => {
    console.log(`Server listening on port ${settings.port}`);
});

process.on('SIGINT', () => {
    console.log('Gracefully shutting down due to SIGINT');
    // TODO: might want to handle connections closing "more gracefully" (i.e. after a short delay)
    // https://stackoverflow.com/a/44794174
    // https://stackoverflow.com/a/40321400
    server.close();
});
