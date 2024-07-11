import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import { useGetAllCategoryQuery } from "../redux/features/category/categoryApi";
import ProductsWithFilterSidebar from "../components/helpingCompo/ProductsWithFilterSidebar";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryQuery = query.get("category");

  const [filters, setFilters] = useState<{ category: string[] }>({
    category: [],
  });

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

  console.log(categoryQuery, "categoryQuery");

  // Add category to filter from query params
  useEffect(() => {
    const categoryQuery = query.getAll("category");
    setFilters({ category: categoryQuery });
  }, []);

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
