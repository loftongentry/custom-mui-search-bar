import { useState, forwardRef } from 'react'
import { Box, CircularProgress, TextField, Tooltip } from '@mui/material'
import SearchBarFilter from './Components/SearchBarFilter'
import SearchBarIcon from './Components/SearchBarIcon'

const SearchBar = forwardRef((props, ref) => {
  try {
    const {
      data,
      onSearch,
      filtering = true,
      searchBarIcon = true,
      searchBarTip = 'tip',
      searchIconTip = 'tip',
      searchIconColor = 'blue',
      filters = ['test'],
      defaultFilter = 'test',
      loading = false
    } = props

    //Error thrown to ensure everything is properly set when filtering
    if (filtering && (!defaultFilter || !Array.isArray(filters))) {
      throw new Error('Invalid Configuration: When filtering is set to true, a default filter value must be set, and filters must be an array')
    }

    //Warning thrown to ensure that the filters array includes the default filter value the user set
    if (filtering && defaultFilter && !filters?.includes(defaultFilter)) {
      console.warn(`'${defaultFilter}' is not a valid value in the 'filters' array`)
      console.warn(`Stack Trace: ${new Error().stack}`)
    }

    const [searchTerm, setSearchTerm] = useState('')
    const [focused, isFocused] = useState(false)
    const [filter, setFilter] = useState(defaultFilter)

    //Boolean to determine if exact match
    const isExactMatch = (value, exactMatch) => value && value.toString().toLowerCase() === exactMatch

    //Boolen to determine if term is inside the array of objects
    const containSearchTerm = (value, term) => value && value.toString().toLowerCase().includes(term)

    const handleSearch = () => {
      const term = searchTerm.trim().toLowerCase()
      const searchData = data

      if (term.startsWith('"') && term.endsWith('"')) {
        const exactMatch = term.slice(1, -1)

        const results = searchData.filter((row) =>
          Object.entries(row).some(([key, value]) => filtering ? (key === filter && isExactMatch(value, exactMatch)) : (isExactMatch(value, exactMatch)))
        )

        onSearch(results)
      } else {
        const results = searchData.filter((row) => {
          Object.entries(row).some(([key, value]) => filtering ? (key === filter && containSearchTerm(value, term)) : (containSearchTerm(value, term)))
        })

        onSearch(results)
      }
    }

    const handleFilterChange = (newFilter) => {
      setFilter(newFilter)
    }

    return (
      <Tooltip title={focused ? searchBarTip : ''}>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                {filtering && (
                  <SearchBarFilter
                    filters={filters}
                    defaultFilter={defaultFilter}
                    handleFilterChange={handleFilterChange}
                  />
                )}
                {loading ?
                  (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress sx={{ scale: '60%' }} />
                    </Box>
                  ) : (
                    searchBarIcon && (
                      <SearchBarIcon
                        searchIconTip={searchIconTip}
                        searchIconColor={searchIconColor}
                        handleSearch={handleSearch}
                      />
                    )
                  )}
              </Box>
            )
          }}
          disabled={loading}
          size='small'
        />
      </Tooltip>
    )
  } catch (error) {
    console.error(`Error: ${error}`)
    console.error(`Stack Trace ${error.stack}`)
  }
})

export default SearchBar

/**
 * For self:
 * Summary of what this does currently:
 *  1. Allows user to enter into the textfield a term. Term is then searched through ONLY an array of object for that term. It will return every single result in a new array of
 *     objects that matches that term
 *  2. Term is looked for in every single string with the specified key
 *  3. Can be specific term if quotation marks are put around it
 *     Example: If the string being searched is "banana apple", and the user searches for "banana", the result would return "banana apple" as a result in the array of objects. 
 *              If you put quotation marks around "banana", then "banana apple" would not be a value returned in the array of object.
 *  4. Right now, a filter (Object key) must be specified to find the term
 *  5. Can provide a default filter value, but MUI will throw a warning if default filter value is not specified
 *  5. Can provide a tip for both the search icon and the search bar, but can also leave them blank
 *  6. Can change ONLY the color of the search icon when hovering over it
 *  7. loading boolean disables the TextField when the data is being searched through and shows a circular progress animation
 *  8. Can pass MUI TextField props ONLY to the SearchBar component
 * 
 *  Completed TODOS:
 *  1.
 *  2.
 *  3. Providing filters and defaultFilterValue is boolean (but if providing filters, must be as an array, and defaultFilterValue must appear in the array and be set)
 *  4. SearchBarIcon is boolean
 *  5.
 *  6.
 *  7.
 *  8.
 *  9.
 *  10.
 */

/**
 * TODO:
 *  1. User can search through an array of arrays for specified searchTerm and return array of arrays (maybe also singular array)
 *  2. Change TextField with Autocomplete to show suggestions in the text box
 *  5. Can adjust the Select in SearchBarFilter component (it's possible to pass MUI components to it)
 *  6. Can change/style the SearchIcon in SearchBarIcon (it's possible to pass MUI components to it)
 *  7. Multi-select filters (Autocomplete)
 *  8. Must specify if parsing through an array of arrays or array of Objects through a boolean (if array of arrays, can't use filters)
 *  9. Error handling for each of the components
 *  10. Improved warning messages
 *  11. Make more values boolean, so not everything has to be specified
 *  12. (MAYBE) Perform a search into a database using the serach terms rather than data already loaded into the front end
 */