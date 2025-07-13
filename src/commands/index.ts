import { TaskService } from '../services/taskService';
import { Task, Priority } from '../types';

export class TaskCommands {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  add(title: string, description?: string, priority: Priority = 'medium', dueDateStr?: string, category?: string): void {
    let dueDate: Date | undefined;
    if (dueDateStr) {
      dueDate = new Date(dueDateStr);
      if (isNaN(dueDate.getTime())) {
        console.error('❌ Invalid due date format. Please use YYYY-MM-DD format.');
        return;
      }
    }

    const task = this.taskService.addTask(title, description, priority, dueDate, category);
    console.log('✅ Task added successfully!');
    console.log(`ID: ${task.id}`);
    console.log(`Title: ${task.title}`);
    if (task.description) {
      console.log(`Description: ${task.description}`);
    }
    console.log(`Priority: ${this.getPriorityDisplay(task.priority)}`);
    if (task.dueDate) {
      console.log(`Due Date: ${new Date(task.dueDate).toLocaleDateString()}`);
    }
    if (task.category) {
      console.log(`Category: ${task.category}`);
    }
  }

  list(): void {
    const tasks = this.taskService.getAllTasks();
    this.displayTasks(tasks);
  }

  search(query: string): void {
    const tasks = this.taskService.searchTasks(query);
    if (tasks.length === 0) {
      console.log(`🔍 No tasks found matching "${query}"`);
      return;
    }
    console.log(`🔍 Search results for "${query}":`);
    this.displayTasks(tasks);
  }

  filter(filterType: string, filterValue: string): void {
    let filter: { completed?: boolean; priority?: Priority; category?: string } = {};
    
    switch (filterType) {
      case 'status':
        filter.completed = filterValue === 'completed';
        break;
      case 'priority':
        if (['low', 'medium', 'high'].includes(filterValue)) {
          filter.priority = filterValue as Priority;
        } else {
          console.error('❌ Invalid priority. Use: low, medium, or high');
          return;
        }
        break;
      case 'category':
        filter.category = filterValue;
        break;
      default:
        console.error('❌ Invalid filter type. Use: status, priority, or category');
        return;
    }

    const tasks = this.taskService.filterTasks(filter);
    if (tasks.length === 0) {
      console.log(`📋 No tasks found with ${filterType}: ${filterValue}`);
      return;
    }
    console.log(`📋 Tasks filtered by ${filterType}: ${filterValue}`);
    this.displayTasks(tasks);
  }

  private displayTasks(tasks: Task[]): void {
    if (tasks.length === 0) {
      console.log('📋 No tasks found. Add some tasks to get started!');
      return;
    }

    console.log('\n📋 Your Tasks:\n');
    console.log('─'.repeat(80));
    
    tasks.forEach((task) => {
      const status = task.completed ? '✓' : '○';
      const statusColor = task.completed ? '\x1b[32m' : '\x1b[33m'; // Green for completed, yellow for pending
      const priorityDisplay = this.getPriorityDisplay(task.priority);
      const resetColor = '\x1b[0m';
      
      console.log(`${statusColor}${status}${resetColor} [${task.id}] ${task.title} ${priorityDisplay}`);
      
      if (task.description) {
        console.log(`  └─ ${task.description}`);
      }
      
      if (task.category) {
        console.log(`  └─ 🏷️  Category: ${task.category}`);
      }
      
      const createdDate = new Date(task.createdAt).toLocaleDateString();
      console.log(`  └─ 📅 Created: ${createdDate}`);
      
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const isOverdue = !task.completed && dueDate < new Date();
        const dueDateStr = dueDate.toLocaleDateString();
        const dueDateColor = isOverdue ? '\x1b[31m' : '\x1b[36m'; // Red for overdue, cyan for normal
        console.log(`  └─ ${dueDateColor}⏰ Due: ${dueDateStr}${isOverdue ? ' (OVERDUE)' : ''}${resetColor}`);
      }
      
      if (task.completed && task.completedAt) {
        const completedDate = new Date(task.completedAt).toLocaleDateString();
        console.log(`  └─ ✅ Completed: ${completedDate}`);
      }
      
      console.log('─'.repeat(80));
    });

    const completedCount = tasks.filter(t => t.completed).length;
    const overdueCount = tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length;
    
    console.log(`\n📊 Total: ${tasks.length} | Completed: ${completedCount} | Pending: ${tasks.length - completedCount}`);
    if (overdueCount > 0) {
      console.log(`⚠️  Overdue: ${overdueCount}`);
    }
  }

  private getPriorityDisplay(priority: Priority): string {
    switch (priority) {
      case 'high':
        return '\x1b[31m🔥 HIGH\x1b[0m'; // Red
      case 'medium':
        return '\x1b[33m⚡ MEDIUM\x1b[0m'; // Yellow
      case 'low':
        return '\x1b[32m🌱 LOW\x1b[0m'; // Green
      default:
        return priority;
    }
  }

  complete(id: string): void {
    const task = this.taskService.completeTask(id);
    
    if (!task) {
      console.error(`❌ Task with ID "${id}" not found.`);
      return;
    }
    
    console.log('✅ Task marked as completed!');
    console.log(`Title: ${task.title}`);
  }

  delete(id: string): void {
    const task = this.taskService.getTaskById(id);
    
    if (!task) {
      console.error(`❌ Task with ID "${id}" not found.`);
      return;
    }
    
    const deleted = this.taskService.deleteTask(id);
    
    if (deleted) {
      console.log('🗑️  Task deleted successfully!');
      console.log(`Title: ${task.title}`);
    } else {
      console.error('❌ Failed to delete task.');
    }
  }
} 