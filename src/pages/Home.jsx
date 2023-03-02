import React from 'react';
import CardItemList from '../components/CardItemList';

function Home({goods,
    searchValue,
    setSearchValue,
    onFavorite,
    onAddToCart,
    isLoading,}) {
    return ( 
        <div className="content">
        <div className="title__search">
          <h1>{searchValue?`Поиск по "${searchValue}"`:`Все крадули`}</h1>
          <div className="search__block">
            {!searchValue
              ?<img width={20} src="img/search_icon.png" alt="search" />
              :<img onClick={() => setSearchValue('')} style={{cursor:'pointer'}} width={20} src="img/x_icon.svg" alt="x" />
            }
            <input maxLength={25} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Поиск..."/>
          </div>
        </div>
          <CardItemList isLoading = {isLoading} onFavorite = {onFavorite} searchValue = {searchValue} goods = {goods} onAddToCart = {onAddToCart}></CardItemList>
      </div>
     );
}

export default Home;
