## Авторизация на node.js
Тестовый сервер позволяет авторизоваться как через логин/пароль, так и через id-значение установленной ранее сессии. <br>
При изменении данных пользователя, все старые связанные с ним сесии очищаются. <br>
В качестве базы данных используется `PostgreSQL`
***
Команды для `npm`
```shell script
# Запуск сервера
npm start

# Миграция БД
npm migrate

# Запуск юнит-тестов
npm test
```
В процессе работы используются следующие переменные окружения:
- `NODE_ENV` - может быть `test`, `develop` и `production`
- `COOKIE_SECRET` - строковое значение с помощью которого подписываются cookie
