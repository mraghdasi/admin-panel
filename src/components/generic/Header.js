import { Typography } from "antd"

const { Title } = Typography

const Header = () => {
    return (
        <div>
            <Title className={"headers"} level={2}>
                پنل من
            </Title>
        </div>
    )
}

export default Header
