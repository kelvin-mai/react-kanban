import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { KanbanState, initialState } from './state';
import { Task } from '@app/lib/types';

export type KanbanStore = KanbanState & {
  derived: {
    getBoardTasks(boardId: UniqueIdentifier): Task[];
  };
  actions: {
    createBoard(): void;
    moveBoard(activeId: UniqueIdentifier, overId: UniqueIdentifier): void;
    updateBoardTitle(boardId: UniqueIdentifier, title: string): void;
    deleteBoard(boardId: UniqueIdentifier): void;
    createTask(boardId: UniqueIdentifier): void;
    moveTask(activeId: UniqueIdentifier, overId: UniqueIdentifier): void;
    updateTask(taskid: UniqueIdentifier, task: Task): void;
    updateTaskBoardId(
      taskId: UniqueIdentifier,
      boardId: UniqueIdentifier,
    ): void;
    deleteTask(taskId: UniqueIdentifier): void;
  };
};

export const useKanbanStore = create<KanbanStore>((set, get) => ({
  ...initialState,
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
    updateBoardTitle: (boardId, title) =>
      set((state) => ({
        ...state,
        boards: state.boards.map((b) =>
          b.id === boardId ? { ...b, title } : b,
        ),
      })),
    deleteBoard: (boardId) =>
      set((state) => ({
        ...state,
        boards: state.boards.filter((b) => b.id !== boardId),
        tasks: state.tasks.filter((t) => t.boardId !== boardId),
      })),
    createTask: (boardId) =>
      set((state) => ({
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: nanoid(),
            title: 'Untitled Task',
            boardId,
            description: 'Enter description here...',
          },
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
    updateTask: (taskId, task) =>
      set((state) => ({
        ...state,
        tasks: state.tasks.map((t) => (t.id === taskId ? task : t)),
      })),
    updateTaskBoardId: (taskId, boardId) =>
      set((state) => ({
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, boardId } : t,
        ),
      })),
    deleteTask: (taskId) =>
      set((state) => ({
        ...state,
        tasks: state.tasks.filter((t) => t.id !== taskId),
      })),
  },
}));

export const useKanbanActions = () => useKanbanStore((state) => state.actions);
export const useKanbanDerived = () => useKanbanStore((state) => state.derived);
