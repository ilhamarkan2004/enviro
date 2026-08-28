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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete(); // PIC
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); // Creator
            $table->dateTime('deadline_at')->nullable();
            $table->tinyInteger('status')->default(0)->comment('0: Belum mulai, 1: Proses, 2: Selesai');
            $table->tinyInteger('priority')->default(0)->comment('0: Rendah, 1: Sedang, 2: Tinggi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
