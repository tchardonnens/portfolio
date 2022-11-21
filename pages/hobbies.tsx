import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Projects() {
  return (
    <div>
      <Head>
        <title>Thomas Portfolio</title>
        <meta name="description" content="welcome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Hobbies</a>
        </h1>

        <p className={styles.description}>
          Here are some of the projects I have done and that I'm proud of.
        </p>

        <div className={styles.grid}>

        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          Made by Thomas, with ❤️
        </a>
      </footer>
    </div>
  )
}
