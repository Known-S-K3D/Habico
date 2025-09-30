<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * GET /api/products
     * Public: Returns all products
     */
    public function index()
    {
        return response()->json(Product::all(), 200);
    }

    /**
     * POST /api/products
     * Admin only: Creates a new product
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'story' => 'nullable|string',
            'story_description' => 'nullable|string',
            'stock' => 'required|integer|min:0',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        // ✅ Handle image upload if provided
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($validated);

        return response()->json([
            'message' => '✅ Product created successfully',
            'product' => $product
        ], 201);
    }

    /**
     * GET /api/products/{id}
     * Public: Returns a single product
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json($product, 200);
    }

    /**
     * PUT or POST /api/products/{id}
     * Admin only: Updates an existing product
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'story' => 'nullable|string',
            'story_description' => 'nullable|string',
            'stock' => 'sometimes|required|integer|min:0',
            'category' => 'nullable|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        // ✅ Replace old image if a new one is uploaded
        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return response()->json([
            'message' => '✅ Product updated successfully',
            'product' => $product
        ], 200);
    }

    /**
     * DELETE /api/products/{id}
     * Admin only: Deletes a product
     */
    public function destroy($id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product = Product::findOrFail($id);

        // ✅ Delete image from storage
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json(['message' => '🗑️ Product deleted successfully'], 200);
    }
}
