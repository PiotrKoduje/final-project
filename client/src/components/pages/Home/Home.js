import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadWinesRequest, getWines, getWineRequests } from "../../../redux/winesRedux";

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWinesRequest())
  }, [dispatch]);

  const wines = useSelector(getWines);
  const requests = useSelector(getWineRequests);

  console.log('wines: ', wines);
  console.log('winesRequests: ', requests);

  return(
    <h1>Home</h1>
  )
};
export default Home;