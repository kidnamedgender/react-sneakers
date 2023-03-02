import React from 'react';
import {Link} from 'react-router-dom'
function Header({onClickCart, setRandomNum, cardOnCart, favorites}) {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomNum = () => {
    setRandomNum(getRandomInt(3))
  }
    return ( 
        
        <header>

        <div className="nav__left">
          <Link to = "/">
            <img width={100} height ={100} src="/img/logo.png" alt = "logo"/>
          </Link>

          <div className="nav__info">
            <h3 style={{textTransform:"uppercase"}}>React Крадули</h3>
            <p style={{opacity:"0.5"}}>Крадись быстро!</p>
          </div>

        </div>

        <ul className="nav__right">

          <li onClick={onClickCart} style={{cursor:'pointer'}}><b style={{marginRight:'5px',padding:'5px'}}>{cardOnCart.length}</b><img width={30} src="/img/purchase_icon.png" alt = 'cart'/><span>{cardOnCart.reduce((acc,card) => acc+=card.price, 0).toFixed(2)} руб.</span></li>
          <Link to="/favorites">
            <li onClick={getRandomNum} style={{cursor:'pointer'}}><img width={30} src="/img/fav_icon.png" alt = 'favorite'/><b style = {{color:'rgba(158, 48, 48)', padding:'5px'}}>{favorites.length}</b></li>
          </Link>
          <Link to="/orders">
          <li><img width={30} src="/img/user_icon.png" alt = 'user'/></li>
          </Link>
        </ul>

      </header>
     );
}

export default Header;