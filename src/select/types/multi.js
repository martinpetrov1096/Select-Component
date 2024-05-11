import { Input, Label, Wrapper } from './commonStyles';


const MultiSelect = ({ options, identifier, setSelected, selected }) => {



    const multiSetSelected = (e) => {
        if (e.target.checked) {
            setSelected((selected) => [...selected, e.target.value]);
        } else {
            setSelected((selected) =>
                selected.filter(a => a !== e.target.value.toString())
            );
        }
    };

    const optionsElements = options.map((opt) => {
        const uniqueId = `${identifier}_${opt.val}`;
            return (
                <Wrapper key={`${uniqueId}_react`}>
                    <Input type="checkbox" id={uniqueId} name={identifier} key={`${uniqueId}_radio_key`} 
                        onChange={multiSetSelected} checked={selected.includes(opt.val.toString())} value={opt.val.toString()}/>
                    <Label htmlFor={uniqueId} key={`${uniqueId}_label_key`}>{opt.string}</Label>
                </Wrapper>
            );
  });

    return (
        <>
            {optionsElements}
        </>
    );
};
export default MultiSelect;
