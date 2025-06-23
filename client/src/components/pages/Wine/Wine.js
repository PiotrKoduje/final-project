import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { getWine, loadWineRequest, getWineRequests } from "../../../redux/winesRedux";
import WineDetails from "../../features/WineDetails/WineDetails";
import Spinner from "../../common/Spinner/Spinner";
import Alert from "../../common/Alert/Alert";

const Wine = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const wine = useSelector(state => getWine(state, id));
  const requests = useSelector(getWineRequests);

  useEffect(() => {
    if(id && !wine) dispatch(loadWineRequest(id));
  }, [dispatch, wine, id]);

return(
  <div className="flex flex-wrap justify-center gap-6">
    { (requests && requests.pending) && <Spinner /> }
    { (requests && requests.error) && <Alert type='error' message='Ups... Coś poszło nie tak. Spróbuj później'/> }
    { (requests && wine && requests.success) && <WineDetails { ...wine } /> }
  </div>
)
}

export default Wine;



