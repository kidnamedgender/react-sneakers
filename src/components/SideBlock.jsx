import React, {useState} from 'react';
import Info from './Info/Info';
import SideBlockItem from './SideBlockItem';

import axios from 'axios';

function SideBlock({onClickClose, cardOnCart, setCardOnCart, onRemove}) {
    const [isClicked, setIsClicked] = useState(false)
    const [orderID, setOrderID] = useState(0)
    const [loading, setLoading] = useState(false)

    const onOrder = async ()=>{
      setLoading(true)
      const {data} = await axios.post('https://63ff31bfc5c800a7238dc636.mockapi.io/orders',{goods:cardOnCart})
      setOrderID(data.id)
      setIsClicked(true)
      setCardOnCart([])
      for (let i = 0; i<cardOnCart.length;i++){
        const good = cardOnCart[i]
        await axios.delete(`https://63ebd9a032a0811723931436.mockapi.io/cart/${good.id}`)
      }
      setLoading(false)
    }

    return ( 

        <div onClick = {onClickClose} className="overlay">

        <div onClick={e=>e.stopPropagation()} className="side__block" >

        <h2>Корзина <img onClick={onClickClose} className="button" width={15} src="/img/x_icon.svg" alt="Exit" /></h2>
        {cardOnCart.length
        ?
        <div className='items__purchase'>
          <div className="side__items">

            {cardOnCart.map(card =>
            <SideBlockItem
                id = {card.id}
                key = {card.title}
                title = {card.title} 
                price = {card.price} 
                imageURL = {card.imageURL}
                onRemove = {onRemove}
                >
            </SideBlockItem>)}

          </div>

          <div className="purchase__block">

            <ul>
                
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{cardOnCart.reduce((acc,card) => acc+=card.price, 0).toFixed(2)} руб.</b>
              </li>

              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>{(5/100*cardOnCart.reduce((acc,card) => acc+=card.price, 0).toFixed(2)).toFixed(2)} руб.</b>
              </li>

            </ul>

            <button style = {loading?{backgroundColor:'rgba(0,0,0,0.5)', cursor:'default'}:{}} onClick = {onOrder}>Оформить заказ <img width={15} src="/img/arrow_icon.svg" alt="arrow" /></button>

            </div>
          </div>
        
        :
        <div style = {{transform: 'translateY(50%)'}}>
          <Info onClickClose = {onClickClose} title = {isClicked?"Успешно":"Ваша коризина пуста"} description = {isClicked?`Ваш заказ #${orderID} успешно офоромлен.`:"Добавьте хотябы одну пару крадуль чтобы сделать заказ."} image = {isClicked?"img/incart_icon.png":"img/cart_empty.png"}/>
        </div>
        }
          
        </div>
        
      </div>

     );
}

export default SideBlock;