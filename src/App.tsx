
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import FormField from './components/FormField';
import {
  registrationSchema,
  type RegistrationFormData,
} from './validation';
import './App.css';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, touchedFields, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      militaryStatus: '',
      password: '',
      confirmPassword: '',
    },
  });

  const gender = watch('gender');
  const password = watch('password');

  useEffect(() => {
    void trigger('confirmPassword');
  }, [password, trigger]);

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Registration submitted:', data);
    setSubmitted(true);
  };

  const fieldError = (name: keyof RegistrationFormData) =>
    errors[name]?.message as string | undefined;

  const isInvalid = (name: keyof RegistrationFormData) =>
    Boolean(errors[name] && touchedFields[name]);

  const firstNameRegistration = register('firstName');
  const lastNameRegistration = register('lastName');

  const ageRegistration = register('age', {
    setValueAs: (value) =>
      value === '' ? undefined : Number(value),
  });

  const emailRegistration = register('email');
  const phoneRegistration = register('phone');
  const cityRegistration = register('city');
  const genderRegistration = register('gender');
  const militaryRegistration = register('militaryStatus');
  const passwordRegistration = register('password');
  const confirmPasswordRegistration = register('confirmPassword');

  return (
    <main className="page">
      <form
        className="form-card"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1>Registration</h1>
        <p className="subtitle">
          Please fill in your details to register.
        </p>

        <div className="divider" />

        <div className="form-grid">
          <FormField
            label="First Name *"
            error={fieldError('firstName')}
            invalid={isInvalid('firstName')}
          >
            <input
              placeholder="Exactly 5 characters"
              autoComplete="given-name"
              {...firstNameRegistration}
            />
          </FormField>

          <FormField
            label="Last Name"
            error={fieldError('lastName')}
            invalid={isInvalid('lastName')}
          >
            <input
              placeholder="Maximum 10 characters"
              autoComplete="family-name"
              {...lastNameRegistration}
            />
          </FormField>

          <FormField
            label="Age *"
            error={fieldError('age')}
            invalid={isInvalid('age')}
          >
            <input
              type="number"
              min={17}
              max={20}
              placeholder="17–20"
              {...ageRegistration}
            />
          </FormField>

          <FormField
            label="Email *"
            error={fieldError('email')}
            invalid={isInvalid('email')}
          >
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...emailRegistration}
            />
          </FormField>

          <FormField
            label="Phone"
            error={fieldError('phone')}
            invalid={isInvalid('phone')}
          >
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              placeholder="Up to 10 digits"
              autoComplete="tel"
              {...phoneRegistration}
              onChange={(event) => {
                event.target.value = event.target.value
                  .replace(/\D/g, '')
                  .slice(0, 10);

                void phoneRegistration.onChange(event);
              }}
            />
          </FormField>

          <FormField
            label="City *"
            error={fieldError('city')}
            invalid={isInvalid('city')}
          >
            <select {...cityRegistration}>
              <option value="">Select city</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Delhi">Delhi</option>
            </select>
          </FormField>
        </div>

        <fieldset
          className={`gender-section ${
            isInvalid('gender') ? 'gender-invalid' : ''
          }`}
        >
          <legend>Gender *</legend>

          <div className="radio-group">
            {(
              ['Male', 'Female', 'Prefer Not to Say'] as const
            ).map((option) => (
              <label className="radio-option" key={option}>
                <input
                  type="radio"
                  value={option}
                  {...genderRegistration}
                />
                {option}
              </label>
            ))}
          </div>

          {isInvalid('gender') && fieldError('gender') && (
            <small className="error-message" role="alert">
              {fieldError('gender')}
            </small>
          )}
        </fieldset>

        {gender === 'Male' && (
          <div className="conditional-field">
            <FormField
              label="Military Service Status *"
              error={fieldError('militaryStatus')}
              invalid={isInvalid('militaryStatus')}
            >
              <select {...militaryRegistration}>
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="Exempt">Exempt</option>
                <option value="Pending">Pending</option>
              </select>
            </FormField>
          </div>
        )}

        <div className="divider" />

        <div className="form-grid">
          <FormField
            label="Password *"
            error={fieldError('password')}
            invalid={isInvalid('password')}
          >
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                {...passwordRegistration}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </FormField>

          <FormField
            label="Confirm Password *"
            error={fieldError('confirmPassword')}
            invalid={isInvalid('confirmPassword')}
          >
            <div className="password-input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                autoComplete="new-password"
                {...confirmPasswordRegistration}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </FormField>
        </div>

        {submitted && (
          <p className="success-message" role="status">
            Registration completed successfully!
          </p>
        )}

        <div className="form-footer">
          <span>* Required fields</span>

          <button type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
      </form>
    </main>
  );
}
