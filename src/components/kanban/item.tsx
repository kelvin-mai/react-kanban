import { Grip } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DragType, Task } from '@app/lib/types';
import { cn } from '@app/lib/utils';

export type KanbanItemProps = {
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
        'mx-2 flex items-center justify-between rounded border bg-white p-4',
        isDragging && 'z-10 opacity-50',
      )}
      {...attributes}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
    >
      {task.title}
      <Grip className='h-4 w-4 cursor-grab' {...listeners} />
    </div>
  );
};
