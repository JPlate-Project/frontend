import React, { useState, useRef, useContext } from 'react'
import Link from 'next/link'
import { useHistory } from 'react-router-dom'
import { AuthContext } from './_app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Axios from 'axios'

const SignIn = () => {
  const [, setAuth] = useContext(AuthContext)
  const [checkBox, setCheckBox] = useState(false)
  const formRef = useRef(null)
  const history = useHistory()

  function handleCheckBox() {
    setCheckBox(!checkBox)
  }

  async function handleSubmit() {
    event.preventDefault()
    const userData = {
      email: formRef.current[0].value,
      password: formRef.current[1].value,
    }
    try {
      const login = await Axios.post('/login', userData)
      if (login) {
        if (!window.localStorage.firstName) {
          setAuth(true)
          window.localStorage.setItem('cookie', JSON.stringify(login.data))
        }
        history.push('/profile')
      } else {
        console.log('login UN-successful')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Header />
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="signInContainer">
          <label>Email</label>
          <input type="text" />
          <label>Password</label>
          <input type={checkBox ? 'text' : 'password'} />
          <label>Show Password</label>
          <input type="checkbox" onChange={handleCheckBox} />
          <button className="signInSubmit" type="submit">
            Submit
          </button>
          <label>Don't have an account?</label>
          <Link href="/SignUp">Sign Up Here</Link>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default SignIn
