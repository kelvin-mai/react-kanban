import { Board, Task } from '@app/lib/types';
import { nanoid } from 'nanoid';

export type KanbanState = {
  boards: Board[];
  tasks: Task[];
};

const todoId = nanoid();
const progressId = nanoid();
const doneId = nanoid();

export const initialState: KanbanState = {
  boards: [
    { id: todoId, title: 'To Do' },
    { id: progressId, title: 'In Progress' },
    { id: doneId, title: 'Done' },
  ],
  tasks: [
    {
      id: nanoid(),
      boardId: todoId,
      title: 'Read a book',
      description: 'any book really, just get back into the habit',
    },
    {
      id: nanoid(),
      boardId: todoId,
      title: 'Style website',
      description: 'update styles for website',
    },
    {
      id: nanoid(),
      boardId: progressId,
      title: 'Finish kanban board',
      description: 'Finish and style kanban board application',
    },
    {
      id: nanoid(),
      boardId: doneId,
      title: 'Add dark theme',
      description: 'Add dark theme to application',
    },
  ],
};
