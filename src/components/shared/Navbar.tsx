import { Button, Input, Menu, MenuProps, Skeleton } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { HomeFilled, ProductFilled } from "@ant-design/icons";
import logo from "../../assets/img/logo.png";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/index.type";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: <Link to={"/products"}>Products</Link>,
    key: "Products",
    icon: <ProductFilled />,
  },
  {
    key: "About",
    label: <Link to={"/about"}>About</Link>,
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: productsData, isLoading: isLoadingProducts } =
    useGetAllProductsQuery({ searchTerm: debounceSearchTerm });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      } else {
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-white"
      style={{ zIndex: 10000 }}
    >
      <Container>
        <div className="flex justify-between items-center gap-4 border-b border-b-secondary-100 py-2">
          <Link to={"/"}>
            <img src={logo} alt="Fit Mart" className="w-[80px]" />
          </Link>
          <div ref={searchRef} className="relative w-[500px]">
            <Search
              style={{ width: "100%" }}
              placeholder="Search products"
              onChange={(e) => setSearchTerm(e.target.value)}
              enterButton
            />
            {debounceSearchTerm && isSearchOpen && (
              <div className="p-2 rounded bg-white my-shadow-1 w-full absolute top-full left-0 z-50">
                {isLoadingProducts ? (
                  <Skeleton.Button active className="!h-6 !w-10" />
                ) : productsData?.data?.length === 0 ? (
                  <h2 className="text-center py-5 font-semibold text-grey">
                    No products found!
                  </h2>
                ) : (
                  <div>
                    <h2 className="mb-2 text-grey">
                      Showing <strong>{productsData?.data?.length}</strong>{" "}
                      results for{" "}
                      <strong className="text-secondary-200">
                        {debounceSearchTerm}
                      </strong>
                    </h2>

                    {/* Product */}
                    <div className="max-h-[300px] my-scrollbar overflow-y-auto space-y-2">
                      {productsData?.data?.map(
                        (product: TProduct, ind: number) => (
                          <Link
                            to={`/product/${product?._id}`}
                            onClick={() => setSearchTerm("")}
                            key={ind}
                            className="flex mb-2 gap-2 items-center hover:shadow cursor pointer py-3 px-1 cursor-pointer"
                          >
                            <img
                              src={product?.images?.[0]}
                              alt={product?.name}
                              className="w-8 h-auto rounded"
                            />
                            <div className="space-y-1">
                              <h2 className="font-bold">{product?.name}</h2>
                              <h2>৳{product?.price}</h2>
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Button type="primary">
            <Link to={"/dashboard"}>Dashboard</Link>
          </Button>
        </div>

        {/* Menu */}
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className=""
        />
      </Container>
    </nav>
  );
};

export default Navbar;
