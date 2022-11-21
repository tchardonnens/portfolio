import Head from 'next/head'
import Link from 'next/link'
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
            <a href="/education" className={styles.card}>
              <h2>Education 🏫 &rarr;</h2>
              <p>Learn about my university, my major, my courses and why I study in that field.</p>
            </a>

            <a href="https://www.linkedin.com/in/thomaschardonnens/" className={styles.card}>
              <h2>Experience 💼 &rarr;</h2>
              <p>Find out in which companies I had the opportunity to work for.</p>
            </a>

            <a href="/projects" className={styles.card}>
              <h2>Projects 🚀 &rarr;</h2>
              <p>Some of the projects I'm the most proud of.</p>
            </a>

            <a href="/hobbies" className={styles.card}>
              <h2>Hobbies 🤪 &rarr;</h2>
              <p>Because everybody does cool things on the side!</p>
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
