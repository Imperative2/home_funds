class FormValidator {
  static getValidatedFormFields(fieldName, fieldValue, form) {
    let field = form.formFields[fieldName];
    let valid = true;
    let errorMessage = null;

    if (field.minLength != null && fieldValue.length < field.minLength) {
      valid = valid & false;
      errorMessage = "Too short";
    }
    if (field.maxLength != null && fieldValue.length > field.maxLength) {
      valid = valid & false;
      errorMessage = "Too long";
    }
    if (field.regex != null && fieldValue.match(field.regex) === null) {
      valid = valid & false;
      errorMessage = "Wrong characters";
    }
    if (field.required !== false && fieldValue === "") {
      valid = valid & false;
      errorMessage = "Field required";
    }
    if (field.match != null) {
      const matchFieldValue = form.formFields[field.match].value;
      if (fieldValue !== matchFieldValue) {
        valid = valid & false;
        errorMessage = "Doesn't match";
      }
    }

    if (valid === true) {
      let resultForm = {
        ...form,
        formFields: {
          ...form.formFields,
          [fieldName]: {
            ...form.formFields[fieldName],
            valid: valid,
            touched: true,
            value: fieldValue,
            errorMessage: null,
          },
        },
      };
      return resultForm;
    } else {
      let resultForm = {
        ...form,
        formFields: {
          ...form.formFields,
          [fieldName]: {
            ...form.formFields[fieldName],
            valid: false,
            touched: true,
            value: fieldValue,
            errorMessage: errorMessage,
          },
        },
      };
      return resultForm;
    }
  }

  static getValidatedForm(form) {
    const size = Object.keys(form.formFields).length;
    let formValid = true;
    for (let i = 0; i < size; i++) {
      let field = form.formFields[Object.keys(form.formFields)[i]];

      if (field.valid === false) {
        formValid = formValid & false;
      }
    }
    let resultForm = {
      ...form,
      formValid: formValid,
      enableSubmitButton: formValid,
    };
    return resultForm;
  }
}

export default FormValidator;
