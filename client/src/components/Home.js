import React, { useEffect } from "react";
import "./Home.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getInfos } from "../redux/actions/infoAction";
import HomeInfo from "./HomeInfo";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { infos, error } = useSelector((state) => state.infos);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getInfos());
  }, [dispatch, error, alert]);

  return (
    <div className="Home">
      <div className="Home_content">
        {infos && infos.map((item) => <HomeInfo key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default Home;
