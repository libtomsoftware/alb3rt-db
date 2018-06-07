const core = require('alb3rt-core'),
    devices = require('../../devices');

module.exports = new class Alb3rtDbResourcesDevices {
    post(request, response) {
        devices.store(request.body, (status) => {
            core.api.responder.send(response, {
                status
            });
        });
    }
};