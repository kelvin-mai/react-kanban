import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { Button, ScrollArea, ScrollBar } from '@app/components/ui';
import { KanbanLane } from './lane';

export const KanbanBoard = () => {
  const [lanes, setLanes] = useState<any[]>([]);
  return (
    <div className='container py-4'>
      <Button onClick={() => setLanes([...lanes, {}])}>
        <PlusCircle className='mr-4 h-4 w-4' />
        Add board
      </Button>

      <ScrollArea>
        <div className='flex gap-4 pt-4'>
          {lanes?.map((l, i) => <KanbanLane key={i} />)}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};
