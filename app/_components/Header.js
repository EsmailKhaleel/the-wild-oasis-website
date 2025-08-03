import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import MobileNav from './MobileNav';

function Header() {
  return (
    <header className='border-b border-primary-900 px-4 sm:px-8 py-5 w-full'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        <div className="hidden sm:block">
          <Navigation />
        </div>
        <MobileNav>
          <Navigation />
        </MobileNav>
      </div>
    </header>
  );
}

export default Header;

