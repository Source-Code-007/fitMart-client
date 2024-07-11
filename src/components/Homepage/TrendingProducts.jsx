import { useGetAllProductsQuery } from "../../redux/api/products/productApi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Empty, Skeleton } from "antd";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { BiTrendingUp } from "react-icons/bi";
import Product from "../Product";

// TODO: add appropriate trending products
const TrendingProducts = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();

  // console.log(products, 'products from trendy products');

  return (
    <div className="py-8 md:py-10">
      <div className="my-container bg-white my-shadow-1 rounded-md p-4 space-y-6">
        <CommonSectionBanner
          title={
            <>
              <span className="h-7 w-7 text-md rounded-full bg-primary-2 flex items-center justify-center">
                <BiTrendingUp />
              </span>{" "}
              Trendy products
            </>
          }
        />
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton.Button className="!h-[250px] !w-full" />
            <Skeleton.Button className="!h-[250px] !w-full" />
            <Skeleton.Button className="!h-[250px] !w-full" />
          </div>
        ) : products?.meta?.total === 0 ? (
          <div>
            <Empty />
          </div>
        ) : (
          <Swiper
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 3,
              },
            }}
            spaceBetween={30}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper !pb-8"
          >
            {products?.data?.map((product, ind) => (
              <SwiperSlide key={ind}>
                <Product product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
