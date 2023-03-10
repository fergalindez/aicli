import { Configuration, OpenAIApi } from 'openai';
import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';
import { readFileSync, unlinkSync } from 'fs';

const configPath = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.aicli',
  'config.json'
);

export async function ask(args) {
  let config;
  try {
    config = require(configPath);
  } catch (e) {
    console.log(
      chalk.red("No API key found. Use 'aicli setup' to configure the API key.")
    );
    return;
  }

  const configuration = new Configuration(config);
  const openai = new OpenAIApi(configuration);

  const openaiRequest = async (prompt) => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.8,
      max_tokens: 3000,
    });

    const text = response.data.choices[0].text;

    const menus = {
      main: `${chalk.greenBright(text)}`,
    };

    const subCmd = args._[0] === 'ask' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main);
  };
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'completition',
        message: chalk.cyanBright(`Enter you question or instruction:`),
      },
    ])
    .then(async (templateCompletition) => {
      if (args.code || args.c) {
        const dbFile = 'input.txt';
        const editor = process.env.EDITOR || 'vi';
        const editorSpawn = require('child_process').spawn(editor, [dbFile], {
          stdio: 'inherit',
          detached: true,
        });

        editorSpawn.on('exit', async function (data) {
          const fileContent = readFileSync(dbFile, 'utf-8');
          unlinkSync(dbFile);

          openaiRequest(`${templateCompletition.completition}: ${fileContent}`);
        });
      } else {
        openaiRequest(templateCompletition.completition);
      }
    });
}
