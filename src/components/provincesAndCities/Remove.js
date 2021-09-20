import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import cookie from 'js-cookie';

const Create = (props) => {
  const token = cookie.get('token');

  const removeItemHandler = () => {
    let id = props.record.id;
    let isRemove = window.confirm('آیا مطمئن هستید تا پاک کنید؟');

    let config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    if (!props.isCity) {
      config.url = `https://uitestapi.tipax.ir/api/v1/Provinces/${id}`;
    } else {
      config.url = `https://uitestapi.tipax.ir/api/v1/Cities/${id}`;
    }

    if (isRemove) {
      axios(config)
        .then(({ data }) => {
          props.setValues(data.data);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  };

  return (
    <>
      <DeleteOutlined onClick={removeItemHandler} style={{ color: 'red' }} />
    </>
  );
};

export default Create;
