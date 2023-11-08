import {Form, Input} from 'antd'
import {NamePath} from 'antd/es/form/interface'

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

type Props = {
    name: string;
    placeholder: string;
    dependencies?: NamePath[],
    validateStatus?: ValidateStatus
    errorMsg?: string
}

export const PasswordInput = ({
                                  name,
                                  placeholder,
                                  dependencies,
                                  validateStatus,
                                  errorMsg
                              }: Props) => {
    return (
        <Form.Item
            name={name}
            dependencies={dependencies}
            help={errorMsg}
            validateStatus={validateStatus}
        >
            <Input.Password placeholder={placeholder} size='large'></Input.Password>
        </Form.Item>
    )
}