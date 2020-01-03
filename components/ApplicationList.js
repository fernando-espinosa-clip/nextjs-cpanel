import React, { Fragment } from 'react';
import { Table, Button, Tag, Card, Avatar, Icon, Badge, Statistic, Dropdown, Menu } from 'antd';
import avatarColors from "../fakeData/colors";


const { Column, ColumnGroup } = Table;
const { Meta } = Card;
const ButtonGroup = Button.Group;


const gridStyle2 = {
    width: '100%',
    textAlign: 'left',
    padding: '5px 10px',
    fontSize: '12px',
    lineHeight: '12px',
    border: 'none',
    boxShadow: 'none',
};

const spanStyle = {
    width: '100%',
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '12px',
};

const Branch = (props) => {
    const { status, text } = props;
    return (
        <Fragment>
            <div className={`custom ${status}`}>
                <Badge status={status} text={text}/>
            </div>
            <style jsx>{`
                .custom.processing :global(.ant-badge-status-text) {
                  color: #1890ff;
                }
                .custom.warning :global(.ant-badge-status-text) {
                  color: #faad14;
                }
            `}
            </style>
        </Fragment>
    )
};

const renderApplicationName = (element, row) => {
    return (
        <Card
            style={{ width: 'auto', margin: 0, background: 'transparent' }}
            bodyStyle={{ margin: 0, padding: 0, background: 'transparent' }}
            bordered={false}
            size={'small'}
        >
            <Card.Grid style={gridStyle2}>
                <strong style={{fontSize: '16px', lineHeight: '16px'}}>{row.name}</strong>
            </Card.Grid>
            <Card.Grid style={gridStyle2}>
                <span style={spanStyle}>{row.id}</span>
            </Card.Grid>
        </Card>
    )
};

const renderDate = (element, row) => {
    return(
        <Fragment>{row.creationDateFormated}</Fragment>
    )
};

const renderDate2 = (element, row) => {
    return(
        <Fragment>{row.updatedDateFormated}</Fragment>
    )
};

const renderEnvironment = (element, row) => {
    return (
       <Branch status={element === 'sandbox' ? 'warning' : 'processing'} text={element}/>
    )
    /* return (
        <Tag color={element === 'sandbox' ? 'red' : 'green'}>
            <Icon type={element === 'sandbox' ? 'code-sandbox-circle' : 'setting'} theme="filled" /> {element}
        </Tag>
    ) */
};

const getAvatarColor = (chrCode) => {
    if (chrCode % 7 === 0) return avatarColors[6];
    if (chrCode % 6 === 0) return avatarColors[5];
    if (chrCode % 5 === 0) return avatarColors[4];
    if (chrCode % 4 === 0) return avatarColors[3];
    if (chrCode % 3 === 0) return avatarColors[2];
    if (chrCode % 3 === 0) return avatarColors[1];
    return avatarColors[1];
};

const renderUser = (element, row) => {
    const color = getAvatarColor(row.createdBy.username.charCodeAt(0));
    const src = row.createdBy.image;
    const style = {
        display: 'grid',
        gridTemplateColumns: '40px auto',
        gridTemplateRows: 'max-content',
        alignItems: 'center'
    }
    return (<div style={style}>
        <Avatar
        src={src}
        size="large"
        style={src ? null : { backgroundColor: color }}>
            {src || row.createdBy.username.charAt(0).toUpperCase()}
        </Avatar>
        <Card
            style={{ width: 'auto', margin: 0, background: 'transparent' }}
            bodyStyle={{ margin: 0, padding: 0, background: 'transparent' }}
            bordered={false}
            size={'small'}
        >
            <Card.Grid style={gridStyle2}>
                <strong style={{fontSize: '14px', lineHeight: '14px'}}>{row.createdBy.firstName} {row.createdBy.lastName}</strong>
            </Card.Grid>
            <Card.Grid style={gridStyle2}>
                <span style={spanStyle}>{row.createdBy.username}</span>
            </Card.Grid>
        </Card>
    </div>)
};

