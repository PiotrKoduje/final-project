import { NavLink } from 'react-router-dom';
import { LuWine } from 'react-icons/lu';
import { useState, useEffect, useRef, useMemo } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWinesOpen, setIsWinesOpen] = useState(false);
  const winesMenuRef = useRef(null);

  const cartItemsCount = 2;

  const countries = useMemo(() => ['WSZYSTKIE','Francuskie', 'Hiszpańskie', 'Portugalskie', 'Włoskie'], []);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (winesMenuRef.current && !winesMenuRef.current.contains(e.target)) {
        setIsWinesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-primary text-white rounded-md mb-4 px-4 py-3">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold text-secondary flex items-center gap-2">
        <LuWine className="w-6 h-6" />
          Winoteka
        </div>

        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`${ isOpen ? 'block' : 'hidden' } w-full md:flex md:items-center md:w-auto mt-3 md:mt-0`}>
          <ul className="md:flex md:space-x-4 text-sm relative">
            <li>
              <NavLink to="/" className={({ isActive }) => `block py-2 md:py-0 hover:text-secondary ${ isActive ? ' text-secondary' : '' }`}>
                Home
              </NavLink>
            </li>

            <li className="relative" ref={winesMenuRef}>
              <button onClick={() => setIsWinesOpen(current => !current)} className="block py-2 md:py-0 hover:text-secondary">
                Wina
              </button>

              {isWinesOpen && (
                <ul className="absolute left-0 mt-2 bg-surface text-text rounded-md shadow-md z-50 min-w-[150px]">
                  {countries.map((country) => (
                    <li key={country}>
                      <NavLink
                        to={ `/wines/country/${country.toLowerCase()}` }
                        onClick={() => setIsWinesOpen(false)}
                        className="block px-4 py-2 hover:bg-secondary hover:text-white rounded-md transition-colors duration-200">
                        { country }
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/test" className={({ isActive }) => `block py-2 md:py-0 hover:text-secondary ${ isActive ? ' text-secondary' : ''}`}>
                Test
              </NavLink>
            </li>

            <li>
              <NavLink to="/cart" className={({ isActive }) => `relative block py-2 md:py-0 hover:text-secondary ${isActive ? ' text-secondary' : ''}`}>
                Koszyk
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0 -left-30 md:-top-4 md:-right-4 bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                    {cartItemsCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
