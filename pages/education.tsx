import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Projects() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Thomas Portfolio</title>
        <meta name="description" content="welcome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Education</a>
        </h1>

        <p className={styles.description}>
          The universities I went to and the major I took.
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
