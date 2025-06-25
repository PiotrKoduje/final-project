import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderItems, getCustomerData, setCustomerData } from "../../../redux/orderRedux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../common/Alert/Alert";
import ScrollToTop from "../../features/ScrollToTop/ScrollToTop";

// CONSTANS 
const SHIPPING_COST = 30;
const GIFT_PACK_COST = 25;
const FREE_SHIPPING_THRESHOLD = 500;

const Summary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SELECTORS 
  const orderItems = useSelector(getOrderItems);
  const customer = useSelector(getCustomerData);

  // LOCAL STATE 
  const [formData, setFormData] = useState(customer || {
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [completeForm, setcompleteForm] = useState(false); // todo formValidation!
  const [anyItems, setAnyItems] = useState(false);

// UPDATE CLIENT FORM 
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkFormAndOrders = useCallback(() => {
    const formValid = formData.name && formData.email && formData.phone && formData.address;
    formValid ? setcompleteForm(true) : setcompleteForm(false);
    orderItems.length > 0 ? setAnyItems(true) : setAnyItems(false);
  }, [formData, orderItems]);

  useEffect(() => {
    dispatch(setCustomerData(formData));
    checkFormAndOrders();
  }, [formData, dispatch, checkFormAndOrders]);

  const handleContinue = () => {
    if (completeForm && orderItems.length > 0) navigate('/order');
  }

  // CALCULATIONS 
  const totalValue = orderItems.reduce((sum, item) => {
    const base = item.price * item.quantity;
    const gift = item.packAsGift ? GIFT_PACK_COST * item.quantity : 0;
    return sum + base + gift;
  }, 0);

  const shippingCost = totalValue >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const totalWithShipping = totalValue + shippingCost;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Podsumowanie zamówienia</h2>

      {/* ITEMS LIST */}
      <ul className="mb-8">
        {orderItems.map(item => (
          <li key={item.itemId} className="py-4 border-b">
            <h3 className="font-semibold text-primary">{item.name}</h3>
            <p className="text-sm text-muted">Ilość: {item.quantity}</p>
            <p className="text-sm text-muted">Cena jednostkowa: {item.price.toFixed(2)} zł</p>
            {item.packAsGift && (
              <p className="text-sm text-secondary">+ opakowanie prezentowe: { GIFT_PACK_COST } zł/szt.</p>
            )}
            {item.infoFromClient && (
              <p className="text-sm mt-1 italic text-muted">Uwagi: { item.infoFromClient }</p>
            )}
            <p className="text-primary font-semibold mt-1">
              {(item.price * item.quantity + (item.packAsGift ? GIFT_PACK_COST * item.quantity : 0)).toFixed(2)} zł
            </p>
          </li>
        ))}
      </ul>

      { !anyItems && <Alert type='warning' message='Brak produktów'/> }

      {/* CLIENT FORM*/}
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-primary">Dane kontaktowe</h3>

        <input
          type="text"
          name="name"
          placeholder="Imię i nazwisko"
          value={ formData.name }
          onChange={ handleChange }
          required
          className="w-full border border-muted rounded p-2 text-text"
        />

        <input
          type="email"
          name="email"
          placeholder="Adres e-mail"
          value={ formData.email }
          onChange={ handleChange }
          required
          className="w-full border border-muted rounded p-2 text-text"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Telefon kontaktowy"
          value={ formData.phone }
          onChange={ handleChange }
          required
          className="w-full border border-muted rounded p-2 text-text"
        />

        <textarea
          name="address"
          placeholder="Adres dostawy"
          value={ formData.address }
          onChange={ handleChange }
          required
          className="w-full border border-muted rounded p-2 text-text resize-y"
        />

        { !completeForm && <Alert type='warning' message='Uzupełnij wszystkie dane kontaktowe'/> }
      </div>

      {/* SUMMARY*/}
      <div className="p-6 border-t border-muted bg-background rounded text-right text-lg font-semibold text-primary">
        <p className="mb-1">
          Wartość produktów: <span>{totalValue.toFixed(2)} zł</span>
        </p>
        <p className="mb-1">
          Koszt przesyłki: <span>{(orderItems.length && shippingCost) > 0 ? shippingCost : '0.00'} zł</span>
        </p>
        <p className="text-2xl mt-3 border-t border-muted pt-3">
          Do zapłaty: <span>{orderItems.length ? totalWithShipping.toFixed(2) : '0.00'} zł</span>
        </p>
      </div>

      {/* NAVIGATION*/}
      <div className="mt-8 flex flex-col xs:flex-row justify-between">
        <Link
          to="/cart"
          className="bg-accent text-white text-center px-6 py-2 rounded hover:bg-text"
        >
          Wróć do koszyka
        </Link>
        <button
          onClick = {() => handleContinue()}
          className="bg-secondary text-white px-6 py-2 rounded hover:bg-[#b88f21]"
        >
          Przejdź dalej
        </button>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Summary;
