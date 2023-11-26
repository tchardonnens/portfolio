import React from 'react';
import { FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import ServerIcon from './serverIcon';
import WindowIcon from './windowIcon';

const Card = ({ title = '', description = '', linkProd = '#', linkRepo = '#', backendStack = '', frontendStack = '', databaseStack = '' }) => {
  return (
    <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 p-6 rounded-2xl h-auto gap-4'>
      <div className='h-5/6'>

        <div className="flex flex-row">
          <p className='text-xl'>{title}</p>
        </div>
        <p>{description}</p>
      </div>

      <div className='flex flex-row'>
        <ServerIcon />
        <p className='text-neutral-300 pl-3'>{backendStack}</p>
      </div>

      <div className='flex flex-row'>
        <WindowIcon />
        <p className='text-neutral-300 pl-3'>{frontendStack}</p>
      </div>

      <div className='flex flex-row justify-evenly'>

        <a href={linkProd} target="_blank" rel="noopener noreferrer">
          <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-lg'><FaExternalLinkAlt /></button>
        </a>
        <a href={linkRepo} target="_blank" rel="noopener noreferrer">
          <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-lg'><FaGithub /></button>
        </a>
      </div>
    </div>
  );
};

export default Card;