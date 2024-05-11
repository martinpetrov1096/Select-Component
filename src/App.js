import Select from "./select/select";
import { useState } from 'react';
import styled from 'styled-components';


const options = [
    {string: 'Oliver Hansen', val: '1'},
    {string: 'Van Henry', val: '2'},
    {string: 'April Tucker', val: '3'},
    {string: 'Ralph Hubbard', val: '4'},
    {string: 'Oliver Hansen', val: '5'},
    {string: 'Van Henry', val: '6'},
    {string: 'April Tucker', val: '7'},
    {string: 'Ralph Hubbard', val: '8'}
]

function App() {

    const [selected, setSelected] = useState([]);

    const [selectConfig, setSelectConfig] = useState({
        'type': 'single',
        'overflowText': false,
        'theme': 'light'
    });

    const setConfig = (param, val) => {
        setSelectConfig({
            ...selectConfig,
           [param]: val,
        });
        console.log(selectConfig)
    }


    return (
        <Wrapper className="App">
            <OptionWrapper>
                <input type="radio" id="selectConfigSingle" onChange={() => setConfig('type', 'single')} 
                    checked={selectConfig.type === 'single'}/>
                <label htmlFor="selectConfigSingle">Single</label>
                <input type="radio" id="selectConfigMulti" onChange={() =>  setConfig('type', 'multi')} 
                    checked={selectConfig.type === 'multi'}/>
                <label htmlFor="selectConfigMulti">Multi</label>
            </OptionWrapper>
            <OptionWrapper>
                <input type="checkbox" id="selectConfigOverflowText"
                    onChange={(e) => setConfig('overflowText', e.target.checked)} checked={selectConfig.checked}/>
                <label htmlFor="selectConfigOverflowText">Allow Text Overflow</label>
            </OptionWrapper>
            <OptionWrapper>
                <input type="radio" id="selectConfigThemeLight" onChange={() => setConfig('theme', 'light')} 
                    checked={selectConfig.theme === 'light'}/>
                <label htmlFor="selectConfigSingle">Light Theme</label>
                <input type="radio" id="selectConfigMulti" onChange={() => setConfig('theme', 'dark')} 
                    checked={selectConfig.theme === 'dark'}/>
                <label htmlFor="selectConfigMulti">Dark Theme (Ignore Color Choices)</label>
            </OptionWrapper>


            <Select name="Name" options={options} identifier="mySelectField" selected={selected} 
                setSelected={setSelected} config={selectConfig}/>
            <h3>Some Text after the select</h3>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 100px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`;

const OptionWrapper = styled.div`
    margin: 10px;
`;

export default App;
