import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

const configPath = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.aicli',
  'config.json'
);

export async function setup() {
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: chalk.cyanBright.bold(`Please enter your API Key:`),
      },
    ])
    .then((template) => {
      const config = { apiKey: template.apiKey };
      fs.mkdir(path.dirname(configPath), { recursive: true }, function (err) {
        fs.writeFileSync(configPath, JSON.stringify(config));
      });

      console.log(chalk.green('API key seve successfuly in ~/.aicli'));
    });
}
