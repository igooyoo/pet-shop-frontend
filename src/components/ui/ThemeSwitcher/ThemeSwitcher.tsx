import cn from 'clsx';
import { useState } from 'react';

import { ChevronRight, Cross } from '@/components/icons';
import ClickOutside from '@/lib/click-outside';
import { useToggleTheme } from '@/lib/hooks/useToggleTheme';

import ThemeIcon from './ThemeIcon';

const ThemeSwitcher = () => {
  const [display, setDisplay] = useState(false);
  const { theme, themes, setTheme } = useToggleTheme();

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div className="relative">
        <div
          className="relative flex items-center"
          onClick={() => setDisplay(!display)}
        >
          <button
            className={
              'flex h-10 w-[125px] items-center justify-between rounded-md border border-accent-2 pl-2 pr-1 transition-colors ease-linear hover:border-accent-3 hover:shadow-sm'
            }
            aria-label="Theme Switcher"
          >
            <span className="flex shrink items-center">
              <ThemeIcon width={20} height={20} theme={theme} />
              <span className={cn('capitalize leading-none ml-2')}>
                {theme}
              </span>
            </span>
            <span className="cursor-pointer">
              <ChevronRight
                className={cn('transition duration-300', {
                  'rotate-90': display,
                })}
              />
            </span>
          </button>
        </div>
        <div className="absolute right-0 top-0">
          {themes.length && display ? (
            <div
              className={
                'fixed right-0 top-12 z-40 mt-2 h-full w-full origin-top-right bg-accent-0 shadow-lg outline-none lg:absolute lg:h-auto lg:w-56 lg:border lg:border-accent-1 lg:shadow-lg'
              }
            >
              <div className="flex flex-row justify-end px-6">
                <button
                  className="md:hidden"
                  onClick={() => setDisplay(false)}
                  aria-label="Close panel"
                >
                  <Cross className="h-6 w-6" />
                </button>
              </div>
              <ul>
                {themes.map((t: string) => (
                  <li key={t}>
                    <button
                      className="flex w-full cursor-pointer items-center px-6 py-3 font-medium capitalize leading-6 text-primary transition duration-150 ease-in-out hover:bg-accent-1"
                      role={'link'}
                      onClick={() => {
                        setTheme(t);
                        setDisplay(false);
                      }}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </ClickOutside>
  );
};

export default ThemeSwitcher;
