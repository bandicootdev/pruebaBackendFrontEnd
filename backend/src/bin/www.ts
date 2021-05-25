import http from 'http';
import { createHttpTerminator } from 'http-terminator';
import app from '../app';
import { mainLogger as logger } from '../utils/loggers';


function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const port = normalizePort(process.env.PORT || '3000');

interface HttpError extends Error {
    syscall: string;
    code: string;
    [key: string]: any;
}

function onError(error: HttpError) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const httpTerminator = createHttpTerminator({ server });

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    logger.log('info', `Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

/**
 * Event listener for HTTP server "error" event.
 */

process.on('SIGTERM', async () => {
    logger.log(
        'info',
        'Got SIGTERM (docker container stop). Terminating gracefully',
    );
    await httpTerminator.terminate();
    logger.log('info', 'HTTP connections terminated');
    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.log('info', 'Got SIGINT (ctrl-C). Terminating gracefully');
    await httpTerminator.terminate();
    logger.log('info', 'HTTP connections terminated');
    process.exit(0);
});
