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
            'am_start' => ['required', 'date_format:H:i'],
            'am_end' => ['required', 'date_format:H:i', 'after:am_start'],
            'pm_start' => ['required', 'date_format:H:i', 'after:am_end'],
            'pm_end' => ['required', 'date_format:H:i', 'after:pm_start'],
            'sanction' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:0,1'],
        ];
    }
}
