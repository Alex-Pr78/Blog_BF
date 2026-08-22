Области хранения данных:

- база данных на json-server
- файлы на сервере (BFF)
- файлы на локальном компьютере (Redux Store)

Сущности приложения:

- пользователь: БД (список пользователей), BFF (сессия текущего пользователя), Redux Store (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия текущей роли), Redux Store (использование на клиенте)
- статья: БД (список статей), Redux Store (отображение в браузере)
- комментарий: БД (список комментариев), Redux Store (отображение в браузере)

Таблицы БД:

- пользователи ( users: id, login, password, registered_at, role_id )
- роли ( roles: id, name )
- статьи ( posts: id, title, content, published_at, image_url )
- комментарии ( comments: id, author_id, post_id, content, published_at )

Схема состояния на BFF:

- сессия текущего пользователя (login, password, role)

Схема для Redux Store (На клиенте):

- user: (id, login, roleId, session)
- posts: массив post: (id, title, commentsCount, publishedAt, imageUrl)
- post: (id, title, content, publishedAt, imageUrl, comments: массив: coment(id, author, content, publishedAt))
- users: массив: user(id, login, registeredAt, role)

- docker-compose up -d Запуск приложения
