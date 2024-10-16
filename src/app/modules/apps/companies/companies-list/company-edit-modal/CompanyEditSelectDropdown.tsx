import React from 'react';
import Select from 'react-select';

// Custom component to integrate react-select with Formik
const CompanyEditSelectDropdown = ({ options, field, form }) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, option);
  };

  return (
    <div>
      <Select
        options={options}
        name={field.name}
        value={field.value}
        onChange={onChange}
        onBlur={() => form.setFieldTouched(field.name, true)}
      />
      {/* Show error message if validation fails */}
      {form.touched[field.name] && form.errors[field.name] ? (
        <div className="error">{form.errors[field.name]}</div>
      ) : null}
    </div>
  );
};

export default CompanyEditSelectDropdown