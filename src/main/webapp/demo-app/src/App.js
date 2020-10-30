import './App.css';
import Header from './components/Header';
import { Route } from 'react-router-dom';
import JoinForm from './pages/member/JoinForm';
import { useEffect } from 'react';
import LoginForm from './pages/member/LoginForm';
import { useDispatch } from 'react-redux';
import { login } from './store';
import Home from './pages/Home';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    let jwtToken = localStorage.getItem("Authorization");
    if(jwtToken !== null ){
      dispatch(login());
    }
  }, []);
  return (
    <div>
      <Header />

      {/* 라우터연결 */}
      <Route path="/" exact={true} component={Home} />
      <Route path="/joinForm" exact={true} component={JoinForm} />
      <Route path="/loginForm" exact={true} component={LoginForm} />
    </div>
  );
}

export default App;
