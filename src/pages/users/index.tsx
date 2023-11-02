import {Layout} from "../../components/layout/layout";
import {CustomButton} from "../../components/custom-button";
import {
    CheckOutlined,
    CloseOutlined,
    PlusCircleOutlined
} from "@ant-design/icons";
import {removeUser, useAddUserMutation, useGetAllUsersQuery, useRemoveUserMutation} from "../../app/services/users";
import {Button, Space, Table} from "antd";
import {selectUser, User} from "../../app/services/auth";
import {ColumnsType} from "antd/es/table";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../Paths";
import {useSelector} from "react-redux";
import {selectUsers} from "../../features/users/usersSlice";
import {useEffect} from "react";


export const Users = () => {
    const [removeUser] = useRemoveUserMutation();
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const {data, refetch, isLoading} = useGetAllUsersQuery()


    const handleRemoveUser = async (data: number) => {
        try {
            await removeUser(data).unwrap()
            refetch()
        } catch(err) {
            console.log(err)
        }
    }

    const columns: ColumnsType<User> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
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
                if(user.id == 1) {
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
                if(user.id == 1) {
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
            <CustomButton type="primary" onClick={() => navigate(Paths.addUser)} icon={ <PlusCircleOutlined /> }>
                Добавить
            </CustomButton>
            <Table
                loading={isLoading}
                dataSource={data}
                pagination={false}
                columns={columns}
                rowKey={(user) => user.id}

                // onRow={(user) => {
                //     return {
                //         onClick: () => navigate(`${Paths.user}/${user.id}`)
                //     }
                // }}
            >
            </Table>
        </Layout>
    )
}