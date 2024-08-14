const env = process.env.NODE_ENV || 'development';
const version = process.env.VERSION || '1.0.0';
// add userInfo param to logger function
const email = '';
const userId = '';

export const LOGGER_EVENTS = {
    ROUTING: 'routing' as const,
    ERROR: 'error' as const,
    DEBUG: 'debug' as const,
    INFO: 'info' as const,
  };
  
  export type LogLevel = 'routing' | 'error' | 'debug' | 'info';
  
  export async function logger(
    event: LogLevel = 'debug',
    payload: any,
    moduleName = '',
    device = '',
    httpRequestDetails: { method?: string; url?: string; statusCode?: number; responseTime?: number } = {}
  ) {
    function formattedMessage(payload: any): string {
      if (payload instanceof Error) {
        return `Error: ${payload.message}\nStack: ${payload.stack}`;
      }
      switch (typeof payload) {
        case 'string':
          return payload;
        case 'number':
        case 'boolean':
          return payload.toString();
        case 'object':
          if (payload === null) {
            return 'null';
          }
          try {
            return JSON.stringify(payload, null, 2);
          } catch (error) {
            return 'Circular reference in payload';
          }
        default:
          return `Unsupported type: ${typeof payload}`;
      }
    }
  
    const httpRequestMessage = httpRequestDetails.method
      ? [
          `HTTP Method: ${httpRequestDetails.method}`,
          `URL: ${httpRequestDetails.url}`,
          `Status Code: ${httpRequestDetails.statusCode}`,
          `Response Time: ${httpRequestDetails.responseTime}ms`,
        ].join(' | ')
      : '';
  
    const logMessage = [
      `Log: ${formattedMessage(payload)}`,
      `User email: ${email || 'N/A'}`,
      `User ID: ${userId}`,
      `Environment: ${env}`,
      `Module: ${moduleName}`,
      `Version: ${version}`,
      `Device: ${device}`,
      httpRequestMessage,
    ].join(' | ');
  
    console[event === 'error' ? 'warn' : 'log'](`== ${event} : ${logMessage}`);
  
    if (env === 'production') {
      fetch('https://api.example.com/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: logMessage,
          email: email,
          userId: userId,
          environment: env,
          module: moduleName,
          version: version,
          device: device,
          httpRequestDetails,
        }),
      });
    }
  }