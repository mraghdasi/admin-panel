import "antd/dist/antd.css"
import { Layout } from "antd"
import Header from "./generic/Header"
import Sidebar from "./generic/Sidebar"
import UserList from "./person/List"
import "../assets/scss/header.scss"

const { Header: HeaderAnt, Footer, Sider, Content } = Layout

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
                        <UserList />
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    )
}

export default App
