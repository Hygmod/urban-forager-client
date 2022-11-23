import React from "react"
import CreatableSelect, { useCreatable } from "react-select/creatable"
import Creatable from "react-select/creatable"

const components = {
  DropdownIndicator: null,
}

const Dropdown = (props) => {
    console.log(props.dropdownOptions)
  return <CreatableSelect isClearable options={props.dropdownOptions}/>
}

export default Dropdown
