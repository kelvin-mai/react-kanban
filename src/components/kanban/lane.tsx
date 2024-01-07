import { PlusCircle, Grip } from 'lucide-react';

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

export type KanbanLaneProps = {
  title?: string;
};

export const KanbanLane: React.FC<KanbanLaneProps> = ({ title }) => {
  return (
    <Card className='w-[400px]'>
      <CardHeader className='flex-row items-center justify-between'>
        <CardTitle>{title || 'Board'}</CardTitle>
        <Grip className='h-6 w-6 cursor-grab' />
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[50vh]'>
          <div className='flex flex-col gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <div className='mx-2 flex items-center justify-between rounded border p-4'>
                hello
                <Grip className='h-4 w-4 cursor-grab' />
              </div>
            ))}
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button>
          <PlusCircle className='mr-4 h-4 w-4' />
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};
