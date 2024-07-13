import { Input, Skeleton, Table } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useGetAllOrderQuery } from "../../redux/features/order/orderApi";
import Container from "../../components/ui/Container";
import { TProduct } from "../../types/index.type";

const Order = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const authData = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState(null);

  const { data: orderData, isLoading: isLoadingOrder } = useGetAllOrderQuery({
    pagination,
    searchTerm,
  });
  const { Search } = Input;

  const columns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "orderNumber",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",

      render: (orderStatus: string) => (
        <h2
          className={` ${
            orderStatus === "pending"
              ? "text-warning"
              : orderStatus === "confirmed"
              ? "text-blue-500"
              : orderStatus === "shipping"
              ? "text-purple-500"
              : orderStatus === "shipped"
              ? "text-green-500"
              : orderStatus === "delivered"
              ? "text-gray"
              : "text-black"
          }`}
        >
          {orderStatus}
        </h2>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",

      render: (paymentStatus: string) => (
        <h2
          className={`${
            paymentStatus === "paid"
              ? "text-success"
              : paymentStatus === "unpaid" && "text-warning"
          }`}
        >
          {paymentStatus}
        </h2>
      ),
    },
    {
      title: "Product",
      dataIndex: "products",
      key: "Products",
      render: (products: any) => (
        <div className="">
          {products.map((product: any, ind: number) => (
            <div
              key={ind}
              className="flex items-center justify-between gap-2 border-b border-b-secondary-100"
            >
              <div className="flex items-center gap-1">
                <img
                  src={product.product?.images?.[0]}
                  alt={product.product?.name}
                  className="w-[50px] h-[50px] object-cover"
                />
                <h2>{product.product?.name}</h2>
              </div>
              <h2 className="text-primary">x{product.quantity}</h2>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => (
        <h2 className="flex items-center font-semibold">
          <FaBangladeshiTakaSign className="text-[12px]" />
          {total}
        </h2>
      ),
    },
  ];

  console.log(orderData, "orderData");

  return (
    <div className="py-8">
      <Container>
        <div className="flex items-center gap-2 justify-between">
          <h2 className="font-bold text-2xl lg:text-3xl mb-8">Orders</h2>

          <Search
            placeholder="Search by order status or payment status"
            onSearch={(value) => setSearchTerm(value)}
            size="large"
            allowClear
            enterButton
            className="w-[400px]"
          />
        </div>

        {isLoadingOrder ? (
          <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <Table
            dataSource={orderData?.data}
            columns={columns}
            scroll={{ x: 800 }}
            pagination={{
              total: orderData?.meta?.total,
              onChange: (page, pageSize) => {
                setPagination({ page, limit: pageSize });
              },
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default Order;
