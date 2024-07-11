import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-7xl mx-4 md:mx-auto ">{children}</div>;
};

export default Container;
