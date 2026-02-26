// index.js
// Base
export { InputWrapper } from './base/InputWrapper';
export { inputFieldVariants, inputWrapperVariants, labelVariants, helperTextVariants, counterVariants } from './base/input.variants';

// Hooks
export { useDebounce } from './hooks/useDebounce';
export { useMask } from './hooks/useMask';
export { useCounter } from './hooks/useCounter';

// Utils
// export { cn } from '@util';
export { formatNumber, formatPhone, unformatNumber } from './utils/formatters';

// Inputs
export { TextInput } from './inputs/TextInput';
export { PasswordInput } from './inputs/PasswordInput';
export { NumberInput } from './inputs/NumberInput';
export { SearchInput } from './inputs/SearchInput';
export { PhoneInput } from './inputs/PhoneInput';
export { OtpInput } from './inputs/OtpInput';
export { DateInput } from './inputs/DateInput';
export { TextareaInput } from './inputs/TextareaInput';
export { FileInput } from './inputs/FileInput';
export { SelectInput } from './inputs/SelectInput';
export { CheckboxInput } from './inputs/CheckboxInput';
export { RadioInput } from './inputs/RadioInput';
export { SwitchInput } from './inputs/SwitchInput';

// Unified
export { FormInput } from './FormInput';