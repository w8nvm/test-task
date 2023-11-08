import React, {useState} from 'react'
import {Layout} from "../../components/layout";
import {Card, Form, Row} from "antd";
import {CustomInput} from "../../components/customInput";
import {PasswordInput} from "../../components/passwordInput";
import {CustomButton} from "../../components/customButton";
import {useLoginMutation, User} from "../../app/services/auth";
import {ErrorAlert} from "../../components/errorAlert";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../Paths";

export const Login = () => {
    const navigate = useNavigate()
    const [loginUser] = useLoginMutation()
    const [error, setError] = useState('')
    const onLogin = async (data: User) => {
        try {
            await loginUser(data).unwrap();
            navigate(Paths.home)
        } catch (err) {
            if (typeof err === "object" && err !== null && 'status' in err) {
                if (err.status === 400) {
                    setError('Неправильный логин или пароль')
                }
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
                        />
                        <PasswordInput
                            name='password'
                            placeholder='Пароль'
                        />
                        <CustomButton
                            type="primary"
                            htmlType='submit'
                        > Войти
                        </CustomButton>
                        <ErrorAlert message={error}></ErrorAlert>
                    </Form>
                </Card>
            </Row>
        </Layout>
    )
}