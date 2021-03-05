import React, { Component } from "react"
import axios from "axios"
import AntTable from "../utils/Table"

class List extends Component {
    state = {
        users: [],
        load: true,
    }

    componentDidMount() {
        axios("https://jsonplaceholder.typicode.com/users")
            .then((res) => this.setState({ users: res.data }))
            .finally(() => {
                this.setState({ load: false })
            })
    }

    columns = [
        {
            title: "Name",
            key: "name",
        },
        {
            title: "UserName",
            key: "username",
        },
        {
            title: "Address",
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
                <AntTable
                    columns={this.columns}
                    data={this.state.users}
                    loading={this.state.load}
                    pagination={{
                        defaultPageSize: 4,
                        // showSizeChanger: true,
                        // pageSizeOptions: ["10", "20", "30"],
                    }}
                />
            </div>
        )
    }
}

export default List
