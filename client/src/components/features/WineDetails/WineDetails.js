import { API_URL } from '../../../config';
import { useState } from 'react';
import ReadMore from '../ReadMore/ReadMore';
import InfoDetails from '../InfoDetails/InfoDetails';
import Carusel from '../Carousel/Carousel';

const WineDetail = ({ name, description, country, color, style, grapeVariety, region, volume, alkohol, vintage, price, photos }) => {
  const [quantity, setQuantity] = useState(1);
  const [packAsGift, setPackAsGift] = useState(false);

  const handleAddToCart = () => {};

  const handleGiftChange = () => {
    setPackAsGift(prev => !prev);
  };

  const increment = () => {
    setQuantity(prev => Math.min(10, prev + 1));
  };

  const decrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const imageList = photos.split(',').map(p => `${API_URL}/public/uploads/photos/${p.trim()}`);

  return (
    <div className="bg-surface text-text p-6 md:p-20 rounded-lg shadow-sm max-w-5xl mx-auto mt-6 ">
      <h1 className="xs:text-lg lg:text-2xl font-semibold mb-4 text-primary text-center">{name}</h1>

      <Carusel images={imageList} />

      <InfoDetails
        country = {country} 
        grapeVariety = {grapeVariety}
        color = {color}
        style = {style}
        region = {region}
        volume = {volume}
        alkohol = {alkohol}
        vintage = {vintage} 
      >
      </InfoDetails>

      <ReadMore text={description}/>
    
      <div className="mt-4 flex items-center gap-2" relative>
        <input
          type="checkbox"
          id="gift"
          checked={ packAsGift }
          onChange={ handleGiftChange }
          className="w-5 h-5 text-primary accent-primary"
        />
        <label htmlFor="gift" className="text-sm text-text">
          Zapakuj na prezent  <span className={`tracking-[2px] text-primary whitespace-nowrap ${ packAsGift ? 'font-bold' : '' }`}> ( +25zł/szt. )</span> 
        </label>

        <div className="absolut top-0 right-0">
          { packAsGift && (<img src="/images/gift-box.webp" alt="Opakowanie" className="w-60 h-60 object-contain"/>) }
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-x-20 gap-y-4">
        <span className="text-2xl font-bold text-primary">{ (price + (packAsGift ? 25 : 0)) * quantity } zł</span>

        <div className="flex items-center gap-2">
          <button onClick = { decrement } className="px-3 py-1 bg-accent text-white rounded hover:bg-text disabled:opacity-40" disabled={ quantity <= 1 }>
            -
          </button>
          <span className="min-w-[2rem] text-center">{quantity}</span>
          <button onClick = { increment } className="px-3 py-1 bg-accent text-white rounded hover:bg-text disabled:opacity-40" disabled={ quantity >= 10 }>
            +
          </button>
        </div>

        <button onClick = { handleAddToCart } className="bg-secondary hover:bg-[#c39e2f] text-white font-semibold px-4 py-2 rounded transition">
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default WineDetail;



