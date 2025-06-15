const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS users_to_auth_providers (
        user_id uuid NOT NULL,
        auth_provider_code VARCHAR(255) NOT NULL,
        UNIQUE (user_id, auth_provider_code)
    );
`;

export default createUsersTableSql;
