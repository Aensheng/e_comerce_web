import React , { useEffect } from 'react';
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions'



const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage}/> 
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage}/> 
        <Route 
          exact 
          path='/signin' 
          render={() => currentUser ? (<Redirect to='/' />): (<SignInAndSignOut />)}
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
