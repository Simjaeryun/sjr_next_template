import React, {useEffect, useState} from 'react';
import { Box, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';
import HomeHeader from '../../headers/HomeHeader';
import { useRouter } from "next/router";

interface HomeLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
  children?: JSX.Element;
}

const HomeLayout = ({
  //
  header = <HomeHeader />,
  footer,
  content,
  children,
}: HomeLayoutProps) => {


  return (
    <>
      {header}
      <Box h={"100vh"} pt={`${LAYOUT.HEADER.HEIGHT}px`}>
        {content}
        {children}
      </Box>
      {footer}
    </>
  );
};

export default HomeLayout;
