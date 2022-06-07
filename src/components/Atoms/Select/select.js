import { StyleSelect } from './style';

const Select = ({ options = [], className = '', ...props }) => {
  return (
    <StyleSelect
      className={`react-select-wrapper ${className}`}
      classNamePrefix="react-select"
      options={options}
      {...props}
    />
  );
};

export default Select;
