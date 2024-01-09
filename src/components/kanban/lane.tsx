import { PlusCircle, Grip } from 'lucide-react';
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
} from '@app/components/ui';
import { cn } from '@app/lib/utils';
import { Board, DragType, Task } from '@app/lib/types';
import { KanbanItem } from './item';

export type KanbanLaneProps = {
  board: Board;
  tasks: Task[];
  onAddTask: () => void;
};

export const KanbanLane: React.FC<KanbanLaneProps> = ({
  board,
  tasks,
  onAddTask,
}) => {
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
  return (
    <Card
      className={cn('min-w-[400px]', isDragging && 'z-10 opacity-50')}
      {...attributes}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
    >
      <CardHeader className='flex-row items-center justify-between'>
        <CardTitle>{board.title}</CardTitle>
        <Grip className='h-6 w-6 cursor-grab' {...listeners} />
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
      <CardFooter>
        <Button onClick={onAddTask}>
          <PlusCircle className='mr-4 h-4 w-4' />
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};
