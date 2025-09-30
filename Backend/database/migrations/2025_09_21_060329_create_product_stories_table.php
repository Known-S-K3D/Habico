<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('product_stories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->longText('story'); // <-- for your long essay-style descriptions
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('product_stories');
    }
};
