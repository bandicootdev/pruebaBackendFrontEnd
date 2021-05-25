CREATE TABLE IF NOT EXISTS users
(
    id_user  SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR UNIQUE     NOT NULL CHECK ( users.username <> ''),
    password VARCHAR            NOT NULL CHECK ( users.password <> ''),
    email    VARCHAR(60)        NOT NULL CHECK ( users.password <> '')
);

CREATE TABLE IF NOT EXISTS posts
(
    id_post      SERIAL PRIMARY KEY NOT NULL,
    url_image    VARCHAR            NOT NULL CHECK ( posts.url_image <> '' ),
    num_likes    BIGINT DEFAULT 0,
    num_comments BIGINT DEFAULT 0,
    id_user      INTEGER            NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE IF NOT EXISTS comments
(
    id_comment SERIAL PRIMARY KEY NOT NULL,
    message    VARCHAR            NOT NULL CHECK ( comments.message <> '' ),
    id_user    BIGINT             NOT NULL,
    id_post    BIGINT             NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_post) REFERENCES posts (id_post)
);

CREATE TABLE IF NOT EXISTS likes
(
    id_user    BIGINT             NOT NULL,
    id_post    BIGINT             NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_post) REFERENCES posts (id_post)
)