/**
 * FORM STRUCTURE
 */
export * as AFCore from './core/form.core';
export * as AFStore from './store/form';


/**
 * FORM LAYOUT AND UI
 */
import FormSection from './layout/formSection';
import FormWrapper from './layout/formWrapper';
import FormHeader from './layout/formHeader';
import FormSectionHeader from './layout/formSectionHeader';
import FormDivider from './layout/formDivider';
import FormLabel from './layout/formLabel';
import FormConditional from './layout/formConditional';
import FormDatePicker from './input/formDatePicker';
import FormInput from './input/formInput';
import FormInputNumber from './input/formInputNumber';
import FormTextArea from './input/formTextArea';
import FormRadioButtons from './input/formRadioButtons';
// import FormSubmit from '../views/user/form/tmv/tmvFormSubmit';

// form layout components
export { FormSection as Section};
export { FormWrapper as Wrapper };
export { FormHeader as Header};
export { FormSectionHeader as SectionHeader };
export { FormDivider as Divider };
export { FormLabel as Label};
export { FormConditional  as Conditional };

// form input components 
export { FormInput as Input};
export { FormInputNumber as InputNumber };
export { FormTextArea as TextArea};
export { FormRadioButtons as RadioButtons };
export { FormDatePicker as DatePicker };
// export { FormSubmit as Submit };


