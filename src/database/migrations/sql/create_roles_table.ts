const createUsersTableSql = `
CREATE TABLE IF NOT EXISTS roles(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    name varchar(255) NOT NULL,
    code varchar(255) NOT NULL,
    description varchar(255),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_src varchar(255),
    created_by varchar(255),
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_src varchar(255),
    updated_by varchar(255),
    is_deleted boolean DEFAULT false,
    deleted_at timestamp with time zone,
    deleted_src varchar(255),
    deleted_by varchar(255)
);
CREATE UNIQUE INDEX IF NOT EXISTS roles_name_key ON public.roles USING btree (name);
CREATE UNIQUE INDEX IF NOT EXISTS roles_code_key ON public.roles USING btree (code);
`;

export default createUsersTableSql;
