import React, { lazy, Suspense, useEffect, useState, createContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import Spinner from './components/spinner/spinner.component';

import { themes } from './themes/theme.definitions';
import { MainDiv } from './themes/themes.component';

const MainPage = lazy(() => import('./pages/main_page/mainpage.component'));
const ReservationPage = lazy(() => import('./pages/reservation_page/reservation.page.component'));
const SignInPage = lazy(() => import('./pages/sign-in_page/sign-in.page.component'));
const RegisterPage = lazy(() => import('./pages/register_page/register.page.component'));
const MyAccountPage = lazy(() => import('./pages/my-account_page/my.account.page.component'));
const SettingsPage = lazy(() => import('./pages/settings_page/settings.page.component'));

export const ThemeContext = createContext(themes.light);

const App = ({ checkUserSession, currentUser }) => {
  const [state, setState] = useState({light: true, dark: false, standard: false});
  const { light, dark } = state;
  const switchColor = () => setState({light: true, dark: false, standard: false});
  const switchDark = () => setState({light: false, dark: true, standard: false});
  const switchStandard = () => setState({light: false, dark: false, standard: true});

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <ThemeContext.Provider value={light ? themes.light: dark? themes.dark: themes.standard}>
      <MainDiv className="App">
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
                currentUser ? (
                <SettingsPage 
                switchColor={switchColor} 
                switchDark={switchDark}
                switchStandard={switchStandard}
                />) : (<Redirect to="/"/>)
              }
              />
            </Suspense>
          </Switch>
        </MainDiv>
    </ThemeContext.Provider>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
  
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

