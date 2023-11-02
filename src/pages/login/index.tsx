import React, {useState} from 'react'
import {Layout} from "../../components/layout/layout";
import {Card, Form, Input, Row} from "antd";
import {CustomInput} from "../../components/custom-input";
import {PasswordInput} from "../../components/password-input";
import {CustomButton} from "../../components/custom-button";
import {useLoginMutation, User} from "../../app/services/auth";
import {ErrorAlert} from "../../components/error-alert";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
    const [loginUser, loginUserResult] = useLoginMutation()
    const [error, setError] = useState('')
    const onLogin = async (data: User) => {
        try {
            await loginUser(data).unwrap();
            navigate('/')
        } catch(err) {
            console.log(err)
            const isErrorWithData = isErrorWithMessage(err)
            if(isErrorWithData) {
                if (err.status == 400) {
                    setError('Неправильный логин или пароль')
                }
            } else {
                setError('Неизвестная ошибка')
            }
        }
    }

    return (
        <Layout>
            <Row align={"middle"} justify={"center"}>
                <Card title='Авторизация' style={{width: '30rem'}}>
                    <Form onFinish={onLogin}>
                        <CustomInput
                            type={'text'}
                            name={'username'}
                            placeholder={'Имя пользователя'}
                        />
                        <PasswordInput
                            name={'password'}
                            placeholder={'Пароль'}
                        />
                        <CustomButton
                            type={"primary"}
                            htmlType={'submit'}
                        > Войти
                        </CustomButton>
                        <ErrorAlert message={error}></ErrorAlert>
                    </Form>
                </Card>
            </Row>
        </Layout>
    )
}