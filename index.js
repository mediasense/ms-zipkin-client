function getZipkin(zipkinEndpoint, localServiceName) {

    const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

    const Z = require('zipkin');

    if (!zipkinEndpoint) {
        console.warn("Zipkin is not enabled");
        return (_req, _res, next) => {
            next();
        };
    }

    const HttpLogger = require('zipkin-transport-http').HttpLogger
    const noop = require('noop-logger');

    const recorder = new Z.BatchRecorder({
        logger: new HttpLogger({
            endpoint: zipkinEndpoint,
            jsonEncoder: Z.jsonEncoder.JSON_V2,
            httpInterval: 1000,
            log: noop
        })
    });

    const tracer = new Z.Tracer({
        recorder,
        ctxImpl: new Z.ExplicitContext(), // this would typically be a CLSContext or ExplicitContext
        localServiceName: localServiceName // name of this application
    });

    return { middleware: new zipkinMiddleware({tracer}), tracer: tracer };
}

module.exports = getZipkin;

