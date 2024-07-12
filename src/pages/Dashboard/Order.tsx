import { Input, Skeleton, Table } from "antd";
import { useGetAllOrderQuery } from "../../../redux/api/orders/orderApi";
import Container from "../../components/ui/Container";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Order = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const authData = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState(null);


  const { data: orderData, isLoading: isLoadingOrder } = useGetAllOrderQuery(
    {
      customer: authData?.user?._id,
      pagination,
      searchTerm,
    },
    { skip: !authData?.user?._id || authData?.isAuthLoading }
  );
  const {Search} = Input

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",

      render: (orderStatus) => (
        <h2
          className={`font-semibold ${
            orderStatus === "pending"
              ? "text-yellow-500"
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

      render: (paymentStatus) => (
        <h2
          className={`${
            paymentStatus === "paid"
              ? "text-success"
              : paymentStatus === "unpaid" && "text-danger"
          }`}
        >
          {paymentStatus}
        </h2>
      ),
    },
    {
      title: "Billing Method",
      dataIndex: "billingMethod",
      key: "billingMethod",
    },
    {
      title: "Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
      render: (grandTotal) => (
        <h2 className="flex items-center font-semibold">
          <FaBangladeshiTakaSign className="text-[12px]" />
          {grandTotal}
        </h2>
      ),
    },
    {
      title: "Shipping Method",
      dataIndex: "shippingMethod",
      key: "billingMethod",
      render: (shippingMethod) =>
        shippingMethod?.methodName ? shippingMethod.methodName : "N/A",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products) => {
        return (
          <div className="inline-flex flex-col">
            {products.map((product, index) => {
              return (
                <p
                  key={index}
                  className="text-primary-2 font-bold  bg-opacity-80 px-2 bg-white inline-block"
                >
                  {product?.product?.title}
                </p>
              );
            })}
          </div>
        );
      },
    },
  ];




  return (
    <div>
      <Container className={"py-8"}>
        <div className="flex items-center gap-2 justify-between">
          <h2 className="font-bold text-2xl lg:text-3xl mb-8">Orders</h2>

            <Search
              placeholder="Search by order id"
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
                setPagination({ page, limit:pageSize });
              },
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default Order;
