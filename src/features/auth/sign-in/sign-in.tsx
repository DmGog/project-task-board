import { Button, Form, FormProps, Input, Typography } from 'antd';
import s from './sign-in.module.scss';
import { useSigInMutation } from '@/features';
import { Link, useNavigate } from 'react-router';
import { PATH } from '@/app';

const { Title } = Typography;

type FieldType = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const [signIn] = useSigInMutation();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    console.log(values);
    try {
      const response = await signIn(values).unwrap();
      navigate(PATH.DASHBOARD_PAGE);
      console.log(response);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('errorInfo', errorInfo);
  };

  return (
    <Form className={s.form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Title level={4} className={s.title}>
        Авторизация
      </Title>
      <Form.Item<FieldType> name="email" rules={[{ required: true, message: 'Введите корректный e-mail!' }]}>
        <Input className={s.inputForm} placeholder="Введите e-mail" />
      </Form.Item>
      <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Введите корректный пароль!' }]}>
        <Input.Password placeholder="Введите пароль" className={s.inputForm} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" className={s.btn}>
          Войти
        </Button>
      </Form.Item>
      <Link to={PATH.REGISTRATION_PAGE} className={s.link}>
        Зарегистрироваться
      </Link>
    </Form>
  );
};
