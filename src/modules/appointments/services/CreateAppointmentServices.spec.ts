import FakeAppointmenReposotory from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmenrService from './CreateAppointmentServices';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmenReposotory = new FakeAppointmenReposotory();
    const createAppointmenrService = new CreateAppointmenrService(
      fakeAppointmenReposotory,
    );

    const appointment = await createAppointmenrService.execute({
      date: new Date(),
      provider_id: 'izu6f4q891f8qf11fq9',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('izu6f4q891f8qf11fq9');
  });

  //   it('should not be able to create to appointment on the same time', () => {
  //     expect(1 + 2).toBe(3);
  //   });
});
