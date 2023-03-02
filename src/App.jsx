import axios from 'axios';
import {useEffect, useState } from 'react';
import Header from './components/Header'
import SideBlock from './components/SideBlock'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import AppContext from './context';
import Orders from './pages/Orders';

function App() {

  const [goods, setGoods] = useState([])

  const [favorites, setFavorites] = useState([])

  const [cartOpened, setCartOpened] = useState(false)

  const [cardOnCart, setCardOnCart] = useState([])

  const [searchValue, setSearchValue] = useState('')

  const [randomNum, setRandomNum] = useState(1)

  const [isLoading, setIsLoading] = useState(true)


  const navigate = useNavigate()
  useEffect(()=> {
    async function fethData(){
      try {
          const cartResponse = await axios.get('https://63ebd9a032a0811723931436.mockapi.io/cart')
          const favoritesResponse = await axios.get('https://63ee0d74388920150dd82195.mockapi.io/favorites')
          const goodsResponse = await axios.get('https://63ebd9a032a0811723931436.mockapi.io/goods')
          

          setIsLoading(false)
          
          setFavorites(favoritesResponse.data)
          setCardOnCart(cartResponse.data)
          setGoods(goodsResponse.data)
      } catch (error) {
        alert('Ошибка при обработке запроса')
      }
    }

    fethData()
  }, [])

  const onFavorite = (product) => {
    if (favorites.find(favProduct => favProduct.title === product.title)){
      axios.delete(`https://63ee0d74388920150dd82195.mockapi.io/favorites/${favorites.find(favProduct => favProduct.title === product.title).id}`) 
      setFavorites(prev => prev.filter(card => card.title !==product.title))
    }
    else{
      axios.post('https://63ee0d74388920150dd82195.mockapi.io/favorites', product).then(res => setFavorites(prev => [...prev, res.data]))
    }
  }

  const onAddToCart = (product) => {
    if (cardOnCart.find(cardProduct => cardProduct.title === product.title)){
      axios.delete(`https://63ebd9a032a0811723931436.mockapi.io/cart/${cardOnCart.find(cardProduct => cardProduct.title === product.title).id}`) 
      setCardOnCart(prev => prev.filter(card => card.title !== product.title))
    }
    else{
      axios.post('https://63ebd9a032a0811723931436.mockapi.io/cart', product).then(res => setCardOnCart(prev => [...prev, res.data]))
    }
  }

  const onRemoveCartItem = (title, id) => {
    if (cardOnCart.find(cardProduct => cardProduct.title === title)){
    axios.delete(`https://63ebd9a032a0811723931436.mockapi.io/cart/${id}`)
    setCardOnCart(prev => prev.filter(card => card.title!==title))
    }
  }

  const isGoodAdded = (title) => {
    return cardOnCart.some(card =>{return card.title === title})
  }

  const isFavoriteAdded = (title) => {
    return favorites.some(card =>{return card.title === title})
  }

  return (
    <AppContext.Provider value = {{goods, cardOnCart, favorites, isGoodAdded, isFavoriteAdded, onAddToCart, onFavorite}}>
      <div className="wrapper">
        {cartOpened&&<SideBlock opened = {cartOpened} onRemove = {onRemoveCartItem} cardOnCart = {cardOnCart} setCardOnCart = {setCardOnCart} onClickClose = {()=> setCartOpened(!cartOpened)}/>}
        <Header favorites = {favorites} cardOnCart={cardOnCart} setRandomNum = {setRandomNum} onClickCart = {()=> setCartOpened(!cartOpened)}/>
        <Routes>
        <Route path="/" element = {
        <Home
          goods = {goods}
          searchValue = {searchValue}
          setSearchValue = {setSearchValue}
          onFavorite = {onFavorite}
          onAddToCart = {onAddToCart}
          isLoading ={isLoading}
        />}
        />
        <Route path="/favorites" element={<Favorites
          onFavorite = {onFavorite}
          onAddToCart = {onAddToCart} 
          isLoading = {isLoading}
          randomNum = {randomNum}
          onClickClose = {()=>{return navigate('/')}}
          />
        }
          >
          </Route>

          <Route path="/orders" element={<Orders
            randomNum = {randomNum}
            onClickClose = {()=>{return navigate('/')}}
          />
        }
          >
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
