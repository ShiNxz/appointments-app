import { useState } from 'react'

/**
 * useFormInput -> Custom hook for handling form inputs with error and status, and custom check functions
 */
const useFormInput = (checkFunction?: ICheckFunction) => {
    const [value, setValue] = useState<IInputStatus>({
        value: '',
        error: null,
        status: -1,
    })

    const handleChange = (newValue: string) => {
        if (checkFunction) {
            const checkResults = checkFunction(newValue)

            // If checkFunction returns a string, it means there is an error
            if (typeof checkResults === 'string') {
                setValue((prevValue) => ({
                    ...prevValue,
                    status: 0,
                    error: checkResults,
                    value: newValue,
                }))
            }
            // If checkFunction returns true, it means there is no error
            else if (checkResults === true) {
                setValue((prevValue) => ({
                    ...prevValue,
                    status: 1,
                    error: null,
                    value: newValue,
                }))
            }
        } else {
            setValue((prevValue) => ({
                ...prevValue,
                status: 1,
                value: newValue,
            }))
        }
    }

    return {
        value: value.value,
        error: value.error,
        status: value.status,
        handleChange,
    }
}

/**
 * Check function example ->
 * const checkFunction = (newValue) => {
 * 	if(newValue.length < 3) {
 * 		return {
 * 			error: 'Must be at least 3 characters',
 * 			status: 0,
 * 		}
 * 	}
 * 	return {
 * 		error: null,
 * 		status: 1,
 * 	}
 * }
 */

export interface IInputStatus {
    value: string
    error: string | null
    /**
	 - 1: initial
	 - 0: error
	 - 1: success
	 */
    status: -1 | 0 | 1
}

export interface ICheckFunction {
    (newValue: string): true | string
}

export default useFormInput
