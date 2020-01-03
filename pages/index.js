import { Layout, Menu, Icon, Card, Breadcrumb, PageHeader, Button } from 'antd'
import ApplicsationList from '../components/ApplicationList'
import GeneralMenu from "../components/GeneralMenu";
import getApplications from '../fakeData/application'
import WindowSize from '../helpers/windowSize'
import AplicationForm from '../components/drawers/Application'
import React from "react";

const { Header, Sider, Content } = Layout;
const { Item, SubMenu, ItemGroup } = Menu;

const styles = {
    mobileSidebar: {
        overflow: 'view',
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 1000,
    },
    light: {
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e8e8e8',
    },
    dark: {
        backgroundColor: '#282828'
    }
};

export default class extends React.Component {
    state = {
        collapsed: false,
        collapsed2: true,
        isMobile: false,
        applications: [],
        width: 0,
        height: 0,
        drawerVisible: false,
        currentApp: null,
    };
    static getInitialProps = () => {
        return { applications: getApplications(20) }
    };

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    toggle = (varName) => {
        const result = {collapsed: true, collapsed2: true};
        result[varName] = !this.state[varName];
        this.setState({...result});
    };

    windowSize = (size) => {
        const {width, height} = size;
        this.setState({ width, height})
    };

    showDrawer = (currentApp) => {
        this.setState({
            drawerVisible: true,
            currentApp,
        });
    };

    onCloseDrawer = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    render() {
        const {collapsed, collapsed2, isMobile, width, drawerVisible, currentApp} = this.state;
        const { applications }  = this.props;
        return (
            <Layout>
                <WindowSize onResize={this.windowSize} />
                <Header style={{ background: '#fff', padding: 0, height: '65px', lineHeight: 'inherit', borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
                    <GeneralMenu
                        width={width}
                        toggleMenu1={() => this.toggle('collapsed')}
                        collapsedMenu1={collapsed}
                        toggleMenu2={() => this.toggle('collapsed2')}
                        collapsedMenu2={collapsed2} />
                </Header>
                <Layout>
                    <AplicationForm
                        data={currentApp}
                        width={width < 600 ? width-10 : 600}
                        visible={drawerVisible}
                        onClose={this.onCloseDrawer}
                        destroyOnClose={true}/>
                    {width < 400 && (<Sider
                        style={isMobile ? {...styles.mobileSidebar, ...styles.light} : {}}
                        collapsed={collapsed2}
                        collapsedWidth={isMobile ? 0: 80}
                        width={242}
                    >
                        <Menu
                            inlineIndent={5}
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={['0']}
                        >
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
                    </Sider>)}
                    <Sider
                        style={isMobile ? {...styles.mobileSidebar, ...styles.dark} : {}}
                        collapsed={collapsed}
                        className={'toggle-hiden'}
                        width={242}
                        breakpoint="md"
                        collapsedWidth={isMobile ? 0: 80}
                        onBreakpoint={broken => {
                            this.setState({
                                isMobile: broken,
                            });
                        }}
                        onCollapse={(isCollapsed, type) => {
                            this.setState({
                                collapsed: isCollapsed,
                            });
                        }}
                    >
                        <Menu
                            inlineIndent={5}
                            mode="inline"
                            theme={'dark'}
                            defaultSelectedKeys={['0']}
                        >
                            <Menu.Item key="0">
                                <Icon type="dashboard" />
                                <span>Dashboard</span>
                            </Menu.Item>
                            <Menu.SubMenu
                                key="sub1"
                                title={
                                    <span>
                                       <Icon type="dropbox" />
                                       <span>Mis Aplicaciones</span>
                                    </span>
                                }>
                            <Menu.Item key="1">
                                <Icon type="key" />
                                <span>Api Keys</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="unlock" />
                                <span>Configuracion Webhooks</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="read" />
                                <span>OAuth</span>
                            </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0', width: '100%', display: 'block'}}>
                        <PageHeader
                            style={{ paddingTop: '10px', paddingBottom: '10px', boxShadow: '0 10px 30px 0 rgba(82,63,105,.08)', borderBottom: '1px solid #DADADA'}}
                            ghost={false}
                            onBack={() => window.history.back()}
                            title="Mis Aplicaciones"
                            subTitle={(<Breadcrumb style={{ margin: '0 0 0 20px' }}>
                                <Breadcrumb.Item><Icon type={'home'}/></Breadcrumb.Item>
                                <Breadcrumb.Item>Mis Aplicaciones</Breadcrumb.Item>
                            </Breadcrumb>)}
                            extra={[
                                <Button key="1" type="primary" onClick={this.showDrawer}>
                                    <Icon type={'plus'} /> Crear
                                </Button>,
                            ]}
                        />
                        <Layout style={{ padding: '18px' }}>

                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 0,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                {width >= 600 && <Card title="Aplicaciones">
                                    <ApplicsationList onEdit={(app) => this.showDrawer(app)} data={applications} />
                                </Card> }
                            </Content>
                        </Layout>
                    </Layout>

                </Layout>
                <style jsx global>{`
        .toggle-hiden .ant-layout-sider-zero-width-trigger {
          display: none;
        }
        .ant-layout-sider.ant-layout-sider-dark {
          background-color: #282828;
        }
        .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
          color: rgba(255, 255, 255, 0.65);
          background-color: #282828;
          margin-top: 20px;
          }
        .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
          background: rgb(129,130,132);
          background: linear-gradient(90deg,  rgba(60,60,60,0.8) 0%, rgba(38,38,38,0.2) 100%);
          border-left: 2px solid #818284;
          }
          .ant-menu-vertical .ant-menu-item, .ant-menu-vertical-left .ant-menu-item, .ant-menu-vertical-right .ant-menu-item, .ant-menu-inline .ant-menu-item, .ant-menu-vertical .ant-menu-submenu-title, .ant-menu-vertical-left .ant-menu-submenu-title, .ant-menu-vertical-right .ant-menu-submenu-title, .ant-menu-inline .ant-menu-submenu-title {
            height: 45px;
            line-height: 45px;
        }
        .ant-menu-inline-collapsed > li.ant-menu-item{
            padding: 0 !important;
            text-align: center;
        }
        .ant-menu-item .anticon, .ant-menu-submenu-title .anticon, .ant-menu-inline-collapsed > .ant-menu-item .anticon {
            min-width: 24px;
            font-size: 19px;
            vertical-align: middle;
        }
        .ant-menu-item .anticon + span, .ant-menu-submenu-title .anticon + span {
          vertical-align: middle;
        }
        .logo.closed .anticon {
          margin: 0;
        }
      `}</style>
            </Layout>
        );
    }
}
