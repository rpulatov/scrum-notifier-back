## Чат-бот помошник для SCRUM-команд
Все запросы, кроме запроса авторизации доступны только авторизированным пользователям.

### Авторизация
#### POST /api/auth  -  Авторизация пользователя.
    пример запроса: 
    {
        "password": "1111",
        "username": "admin"
    }
    пример ответа:
    {
        "user": {
            "id": 2,
            "hash": "$2a$10$.2mflfznIA3CuoeyRVMcG.RcEpMOJJJzVZ/GuTfrR1KJKroLGpY6a",
            "username": "admin",
            "createdAt": "2021-07-29T13:30:54.218Z",
            "updatedAt": "2021-07-29T13:30:54.218Z",
            "roleId": 1
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NTg5NDgwLCJleHAiOjE2Mjc2OTc0ODB9.1E6cPxrOu9uLSFlkrluEsxRM-c7jggk07Q9lJMoQljc"
    }

### Пользователи (Users)
#### GET /api/user  -  Возвращает массив всех пользователей.
#### GET /api/user/:id  -  Возвращает пользователя с указанным id.
#### POST /api/user/  -  Создает нового пользователя. 
    пример запроса: 
    {
        "password": "1111",
        "username": "admin",
        "roleId": 1          // пока указывать не обязательно
    }
    пример ответа:
    {
        "id": 2,
        "hash": "$2a$10$.2mflfznIA3CuoeyRVMcG.RcEpMOJJJzVZ/GuTfrR1KJKroLGpY6a",
        "username": "admin",
        "createdAt": "2021-07-29T13:30:54.218Z",
        "updatedAt": "2021-07-29T13:30:54.218Z",
        "roleId": 1
    }
#### PUT /api/user/:id  -  Обновляет данные пользователся с указанным id и возвращает обновленного пользователся.
#### DELETE /api/user/:id  -  удаляет пользователя с указанным id.
 
### Сотрудники (Employees)
#### GET /api/employee  -  Возвращает массив всех сотрудников.
#### GET /api/employee/:id  -  Возвращает сотрудника с указанным id.
#### POST /api/employee/  -  Создает нового сотрудника, отправляет ему на почту код для телеграм бота и связывает его с проектами.
    пример запроса: 
    {
        "email": "email@example.com",
        "name": "Иванов Иван",
        "projectIds": [1,4]
    }
    пример ответа:
    {
        "id": 34,
        "name": "Иванов Иван",
        "email": "email@example.com",
        "code": "1307",
        "updatedAt": "2021-07-29T20:32:35.315Z",
        "createdAt": "2021-07-29T20:32:35.315Z",
        "chatId": null
    }
#### PUT /api/employee/:id  -  Обновляет данные сотрудника с указанным id и возвращает обновленного сотрудника.
#### DELETE /api/employee/:id  -  удаляет сотрудника с указанным id.

### Встречи (Meetings)
#### GET /api/meeting  -  Возвращает массив всех встреч.
#### GET /api/meeting/:id  -  Возвращает встречу с указанным id.
#### POST /api/meeting/  -  Создает новую встречу.
    пример запроса: 
    {
        "days": "0101010",
        "time": "15:00:00",
        "description": "Описание...", // можно не указывать
        "projectId": 2
    }
    пример ответа:
    {
        "id": 6,
        "meetingTypeId": null,
        "projectId": 2,
        "description": "Описание...",
        "days": "0101010",
        "time": "15:00:00",
        "updatedAt": "2021-07-29T20:36:37.397Z",
        "createdAt": "2021-07-29T20:36:37.397Z"
    }
#### PUT /api/meeting/:id  -  Обновляет данные встречи с указанным id и возвращает обновленную встречу.
#### DELETE /api/meeting/:id  -  удаляет встречу с указанным id.

### Проекты (Projects)
#### GET /api/project  -  Возвращает массив всех проектов.
#### GET /api/project/:id  -  Возвращает проект с указанным id.
#### POST /api/project/  -  Создает новый проект.
    пример запроса: 
    {
        "name": "Создание корпаративного чат бота.",
        "description": "Чат бот для напоминания о встречах." // можно не указывать
    }
    пример ответа:
    {
        "id": 6,
        "name": "Создание корпаративного чат бота.",
        "description": "Чат бот для напоминания о встречах.",
        "updatedAt": "2021-07-29T20:44:16.481Z",
        "createdAt": "2021-07-29T20:44:16.481Z"
    }
#### PUT /api/project/:id  -  Обновляет данные проекта с указанным id и возвращает обновленный проект.
#### DELETE /api/project/:id  -  удаляет проект с указанным id.


