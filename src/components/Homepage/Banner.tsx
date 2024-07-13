import { Carousel } from "antd";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
const Banner = () => {
  const bannerItems = [
    "https://fitnessmart.com.bd/wp-content/uploads/2024/05/Training-Season-Gym-Instagram-Post-1.webp",
    "https://shahsports.com.bd/wp-content/uploads/2024/05/spirit-2.png",
    "https://shahsports.com.bd/wp-content/uploads/2024/05/sole2.png",
    "https://shahsports.com.bd/wp-content/uploads/2024/05/3-1.jpg",
    "https://fitbangladesh.com/public/uploads/all/zwtvUYxdrUyh2MJIpUmbjcSesU3oRjknYAM004w3.png",
    "https://raselsports.com/images/banners/Web-cover.webp",
  ];

  return (
    <div className="py-4">
      <Container>
        <Carousel
          afterChange={(currElem) => console.log(currElem)}
          className="w-full rounded-md text-white"
          arrows
          autoplay
        >
          {bannerItems.map((item, ind) => (
            <Link
              to={"/products"}
              key={ind}
              className="bg-primary h-[400px] cursor-pointer rounded-md"
            >
              <div className="flex items-center justify-center h-full rounded-md">
                <img
                  src={item}
                  alt="Img"
                  className="h-full w-full rounded-md"
                />
              </div>
            </Link>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;
