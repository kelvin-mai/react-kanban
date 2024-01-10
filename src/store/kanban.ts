import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { Board, Task } from '@app/lib/types';

export type KanbanStore = {
  boards: Board[];
  tasks: Task[];
  derived: {
    getBoardTasks(boardId: UniqueIdentifier): Task[];
  };
  actions: {
    createBoard(): void;
    moveBoard(activeId: UniqueIdentifier, overId: UniqueIdentifier): void;
    createTask(boardId: UniqueIdentifier): void;
    moveTask(activeId: UniqueIdentifier, overId: UniqueIdentifier): void;
    taskToBoard(taskId: UniqueIdentifier, boardId: UniqueIdentifier): void;
  };
};

export const useKanbanStore = create<KanbanStore>((set, get) => ({
  boards: [],
  tasks: [],
  derived: {
    getBoardTasks: (boardId) =>
      get().tasks.filter((t) => t.boardId === boardId),
  },
  actions: {
    createBoard: () =>
      set((state) => ({
        ...state,
        boards: [...state.boards, { id: nanoid(), title: 'Untitled Board' }],
      })),
    moveBoard: (activeId, overId) =>
      set((state) => ({
        ...state,
        boards: arrayMove(
          state.boards,
          state.boards.findIndex((b) => b.id === activeId),
          state.boards.findIndex((b) => b.id === overId),
        ),
      })),
    createTask: (boardId) =>
      set((state) => ({
        ...state,
        tasks: [
          ...state.tasks,
          { id: nanoid(), title: 'Untitled Task', boardId },
        ],
      })),
    moveTask: (activeId, overId) =>
      set((state) => ({
        ...state,
        tasks: arrayMove(
          state.tasks,
          state.tasks.findIndex((t) => t.id === activeId),
          state.tasks.findIndex((t) => t.id === overId),
        ),
      })),
    taskToBoard: (taskId, boardId) =>
      set((state) => ({
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, boardId } : t,
        ),
      })),
  },
}));

export const useKanbanActions = () => useKanbanStore((state) => state.actions);
export const useKanbanDerived = () => useKanbanStore((state) => state.derived);
