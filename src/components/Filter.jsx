import React from 'react'
import Dropdown from './Dropdown'

const Filter = (props) => {
  return (
    <div>
    <Dropdown isClearable isMulti={true} dropdownOptions={props.dropdownOptions} onChange={props.handleFilter} />
    </div>
  )
}

export default Filter