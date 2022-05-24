import MenuNavbar from 'components/Molecules/MenuNavbar';
import Title from 'components/Atoms/Tittle';
import { StyleNavbar } from './style';

const Navbar = () => {
  return (
    <StyleNavbar>
      <Title color="secondary">ZeligStore</Title>
      <MenuNavbar />
    </StyleNavbar>
  );
};

export default Navbar;
