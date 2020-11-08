import { ObjectID, ObjectId } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreatieNotificationDTO from '@modules/notifications/dtos/ICreatieNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notifications';

class FakeNotificationsRepository implements INotificationsRepository {
    private notifications: Notification[] = [];

    public async create({
         content,
         recipient_id,
    }: ICreatieNotificationDTO): Promise<Notification> {
        const notification = new Notification();

        Object.assign(notification, {id: new ObjectID(), content, recipient_id });

        this.notifications.push(notification);

        return notification;
    }
}

export default FakeNotificationsRepository;