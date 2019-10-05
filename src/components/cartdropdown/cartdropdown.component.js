import React from 'react'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toogleCartHidden } from '../../redux/cart/cart.actions'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'


import { connect } from 'react-redux'

import './cartdropdown.styles.scss'

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length ?
               (cartItems.map(cartItem => (
                   <CartItem key={cartItem.id} item={cartItem} />
               )) 
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )
            }
        </div>
        <CustomButton onClick={() => 
            {history.push('/checkout')
            dispatch(toogleCartHidden())}}>
            Check Out
        </CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))