import { API_URL } from '../../../config';
import { useState } from 'react';
import ReadMore from '../ReadMore/ReadMore';
import InfoDetails from '../InfoDetails/InfoDetails';
import Carusel from '../Carousel/Carousel';
import { useDispatch } from "react-redux";
import { addItem } from '../../../redux/orderRedux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import AmountWidget from '../AmountWidget/AmountWidget';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const WineDetail = ({ id, name, description, country, color, style, grapeVariety, region, volume, alkohol, vintage, price, photos }) => {
  
  const imageList = photos.split(',').map(p => `${API_URL}/public/uploads/photos/${p.trim()}`);
  const dispatch = useDispatch();

  // LOCAL STATE 
  const [quantity, setQuantity] = useState(1);
  const [packAsGift, setPackAsGift] = useState(false);
  const [showModal, setShowModal] = useState(false);


  // HANDLERS 
  const handleAddItemToCart = () => {
    const payload = {
      itemId: uuidv4(),
      wineId: id,
      name,
      price,
      quantity,
      packAsGift,
      infoFromClient: ''
    };
    dispatch(addItem(payload));
    setShowModal(true);
  };

  const handleGiftChange = () => {
    setPackAsGift(prev => !prev);
  };

  const handleQuantityChange = delta => {
    setQuantity(quantity + delta);
  };

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

      {/* xxx */}
    
      {/* PACK AS GIFT  */}
      <div className="mt-4 flex items-center gap-2 re" >
        <input
          type="checkbox"
          id="gift"
          checked={ packAsGift }
          onChange={ handleGiftChange }
          className="w-5 h-5 text-primary accent-primary cursor-pointer"
        />
        <label htmlFor="gift" className="text-sm text-text cursor-pointer">
          Zapakuj na prezent  <span className={`tracking-[2px] text-primary whitespace-nowrap ${ packAsGift ? 'font-bold' : '' }`}> ( +25zł/szt. )</span> 
        </label>

        <div className="absolut top-0 right-0">
          { packAsGift && (<img src="/images/gift-box.webp" alt="Opakowanie" className="w-60 h-60 object-contain"/>) }
        </div>
      </div>


      {/* EDIT ITEM  */}
      <div className="mt-8 flex flex-col  items-center gap-x-20 gap-y-4">
        <span className="text-2xl font-bold text-primary">{ (price + (packAsGift ? 25 : 0)) * quantity } zł</span>

        <AmountWidget
          quantity={quantity}
          onChange={(delta) => handleQuantityChange(delta)}
        />

        <button onClick = { handleAddItemToCart } className="bg-secondary hover:bg-[#c39e2f] text-white font-semibold px-4 py-2 rounded transition">
          Dodaj do koszyka
        </button>

        <ReadMore text={description}/>
        <ScrollToTop />
      </div>

      {/* MODAL */}
      {showModal && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-surface rounded-lg shadow-lg p-6 max-w-sm text-center">
          <p className="text-primary font-semibold text-lg mb-4">
            Produkt dodany do koszyka!
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link 
              to="/" 
              onClick={() => setShowModal(false)}
              className="bg-primary hover:bg-[#5f172e] text-white px-4 py-2 rounded"
            >
              Kontynuuj zakupy
            </Link>
            <Link
              to="/cart"
              className="bg-secondary hover:bg-[#c39e2f] text-white px-4 py-2 rounded"
            >
              Przejdź do koszyka
            </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default WineDetail;



