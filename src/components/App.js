import 'antd/dist/antd.css';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './generic/Header';
import Sidebar from './generic/Sidebar';
import '../assets/scss/header.scss';
import {connect} from 'react-redux';
import Dashboard from './generic/Dashboard';
import Login from './login/Login';
import Province from './provinces/List';
import AuthRoute from './login/AuthRoute'

const { Header: HeaderAnt, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <HeaderAnt>
          <Header />
        </HeaderAnt>
        <Layout>
          <Sider>
            <Sidebar />
          </Sider>
          <Content className='content'>
            <Switch>
            <AuthRoute path="/" exact render={() => (<Dashboard title="پنل مدیریتی" />)} />
            <AuthRoute path="/login" render={() => (<Login title="صفحه ورود" />)} type="guest" />
            <AuthRoute path="/province"  render={() => (<Province title="لیست استان‌ها" />)}  type="private" />
            </Switch>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}



export default App;
