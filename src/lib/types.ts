import { type UniqueIdentifier } from '@dnd-kit/core';

export type Board = {
  id: UniqueIdentifier;
  title: string;
};

export type Task = {
  id: UniqueIdentifier;
  boardId: UniqueIdentifier;
  title: string;
  description: string;
};

export enum DragType {
  Board = 'Board',
  Task = 'Task',
}

export type DragData =
  | {
      type: DragType.Board;
      board: Board;
    }
  | {
      type: DragType.Task;
      task: Task;
    };
