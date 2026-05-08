export type ProductSlug = "hams" | "hidn" | "subaat";

export type OfferQty = 1 | 2 | 3;

export interface Offer {
  qty: OfferQty;
  priceSar: 199 | 279 | 349;
  label: string;
  anchor?: string;
  isDefault?: boolean;
  badge?: string;
}

export interface Product {
  slug: ProductSlug;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  descAr: string;
  painAr: string;
  heroHeadlineAr: string;
  heroSubAr: string;
  color: string;
  bgColor: string;
  accentColor: string;
  offers: Offer[];
  ingredients: Ingredient[];
  howToUse: HowToUseStep[];
  faq: FAQItem[];
  comparisonPoints: ComparisonPoint[];
  isHalal?: boolean;
}

export interface Ingredient {
  nameAr: string;
  nameEn: string;
  descAr: string;
  icon: string;
}

export interface HowToUseStep {
  step: number;
  titleAr: string;
  descAr: string;
  icon: string;
}

export interface FAQItem {
  questionAr: string;
  answerAr: string;
}

export interface ComparisonPoint {
  featureAr: string;
  sajaa: boolean;
  generic: boolean;
}

export const OFFERS: Offer[] = [
  {
    qty: 1,
    priceSar: 199,
    label: "جرّبي الطقس",
    isDefault: false,
  },
  {
    qty: 2,
    priceSar: 279,
    label: "الأكثر اختياراً",
    anchor: "بدلاً من 398 ريال",
    isDefault: true,
    badge: "الأكثر اختياراً",
  },
  {
    qty: 3,
    priceSar: 349,
    label: "أفضل قيمة",
    anchor: "بدلاً من 597 ريال",
    isDefault: false,
    badge: "أفضل قيمة",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "hams",
    nameAr: "هَمْس",
    nameEn: "Hams - The Whisper",
    taglineAr: "بخاخ الوسادة العطري + الرولر",
    descAr: "بخاخ الوسادة العطري + الرولر",
    painAr: "يوم ينتهي وإحساسه يبقى في الغرفة",
    heroHeadlineAr: "لما تبقى ضوضاء اليوم على المخدة... خليه يهدأ بهَمْس.",
    heroSubAr:
      "بخاخ الوسادة العطري مع رولر صغير للحقيبة، مصمم ليحوّل نهاية اليوم إلى إشارة هادئة للنوم.",
    color: "#8B7355",
    bgColor: "#F5EFE6",
    accentColor: "#D4B896",
    offers: OFFERS,
    ingredients: [
      {
        nameAr: "لافندر طبيعي",
        nameEn: "Natural Lavender",
        descAr: "يُهدّئ الجهاز العصبي ويُرسل إشارات للنوم",
        icon: "🌿",
      },
      {
        nameAr: "زيت الأرز",
        nameEn: "Rice Oil",
        descAr: "قاعدة خفيفة لا تثقل الهواء",
        icon: "✨",
      },
      {
        nameAr: "كافور خفيف",
        nameEn: "Light Camphor",
        descAr: "يُنعش تجويف الأنف ويُصفي التنفس",
        icon: "🌬️",
      },
      {
        nameAr: "روائح زهرية",
        nameEn: "Floral Notes",
        descAr: "ورد وياسمين بتركيزات هادئة",
        icon: "🌸",
      },
    ],
    howToUse: [
      {
        step: 1,
        titleAr: "قبل النوم بـ ١٠ دقائق",
        descAr: "رشّي هَمْس على المخدة والغطاء من مسافة ٣٠ سم",
        icon: "🌙",
      },
      {
        step: 2,
        titleAr: "خذي نفساً عميقاً",
        descAr: "دعي الرائحة تستقر في الهواء قبل الاستلقاء",
        icon: "💨",
      },
      {
        step: 3,
        titleAr: "استخدمي الرولر",
        descAr: "دهني الرولر على رسغيك أو وراء الأذن للنوم خارج البيت",
        icon: "✋",
      },
    ],
    faq: [
      {
        questionAr: "هل الرائحة قوية؟",
        answerAr:
          "هَمْس مصمم بتركيزات هادئة لا تُزعج، يتلاشى خلال ساعة ليبقى أثره دون حضوره.",
      },
      {
        questionAr: "هل يصلح للحوامل؟",
        answerAr: "يُنصح باستشارة الطبيب قبل الاستخدام خلال الحمل أو الرضاعة.",
      },
      {
        questionAr: "كم يكفي الحجم الواحد؟",
        answerAr: "الرذاذ يكفي لأكثر من ٦٠ استخداماً، والرولر أكثر من ٩٠ يوماً.",
      },
    ],
    comparisonPoints: [
      { featureAr: "مكونات معلنة وشفافة", sajaa: true, generic: false },
      { featureAr: "مصمم لطقس النوم", sajaa: true, generic: false },
      { featureAr: "تركيزات هادئة غير مُزعجة", sajaa: true, generic: false },
      { featureAr: "رولر مرافق للسفر", sajaa: true, generic: false },
      { featureAr: "خالٍ من الكحول", sajaa: true, generic: false },
    ],
  },
  {
    slug: "hidn",
    nameAr: "حِضْن",
    nameEn: "Hidn - The Embrace",
    taglineAr: "قناع العين الحريري المبرد",
    descAr: "قناع العين الحريري المبرد",
    painAr: "الضوء والحرارة يقطعان الهدوء",
    heroHeadlineAr: "أغلقي الضوء والحرارة... وخلي الليل يحضنك.",
    heroSubAr:
      "قناع العين الحريري المبرد بوزن مريح وجل تبريد قابل للإزالة، مصمم لليالي اللي تحتاجين فيها ظلاماً ناعماً وهدوءاً محسوساً.",
    color: "#4A5568",
    bgColor: "#EEF0F5",
    accentColor: "#8B9DC3",
    offers: OFFERS,
    ingredients: [
      {
        nameAr: "حرير طبيعي",
        nameEn: "Natural Silk",
        descAr: "ناعم على البشرة الحساسة حول العين",
        icon: "🪡",
      },
      {
        nameAr: "جل تبريد",
        nameEn: "Cooling Gel",
        descAr: "قابل للإزالة، يخفض الحرارة الموضعية بلطف",
        icon: "❄️",
      },
      {
        nameAr: "حشوة مريحة",
        nameEn: "Comfort Fill",
        descAr: "وزن خفيف يُحسّ بالاحتضان دون ضغط",
        icon: "☁️",
      },
      {
        nameAr: "شريط قابل للتعديل",
        nameEn: "Adjustable Strap",
        descAr: "يثبت بلطف دون شد أو علامات",
        icon: "🎀",
      },
    ],
    howToUse: [
      {
        step: 1,
        titleAr: "ثبّتي الجل",
        descAr: "ضعي الجل في الفريزر ٢٠ دقيقة أو استخدميه بدرجة الغرفة",
        icon: "❄️",
      },
      {
        step: 2,
        titleAr: "ضعي حِضْن",
        descAr: "اضبطي الشريط بما يريح دون أن يضغط على العينين",
        icon: "👁️",
      },
      {
        step: 3,
        titleAr: "استلقي واسترخي",
        descAr: "الظلام الناعم والبرودة الخفيفة تُهيّئ للنوم العميق",
        icon: "🌙",
      },
    ],
    faq: [
      {
        questionAr: "هل الجل آمن على البشرة؟",
        answerAr: "الجل يُوضع على القماش فوق العين وليس مباشرة على البشرة.",
      },
      {
        questionAr: "كيف أنظف حِضْن؟",
        answerAr: "الغسيل اليدوي بالماء البارد والصابون اللطيف يُحافظ عليه.",
      },
      {
        questionAr: "هل يناسب جميع أحجام الرأس؟",
        answerAr: "الشريط قابل للتعديل ليناسب معظم أحجام الرأس.",
      },
    ],
    comparisonPoints: [
      { featureAr: "حرير طبيعي على البشرة", sajaa: true, generic: false },
      { featureAr: "جل تبريد مدمج قابل للإزالة", sajaa: true, generic: false },
      { featureAr: "وزن يُحسّ بالاحتضان", sajaa: true, generic: false },
      { featureAr: "شريط لا يترك آثار", sajaa: true, generic: false },
      { featureAr: "مصمم للمرأة السعودية", sajaa: true, generic: false },
    ],
  },
  {
    slug: "subaat",
    nameAr: "سُبَات",
    nameEn: "Subaat - The Deep Rest",
    taglineAr: "علكات النوم",
    descAr: "علكات النوم",
    painAr: "العقل لا يتوقف حتى بعد إطفاء الأنوار",
    heroHeadlineAr: "لما يكون كل شيء هادئ... إلا أفكارك.",
    heroSubAr:
      "علكات نوم بنكهة لطيفة، تجمع مكونات شائعة في روتينات الهدوء قبل النوم، مع شهادة حلال عند توفرها للعرض.",
    color: "#5B4F8B",
    bgColor: "#F0EDF8",
    accentColor: "#9B89C4",
    isHalal: true,
    offers: OFFERS,
    ingredients: [
      {
        nameAr: "ماغنيسيوم",
        nameEn: "Magnesium",
        descAr: "يدعم استرخاء العضلات والجهاز العصبي",
        icon: "💊",
      },
      {
        nameAr: "جلايسين",
        nameEn: "Glycine",
        descAr: "حمض أميني يُساعد في تنظيم درجة حرارة الجسم للنوم",
        icon: "🔬",
      },
      {
        nameAr: "نكهة طبيعية",
        nameEn: "Natural Flavor",
        descAr: "نكهة لطيفة تجعل الروتين ممتعاً",
        icon: "🍬",
      },
      {
        nameAr: "لا سكر مضاف",
        nameEn: "No Added Sugar",
        descAr: "مناسبة لمن تراقب السكر في الروتين اليومي",
        icon: "✅",
      },
    ],
    howToUse: [
      {
        step: 1,
        titleAr: "قبل النوم بـ ٣٠ دقيقة",
        descAr: "تناولي علكة سُبَات مع كوب ماء",
        icon: "🌙",
      },
      {
        step: 2,
        titleAr: "أنشئي الروتين",
        descAr: "اجعليها جزءاً من إشارة الجسم للنوم كل ليلة",
        icon: "🔄",
      },
      {
        step: 3,
        titleAr: "استمتعي بالنتائج",
        descAr: "الاستخدام المنتظم يُعطي أفضل النتائج",
        icon: "⭐",
      },
    ],
    faq: [
      {
        questionAr: "هل سُبَات يسبب الإدمان؟",
        answerAr:
          "المكونات غير مدمنة ويمكن التوقف عنها في أي وقت دون أعراض.",
      },
      {
        questionAr: "هل هو حلال؟",
        answerAr:
          "سُبَات مصمم ليكون حلالاً، وشهادة الحلال ستُعرض عند توفرها.",
      },
      {
        questionAr: "هل يصلح للمراهقات؟",
        answerAr: "يُنصح باستشارة الطبيب قبل الاستخدام لمن دون ١٨ عاماً.",
      },
    ],
    comparisonPoints: [
      { featureAr: "مكونات معلنة ومدروسة", sajaa: true, generic: false },
      { featureAr: "لا منومات دوائية", sajaa: true, generic: false },
      { featureAr: "شهادة حلال", sajaa: true, generic: false },
      { featureAr: "لا سكر مضاف", sajaa: true, generic: false },
      { featureAr: "طعم لطيف يُشجع الانتظام", sajaa: true, generic: false },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getOtherProducts(slug: ProductSlug): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug);
}
