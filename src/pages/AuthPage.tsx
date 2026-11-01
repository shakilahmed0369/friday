import { FormEvent, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AppHeader, SiteFooter, Star } from '../App'
import { ArrowIcon } from '../components/Icon'

export default function AuthPage() {
  const isRegister = useLocation().pathname === '/register'
  const [submitted, setSubmitted] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page-shell" id="top">
      <AppHeader />
      <main className="auth-page" id="main">
        <section className="auth-form-panel">
          <div className="auth-heading">
            <p className="eyebrow">FRIDAY / READER ACCOUNT</p>
            <h1>{isRegister ? 'JOIN FRIDAY' : 'WELCOME BACK'}</h1>
            <p>{isRegister ? 'Create an account to save stories and shape your daily edition.' : 'Sign in to continue reading, saving and following the stories that matter.'}</p>
          </div>
          <form onSubmit={submit}>
            {isRegister && (
              <div className="auth-field">
                <label htmlFor="name">FULL NAME</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="YOUR NAME" required />
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="YOU@EXAMPLE.COM" required />
            </div>
            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">PASSWORD</label>
                {!isRegister && <button type="button">FORGOT PASSWORD?</button>}
              </div>
              <input id="password" name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder="••••••••" minLength={8} required />
              {isRegister && <small>AT LEAST 8 CHARACTERS</small>}
            </div>
            {isRegister && (
              <label className="auth-check">
                <input type="checkbox" required />
                <span>I agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
              </label>
            )}
            {!isRegister && (
              <label className="auth-check">
                <input type="checkbox" />
                <span>KEEP ME SIGNED IN</span>
              </label>
            )}
            <button className="auth-submit" type="submit">{isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'} <ArrowIcon /></button>
            {submitted && <p className="auth-demo-message" role="status">DESIGN PREVIEW — NO ACCOUNT DATA WAS SUBMITTED.</p>}
          </form>
          <div className="auth-switch">
            <span>{isRegister ? 'ALREADY A READER?' : 'NEW TO FRIDAY?'}</span>
            <Link to={isRegister ? '/sign-in' : '/register'}>{isRegister ? 'SIGN IN' : 'CREATE AN ACCOUNT'} <ArrowIcon /></Link>
          </div>
          <Star className="auth-star" />
        </section>
        <aside className="auth-editorial">
          <img src="/news/gallery.jpg" alt="A person walking through a dramatic architectural space" />
          <div>
            <p className="eyebrow">A BETTER DAILY EDITION</p>
            <blockquote>“The news you need, with the context to understand why it matters.”</blockquote>
            <ul>
              <li><span>01</span> SAVE STORIES FOR LATER</li>
              <li><span>02</span> FOLLOW TOPICS AND WRITERS</li>
              <li><span>03</span> CURATE YOUR MORNING EDITION</li>
            </ul>
          </div>
        </aside>
      </main>
      <SiteFooter />
    </div>
  )
}
