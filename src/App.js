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

    const [selectType, setSelectType] = useState('select');


    return (
        <Wrapper className="App">
            <div>
                <input type="radio" id="single" name="type" onChange={() => setSelectType('select')} checked={selectType === 'select'}/>
                <label htmlFor="single">Single</label>
                <input type="radio" id="multi" name="type" onChange={() => setSelectType('multiselect')} checked={selectType === 'multiselect'}/>
                <label htmlFor="multi">Multi</label>
            </div>
            <Select type={selectType} options={options} identifier="mySelectField"/>
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



export default App;
