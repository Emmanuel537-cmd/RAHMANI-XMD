




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0JGdFJHK2pkQnVXdjVvdklLdGE4WlpTM0VlLzdsRjkzL3grOVBFcVVFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3UyUEFNUjZxSHlibDhhNlVtQ2k3ekZ4dElGRWZUSWFrbElSbW1hbVpUcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRFBjV3VhL1ozTEROaGJocVBUNkFNSWJVWnNYSktlcEVRVWYyVFB3SEZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLVUlpQm8zaVgzSERCUGlwR0RRVTZYdnY3RWs0ZTJBMm92M1IzUEtZSFdjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFKb3hCQmFaQmhZeDBvVHZQVlNnc1VOZWh4TzM0TE82aVFzdnYzTytMRWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlY3cEIxV0J4ZnJTK2g1M0dFb2VoZlo4MXQ3QXBGSGhET3lqa0xrUjVZUzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJqT241TFJHYW0ybnhIQ2JoV3Vhbi9HM0Z5RlFnaEd2ekFjM0d5TjZYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmYza3E3dXFXbWcwQm1GcVQ0MnF2ck9lek5zN2paREpFK1Q3RTN0WXBRRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imtsam13akJXdjRNdEVia0huR3owbU9GZEdEd0lwUzNZSWJiR2d3aDVLdDU3dlVQaEpxOG1lVlpKRHFBYnlkb2FBRkF2M2JLa0V4ZTlieXBaOGJFekJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MiwiYWR2U2VjcmV0S2V5IjoiOUliZlI5RCs5MXd5cnBEWEsrRjN5Z1B2YjVsSjRGY01vUjhYUFNkYzBabz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODQ4NjgxNjVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREQwRkVCMjdERTExOEIzMjAxNTAxMDlGRjg2RUZCOUYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTQ4MDcwM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiR0IzNFFCTjQiLCJtZSI6eyJpZCI6IjI2Mzc4NDg2ODE2NTozNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDRUUtSkFZIiwibGlkIjoiMzM1NTcwMTU3MzYzMzU6MzZAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJV3MyT0lERU4vcG04SUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJiZ2dQOUlRL2JxVkpVMndPY2p3OG5FdEZLcC9VWTl1eTkyV3RHTWdtRmtZPSIsImFjY291bnRTaWduYXR1cmUiOiJrV3o0STdVTlp2VitBaTIyMmZLSGxHQ1pJMWxSazFmMzhrZGgyald4VnNBRXRiYnozVEZ5RWVneFFhUEYzMGRLNjlPVnBVWmUrL241ay91Rzg0SFJBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMU5VbGQ1Vmo0WlpvSjd4d1FyTWI3Q094WWlML3FrcG5kL01EMnRHVTVEU2FHcjJjNXFZRzdTTnpsZDdoZjZHODlWRGNwcm0wVjMxWjBEcmVSZDlzQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODQ4NjgxNjU6MzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVzRJRC9TRVAyNmxTVk5zRG5JOFBKeExSU3FmMUdQYnN2ZGxyUmpJSmhaRyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5NDgwNjg2LCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFPZSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "https://files.catbox.moe/aktbgo.jpg",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
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
