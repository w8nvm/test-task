import {User} from "../../app/services/auth";
import {Card, Checkbox, Form, Space} from "antd";
import {CustomInput} from "../customInput";
import {CustomButton} from "../customButton";

type Props<T> = {
    onFinish: (values: T) => void
    btnText: string
    title: string
    error?: any
    onFinishFailed?: (errorInfo: any) => void
    user?: T
}

export const UserForm = ({
                             btnText,
                             title,
                             error,
                             user,
                             onFinish,
                             onFinishFailed
                         }: Props<User>) => {
    return (
        <Card title={title} style={{width: '30rem'}}>
            <Form name='add-user' onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={user}>
                <CustomInput errorMsg={error?.username} validateStatus={error?.username ? 'error' : 'validating'}
                             name='username' placeholder='Никнейм'/>
                <CustomInput errorMsg={error?.password} validateStatus={error?.password ? 'error' : 'validating'}
                             name='password' placeholder='Пароль'/>
                <CustomInput name='first_name' placeholder='Имя'/>
                <CustomInput name='last_name' placeholder='Фамилия'/>
                <Space direction="vertical" size="large">
                    <Form.Item name="is_active" valuePropName='checked'>
                        <Checkbox> Is Active </Checkbox>
                    </Form.Item>
                    {/*<ErrorAlert />*/}
                    <CustomButton htmlType="submit"> {btnText} </CustomButton>
                </Space>
            </Form>
        </Card>
    )
}