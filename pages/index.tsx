import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thomas Portfolio</title>
        <meta name="description" content="welcome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <a>Welcome!</a>
          </h1>

          <p className={styles.description}>
            I'm Thomas Chardonnens and here is my{' '}
            <code className={styles.code}>personal website</code>
          </p>

          <div className={styles.grid}>
            <a href="/aboutMe" className={styles.card}>
              <h2>About me 😁 &rarr;</h2>
              <p>Let me introduce myself!</p>
            </a>

            <a href="/projects" className={styles.card}>
              <h2>Projects 🚀 &rarr;</h2>
              <p>Some of my projects</p>
            </a>

            <a href="/links" className={styles.card}>
              <h2>My links ⚡️ &rarr;</h2>
              <p>Useful links for socials and other stuff</p>
            </a>
          </div>
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
