export interface SubtaskModel {
  _id: string;
  content: string;
}

export interface TaskModel {
  _id: string;
  name: string;
  description: string;
  color: string;
  subtasks?: SubtaskModel[];
}

export interface KanbanBoardModel {
  _id: string;
  name: string;
  tasks?: TaskModel[];
}
