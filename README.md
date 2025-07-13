# Task CLI - TypeScript Task Manager

A command-line interface (CLI) application built with TypeScript for managing tasks. Tasks are stored locally in a JSON file.

## Features

- ✨ Add tasks with title and optional description
- 📋 List all tasks with their completion status
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 💾 Persistent storage in local JSON file
- 🎨 Colorful console output with emojis

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode

Run commands using ts-node:

```bash
# Add a new task
node node_modules/ts-node/dist/bin.js src/index.ts add "Task title" "Optional description"

# List all tasks
node node_modules/ts-node/dist/bin.js src/index.ts list

# Mark a task as completed
node node_modules/ts-node/dist/bin.js src/index.ts complete <task-id>

# Delete a task
node node_modules/ts-node/dist/bin.js src/index.ts delete <task-id>
```

### Production Mode

Build the project and run compiled JavaScript:

```bash
# Build the project
npm run build

# Run commands
node dist/index.js add "Task title" "Optional description"
node dist/index.js list
node dist/index.js complete <task-id>
node dist/index.js delete <task-id>
```

## Project Structure

```
task-cli/
├── src/
│   ├── index.ts          # Main CLI entry point
│   ├── commands/         # Command implementations
│   │   └── index.ts      # TaskCommands class
│   ├── services/         # Business logic
│   │   └── taskService.ts # TaskService class
│   └── types/            # TypeScript type definitions
│       └── index.ts      # Task and TaskStorage interfaces
├── package.json
├── tsconfig.json
└── tasks.json            # Local task storage (created automatically)
```

## Commands

### Add a Task
```bash
add <title> [description]
```
- `title` (required): The task title
- `description` (optional): Additional task details

### List All Tasks
```bash
list
```
Shows all tasks with:
- Completion status (○ for pending, ✓ for completed)
- Task ID
- Title and description
- Creation date
- Completion date (if completed)
- Summary statistics

### Complete a Task
```bash
complete <id>
```
- `id` (required): The unique task identifier

### Delete a Task
```bash
delete <id>
```
- `id` (required): The unique task identifier

## Technologies Used

- **TypeScript**: For type-safe code
- **Commander.js**: For parsing command-line arguments
- **Node.js**: Runtime environment
- **File System (fs)**: For local JSON storage

## Development

### Scripts

- `npm start`: Run the CLI in development mode
- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Run the CLI with ts-node

### TypeScript Configuration

The project uses strict TypeScript settings for better type safety:
- Strict mode enabled
- ES2020 target
- CommonJS modules
- Source maps for debugging 