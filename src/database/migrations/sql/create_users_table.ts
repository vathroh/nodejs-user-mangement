const createUsersTableSql = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- untuk gen_random_uuid()

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    email varchar(255) UNIQUE,
    phone_number varchar(255),
    password varchar(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by varchar(255),
    created_by varchar(255),
    is_deleted boolean DEFAULT false,
    deleted_at timestamp with time zone,
    deleted_by varchar(255),
    created_src varchar(255),
    updated_src varchar(255),
    deleted_src varchar(255)
);
`;

export default createUsersTableSql;
