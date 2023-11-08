import React, {useState} from 'react'
import {Layout} from "../../components/layout";
import {Card, Form, Row} from "antd";
import {CustomInput} from "../../components/customInput";
import {PasswordInput} from "../../components/passwordInput";
import {CustomButton} from "../../components/customButton";
import {useLoginMutation, User} from "../../app/services/auth";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../Paths";
import {ErrorAlert} from "../../components/errorAlert";

export const Login = () => {
    const navigate = useNavigate()
    const [loginUser] = useLoginMutation()
    const [error, setError] = useState<any>()
    const onLogin = async (data: User) => {
        try {
            await loginUser(data).unwrap();
            navigate(Paths.home)
        } catch (err) {
            console.log(err)
            if (typeof err === "object" && err !== null && 'data' in err) {
                setError(err.data)
            } else {
                setError('Неизвестная ошибка')
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title='Авторизация' style={{width: '30rem'}}>
                    <Form onFinish={onLogin}>
                        <CustomInput
                            type='text'
                            name='username'
                            placeholder='Имя пользователя'
                            errorMsg={error?.username}
                            validateStatus={error?.username ? 'error' : 'validating'}
                        />
                        <PasswordInput
                            name='password'
                            placeholder='Пароль'
                            errorMsg={error?.password}
                            validateStatus={error?.password ? 'error' : 'validating'}
                        />
                        <CustomButton
                            type="primary"
                            htmlType='submit'
                        > Войти
                        </CustomButton>
                        <ErrorAlert message={error?.non_field_errors ? error['non_field_errors'] : ''}/>
                    </Form>
                </Card>
            </Row>
        </Layout>
    )
}