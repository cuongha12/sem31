import { Button, Col, Drawer, Form, Input, InputNumber, Modal, Row, Select, Space, Switch, Upload, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import FormItem from 'antd/es/form/FormItem'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import VariantProduct from './VariantProduct'


const CreateProduct = ({ open, setOpen, title, record }) => {
    const { axiosJWT, user, category, item, color, size, getProduct } = useContext(AppContext)
    const [form] = Form.useForm()
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    console.log(category);
    // const result = record?.variant?.reduce(
    //     (a, b) => a.includes(b.colorId)
    //         ? a : [...a, b.colorId], [])
    // let data = []
    // result.forEach((e) => {
    //     record?.variant?.forEach((a) => {
    //         if (e === a.colorId) {
    //             data.push({
    //                 color: a.colorId,
    //                 size: record?.variant?.reduce(
    //                     (a, b) => a.includes(b.sizeId)
    //                         ? a : [...a, b.sizeId], []),
    //                 quantity: a.quantity,
    //             })
    //         }
    //     })
    // })
    // const unique = [...new Map(data.map((m) => [m.color, m])).values()];
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const onClose
        = async (type, data) => {
            if (type === 'add') {
                let option = []
                data?.variant?.forEach((e) => {
                    option.push({
                        quantity: e.quantity,
                        colorId: e.color,
                        sizeId: e.size
                    })
                })
                const formData = new FormData();
                formData.append('name', data.name)
                formData.append('price', data.price)
                formData.append('sale', data.sale)
                formData.append('status', data.status)
                formData.append('hot', data.hot)
                formData.append('categoryId', data.category)
                formData.append('itemId', data.item)
                formData.append('option', JSON.stringify(option));
                for (let i = 0; i < fileList.length; i++) {
                    formData.append('file', fileList[i].originFileObj)
                }
                try {
                    const res = await axiosJWT.post('/product/create', formData, {
                        headers: {
                            Authorization: `Bearer ${user?.accessToken}`
                        }
                    })
                    if (res.data.status === 201) {
                        message.success(`${res.data.mess}`)
                        getProduct()
                        setOpen(false)
                    } else {
                        message.error(`${res.data.mess}`)
                    }
                } catch (error) {
                    message.error(`Lỗi server`)
                }
            }
            else if (type === 'edit') {
                let option = []
                data?.variant?.forEach((e) => {
                    option.push({
                        quantity: e.quantity,
                        colorId: e.color,
                        productId: record?.id,
                        sizeId: e.size
                    })
                })
                console.log(fileList);
                const formData = new FormData();
                formData.append('name', data.name)
                formData.append('price', data.price)
                formData.append('sale', data.sale)
                formData.append('status', data.status)
                formData.append('hot', data.hot)
                formData.append('categoryId', data.category)
                formData.append('itemId', data.item)
                formData.append('option', JSON.stringify(option));
                for (let i = 0; i < fileList.length; i++) {
                    formData.append('file', fileList[i].originFileObj)
                }
                try {
                    const res = await axiosJWT.put(`/product/update/${record?.id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${user?.accessToken}`
                        }
                    })
                    if (res.data.status === 201) {
                        getProduct()
                        message.success(`${res.data.mess}`)
                        setOpen(false)
                    }
                    else {
                        message.error(`${res.data.mess}`)
                    }
                } catch (error) {
                    message.error(`Lỗi server`)
                }
            }
            else {
                setOpen(false)
            }
        }
    const handleChange = (index) => {
        const attributes = form.getFieldValue('variant') || [];
        attributes[index].size = undefined; // xóa giá trị options tại chỉ số
        form.setFieldsValue({ attributes });
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const getImage = async (req, res) => {
        try {
            return await axiosJWT.get(`/product/images/${record?.id}`, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }).then((res) => {
                if (title === "Thêm sản phẩm") {
                    setFileList([])
                } else {
                    setFileList(res?.data?.data?.map((e) => {
                        return {
                            uid: e.id,
                            name: e.image,
                            status: 'done',
                            url: `/uploads/${e.image}`,
                        }
                    }))
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getImage()
    }, [])
    const handleCancel = () => {
        setPreviewOpen(false)
    };
    const handlePreview = async (file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChanges = ({ fileList: newFileList, file }) => {
        const check = newFileList.find((e) => e.uid === file.uid)
        if (check === undefined) {
            const checkuId = record?.image?.find((e) => e.id === file.uid) || undefined
            if (checkuId !== undefined) {
                Swal.fire({
                    title: 'Bạn chắc chắn muốn xoá',
                    showDenyButton: true,
                    confirmButtonText: 'Có',
                    denyButtonText: `Không`,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const res = await axiosJWT.delete(`/product/delete/image/${file.uid}`, {
                                headers: {
                                    Authorization: `Bearer ${user?.accessToken}`
                                }
                            })
                            if (res.data.status === 201) {
                                message.success(`${res.data.mess}`)
                                getImage()
                                setFileList(newFileList)
                            } else {
                                message.error(`${res.data.mess}`)
                            }
                        } catch (error) {
                            message.error(`Lỗi server`)
                        }
                    }

                })
            } else {
                setFileList(newFileList)
            }
        } else {
            setFileList(newFileList)
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <div>
            <Drawer
                title={title}
                width={1000}
                onClose={() => onClose('back')}
                placement="right"
                open={open}
                footer={
                    <>
                        <Space>
                            <Button type="primary" htmlType="submit" danger form="profile-form">
                                Lưu lại
                            </Button>
                            <Button type="primary" onClick={() => onClose("back")}>
                                Quay lại
                            </Button>
                        </Space>
                    </>
                }
            >
                <Space>
                    <Form
                        name="profile-form"
                        layout="vertical"
                        form={form}
                        wrapperCol={{
                            span: 22
                        }}
                        style={{
                            maxWidth: 1000,
                        }}
                        encType="multipart/form-data"
                        onFinish={value => onClose(title === "Thêm sản phẩm" ? "add" : "edit", value)}
                        initialValues={{
                            remember: true,
                            name: title === "Thêm sản phẩm" ? '' : record?.name,
                            status: title === "Thêm sản phẩm" ? false : record?.status,
                            hot: title === "Thêm sản phẩm" ? false : record?.status,
                            category: title === "Thêm sản phẩm" ? '' : record?.categoryId,
                            item: title === "Thêm sản phẩm" ? '' : record?.itemId,
                            price: title === "Thêm sản phẩm" ? '' : record?.price,
                            sale: title === "Thêm sản phẩm" ? '' : record?.sale,
                        }}
                    >

                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    name="name"
                                    label={'Tên'}
                                    hasFeedback

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tên không được để trống',
                                        },
                                    ]}                        >
                                    <Input style={{
                                        width: '100%',
                                    }} placeholder="Tên" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="price"
                                    label={'Giá'}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Giá không được để trống',
                                        },
                                        {
                                            type: 'number',
                                            message: 'Vui lòng nhập số',
                                        }
                                    ]}                        >
                                    <InputNumber type='number' style={{
                                        width: '100%',
                                    }} placeholder="Giá" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="sale"
                                    label={'Giảm giá'}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Giảm giá không được để trống',
                                        },
                                        {
                                            type: 'number',
                                            message: 'Vui lòng nhập số',
                                        }
                                    ]}                        >
                                    <InputNumber type='number' min={0} max={100} style={{
                                        width: '100%',
                                    }} placeholder="Giảm giá" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item valuePropName="checked" name="status" label={"Trạng thái"}>
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item valuePropName="checked" name="hot" label={"Sản phẩm nổi bật"}>
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <FormItem name="category" label={"Danh mục"}>
                                    <Select
                                        showSearch
                                        style={{
                                            width: 200,
                                        }}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={category.filter((e) => e.status !== true).map((e) => {
                                            return {
                                                value: e.id,
                                                label: e.name
                                            }
                                        })}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem name="item" label={"Đồ"}>
                                    <Select
                                        showSearch
                                        style={{
                                            width: 200,
                                        }}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={item.filter((e) => e.status !== true).map((e) => {
                                            return {
                                                value: e.id,
                                                label: e.name
                                            }
                                        })}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChanges}

                                        beforeUpload={() => {
                                            return false
                                        }}

                                    >
                                        {fileList.length === 4 ? null : uploadButton}
                                    </Upload>
                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                        <img
                                            alt="example"
                                            style={{
                                                width: '100%',
                                            }}
                                            src={previewImage}
                                        />
                                    </Modal>
                                </Form.Item>
                            </Col>
                            {
                                title === "Thêm sản phẩm" && <Col span={24}>
                                    <Form.List name="variant">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }, index) => (

                                                    < Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'color']}
                                                            rules={[{ required: true, message: 'Vui lòng không để trống' }]}
                                                        >
                                                            <Select
                                                                placeholder="Màu"
                                                                onChange={() => handleChange(index)}
                                                                style={{
                                                                    width: 200,
                                                                }}
                                                                options={color.filter((e) => e.status !== true).map((e) => {

                                                                    return {
                                                                        value: e.id,
                                                                        label: e.name
                                                                    }
                                                                })}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'size']}
                                                            rules={[{ required: true, message: 'Vui lòng không để trống' }]}
                                                        >
                                                            <Select
                                                                placeholder="Size"
                                                                // onChange={handleChange}
                                                                style={{
                                                                    width: 200,
                                                                }}
                                                                options={size.filter((e) => e.status !== true).map((e) => {
                                                                    return {
                                                                        value: e.id,
                                                                        label: e.name,
                                                                    }
                                                                })}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'quantity']}

                                                        >
                                                            <InputNumber style={{
                                                                width: 200,
                                                            }} placeholder="Số lượng" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}

                                                <Form.Item>
                                                    <Button type="dashed" style={{
                                                        width: '20%',
                                                    }} onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add field
                                                    </Button>
                                                </Form.Item>
                                                <Form.Item>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>

                                </Col>
                            }
                        </Row>
                    </Form>
                </Space>
                {
                    title === 'Sửa sản phẩm' && <Space>
                        <VariantProduct axiosJWT={axiosJWT} user={user} color={color} size={size} id={record?.id} />
                    </Space>
                }
            </Drawer>
        </div >
    )
}

export default CreateProduct
