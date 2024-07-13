/* eslint-disable react/prop-types */
import { Button, Checkbox, Empty, Input, Pagination, Skeleton } from "antd";
import {
  FilterFilled,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { TCategory, TProduct, TProducts } from "../../types/index.type";
import MobileFilterSidebar from "./MobileFilterSidebar";
import Container from "../ui/Container";
import {} from "react-router-dom";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

type TProductsWithFilterSidebar = {
  products: TProducts;
  isProductsLoading: boolean;
  categories: TCategory[];
  isCategoriesLoading: boolean;
  isSort: string | null;
  setIsSort: React.Dispatch<React.SetStateAction<string | null>>;
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
  filters: { category: string[] };
  setFilters: React.Dispatch<React.SetStateAction<{ category: string[] }>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; limit: number }>
  >;
};

const ProductsWithFilterSidebar: React.FC<TProductsWithFilterSidebar> = ({
  products,
  isProductsLoading,
  categories,
  isCategoriesLoading,
  isSort,
  setIsSort,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  setPagination,
}) => {
  const { Search } = Input;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const query = new URLSearchParams(location.search);

  // Update query params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add existing query params to URLSearchParams
    query.forEach((value, key) => {
      params.append(key, value);
    });

    // Add categories to query params
    filters.category.forEach((cat) => {
      if (!params.getAll("category").includes(cat)) {
        params.append("category", cat);
      }
    });

    // Remove unchecked categories from params
    query.getAll("category").forEach((cat) => {
      if (!filters.category.includes(cat)) {
        // Remove specific category occurrences from params
        const catValues = query.getAll("category");
        catValues.forEach((value) => {
          if (value === cat) {
            params.delete("category");
          }
        });

        // Again add
        filters.category.forEach((cat) => {
          params.append("category", cat);
        });
      }
    });

    // Update URL with new params
    const newUrl = `${location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [filters, location.pathname, query]);

  // Handle change filtering checkbox
  const handleChangeFilter = (type: "brand" | "category", e: any) => {
    if (type === "category") {
      if (e.target.checked && !filters.category.includes(e.target.value)) {
        setFilters({
          ...filters,
          category: [...filters.category, e.target.value],
        });
      } else {
        setFilters({
          ...filters,
          category: filters.category.filter((cat) => cat !== e.target.value),
        });
      }
    }
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setFilters({ category: [] });
  };

  return (
    <div className="py-10">
      <Container>
        <div className="space-y-8">
          {/* Showing results Sorting */}
          {isProductsLoading ? (
            <Skeleton.Button className="!w-full !h-[50px]" />
          ) : (
            <div className="py-4 flex flex-wrap justify-between items-center bg-primary-50 p-2 rounded gap-4">
              <p className="order-1 text-[14px] md:text-[16px] text-normal-desc">
                Showing {products?.meta?.total} results
              </p>

              <Search
                placeholder="Search by product name"
                onSearch={(value) => setSearchTerm(value)}
                size="large"
                allowClear
                enterButton
                className="w-full md:w-[350px] lg:w-[400px] order-3 md:order-2"
              />

              <div className="flex items-center gap-2 order-2 md:order-3">
                <span className="text-normal-desc pr-1 border-r border-r-slate-200">
                  Sort by
                </span>
                <Button
                  type="default"
                  className="btn-one !py-1"
                  onClick={() =>
                    setIsSort(isSort === "price" ? "-price" : "price")
                  }
                >
                  {isSort === "-price" ? (
                    <SortAscendingOutlined />
                  ) : (
                    isSort === "price" && <SortDescendingOutlined />
                  )}{" "}
                  Price
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {/* Filtering sidebar */}

            {/* Desktop filter sidebar */}
            <div>
              <div
                className={`bg-white my-shadow-1 rounded-md p-4 space-y-4 !w-[200px] hidden md:block`}
              >
                {/* Filter and reset */}
                <div className="pb-4 border-b border-b-slate-200 flex justify-between gap-2">
                  <h2 className="text-lg font-semibold">Filter</h2>
                  <button
                    className="px-2 py-1 rounded font-semibold text-sm text-white bg-secondary-200 bg-opacity-80"
                    onClick={handleResetFilter}
                  >
                    Reset
                  </button>
                </div>

                {/* Filter by category */}
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <h3 className="text-lg">Category</h3>

                  <div className="p-1">
                    {isCategoriesLoading ? (
                      <>
                        <Skeleton.Button className="!h-[30px] !w-full" />
                        <Skeleton.Button className="!h-[30px] !w-full" />
                        <Skeleton.Button className="!h-[30px] !w-full" />
                        <Skeleton.Button className="!h-[30px] !w-full" />
                      </>
                    ) : categories?.length === 0 ? (
                      <Empty />
                    ) : (
                      <div className="space-y-1 max-h-[200px] overflow-y-scroll my-scrollbar">
                        {categories?.map((category, ind) => (
                          <Checkbox
                            key={ind}
                            name="category"
                            value={category?._id}
                            checked={filters?.category?.includes(category?._id)}
                            className="flex items-center gap-1"
                            onChange={(e) => handleChangeFilter("category", e)}
                          >
                            {category?.name}
                          </Checkbox>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile filter sidebar */}
            {isFilterOpen && (
              <MobileFilterSidebar
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                isCategoriesLoading={isCategoriesLoading}
                categories={categories}
                handleChangeFilter={handleChangeFilter}
                filters={filters}
                handleResetFilter={handleResetFilter}
              />
            )}

            {/* Products */}
            <div className="flex-1">
              {isProductsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <Skeleton.Button className="!h-[250px] !w-full" />
                  <Skeleton.Button className="!h-[250px] !w-full" />
                  <Skeleton.Button className="!h-[250px] !w-full" />
                  <Skeleton.Button className="!h-[250px] !w-full" />
                </div>
              ) : products?.meta?.total === 0 ||
                products?.data?.length === 0 ? (
                <div className="h-[400px] flex items-center justify-center">
                  <Empty
                    description={`No products found ${
                      searchTerm ? `for ${searchTerm}` : ""
                    }`}
                  />
                </div>
              ) : (
                <div className=" p-4 rounded-md  my-shadow-1 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {products?.data?.map((product: TProduct, ind: number) => (
                      <ProductCard key={ind} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {products?.meta?.total > 10 && (
                    <div className="pt-8 text-center">
                      <Pagination
                        //   onChange={(page, pageSize) => {
                        onChange={(page, pageSize) => {
                          setPagination({ page, limit: pageSize });
                        }}
                        total={products?.meta?.total}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter icon for mobile device */}
        <div
          className={`rounded px-2 py-1 bg-primary bg-opacity-80 font-semibold text-lg flex md:hidden items-center gap-1 text-white fixed left-1/2 -translate-x-1/2 bottom-4`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="">
            <FilterFilled />
          </span>
          <span>Filter</span>
        </div>
      </Container>
    </div>
  );
};

export default ProductsWithFilterSidebar;
