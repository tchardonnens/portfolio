import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../lib/posts';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  date: string;
}

interface HomeProps {
  allPostsData: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Home: React.FC<HomeProps> = ({ allPostsData }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPostsData);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue) {
      const filtered = allPostsData.filter(post =>
        post.title.toLowerCase().includes(searchValue)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(allPostsData);
    }
  };

  return (
    <>
      <Head>
        <title>Thomas Blog</title>
      </Head>
      <div className="bg-white text-neutral-900 dark:bg-black dark:text-neutral-200 p-2">
        <Link href="/" className="text-lg text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
          Back to home
        </Link>
      </div>
      <main className="flex flex-col mx-auto items-center min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-neutral-200">
        <div className="mt-4 w-5/6 md:w-3/4 lg:w-5/6">
          <h1 className="text-4xl text-center my-8">My Blog</h1>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full items-center">
              <input
                type="text"
                placeholder="Search by title"
                className="mb-6 p-2 border-2 w-2/3 rounded-lg border-black dark:border-white bg-white text-neutral-900 dark:bg-black dark:text-neutral-200 focus:border-black items-center"
                onChange={handleSearchChange}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

              {filteredPosts.map(({ id, date, title }) => (
                <a key={id} href={`/blog/${id}`} className="flex flex-col items-center bg-transparent border-none bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 text-white font-semibold py-5 px-4 rounded no-underline dark:no-underline hover:bg-orange-500 hover:text-white hover:dark:bg-orange-600">
                  <button className='flex flex-col items-center'>
                    {title}
                    <p className="text-sm">{date.split('-').reverse().join('/')}</p>
                  </button>
                </a>
              ))}
            </div>

          </div>
        </div>
      </main >
    </>
  );
};

export default Home;
