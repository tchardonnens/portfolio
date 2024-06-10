import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';

interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

interface PostProps {
  postData: PostData;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

const Post: React.FC<PostProps> = ({ postData }) => {
  return (
    <>
      <div className="bg-neutral-100 p-2">
        <Link href="/blog" className="text-lg text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
          Back to posts list
        </Link>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-900 h-screen">
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article className="flex flex-col py-10 px-64 w-full space-y-8 text-neutral-800 dark:text-white">
          <h1 className="text-4xl">{postData.title}</h1>
          <p>Published: {postData.date.split('-').reverse().join('/')}</p>
          <div className="leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </>
  );
};

export default Post;
