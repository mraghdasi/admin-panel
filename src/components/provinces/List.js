import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import axios from 'axios';
import AntTable from '../utils/Table';
import HeaderTitle from '../generic/HeaderTitle';
import { Input, Space, Button } from 'antd';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
const { Search } = Input;

const List = (props) => {
  const [load, setLoad] = useState(true);
  const [isCity, setIsCity] = useState(false);
  const token = cookie.get('token');

  useEffect(() => {
    let isMounted = false;
    axios('https://uitestapi.tipax.ir/api/v1/Provinces', { headers: { Authorization: token } })
      .then((res) => {
        if (!isMounted) {
          props.setProvinces(res.data.data);
          props.setFilterProvinces(res.data.data);
        }
      })
      .finally(() => {
        setLoad(false);
      });

    return () => {
      isMounted = true;
    };
  }, []);

  useEffect(() => {
    let isMounted = false;
    axios('https://uitestapi.tipax.ir/api/v1/Cities', { headers: { Authorization: token } })
      .then((res) => {
        if (!isMounted) {
          props.setCities(res.data.data);
        }
      })
      .finally(() => {
        setLoad(false);
      });
    return () => {
      isMounted = true;
    };
  }, []);

  const remove = (id) => {
    props.setFilterProvinces(props.provincesFilter.filter((item) => item.id !== id));
  };

  let columns = [
    {
      title: 'id',
      key: 'id',
    },
    {
      title: 'استان',
      key: 'title',
    },
    {
      title: 'مشاهده',
      key: 'Viewe_action',
      render: (field, record) => (
        <span
          style={{ fontSize: '16px', cursor: 'pointer' }}
          onClick={(e) => {
            const filteredCities = props.cities.filter(({ provinceTitle: id1 }) => record.title === id1);
            props.setProvincesFilterCities(filteredCities);
            console.log(filteredCities);
            setIsCity(true);
          }}>
          <EyeOutlined style={{ color: '#40a9ff' }} />
        </span>
      ),
    },
    {
      title: 'ویرایش',
      key: 'edit_action',
      render: (field, record) => (
        <span
          style={{ fontSize: '16px', cursor: 'pointer' }}
          onClick={(e) => {
            remove(record.id);
          }}>
          <EditOutlined style={{ color: '#40a9ff' }} />
        </span>
      ),
    },
    {
      title: 'حذف',
      key: 'Delete_action',
      render: (field, record) => (
        <span
          style={{ fontSize: '16px', cursor: 'pointer' }}
          onClick={(e) => {
            let isRemove = window.confirm('آیا مطمئن هستید تا پاک کنید؟');
            if (isRemove) {
              remove(record.id);
            }
          }}>
          <DeleteOutlined style={{ color: 'red' }} />
        </span>
      ),
    },
  ];

  if (isCity) columns.splice(2, 1);

  let { provinces, setFilterProvinces, citiesFilterFromProvinces, setSearchCities } = props;
  const onSearch = (e) => {
    let provincesFiltered = provinces.filter((item) => item.title.includes(e.target.value));
    setFilterProvinces(provincesFiltered);

    if (citiesFilterFromProvinces) {
      let citiesFilterFromProvincesed = citiesFilterFromProvinces.filter((item) => item.title.includes(e.target.value));
      console.log(citiesFilterFromProvincesed);
      setSearchCities(citiesFilterFromProvincesed);
    }
  };

  const returnToProvinces = () => setIsCity(false);

  return (
    <div>
      <HeaderTitle title={props.title} />
      <Space style={{ marginBottom: '30px' }} direction='vertical'>
        <Search placeholder='جست‌و‌جو کنید ...' allowClear enterButton='جست‌وجو' size='large' onChange={onSearch} />
      </Space>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button type='primary' size={'middle'}>
          ایجاد {!isCity ? 'استان' : 'شهر'}
        </Button>

        {isCity && (
          <Button type='primary' size={'middle'} onClick={returnToProvinces}>
            بازگشت
          </Button>
        )}
      </div>

      <AntTable
        columns={columns}
        data={!isCity ? props.provincesFilter : props.searchCities?.length ? props.searchCities : props.citiesFilterFromProvinces}
        loading={load}
        pagination={{
          defaultPageSize: 10,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    provinces: state.provinces,
    provincesFilter: state.provincesFilter,
    citiesFilterFromProvinces: state.citiesFilterFromProvinces,
    cities: state.cities,
    searchCities: state.searchCities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProvinces: (data) => {
      dispatch({ type: 'PROVINCES', payload: data });
    },
    setFilterProvinces: (data) => {
      dispatch({ type: 'PROVINCES_FILTER', payload: data });
    },
    setCities: (data) => {
      dispatch({ type: 'CITIES', payload: data });
    },
    setProvincesFilterCities: (data) => {
      dispatch({ type: 'CITIES_FILTER', payload: data });
    },
    setSearchCities: (data) => {
      dispatch({ type: 'CITIES_SEARCH', payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
