import React from "react"
import CreatableSelect, { useCreatable } from "react-select/creatable"
import Creatable from "react-select/creatable"

const components = {
  DropdownIndicator: null,
}

const Dropdown = (props) => {
  return <CreatableSelect isClearable options={props.dropdownOptions} onChange={value=>props.onChange('value', value)}/>
}

export default Dropdown
