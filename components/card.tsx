import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import ServerIcon from './server-icon';
import WindowIcon from './window-icon';
import EarthIcon from './earth-icon';

type CardProps = {
  title?: string;
  description?: string;
  linkProd?: string;
  linkRepo?: string;
  backendStack?: string;
  frontendStack?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  title = '',
  description = '',
  linkProd = '#',
  linkRepo = '#',
  backendStack = '',
  frontendStack = '',
}) => {
  return (
    <div className="flex h-auto flex-col gap-4 rounded-2xl border-2 border-neutral-200 p-8 transition-colors duration-200 hover:border-orange-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-orange-500">
      <div className="h-5/6 space-y-4">
        <div className="flex flex-row">
          <p className="font-['Schibsted_Grotesk'] text-lg font-semibold">{title}</p>
        </div>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>

      <div className="flex flex-row">
        <ServerIcon />
        <p className="pl-3 text-sm text-neutral-600 dark:text-neutral-300">{backendStack}</p>
      </div>

      <div className="flex flex-row">
        <WindowIcon />
        <p className="pl-3 text-sm text-neutral-600 dark:text-neutral-300">{frontendStack}</p>
      </div>

      <div className="flex flex-row justify-evenly gap-4">
        {linkProd !== '#' && (
          <a href={linkProd} target="_blank" rel="noopener noreferrer" className="w-1/2">
            <button className="flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-lg text-black transition-colors duration-200 hover:bg-orange-400 active:bg-orange-600 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-500 dark:active:bg-orange-700">
              <EarthIcon />
            </button>
          </a>
        )}

        {linkRepo !== '#' && (
          <a href={linkRepo} target="_blank" rel="noopener noreferrer" className="w-1/2">
            <button className="flex w-full items-center justify-center rounded-lg border-2 border-neutral-200 bg-neutral-100 px-6 py-3 text-2xl text-black transition-colors duration-200 hover:bg-neutral-200 active:bg-neutral-300 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:active:bg-neutral-600">
              <FaGithub />
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
