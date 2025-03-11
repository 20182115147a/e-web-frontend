
import 'swiper/swiper-bundle.css';
import {Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {slides} from '../../assets/variables/variables'


const MySwiper:React.FC = () => {


  return (
    
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      style={{ maxWidth: '1200px', height: 'auto' }}
      autoplay={{ delay: 3000 }}
    >
      {slides.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiper;