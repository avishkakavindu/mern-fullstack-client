import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ISignUpInput } from '../../../types/user.interface';
import { createUser } from '../../../services/user.service';
import { handleApiError } from '../../../utils/errorHandler';

function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISignUpInput>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ISignUpInput> = async (userData) => {
    setLoading(true);
    try {
      const response = await createUser(userData);
      if (response?.data) {
        toast.success('Account created successfully');
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>

      <form className="flex flex-col form gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="First Name"
            className={`input bg-slate-100 ${errors?.firstName && 'is-invalid'}`}
            {...register('firstName', {
              required: 'First name is required',
            })}
          />
          {errors?.firstName && (
            <div className="ml-auto">
              <span className="error">{errors.firstName?.message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Last Name"
            className={`input bg-slate-100 ${errors?.lastName && 'is-invalid'}`}
            {...register('lastName', {
              required: 'Last name is required',
            })}
          />

          {errors?.lastName && (
            <div className="ml-auto">
              <span className="error">{errors.lastName?.message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className={`input bg-slate-100 ${errors?.email && 'is-invalid'}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors?.email && (
            <div className="ml-auto">
              <span className="error">{errors.email?.message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
            className={`input bg-slate-100 ${errors?.password && 'is-invalid'}`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                message:
                  'Password must contain at least one letter, one digit, and one special character',
              },
            })}
          />
          {errors?.password && (
            <div className="ml-auto">
              <span className="error">{errors.password?.message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Confirm Password"
            className={`input bg-slate-100 ${errors?.confirmPassword && 'is-invalid'}`}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
          />
          {errors?.confirmPassword && (
            <div className="ml-auto">
              <span className="error">{errors.confirmPassword?.message}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-slate-700 p-3 rounded-lg text text-white"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
