import { ReactNode } from "react";
import Container from "../ui/Container";

type TCommonSectionBanner = {
  title: ReactNode;
  subTitle: ReactNode;
};
const CommonSectionBannerTwo: React.FC<TCommonSectionBanner> = ({
  title,
  subTitle,
}) => {
  return (
    <div className="py-4 text-center">
      <Container>
        <h2 className="font-bold text-xl md:text-2xl text-slate-800">
          {title}
        </h2>
        <p className="text-grey">{subTitle}</p>
      </Container>
    </div>
  );
};

export default CommonSectionBannerTwo;