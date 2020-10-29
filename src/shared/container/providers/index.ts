import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealEmailProvider from './MailProvider/implementations/EtherealEmailProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider', 
    DiskStorageProvider,
);

container.registerInstance<IMailProvider> (
    'MailProvider',
    new EtherealEmailProvider(),
);