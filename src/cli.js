#!/usr/bin/env node
import minimist from 'minimist';

import { ask } from './routes/ask';
import { chat } from './routes/chat';
import { draw } from './routes/draw';
import { help } from './routes/help';
import { setup } from './routes/setup';
import { version } from './routes/version';

export async function cli(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || 'help';

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'version':
      version(args);
      break;

    case 'ask':
      ask(args);
      break;

    case 'chat':
      chat(args);
      break;

    case 'draw':
      draw(args);
      break;

    case 'setup':
      setup(args);
      break;

    case 'help':
      help(args);
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}
