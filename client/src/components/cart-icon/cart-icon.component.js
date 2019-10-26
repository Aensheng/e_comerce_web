import React from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toogleCartHidden } from '../../redux/cart/cart.actions'

import './cart-icon.styles.scss'

const CartIcon = ({ toogleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toogleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toogleCartHidden: () => dispatch(toogleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount : selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)