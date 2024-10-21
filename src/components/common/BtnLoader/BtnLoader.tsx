import React, { FC } from "react";
interface types {
  isLoading: boolean;
  className: string;
}
const BtnLoader: FC<types> = ({ isLoading, className }) => {
  return (
    <button disabled={isLoading} className={className} role="status">
      <span>Loading...</span>
    </button>
  );
};

export default BtnLoader;
