//Arquivo responsavel pelas Notificações
import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreatieNotificationDTO from '@modules/notifications/dtos/ICreatieNotificationDTO';

import Notification from '../schemas/Notifications';

class NotificationRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>

    constructor(){
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
         content,
         recipient_id,
    }: ICreatieNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({ content, recipient_id });

        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationRepository;