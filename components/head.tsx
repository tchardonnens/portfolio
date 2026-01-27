import Head from 'next/head';

interface CustomHeadProps {
  title?: string;
  description?: string;
}

export default function CustomHead({
  title = 'Thomas Chardonnens',
  description = 'Thomas Chardonnens - Software Engineer passionate about AI and knowledge compression',
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
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg"
      />
      <meta property="og:url" content="https://thomascdnns.com" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg"
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://pbs.twimg.com" />
    </Head>
  );
}
