import React from 'react';
import {MainLayoutFooter} from "./styles";
import {useSelector} from "react-redux";

const Footer = () => {
  const state = useSelector((state: any) => state.file);

  return (
    <MainLayoutFooter>
      Статус: {state.status}
    </MainLayoutFooter>
  );
};

export default Footer;