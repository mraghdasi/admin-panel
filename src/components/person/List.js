import React, { Component } from "react"
import { Table } from "antd"
import axios from "axios"

class List extends Component {
    state = {
        users: [],
    }

    componentDidMount() {
        axios("https://jsonplaceholder.typicode.com/users").then((res) =>
            this.setState({ users: res.data }),
        )
    }

    columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "UserName",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (feild, record) => (
                <span>{`${feild.city} ${feild.suite}`}</span>
            ),
        },

        {
            title: "Action",
            key: "action",
            render: (field, record) => (
                <button
                    onClick={(e) => {
                        this.remove(record.id)
                        console.log(record.id)
                    }}>
                    remove
                </button>
            ),
        },
    ]

    remove = (id) => {
        this.setState({
            users: this.state.users.filter((item) => item.id !== id),
        })
    }

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.users} />
            </div>
        )
    }
}

export default List
