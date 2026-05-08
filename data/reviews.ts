export interface Review {
  id: string;
  nameAr: string;
  city: string;
  rating: 5 | 4;
  textAr: string;
  productSlug: "hams" | "hidn" | "subaat" | "all";
  isPlaceholder: boolean;
  date: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    nameAr: "س.م",
    city: "الرياض",
    rating: 5,
    textAr:
      "هَمْس غيّر روتين نومي كلياً. كنت دايماً أحتاج وقت طويل حتى أنام، الحين بمجرد ما أرشه على المخدة جسمي يعرف إنه وقت النوم.",
    productSlug: "hams",
    isPlaceholder: true,
    date: "2025-01",
  },
  {
    id: "r2",
    nameAr: "ن.ع",
    city: "جدة",
    rating: 5,
    textAr:
      "حِضْن أفضل استثمار. كنت أعاني من ضوء الجوال وحرارة الغرفة، الحين أنام في دقائق.",
    productSlug: "hidn",
    isPlaceholder: true,
    date: "2025-01",
  },
  {
    id: "r3",
    nameAr: "ر.ق",
    city: "الدمام",
    rating: 5,
    textAr:
      "سُبَات ساعدني أوقف دوامة الأفكار قبل النوم. مكوناته واضحة وما فيه شيء يخوّف.",
    productSlug: "subaat",
    isPlaceholder: true,
    date: "2025-02",
  },
  {
    id: "r4",
    nameAr: "ف.ب",
    city: "الرياض",
    rating: 5,
    textAr:
      "الطقس الثلاثي معاً شيء مختلف. أحس إن الغرفة صارت مكان للراحة مو بس للنوم.",
    productSlug: "all",
    isPlaceholder: true,
    date: "2025-02",
  },
  {
    id: "r5",
    nameAr: "م.ه",
    city: "مكة المكرمة",
    rating: 4,
    textAr:
      "هَمْس رائحته لطيفة جداً ومو مزعجة. اشتريته لأمي وهي أيضاً أعجبها.",
    productSlug: "hams",
    isPlaceholder: true,
    date: "2025-03",
  },
  {
    id: "r6",
    nameAr: "ع.س",
    city: "أبها",
    rating: 5,
    textAr:
      "الدفع عند الاستلام خلاني أجرب بدون قلق. وصل بسرعة والتغليف كان جميل ومحترم.",
    productSlug: "all",
    isPlaceholder: true,
    date: "2025-03",
  },
];

export function getReviewsByProduct(slug: string): Review[] {
  return REVIEWS.filter((r) => r.productSlug === slug || r.productSlug === "all");
}

export function getAllReviews(): Review[] {
  return REVIEWS;
}
