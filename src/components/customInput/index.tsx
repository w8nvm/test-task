import React from 'react'
import {Form, Input} from 'antd'

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

type Props = {
    name: string;
    placeholder: string;
    type?: string;
    validateStatus?: ValidateStatus
    errorMsg?: string
}

export const CustomInput = (
    {
        name,
        placeholder,
        type = "text",
        validateStatus,
        errorMsg
    }: Props) => {
    return (
        <Form.Item
            name={name}
            rules={[]}
            shouldUpdate={true}
            help={errorMsg}
            validateStatus={validateStatus}
        >
            <Input
                placeholder={placeholder}
                type={type}
                size="large"
            ></Input>
        </Form.Item>
    )
}