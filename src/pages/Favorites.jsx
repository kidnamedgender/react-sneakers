import React, { Fragment, useContext } from 'react';
import CardItem from '../components/CardItem';
import '../index.scss'
import AppContext from '../context';
import Info from '../components/Info/Info';

function Favorites({
    onFavorite,
    onAddToCart,
    randomNum,
    onClickClose,
    isLoading,
    }) {

    const {favorites} = useContext(AppContext)
    const renderFav = () => {
        return  (isLoading?
        
        [...Array(8)].map((el,id) => <CardItem key = {id} isLoading ={isLoading} ></CardItem>)
        :
        favorites.length?

        favorites.map(good =>
            <CardItem
                id = {good.id}
                key={good.title}
                title = {good.title} 
                price = {good.price} 
                imageURL = {good.imageURL}
                onAddToCart = {(product) => onAddToCart(product)}
                onFavorite = {(product) => onFavorite(product)}
                >
            </CardItem>):
            <Info
                onClickClose = {onClickClose}
                title = "У Вас нет избранных крадуль!" 
                description = "Сюда Вы можете добавить понравившиеся крадули с главной страницы."
                image = {`img/roflans/${randomNum}.png`}/>)
    }

    return ( 
        <div className="content">
          <div className="title__search">
          <h1>Избранное</h1>
          </div>
          <div className = "sneakers">{renderFav()}</div>
      </div>
     );
}

export default Favorites;
