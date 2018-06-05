const core = require('alb3rt-core'),
    logs = require('../../logs');

module.exports = new class Alb3rtDbResourcesLogs {
    put(request, response) {
        logs.insert(request.body, (status) => {
            core.api.responder.send(response, {
                status
            });
        });
    }
};