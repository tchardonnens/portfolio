import Head from 'next/head'

export default function Home() {
  return (

    <html className='p-0 m-0'>
      <Head>
        <title>Thomas Chardonnens</title>
        <meta name="description" content="Thomas Chardonnens' personal website" />
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1449466562591723522/3MyO9dFd_400x400.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Thomas Chardonnens" />
        <meta property="og:description" content="Personal website" />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/1449466562591723522/3MyO9dFd_400x400.jpg" />
        <meta property="og:url" content="https://portfolio.thomaschardonnens.com" />
      </Head>
      <main className="flex flex-col justify-center items-center min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-neutral-200">
        <div className="p-4">
          <p className="text-3xl">
            Thomas Chardonnens
          </p>
          <br />
          <p className="text-md">
            CS student&nbsp;
            <a href="https://www.isep.fr/">@ISEP 🇫🇷&nbsp;</a>
            and&nbsp;
            <a href="https://www.berkeley.edu/">@UCBerkeley 🇺🇸</a>
            <br />
            ex-Software Engineer Intern&nbsp;
            <a href="https://www.ledger.com/">@Ledger</a>
          </p>
          <br />
          <ul className="text-md">
            <li>
              <a href='https://twitter.com/ChardonnensT'>
                <div className="flex flex-row">
                  <p>Twitter:&nbsp;</p>
                  <p className="text-gray-600 dark:text-gray-400">@ChardonnensT</p>
                </div>
              </a>
            </li>
            <li>
              <a href='https://github.com/tchardonnens'>
                <div className="flex flex-row">
                  <p>GitHub:&nbsp;</p>
                  <p className="text-gray-600 dark:text-gray-400">@tchardonnens</p>
                </div>
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/in/thomaschardonnens/'>
                <div className="flex flex-row">
                  <p>LinkedIn:&nbsp;</p>
                  <p className="text-gray-600 dark:text-gray-400">@thomaschardonnens</p>
                </div>
              </a>
            </li>
          </ul>
          <br />
          <ul className="text-md">
            <h2>Some of my projects:</h2>
            <li>
              <a href='https://verycurious.xyz'>
                <div className="flex flex-row">
                  <p>Curious</p>
                </div>
              </a>
            </li>
            <li>
              <a href='https://map.verycurious.xyz/'>
                <div className="flex flex-row">
                  <p>Tailored tours</p>
                </div>
              </a>
            </li>
            <li>
              <a href='https://scanurl.thomascdnns.com/'>
                <div className="flex flex-row">
                  <p>ScanURL</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </html>
  )
}
