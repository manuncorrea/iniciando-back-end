## RECUPERAÇÃO DE SENHA

**RF - REQUISTOS FUNCIONAIS** 

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF -  REQUISTOS FUNCIONAIS** 

- Utilizar Mailtrap para testar envios de ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN - REGRAS DE NEGOCIOS** 

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao recuperar sua senha;

## ATUALIZAÇÃO DO PERFIL 

**RF - REQUISTOS FUNCIONAIS** 

- O usuário deve poder atualizar seu nome, email e senha;

**RN - REGRAS DE NEGOCIOS** 

- O usuário não pode alterar seu e-mail para um e-mail já utlizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

## PAINEL DO PRESTADOR 

**RF - REQUISTOS FUNCIONAIS** 

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF - REQUISTOS FUNCIONAIS** 

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armanazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utlizando Socket.io;

**RN - REGRAS DE NEGOCIOS** 

- A notificação do prestador no dia devem ser armazenados em cache;

## AGENDAMENTO DE SERVIÇOS

**RF - REQUISTOS FUNCIONAIS** 

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário dísponivel de um prestador;
- O usuário deve poder listar horários dísponiveis em um dia específico de um prestador;
- O usuário  deve poder realizar um novo agendamento com um prestador;

**RNF - REQUISTOS FUNCIONAIS** 

- A listagem de prestadores deve ser armazenada em cache;

**RN - REGRAS DE NEGOCIOS** 

- Cada agendamento deve durar 1h exatamene;
- Os agendamentos devem estar diponóveis entre 8h ás 18h (Primeiro ás 8h, último ás 17h);
- O usuário não podem agendar em um horario já ocupado;
- O usuário não podem agendar em um horario que já passou;
- O usuário não podem agendar serviço consigo mesmo;

