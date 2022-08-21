import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { INPUT } from '../../Constants/Input';
import { Rtif } from '../../Utils/Rtif';

const CommonFormPopUp = (props) => {

    const [state, setState] = useState({ });

    const handleClick = (e) => {
        e.preventDefault();
        props.action(state);
    }

    function onChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    function onCheck(e) {
        const { name, checked } = e.target;
        setState(prevState => ({ ...prevState, [name]: checked }));
    }
    
    return (
        <form className="comForm" onSubmit={ e => handleClick(e) } noValidate autoComplete="off">
            {
                props.list.map((item, index) => {
                    if(item.inputType === INPUT.TEXT_FIELD){
                        return <div key={ item.name } >
                                        <TextField 
                                            type={ item.type }
                                            label={ item.label }
                                            id={ item.name }
                                            name={ item.name }
                                            key={ item.name }
                                            size="small"
                                            error={ item.error }
                                            onChange={ onChange }
                                            defaultValue={ item.defaultValue } />
                                        <Rtif boolean={ item.error }>
                                            <div className='error_input_sm'><i className="icon-cancel-circle2"></i></div>
                                        </Rtif>
                                    </div>  
                    }else if(item.inputType === INPUT.CHECKBOX){
                        return  <FormControlLabel
                                            key={ item.name }
                                            control={<Checkbox 
                                                        name={ item.name }
                                                        onChange={ onCheck }
                                                        color='primary' />}
                                            label={ item.label }
                                            labelPlacement="start"
                                        /> 
                    }else {
                        return ''
                    }
                })
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="btnFormSubmit"
            >
            <i className="icon-checkmark2"> </i>
            Submit
            </Button>
        </form>
    )
}

export default CommonFormPopUp