const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS users_to_roles (
        user_id uuid NOT NULL,
        role_code VARCHAR(255) NOT NULL,
        UNIQUE (user_id, role_code)
    );
`;

export default createUsersTableSql;
