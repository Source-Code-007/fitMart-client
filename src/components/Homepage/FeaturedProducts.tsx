import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, Empty, Skeleton } from "antd";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import ProductCard from "../Products/ProductCard";
import { TProduct } from "../../types/index.type";
import Container from "../ui/Container";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(null);

  return (
    <div className="py-8 md:py-10">
      <Container>
        <div className="bg-white my-shadow-1 rounded-md p-4 space-y-6">
          <div className="flex justify-between flex-wrap items-center">
            <CommonSectionBanner title={"Featured products"} />
              <Link to={"/products"}>
                <Button type="primary">Show more products</Button>
              </Link>
          </div>
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
              {products?.data?.map((product: TProduct, ind: number) => (
                <SwiperSlide key={ind}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
