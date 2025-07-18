export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  category?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface TaskStorage {
  tasks: Task[];
} 