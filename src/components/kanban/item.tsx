import { Grip } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DragType, Task } from '@app/lib/types';
import { cn } from '@app/lib/utils';
import { KanbanItemDialog } from './item-dialog';

type KanbanItemProps = {
  task: Task;
};

export const KanbanItem: React.FC<KanbanItemProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: DragType.Task,
      task,
    },
  });

  return (
    <div
      className={cn(
        'mx-2 flex cursor-default items-center justify-between rounded border bg-white p-4',
        isDragging && 'z-10 opacity-50',
      )}
      {...attributes}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
    >
      <span>{task.title}</span>
      <div className='flex gap-2'>
        <KanbanItemDialog task={task} />
        <Grip className='h-4 w-4 cursor-grab' {...listeners} />
      </div>
    </div>
  );
};
