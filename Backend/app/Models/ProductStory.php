<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStory extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'story'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
