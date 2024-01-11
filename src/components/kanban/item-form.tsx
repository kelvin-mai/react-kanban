import { useState } from 'react';

import {
  Input,
  Label,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
} from '@app/components/ui';
import { Task } from '@app/lib/types';
import { useKanbanActions, useKanbanStore } from '@app/store/kanban';

type KanbanItemFormProps = {
  task: Task;
  onClose(): void;
};

export const KanbanItemForm: React.FC<KanbanItemFormProps> = ({
  task,
  onClose,
}) => {
  const { boards } = useKanbanStore();
  const { updateTask, deleteTask } = useKanbanActions();
  const [value, setValue] = useState(task);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateTask(task.id, value);
        onClose();
      }}
    >
      <div className='mb-2 grid grid-cols-2 gap-2'>
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            value={value.title}
            onChange={(e) => setValue({ ...value, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor='board'>Board</Label>
          <Select
            value={value.boardId as string}
            onValueChange={(e) => setValue({ ...value, boardId: e })}
          >
            <SelectTrigger id='board'>
              <SelectValue placeholder='Select Board' />
            </SelectTrigger>
            <SelectContent>
              {boards.map((b) => (
                <SelectItem value={b.id as string}>{b.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Label htmlFor='description'>Description</Label>
      <Textarea
        id='description'
        value={value.description}
        onChange={(e) => setValue({ ...value, description: e.target.value })}
      />
      <div className='mt-4 grid grid-cols-2 gap-2'>
        <Button variant='destructive' onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  );
};
