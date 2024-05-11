import { Input, Label, Wrapper } from './commonStyles';


const MultiSelect = ({ options, identifier, setSelected, selected }) => {

    const multiSetSelected = (e) => {
        if (e.target.checked) {
            setSelected((selected) => [...selected, e.target.value]);
        } else {
            setSelected((selected) =>
                selected.filter(a => a !== e.target.value)
            );
        }
    };

    const optionsElements = options.map((opt) => {
        const uniqueId = `${identifier}_${opt.val}`;
            return (
                <Wrapper key={`${uniqueId}_react`}>
                    <Input type="checkbox" id={uniqueId} name={identifier} key={`${uniqueId}_radio_key`} 
                        onChange={multiSetSelected} checked={selected.includes(opt.val)} value={opt.val}/>
                    <Label htmlFor={uniqueId} key={`${uniqueId}_label_key`}>{opt.string}</Label>
                </Wrapper>
            );
    });
    const toggleAll = (e) => {
        console.log(selected.length)
        console.log(options.length)
        selected.length === options.length ?  setSelected([]) : setSelected(options.map(opt => opt.val));
    
    }
    return (
        <>
            <Wrapper key={`${identifier}_select_all`}>
                <Input type="checkbox" id={`${identifier}_select_all`} name={identifier} key={`${identifier}_select_all_radio_key`} checked={selected.length === options.length} onChange={toggleAll} />
                <Label htmlFor={`${identifier}_select_all`} key={`${identifier}_select_all_label_key`}>Select All</Label>
            </Wrapper>

            {optionsElements}
        </>
    );
};
export default MultiSelect;
