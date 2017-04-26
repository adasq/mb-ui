const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });


const routeHandler = require('./routes/play.js');

server.route({
    method: 'POST',
    path: '/play',
    handler: routeHandler
});

server.route({
    method: 'GET',
    path: '/test',
    handler: (req, res) => {
        res({
            aa: 2
        })
    }
});

function start(cb) {

server.start((err) => {
    if (err) {
        return cb(err);
    }
    cb(null);
});
}


module.exports = {
    start
}