<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class EventStoreRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'event_date' => ['required', 'date'],
            'type' => ['required', 'in:AM,PM,WD'],
            'am_start' => ['required_if:type,AM','required_if:type,WD', 'nullable', ],
            'am_end' => ['required_if:type,AM','required_if:type,WD', 'nullable','after:am_start'],
            'pm_start' => ['required_if:type,PM','required_if:type,WD', 'nullable'],
            'pm_end' => ['required_if:type,PM','required_if:type,WD','nullable', 'after:pm_start'],
            'sanction' => ['required', 'numeric', 'min:0'],
            'academicYear' => ['required', 'exists:academic_years,id'],
            'status' => ['required', 'in:0,1'],
        ];
    }
}
