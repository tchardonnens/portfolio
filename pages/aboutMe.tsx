import Head from 'next/head'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import CustomLink from '../components/customLink'

export default function AboutMe() {
  return (
    <div  >
      <Head>
        <title>Thomas Portfolio</title>
        <meta name="description" content="welcome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <a>About me</a>
          </h1>

          <p className={styles.description}>
            Who am I?
          </p>

          <p className="bg-neutral-900 rounded-lg shadow-lg w-108 p-10">
            I'm a French Computer Science student in Paris 🇫🇷. I'm graduating from engineering school in 2024. 🎓<br /><br />
            Hacking stuff here and there, interested in Blockchain, Cybersecurity, Software Dev or ML, I'm curious about a lot of things. 👨‍💻<br /><br />
            Currently Tech Lead at <Link href="https://juniorisep.com/accueil-new/" className='text-indigo-600'>Junior ISEP</Link>, the Junior Enterprise of my engineering school, <Link href="https://www.isep.fr/" className='text-indigo-600'>ISEP</Link>.
            Also doing a 5 months internship at <Link href="https://www.ledger.com/" className='text-indigo-600'>Ledger</Link> as a Full stack Engineer Intern.
          </p>
          <br />
          <CustomLink link="https://www.linkedin.com/in/thomaschardonnens/" fillColor="#0A66C2" iconSvg="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" linkName="My LinkedIn" />
        </main>
      </div>

      <footer className={styles.footer}>
        <a>
          Made by Thomas, with ❤️
        </a>
      </footer>
    </div>
  )
}
