import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

const MainPage = lazy(() => import('./pages/main_page/mainpage.component'));
const ReservationPage = lazy(() => import('./pages/reservation_page/reservation.page.component'));
const SignInPage = lazy(() => import('./pages/sign-in_page/sign-in.page.component'));
const RegisterPage = lazy(() => import('./pages/register_page/register.page.component'));

class App extends Component {
constructor() {
  super();
  this.state = {
    currentUser: null
  }
}

unsubscribeFromAuth = null;

componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth) {
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot => {
        this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        }, () => console.log(this.state))
      })
    } else {
      this.setState({
        currentUser: userAuth
      }, () => console.log(this.state))
    }
  })
}

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Suspense fallback={<h1>loading</h1>}>
              <Route exact path='/home' component={MainPage}/> 
              <Route exact path='/reserve' component={ReservationPage} />
              <Route exact path='/' component={SignInPage} />
              <Route exact path='/register' component={RegisterPage} />
            </Suspense>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
