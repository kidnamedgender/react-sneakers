import React, {useState, Fragment, useContext, useEffect } from 'react';
import CardItem from '../components/CardItem';
import '../index.scss'
import AppContext from '../context';
import Info from '../components/Info/Info';
import axios from 'axios';

function Orders({randomNum, onClickClose}) {

    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        
        async function fethData(){
        try {
            const {data} = await axios.get('https://63ff31bfc5c800a7238dc636.mockapi.io/orders')
            setIsLoading(false)
            setOrders(data.map(order=> order.goods).flat())   
        } catch (error) {
            alert('Ошибка при обработке запроса')
        }
    }
        fethData()
    }, [])

    const {onFavorite} = useContext(AppContext)

    const renderFav = () => {
        return  (isLoading? [...Array(8)].map((el,id) => <CardItem key = {id} isLoading ={isLoading} ></CardItem>)
        :
        orders.length?
            orders.map((good,id) =>
                <CardItem
                id = {good.id}
                key={id}
                title = {good.title} 
                price = {good.price} 
                imageURL = {good.imageURL}
                onFavorite = {(product) => onFavorite(product)}
                >
                </CardItem>):
                <Info
                onClickClose = {onClickClose}
                title = "У Вас нет покупок!" 
                description = "Выберите то, что хотите купить на главной странице и оформите заказ через корзину!" 
                image = {`img/roflans/${randomNum}.png`}/>)
    }

    return ( 
        <div className="content">
          <div className="title__search">
          <h1>Мои покупки</h1>
          </div>
          <div className = "sneakers">{renderFav()}</div>
      </div>
     );
}

export default Orders;
