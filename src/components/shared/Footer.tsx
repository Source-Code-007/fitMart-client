import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagramSquare,
  FaYoutube,
} from "react-icons/fa";
import { Col, Row, Typography, Input, Space } from "antd";
// import logo from "../../../Assets/log-l.svg"
import { MdLocationOn, MdEmail, MdCall } from "react-icons/md";
import { useState } from "react";
import { BsCursorFill } from "react-icons/bs";
import Container from "../ui/Container";

const socialInfo = [
  {
    id: 1,
    title: "facebook",
    icon: <FaFacebookSquare size={22} />,
    link: "https://www.facebook.com/icchaporon.com.bd",
  },
  {
    id: 2,
    title: "instagram",
    icon: <FaInstagramSquare size={22} />,
    link: "https://www.facebook.com/icchaporon.com.bd",
  },
  {
    id: 3,
    title: "linkedin",
    icon: <FaLinkedin size={22} />,
    link: "https://www.facebook.com/icchaporon.com.bd",
  },
  {
    id: 4,
    title: "youtube",
    icon: <FaYoutube size={22} />,
    link: "https://www.facebook.com/icchaporon.com.bd",
  },
];

const Footer = () => {
  const { Text } = Typography;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <footer className="text-white footer-bg drop-shadow-md">
      <Container>
        <div className="mb-16 grid grid-cols-2 gap-5 pt-10 md:grid-cols-4 lg:grid-cols-6 xl:gap-12 lg:pt-12 px-4 md:px-8">
          <div className="col-span-full lg:col-span-2">
            {/* <!-- logo - start --> */}
            <div className="mb-4 lg:-mt-2">
              <Link
                to="#"
                className="inline-flex items-center gap-2 text-xl font-bold text-primary-2 md:text-2xl"
                aria-label="logo"
              >
                {/* <img src={logo} className="w-64" alt="" /> */}
                Fit Mart
              </Link>
            </div>
            {/* <!-- logo - end --> */}

            <Typography.Text className="mb-6 text-grey sm:pr-8">
              Whether you need durable cases, innovative gadgets, or stylish
              accessories, icchaporon.com has it all. Our collection features
              top brands, offering the best in quality and design.
            </Typography.Text>
            <div className=" flex flex-col gap-3 my-8">
              <div className="flex gap-3 items-center">
                <MdLocationOn className="text-primary" size={24} />
                <Link
                  to="#"
                  className=" text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-sm"
                >
                  Road # 03, House # 03, Nikunja 02, <br /> Dhaka Bangladesh
                  1229
                </Link>
              </div>
              <div className="flex gap-3 items-center">
                <MdCall className="text-primary" size={24} />
                <Link
                  to="#"
                  className=" text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-sm"
                >
                  +8801721-815355
                </Link>
              </div>
              <div className="flex gap-3 items-center">
                <MdEmail className="text-primary" size={24} />
                <Link
                  to="#"
                  className=" text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-sm"
                >
                  fitmart@gmail.com
                </Link>
              </div>
            </div>

            {/* <!-- social - start --> */}
            <div className="flex gap-4">
              {socialInfo?.map((social, i) => (
                <Link
                  key={i}
                  to={social.link}
                  target="_blank"
                  className="text-gray transition duration-100 hover:text-gray focus:text-gray-600"
                >
                  {/* < size={22} /> */}
                  {social.icon}
                </Link>
              ))}
            </div>
            {/* <!-- social - end --> */}
          </div>

          {/* <!-- nav - start --> */}
          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-gray-100">
              Products
            </div>

            <nav className="flex flex-col gap-4">
              <div>
                <Link
                  to="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  Overview
                </Link>
              </div>

              <div>
                <Link
                  to="#"
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  Pricing
                </Link>
              </div>

              <div>
                <Link
                  to="#"
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  Customers
                </Link>
              </div>
            </nav>
          </div>
          {/* <!-- nav - end --> */}

          {/* <!-- nav - start --> */}
          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-gray-100">
              Company
            </div>

            <nav className="flex flex-col gap-4">
              <div>
                <Link
                  to="/about-us"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  About
                </Link>
              </div>

              {/* <div>
                <Link
                  to="#"
                  className="text-gray-400 transition duration-100 hover:text-blue-500 active:text-blue-600"
                >
                  Investor Relations
                </Link>
              </div> */}

              {/* <div>
                <Link
                  to="#"
                  className="text-gray-400 transition duration-100 hover:text-blue-500 active:text-blue-600"
                >
                  Jobs
                </Link>
              </div> */}

              <div>
                <Link
                  to="#"
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  Press
                </Link>
              </div>

              <div>
                <Link
                  to="/blog"
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  Blog
                </Link>
              </div>
            </nav>
          </div>
          {/* <!-- nav - end --> */}

          {/* <!-- nav - start --> */}
          <div>
            <div className="mb-4 font-bold uppercase tracking-widest ">
              Support
            </div>

            <nav className="flex flex-col gap-4">
              <div>
                <Link
                  to="/contact-us"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  Contact
                </Link>
              </div>

              {/* <div>
                <Link
                  to="documentation"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray transition duration-100 hover:text-blue-500 active:text-blue-600 text-sm"
                >
                  Documentation
                </Link>
              </div> */}

              <div>
                <Link
                  to="#"
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  Chat
                </Link>
              </div>

              <div>
                <Link
                  to="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2 text-xs"
                >
                  FAQ
                </Link>
              </div>
            </nav>
          </div>
          {/* <!-- nav - end --> */}

          {/* newsletter start*/}
          <Col className="">
            <h1 className="mb-4 font-bold uppercase tracking-widest ">
              Newsletter
            </h1>
            <Text className="text-grey">
              {/* Subscribe our newsletter to get our latest update and news. */}
              Get our latest product and special offers <br /> by subscribing to
              our newsletter
            </Text>
            <br />
            <div className="navbar-center my-5">
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input
                  className=" rounded-l-md border border-primary-2 focus:outline-none focus:shadow-none  hover:border-primary-2 focus:border-primary-2 hover:border-2 "
                  placeholder="Email Address"
                />

                <button className="bg-primary-2 p-3 rounded-r-md border-r border-primary-2 hover:border-r  hover:border-primary-2 text-white">
                  <BsCursorFill className="hover:scale-75" />
                </button>
              </Space.Compact>
            </div>
          </Col>
          {/* newsletter end */}

          {/* <div className="col-span-3 md:col-span-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
            </div>
          </div> */}
        </div>
      </Container>
      <div className="bg-[#242525]">
        <Container>
          <Row
            gutter={[16, 16]}
            justify="space-between"
            align="middle"
            className=" px-4 md:px-8 py-5  pb-3 text-center text-sm text-gray-400"
          >
            {/* legal */}
            <Col
              xs={24}
              lg={12}
              xl={8}
              className="flex justify-center lg:justify-start"
            >
              <nav className="flex flex-row gap-4">
                <div className="">
                  <Link
                    to="termsOfService"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className=" text-gray transition duration-100 hover:text-primary-2 active:text-primary-2 focus:text-primary-2"
                  >
                    Terms of Service
                  </Link>
                </div>

                <div>
                  <Link
                    to="/privacyPolicy"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2"
                  >
                    Privacy Policy
                  </Link>
                </div>

                <div>
                  <Link
                    to="#"
                    onClick={toggleSidebar}
                    className="text-gray transition duration-100 hover:text-primary-2 focus:text-primary-2"
                  >
                    Cookie settings
                  </Link>
                </div>
              </nav>
            </Col>
            <Col xs={24} lg={12} xl={8}>
              <Typography.Text style={{ color: "gray" }}>
                © 2024 - Present Icchaporon.com All rights reserved.
              </Typography.Text>
            </Col>
            {/* payment gateway */}
            <Col xs={24} lg={12} xl={8} className="flex lg:mx-auto ">
              {/* <h1 className="text-center mb-4 font-bold uppercase tracking-widest mt-5 md:mt-0">Get Payment way</h1> */}
              <a
                target="_blank"
                href="https://www.aamarpay.com/"
                className="border border-slate-300  rounded-lg flex mx-auto "
              >
                <img
                  src="https://i.ibb.co/wQjdr0L/amarPay.jpg"
                  className="w-full h-full rounded-lg"
                  alt=""
                />
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
