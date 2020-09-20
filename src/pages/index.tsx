import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Plate from '../components/Plate'
import Cart from '../components/Cart'

const Index = () => {
  const [plates, setPlates] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setCartShow] = useState(false)

  function handleShowCart() {
    setCartShow(!showCart)
  }

  function handleSetCart(newCart: any) {
    setCart([...newCart])
  }

  useEffect(() => {
    let effectRan = false

    async function dataFetch() {
      try {
        const response = await Axios.get('/getPlates')
        if (!effectRan) {
          setPlates(response.data)
        }
      } catch (err) {
        effectRan = true
        console.error(err)
      }
    }
    dataFetch()
  }, [])

  return (
    <>
      <Header cart={cart} handleShowCart={handleShowCart} />
      <div className="plateContainer">
        {showCart ? <Cart cart={cart} handleSetCart={handleSetCart} /> : ''}
        {plates
          ? plates.map((plate: any) => {
              return (
                <Plate
                  key={Math.random()}
                  cart={cart}
                  plate={plate}
                  handleSetCart={handleSetCart}
                />
              )
            })
          : ''}
      </div>
      <Footer />
    </>
  )
}

export default Index
