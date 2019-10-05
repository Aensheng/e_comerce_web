export const addItemToCart = (cartIems, cartIemToAdd) => {
    const existing = cartIems.find(
        cartIem => cartIem.id === cartIemToAdd.id
    )

    if (existing) {
        return cartIems.map(cartIem =>
            cartIem.id === cartIemToAdd.id 
            ? {...cartIem, quantity: cartIem.quantity + 1}
            : cartIem
        )
    }

    return [...cartIems, {...cartIemToAdd, quantity: 1}]
}

export const removeItemToCart = (cartIems, cartIemToRemove) => {
    const existing = cartIems.find(
        cartIem => cartIem.id === cartIemToRemove.id
    )

    if (existing.quantity === 1) {
        return cartIems.filter(cartIem => cartIem.id !== cartIemToRemove.id)
    }

    return cartIems.map(cartIem =>
        cartIem.id === cartIemToRemove.id 
        ? {...cartIem, quantity: cartIem.quantity - 1}
        : cartIem)
}