import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { nanoid } from 'nanoid';
import {
  DndContext,
  useSensors,
  PointerSensor,
  useSensor,
  closestCorners,
  DragMoveEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import { DragType, type Board, type Task } from '@app/lib/types';
import { Button, ScrollArea, ScrollBar } from '@app/components/ui';
import { KanbanLane } from './lane';

export const KanbanBoard = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const handleDragMove = ({ active, over }: DragMoveEvent) => {
    if (
      active.data.current?.type === DragType.Board &&
      over?.data.current?.type === DragType.Board &&
      active.id !== over.id
    ) {
      setBoards(
        arrayMove(
          boards,
          boards.findIndex((b) => b.id === active.id),
          boards.findIndex((b) => b.id === over.id),
        ),
      );
    } else if (active.data.current?.type === DragType.Task) {
      if (over?.data.current?.type === DragType.Task && active.id !== over.id) {
        setTasks(
          arrayMove(
            tasks,
            tasks.findIndex((t) => t.id === active.id),
            tasks.findIndex((t) => t.id === over.id),
          ),
        );
      } else if (
        over?.data.current?.type === DragType.Board &&
        active.data.current?.boardId !== over.id
      ) {
        console.log(active.data, over.data);
        setTasks(
          tasks.map((t) =>
            t.id === active.id ? { ...t, boardId: over.id } : t,
          ),
        );
      }
    }
  };

  return (
    <>
      <div className='container py-4'>
        <Button
          onClick={() =>
            setBoards([...boards, { id: nanoid(), title: 'Untitled Board' }])
          }
        >
          <PlusCircle className='mr-4 h-4 w-4' />
          Add board
        </Button>
        <ScrollArea>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragMove={handleDragMove}
            autoScroll={false}
          >
            <div className='flex gap-4 pt-4'>
              <SortableContext items={boards.map((b) => b.id)}>
                {boards.map((b) => (
                  <KanbanLane
                    key={b.id}
                    board={b}
                    tasks={tasks.filter((t) => t.boardId === b.id)}
                    onAddTask={() =>
                      setTasks([
                        ...tasks,
                        { id: nanoid(), title: 'Untitled Task', boardId: b.id },
                      ])
                    }
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </>
  );
};
