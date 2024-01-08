import viteLogo from '@app/assets/vite.svg';
import reactLogo from '@app/assets/react.svg';
import { ThemeSelect } from '@app/components/ui';

export const Navbar = () => (
  <nav className='bg-slate-100 py-4 drop-shadow-md'>
    <div className='container flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <img src={viteLogo} alt='Vite logo' />
        <h2 className='text-lg font-semibold text-slate-800'>React Kanban</h2>
        <img src={reactLogo} alt='React logo' />
      </div>
      <ThemeSelect />
    </div>
  </nav>
);
