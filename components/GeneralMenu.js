import React, { Component, Fragment } from "react";
import { Menu as AntMenu, Icon, Dropdown, Avatar, Button } from 'antd';

import { Menu } from './grapplers/Menu'

const { Item, ItemGroup, Divider } = AntMenu;


const { SubMenu } = AntMenu;
const AvatarMenu1 = (
    <AntMenu>
        <Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Item>
        <Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Item>
        <Divider />
        <Item key="3">3rd menu item</Item>
    </AntMenu>
);
// ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical
// ant-menu jsx-3486481099 ant-menu-light ant-menu-root ant-menu-vertical
const AvatarMenu = (
        <AntMenu className='top-user-menu'>
            <ItemGroup>
            <Item key="1" className='menu-user'>
                <Avatar shape="square" className={'avatar'} src={'https://avatars3.githubusercontent.com/u/56940707'}>F</Avatar>
                <div className='user-name'>Fernando Espinosa<br/><small>akira_fes</small></div>
            </Item>
            <Item key="2">Otro Menu</Item>
            <Item key="3">Salir</Item>
            </ItemGroup>
            <style jsx global>{`
                .top-user-menu.ant-dropdown-menu-root {
                  padding: 0 0 4px 0;
                }
                .top-user-menu .ant-dropdown-menu-item-group-title {
                  padding: 0;
                }
                .top-user-menu .ant-dropdown-menu-item-group-list {
                  margin: 0
                }
                .top-user-menu .ant-dropdown-menu-item.menu-user{ 
                    padding: 2rem 1.5rem;
                    width: 380px;
                    height: auto;
                    background-color: white;
                    cursor: default;
                    background-image: url(https://keenthemes.com/metronic/themes/metronic/theme/default/demo1/dist/assets/media/misc/bg-1.jpg);
                    display: flex;
                    background-size: cover;
                    align-items: center;
                    flex-direction:row;
                    white-space: normal;
                }
                
                .avatar {
                  background-color: rgba(255,255,255,0.1);
                    vertical-align: middle;
                    width: 60px;
                    height: 60px;
                    min-width: 60px;
                    font-size: 2.2em;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center 
                }
               
            `}</style>
            <style jsx>{`      
                .user-name {
                    flex-grow: 1;
                    font-size: 17px;
                    line-height: normal;
                    font-weight: 500;
                    padding-left: 1rem;
                  display: block;
                  color: white;
                }

            `}</style>
        </AntMenu>
    );


