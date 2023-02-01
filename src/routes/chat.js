import { Configuration, OpenAIApi } from 'openai';
import chalk from 'chalk';
import path from 'path';
import readline from 'readline';

const configPath = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.aicli',
  'config.json'
);

export async function ask(args) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', async (prompt) => {
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

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.8,
      max_tokens: 3000,
    });

    const text = response.data.choices[0].text;
    console.log(chalk.greenBright(text));
  });
}
