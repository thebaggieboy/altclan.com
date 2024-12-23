import crypto from 'crypto'

const generateUniqueId = (...vals) => {
    const concatenatedString = vals.join('');
    const hash = crypto.createHash('sha256');
    hash.update(concatenatedString);
    return hash.digest('hex');
};


export default generateUniqueId