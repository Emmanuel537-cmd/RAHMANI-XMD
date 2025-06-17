




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVXbkFCclNnUXA1WFVYSnZwQTAwMTVYRXNMaDIzRU1YRm5MTXF3a1Zubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0VaVE1hbDNEWnFUeFZqYzBvMU1KMUwxUHUwTm1nTk13dTdORTlTR3ZqTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRk9kNml4c0lzYXBOdzBBekloQkUvbWlHVUdMMWZmbFd2OE1DSEZ1eVVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKeVYvWU9wZ2ZTNEVhc0xaV0I0VWMzQnJYVWlOQWhUQkRqVHVPZzl1U1FJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndIdUZZVURqUkxMeHJ5SG9PM1FIdFphMjNsdm44c1Rrbkszc1RPaHM4M2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBSNUFscHlwUW5ZVXQ2bS9rVmVPVmVqZ1JkU2FOcUpOVyt6ZS9Db2c2VEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU95VjRzUS9IazRDeDBCR2VLRGY5L21xUXk1VGk1cnJWUXJtSzc3VFMyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUF4blVaazlnbVErUmFaTENrdkhIblFmaHk2T0dIRktnMlhOTHlIYTQzaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijd1S0RYWDl2dlBIWlNocDJLeUd1M2cwQlBkQ0tGbHlRQnNaMmhBWFQ5Y1FCNDZJZmZSK3lnSFQ0dnJoTkxSL0k3ZWVWV0xkSEUvRTkrUCtXZytFVEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDcsImFkdlNlY3JldEtleSI6IkVycFJ2TmFVQWlnMEJDRkZ2cllXV0haeFRrY1crL1A1ZDhRRmNOMDFuV0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg0ODY4MTY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdGOURGMjgwMEI3OEQyNTUzOTU1M0E1Q0U3QTdGODkwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDg5NTc4NjB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4NDg2ODE2NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5NjdDMkEzOTczMDgxQzFCMDVDREQ2RTlGRkRCRTM2RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4OTU3ODc1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJOUjJQN0RNNiIsIm1lIjp7ImlkIjoiMjYzNzg0ODY4MTY1OjM0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNFRS1KQVkiLCJsaWQiOiIzMzU1NzAxNTczNjMzNTozNEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXczJPSURFSXYxKzhFR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImJnZ1A5SVEvYnFWSlUyd09janc4bkV0RktwL1VZOXV5OTJXdEdNZ21Ga1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6Impwc1Y4bkNzdDZOSWNvNkkvVzlwQlZ0NWthUWdRa0t0ZkhzVGI1eVM5cjViUGdGMHJDN0Y1QTZadjV1WkZndFJMNFVLNG8xc3FwVENXclp2S0tSRUNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpWnhFMmdVQmVhMUZZQzNiNGJ4dmlTbGVsMjNaUHpJVzRrekZENHpLV1c3bVFIbmFHMGlCRW1JZ21mQ2RIKzlQdmRyVmk1MFNpTXZra2ZEcklvbGhDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NDg2ODE2NTozNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXNElEL1NFUDI2bFNWTnNEbkk4UEp4TFJTcWYxR1Bic3ZkbHJSaklKaFpHIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDg5NTc4NDksImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQU9kIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Emmanuel",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263784868165",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/lyna05.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
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
