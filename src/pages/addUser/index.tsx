import {Layout} from "../../components/layout";
import {Row} from "antd";
import {UserForm} from "../../components/userForm";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser, User} from "../../app/services/auth";
import {useAddUserMutation} from "../../app/services/users";
import {Paths} from "../../Paths";

export const AddUser = () => {

    const [error, setError] = useState<any>(null)
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [addUser] = useAddUserMutation();
    const defaultUser: User = {
        id: 0,
        is_active: false,
        is_superuser: false,
        last_login: "",
        password: "",
        username: ""

    }

    useEffect(() => {
        if (!user) {
            navigate(Paths.home)
        }
    }, [user, navigate]);

    const handleAddUser = async (data: User) => {
        try {
            await addUser(data).unwrap()
            navigate(Paths.home)
        } catch (err) {
            if (typeof err === "object" && err !== null && 'data' in err) {
                setError(err.data)
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <UserForm
                    onFinish={handleAddUser}
                    title="Добавить пользователя"
                    btnText="Добавить"
                    error={error}
                    user={defaultUser}
                />
            </Row>
        </Layout>
    )
}