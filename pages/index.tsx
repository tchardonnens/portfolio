import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Thomas ✌️</title>
        <meta name="description" content="Thomas Chardonnens' personal website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Thomas Chardonnens" />
        <meta property="og:description" content="Thomas Chardonnens' personal website" />
        {/* <meta property="og:image" content="" /> */}
        <meta property="og:url" content="https://portfolio.thomaschardonnens.com" />
      </Head>

      <div className="flex grow flex-col justify-center items-center min-h-screen">
        <div className="p-4">
          <p className="text-lg">
            Hey! I&apos;m Thomas Chardonnens ✌️
          </p>
          <p className="text-sm">
            CS Student&nbsp;
            <a href="https://www.isep.fr/">@ISEP&nbsp;</a>
            and&nbsp;
            <a href="https://www.berkeley.edu/">@UCBerkeley</a>
          </p>
          <br />
          <ul className="text-sm">
            <li>
              <a href='https://twitter.com/ChardonnensT'>
                <div className="flex flex-row">
                  <p>Twitter:&nbsp;</p>
                  <p className="text-gray-400">@ChardonnensT</p>
                </div>
              </a>
            </li>
            <li>
              <a href='https://github.com/tchardonnens'>
                <div className="flex flex-row">
                  <p>GitHub:&nbsp;</p>
                  <p className="text-gray-400">@tchardonnens</p>
                </div>
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/in/thomaschardonnens/'>
                <div className="flex flex-row">
                  <p>LinkedIn:&nbsp;</p>
                  <p className="text-gray-400">@thomaschardonnens</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
