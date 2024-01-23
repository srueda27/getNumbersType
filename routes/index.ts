import { Router } from 'express';

import multiples from './multiples'
import collections from './collections'

const routes = Router();

routes.use('/multiples', multiples);
routes.use('/collections', collections);

export default routes;