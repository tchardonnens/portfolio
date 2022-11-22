import Head from 'next/head'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'

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

          <div className={styles.grid}>

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
