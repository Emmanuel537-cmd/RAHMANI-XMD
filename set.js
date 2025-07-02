




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVEWWxQdlRPN0lPVnJOakFJR3dnQnJMS2UwRmpjSTNpTXRpRnJ2SEdXbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWdwWWc1b1hYbERpTTBDbkFqckZLNWhRWDhwRVg2ZDFTUkVCUWYwOTZGcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSkxoSXNzN0k4VkNqWGhQWnQvZnNvaFFiT1BmMmRRZ3dvZW1iemJlK0gwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQcXExVFJQdEl1OWhzRXZvdVl0NGY1UDdRVmJYbE9TUmYrWGcvTUdvQm40PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVOUzM1VVRja3I1c1V3YXdOWHgwSmI3L2didDhjclhEU1cySXJTYWlFRTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1YcE0zbk11NjR0R2orVUx4TExyb2ZhbjBrMzJBTCtQc3Q3d1ZLbDU2RlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUJreW1nWlRVWWJ6WEdLcmlxRzlMOUJpRjNCT05OY2RIcjAyR3YvSjdGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUdUdFFsMjhUVFh2ZEtSMW9DVk9BUE5nSmkxZHZIY1NFbXA5cGRSYnhHST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJpUk91QloxYnhheEMyNHZrU1YvTGVDaStRNEc0dzFBaE9RbG9QVndqMlpkbVBGQitKeTZQbWlqTUlNL1ZrUlc5SWZ1R0FzbGlrbDFhcmI4UGRPVGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc5LCJhZHZTZWNyZXRLZXkiOiJWZk1uaC9RMUNuMHFOWVZjc1NHaG9uTXBUTFIwZWd5NldIR041ckJaTUVJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4NDg2ODE2NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCNkYwRThBMDE5NkU4MUNBNDY1OTU0RTRCMjBGNUU2QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNDAxNTQ2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJSODdXNE5GTCIsIm1lIjp7ImlkIjoiMjYzNzg0ODY4MTY1OjU4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKfo+KfouG0hOG0h+G0hy3htIrhtIDKj+Kfo+KfoiIsImxpZCI6IjMzNTU3MDE1NzM2MzM1OjU4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTZzMk9JREVLQ0lrY01HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYmdnUDlJUS9icVZKVTJ3T2NqdzhuRXRGS3AvVVk5dXk5Mld0R01nbUZrWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTEV0c29uSGYvVHNqTVRSNFFVNmdUYXlRQ0pnOStzNjhNRk8wSzIvc1pNSjF1V2pSM21PSDhvR0pLNG9zZHpoZWw0Tk04dGpSbHZzREZJeDA1YnBzQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IndxSjYvZDg0bHU3Y3FiamZPWjEzaUU3eTFnZWJqUEdsWmRqZWcrSmhyZU93RlZuS0IvNjZjWjNiL0hMRnR2MG1uK3Q4THVjMFVuU3QwUk1OaWx5TGd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg0ODY4MTY1OjU4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlc0SUQvU0VQMjZsU1ZOc0RuSThQSnhMUlNxZjFHUGJzdmRsclJqSUpoWkcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTQwMTUxOCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPNlgifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Emmanuel",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263784868165 ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'online',
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
