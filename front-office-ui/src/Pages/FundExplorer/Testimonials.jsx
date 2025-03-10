import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box } from "@mui/material";
import testimonial from '../../images/testimonial.png';
import testimonial1 from '../../images/testimonial1.png';
import testimonial2 from '../../images/testimonial2.png';
import testimonial3 from '../../images/testimonial3.png';


const logos = [testimonial, testimonial1, testimonial2, testimonial3, testimonial, testimonial1];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
function Testimonials() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto', mt: 0 }}>
      <Slider {...settings}>
        {logos?.map((logo, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              padding: 2,
            }}
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              style={{
                width: '80px',      // Small size
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'contain',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Testimonials;


