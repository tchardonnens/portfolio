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
        <main className={styles.mainScroll}>
          <h1 className={styles.title}>
            <a>Projects</a>
          </h1>

          <p className={styles.description}>
            Here are some of the projects I have done.
          </p>

          <div className="grid auto-cols-auto gap-10">


            <Card name="Flat Fall Race" description="Multiplayer, client-server networked, 2D race game" link="https://github.com/tchardonnens-ledger/flat-fall-race" stack="Java & JavaFX" image="/ffr.png" />
            <Card name="Password Crusher" description="Password cracker, based on a large cached dictionnary of hashed passwords" link="https://github.com/tchardonnens-ledger/pwd-crusher-front" stack="NestJS & Angular" image="/pwd-crusher.png" />
            <Card name="Schwarzschild Precession, State of the Art" link="https://github.com/tchardonnens-ledger/schwarzschild-precession" description="Simulate the trajectory of the star S2 in orbit around the black hole at the center of our galaxy" stack="Python & Jupyter Notebook" image="/schwarzschild.png" />
            <Card name="Chess game" description="CLI chess game" link="https://github.com/tchardonnens-ledger/cours-java/tree/main/TP7_G7_Chardonnens" stack="Java" image="/cli-chess.png" />

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
