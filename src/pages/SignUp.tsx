import React, { useState, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const history = useHistory()
  const formRef = useRef(null)
  const passwordRef = useRef(null)
  const [passwordMatch, setPasswordMatch] = useState(false)

  async function handleFormSubmit() {
    event.preventDefault()
    const userData = formRef.current
    if (passwordMatch === true) {
      try {
        await Axios.post('/users', {
          firstName: userData[0].value,
          lastName: userData[1].value,
          email: userData[2].value,
          password: userData[4].value,
        }).then(() => history.push('/'))
      } catch (err) {
        console.error(err)
      }
    }
  }

  function checkPasswordMatch(event) {
    if (event.target.value === passwordRef.current.value) {
      const passwordEffect = document.getElementById('password2')
      passwordEffect.style.backgroundColor = 'lightgreen'
      setPasswordMatch(!passwordMatch)
    }
  }

  return (
    <>
      <Header />
      <h1>Make An Account</h1>
      <div className="signUpForm">
        <form onSubmit={handleFormSubmit} ref={formRef}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="Turnip" />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Florence" />
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" placeholder="turn.flor@tmails.com" />
          <label htmlFor="password">Choose a password </label>
          <input type="password" id="password1" ref={passwordRef} />
          <br />
          <label htmlFor="password2">Re-type your password </label>
          <input type="password" id="password2" onChange={checkPasswordMatch} />
          <button className="signInSubmit" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
