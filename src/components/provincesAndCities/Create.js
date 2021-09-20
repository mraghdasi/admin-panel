import React, { useState } from 'react';
import { Modal, Button, Form, Input, Spin } from 'antd';
import axios from 'axios';
import cookie from 'js-cookie';

const Create = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onFinish = (values) => {
    setLoading(true);
    const token = cookie.get('token');

    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: JSON.stringify(values),
    };

   if(!props.isCity) {
    config.url = 'https://uitestapi.tipax.ir/api/v1/Provinces'
   }else{
    config.url = 'https://uitestapi.tipax.ir/api/v1/Cities'
   }

   axios(config)
   .then(({ data }) => {
     if (data.isSuccess) {
       setErrorMsg('');
       props.setValues(data.data);
     } else {
       setLoading(false);
     }
   })
   .catch(function (error) {
     console.log(error.response.data);
     setErrorMsg(error.response.data.Message);
     setLoading(false);
   });
  };

  return (
    <>
      <Button type='primary' onClick={() => setVisible(true)}>
        ایجاد {!props.isCity ? 'استان' : 'شهر'}
      </Button>
      <Modal footer={null} title={!props.isCity ? 'ایجاد استان جدید' : 'ایجاد شهر جدید'} centered visible={visible} onCancel={() => setVisible(false)} width={500}>

        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete='off'>
          <Form.Item
            label={!props.isCity ? ' استان جدید' : ' شهر جدید'}
            name='title'
            rules={[
              {
                required: true,
                message: !props.isCity ? ' استان جدید را وارد کنید' : ' شهر جدید را وارد کنید',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 1,
            }}>
            <Button type='primary' htmlType='ثبت'>
              ثبت
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>{loading && <Spin />}</div>
          <p style={{ textAlign: 'center', color: 'red' }}>{errorMsg}</p>
        </Form>
      </Modal>
    </>
  );
};

export default Create;
