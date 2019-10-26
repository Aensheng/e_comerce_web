import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector'
import PreviewCollection from '../../components/preview-collection/perview-collection.component'


import './collection-overview.styles.scss'

const CollectionOverview = ({ collections }) => (
    <div className='collections-overview'>
        {
            collections.map(({id, ...otherProps}) => (
                <PreviewCollection key={id} {...otherProps}/>
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview)