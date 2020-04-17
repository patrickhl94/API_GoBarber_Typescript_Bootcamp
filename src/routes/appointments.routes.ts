import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (request, response) => {
  return response.json({ messege: 'WELLO WORLD!' });
});

export default appointmentsRouter;
