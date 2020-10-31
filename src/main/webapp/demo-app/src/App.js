import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import List from './pages/post/List';
import SavaForm from './pages/post/SavaForm';
import LoginForm from './pages/member/LoginForm';
import JoinForm from './pages/member/JoinForm';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from './store';


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
      <Route path="/post" exact={true} component={List} />
      <Route path="/saveForm" exact={true} component={SavaForm} />
      {/* <Route path="/writeForm" exact={true} component={WriteForm} /> */}
    </div>
  );
}

export default App;