export default class extends Component {
    state = {
        current: 'app',
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        const { collapsedMenu1, collapsedMenu2, toggleMenu1, toggleMenu2, width } = this.props;
        return (
            <div className='general-menu' >
                <div className={`logo ${(collapsedMenu1) ? 'closed' : ''}`}>
                    <span className='img'>{width >= 600 &&  'Developers' }</span>
                </div>
                <div className='grid'>
                    {width >= 600 && <div className='menu'>
                        <Menu className='inline' onClick={this.handleClick} selectedKeys={[this.state.current]} mode='horizontal'>
                            <Item key="home">
                                <Icon type="home" />
                                Home
                            </Item>
                            <Item key="app" >
                                <Icon type="appstore" />
                                Developer Portal
                            </Item>
                            <SubMenu
                                popupClassName={'slim-menu'}
                                title={
                                    <span className="submenu-title-wrapper">
                                    <Icon type="read" />
                                    Documentación
                                </span>
                                }>
                                <ItemGroup title="Tutoriales">
                                    <Item key="setting:1x">Sobre las Apis</Item>
                                    <Item key="setting:2x">Sobre Los SDK</Item>
                                </ItemGroup>
                                <ItemGroup title="Aplicaciones de Ejemplo">
                                    <Item key="setting:4x">Aplicaciones Apis</Item>
                                    <Item key="setting:5">Aplicaciones SDKs</Item>
                                </ItemGroup>
                            </SubMenu>
                            <SubMenu
                                popupClassName={'slim-menu'}
                                title={
                                    <span className="submenu-title-wrapper">
                                    <Icon type="bulb" />
                                    Referencia Técnica
                                </span>
                                }>
                                <ItemGroup title="Apis">
                                    <Item key="setting:1x1">Pos</Item>
                                    <Item key="setting:2x1">Catalog</Item>
                                    <Item key="setting:3x1">Pay</Item>
                                </ItemGroup>
                                <ItemGroup title="SDKs">
                                    <Item key="setting:4x1">Android</Item>
                                    <Item key="setting:5x1">Node</Item>
                                    <Item key="setting:6x1">Java</Item>
                                </ItemGroup>
                            </SubMenu>
                        </Menu>
                    </div> }
                    <div className='right-side'>
                        <Dropdown
                            trigger={['click']}
                            overlay={AvatarMenu}
                        >
                            <a className="ant-dropdown-link" href="#" style={{ color: 'rgba(0, 0, 0, 0.65)'}}>
                                <span style={{ marginRight: '10px'}}>Fernando</span>  <Avatar shape="circle" size='medium' src={'https://avatars3.githubusercontent.com/u/56940707'} />
                            </a>
                        </Dropdown>
                        {width < 600 && (<Fragment><Button onClick={toggleMenu1}>
                            <Icon type={collapsedMenu1 ? 'menu-unfold' : 'menu-fold'}  />
                        </Button>
                        <Button onClick={toggleMenu2}>
                            <Icon type={collapsedMenu2 ? 'menu-unfold' : 'menu-fold'}  />
                        </Button> </Fragment>)}
                    </div>
                </div>
                <style jsx>
                {`
                    .general-menu {
                        display: flex;
                        height: 65px;
                    }
                    .right-side {
                      display: flex;
                      width: 100%;
                      flex-direction: row-reverse;
                      padding-right: 20px;
                      align-items: center;
                    }
                    .general-menu .grid {
                        display: grid;
                        grid-template-columns: auto auto;
                        width: 100%;
                    }
                    .menu :global(.ant-menu-horizontal > .ant-menu-item-selected), .menu :global(.ant-menu-horizontal > .ant-menu-submenu-selected) {
                      background-color: rgba(230,247,255,0.6)
                    }
                    .menu :global(.ant-menu-horizontal) {
                        height: 65px;
                    }
                    .menu :global(.ant-menu-horizontal) {
                        line-height: 63px;
                    }
                    .menu {
                      display: inline-block;
                      margin-left: 14px;
                    }
                    .trigger {
                      font-size: 18px;
                      line-height: 64px;
                      padding: 0 24px;
                      cursor: pointer;
                      transition: color 0.3s;
                    }
                    
                    .trigger:hover {
                      color: #1890ff;
                    }
                    
                    .logo {
                      width: 232px;
                      display: inline-flex;
                      padding: 0 8px 0 15px;
                      justify-content: space-between;
                      align-items: center;
                    }
                    .logo .img {
                      width: 162px;
                      min-width: 232px;
                      height: 42px;
                      background: url("/square_logo.png");
                      background-size: 42px;
                      background-repeat: no-repeat;
                      display: inline-block;
                      vertical-align: middle;
                      transition: all 0.3s;
                      font-size: 19px;
                      line-height: 40px;
                      padding-left: 50px;
                    }
                    @media only screen and (max-width: 600px) {
                      .general-menu .grid {
                         grid-template-columns: auto;
                      }
                      .logo {
                         width: 90px;
                         padding: 0 24px;
                      }
                      .logo .img {
                       width: 0;
                      }
                    }
                    .logo.closed {
                     
                      padding: 0 24px;
                      color: transparent;
                    }
                    .logo.closed .img {
                      width: 0;
                      padding: 0;
                      overflow: hidden;
                    }
                    .logo :global(.anticon) {
                      color: rgba(0, 0, 0, 0.65);
                      font-size: 22px;
                      vertical-align: middle;
                      padding: 7px;
                      transition: background-color 0.5s;
                      border-radius: 3px
                    }
                    .logo :global(.anticon:hover) {
                      background-color: rgba(0,0,0,0.2);
                    }
                    .inline {
                      display: inline-block;
                    }
                `}
                </style>
                <style jsx global>{`
                  .slim-menu .ant-menu-vertical .ant-menu-item {
                    height: auto;
                    line-height: 14px;
                    padding-top: 8px;
                    padding-bottom: 8px;
                  }
                `}</style>
            </div>

        );
    }
}

