import React from 'react';
import cls from './Info.module.scss'
function Info({title, description, image, onClickClose}) {
  
    return ( 
        <div className={cls.side__empty__cart}>
            
        <div className={cls.empty__block}>
        
          <img className={cls.cart} width={200} src={image} alt="emptyCart" />
        
           <div className={cls.empty__info}>
             <h3>{title}</h3>
             <p>{description}</p>
          </div>
        
          <button onClick={onClickClose} >Вернуться назад<img width={15} src="/img/arrow_icon.svg" alt="arrow" /></button>
      
         </div>
      
        </div>
     );
}

export default Info;