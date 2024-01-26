import { useState, forwardRef } from 'react'
import { TextField, Tooltip } from '@mui/material'
import SearchBarFilter from './Components/SearchBarFilter'
import SearchIcon from './Components/SearchIcon'

const MuiSearchBar = forwardRef((props, ref) => {
  const { searchBarTitle } = props
  const [searchTerm, setSearchTerm] = useState('')
  const [focused, isFocused] = useState(false)

  const handleSearch = () => {

  }

  return (
    <Tooltip title={isFocused ? searchBarTitle : ''}>
      <TextField
        type='search'
        ref={ref}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => isFocused(true)}
        onBlue={() => isFocused(false)}
        onKeyPress={(e) => {
          if (event.key === 'Enter') {
            handleSearch()
          }
        }}
        sx={{
          width: searchBarWidth,
          '.MuiOutlinedInput-input': {
            marginRight: '12px'
          }
        }}
        InputProps={{
          endAdornment: (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <SearchBarFilter
                keys={keys}
                defaultSearchValue={defaultSearchValue}
              />
              <SearchIcon
                iconTitle={iconTitle}
                iconColor={iconColor}
              />
            </Box>
          )
        }}
      />
    </Tooltip>
  )
})

export default MuiSearchBar