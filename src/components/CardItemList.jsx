import React from 'react';
import CardItem from './CardItem';

function CardItemList({goods, onAddToCart, searchValue, onFavorite, isLoading}) {

    const renderGoods = () => {
        return (isLoading? [...Array(8)].map((_,id) => <CardItem key = {id} isLoading ={isLoading} ></CardItem>):
        goods.filter((good => good.title.toLowerCase().includes(searchValue.toLowerCase())))
        .map(good =>
            <CardItem
                id = {good.id}
                key={good.title}
                title = {good.title} 
                price = {good.price} 
                imageURL = {good.imageURL}
                onAddToCart = {(product) => onAddToCart(product)}
                onFavorite = {(product) => onFavorite(product)}
                >
            </CardItem>))
    }
    return ( 
        <div className='sneakers'>
            {renderGoods()}
        </div>
     );
}

export default CardItemList;