import React, { useEffect, useState, useRef } from "react";
import CartCompo from "../components/cart/Cart";
import { Modal } from "antd";

const Cart = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const beforeUnloadRef = useRef();

  const handleBeforeUnload = (event) => {
    event.preventDefault(); // Standard for most browsers
    event.returnValue = ""; // For some old browsers
    setIsModalVisible(true); // Show the modal
  };

  useEffect(() => {
    beforeUnloadRef.current = handleBeforeUnload;
    window.addEventListener("beforeunload", beforeUnloadRef.current);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadRef.current);
    };
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
    window.removeEventListener("beforeunload", beforeUnloadRef.current);
    window.location.reload(); // Allow page refresh or navigation
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Warning"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Leave Page"
        cancelText="Stay on Page"
      >
        <p>Are you sure you want to refresh? You will loss your cart data!</p>
      </Modal>
      <CartCompo />
    </>
  );
};

export default Cart;
