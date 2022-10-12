import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

export const getCorsConfig = (): CorsOptions | CorsOptionsDelegate<any> => ({
  origin: [
    'http://localhost:3333',
    'http://localhost:9100',
    'http://192.168.0.152:3333',
    'http://192.168.0.152:3000',
    'http://192.168.0.152:9100',
    'http://37.140.197.193:',
  ],
  methods: ['POST', 'PUT', 'DELETE', 'GET'],
});
