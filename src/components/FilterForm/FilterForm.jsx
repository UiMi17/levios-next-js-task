import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { StyledFilterForm, StyledFilterLabel } from "./StyledFilterForm";

const FilterForm = ({ formik, categories }) => {
  return (
    <StyledFilterForm onSubmit={(ev) => ev.preventDefault()}>
      <StyledFilterLabel>
        <TextField
          name="filter"
          value={formik.values.filter}
          error={formik.errors.filter !== undefined}
          helperText={formik.errors.filter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fill: "rgba(15, 10, 222, 0.75)" }} />
              </InputAdornment>
            ),
          }}
          size="small"
          variant="standard"
          placeholder={"Search for a product"}
          onChange={formik.handleChange}
          sx={{ width: "320px" }}
        />
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Category
          </InputLabel>
          <NativeSelect
            value={formik.values.category}
            onChange={formik.handleChange}
            inputProps={{
              name: "category",
            }}
          >
            <option value="none">None</option>
            {categories.map((category) => {
              return (
                <option key={nanoid()} value={category}>
                  {category}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </StyledFilterLabel>
    </StyledFilterForm>
  );
};

FilterForm.propTypes = {
  formik: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default FilterForm;
