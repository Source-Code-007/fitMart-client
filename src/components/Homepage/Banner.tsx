import { Carousel } from "antd";
import Container from "../ui/Container";
const Banner = () => {
  const bannerItems = [
    "https://www.startech.com.bd/image/cache/catalog/home/banner/eid-mobile-fest.ai-banner-982x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/home/banner/MSI-Back-to-School--Offer-982x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/home/banner/ZTE%20Blade%20V40%20Smartphone-982x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/home/banner/Stealth-16-Studio-A13VG-407BD-web-banner-982x500.webp",
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
            <div
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
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;
