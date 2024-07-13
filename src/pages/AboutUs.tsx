import { Card, Col, Flex, Row } from "antd";
import { FaFacebookSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";
import CommonSectionBanner from "../components/helpingCompo/CommonSectionBanner";
import Team from "../components/AboutUs/Team";
import CommonSectionBannerTwo from "../components/helpingCompo/CommonSectionBannerTwo";
import Container from "../components/ui/Container";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import MyMotion from "../components/helpingCompo/MyMotion";
import Testimonial from "../components/AboutUs/Testimonial";
const AboutUs = () => {
  const socialInfo = [
    {
      id: 1,
      title: "facebook",
      icon: <FaFacebookSquare size={20} />,
      link: "https://www.facebook.com/icchaporon.com.bd",
    },
    {
      id: 2,
      title: "linkedin",
      icon: <FaLinkedin size={20} className="mt-[2px] rounded" />,
      link: "https://www.facebook.com/icchaporon.com.bd",
    },
    {
      id: 3,
      title: "youtube",
      icon: <FaYoutube size={20} />,
      link: "https://www.facebook.com/icchaporon.com.bd",
    },
  ];
  const slides = [
    "https://i.ibb.co/CQ5GccL/web-traffic.png",
    "https://i.ibb.co/W5rgv81/settings.png",
    "https://i.ibb.co/1rHMrC4/budget.png",
    "https://i.ibb.co/CQ5GccL/web-traffic.png",
    "https://i.ibb.co/k3RB19Y/laptop.png",
    "https://i.ibb.co/CQ5GccL/web-traffic.png",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // swiper component
  /* const SwiperComponent = ({ slides, buttonPrev, buttonNext, activeIndex }) => {
  return (
    <div className="relative bg-white rounded-lg mt-10 py-2 px-2 border border-gray w-[400px]">
      <Swiper
        slidesPerView={4}
        loop={true}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: `.${buttonNext}`,
          prevEl: `.${buttonPrev}`,
        }}
      >
        {slides.map((elem, i) => (
          <SwiperSlide key={i}>
            <div className="w-20 p-2 border border-blue-200 rounded-lg">
              <img className="w-full" src={elem} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-10 flex justify-between  w-full">
        <div className={`button-prev cursor-pointer -ml-5 bg-white rounded-full ${activeIndex ? "text-blue-400" : "text-gray"}`}>
          <IoIosArrowDropleft size={20} />
        </div>
        <div className={`button-next cursor-pointer -mr-1 bg-white rounded-full ${activeIndex ? "text-gray" : "text-blue-400"}`}>
          <IoIosArrowDropright size={20} />
        </div>
      </div>
    </div>
  );
}; */

  return (
    <div className="bg-slate-50">
      <Container>
        <MyMotion y={200}>
          <div className="my-container xl:px-20 py-20">
            <Row gutter={[128, 32]} justify="center">
              <Col xs={24} lg={10}>
                <div className="bg-white rounded-t-full p-3 rounded-l-lg shadow-xl h-[400px] w-[400px] border border-warning">
                  <img
                    className="rounded-t-full w-full h-full"
                    src="https://athletechnews.com/wp-content/uploads/2020/09/fitness-ecommerce-future-news.jpg"
                    alt=""
                  />
                </div>
                {/* <SwiperComponent slides={slides} slidesPerView={slidesPerView}></SwiperComponent> */}
                <div className="relative bg-white rounded-lg mt-10 py-2 px-2 border border-gray w-[400px]">
                  <Swiper
                    slidesPerView={4}
                    loop={true}
                    spaceBetween={20}
                    freeMode={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation]}
                    navigation={{
                      nextEl: ".button-next2",
                      prevEl: ".button-prev2",
                    }}
                    onSlideChange={handleSlideChange}
                  >
                    {slides.map((elem, i) => (
                      <SwiperSlide key={i}>
                        <div className="w-20 p-2 border border-blue-200 rounded-lg">
                          <img className="w-full" src={elem} alt="" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="absolute bottom-10 flex justify-between  w-full">
                    <div
                      className={`button-prev2 cursor-pointer -ml-5 bg-white rounded-full ${
                        activeIndex ? "text-blue-400" : "text-gray"
                      }`}
                    >
                      <IoIosArrowDropleft size={20} />
                    </div>
                    <div
                      className={`button-next2 cursor-pointer -mr-1 bg-white rounded-full ${
                        activeIndex ? "text-gray" : "text-blue-400"
                      }`}
                    >
                      <IoIosArrowDropright size={20} />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={14}>
                <h2 className=" text-2xl md:text-4xl font-bold mb-2 text-primary">
                  TEAM OVERVIEW
                </h2>
                <p className="text-slate-800">
                  {" "}
                  Welcome to Fit Mart, your premier destination for top-quality
                  fitness products. Founded with the mission to make fitness
                  accessible and enjoyable for everyone, we offer a wide range
                  of carefully curated items designed to meet all your health
                  and wellness needs. From state-of-the-art gym equipment and
                  workout apparel to nutritional supplements and wellness
                  accessories, Fit Mart is your one-stop shop for everything
                  fitness.
                  <br />
                  <br />
                  At Fit Mart, we understand that achieving your fitness goals
                  requires the right tools and support. That’s why we prioritize
                  customer satisfaction by providing exceptional service,
                  reliable support, and expert advice to help you make the best
                  choices for your fitness journey. Our team is composed of
                  fitness enthusiasts and professionals dedicated to helping you
                  stay motivated and reach your full potential.
                  <br />
                  <br />
                  We pride ourselves on offering high-quality products from
                  trusted brands, ensuring that you receive only the best.
                  Whether you are setting up a home gym, looking to enhance your
                  workout routine, or seeking nutritional supplements to boost
                  your performance, Fit Mart has you covered.
                  <br />
                  <br />
                  Join us on our journey to promote a healthier and fitter
                  lifestyle. Explore our extensive product range, enjoy seamless
                  shopping experiences, and benefit from our commitment to
                  excellence. At Fit Mart, we are more than just a store; we are
                  your partner in achieving a healthier, happier you.
                  <br />
                  <br />
                  Stay fit, stay healthy with Fit Mart!
                </p>
              </Col>
            </Row>
          </div>
        </MyMotion>

        {/* Team */}
        <MyMotion y={-200}>
          <Team />
        </MyMotion>

        {/* Testimonial */}
        <MyMotion y={200}>
          <Testimonial />
        </MyMotion>

        {/* Contact info */}

        <MyMotion scale={2}>
          <div className="my-4 my-bg-gradient-1 rounded-md shadow-lg p-4">
            <CommonSectionBannerTwo
              title="Contact Info"
              subTitle="Get in touch with us for any queries or assistance. Visit our office, call us, or email us. We're here to help!"
            />
            <div className="flex flex-wrap justify-between gap-4 w-full py-4">
              <Card className="sm:flex-1 w-full sm:w-fit shadow-lg text-slate-800 my-white">
                <div className="mb-4 flex items-center">
                  <HomeOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-700">North Badda, Dhaka</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <PhoneOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-700">0170678-5160</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <MailOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-700">contact@fitmart.com</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <MailOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Corporate sale</h3>
                    <p className="text-gray-700">corporate@fitmart.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MailOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Retailer sale</h3>
                    <p className="text-gray-700">retailer@fitmart.com</p>
                  </div>
                </div>
              </Card>
              <div className="sm:flex-1 w-full sm:w-fit">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d58414.52756073087!2d90.4298496!3d23.786291199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sbd!4v1720887508064!5m2!1sen!2sbd"
                  className="w-full border-0 h-[350px] rounded-lg"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </MyMotion>
      </Container>
    </div>
  );
};

export default AboutUs;
