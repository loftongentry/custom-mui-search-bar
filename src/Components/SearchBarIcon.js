import { FormControl, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const SearchBarIcon = (props) => {
  const { iconTitle, iconColor } = props

  return (
    <FormControl>
      <Tooltip title={iconTitle}>
        <SearchIcon
          sx={{
            '.MuiButtonBase-root:hover &': {
              color: iconColor
            },
          }}
        />
      </Tooltip>
    </FormControl>
  )
}

export default SearchBarIcon