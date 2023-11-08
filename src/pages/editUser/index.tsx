import {Row} from "antd";
import {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEditUserMutation, useGetUserQuery} from "../../app/services/users";
import {UserForm} from "../../components/userForm";
import {Layout} from "../../components/layout";
import {User} from "../../app/services/auth";
import {Paths} from "../../Paths";

export const EditUser = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const [error, setError] = useState<any>("");
    const {data, isLoading} = useGetUserQuery(params.id || "");
    const [editUser] = useEditUserMutation();

    if (isLoading) {
        return <span>Загрузка</span>
    }

    const handleEditUser = async (user: User) => {
        try {
            const editedUser = {
                ...data,
                ...user
            };

            await editUser(editedUser).unwrap();

            navigate(Paths.home);
        } catch (err) {
            if (typeof err === "object" && err !== null && 'data' in err) {
                setError(err.data)
            }
        }
    };

    return (
        <Layout>
            <Row align="middle" justify="center">
                <UserForm
                    onFinish={handleEditUser}
                    title="Редактировать сотрудника"
                    user={data}
                    btnText="Редактировать"
                    error={error}
                />
            </Row>
        </Layout>
    );
};