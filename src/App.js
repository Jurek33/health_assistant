import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import Spinner from './components/spinner/spinner.component';

const MainPage = lazy(() => import('./pages/main_page/mainpage.component'));
const ReservationPage = lazy(() => import('./pages/reservation_page/reservation.page.component'));
const SignInPage = lazy(() => import('./pages/sign-in_page/sign-in.page.component'));
const RegisterPage = lazy(() => import('./pages/register_page/register.page.component'));
const MyAccountPage = lazy(() => import('./pages/my-account_page/my.account.page.component'));
const SettingsPage = lazy(() => import('./pages/settings_page/settings.page.component'));

const App = ({ checkUserSession, currentUser }) => {

    useEffect(() => {
      checkUserSession();
    }, [checkUserSession]);

    return (
        <div className="App">
            <Switch>
              <Suspense 
              fallback={<div className='loading-message'>Loading <Spinner /> </div>}>
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
                <Route 
                exact path='/account'
                render={() =>
                  currentUser ? (<MyAccountPage/>) : (<Redirect to="/"/>)
                }
                />
                <Route 
                exact path='/settings'
                render={() =>
                  currentUser ? (<SettingsPage/>) : (<Redirect to="/"/>)
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

