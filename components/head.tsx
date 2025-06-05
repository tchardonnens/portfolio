import Head from 'next/head';

interface CustomHeadProps {
  title?: string;
  description?: string;
}

export default function CustomHead({
  title = 'Thomas Chardonnens',
  description = 'Thomas Chardonnens - Personal Website',
}: CustomHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="icon"
        href="https://pbs.twimg.com/profile_images/1449466562591723522/3MyO9dFd_400x400.jpg"
        type="image/jpg"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg"
      />
      <meta property="og:url" content="https://portfolio.thomaschardonnens.com" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg"
      />
    </Head>
  );
}
