import { useState } from 'react'
import heart from '../../public/assets/heart.svg'
import Image from 'next/image'

import img from '../../public/assets/image.webp'

const BrandCard = ({id, brand_name, img}) => {
  const [liked, setLiked] = useState( false )

  return (
    <div className='product-card'>
      <div className="product-card__img">
        {/* <img src={ img } /> */}
      </div>
      <div className="product-card__content">
        <div className="product-card__info">
          <h1 className="product-card__name">Brand Name </h1>

        </div>
        <button onClick={ () => setLiked( !liked ) } className='product-card__like'>
          <i><Image src={ heart } className={ `heart-svg ${liked ? 'active' : ''}` } /></i>
        </button>
      </div>
    </div>
  )
}

export default BrandCard