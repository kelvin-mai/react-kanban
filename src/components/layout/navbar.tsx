import viteLogo from '@app/assets/vite.svg';
import reactLogo from '@app/assets/react.svg';
import { useTheme } from '@app/hooks/use-theme';
import { Button } from '@app/components/ui';

export const Navbar = () => {
  const { toggleTheme } = useTheme();
  return (
    <nav className='container flex items-center justify-between py-2'>
      <div className='flex items-center gap-2'>
        <img src={viteLogo} alt='Vite logo' />
        <h2 className='text-lg font-semibold'>React Kanban</h2>
        <img src={reactLogo} alt='React logo' />
      </div>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </nav>
  );
};
