import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price*100
    const publishablekey = 'pk_test_8fxzdyhCfHsWNDt39ftZ67je00s2jwZ86B'

    const onToken = token => {
        alert('Payment Successful')
    }

    return(
        <StripeCheckout
            lable='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    )

}

export default StripeCheckoutButton