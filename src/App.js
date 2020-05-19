import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

const MainPage = lazy(() => import('./pages/main_page/mainpage.component'));
const ReservationPage = lazy(() => import('./pages/reservation_page/reservation.page.component'));
const SignInPage = lazy(() => import('./pages/sign-in_page/sign-in.page.component'));
const RegisterPage = lazy(() => import('./pages/register_page/register.page.component'));

const App = ({ checkUserSession, currentUser }) => {

    useEffect(() => {
      checkUserSession();
    }, [checkUserSession]);

    return (
        <div className="App">
            <Switch>
              <Suspense fallback={<h1>loading</h1>}>
                <Route 
                exact path='/reserve' 
                render={() => 
                  currentUser ? (<ReservationPage/>) : (<Redirect to='/'/>)
                } 
                />
                <Route 
                exact path='/register'
                render={() => 
                  !currentUser ? (<RegisterPage/>) : (<Redirect to='/home'/>)
                }
                />
                <Route 
                exact path='/home'
                render={() => 
                  currentUser ? (<MainPage/>) : (<Redirect to='/'/>)
                }
                /> 
                <Route 
                exact path='/'
                render={() =>
                  currentUser ? (<Redirect to="/home"/>) : (<SignInPage/>)
                }
                />
              </Suspense>
            </Switch>
        </div>
      );
  }

  const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
  });
  
  const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);

// constructor() {
//   super();
//   this.state = {
//     currentUser: null
//   }
// }

// unsubscribeFromAuth = null;

// componentDidMount() {

//   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//     if(userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);
//         userRef.onSnapshot(snapShot => {
//           this.setState({
//             currentUser: {
//               id: snapShot.id,
//               ...snapShot.data()
//             }
//           }, () => console.log(this.state))
//         })
//       } else {
//         this.setState({
//           currentUser: userAuth
//         }, () => console.log(this.state))
//       } 
//     }  
    
//   )
// }

// componentWillUnmount() {
//   this.unsubscribeFromAuth();
// }
