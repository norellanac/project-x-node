import { Express } from 'express';

const getRoutes = (app: Express, baseUrl: string = '', level: number = 0): void => {
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Routes registered directly on the app
      printRoutes(middleware.route, baseUrl, level);
    } else if (middleware.name === 'router') {
      // Routes added as router middleware
      const base = middleware.regexp.source.replace('^\\', '').replace('\\/?(?=\\/|$)', '');
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          printRoutes(handler.route, baseUrl + base, level + 1);
        }
      });
    }
  });
};

const printRoutes = (route: any, baseUrl: string, level: number): void => {
  const methods = Object.keys(route.methods).map(method => method.toUpperCase()).join(', ');
  const indentation = ' '.repeat(level * 2); // Increase indentation for each level
  console.log(`${indentation}Method(s): [${methods}] Path: ${baseUrl}${route.path}`);
};

export default getRoutes;