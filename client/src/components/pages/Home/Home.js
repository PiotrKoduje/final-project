import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadWinesRequest, getWines, getWineRequests } from "../../../redux/winesRedux";
import WineSummary from "../../common/WineSummary/WineSummary";
import Spinner from "../../common/Spinner/Spinner";
import Alert from "../../common/Alert/Alert";

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWinesRequest())
  }, [dispatch]);

  const wines = useSelector(getWines);
  const requests = useSelector(getWineRequests);

  // requests.error= true;
  // requests.pending= true;
  // requests.success= true;
  // const wines = [];

  console.log('wines: ', wines);
  console.log('winesRequests: ', requests);

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
};

export default Home;