import React, { useEffect } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//import { IRootState } from "../../store/Reducers/index";

const SpotifyLogin: React.FC<RouteComponentProps> = (): JSX.Element => {
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   axiosCall()
  // },[])

  return <a href="/auth/spotifyRoutes/login">Login to spotify!</a>;
};

//move this to own folder
// const axiosCall = async() =>{
//   try{
//     const data = await axios.get('/auth/spotifyRoutes/login')
//     console.log(data)
//   }catch(err){
//     console.log('login to spotify failed')
//   }
// }

export default withRouter(SpotifyLogin);
