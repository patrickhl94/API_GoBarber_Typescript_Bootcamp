import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ error: 'This appointment is already bookd' });
  }

  const appointment = appointmentRepository.create(provider, parseDate);

  return response.json(appointment);
});

export default appointmentsRouter;
