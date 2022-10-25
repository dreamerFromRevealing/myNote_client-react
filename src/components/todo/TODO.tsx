import React, {useEffect, useState} from 'react';
import TodoBoard from "./TODOBoard";
import {Swiper, SwiperSlide} from "swiper/react";
import Box from "@mui/material/Box";
import {useMediaQuery} from "@mui/material";

const TODO = () => {
  const isMobile = useMediaQuery('(max-width:767px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (isMobile) {
      setCount(1);
    } else if (isTablet) {
      setCount(2);
    } else {
      setCount(3);
    }
  }, [isMobile, isTablet]);

  return (
    <Box sx={{p: '10px 10px 0 10px'}}>
      <Swiper
        spaceBetween={50}
        slidesPerView={count}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide><TodoBoard color={'#c72828'} title={'To do'}/></SwiperSlide>
        <SwiperSlide><TodoBoard color={'#c72828'} title={'In progress'}/></SwiperSlide>
        <SwiperSlide><TodoBoard color={'#c72828'} title={'Completed'}/></SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default TODO;