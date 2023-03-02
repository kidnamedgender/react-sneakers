import React, { Fragment, useContext } from 'react';
import classes from './CardItem.module.scss'
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

function CardItem({id, title, price, imageURL, onAddToCart, onFavorite, isLoading = false}) {
    const {isGoodAdded, isFavoriteAdded} = useContext(AppContext)
    const onClickToCart = () => {
      onAddToCart({id, title, price, imageURL})
    }
    const onClickFavorite = () =>{
      onFavorite({id, title, price, imageURL})
    }

    return ( 

        <div className={classes.block}>
          {isLoading
          ?
            <ContentLoader 
            speed={2}
            width={170}
            height={230}
            viewBox="0 0 170 230"
            backgroundColor="#D8D8D8"
            foregroundColor="#E7E7E7"
          >
            <rect x="0" y="0" rx="10" ry="10" width="170" height="120" /> 
            <rect x="0" y="140" rx="11" ry="11" width="170" height="15" /> 
            <rect x="0" y="160" rx="11" ry="11" width="100" height="15" /> 
            <rect x="0" y="195" rx="7" ry="7" width="80" height="25" /> 
            <rect x="135" y="190" rx="11" ry="11" width="32" height="32" />
          </ContentLoader>
          :
          <Fragment>
            <div className={classes.fav}>
              <img onClick={onClickFavorite} width={20} style={{float:'left'}} src={isFavoriteAdded(title)?'img/heart__filled.png':'img/heart__hollow.png'} alt="Unlike" />
            </div>

            <img width={100} height={100} src={imageURL} alt = ''/>
            <h5>{title}</h5>
            
            <div className={classes.price__block}>
              <div>
                <h5>Цена</h5>
                <span>{price} руб.</span>
              </div>

              {onAddToCart&&<img onClick={onClickToCart} width={45} src={isGoodAdded(title)?'img/incart_icon.png':'img/tocart_icon.png'} alt="ToCart"/>}

            </div>
          </Fragment>
          }
          </div>
     );
}

export default CardItem;