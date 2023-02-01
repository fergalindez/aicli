import chalk from 'chalk';

const menus = {
    main: `
${chalk.greenBright.bold('aicli [command] <options>')}
  ${chalk.yellowBright.bold(
      'setup'
  )} .......................... you have to add your openai credentials
  ${chalk.yellowBright.bold('ask')} ............................ generate, create or complete a text
  ${chalk.yellowBright.bold(
      'draw'
  )} ........................... draw anything you have in mind from a simple line
`
};

export async function help(args) {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main);
}