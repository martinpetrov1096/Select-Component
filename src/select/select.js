import { useState, useEffect, useMemo } from 'react';
import MultiSelect from './types/multi';
import SingleSelect from './types/single';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme.json';


const SelectDropdown = ({ type, options, identifier}) => {

    const [selected, setSelected] = useState([]);

    const [showDropDown, setShowDropDown] = useState(false);

    /**
     * Enforce that the values of the options are strings. If it was required,
     * we could make them numbers or booleans, but it would complicate the 
     * component more than the requirements specify since html inputs always 
     * return strings. 
     * 
     * Also enforce that the values of options are unique, otherwise there's no
     * way to determine which option was selected.
     */
    useEffect(() => {
        for (const opt of options) {
            if (typeof opt.val !== 'string') {
                throw new Error('Values of options must be strings')
            }
        }
        if (new Set(options.map(opt => opt.val)).size !== options.length) {
            throw new Error('Values of options must be unique');
        }
    }, [options]);


    useEffect(() => {
        if (type === 'select' && selected.length > 1) {
            setSelected(selected => [selected[0]]);
        }
    }, [type]);

    const selectedString = useMemo(() => {
        return options.filter((opt) => {
            return selected.includes(opt.val);
        }).map(opt => opt.string).join(', ');

    }, [selected, options]);


    let component;
    if (type === 'select') {
        component = <SingleSelect options={options} identifier={identifier} setSelected={setSelected} selected={selected}/>
    } else if (type === 'multiselect') {
        component = <MultiSelect options={options} identifier={identifier} setSelected={setSelected} selected={selected}/>
    }

    /**
     * If the wrapper element has been clicked on, we should show the drop down
     * menu. However, we want to keep showing the dropdown if a child element
     * of the dropdown has been clicked as well. This way, when you click on
     * the options in the select component, the dropdown doesn't dissapear.
     * 
     * https://stackoverflow.com/questions/12092261/prevent-firing-the-blur-event-if-any-one-of-its-children-receives-focus
     * This link is where I got the idea
     * 
     * https://stackoverflow.com/questions/42764494/blur-event-relatedtarget-returns-null
     * This link explains why we needed to set tabindex="0" on the Wrapper element
     */
    const handleBlur = (event) => {
    //    setShowDropDown(event.currentTarget.contains(event.relatedTarget));
    }
    console.log(theme)
    return (
        <ThemeProvider theme={theme}>
            <Wrapper tabindex="0" onFocus={() => setShowDropDown(true)} onBlur={handleBlur}>
                <ValuesBox tabindex="0" onFocus={() => setShowDropDown(showDown => console.log('here') && !showDown)}>
                    {selectedString}
                </ValuesBox>
                <SelectWrapper>
                    {showDropDown ? component : <></>}
                </SelectWrapper>
            </Wrapper>
        </ThemeProvider>
    )
}

const Wrapper = styled.div`
    margin: 10px;
    /**
    Max the maximum allowed width to be 250px, but also let it shrink down if 
    its placed in a section that is less than that
    */
    width: min(250px, 100%);
    position: relative; // Since we are setting child to be absolutely positioned

    font-family: ${props => props.theme.font} !important;
`;
const ValuesBox = styled.button`

    background-color: transparent;
    min-height: 39px;
    width: 100%;
    border: 1px ${props => props.theme.accentColorDark} solid;
    border-radius: 4px;
    padding: 8px;


    font-size: 14px;
    line-height: 1.5;

    cursor: pointer;
`;

const SelectWrapper = styled.div`
    position: absolute;
    width: 100%;
    z-index: 100;
    max-height: 200px;
    overflow-y: scroll;
    background: ${(props) => props.theme.bgColor};

`;

export default SelectDropdown;