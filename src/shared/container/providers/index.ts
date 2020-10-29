import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealEmailProvider from './MailProvider/implementations/EtherealEmailProvider';

import IMailTemplateProvider from './MailTamplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTamplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider', 
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider', 
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider> (
    'MailProvider',
    container.resolve(EtherealEmailProvider),
);
