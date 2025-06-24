import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderItems, removeItem, updateItemQuantity, updateInfoFromClient } from "../../../redux/orderRedux";
import AmountWidget from "../../features/AmountWidget/AmountWidget";
import { Link } from "react-router-dom";

// CONSTANS 
const SHIPPING_COST = 30;
const GIFT_PACK_COST = 25;
const FREE_SHIPPING_THRESHOLD = 500;

//HANDLERS
const Cart = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector(getOrderItems);

  const handleQuantityChange = (itemId, delta) => {
    const item = orderItems.find(item => item.itemId === itemId);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    dispatch(updateItemQuantity({ itemId, quantity: newQuantity }));
  };

  const handleNoteChange = (itemId, newNote) => {
    dispatch(updateInfoFromClient({ itemId, infoFromClient: newNote }));
  };

  const handleRemove = itemId => {
    dispatch(removeItem(itemId));
  };

// CALCULATIONS 
  const totalValue = orderItems.reduce((sum, item) => {
    const basePrice = item.price * item.quantity;
    const giftCost = item.packAsGift ? GIFT_PACK_COST * item.quantity : 0;
    return sum + basePrice + giftCost;
  }, 0);

  const shippingCost = totalValue >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const totalWithShipping = totalValue + shippingCost;
  const leftToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalValue);

// EMPTY CART INFO 
  if (!orderItems.length) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-muted">
        Twój koszyk jest pusty.{" "}
        <Link to="/" className="text-primary">
          Wróć do zakupów
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-1 md:p-8 bg-surface rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Twój koszyk</h2>

      {/* FREE SHIPPING INFO */}
      {leftToFreeShipping > 0 && (
        <div className="mb-6 p-4 bg-secondary text-white rounded font-semibold text-center">
          Do darmowej wysyłki pozostało: {leftToFreeShipping.toFixed(2)} zł
        </div>
      )}

      {/* ITEMS LIST */}
      <ul className="">
        {orderItems.map((item) => (
          <li key={item.itemId} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b rounded md:border p-5 my-1">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
              <p className="text-sm text-muted">Cena za sztukę: {item.price.toFixed(2)} zł</p>
              <p className="text-sm mt-1">
                Opakowanie na prezent:{" "}
                <span className={item.packAsGift ? "font-bold text-secondary" : "text-muted"}>
                  {item.packAsGift ? `Tak (+ ${GIFT_PACK_COST}  zł/szt.)` : "Nie"}
                </span>
              </p>

              {/* EDIT INFO FROM CLIENT */}
              <textarea
                placeholder="Uwagi do tego produktu..."
                value={item.infoFromClient || ""}
                onChange={(e) => handleNoteChange(item.itemId, e.target.value)}
                className="mt-2 w-full border border-muted rounded p-2 text-text resize-y"
              />
            </div>

            {/* EDIT ITEM */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-lg font-semibold text-primary self-center md:self-auto">
                {(item.price * item.quantity + (item.packAsGift ? GIFT_PACK_COST * item.quantity : 0)).toFixed(2)} zł
              </div>
                <AmountWidget
                  quantity={item.quantity}
                  onChange={(delta) => handleQuantityChange(item.itemId, delta)}
                />
                <button
                  onClick={() => handleRemove(item.itemId)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Usuń
                </button>
            </div>
          </li>
        ))}
      </ul>

      {/* CART SUMMARY */}
      <div className="mt-8 p-6 border-t border-muted bg-background rounded text-right text-lg font-semibold text-primary">
        <p className="mb-1">
          Wartość produktów: <span>{totalValue.toFixed(2)} zł</span>
        </p>
        <p className="mb-1">
          Koszt przesyłki: <span>{shippingCost > 0 ? shippingCost + " zł" : "GRATIS"}</span>
        </p>
        <p className="text-2xl mt-3 border-t border-muted pt-3">
          Do zapłaty: <span>{totalWithShipping.toFixed(2)} zł</span>
        </p>
      </div>

      {/* NAVIGATION  */}
      <div className="mt-8 flex flex-col xs:flex-row justify-between">
        <Link 
          to="/" 
          className="bg-primary text-white text-center px-6 py-3 rounded hover:bg-[#5f172e] transition"
        >
          Kontynuuj zakupy
        </Link>
        <Link 
          to="/summary" 
          className="bg-secondary text-white text-center px-6 py-3 rounded hover:bg-[#b88f21] transition"
        >
          Przejdź do podsumowania
        </Link>
      </div>
    </div>
  );
};

export default Cart;
