import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { loadCountryWinesRequest, getCountryWines, getCountryWineRequests, } from "../../../redux/winesRedux";
import WineSummary from "../../common/WineSummary/WineSummary";
import Spinner from "../../common/Spinner/Spinner";
import Alert from "../../common/Alert/Alert";
import { whichCountry } from "../../../utils/whichCountry";

const CountryWines = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wines = useSelector(getCountryWines);
  const requests = useSelector(getCountryWineRequests);

  const { country } = useParams();
  const [countryName, setCountryName] = useState('');
  
  useEffect(() => {
    if (country) {
      const region = whichCountry(country);
      setCountryName(region);
    }
  }, [country]);
  
  useEffect(() => {
    if(countryName === 'wszystkie') {
      navigate('/')
    }
    else if (countryName){
      dispatch(loadCountryWinesRequest(countryName))
    }
  },[dispatch, countryName]);

  // requests.error= null;
  // requests.pending= true;
  // requests.success= false;
  // const wines = [];

  return(
    <div className="flex flex-wrap justify-center gap-6">
      { (requests && requests.pending) && <Spinner /> }
      { (requests && requests.error) && <Alert type='error' message='Ups... Coś poszło nie tak. Spróbuj później'/> }
      { (requests && requests.success) && wines.map((wine) => (
        <div key={wine.id} className="flex w-full sm:w-[48%] md:w-[31%] lg:w-[23%] min-w-[200px]">
          <WineSummary {...wine} />
       </div>
      ))}
    </div>
  )
}

export default CountryWines;