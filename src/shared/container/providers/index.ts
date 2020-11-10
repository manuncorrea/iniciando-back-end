import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealEmailProvider from './MailProvider/implementations/EtherealEmailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

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
    mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealEmailProvider)
    : container.resolve(SESMailProvider),
);
