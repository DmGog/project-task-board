import { SignIn } from '@/features/auth/sign-in/sign-in';
import s from './login.module.scss';

export const Login = () => {
  return (
    <div>
      <SignIn />
      <div className={s.account}>
        <span>Тестовый аккаунт</span>
        <span>
          E-mail: <span>free@acc.ru</span>
        </span>
        <span>
          Пароль: <span>free</span>
        </span>
      </div>
    </div>
  );
};
