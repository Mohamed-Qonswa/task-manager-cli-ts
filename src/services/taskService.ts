import * as fs from 'fs';
import * as path from 'path';
import { Task, TaskStorage } from '../types';

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

  addTask(title: string, description?: string): Task {
    const storage = this.readStorage();
    const newTask: Task = {
      id: this.generateId(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };
    
    storage.tasks.push(newTask);
    this.writeStorage(storage);
    return newTask;
  }

  getAllTasks(): Task[] {
    const storage = this.readStorage();
    return storage.tasks;
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
} 