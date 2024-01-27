import { useState, forwardRef } from 'react'
import { Box, CircularProgress, FormControl, TextField, Tooltip, colors } from '@mui/material'
import SearchBarFilter from './Components/SearchBarFilter'
import SearchBarIcon from './Components/SearchBarIcon'

const keys = ['']
const defaultSearchValue = 'tip'
const iconTitle = 'tip'
const iconColor = 'blue'
const loading = false

const SearchBar = forwardRef((props, ref) => {
  const { searchBarTitle } = props
  const [searchTerm, setSearchTerm] = useState('')
  const [focused, isFocused] = useState(false)

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase()
    const searchData = data
  }

  return (
    <Tooltip title={focused ? 'test' : ''}>
      <TextField
        type='search'
        ref={ref}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => isFocused(true)}
        onBlur={() => isFocused(false)}
        onKeyPress={(e) => {
          if (event.key === 'Enter') {
            handleSearch()
          }
        }}
        sx={{
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
              {loading ?
                (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress sx={{ scale: '60%' }} />
                  </Box>
                ) : (
                  <SearchBarIcon
                    iconTitle={iconTitle}
                    iconColor={iconColor}
                  />
                )}
            </Box>
          )
        }}
        disabled={loading}
        size='small'
      />
    </Tooltip>
  )
})

export default SearchBar