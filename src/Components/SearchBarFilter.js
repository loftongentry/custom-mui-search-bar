import { FormControl, MenuItem, Select } from '@mui/material'

const SearchBarFilter = (props) => {
  const { filters, defaultFilter, handleFilterChange } = props

  return (
    <FormControl>
      <Select
        value={defaultFilter}
        defaultValue={defaultFilter}
        onChange={handleFilterChange}
        MenuProps={{
          MenuListProps: { disablePadding: true }
        }}
        sx={{
          '.MuiSelect-select': {
            padding: '0px 10px 0px 10px',
          },
        }}
      >
        {filters.map((filter) => (
          <MenuItem key={filter} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SearchBarFilter