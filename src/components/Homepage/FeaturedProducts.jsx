import { useGetAllProductsQuery } from "../../redux/api/products/productApi";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Empty, Skeleton } from "antd";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import Product from "../Product";

// TODO: add appropriate featured products
const FeaturedProducts = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();

  return (
    <div className="py-8 md:py-10">
      <div className="my-container bg-white my-shadow-1 rounded-md p-4 space-y-6">
        <CommonSectionBanner title={"Featured products"} />
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
            grabCursor={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
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

export default FeaturedProducts;
