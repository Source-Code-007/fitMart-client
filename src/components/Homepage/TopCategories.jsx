import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card, Empty, Skeleton } from "antd";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { useGetAllShopQuery } from "../../redux/api/shop/shopApi";
import { FcRating } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// TODO: add appropriate top categories
const TopCategories = () => {
  const { data: shops, isLoading } = useGetAllShopQuery();
  const navigate = useNavigate()
  const categories = [
    {
      img: "https://media.e-valy.com/cms/brands/logo/b2650852-fb67-4d90-b541-83d32d8f959f?h=150&w=150",
      title: "Clothing",
      rating: 4.5,
      totalReviews: 320,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/fdd8922b-ec32-4287-899f-a5552eb89e99?h=150&w=150",
      title: "Electronics",
      rating: 4.7,
      totalReviews: 450,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/93135148-6727-4d8e-8a69-554b22b5d4f6?h=150&w=150",
      title: "Books",
      rating: 4.3,
      totalReviews: 150,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/62f5e59c-ed76-432a-a81f-f12a2d7b1fcd?h=150&w=150",
      title: "Home & Kitchen",
      rating: 4.6,
      totalReviews: 310,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/3097544d-bb1d-495a-92e9-a09484cb0872?h=350&w=350",
      title: "Beauty & Personal Care",
      rating: 4.4,
      totalReviews: 280,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/0267a912-bf23-4acc-a71e-9f2e20332347?h=150&w=150",
      title: "Sports & Outdoors",
      rating: 4.8,
      totalReviews: 200,
    },
    {
      img: "https://media.e-valy.com/cms/brands/logo/f1cb2821-1a85-40c9-8013-382ad632fbca?h=150&w=150",
      title: "Pet Supplies",
      rating: 4.2,
      totalReviews: 70,
    }
  ];
  

  return (
    <div className="py-8 md:py-10">
      <div className="my-container bg-white my-shadow-1 rounded-md p-4 space-y-6">
        <CommonSectionBanner
          title={
            <>
              <span className="h-7 w-7 text-md rounded-full bg-primary-2 flex items-center justify-center">
                <FcRating />
              </span>{" "}
              Top Categories
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
            {categories?.map((shop, ind) => (
              <SwiperSlide key={ind}>
                <Card className="min-h-[200px] relative !p-0 pb-10 cursor-pointer space-y-4 text-center" onClick={()=> navigate(`/shops/${shop?.title}`)}>
                  <img
                    className="h-[150px] w-full"
                    src={shop?.img}
                    alt={shop?.title}
                  />
                  <h2 className="font-semibold  text-lg md:text-xl mb-2 truncate">
                    {shop.title}
                  </h2>
            
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TopCategories;
