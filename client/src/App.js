
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import SingleRoom from './pages/SingleRoom';
import Rooms from './pages/Rooms';
import Error from './pages/Error';
import { Route, Switch } from 'react-router';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from './components/Footer';
import axios from 'axios';
import { useContext } from 'react';
import { RoomContext } from './context';
import Login from './pages/Login';
import SignUp from './pages/SingUp';
import RoomOrder from './pages/RoomOrder';
function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const context=useContext(RoomContext)
  useEffect(() => {
    const token = context.getToken();
    if (!token) {
      return;
    }
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      context.setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
       context.removeUserSession();
      setAuthLoading(false);
    });
  }, []);

 /*  if (authLoading && context.getToken()) {
    console.log(context.getToken())
    return <div className="content">Checking Authentication...</div>
  }
 */
  return <>
    <Navbar></Navbar>
    <Switch>
      <PublicRoute path='/' component={Home} exact></PublicRoute>
      <PublicRoute path='/rooms' exact component={Rooms}></PublicRoute>
      <PublicRoute path='/rooms/:slug' exact component={SingleRoom}></PublicRoute>
      <PublicRoute path='/login' exact component={Login}></PublicRoute>
      <PublicRoute path='/signup' exact component={SignUp}></PublicRoute>
      <PrivateRoute path='/order/:slug' exact component={RoomOrder}></PrivateRoute>
      <Route component={Error}></Route>
    </Switch>
    <Footer></Footer>
  </>;
}

export default App;
