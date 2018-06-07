const core = require('alb3rt-core'),
  custom = require('../../custom');

module.exports = new class Alb3rtDbResourcesCustom {
    put(request, response) {
        custom.put(request.params.id, request.body, (status) => {
            core.api.responder.send(response, {
                status
            });
        });
    }

    post(request, response) {
        custom.post(request.params.id, request.body, (status) => {
            core.api.responder.send(response, {
                status
            });
        });
    }
};