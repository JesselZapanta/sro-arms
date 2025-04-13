<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class SubmitAttendanceStoreRequest extends FormRequest
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
            'am_start_photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg'],
            'am_end_photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg'],
            'pm_start_photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg'],
            'pm_end_photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg'],
        ];
    }
}
