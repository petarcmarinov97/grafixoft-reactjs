import React, {
    Component
} from 'react';
import '../styles/MultiValueField.css';
import Row from './Row';

export default class MultiValueField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropDownDisplayValues: this.props.values,
            selectedValues: [],
            defaultInputValue:""
        }
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.addToSelected = this.addToSelected.bind(this);
        this.removeFromSelected = this.removeFromSelected.bind(this);
        this.itemsController = this.itemsController.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    addToSelected = (value) => {
        const{dropDownDisplayValues, selectedValues} = this.state;

        const tempDisplayValues = dropDownDisplayValues.filter(el => el !== value);

        const tempSelectedValues = [...selectedValues];
        tempSelectedValues.push(value);

        if(!tempDisplayValues){
            const newTempDisplayValues = this.props.values.filter(el => !tempSelectedValues.includes(el));

            this.setState({
                dropDownDisplayValues: newTempDisplayValues,
                selectedValues: tempSelectedValues
            })
        }else{
            this.setState({
                dropDownDisplayValues: tempDisplayValues,
                selectedValues: tempSelectedValues,
            })
        }
    }

    removeFromSelected = (value) => {
        const{dropDownDisplayValues, selectedValues} = this.state;

        const tempSelectedValues = selectedValues.filter(el => el !== value);

        const tempDropDownDisplayValues = [...dropDownDisplayValues];
        tempDropDownDisplayValues.push(value);
        
        this.setState({
            dropDownDisplayValues: tempDropDownDisplayValues,
            selectedValues: tempSelectedValues,
        })
    }

    onInputChangeHandler = (e) =>{
        const { selectedValues } = this.state;

        let tempInput = e.target.value.toLowerCase();
        
        const tempDisplayValues = this.props.values.filter(
            el => el.toLowerCase().includes(tempInput) 
            && 
            !selectedValues.includes(el));
            	
                this.setState({
                    defaultInputValue: tempInput,
                    dropDownDisplayValues : tempDisplayValues,
                })
    }
        
    itemsController(
            array,
            onRowClick,
            noItemsMessage = "No Such Results",
            rowClassName = "display_row_className",
            emptyRowClassName="display_row_className"
        ){

        return (array.length > 0
            ?   array.map(value=>(
                    <Row
                    className={rowClassName}
                    key={array.indexOf(value)}
                    value={value}
                    onClickHandler={onRowClick}
                    />))
            :   <Row
                    className = {emptyRowClassName}
                    key={1}
                    value={noItemsMessage}
                    />)
    }

    render(){
        const {itemsController, addToSelected, removeFromSelected, onInputChangeHandler, state} = this;
        const {defaultInputValue, dropDownDisplayValues, selectedValues} = state;
        const selectedTitle = "Selected:";
        const buttonClassName =  "selected_row_className";
        const noSelectedItemsMessage = "Still No Items";

        return <div>
        <div className="multi_value_field">
        <input
        className="input_field"
        placeholder="Search"
        type="text"
        value={defaultInputValue}
        onChange={onInputChangeHandler}
        />
            {itemsController(dropDownDisplayValues, addToSelected)}
        </div>
        <div>
            <h3>{selectedTitle}</h3>
            {itemsController(selectedValues, removeFromSelected, noSelectedItemsMessage, buttonClassName)}
        </div>
        </div>
        ;
      }
}