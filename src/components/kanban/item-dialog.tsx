import { useState } from 'react';
import { BookOpen, FilePen } from 'lucide-react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Button,
} from '@app/components/ui';
import { Task } from '@app/lib/types';
import { KanbanItemForm } from './item-form';

type KanbanItemDialogProps = {
  task: Task;
};

export const KanbanItemDialog: React.FC<KanbanItemDialogProps> = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <BookOpen className='h-4 w-4' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>{task.description}</DialogDescription>
        </DialogHeader>
        {edit ? (
          <KanbanItemForm onClose={() => setEdit(false)} task={task} />
        ) : (
          <Button onClick={() => setEdit(true)}>
            Edit Task
            <FilePen className='ml-2 h-4 w-4' />
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
