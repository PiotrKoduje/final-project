import { useSelector, useDispatch } from "react-redux";
import { getOrderItems, getCustomerData, sendOrderRequest, getOrderRequests, clearOrder } from "../../../redux/orderRedux";
import { Link } from "react-router-dom";
import { useState } from 'react';
import Spinner from "../../common/Spinner/Spinner";
import Alert from "../../common/Alert/Alert";
import ScrollToTop from "../../features/ScrollToTop/ScrollToTop";

// CONSTANS 
const SHIPPING_COST = 30;
const GIFT_PACK_COST = 25;
const FREE_SHIPPING_THRESHOLD = 500;

const Order = () => {
  const dispatch = useDispatch();

  // SELECTORS 
  const customer = useSelector(getCustomerData);
  const items = useSelector(getOrderItems);
  const requests = useSelector(getOrderRequests);

  // LOCAL STATE 
  const [showModal, setShowModal] = useState(false);

  const handleSendOrder = async () => {
    const payload = {
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
      email: customer.email,
      items: items.map((item) => ({
        wineId: item.wineId,
        quantity: item.quantity,
        infoFromClient: item.infoFromClient,
        packAsGift: item.packAsGift,
      })),
    };

    dispatch(sendOrderRequest(payload));
    setShowModal(true);
  };

  // CALCULATIONS 
  const totalValue = items.reduce((sum, item) => {
    const base = item.price * item.quantity;
    const gift = item.packAsGift ? GIFT_PACK_COST * item.quantity : 0;
    return sum + base + gift;
  }, 0);

  const shippingCost = totalValue >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const totalWithShipping = totalValue + shippingCost;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-surface rounded shadow-sm text-text">
      <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Zamówienie gotowe do wysyłki</h2>

      {/* CLIENT DATA */}
      <div className="mb-6 border p-4 rounded bg-background">
        <h3 className="font-semibold text-lg mb-2 text-primary">Dane klienta:</h3>
        <p className="font-bold">Imię i nazwisko: <span className="font-normal">{customer.name}</span></p>
        <p className="font-bold">Adres: <span className="font-normal">{customer.address}</span></p>
        <p className="font-bold">Telefon: <span className="font-normal">{customer.phone}</span></p>
        <p className="font-bold">Email: <span className="font-normal">{customer.email}</span></p>
      </div>

      {/* ITEMS LIST */}
      <div className="mb-6 border p-4 rounded bg-background">
        <h3 className="font-semibold text-lg mb-2 text-primary">Zamówione produkty:</h3>
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.itemId} className="border-b border-muted pb-2">
              <p className="font-bold">{item.name} ({item.quantity} szt.)</p>
              <p>
                Opakowanie:
                <span className={item.packAsGift ? "text-secondary" : "text-muted"}>
                  {item.packAsGift ? ` Tak (+${ GIFT_PACK_COST } zŁ/szt.)` : ' Nie'}
                </span>
              </p>
              {item.infoFromClient && (
                <p>Komentarz: <span className="text-sm italic text-muted">{item.infoFromClient}</span></p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* SUMMARY*/}
      <div className="mb-8 border p-4 rounded bg-background text-right text-lg font-semibold">
        <p className="mb-1">Wartość produktów: <span>{totalValue.toFixed(2)} zł</span></p>
        <p className="mb-1">Koszt przesyłki: <span>{shippingCost > 0 ? `${shippingCost} zł` : "Gratis"}</span></p>
        <p className="text-2xl mt-3 border-t border-muted pt-3">
          Do zapłaty: <span>{totalWithShipping.toFixed(2)} zł</span>
        </p>
      </div>

      {/* NAVIGATION*/}
      <div className="flex justify-between mt-8 flex-col sm:flex-row gap-4">
        <Link to="/cart" className="bg-accent text-white px-5 py-2 rounded hover:bg-text text-center">Wróć do koszyka</Link>
        <Link to="/summary" className="bg-primary text-white px-5 py-2 rounded hover:bg-[#5f172e] text-center">Wróć do podsumowania</Link>
        <button onClick={handleSendOrder} className="bg-secondary text-white px-5 py-2 rounded hover:bg-[#b88f21] text-center">
          Wyślij zamówienie
        </button>
      </div>
      <ScrollToTop />

      {/* MODAL */}
      {showModal && (
      <div className="fixed inset-0 bg-black/40 z-10 flex items-center justify-center">
        <div className="bg-surface rounded-lg shadow-lg p-6 max-w-sm text-center">

          { (requests && requests.error) && <Alert type='error' message={requests.error}/> }
          { (requests && requests.pending) && <Spinner /> }
          { (requests && requests.success) && (<p className="text-primary font-semibold text-lg mb-4">
            Dziękujemy. <br />Twoje zamówienie zosłatło złożone
          </p>)}

          <div className="flex justify-center gap-4 mt-4">
            <Link 
              to="/" 
              onClick={() => {
                setShowModal(false);
                dispatch(clearOrder());
              }
            }
              className="bg-primary hover:bg-[#5f172e] text-white px-4 py-2 rounded"
            >
              Powrót
            </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Order;
