import { createSelector } from 'reselect'

const selectShop = state => state.shop 

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

//convert collection object to array
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => 
    collections ? Object.keys(collections).map(key => collections[key]) : []
)

// get data from collection object
export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
    )