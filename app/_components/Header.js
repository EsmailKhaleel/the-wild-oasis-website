import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import MobileNav from './MobileNav';

function Header() {
  return (
    <header className='max-w-7xl mx-auto sm:px-8 sm:py-5 p-3 w-full z-50'>
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

