import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card, Empty, Rate, Skeleton } from "antd";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { useGetAllShopQuery } from "../../redux/api/shop/shopApi";
import { FcRating } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// TODO: add appropriate top rated shops
const TopRatedShops = () => {
  const { data: shops, isLoading } = useGetAllShopQuery();
  const navigate = useNavigate()
  const myShops = [
    {
      img: "https://media.e-valy.com/cms/brands/logo/b2650852-fb67-4d90-b541-83d32d8f959f?h=150&w=150",
      title: "Elegant Boutique",
      rating: 3.5,
      totalReviews: 120,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/fdd8922b-ec32-4287-899f-a5552eb89e99?h=150&w=150",
      title: "Tech Haven",
      rating: 4.7,
      totalReviews: 95,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/93135148-6727-4d8e-8a69-554b22b5d4f6?h=150&w=150",
      title: "Fashion Fiesta",
      rating: 4.3,
      totalReviews: 150,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/62f5e59c-ed76-432a-a81f-f12a2d7b1fcd?h=150&w=150",
      title: "Gadget World",
      rating: 3.6,
      totalReviews: 110,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/3097544d-bb1d-495a-92e9-a09484cb0872?h=350&w=350",
      title: "Home Essentials",
      rating: 5,
      totalReviews: 80,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/0267a912-bf23-4acc-a71e-9f2e20332347?h=150&w=150",
      title: "Book Bazaar",
      rating: 3.8,
      totalReviews: 200,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/f1cb2821-1a85-40c9-8013-382ad632fbca?h=150&w=150",
      title: "Sports Arena",
      rating: 5,
      totalReviews: 70,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/b2650852-fb67-4d90-b541-83d32d8f959f?h=150&w=150",
      title: "Beauty Corner",
      rating: 4.9,
      totalReviews: 230,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/fdd8922b-ec32-4287-899f-a5552eb89e99?h=150&w=150",
      title: "Pet Paradise",
      rating: 4.1,
      totalReviews: 60,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/93135148-6727-4d8e-8a69-554b22b5d4f6?h=150&w=150",
      title: "Kitchen Kraft",
      rating: 4.3,
      totalReviews: 145,
    },
  ];

  // console.log(isLoading, shops);

  return (
    <div className="py-8 md:py-10">
      <div className="my-container bg-white my-shadow-1 rounded-md p-4 space-y-6">
        <CommonSectionBanner
          title={
            <>
              <span className="h-7 w-7 text-md rounded-full bg-primary-2 flex items-center justify-center">
                <FcRating />
              </span>{" "}
              Top Rated Shops
            </>
          }
        />
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton.Button className="!h-[150px] !w-full" />
            <Skeleton.Button className="!h-[150px] !w-full" />
            <Skeleton.Button className="!h-[150px] !w-full" />
            <Skeleton.Button className="!h-[150px] !w-full" />
          </div>
        ) 
                // TODO
        : false ? (
          <div>
            <Empty />
          </div>
        ) : (
          <Swiper
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 3,
              },
              // when window width is >= 1024px
              1024: {
                width: 1024,
                slidesPerView: 4,
              },
            }}
        grabCursor={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper !pb-8"
          >
            {myShops?.map((shop, ind) => (
              <SwiperSlide key={ind}>
                <Card className="min-h-[200px] relative !p-0 pb-10 cursor-pointer space-y-4 text-center" onClick={()=> navigate(`/shops/${shop?.title}`)}>
                  <img
                    className="h-[150px] w-full rounded"
                    src={shop?.img}
                    alt={shop?.title}
                  />
                  <h2 className="font-semibold  text-lg md:text-xl mb-2 truncate">
                    {shop.title}
                  </h2>
                  <Card.Meta
                    title={
                      <div className="flex gap-1 items-center text-sm justify-center">
                        <Rate value={shop?.rating} className="text-sm" />
                        <span>({shop?.totalReviews})</span>
                      </div>
                    }
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TopRatedShops;
