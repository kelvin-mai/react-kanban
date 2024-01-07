import { Providers } from '@app/hooks/providers';
import { Navbar } from '@app/components/layout';
import { KanbanBoard } from '@app/components/kanban';

export function App() {
  return (
    <Providers>
      <Navbar />
      <main className='item-center flex justify-center'>
        <KanbanBoard />
      </main>
    </Providers>
  );
}
