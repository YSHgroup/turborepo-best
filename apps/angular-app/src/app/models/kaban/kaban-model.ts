export interface SubtaskModel {
  id: number;
  content: string;
}

export interface TaskModel {
  id: number;
  name: string;
  description: string;
  color: string;
  subtasks: SubtaskModel[];
}

export interface KabanBoardModel {
  id: number;
  name: string;
  tasks: TaskModel[];
}
