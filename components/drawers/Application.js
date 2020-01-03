import React, { Component, Fragment } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, Tooltip } from 'antd';

const { Option } = Select;

export class DrawerForm extends Component {
    render() {
        const { onClose, visible, width, title, form: { getFieldDecorator }, destroyOnClose, data } = this.props;
        console.log(data)
        return (
            <Drawer
                title={title || (
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <Icon type={'plus-circle'}  style={{ marginRight: '5px', fontSize: '22px'}}/> Nueva Aplicacion
                    </div>
                )}
                width={width || 720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                destroyOnClose={destroyOnClose}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Nombre">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Nombre es obligatorio' }],
                                    initialValue: data ? data.name : null,
                                })(<Input placeholder="Nombre de la aplicacion" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className={'secret-input'}>
                                <Form.Item  label="Api Key">
                                    {getFieldDecorator('apiKey', {
                                        rules: [{ required: true, message: 'Genera una Llave API' }],
                                        initialValue: data ? data.apiKey : null,
                                    })(
                                        <Input
                                            placeholder="Llave API"
                                            type={'password'}
                                            addonAfter={
                                                <Button.Group>
                                                    <Tooltip title="Muestra la llave">
                                                        <Button  type={'link'} size={'small'} icon={'eye'} />
                                                    </Tooltip>
                                                    <Tooltip title="Genera una nueva llave">
                                                        <Button  type={'link'} size={'small'} icon={'reload'} />
                                                    </Tooltip>
                                                </Button.Group>
                                            }
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <div className={'secret-input'}>
                                <Form.Item label="Clave Secreta">
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: 'Genera una clave secreta' }],
                                        initialValue: data ? data.id : null,
                                    })(<Input
                                        placeholder="Clave Secreta"
                                        type={'password'}
                                        disabled={true}
                                        addonAfter={
                                            <Button.Group>
                                                <Tooltip title="Muestra la llave">
                                                    <Button  type={'link'} size={'small'} icon={'eye'} />
                                                </Tooltip>
                                                <Tooltip title="Genera una nueva llave">
                                                    <Button  type={'link'} size={'small'} icon={'reload'} />
                                                </Tooltip>
                                            </Button.Group>
                                        }
                                    />)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Notes">
                                {getFieldDecorator('notes', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'please enter url description',
                                        },
                                    ],
                                })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={onClose} type="primary">
                        Submit
                    </Button>
                </div>
                <style jsx>
                    {`
                      .secret-input :global(.ant-input-group-addon) {
                        padding: 0 5px;
                        background-color: transparent;
                      }
                      .secret-input :global(.ant-btn-icon-only) {
                       color: rgba(0, 0, 0, 0.25)
                      }
                      .secret-input :global(.ant-btn-icon-only:hover) {
                       color: rgba(0, 0, 0, 0.60)
                      }
                      .secret-input :global(.ant-btn-icon-only:focus) {
                       color: rgba(0, 0, 0, 0.60)
                      }
                      .secret-input :global(.ant-input) {
                        border-right: none;
                      }
                      .secret-input :global(.ant-input:focus) {
                        border-right-width: 0 !important;
                      }
                      .secret-input :global(.ant-input:hover + .ant-input-group-addon) {
                        border-color: #40a9ff;
                        border-right-width: 1px !important;
                      }
                      .secret-input :global(.ant-input:focus + .ant-input-group-addon) {
                        border-color: #40a9ff;
                        outline: 0;
                        -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                      }
                     
    
                  `}
                </style>
            </Drawer>
        )
    }
}

const AplicationForm = Form.create()(DrawerForm);

export default AplicationForm;
