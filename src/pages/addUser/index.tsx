import {Layout} from "../../components/layout/layout";
import {Row} from "antd";
import {UserForm} from "../../components/user-form";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser, User} from "../../app/services/auth";
import {useAddUserMutation} from "../../app/services/users";
import {Paths} from "../../Paths";
import {isErrorWithMessage} from "../../utils/is-error-with-message";

export const AddUser = () => {

    const [error, setError] = useState()
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
        if(!user) {
            navigate('login')
        }
    }, [user, navigate]);

    const handleAddUser = async (data: User) => {
        try {
            await addUser(data).unwrap()
            navigate(`/`)
        } catch(err) {
            if(typeof err === "object" && err !== null && 'data' in err) {
                // @ts-ignore
                setError(err.data)
            }
        }
    }

    const logErrors = (errorInfo: any) => {
        console.log(errorInfo)
    }

    return (
        <Layout>
            <Row align={"middle"} justify={"center"}>
                <UserForm
                    onFinish={handleAddUser}
                    onFinishFailed={logErrors}
                    title={"Добавить пользователя"}
                    btnText="Добавить"
                    error={error}
                    user={defaultUser}
                />
            </Row>
        </Layout>
    )
}