'use client';

// FormInput.jsx
import React, { forwardRef } from 'react';
import { TextInput } from './inputs/TextInput';
import { PasswordInput } from './inputs/PasswordInput';
import { NumberInput } from './inputs/NumberInput';
import { SearchInput } from './inputs/SearchInput';
import { PhoneInput } from './inputs/PhoneInput';
import { OtpInput } from './inputs/OtpInput';
import { DateInput } from './inputs/DateInput';
import { TextareaInput } from './inputs/TextareaInput';
import { FileInput } from './inputs/FileInput';
import { SelectInput } from './inputs/SelectInput';
import { CheckboxInput } from './inputs/CheckboxInput';
import { RadioInput } from './inputs/RadioInput';
import { SwitchInput } from './inputs/SwitchInput';

export const FormInput = forwardRef((props, ref) => {
    const { type, ...rest } = props;

    switch (type) {
        case 'text':
            return <TextInput ref={ref} {...rest} />;
        case 'password':
            return <PasswordInput ref={ref} {...rest} />;
        case 'number':
            return <NumberInput ref={ref} {...rest} />;
        case 'search':
            return <SearchInput ref={ref} {...rest} />;
        case 'phone':
            return <PhoneInput ref={ref} {...rest} />;
        case 'otp':
            return <OtpInput ref={ref} {...rest} />;
        case 'date':
            return <DateInput ref={ref} {...rest} />;
        case 'textarea':
            return <TextareaInput ref={ref} {...rest} />;
        case 'file':
            return <FileInput ref={ref} {...rest} />;
        case 'select':
            return <SelectInput ref={ref} {...rest} />;
        case 'checkbox':
            return <CheckboxInput ref={ref} {...rest} />;
        case 'radio':
            return <RadioInput ref={ref} {...rest} />;
        case 'switch':
            return <SwitchInput ref={ref} {...rest} />;
        default:
            return <TextInput ref={ref} {...rest} type={type} />;
    }
});

FormInput.displayName = 'FormInput';