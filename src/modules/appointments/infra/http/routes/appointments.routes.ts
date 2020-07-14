import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentServices);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parseDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
