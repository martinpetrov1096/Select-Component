import { Input, Label, Wrapper } from './commonStyles';


const SingleSelect = ({options, identifier, setSelected, selected}) => {

    const optionsElements = options.map(opt => {
        const uniqueId =`${identifier}_${opt.val}`

        return (
            <Wrapper key={`${uniqueId}`}>
                <Input type="radio" id={uniqueId} name={identifier} key={`${uniqueId}_radio_key`} checked={opt.val === selected[0]} onChange={() => setSelected([opt.val])} />
                <Label htmlFor={uniqueId} key={`${uniqueId}_label_key`}>{opt.string}</Label>
            </Wrapper>
        );
    });




    return (
        <>
  
            {optionsElements}
        </>
    );
  }
  export default SingleSelect;