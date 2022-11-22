import Head from 'next/head'
import Card from '../components/card'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'

export default function Projects() {
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
            <a>Projects</a>
          </h1>

          <p className={styles.description}>
            Here are some of the projects I have done.
          </p>

          <div className={styles.grid}>

            <Card name="Flat Fall Race" description="Multiplayer, client-server networked, 2D race game" stack="Java & JavaFX" />
            <Card name="Password Crusher" description="Password cracker, based on a large cached dictionnary of hashed passwords" stack="NestJS & Angular" />
            <Card name="Schwarzschild Precession, State of the Art" description="Simulate the trajectory of the star S2 in orbit around the black hole at the center of our galaxy" stack="Python & Jupyter Notebook" />
            <Card name="Chess game" description="CLI chess game" stack="Java" />

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
