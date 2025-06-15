export const registerSQL = () => {
  return `
    INSERT INTO users (id, email, phone_number, password)
    VALUES ($1, $2, $3, $4);
    `;
};
