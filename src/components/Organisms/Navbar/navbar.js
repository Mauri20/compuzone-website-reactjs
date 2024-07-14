import MenuNavbar from 'components/Molecules/MenuNavbar';
import TitleRedirected from 'components/Atoms/TittleWithRedirection';
import { useNavigate } from 'react-router-dom';
import { StyleNavbar } from './style';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <StyleNavbar>
      <TitleRedirected
        color="secondary"
        onClick={() => {
          navigate(`/trademark`);
        }}
      >
        CompuZone
      </TitleRedirected>
      <MenuNavbar />
    </StyleNavbar>
  );
};

export default Navbar;
