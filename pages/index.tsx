import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Card from '../components/card'
import CustomLink from '../components/customLink'

export default function Home() {
  return (
    <html lang='en'>
      <div>
        <Head>
          <title>Thomas Portfolio</title>
          <meta name="description" content="welcome" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Questrial&family=Shadows+Into+Light&family=Ubuntu&display=swap" rel="stylesheet"></link>

        </Head>

        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.masterTitle}>
              <a>Thomas Portfolio</a>
            </h1>

            <p className={styles.description}>
              Hey! 👋 I&apos;m Thomas Chardonnens and I&apos;m a Software Engineer
            </p>

            <div className={styles.aboutMeBg}>
              <h2 className={styles.aboutMeBgTitle}>
                <a>About me</a>
              </h2>
              <br />

              <p className={styles.aboutMe}>
                I&apos;m a French Computer Science student in Paris, France 🇫🇷.
                <br />
                <br />
                I&apos;m graduating from <Link href="https://www.isep.fr/" className='text-indigo-300'>ISEP</Link> engineering school in 2024. 🎓<br /><br />
                Hacking stuff here and there, interested in Blockchain, Cybersecurity, Software Dev or ML, I&apos;m curious about a lot of things. 👨‍💻<br /><br />
                Just ended a 5 months internship at <Link href="https://www.ledger.com/" className='text-indigo-300'>Ledger</Link> as a Full stack Engineer Intern.
              </p>
            </div>

            <br />
            <h1 className={styles.title}>
              <a>Projects</a>
            </h1>

            <p className={styles.description}>
              Here are some of the projects I have done.
            </p>

            <div className="grid auto-cols-auto gap-10">


              <Card name="Flat Fall Race" description="Multiplayer, client-server networked, 2D race game" link="https://github.com/tchardonnens/flat-fall-race" stack="Java & JavaFX" image="/ffr.webp" />
              <Card name="ScanURL" description="Web-based OSINT tool that retrieves WHOIS, IP, reverse DNS and redirections analysis of a URL or first level domain." link="https://github.com/tchardonnens/scanurl" stack="FastAPI & Jinja2" image="/scanurl.webp" />
              <Card name="Password Crusher" description="Password cracker, based on a large cached dictionnary of hashed passwords" link="https://github.com/tchardonnens/pwd-crusher-front" stack="NestJS & Angular" image="/pwd-crusher.webp" />
              <Card name="Schwarzschild Precession, State of the Art" link="https://github.com/tchardonnens/schwarzschild-precession" description="Simulate the trajectory of the star S2 in orbit around the black hole at the center of our galaxy" stack="Python & Jupyter Notebook" image="/schwarzschild.webp" />
              <Card name="Chess game" description="CLI chess game" link="https://github.com/tchardonnens/cours-java/tree/main/TP7_G7_Chardonnens" stack="Java" image="/cli-chess.webp" />

            </div>
            <br />

            <h1 className={styles.title}>
              <a>Links</a>
            </h1>

            <p className={styles.description}>
              Some links towards my socials
            </p>

            <div className="grid auto-cols-auto gap-10">

              <CustomLink link="https://twitter.com/ChardonnensT" fillColor="#1DA1F2" iconSvg="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" linkName="My Twitter" />
              <CustomLink link="https://github.com/tchardonnens-ledger" fillColor="black" iconSvg="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" linkName="My Github" />
              <CustomLink link="https://www.linkedin.com/in/thomaschardonnens/" fillColor="#0A66C2" iconSvg="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" linkName="My LinkedIn" />

            </div>
          </main>
        </div>
      </div>
    </html>
  )
}
