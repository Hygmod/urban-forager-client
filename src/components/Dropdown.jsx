import React from "react"
import CreatableSelect, { useCreatable } from "react-select/creatable"

const components = {
  DropdownIndicator: null,
}

const Dropdown = (props) => {
  return <CreatableSelect isMulti={props.isMulti} isClearable options={props.dropdownOptions} onChange={(value) => props.onChange(value)}  />
}

export default Dropdown
