<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->longText('description')->nullable(); // general product info
            $table->longText('story')->nullable(); // the long narrative/story of the product
            $table->longText('story_description')->nullable(); // detailed breakdown or backstory
            $table->integer('stock')->default(0);
            $table->string('category', 100)->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->string('image')->nullable(); // store image path or URL
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
