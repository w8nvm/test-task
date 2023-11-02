import { Row } from "antd";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEditUserMutation, useGetUserQuery } from "../../app/services/users";
import { UserForm } from "../../components/user-form";
import { Layout } from "../../components/layout/layout";
import { Paths } from "../../Paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import {User} from "../../app/services/auth";

export const EditUser = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const [error, setError] = useState("");
    const { data, isLoading } = useGetUserQuery(params.id || "");
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

            navigate(`${Paths.status}/created`);
        } catch (err) {
            const maybeError = isErrorWithMessage(err);

            if (maybeError) {
                setError(err.data.message);
            } else {
                setError("Неизвестная ошибка");
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
                    error={ error }
                />
            </Row>
        </Layout>
    );
};