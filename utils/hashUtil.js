// const bcrypt = require('bcrypt');

// const hashPassword = async (password) => {
//     const saltRounds = 10;
//     return await bcrypt.hash(password, saltRounds);
// };

// const comparePassword = async (password, hashedPassword) => {
//     return await bcrypt.compare(password, hashedPassword);
// };

// module.exports = { hashPassword, comparePassword };


const hashPassword = (password) => {
    // Store the password directly (not secure)
    return password;
};

const comparePassword = (password, storedPassword) => {
    // Compare the plaintext password directly
    return password === storedPassword;
};

module.exports = { hashPassword, comparePassword };
