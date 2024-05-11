import { Input, Label, Wrapper } from './commonStyles';


const SingleSelect = ({options, identifier, setSelected, selected}) => {

    const optionsElements = options.map(opt => {
        const uniqueId =`${identifier}_${opt.val}`

        /**
         * Need to allow a user to deselect their existing selection. Need to 
         * use onInput instead of onChange since onChange won't be called on the
         * same value being set.
         */
        const setSelectedAllowClear = (e) => {
            setSelected(prevSelected => {
                if (opt.val === selected[0]) {
                    return [];
                } else {
                    return [opt.val]
                }
            })
            console.log(selected)
        }
        return (
            <Wrapper key={`${uniqueId}`}>
                <Input type="radio" id={uniqueId} name={identifier} key={`${uniqueId}_radio_key`} checked={opt.val === selected[0]} onClick={(e) => setSelectedAllowClear(e)}  />
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