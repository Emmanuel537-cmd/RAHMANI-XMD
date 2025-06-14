




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1BxMXkwcWlKbzZZWkptUjVlRExBMkRIWFlQZEpJMDdaTXpvT2h3UzIzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3BTZ3h1WE5YUnBaTWc1TkxRUEZkaGNCdXlVdGhKNm5BNHJWaGlVVWMxUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwUE1LQmxzdXBCZkRhUDFmSnVrMjQ4YXcxZGQrTWp2TTFFSXpqS01adkg0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwbFlwRE5HUVdpM0NvWnRabkRDR0FBb3lEcTlPZkVLaHIxYzREdVhyTzJnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9QSHdMekRtMG1ZMnlxL2F4SHpZTkY5MEVqK3ZmWERoM3dkMi9jMUpmbVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZXVWhNVUxNUy9kTjlkUHVPZ01jdWFNMmM5ZDczT2RmSnoza0Z6aCtpUTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWURZT1M1bjZOKzJvVEpOVVU0MTN6a2N1SE5EU3ZYZ1czV2lFRmh2TWxVUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnhtTzdCTUs4VkVGYXhmZUZrZGRJeXgrVGh1NXZkcTZMU3R0Vk9jWjYzOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZJVjZIbXhYM3NGZVFGZ2s4aTVwbk1xQXpjTXhXR0xDNFdxWmFlQTh0YVFXZnZFb085R2FwMkFIWldWb3BHR0E0QktVbjRwQTdIZTNOVTJCQnEwbEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6ImdFNG1sL21UbVg0RXNZWlZ0YUhLQ0tLMElRdWJHaVZJRUFybjFHTFBTVEk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzgxNDMyMjU0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjMzMEU3MjBCM0ZGMDBGNjY1Q0I2NUFDNkE2RjA0OEQyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk4OTM0MDl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4MTQzMjI1NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCRjE0MTA1MkNERDYxOTZCOUVDNDY5N0QzQzJCQkIwRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODkzNDA5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI1TDY5Nk5aOCIsIm1lIjp7ImlkIjoiMjYzNzgxNDMyMjU0OjFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI1OTAwMDU4NjU0MzI0NjoxQGxpZCIsIm5hbWUiOiLwn5SlX2BgYH5URUUgS0FZIH5gYGBf8J+UpSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0xCMTZnQ0VJcUN0Y0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMVcraVI4TERFSTdGL2tGdkRPczhLWTFRc1BNTXVjU3EwMHZQNkIydnJFST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZEtEZ1lZYVhUUlFPYk4yU09UazNWbWFITi81Nk9mK3pSeVZPZFdmVHNKMHZnekR6ZkhCT2k2d25zQ3BJRGxuRUpLNmM1eE1zaU9RYWFvbjAvY1FzQmc9PSIsImRldmljZVNpZ25hdHVyZSI6InNtaEpwaURPSzBlaUFONW1DQklFU1JUbU1KWDIwcnB0Rzd3dmh5Qnc5QnNQUklpUzQ3Ti9xM0ZMa1ZURVhNQVNtUG9sK2tRN2V3bFJSVFJaSnJjcUJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxNDMyMjU0OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZFZ2b2tmQ3d4Q094ZjVCYnd6clBDbU5VTER6RExuRXF0Tkx6K2dkcjZ4QyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5ODkzNDAwLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ1dSIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Emmanuel",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Emmanuel ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'EM-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
