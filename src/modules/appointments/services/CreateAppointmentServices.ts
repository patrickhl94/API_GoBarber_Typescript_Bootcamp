import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateAppointmentDTO from '../repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: ICreateAppointmentDTO,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentServices;
