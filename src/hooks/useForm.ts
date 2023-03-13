import { useEffect, useMemo, useState } from "react";

export const useForm = (initialValue: any, formValidations?: any) => {
  const [formState, setFormState] = useState(initialValue);
  const [formValidation, setFormValidation] = useState(formValidations);

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialValue);
  }, [initialValue]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation || {})) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialValue);
  };

  const createValidators = () => {
    const formCheckedValues: any = {};

    for (const formField of Object.keys(formValidations || {})) {
      const [fn, errorMessage = "Este campo es requerido"] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    ...formValidation,
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
  };
};
