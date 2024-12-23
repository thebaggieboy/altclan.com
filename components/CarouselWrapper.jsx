import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'

import { createElement, Fragment, useRef } from 'react'

import chevR from '../public/assets/chev-r.svg'
import chevL from '../public/assets/chev-l.svg'
import Image from 'next/image'

const CarouselWrapper = ( { children,key,alt, controls = false, ...otherConfigProps } ) => {
    const swiperElRef = useRef( null );

    return (
        <Swiper key={key} modules={ [Pagination, Autoplay] }
            { ...otherConfigProps }
            ref={ swiperElRef }>
            {//clones children elements and wraps them each in a swiper-slide
                children?.map( ( child ) => {
                    return <SwiperSlide key={key}>
                        { createElement( Fragment, null, child ) }
                    </SwiperSlide>
                } )
            }
            {
                controls && (
                    <div key={key} slot='container-end' className='flex justify-center gap-4'>
                        <button data-control='next' onClick={ () => swiperElRef.current.swiper.slidePrev() }>
                            <Image src={ chevL } width={ 30 } height={ 30 } alt='control' className='w-8 h-8' />
                        </button>
                        <button data-control='prev' onClick={ () => swiperElRef.current.swiper.slideNext() }>
                            <Image src={ chevR } width={ 30 } height={ 30 } alt='control' className='w-8 h-8' />
                        </button>
                    </div>
                )
            }
        </Swiper>
    )
}

export default CarouselWrapper