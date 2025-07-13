import { TaskService } from '../services/taskService';
import { Task } from '../types';

export class TaskCommands {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  add(title: string, description?: string): void {
    const task = this.taskService.addTask(title, description);
    console.log('✅ Task added successfully!');
    console.log(`ID: ${task.id}`);
    console.log(`Title: ${task.title}`);
    if (task.description) {
      console.log(`Description: ${task.description}`);
    }
  }

  list(): void {
    const tasks = this.taskService.getAllTasks();
    
    if (tasks.length === 0) {
      console.log('📋 No tasks found. Add some tasks to get started!');
      return;
    }

    console.log('\n📋 Your Tasks:\n');
    console.log('─'.repeat(50));
    
    tasks.forEach((task) => {
      const status = task.completed ? '✓' : '○';
      const statusColor = task.completed ? '\x1b[32m' : '\x1b[33m'; // Green for completed, yellow for pending
      const resetColor = '\x1b[0m';
      
      console.log(`${statusColor}${status}${resetColor} [${task.id}] ${task.title}`);
      
      if (task.description) {
        console.log(`  └─ ${task.description}`);
      }
      
      const createdDate = new Date(task.createdAt).toLocaleDateString();
      console.log(`  └─ Created: ${createdDate}`);
      
      if (task.completed && task.completedAt) {
        const completedDate = new Date(task.completedAt).toLocaleDateString();
        console.log(`  └─ Completed: ${completedDate}`);
      }
      
      console.log('─'.repeat(50));
    });

    const completedCount = tasks.filter(t => t.completed).length;
    console.log(`\n📊 Total: ${tasks.length} | Completed: ${completedCount} | Pending: ${tasks.length - completedCount}`);
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