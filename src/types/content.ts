export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  shipping: string;
  image: string;
  imageZoom: string;
  url: string;
}

export interface Content {
  brand: {
    name: string;
  };
  hero: {
    subtitle: string;
    title: string;
    subtitle_text: string;
    badge_text: string;
    buttons: {
      primary: string;
      primary_url: string;
      secondary: string;
    };
    promotion: {
      discount: string;
      timeframe: string;
    };
  };
  products: {
    title: string;
    items: Product[];
  };
  bundle: {
    title: string;
    price: string;
    originalPrice: string;
    savings: string;
    benefits: string[];
    image: string;
    url: string;
    button: string;
  };
  masonry: {
    title: string;
    products: Array<{
      id: number;
      name: string;
      category: string;
      height: string;
      image: string;
    }>;
  };
  isSoldOut: boolean;
  paymentLinks: {
    chronopost: string;
    mondialRelay: string;
  };
}
