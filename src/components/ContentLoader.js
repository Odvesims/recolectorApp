import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const CustomLoader = () => (
  <ContentLoader
    height={60}
    width={400}
    speed={1}
    primaryColor="#eeeeee"
    secondaryColor="#f4f4f4">
    <Rect x="10" y="20" rx="0" ry="0" width="100%" height="12" />
    <Rect x="10" y="40" rx="0" ry="0" width="40%" height="12" />
  </ContentLoader>
);

export default CustomLoader;
