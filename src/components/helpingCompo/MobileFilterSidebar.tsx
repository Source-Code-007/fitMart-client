/* eslint-disable react/prop-types */
import { Checkbox, Empty, Skeleton } from "antd";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { TCategory } from "../../types/index.type";

type TProductsWithFilterSidebar = {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: { category: string[] };
  handleResetFilter: () => void;
  isCategoriesLoading: boolean;
  categories: TCategory[];
  handleChangeFilter: (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const MobileFilterSidebar: React.FC<TProductsWithFilterSidebar> = ({
  isFilterOpen,
  setIsFilterOpen,
  filters,
  handleResetFilter,
  isCategoriesLoading,
  categories,
  handleChangeFilter,
}) => {
  useEffect(() => {
    if (isFilterOpen) {
      // Disable scrolling on the body when sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling on the body when sidebar is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow on unmount or toggle
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen]);

  return (
    <div
      className={`bg-white my-shadow-1 rounded-t-md border-t border-primary-2 p-4 space-y-4 w-full fixed bottom-0 transition-all duration-500 left-0 right-0 h-[60vh] md:h-auto md:hidden z-50 ${
        isFilterOpen
          ? "opacity-100 visible"
          : "opacity-0 md:opacity-100 invisible md:visible"
      }`}
    >
      {/* Filter, reset and cancel */}
      <div className="flex justify-between items-center gap-2 pb-4 border-b border-b-slate-200">
        <h2 className="text-lg font-semibold">Filter</h2>

        <button
          className="px-2 py-1 rounded font-semibold text-sm text-white bg-slate-500 bg-opacity-80"
          onClick={handleResetFilter}
        >
          Reset
        </button>

        <span
          className="p-1 rounded text-danger bg-secondary-100"
          onClick={() => setIsFilterOpen(false)}
        >
          <FaXmark />
        </span>
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
            <div className="space-y-1 max-h-[260px] overflow-y-scroll my-scrollbar">
              {categories?.map((category, ind) => (
                <Checkbox
                  key={ind}
                  name="mobileCategory"
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
  );
};

export default MobileFilterSidebar;
