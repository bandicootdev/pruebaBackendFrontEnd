CREATE TABLE IF NOT EXISTS users
(
    id_user      SERIAL PRIMARY KEY NOT NULL,
    username     VARCHAR UNIQUE     NOT NULL CHECK ( users.username <> ''),
    password     VARCHAR            NOT NULL CHECK ( users.password <> ''),
    email        VARCHAR(60)        NOT NULL CHECK ( users.password <> ''),
    description  VARCHAR            NOT NULL CHECK ( users.description <> '' ),
    private_user BOOLEAN     DEFAULT FALSE,
    created_at   timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at   timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS followers
(
    id_follower BIGINT NOT NULL,
    id_user     BIGINT NOT NULL,
    FOREIGN KEY (id_follower) REFERENCES users (id_user),
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE IF NOT EXISTS following
(
    id_following BIGINT NOT NULL,
    id_user     BIGINT NOT NULL,
    FOREIGN KEY (id_following) REFERENCES users (id_user),
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE IF NOT EXISTS posts
(
    id_post      SERIAL PRIMARY KEY NOT NULL,
    url_image    VARCHAR            NOT NULL CHECK ( posts.url_image <> '' ),
    description  VARCHAR            NOT NULL CHECK ( posts.description <> '' ),
    created_at   timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at   timestamptz DEFAULT CURRENT_TIMESTAMP,
    id_user      INTEGER            NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE IF NOT EXISTS comments
(
    id_comment SERIAL PRIMARY KEY NOT NULL,
    message    VARCHAR            NOT NULL CHECK ( comments.message <> '' ),
    id_parent    BIGINT,
    id_user    BIGINT             NOT NULL,
    id_post    BIGINT             NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_post) REFERENCES posts (id_post),
    FOREIGN KEY (id_parent) REFERENCES comments (id_comment)
);

CREATE TABLE IF NOT EXISTS likes
(
    id_user    BIGINT NOT NULL,
    id_post    BIGINT NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_post) REFERENCES posts (id_post)
)