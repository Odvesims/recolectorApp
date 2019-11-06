import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const CustomLoader = () => (
  <ContentLoader
    height={80}
    width={317}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb">
    <Rect x="10" y="25" rx="0" ry="0" width="100%" height="12" />
    <Rect x="10" y="50" rx="0" ry="0" width="60%" height="12" />
  </ContentLoader>
);

export default CustomLoader;
