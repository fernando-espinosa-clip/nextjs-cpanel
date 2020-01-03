import React from "react";
import { Menu as AntMenu } from 'antd';

export const Menu = (props) => {
    const { children, ...rest } = props;
    return (<AntMenu {...rest}>{children}</AntMenu>);
};

export default Menu;

