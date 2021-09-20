import { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import HeaderTitle from '../generic/HeaderTitle';
import { connect } from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';

const Login = (props) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    values.grant_type = 'password';
    setLoading(true);

    let config = {
      method: 'POST',
      url: 'https://uitestapi.tipax.ir/api/v1/Users/Token',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(values),
    };

    axios(config)
      .then(({ data }) => {
        if (data.isSuccess) {
          setErrorMsg('');
          cookie.set('user', values.username,{ expires: data.data.expires_in })
          cookie.set('token', `${data.data.token_type} ${data.data.access_token}`, { expires: data.data.expires_in });
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
    <div>
      <HeaderTitle title={props.title} />
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
          label='نام کاربری'
          name='username'
          rules={[
            {
              required: true,
              message: 'نام کاربری خود را وارد کنید',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='پسورد'
          name='password'
          rules={[
            {
              required: true,
              message: 'پسورد خود را وارد کنید',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 1,
          }}>
          <Button type='primary' htmlType='ورود'>
            ورود
          </Button>
        </Form.Item>
        <div style={{ textAlign: 'center' }}>{loading && <Spin />}</div>
      </Form>
      <p style={{ textAlign: 'center', color: 'red' }}>{errorMsg}</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setValues: function (data) {
    dispatch({ type: 'LOGIN', payload: data });
  },
});

export default connect(null, mapDispatchToProps)(Login);
