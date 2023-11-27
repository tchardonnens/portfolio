import React from 'react';
import { FaGithub } from "react-icons/fa6";
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
    <div className='flex flex-col bg-neutral-100 dark:bg-zinc-900 p-6 rounded-2xl h-auto gap-4'>
      <div className='h-5/6'>

        <div className="flex flex-row">
          <p className='text-xl'>{title}</p>
        </div>
        <p>{description}</p>
      </div>

      <div className='flex flex-row'>
        <ServerIcon />
        <p className='text-neutral-600 dark:text-neutral-300 pl-3'>{backendStack}</p>
      </div>

      <div className='flex flex-row'>
        <WindowIcon />
        <p className='text-neutral-600 dark:text-neutral-300 pl-3'>{frontendStack}</p>
      </div>

      <div className='flex flex-row justify-evenly gap-4'>
        {linkProd !== '#' && (
          <a href={linkProd} target="_blank" rel="noopener noreferrer" className='w-1/2'>
            <button className='flex bg-orange-500 dark:bg-orange-600 text-black dark:text-white px-6 py-3 rounded-lg text-lg w-full justify-center items-center'><EarthIcon /></button>
          </a>
        )}

        {linkRepo !== '#' && (
          <a href={linkRepo} target="_blank" rel="noopener noreferrer" className='w-1/2'>
            <button className='flex bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-2xl w-full justify-center items-center'><FaGithub /></button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;