const { exec } = require('child_process');
require('dotenv').config()

const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const port = process.env.POSTGRES_PORT
const database = (process.env.NODE_ENV !== 'test' ? process.env.POSTGRES_DATABASE : process.env.POSTGRES_DATABASE_TEST)
const url = `postgres://${username}:${password}@localhost:${port}/${database}`

// Perintah-perintah yang ingin dijalankan
const commands = [
  `set NODE_ENV=test && npx sequelize-cli db:migrate:undo:all --url "${url}"`,
  `set NODE_ENV=test && npx sequelize-cli db:migrate --url "${url}"`,
  `set NODE_ENV=test && npx sequelize-cli db:seed:all --url "${url}"`
];


// Fungsi untuk menjalankan perintah
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Error: ${stderr}`);
        return;
      }
      resolve(`Output: ${stdout}`);
    });
  });
}

// Menjalankan perintah-perintah secara berurutan
async function runCommandsSequentially() {
  for (const command of commands) {
    try {
      const result = await runCommand(command);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

runCommandsSequentially();