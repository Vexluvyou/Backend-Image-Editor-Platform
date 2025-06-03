import { serve, setup } from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const setupSwagger = (app) => {

  const swaggerSpec = YAML.load(path.resolve('./swagger-endpoints.yaml'));
  app.use('/swagger-v1', serve, setup(swaggerSpec));
};

export default { setupSwagger };
