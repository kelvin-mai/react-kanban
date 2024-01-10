import { useState } from 'react';
import { createPortal } from 'react-dom';
import { PlusCircle } from 'lucide-react';
import {
  DndContext,
  useSensors,
  PointerSensor,
  useSensor,
  closestCorners,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { DragData, DragType } from '@app/lib/types';
import { Button, ScrollArea, ScrollBar } from '@app/components/ui';
import { useKanbanActions, useKanbanStore } from '@app/store/kanban';
import { KanbanLane } from './lane';
import { KanbanItem } from './item';

export const KanbanBoard = () => {
  const [activeDrag, setActiveDrag] = useState<DragData | null>(null);
  const { boards } = useKanbanStore();
  const { createBoard, moveBoard, moveTask, taskToBoard } = useKanbanActions();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveDrag(active.data.current as DragData);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (
      active.data.current?.type === DragType.Board &&
      over?.data.current?.type === DragType.Board &&
      active.id !== over.id
    ) {
      moveBoard(active.id, over.id);
    } else if (active.data.current?.type === DragType.Task) {
      if (
        over?.data.current?.type === DragType.Board &&
        active.data.current?.task.boardId !== over.data.current.board.id
      ) {
        taskToBoard(active.id, over.id);
      } else if (over?.data.current?.type === DragType.Task) {
        if (
          active.data.current?.task.boardId !== over.data.current.task.boardId
        ) {
          taskToBoard(active.id, over.data.current.task.boardId);
        } else if (active.id !== over.id) {
          moveTask(active.id, over.id);
        }
      }
    }
    setActiveDrag(null);
  };

  const ActiveItem: React.FC<{ activeDrag: DragData | null }> = ({
    activeDrag,
  }) => {
    switch (activeDrag?.type) {
      case DragType.Board:
        return <KanbanLane board={activeDrag.board} />;
      case DragType.Task:
        return <KanbanItem task={activeDrag.task} />;
      default:
        return null;
    }
  };

  return (
    <div className='container py-4'>
      <Button onClick={createBoard}>
        <PlusCircle className='mr-4 h-4 w-4' />
        Add board
      </Button>
      <ScrollArea>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveDrag(null)}
          autoScroll={false}
        >
          <div className='flex gap-4 pt-4'>
            <SortableContext items={boards.map((b) => b.id)}>
              {boards.map((b) => (
                <KanbanLane key={b.id} board={b} />
              ))}
            </SortableContext>
          </div>
          {createPortal(
            <DragOverlay
              dropAnimation={{
                duration: 500,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
              }}
            >
              <ActiveItem activeDrag={activeDrag} />
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};
