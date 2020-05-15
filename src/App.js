import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

const MainPage = lazy(() => import('./pages/main_page/mainpage.component'));
const ReservationPage = lazy(() => import('./pages/reservation_page/reservation.page.component'));

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Suspense fallback={<h1>loading</h1>}>
              <Route exact path='/home' component={MainPage}/> 
              <Route exact path='/reserve' component={ReservationPage} />
            </Suspense>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
