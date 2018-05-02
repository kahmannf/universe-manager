module.exports = {
    saltLength: process.env.SALT_LENGTH,
    hashArlgorithm: process.env.PASSWORD_HASH_ALGORITHM,
    tokenttl: process.env.TOKENTTL,
    secret: process.env.SECRET
}