<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required', 'string', 'max:255'],
            'middlename' => ['nullable', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'institute' => ['required', 'string', 'max:255'],
            'organization' => ['required', 'string', 'max:255'],
            'studentId' => ['required', 'numeric', Rule::unique('users')->ignore($this->route('id'))],
            'email' => [
                'required', 
                'string', 'lowercase', 
                'email', 
                'max:255', 
                Rule::unique('users')->ignore($this->route('id'))],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
