import { FormControl, IconButton, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const SearchBarIcon = (props) => {
  const { searchIconTip, searchIconColor, handleSearch } = props

  return (
    <FormControl>
      <IconButton onClick={handleSearch}>
        <Tooltip title={searchIconTip}>
          <SearchIcon
            sx={{
              '.MuiButtonBase-root:hover &': {
                color: searchIconColor
              },
            }}
          />
        </Tooltip>
      </IconButton>
    </FormControl>
  )
}

export default SearchBarIcon