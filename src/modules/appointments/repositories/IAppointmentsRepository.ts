import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppintmentDTO from '../dtos/ICreateAppintmentDTO';

export default interface IAppointmentsRepository{
    create(data: ICreateAppintmentDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>;
}