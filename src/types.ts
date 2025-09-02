export type Artisan = {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  yearsExperience?: number;
};

export type Product = {
  id: string;
  name: string;
  label?: string; // e.g., "Traditional Weav"
  price: number;
  description: string;
  images: string[];
  dimensions?: string;
  weight?: string;
  craftedSignificance?: string;
  history?: string;
  artisan?: Artisan;
};
