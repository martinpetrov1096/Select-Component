import { useState, useEffect, useMemo } from 'react';
import MultiSelect from './types/multi';
import SingleSelect from './types/single';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme.json';


const SelectDropdown = ({ name, options, identifier, selected, setSelected, config }) => {

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

    /**
     * If the type of the select field changes to a single select, then we 
     * should remove all selected options except the first one
     */
    useEffect(() => {
        if (config.type === 'single' && selected.length > 1) {
            setSelected(selected => [selected[0]]);
        }
    }, [config.type]);

    const selectedString = useMemo(() => {
        return options.filter((opt) => {
            return selected.includes(opt.val);
        }).map(opt => opt.string).join(', ');

    }, [selected, options]);

    let component;
    if (config.type === 'single') {
        component = <SingleSelect options={options} identifier={identifier} setSelected={setSelected} selected={selected}/>
    } else if (config.type === 'multi') {
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
        setShowDropDown(event.currentTarget.contains(event.relatedTarget));
    }

    return (
        <ThemeProvider theme={theme[config.theme]}>
            <Wrapper tabIndex="0" onFocus={() => setShowDropDown(true)} onBlur={handleBlur}>
                <FormName>{name}</FormName>
                <ValuesBox  onFocus={() => setShowDropDown(showDown => console.log('here') && !showDown)} $overflowText={config.overflowText}>
                    {selectedString}
                </ValuesBox>
                <SelectWrapper>
                    {showDropDown ? component : <></>}
                </SelectWrapper>
            </Wrapper>
        </ThemeProvider>
    );
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

    background-color: ${props => props.theme.bgColor};
    min-height: 39px;
    height: ${props => props.$overflowText ? 'auto' : '39px'};
    width: 100%;
    border: 1px ${props => props.theme.accentColorDark} solid;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    color: ${props => props.theme.color};
    overflow: ${props => props.$overflowText ? 'visible' : 'hidden'};
    white-space: ${props => props.$overflowText ? 'normal' : 'nowrap'};
    text-overflow: ellipsis;
    line-height: 1.5;
    cursor: pointer;
`;

const SelectWrapper = styled.div`
    position: absolute;
    width: 100%;
    z-index: 100;
    max-height: 200px;
    border-radius: 2px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    scrollbar-color: ${props => `${props.theme.accentColorDark} ${props.theme.bgColor} `};
    overflow-y: scroll;
    background: ${(props) => props.theme.bgColor};
`;
const FormName = styled.h6`
    margin: 0 0 2px 2px;
    font-weight: 400;
    color: ${props => props.theme.accentColorDark};
`;

export default SelectDropdown;