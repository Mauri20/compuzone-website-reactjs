import ReactSelect from 'react-select';
import styled from 'styled-components';

export const StyleSelect = styled(ReactSelect)`
  margin-bottom: 20px;

  .react-select__control {
    min-height: 45px;
    width: 200px;
    border: none;
    border-radius: 16px;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.input};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.shadowInput};
  }

  .react-select__value-container {
    color: ${({ theme }) => theme.colors.text};
  }

  .react-select__option {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.input};
  }

  .react-select__option--is-focused {
    background: ${({ theme }) => theme.colors.secondary};
  }

  .react-select__option--is-selected {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
