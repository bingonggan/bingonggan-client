import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

type PropsType = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  setIsValid: (value: boolean) => void;
};

function NumberInput({ label, value, setValue, setIsValid }: PropsType) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(e.target.value);

    if (newValue > 400 || newValue <= 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    setValue(newValue);
  }

  return (
    <>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput type="number" value={value} onChange={handleChange} />
    </>
  );
}

export default NumberInput;
