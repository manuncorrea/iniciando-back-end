import ICreatieNotificationDTO from '../dtos/ICreatieNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
    create(date: ICreatieNotificationDTO): Promise<Notification>;
}