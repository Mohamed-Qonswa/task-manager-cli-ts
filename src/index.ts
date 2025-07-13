#!/usr/bin/env node

import { Command } from 'commander';
import { TaskCommands } from './commands';

const program = new Command();
const taskCommands = new TaskCommands();

program
  .name('task-cli')
  .description('A simple CLI app for managing tasks')
  .version('1.0.0');

// Add command
program
  .command('add <title> [description]')
  .description('Add a new task')
  .action((title: string, description?: string) => {
    taskCommands.add(title, description);
  });

// List command
program
  .command('list')
  .description('List all tasks')
  .action(() => {
    taskCommands.list();
  });

// Complete command
program
  .command('complete <id>')
  .description('Mark a task as completed')
  .action((id: string) => {
    taskCommands.complete(id);
  });

// Delete command
program
  .command('delete <id>')
  .description('Delete a task')
  .action((id: string) => {
    taskCommands.delete(id);
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
} 