Used to add Zipkin to a service.

## Usage

    getZipkin = require('ms-zipkin-client');
    const {tracer: zipkinTracer, middleware: zipkinMiddleware } = getZipkin(process.env.ZIPKIN_ENDPOINT, 'lib.add_header');
    app.use(zipkinMiddleware);
