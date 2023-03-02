import React from 'react';

function SideBlockItem({id,title, price, imageURL, onRemove}) {
    return ( 

        <div className="block">
                
        <img width={70} height={70} src={imageURL} alt='sneaker' />
        
        <div className="side__info">

          <p>{title}</p>
          <b>{price} руб.</b>

        </div>
        
        <img onClick={()=>onRemove(title, id)} className="button" width={15} src="/img/x_icon.svg" alt="Remove" />

      </div>

     );
}

export default SideBlockItem;