import { Card, Col, Row } from "antd";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import CommonSectionBannerTwo from "../helpingCompo/CommonSectionBannerTwo";
import Container from "../ui/Container";

// import './styles.css';

// import required modules
// import { Autoplay, Navigation } from "swiper/modules";

const Testimonial = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      // Calculate the number of slides per view based on window width
      if (window.innerWidth >= 992) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 433) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial calculation
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const testimonials = [
    {
      name: "Jeshika Do",
      title: "Customer Review",
      profession: "Software developer",
      image: "https://i.ibb.co/WFQQx2w/girl-3-Copy.jpg",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      title: "Customer Review",
      profession: "Software developer",
      image: "https://i.ibb.co/h2b73Mz/man-4.jpg",
      comment:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4,
    },
    {
      name: "Alice Johnson",
      title: "Customer Review",
      profession: "Software developer",
      image: "https://i.ibb.co/khm61t0/man-2-Copy.jpg",
      comment:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      rating: 5,
    },
    {
      name: "Bob Moumita",
      title: "Customer Review",
      profession: "Software developer",
      image: "https://i.ibb.co/dBjQf2V/man-1.jpg",
      comment:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      rating: 3,
    },
  ];

  return (
    <div className="my-bg-gradient-1 py-20 px-10">
      <Container>
        <CommonSectionBannerTwo
          title="Testimonial"
          subTitle={<>What our customer say about us</>}
        />

        <Row>
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={15}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper mt-10 pb-10"
            // style={{ minHeight: "300px" }}
          >
            {testimonials?.map((testimonial, ind) => {
              return (
                <SwiperSlide key={ind}>
                  <Col className="">
                    <Card bordered={false} className="p-5 h-full min-h-[280px]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="rounded-full border border-primary-1 p-1">
                          <img
                            className="w-12 rounded-full"
                            src={testimonial.image}
                            alt=""
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-bold my-text-gradient-2 inline-block">
                            {testimonial.name}
                          </p>
                          <p className="text-normal-desc">
                            {testimonial.profession}
                          </p>
                        </div>
                      </div>

                      <br></br>
                      <h2 className="text-left font-bold">
                        {testimonial.title}
                      </h2>
                      <p className="text-left text-normal-desc">
                        {testimonial.comment}
                      </p>
                    </Card>
                  </Col>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>
      </Container>
    </div>
  );
};

export default Testimonial;
