import { useLogOutMutation } from '@/features';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { PATH } from '@/app';

export const Header = () => {
  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate(PATH.LOGIN_PAGE);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
};
