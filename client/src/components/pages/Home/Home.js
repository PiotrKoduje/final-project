import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadWinesRequest, getWines, getWinesRequests } from "../../../redux/winesRedux";
import WineSummary from "../../common/WineSummary/WineSummary";
import Spinner from "../../common/Spinner/Spinner";
import Alert from "../../common/Alert/Alert";

const Home = () => {
  const dispatch = useDispatch();

  const wines = useSelector(getWines);
  const requests = useSelector(getWinesRequests);

  useEffect(() => {
    if(wines.length === 0) {
      dispatch(loadWinesRequest())
    }
  }, [dispatch, wines.length]);

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
          <WineSummary { ...wine } />
        </div>
      ))}
    </div>
  )
};

export default Home;