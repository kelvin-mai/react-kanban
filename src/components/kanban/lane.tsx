import { PlusCircle, Grip, Trash, PenBox } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable, SortableContext } from '@dnd-kit/sortable';

import {
  Card,
  CardContent,
  CardFooter,
  Button,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
  Input,
} from '@app/components/ui';
import { cn } from '@app/lib/utils';
import { Board, DragType } from '@app/lib/types';
import { useKanbanActions, useKanbanDerived } from '@app/store/kanban';
import { KanbanItem } from './item';
import { useState } from 'react';

type KanbanLaneProps = {
  board: Board;
};

export const KanbanLane: React.FC<KanbanLaneProps> = ({ board }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: {
      type: DragType.Board,
      board,
    },
  });
  const { getBoardTasks } = useKanbanDerived();
  const { createTask, updateBoardTitle, deleteBoard } = useKanbanActions();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(board.title);
  const tasks = getBoardTasks(board.id);

  const submitEdit = () => {
    updateBoardTitle(board.id, value);
    setValue(value);
    setEdit(false);
  };

  const cancelEdit = () => {
    setValue(board.title);
    setEdit(false);
  };

  return (
    <Card
      className={cn('min-w-[400px]', isDragging && 'z-10 opacity-50')}
      {...attributes}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
    >
      <CardHeader className='flex-row items-center justify-between'>
        {edit ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={cancelEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitEdit();
              }
              if (e.key === 'Escape') {
                cancelEdit();
              }
            }}
            autoFocus
          />
        ) : (
          <>
            <CardTitle>{board.title}</CardTitle>
            <div className='flex gap-2'>
              <PenBox
                className='h-6 w-6 cursor-pointer'
                onClick={() => setEdit(true)}
              />
              <Grip className='h-6 w-6 cursor-grab' {...listeners} />
            </div>
          </>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[50vh]'>
          <div className='flex flex-col gap-4'>
            <SortableContext items={tasks.map((t) => t.id)}>
              {tasks.map((t) => (
                <KanbanItem key={t.id} task={t} />
              ))}
            </SortableContext>
          </div>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='destructive' onClick={() => deleteBoard(board.id)}>
          <Trash className='mr-2 h-4 w-4' />
          Delete Board
        </Button>
        <Button onClick={() => createTask(board.id)}>
          <PlusCircle className='mr-2 h-4 w-4' />
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};
