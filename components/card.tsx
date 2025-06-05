import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import ServerIcon from './serverIcon';
import WindowIcon from './windowIcon';
import EarthIcon from './earthIcon';

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
    <div className="flex h-auto flex-col gap-4 rounded-2xl bg-neutral-100 p-6 dark:bg-zinc-900">
      <div className="h-5/6">
        <div className="flex flex-row">
          <p className="text-xl">{title}</p>
        </div>
        <p>{description}</p>
      </div>

      <div className="flex flex-row">
        <ServerIcon />
        <p className="pl-3 text-neutral-600 dark:text-neutral-300">{backendStack}</p>
      </div>

      <div className="flex flex-row">
        <WindowIcon />
        <p className="pl-3 text-neutral-600 dark:text-neutral-300">{frontendStack}</p>
      </div>

      <div className="flex flex-row justify-evenly gap-4">
        {linkProd !== '#' && (
          <a href={linkProd} target="_blank" rel="noopener noreferrer" className="w-1/2">
            <button className="flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-lg text-black dark:bg-orange-600 dark:text-white">
              <EarthIcon />
            </button>
          </a>
        )}

        {linkRepo !== '#' && (
          <a href={linkRepo} target="_blank" rel="noopener noreferrer" className="w-1/2">
            <button className="flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-2xl text-black dark:bg-black dark:text-white">
              <FaGithub />
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
