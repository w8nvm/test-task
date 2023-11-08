import {Form, Input} from 'antd'
import {NamePath} from 'antd/es/form/interface'

type Props = {
    name: string;
    placeholder: string;
    dependencies?: NamePath[]
}

export const PasswordInput = ({
                                  name,
                                  placeholder,
                                  dependencies
                              }: Props) => {
    return (
        <Form.Item
            name={name}
            dependencies={dependencies}
            rules={[
                {
                    required: true,
                    message: 'Обязательное поле'
                },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (value.length < 6) {
                            return Promise.reject(new Error('Пароль должен быть длиннее 6-ти символов'))
                        } else {
                            return Promise.resolve()
                        }
                    }
                })
            ]}
            hasFeedback
        >
            <Input.Password placeholder={placeholder} size='large'></Input.Password>
        </Form.Item>
    )
}