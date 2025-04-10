<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.mo
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('event_date');
            $table->tinyText('type');//AM, PM, WD

            $table->dateTime('am_start')->nullable();
            $table->dateTime('am_end')->nullable();
            $table->dateTime('pm_start')->nullable();
            $table->dateTime('pm_end')->nullable();
            $table->integer('sanction');
            $table->tinyInteger('status')->default(1); // 1 for active, 0 for inactive
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
