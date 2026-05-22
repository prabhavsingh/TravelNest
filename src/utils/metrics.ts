import promClient from 'prom-client';
import responseTime from 'response-time';

export const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const reqResTime = new promClient.Histogram({
  name: 'http_express_req_res_time',
  help: 'THis tells how much time is taken by req and res',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 5, 10, 50, 100, 200, 500, 800, 1000, 2000, 5000],
});

const httpRequestsCounter = new promClient.Counter({
  name: 'http_total_request_counter',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(reqResTime);
register.registerMetric(httpRequestsCounter);

export const initMetric = (app) => {
  app.use(
    responseTime((req, res, time) => {
      reqResTime
        .labels({
          method: req.method,
          route: req.url,
          status_code: req.statusCode,
        })
        .observe(time);
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      httpRequestsCounter.inc({
        method: req.method,
        route: req.path,
        status: res.statusCode,
      });
    });
    next();
  });
};
