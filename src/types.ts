export interface Product {
  id: string;
  name: string;
  category: 'capinhas' | 'carregadores' | 'fones' | 'smartwatches' | 'peliculas' | 'copos' | 'audio';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description: string;
  compatibleWith?: string[];
  colors?: string[];
  inStock: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'tela' | 'bateria' | 'conector' | 'placa' | 'camera' | 'software' | 'limpeza';
  icon: string;
  description: string;
  estimatedTime: string;
  warranty: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  service?: string;
  verified: boolean;
  avatar?: string;
  relativeTime?: string;
}

export interface ReelItem {
  id: string;
  title: string;
  caption: string;
  videoUrl?: string;
  thumbnailUrl: string;
  likes: number;
  commentsCount: number;
  tag: string;
  instagramUrl: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedModel?: string;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  tip: string;
}
