# О проекте

«Readme» — это простой headless-движок для блога, построенный с помощью микросервисной архитектуры и современного фреймворка Nest.js. Проект состоит из нескольких микросервисов, каждый сервис решает одну задачу.

Список микросервисов проекта:
1. Acсount  
  Отвечает за работу с пользвателями приложения. Реализует хранение данных о пользователях, авторизацию и аутентификацию.
2. Blog  
  Отвечает за работу с постами, комментариями и тэгами. Реализует хранение данных сущностей в БД, сортировку и фильтрацию выходных данных для пользователей.
3. File-vault  
  Отвечает за работу с файлами и доставку статических файлов клиентам. Реализует хранение загружаемых пользовательских файлов непосредственно на сервере, а также хранение метаданных о файлах в БД. Доступ к статическим файлам осуществляется по следующему пути: 
  `<имя хоста>:3335/static/<директории располжения файла на сервере>/<имя файла>`
4. Notify   
  Отвечает за взаимодействие между сервисами, подписку на обновления, отправку почтовых уведомлений пользователям по запросу.
5. Api  
  Точка входа в приложение. Отвечает за приём входящих запросов от клиентов, распределение запросов по микросервисам, агрегацию данных, получаемых от микросервисов.

# Запуск проекта

1. Отправку команд приложению следует осуществлять из директории 'project'.

2. Перед запуском проекта следут выполнить установку всех зависимостей командой `npm install`. Установка отдельных зависимостей для каждого микросервиса не требуется.

3. Для конфигурирования микросервисов используются переменные окружения. Для корректной работы приложения необходимо для каждого микросервиса создать файл с расширением `.env`. 

    Место расположения `.env` файлов: 
    `./project/apps/<Название микросервиса>/<имя файла>.env`.

    Список переменных окружения, необходимых для каждого микросервиса, указан в соответствующих файлах `.env.example`.

4. Для работы сервиса необходимо установить следующие приложения:
    * база данных MongoDb (для сервисов Notify, Account, File-vault);
    * база данных PostgresSQL (для сервиса Blog);
    * брокер сообщений RabbitMq и SMTP-сервер (для сервиса Notify).

    В директории каждого микросервиса созданы файлы для docer-compose для быстрой установки и настройке данных приложений в случае использования докер-контейнеров.

    Запуск файлов осуществляется командой:   
  `docker compose --file <место расположения файла> --env-file <путь к .env файлу> --project-name <Произвольное название сервиса> up -d`

5. При работе с БД PostgresSql используется ORM Prisma. Для сохранения данных о публикациях необходимо произвести настройку Prisma. Для этого необходимо воспроизвести следующую последовательность команд:  
    * Применить миграции сервиса Blog: 
    `npx nx run blogs:db:migrate --name <Произвольный заголовок для миграции>`
    * Сгенерировать Prisma Client: 
    `npx nx run blogs:db:generate`
  
      Для заполнения БД моковыми данными предусмотрена команда:  
        `npx nx run blogs:db:seed`

6. Запуск каждого микросервиса осуществляется следующими командами:

  ```cmd
    npx nx run api:serve
    npx nx run blog:serve
    npx nx run file-vault:serve
    npx nx run notify:serve
    npx nx run account:serve
  ```

## Документация к REST API сервису в формате OpenAPI доступна по адресу: 
`<Имя хоста>:<Номер порта>/spec`

## Описание переменных окружения:

### Account
* MONGO_DB - имя БД
* MONGO_HOST - хост БД
* MONGO_PORT - порт БД
* MONGO_USER - имя пользователя БД
* MONGO_PASSWORD - пароль БД
* MONGO_AUTH_BASE - имя пользователя интерфейса БД
* MONGO_UI_PORT - порт интерфейса БД
* JWT_ACCESS_TOKEN_SECRET - секретный ключ ACCESS_TOKEN
* JWT_ACCESS_TOKEN_EXPIRES_IN - время жизни ACCESS_TOKEN
* JWT_REFRESH_TOKEN_SECRET - секретный ключ REFRESH_TOKEN
* JWT_REFRESH_TOKEN_EXPIRES_IN - время жизни REFRESH_TOKEN
* RABBIT_HOST - хост Rabbit
* RABBIT_PASSWORD - пароль Rabbit
* RABBIT_PORT - порт Rabbit
* RABBIT_USER - имя пользователя Rabbit
* RABBIT_QUEUE - очередь Rabbit
* RABBIT_EXCHANGE - exchange Rabbit
* PORT - номер порта на котором будет запущено приложение

### Blog
* POSTGRES_USER - имя пользователя БД 
* POSTGRES_PASSWORD - пароль БД
* POSTGRES_DB - имя БД
* POSTGRES_PORT - порт БД
* PGADMIN_DEFAULT_EMAIL - имя пользователя PGADMIN
* PGADMIN_DEFAULT_PASSWORD - пароль PGADMIN
* PGADMIN_PORT - порт PGADMIN
* PORT - номер порта на котором будет запущено приложение

### File-vault
* UPLOAD_DIRECTORY - путь для хранения загруженных файлов
* MONGO_DB - имя БД
* MONGO_HOST - хост БД
* MONGO_PORT - порт БД
* MONGO_USER - имя пользователя БД
* MONGO_PASSWORD - пароль БД
* MONGO_AUTH_BASE - имя пользователя интерфейса БД
* MONGO_UI_PORT - порт интерфейса БД
* SERVE_ROOT - путь доступа к файлам
* PORT - номер порта на котором будет запущено приложение

### Notify
* RABBITMQ_DEFAULT_USER - имя пользователя по умолчанию Rabbit
* RABBITMQ_DEFAULT_PASS - пароль  по умолчанию Rabbit
* RABBIT_HOST - хост Rabbit
* RABBIT_PASSWORD - пароль Rabbit
* RABBIT_PORT - порт Rabbit
* RABBIT_USER - имя пользователя Rabbit
* RABBIT_QUEUE - очередь Rabbit
* RABBIT_EXCHANGE - exchange Rabbit
* MONGO_DB - имя БД
* MONGO_HOST - хост БД
* MONGO_PORT - порт БД
* MONGO_USER - имя пользователя БД
* MONGO_PASSWORD - пароль БД
* MONGO_AUTH_BASE - имя пользователя интерфейса БД
* MONGO_UI_PORT - порт интерфейса БД
* MAIL_SMTP_HOST - хост SMTP-сервера
* MAIL_SMTP_PORT - порт SMTP-сервера
* MAIL_USER_NAME - имя пользователя SMTP-сервера
* MAIL_USER_PASSWORD - пароль SMTP-сервера
* MAIL_FROM - адрес с которого будет производиться отправка почты
* PORT - номер порта на котором будет запущено приложение


