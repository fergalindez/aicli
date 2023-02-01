import { Configuration, OpenAIApi } from 'openai';
import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';

const configPath = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.aicli',
  'config.json'
);

export async function draw(args) {
  let config;
  try {
    config = require(configPath);
  } catch (e) {
    console.log(
      chalk.red(
        "No API key found. Use 'aicli setup' to configure the API key."
      )
    );
    return;
  }

  const configuration = new Configuration(config);

  const openai = new OpenAIApi(configuration);

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'question',
        message: chalk.cyanBright(`What you want to draw?`),
      },
    ])
    .then(async (template) => {
      const responseImage = await openai.createImage({
        prompt: template.question,
        n: 1,
        size: '512x512',
      });

      const url = responseImage.data.data[0].url;

      const menus = {
        main: `${chalk.greenBright(url)}`,
      };

      const subCmd = args._[0] === 'ask' ? args._[1] : args._[0];
      console.log(menus[subCmd] || menus.main);
    });
}