const renderStatistics = (element, row) => {
    return (
        <Fragment>
            <div className='in-table'>
                <Statistic
                    title='Ventas'
                    value={element}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<Icon type="dollar" />}
                />
                <Statistic
                    title='Mov.'
                    value={row.dayMovements}
                    valueStyle={{ color: '#000', textAlign: 'center' }}
                />
            </div>
            <style jsx>{`
                .in-table {
                  display: grid;
                  grid-template-columns: auto 44px;
                }
                .in-table :global(.ant-statistic) {
                  justify-content: space-between;
                  min-width: 60px;
                }
                .in-table :global(.ant-statistic-title) {
                  text-align: center;
                }
                .in-table :global(.ant-statistic-content) {
                    font-size: 14px;
                    margin-left: 5px;
                }
                .in-table :global(.ant-statistic-content .ant-statistic-content-value-decimal) {
                    font-size: 12px;
                }
                .in-table :global(.ant-statistic-content .ant-statistic-content-prefix) {
                    font-size: 16px;
                }
            `}</style>
        </Fragment>

    )
};

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                <Icon type="copy" /> Copiar Api Key
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" >
                <Icon type="copy" /> Copiar clave secreta
            </a>
        </Menu.Item>
    </Menu>
);

const renderActions = (element, row, fn) => {
    return(
        <Fragment>
        <div className='tool-box'>
            <ButtonGroup>
                <Button onClick={() => fn ? fn(row) : null} className='primary transparent' type="primary"  icon="edit" />
                <Button className='danger transparent' type="primary"  icon="delete" />
                <Dropdown overlay={menu}>
                    <Button className='info transparent' type="primary"  icon="ellipsis" />
                </Dropdown>
            </ButtonGroup>
        </div>
            <style jsx>{`
                .tool-box :global(.primary) {
                    background-color: #f4f4f8;
                    transition: background .3s ease;
                    color: #1dc9b7;
                    border-color: #f4f4f8;
                    font-size: 18px;
                }
                .tool-box :global(.primary:hover) {
                    background-color: #1dc9b7;
                    color: #f4f4f8;
                    border-color: #1dc9b7;
                }
                .tool-box :global(.info) {
                    background-color: #f4f4f8;
                    transition: background .3s ease;
                    color: #366cf3;
                    border-color: #f4f4f8;
                    font-size: 18px;
                }
                .tool-box :global(.info:hover) {
                    background-color: #366cf3;
                    color: #f4f4f8;
                    border-color: #366cf3;
                }
                .tool-box :global(.danger) {
                    background-color: #f4f4f8;
                    transition: background .3s ease;
                    color: #fd397a;
                    border-color: #f4f4f8;
                    font-size: 18px;
                }
                .tool-box :global(.danger:hover) {
                    background-color: #fd397a;
                    color: #f4f4f8;
                    border-color: #fd397a;
                }
                .tool-box :global(.danger:last-child:not(:first-child):hover) {
                    border-left-color: #fd397a;
                }
                .tool-box :global(.ant-btn-primary:last-child:not(:first-child)) {
                    border-left-color: #D7D7DB;
                }
                .tool-box :global(.transparent) {
                    background-color: transparent;
                    border-color: transparent;
                    box-shadow: none;
                }
                
                    `}</style>
        </Fragment>
    )
};

const ApplicationList = props => {
    const { data, onEdit } = props;
    return (
        <Table
            rowKey={record => record.id}
            dataSource={data}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {}, // click row
                    onDoubleClick: event => {}, // double click row
                    onContextMenu: event => {}, // right button click row
                    onMouseEnter: event => { /*console.log('enter', record.id) */}, // mouse enter row
                    onMouseLeave: event => {}, // mouse leave row
                };
            }}
        >
            <Column width={300} title="Aplicación" dataIndex="name" key="name" render={renderApplicationName} />
            <Column width={140} title="Entorno" dataIndex="environment" key="environment" render={renderEnvironment}/>
            <Column width={180} title="Estadisticas Día" align='center' dataIndex="daySales" key="daySales" render={renderStatistics}/>
            <Column width={230} title="Modificado por" dataIndex="createdBy" key="createdBy" render={renderUser}/>
            <Column width={120} title="Fecha Creación" dataIndex="creationDate" key="creationDate" render={renderDate}/>
            <Column width={120} title="Fecha Modificación" dataIndex="updatedDate" key="updatedDate" render={renderDate2}/>
            <Column width={150} align='center' title="Acciones" dataIndex="" key="a" render={(e,r) => renderActions(e,r,onEdit)}/>
        </Table>
    )
};

export default ApplicationList
