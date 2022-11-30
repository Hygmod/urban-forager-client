import React from "react"
import CreatableSelect from "react-select/creatable"

const Dropdown = (props) => {
  return <CreatableSelect isMulti={props.isMulti} isClearable options={props.dropdownOptions} onChange={(value) => props.onChange(value)}  />
}

export default Dropdown
