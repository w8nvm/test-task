import {Layout} from "../../components/layout";
import {
    CheckOutlined,
    CloseOutlined,
    PlusCircleOutlined
} from "@ant-design/icons";
import {useGetAllUsersQuery, useRemoveUserMutation} from "../../app/services/users";
import {Button, Input, Row, Space, Table} from "antd";
import {selectUser, User} from "../../app/services/auth";
import {ColumnsType} from "antd/es/table";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../Paths";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


export const Users = () => {
    const [removeUser] = useRemoveUserMutation();
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const {data, refetch, isLoading} = useGetAllUsersQuery()
    const [searchValue, setSearchValue] = useState('');


    const handleRemoveUser = async (id: number) => {
        try {
            await removeUser(id).unwrap()
            refetch()
        } catch(err) {
            //todo: create alert of some sort
        }
    }

    const columns: ColumnsType<User> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            filterMode: "menu",
            filterSearch: true,
            onFilter: (value: string | number | boolean, record) => record.username.startsWith(value.toString()),
        }, {
            title: 'Имя',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (text) => text === '' ? <div style={{color: 'grey'}}> empty </div> : <p>{text}</p>
        }, {
            title: 'Фамилия',
            dataIndex: 'last_name',
            key: 'last_name',
            render: (text) => text === '' ? <div style={{color: 'grey'}}> empty </div> : <p>{text}</p>
        }, {
            title: 'Активен',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive) => isActive ? <CheckOutlined /> : <CloseOutlined />
        }, {
            title: 'Последняя активность',
            dataIndex: 'last_login',
            key: 'last_login',
            render: (text) => {
                if (text === null) {
                    return <div style={{color: 'grey'}}> empty </div>
                }
                return text === '' ? <div style={{color: 'grey'}}> empty </div> : <p>{text}</p>
            }
        }, {
            title: 'SuperUser',
            dataIndex: 'is_superuser',
            key: 'is_superuser',
            render: (isActive) => {return isActive ? <CheckOutlined /> : <CloseOutlined />}
        }, {
            title: "Отредактировать",
            key: 'edit',
            render: (user) => {
                if(user.id === 1) {
                    return (<></>)
                }
                return (
                    <Space size="middle">
                        <Button onClick={() => {navigate(`/user/edit/${user.id}`)}}>Edit</Button>
                    </Space>
                )
            }

        }, {
            title: 'Удалить',
            key: 'Delete',
            render: (user) => {
                if(user.id === 1) {
                    return (<></>)
                }
                return (
                    <Space size="middle">
                        <Button onClick={() => {handleRemoveUser(user.id)}}>Delete</Button>
                    </Space>
                )
            }
        },
    ]


    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [navigate, user])

    return (
        <Layout>
            <Row style={{marginBottom: '20px'}}>
                <Button type="primary" onClick={() => navigate(Paths.addUser)} icon={ <PlusCircleOutlined /> } style={{marginRight: '20px'}}>
                    Добавить
                </Button>
                <Input
                    placeholder="Search Name"
                    value={searchValue}
                    onChange={e => {
                        setSearchValue(e.target.value);
                    }}
                    style={{width: '25%'}}
                />
            </Row>

            <Table
                loading={isLoading}
                dataSource={data?.filter(entry => entry.username.toLowerCase().includes(searchValue))}
                pagination={false}
                columns={columns}
                rowKey={(user) => user.id}
            >
            </Table>
        </Layout>
    )
}