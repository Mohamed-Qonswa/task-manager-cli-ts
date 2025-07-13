export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TaskStorage {
  tasks: Task[];
} 