import { CSSObjectWithLabel } from 'react-select';

export const customStyles = {
  control: (
    base: CSSObjectWithLabel,
    { isFocused }: { isFocused: boolean }
  ) => ({
    ...base,
    border: isFocused ? '1px solid #525252' : '1px solid #AEAEAE',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #525252'
    }
  }),
  option: (
    base: CSSObjectWithLabel,
    { isSelected, isFocused }: { isFocused: boolean; isSelected: boolean }
  ) => ({
    ...base,
    height: '100%',
    backgroundColor: isSelected ? '#2E8BC0' : isFocused ? '#B1D4E0' : 'white'
  })
};
