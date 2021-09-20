import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { LogoutOutlined, HomeOutlined, UserAddOutlined, UnorderedListOutlined } from '@ant-design/icons';

function Sidebar(props) {
  const { isAuthUser } = props;

  const location = useLocation();
  let selectedItem = location.pathname !== '/' ? location.pathname.substring(1) : '/';
  selectedItem = location.pathname !== '/' ? selectedItem : 'dashboard';

  const loggout = () => {
    props.loggout();
  };

  return (
    <Menu style={{ width: '100%', height: '100vh' }} defaultSelectedKeys={[selectedItem]} mode='inline'>
      <Menu.Item key='dashboard'>
        <HomeOutlined />
        <Link to='/'>داشبورد مدیریتی</Link>
      </Menu.Item>

      {!isAuthUser && (
        <Menu.Item key='login'>
          <UserAddOutlined />
          <Link to='/login'>صفحه ورودی</Link>
        </Menu.Item>
      )}

      {isAuthUser && (
        <Menu.Item key='province'>
          <UnorderedListOutlined />
          <Link to='/province'>لیست استان‌ها</Link>
        </Menu.Item>
      )}

      {isAuthUser && (
        <Menu.Item onClick={loggout} key='logout' style={{ color: 'red' }}>
          <LogoutOutlined />
          <Link style={{ color: 'red' }} to='/'>
            خروج
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

const mapStateToProps = ({ isAuthUser }) => ({
  isAuthUser,
});

const mapDispatchToProps = (dispatch) => ({
  loggout: () => {
    dispatch({ type: 'LOGOUT' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
