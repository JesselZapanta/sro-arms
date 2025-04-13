<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user')->constrained('users')->onDelete('cascade');
            $table->foreignId('event')->constrained('events')->onDelete('cascade');

            $table->dateTime('am_start_photo_at')->nullable();
            $table->string('am_start_photo')->nullable();
            
            $table->dateTime('am_end_photo_at')->nullable();
            $table->string('am_end_photo')->nullable();

            $table->dateTime('pm_start_photo_at')->nullable();
            $table->string('pm_start_photo')->nullable();

            $table->dateTime('pm_end_photo_at')->nullable();
            $table->string('pm_end_photo')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
