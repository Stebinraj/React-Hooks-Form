import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

const Form = () => {

    const { handleSubmit, control, formState: { errors }, watch, reset, setValue } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        alert('Form Submitted');
        reset();
        setValue('selectField', null);
    };
    const watchPassword = watch('password', '');
    const passwordPattern = /^(?=.*[@#$])(?=.*\d{4})(?=.*[A-Z]{2})(?=.*[a-z]{2}).{8,}$/;

    return (
        <>
            <div className="container-fluid vh-100 d-flex align-items-center">
                <div className="row">
                    <div className="col-md-8 m-auto card">
                        <form className='row p-4' onSubmit={handleSubmit(onSubmit)}>
                            <h1 className='text-center text-primary'>React Hooks Form with Validation</h1>

                            <div className='form-group col-md-6'>
                                <label htmlFor="name" className='form-label'>Name</label>
                                <input className='form-control' {...control.register('name', { required: true })} autoComplete='name' id='name' />
                                {errors.name && <small>Name is required.</small>}
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor="mobile" className='form-label'>Mobile</label>
                                <input className='form-control' {...control.register('mobile', { required: true, pattern: /^[0-9+-]+$/ })} autoComplete='mobile' id='mobile' />
                                {errors.mobile && <small>Mobile is required and should only contain numbers, +, or -</small>}
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor="email" className='form-label'>Email</label>
                                <input className='form-control' {...control.register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i })} autoComplete='email' id='email' />
                                {errors.email && <small>Valid email is required.</small>}
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor="password" className='form-label'>Password</label>
                                <input type='password' className='form-control' {...control.register('password', { required: true, pattern: passwordPattern })} id='password' />
                                {errors.password && (
                                    <small>
                                        Password should contain at least 1 special case character (@#$), 4 numbers, 2 capital
                                        case letters, and 2 small case letters.
                                    </small>
                                )}
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor="reenterpassword" className='form-label'>Re-Enter-Password</label>
                                <input className='form-control' {...control.register('reenterpassword', {
                                    validate: (value) => value === watchPassword || 'Passwords do not match.',
                                })} id='reenterpassword' />
                                {errors.reenterpassword && <small>{errors.reenterpassword.message}</small>}
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='selectField' className='form-label'>Select Field</label>
                                <Controller
                                    name="selectField"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={[
                                                { value: 'option1', label: 'Option 1' },
                                                { value: 'option2', label: 'Option 2' },
                                                { value: 'option3', label: 'Option 3' },
                                            ]}
                                            inputId='selectField'
                                        />
                                    )}
                                />
                            </div>

                            <div className='form-group col-md-6 mt-2'>
                                <label className='form-label'>
                                    <input type="checkbox" {...control.register('checkboxField')} />
                                    <small className='ms-2'>Checkbox Field</small>
                                </label>
                            </div>

                            <div className='form-group col-md-6 mt-2'>
                                <label className='form-label'>
                                    <input type="radio" {...control.register('radioField')} value="option1" />
                                    <small className='ms-2'>Radio Option 1</small>
                                </label>
                                <label className='form-label'>
                                    <input className='' type="radio" {...control.register('radioField')} value="option2" />
                                    <small className='ms-2'>Radio Option 2</small>
                                </label>
                            </div>

                            <div className="form-group text-center">
                                <button type="submit" className='btn btn-primary w-25'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form