import styles from './index.module.css'
import {LoginOutlined, LogoutOutlined, TeamOutlined} from '@ant-design/icons'
import {Layout, Space, Typography} from "antd";
import {CustomButton} from "../customButton";
import {Link, useNavigate} from 'react-router-dom'
import {Paths} from "../../Paths";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../app/services/auth";
import {logout} from "../../features/auth/authSlice";

export const Header = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogoutClick = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate(Paths.login)
    }

    return (
        <Layout.Header className={styles.header}>
            <Space align={'baseline'}>
                <TeamOutlined className={styles.teamIcon}/>
                <Link to={Paths.home}>
                    <CustomButton type='text'>
                        <Typography.Title level={3}>
                            Emphasoft
                        </Typography.Title>
                    </CustomButton>
                </Link>
            </Space>
            {
                user ? (
                    <CustomButton
                        type={'default'}
                        icon={<LogoutOutlined/>}
                        onClick={onLogoutClick}
                    > Выйти
                    </CustomButton>
                ) : (
                    <Space align={"center"}>
                        <Link to={Paths.login}>
                            <CustomButton
                                type='default'
                                icon={<LoginOutlined/>}
                            >
                                Войти
                            </CustomButton>
                        </Link>
                    </Space>
                )
            }
        </Layout.Header>
    )
}