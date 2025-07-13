import * as fs from 'fs';
import * as path from 'path';
import { Task, TaskStorage, Priority } from '../types';

export class TaskService {
  private readonly filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath || path.join(process.cwd(), 'tasks.json');
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!fs.existsSync(this.filePath)) {
      const initialStorage: TaskStorage = { tasks: [] };
      fs.writeFileSync(this.filePath, JSON.stringify(initialStorage, null, 2));
    }
  }

  private readStorage(): TaskStorage {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private writeStorage(storage: TaskStorage): void {
    fs.writeFileSync(this.filePath, JSON.stringify(storage, null, 2));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  addTask(title: string, description?: string, priority: Priority = 'medium', dueDate?: Date, category?: string): Task {
    const storage = this.readStorage();
    const newTask: Task = {
      id: this.generateId(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      category,
      createdAt: new Date(),
    };
    
    storage.tasks.push(newTask);
    this.writeStorage(storage);
    return newTask;
  }

  getAllTasks(): Task[] {
    const storage = this.readStorage();
    return storage.tasks.sort((a, b) => {
      // Sort by priority (high -> medium -> low), then by due date, then by creation date
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (a.priority !== b.priority) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      // If priorities are equal, sort by due date (earliest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      
      // Finally sort by creation date
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }

  getTaskById(id: string): Task | undefined {
    const storage = this.readStorage();
    return storage.tasks.find(task => task.id === id);
  }

  completeTask(id: string): Task | null {
    const storage = this.readStorage();
    const taskIndex = storage.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }
    
    storage.tasks[taskIndex].completed = true;
    storage.tasks[taskIndex].completedAt = new Date();
    this.writeStorage(storage);
    return storage.tasks[taskIndex];
  }

  deleteTask(id: string): boolean {
    const storage = this.readStorage();
    const initialLength = storage.tasks.length;
    storage.tasks = storage.tasks.filter(task => task.id !== id);
    
    if (storage.tasks.length < initialLength) {
      this.writeStorage(storage);
      return true;
    }
    
    return false;
  }

  searchTasks(query: string): Task[] {
    const storage = this.readStorage();
    const lowercaseQuery = query.toLowerCase();
    return storage.tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) || 
      (task.description && task.description.toLowerCase().includes(lowercaseQuery)) ||
      (task.category && task.category.toLowerCase().includes(lowercaseQuery))
    );
  }

  filterTasks(filter: { completed?: boolean; priority?: Priority; category?: string }): Task[] {
    const storage = this.readStorage();
    return storage.tasks.filter(task => {
      if (filter.completed !== undefined && task.completed !== filter.completed) return false;
      if (filter.priority && task.priority !== filter.priority) return false;
      if (filter.category && task.category !== filter.category) return false;
      return true;
    });
  }
} 