import { useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import { useGetAllCategoryQuery } from "../redux/features/category/categoryApi";
import ProductsWithFilterSidebar from "../components/helpingCompo/ProductsWithFilterSidebar";


const Products = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [filters, setFilters] = useState({ category: [] });

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [isSort, setIsSort] = useState<string | null>(null);
  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery({
      pagination,
      searchTerm,
      sort: isSort ? isSort : "",
      filters,
    });
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoryQuery(pagination);

  console.log(categories, "categories from products");

  return (
    <ProductsWithFilterSidebar
      products={products}
      isProductsLoading={isProductsLoading}
      categories={categories?.data}
      isCategoriesLoading={isCategoriesLoading}
      isSort={isSort}
      setIsSort={setIsSort}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filters={filters}
      setFilters={setFilters}
      setPagination={setPagination}
    />
  );
};

export default Products;
