import { FormControl, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

const SearchBarFilter = (props) => {
  const { defaultFilterValue, keys } = props
  const [filter, setFilter] = useState(defaultFilterValue)

  return (
    <FormControl>
      <Select
        value={filter}
        defaultValue={defaultFilterValue}
        onChange={(e) => setFilter(e.target.value)}
        MenuProps={{
          MenuListProps: { disablePadding: true }
        }}
        sx={{
          '.MuiSelect-select': {
            padding: '0px 10px 0px 10px',
          },
        }}
      >
        {keys.map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SearchBarFilter