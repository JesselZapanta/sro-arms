<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class SubmitAttendanceUpdateRequest extends FormRequest
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
            'am_start_photo' => ['nullble', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'am_end_photo' => ['nullble', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'pm_start_photo' => ['nullble', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'pm_end_photo' => ['nullble', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
}
