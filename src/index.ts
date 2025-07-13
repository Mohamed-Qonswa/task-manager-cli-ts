#!/usr/bin/env node

import { Command } from 'commander';
import { TaskCommands } from './commands';
import { Priority } from './types';

const program = new Command();
const taskCommands = new TaskCommands();

program
  .name('task-cli')
  .description('A powerful CLI app for managing tasks with priorities, due dates, and categories')
  .version('1.0.0');

// Add command with enhanced options
program
  .command('add <title> [description]')
  .description('Add a new task')
  .option('-p, --priority <priority>', 'Set task priority (low, medium, high)', 'medium')
  .option('-d, --due <date>', 'Set due date (YYYY-MM-DD format)')
  .option('-c, --category <category>', 'Set task category')
  .action((title: string, description?: string, options?: any) => {
    const priority = options?.priority as Priority || 'medium';
    if (!['low', 'medium', 'high'].includes(priority)) {
      console.error('❌ Invalid priority. Use: low, medium, or high');
      return;
    }
    taskCommands.add(title, description, priority, options?.due, options?.category);
  });

// List command
program
  .command('list')
  .description('List all tasks')
  .action(() => {
    taskCommands.list();
  });

// Search command
program
  .command('search <query>')
  .description('Search tasks by title, description, or category')
  .action((query: string) => {
    taskCommands.search(query);
  });

// Filter command
program
  .command('filter <type> <value>')
  .description('Filter tasks by status, priority, or category')
  .action((type: string, value: string) => {
    taskCommands.filter(type, value);
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