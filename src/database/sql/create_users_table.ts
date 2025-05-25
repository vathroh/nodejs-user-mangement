const createUsersTableSql = `
CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL,
    email varchar(255) NOT NULL,
    password_hash varchar(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by varchar(255),
    created_by varchar(255),
    is_deleted boolean DEFAULT false,
    deleted_at timestamp with time zone,
    deleted_by varchar(255),
    created_src varchar(255),
    updated_src varchar(255),
    deleted_src varchar(255),
    auth_provider_id integer,
    roles_id integer,
    PRIMARY KEY(id)
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON public."users" USING btree (email);
`;

export default createUsersTableSql;
