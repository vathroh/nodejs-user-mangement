const getUserByEmailSql = `SELECT * FROM users WHERE email = $1`;

export default getUserByEmailSql;
