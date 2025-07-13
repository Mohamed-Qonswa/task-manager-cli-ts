# Task CLI - TypeScript Task Manager

A powerful command-line interface (CLI) application built with TypeScript for managing tasks with advanced features like priorities, due dates, categories, and search functionality. Tasks are stored locally in a JSON file.

## ✨ Features

### Core Features
- 📝 Add tasks with title and optional description
- 📋 List all tasks with their completion status
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 💾 Persistent storage in local JSON file

### Enhanced Features
- 🔥 **Priority Levels**: High, Medium, Low with color coding
- 📅 **Due Dates**: Set and track task deadlines with overdue indicators
- 🏷️ **Categories**: Organize tasks by category (work, personal, learning, etc.)
- 🔍 **Search**: Find tasks by title, description, or category
- 📊 **Filtering**: Filter tasks by status, priority, or category
- 🎨 **Smart Sorting**: Automatic sorting by priority, due date, and creation time
- 🎯 **Visual Indicators**: Color-coded priorities and overdue warnings
- 📈 **Statistics**: Task completion metrics and overdue counts

## 🚀 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## 📖 Usage

### Basic Commands

```bash
# Add a simple task
node node_modules/ts-node/dist/bin.js src/index.ts add "Buy milk"

# Add a task with description
node node_modules/ts-node/dist/bin.js src/index.ts add "Complete project" "Finish the quarterly report"

# List all tasks
node node_modules/ts-node/dist/bin.js src/index.ts list

# Mark a task as completed
node node_modules/ts-node/dist/bin.js src/index.ts complete <task-id>

# Delete a task
node node_modules/ts-node/dist/bin.js src/index.ts delete <task-id>
```

### Enhanced Commands

```bash
# Add task with priority, due date, and category
node node_modules/ts-node/dist/bin.js src/index.ts add "Review code" "Review PR #123" --priority high --due 2025-07-20 --category work

# Search for tasks
node node_modules/ts-node/dist/bin.js src/index.ts search "meeting"

# Filter tasks by priority
node node_modules/ts-node/dist/bin.js src/index.ts filter priority high

# Filter tasks by category
node node_modules/ts-node/dist/bin.js src/index.ts filter category work

# Filter tasks by status
node node_modules/ts-node/dist/bin.js src/index.ts filter status completed
```

## 🎯 Command Reference

### Add Task
```bash
add <title> [description] [options]
```

**Options:**
- `-p, --priority <priority>`: Set priority (low, medium, high) - default: medium
- `-d, --due <date>`: Set due date (YYYY-MM-DD format)
- `-c, --category <category>`: Set task category

**Examples:**
```bash
# High priority work task with due date
add "Deploy to production" "Deploy v2.0 to production server" --priority high --due 2025-07-15 --category work

# Personal task with medium priority
add "Doctor appointment" --priority medium --due 2025-07-18 --category personal
```

### List Tasks
```bash
list
```
Shows all tasks sorted by:
1. Priority (High → Medium → Low)
2. Due date (earliest first)
3. Creation date

### Search Tasks
```bash
search <query>
```
Searches in task title, description, and category.

### Filter Tasks
```bash
filter <type> <value>
```

**Filter Types:**
- `status`: `completed` or `pending`
- `priority`: `high`, `medium`, or `low`
- `category`: any category name

### Complete Task
```bash
complete <task-id>
```

### Delete Task
```bash
delete <task-id>
```

## 🎨 Visual Features

### Priority Indicators
- 🔥 **HIGH** (Red) - Urgent tasks
- ⚡ **MEDIUM** (Yellow) - Normal tasks  
- 🌱 **LOW** (Green) - Low priority tasks

### Due Date Warnings
- 🔴 **OVERDUE** - Past due date (red)
- 🔵 **UPCOMING** - Future due date (cyan)

### Category Labels
- 🏷️ **Category tags** for better organization

### Task Statistics
- 📊 Total, Completed, Pending, and Overdue counts

## 📁 Project Structure

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
├── tasks.json            # Local task storage (created automatically)
├── README.md
└── GUI_ROADMAP.md        # Future GUI development plans
```

## 🛠️ Technologies Used

- **TypeScript**: For type-safe code and better developer experience
- **Commander.js**: For parsing command-line arguments and options
- **Node.js**: Runtime environment
- **File System (fs)**: For local JSON storage

## 🔮 Future Development

### GUI Application
A comprehensive GUI application is planned with:
- 📱 **Electron Desktop App** with React
- 🎨 **Modern UI/UX** with drag-and-drop
- 📊 **Visual Analytics** and reporting
- 🔄 **Real-time Sync** capabilities

See [`GUI_ROADMAP.md`](./GUI_ROADMAP.md) for detailed development plans.

### Additional CLI Features
- 🔄 **Recurring Tasks**: Repeat tasks on schedule
- ⏱️ **Time Tracking**: Log time spent on tasks
- 📎 **File Attachments**: Link files to tasks
- 🔔 **Notifications**: Desktop reminders
- 📤 **Export/Import**: CSV, JSON, and other formats

## 🧪 Development

### Scripts
- `npm start`: Run the CLI in development mode
- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Run the CLI with ts-node

### Testing
Run the enhanced test script to see all features in action:
```bash
node test-enhanced-cli.js
```

### TypeScript Configuration
The project uses strict TypeScript settings:
- Strict mode enabled
- ES2020 target
- CommonJS modules
- Source maps for debugging

## 📊 Example Output

```
📋 Your Tasks:

────────────────────────────────────────────────────────────────────────────────
○ [abc123] Deploy to production 🔥 HIGH
  └─ Deploy v2.0 to production server
  └─ 🏷️  Category: work
  └─ 📅 Created: 7/13/2025
  └─ ⏰ Due: 7/15/2025
────────────────────────────────────────────────────────────────────────────────
○ [def456] Doctor appointment ⚡ MEDIUM
  └─ 🏷️  Category: personal
  └─ 📅 Created: 7/13/2025
  └─ ⏰ Due: 7/18/2025
────────────────────────────────────────────────────────────────────────────────

📊 Total: 2 | Completed: 0 | Pending: 2
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ using TypeScript and Node.js* 