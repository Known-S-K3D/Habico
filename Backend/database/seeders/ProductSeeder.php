<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // 🧶 INABEL PRODUCTS
        $inabelProducts = [
            [
                'name' => 'Inabel Blanket (Abel Iloco)',
                'description' => 'Handwoven by master artisans of Ilocos on antique wooden looms, the Inabel Blanket embodies centuries of tradition and craftsmanship. Once cherished as heirlooms and gifted during important life events like weddings and births, these blankets are woven from 100% locally sourced cotton. Each intricate weave pattern reflects the patience, resilience, and creativity of Ilocano weavers — often taking several days to complete a single piece. Soft, breathable, and timeless, the Inabel Blanket brings a piece of Philippine heritage into your home, perfect for cozy nights and meaningful conversations.',
                'price' => 3500.00,
                'image' => 'product/InabelProducts/inabel-blanket.jpg'
            ],
            [
                'name' => 'Inabel Scarf (Pudong)',
                'description' => 'The Inabel Pudong is more than just a scarf — it is a living artifact of Ilocano identity. Traditionally used as a headwrap, sash, or multipurpose cloth during rituals and celebrations, its handwoven fibers carry symbols of strength, protection, and prosperity. The unique patterns and earthy tones are inspired by nature and passed down from generation to generation. Today, the Pudong merges history with modern fashion, serving as a versatile accessory that elevates any outfit while honoring the legacy of Filipino weaving.',
                'price' => 1000.00,
                'image' => 'product/InabelProducts/inabel-scarf.jpg'
            ],
            [
                'name' => 'Inabel Table Runner',
                'description' => 'Once carefully laid out during fiestas, religious gatherings, and family feasts, the Inabel Table Runner is a centerpiece of Ilocano hospitality. Every thread tells a story — from the rhythmic clacking of the wooden loom to the meticulous hands of women who learned the art from their mothers and grandmothers. Its bold geometric patterns symbolize abundance and harmony, making it not just a table accent but a cultural statement in any modern dining space.',
                'price' => 1500.00,
                'image' => 'product/InabelProducts/inabel-table-runner.jpg'
            ],
            // [
            //     'name' => 'Inabel Tote Bag',
            //     'description' => 'The Inabel Tote Bag is a beautiful fusion of traditional artistry and modern practicality. Made from handwoven cotton using centuries-old weaving techniques, this tote showcases the vibrant spirit and meticulous craftsmanship of Ilocano weavers. Historically, woven textiles were symbols of wealth and prestige — today, they continue that legacy as functional art you can carry anywhere. Spacious, durable, and stylish, the Inabel Tote celebrates cultural heritage while supporting sustainable fashion.',
            //     'price' => 1600.00,
            //     'image' => 'product/InabelProducts/inabel-tote.jpg'
            // ],
            // [
            //     'name' => 'Inabel Kimona',
            //     'description' => 'Once worn during local festivities and ceremonial gatherings, the Inabel Kimona blends traditional elegance with contemporary fashion. Its lightweight handwoven fabric breathes life into every movement, while its delicate patterns honor the stories of the past. Each kimona is a collaboration between weaver and wearer — a garment that embodies grace, strength, and cultural pride. Whether paired with modern pieces or traditional attire, it stands as a timeless expression of Filipino heritage.',
            //     'price' => 2800.00,
            //     'image' => 'product/InabelProducts/inabel-kimona.jpg'
            // ],
            // [
            //     'name' => 'Inabel Coin Purse',
            //     'description' => 'Don’t be fooled by its size — the Inabel Coin Purse is a small but mighty symbol of Ilocano artistry. Meticulously handwoven on traditional looms, it carries motifs inspired by nature and community life. Historically, woven purses like this were used to store betel nuts, coins, or small charms believed to bring luck. Today, it’s a practical accessory with a story, perfect for carrying your essentials while carrying forward a legacy.',
            //     'price' => 300.00,
            //     'image' => 'product/InabelProducts/inabel-coin-purse.jpg'
            // ],
            // [
            //     'name' => 'Inabel Dress (Modern Fusion)',
            //     'description' => 'The Inabel Dress represents the evolution of tradition into contemporary fashion. Once reserved for special occasions, Inabel textiles are now reimagined by designers who respect the past while embracing the present. Every thread woven into this dress reflects generations of craftsmanship, with motifs that symbolize prosperity, community, and nature’s harmony. Lightweight yet durable, elegant yet understated — it’s a piece of wearable heritage that transcends time.',
            //     'price' => 4200.00,
            //     'image' => 'product/InabelProducts/inabel-dress.jpg'
            // ],
            // [
            //     'name' => 'Inabel Apron',
            //     'description' => 'Originally worn by Ilocano women during cooking, farming, and festivities, the Inabel Apron is a garment of resilience and purpose. Each piece is handwoven using age-old techniques, showcasing patterns that reflect daily life, fertility, and strength. Beyond its function, it represents the hardworking spirit and enduring creativity of Filipino women. Today, it blends practicality with heritage — perfect for the modern kitchen, artisan studio, or creative workspace.',
            //     'price' => 1200.00,
            //     'image' => 'product/InabelProducts/inabel-apron.jpg'
            // ],
        ];

        foreach ($inabelProducts as $product) {
            Product::create(array_merge($product, [
                'category' => 'Inabel',
                'stock' => rand(10, 30),
            ]));
        }

        // ✨ IKAT PRODUCTS
        $ikatProducts = [
            [
                'name' => 'Ikat Sarong',
                'description' => 'The Ikat Sarong is a versatile garment deeply rooted in Southeast Asian tradition, often used in rituals, ceremonies, and daily wear. Its mesmerizing patterns are created through a complex resist-dyeing process where threads are dyed before weaving — a meticulous art passed down for generations. Historically, sarongs symbolized identity, rank, and community belonging. Today, this timeless piece serves as a wrap, shawl, or statement accessory, connecting the past and present in every fold.',
                'price' => 2800.00,
                'image' => 'product/IkatProducts/sarong.jpg'
            ],
            [
                'name' => 'Ikat Wall Hanging',
                'description' => 'Once hung in ancestral homes as protective talismans and symbols of prosperity, Ikat Wall Hangings are now treasured as art pieces that elevate modern interiors. The blurred, cloud-like patterns — a signature of the ikat technique — reflect spiritual balance and nature’s flow. Each piece is a woven story of community, ritual, and artistry, transforming any space into a gallery of cultural memory.',
                'price' => 4000.00,
                'image' => 'product/IkatProducts/wallH.jpg'
            ],
            [
                'name' => 'Ikat Kimono/Jacket',
                'description' => 'This Ikat Kimono bridges ancient tradition and contemporary fashion. Worn historically by elders and spiritual leaders, it was a garment of status and sacred meaning. Today, its timeless patterns and luxurious handwoven texture make it a bold, meaningful piece for any wardrobe. Each jacket carries the soul of the artisan who wove it — a wearable story of cultural resilience and identity.',
                'price' => 6000.00,
                'image' => 'product/IkatProducts/kimono.jpg'
            ],
            // [
            //     'name' => 'Ikat Cushion Covers',
            //     'description' => 'Ikat Cushion Covers infuse any space with color, movement, and cultural depth. Inspired by the dances, rituals, and landscapes of indigenous communities, these handwoven pieces reflect centuries-old dyeing traditions. Their vivid motifs and soft cotton texture bring warmth and authenticity to your home, turning everyday living spaces into meaningful reflections of heritage.',
            //     'price' => 1200.00,
            //     'image' => 'product/IkatProducts/ikat-cushion.jpg'
            // ],
            // [
            //     'name' => 'Ikat Shawl',
            //     'description' => 'Traditionally worn during ceremonies and rites of passage, the Ikat Shawl carries motifs that mirror the universe — stars, rivers, and life cycles. Its soft, handwoven texture and distinctive dye patterns are the result of patience and precision, with each piece taking weeks to complete. Whether draped over the shoulders or displayed as textile art, it is a piece that speaks of identity, ancestry, and artistry.',
            //     'price' => 2000.00,
            //     'image' => 'product/IkatProducts/ikat-shawl.jpg'
            // ],
            // [
            //     'name' => 'Ikat Sling Bag',
            //     'description' => 'Historically crafted for travelers and traders, the Ikat Sling Bag is a companion woven with intention and meaning. Its durable weave and striking patterns speak of journeys, exchanges, and shared stories. Today, it’s the perfect balance of function and tradition — a bag that carries not just essentials but centuries of cultural narrative.',
            //     'price' => 1600.00,
            //     'image' => 'product/IkatProducts/ikat-sling-bag.jpg'
            // ],
            // [
            //     'name' => 'Ikat Skirt (Tapis)',
            //     'description' => 'The Ikat Tapis is more than a garment — it is a living symbol of womanhood, ceremony, and cultural continuity. Its wave-like patterns, achieved through meticulous pre-dyeing techniques, mirror the ebb and flow of life. Often worn during rituals and important gatherings, it honors both nature’s rhythm and the weaver’s artistry, making it a treasured piece in any collection.',
            //     'price' => 3200.00,
            //     'image' => 'product/IkatProducts/ikat-skirt.jpg'
            // ],
            // [
            //     'name' => 'Ikat Curtains',
            //     'description' => 'Sunlight filtering through Ikat Curtains is like light passing through history itself. These handwoven pieces were once reserved for ceremonial homes and sacred spaces, believed to invite blessings and balance. Their ethereal patterns and natural dyes now elevate modern interiors with warmth, culture, and timeless beauty.',
            //     'price' => 2500.00,
            //     'image' => 'product/IkatProducts/ikat-curtains.jpg'
            // ],
            // [
            //     'name' => 'Ikat Belt (Sash)',
            //     'description' => 'Worn around the waist during rituals, the Ikat Sash symbolized unity, strength, and readiness. Every dyed thread was tied with intention, carrying prayers and protection for its wearer. Today, it remains a versatile accessory that celebrates this deep heritage — a bridge between ceremonial tradition and everyday fashion.',
            //     'price' => 900.00,
            //     'image' => 'product/IkatProducts/ikat-belt.jpg'
            // ],
        ];

        foreach ($ikatProducts as $product) {
            Product::create(array_merge($product, [
                'category' => 'Ikat',
                'stock' => rand(10, 30),
            ]));
        }

        // 🪡 KALINGA PRODUCTS
        $kalingaProducts = [
            [
                'name' => 'Kalinga Skirt (Tapis)',
                'description' => 'The Kalinga Tapis is a powerful expression of womanhood, lineage, and artistry. Worn proudly by Kalinga women during rituals and celebrations, each skirt is woven with patterns that tell stories of ancestry, fertility, and strength. Its vibrant reds and deep blacks are not mere colors — they are symbols of life, courage, and resilience passed down through generations.',
                'price' => 3000.00,
                'image' => 'product/KalingaProducts/kalinga-skirt.jpg'
            ],
            [
                'name' => 'Kalinga Headscarf',
                'description' => 'A mark of status and elegance, the Kalinga Headscarf is both practical and symbolic. Historically worn by elders and leaders, its intricate weaves speak of social rank, wisdom, and community belonging. Whether worn as a headwrap or styled as a modern accessory, it remains a bold statement of cultural pride and heritage.',
                'price' => 1000.00,
                'image' => 'product/KalingaProducts/kalinga-headscarf.jpg'
            ],
            [
                'name' => 'Kalinga Blanket',
                'description' => 'Dyed in rich red — the color of bloodlines and bravery — the Kalinga Blanket is both functional and sacred. It has wrapped generations through births, marriages, and rituals, carrying blessings and protection. Each weave is a tribute to the tribe’s ancestral spirits and their enduring connection to land, life, and legacy.',
                'price' => 4000.00,
                'image' => 'product/KalingaProducts/kalinga-blanket.jpg'
            ],
            // [
            //     'name' => 'Kalinga Bag',
            //     'description' => 'Traditionally used to carry betel nut, rice, and ritual offerings, the Kalinga Bag is a companion woven with purpose. Its bold geometric motifs symbolize mountains, rivers, and the interconnectedness of all life. Today, it continues its journey as a meaningful everyday bag that honors both utility and artistry.',
            //     'price' => 1800.00,
            //     'image' => 'product/KalingaProducts/kalinga-bag.jpg'
            // ],
            // [
            //     'name' => 'Kalinga Table Cloth',
            //     'description' => 'Once spread during rituals and communal feasts, the Kalinga Table Cloth transforms any table into a space of connection and abundance. Its strong red-and-black patterns symbolize unity and strength, while the meticulous handweaving reflects the patience and skill of generations of artisans.',
            //     'price' => 2500.00,
            //     'image' => 'product/KalingaProducts/kalinga-table-cloth.jpg'
            // ],
            // [
            //     'name' => 'Kalinga Vest',
            //     'description' => 'Worn by warriors and respected elders, the Kalinga Vest is a garment of honor and courage. Its striking red threads signify bravery and sacrifice, while the patterns woven into the fabric carry ancestral blessings. Today, it stands as a wearable tribute to the strength and spirit of the Kalinga people.',
            //     'price' => 3000.00,
            //     'image' => 'product/KalingaProducts/kalinga-vest.jpg'
            // ],
            // [
            //     'name' => 'Kalinga Coin Purse',
            //     'description' => 'Tiny but deeply symbolic, the Kalinga Coin Purse embodies the meticulous craftsmanship and vibrant storytelling of its makers. Historically used to carry small charms or coins, it is a piece of everyday culture transformed into a functional and meaningful accessory.',
            //     'price' => 500.00,
            //     'image' => 'product/KalingaProducts/kalinga-coin-purse.jpg'
            // ],
            // [
            //     'name' => 'Kalinga Bed Runner',
            //     'description' => 'Placed at the foot of the bed as a sign of prosperity and welcome, the Kalinga Bed Runner infuses any room with cultural depth and warmth. Its bold, handwoven patterns echo the rhythm of traditional chants and the strength of ancestral roots, making it a meaningful accent piece in any home.',
            //     'price' => 1800.00,
            //     'image' => 'product/KalingaProducts/kalinga-bed-runner.jpg'
            // ],
        ];

        foreach ($kalingaProducts as $product) {
            Product::create(array_merge($product, [
                'category' => 'Kalinga',
                'stock' => rand(10, 30),
            ]));
        }
    }
}
