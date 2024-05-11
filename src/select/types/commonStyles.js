import styled from 'styled-components';

export const Wrapper = styled.div`
    width: calc(100% - 10px);
    padding: 0 5px;
    /**
     * Set it to flex so we can set flex-grow on the label, otherwise clicking 
     * to the right of where the text ends wouldn't select the option
     */
    display: flex;
    &:has(> input:checked) {
        background-color: ${props => props.theme.accentColorLight};
    }
`;

export const Label = styled.label`
    display: inline-block;
    width: 100%;
    padding: 10px 5px;
    flex-grow: 1;
`;

export const Input = styled.input`
    &[type=radio] {
        display: none;
    }
    &:checked + ${Label} {

    }
`;
