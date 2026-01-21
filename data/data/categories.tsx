
export const categories = [
  { title: "Solvents", nav: "solvents" },
  { title: "Polymers", nav: "polymers" },
  { title: "Chemical Additives", nav: "chemical-additives" },
  { title: "Chemical Preservatives", nav: "chemical-preservatives" },
  { title: "Pigments and Fillers", nav: "pigments-fillers" },
];

export const CATEGORY_LABELS = {
  solvents: { en: "Solvents", ar: "مذيبات" },
  polymers: { en: "Polymers", ar: "بوليمرات" },
  chemicalAdditives: { en: "Chemical Additives", ar: "إضافات كيميائية" },
  preservatives: { en: "Chemical Preservatives", ar: "مواد حافظة كيميائية" },
  pigmentsFillers: { en: "Pigments & Fillers", ar: "أصباغ ومواد مالئة" },
};


export const solventsElements = [
  {
    id: 1,
    title: { en: "Methylene Chloride", ar: "ثنائي كلورو الميثان" },
    description: {
      en: "Methylene chloride is a solvent used in industrial applications.",
      ar: "ثنائي كلورو الميثان هو مذيب يستخدم في التطبيقات الصناعية."
    },
    detailed_descr: {
      en: "Methylene chloride is a powerful chlorinated solvent widely used in paint removers, metal degreasing, pharmaceutical processing, and chemical manufacturing. It offers fast evaporation, high solvency, and excellent efficiency in dissolving oils, resins, and polymers.",
      ar: "ثنائي كلورو الميثان هو مذيب كلوري قوي يُستخدم على نطاق واسع في مزيلات الطلاء، إزالة الشحوم من المعادن، الصناعات الدوائية، والتصنيع الكيميائي. يتميز بسرعة التبخر وقوة الإذابة العالية وكفاءة ممتازة في إذابة الزيوت والراتنجات والبوليمرات."
    },
    nav: "methylene-chloride",
    imagePath: "/MethyleneChloride1.webp",
    category: CATEGORY_LABELS.solvents

  },
  {
    id: 2,
    title: { en: "Methyl Ethyl Ketone (MEK)", ar: "ميثيل إيثيل كيتون" },
    description: {
      en: "MEK is commonly used in coatings and adhesives.",
      ar: "يُستخدم MEK عادة في الطلاء والمواد اللاصقة."
    },
    detailed_descr: {
      en: "MEK is a fast-evaporating solvent used in coatings, adhesives, inks, and resins. It improves drying time, enhances film durability, and provides excellent compatibility with industrial polymers.",
      ar: "ميثيل إيثيل كيتون هو مذيب سريع التبخر يُستخدم في الطلاءات، المواد اللاصقة، الأحبار، والراتنجات. يساعد على تسريع الجفاف وتحسين متانة الطبقة النهائية."
    },
    nav: "methyl-ethyl-ketone",
    imagePath: "/MEK.webp",
    category: CATEGORY_LABELS.solvents

  },
  {
    id: 3,
    title: { en: "Toluene", ar: "تولوين" },
    description: {
      en: "Toluene is used as an industrial solvent and chemical feedstock.",
      ar: "يُستخدم التولوين كمذيب صناعي وكمادة خام كيميائية."
    },
    detailed_descr: {
      en: "Toluene is an aromatic solvent widely used in paints, rubber, adhesives, and chemical synthesis. It offers strong solvency, stability, and consistent performance in demanding industrial environments.",
      ar: "التولوين هو مذيب عطري يُستخدم في الدهانات، المطاط، المواد اللاصقة، والتصنيع الكيميائي. يتميز بقوة الإذابة والثبات والأداء الموثوق."
    },
    nav: "toluene",
    imagePath: "/Toluene.webp",
    category: CATEGORY_LABELS.solvents

  },
  {
    id: 4,
    title: { en: "Xylene", ar: "زيلين" },
    description: {
      en: "Xylene is used in the production of plastics and coatings.",
      ar: "يُستخدم الزيلين في إنتاج البلاستيك والطلاءات."
    },
    detailed_descr: {
      en: "Xylene is an aromatic hydrocarbon solvent used in coatings, inks, rubber, and resin manufacturing. It improves flow properties and enhances coating performance.",
      ar: "الزيلين هو مذيب هيدروكربوني عطري يُستخدم في الطلاءات، الأحبار، المطاط، وصناعة الراتنجات، ويساعد على تحسين السيولة وجودة الطلاء."
    },
    nav: "xylene",
    imagePath: "/Xylene1.webp",
    category: CATEGORY_LABELS.solvents

  },
  {
    id: 5,
    title: { en: "Ethyl Acetate", ar: "أسيتات الإيثيل" },
    description: {
      en: "Ethyl acetate is a solvent commonly used in paints and coatings.",
      ar: "أسيتات الإيثيل هو مذيب يُستخدم عادة في الطلاء والطلاءات."
    },
    detailed_descr: {
      en: "Ethyl acetate is a low-toxicity solvent used in coatings, inks, pharmaceuticals, and food-related applications. It provides smooth evaporation and excellent solvency.",
      ar: "أسيتات الإيثيل هو مذيب منخفض السمية يُستخدم في الطلاءات، الأحبار، الصناعات الدوائية، وبعض التطبيقات الغذائية."
    },
    nav: "ethyl-acetate",
    imagePath: "/Ethyl Acetate.webp",
    category: CATEGORY_LABELS.solvents

  },
  {
    id: 6,
    title: { en: "Methyl Acetate", ar: "أسيتات الميثيل" },
    description: {
      en: "Methyl acetate is used in adhesives, coatings, and cleaning products.",
      ar: "أسيتات الميثيل يُستخدم في المواد اللاصقة والطلاءات ومنتجات التنظيف."
    },
    detailed_descr: {
      en: "Methyl acetate is a fast-drying solvent ideal for coatings, adhesives, and surface cleaners. It is valued for its pleasant odor and efficient evaporation.",
      ar: "أسيتات الميثيل هو مذيب سريع الجفاف يُستخدم في الطلاءات، المواد اللاصقة، ومنتجات التنظيف، ويتميز برائحة خفيفة وكفاءة عالية."
    },
    nav: "methyl-acetate",
    imagePath: "/MethylAcetate.webp",
    category: CATEGORY_LABELS.solvents

  },
  {
    id: 7,
    title: { en: "Butyl Acetate", ar: "أسيتات البيوتيل" },
    description: {
      en: "Butyl acetate is commonly used in coatings, inks, and adhesives.",
      ar: "أسيتات البيوتيل يُستخدم عادة في الطلاءات والأحبار والمواد اللاصقة."
    },
    detailed_descr: {
      en: "Butyl acetate is a medium-evaporation solvent used to improve flow and leveling in paints, lacquers, and inks.",
      ar: "أسيتات البيوتيل هو مذيب متوسط التبخر يُستخدم لتحسين السيولة والتسوية في الدهانات والأحبار."
    },
    nav: "butyl-acetate",
    imagePath: "/butllAcetate.webp",
    category: CATEGORY_LABELS.solvents

  }
];


export const polymersElements = [
  {
    id: 8,
    title: { en: "PVA 24 - 88", ar: "PVA 24 - 88" },
    description: {
      en: "Polyvinyl alcohol (PVA) 24 - 88 is used in adhesives and coatings.",
      ar: "البولي فينيل الكحول (PVA) 24 - 88 يُستخدم في المواد اللاصقة والطلاءات."
    },
    detailed_descr: {
      en: "PVA 24-88 is a water-soluble synthetic polymer known for its excellent adhesive strength, film-forming ability, and chemical stability. It is widely used in adhesives, paper processing, textile sizing, construction chemicals, and coating formulations.",
      ar: "PVA 24-88 هو بوليمر صناعي قابل للذوبان في الماء يتميز بقوة التصاق عالية وقدرة ممتازة على تكوين الأغشية وثبات كيميائي جيد. يُستخدم على نطاق واسع في المواد اللاصقة، معالجة الورق، تجهيز المنسوجات، والكيماويات الإنشائية."
    },
    nav: "pva-24-88",
    imagePath: "/PolyvinylAlcohol.webp",
    category: CATEGORY_LABELS.polymers

  },

  {
    id: 9,
    title: { en: "PVA 26 - 88", ar: "PVA 26 - 88" },
    description: {
      en: "Polyvinyl alcohol (PVA) 26 - 88 is used in textile and paper applications.",
      ar: "البولي فينيل الكحول (PVA) 26 - 88 يُستخدم في تطبيقات النسيج والورق."
    },
    detailed_descr: {
      en: "PVA 26-88 offers higher viscosity and improved bonding performance, making it suitable for textile sizing, paper coatings, adhesives, and emulsions. It enhances strength, flexibility, and surface quality in finished products.",
      ar: "PVA 26-88 يتميز بلزوجة أعلى وأداء التصاق أفضل، مما يجعله مناسبًا لتجهيز المنسوجات، طلاء الورق، المواد اللاصقة، والمستحلبات. يساعد على تحسين القوة والمرونة وجودة السطح."
    },
    nav: "pva-26-88",
    imagePath: "/PolyvinylAlcohol.webp",
    category: CATEGORY_LABELS.polymers

  },

  {
    id: 10,
    title: { en: "TDI (Toluene diisocyanate)", ar: "TDI (تولوين دايسوسيانات)" },
    description: {
      en: "TDI is used in the production of polyurethane foams and coatings.",
      ar: "TDI يُستخدم في إنتاج الرغاوي والبولي يوريثان والطلاءات."
    },
    detailed_descr: {
      en: "TDI is a key raw material used in manufacturing flexible polyurethane foams, elastomers, adhesives, and coatings. It provides excellent mechanical strength, elasticity, and durability in polyurethane systems.",
      ar: "TDI هو مادة خام أساسية تُستخدم في تصنيع رغاوي البولي يوريثان المرنة، الإيلاستومرات، المواد اللاصقة، والطلاءات. يوفر قوة ميكانيكية عالية ومرونة ومتانة ممتازة."
    },
    nav: "tdi",
    imagePath: "/TDI.webp",
    category: CATEGORY_LABELS.polymers

  },

  {
    id: 11,
    title: { en: "Polyol", ar: "بوليول" },
    description: {
      en: "Polyol is a key component in polyurethane production.",
      ar: "البوليول هو مكون أساسي في إنتاج البولي يوريثان."
    },
    detailed_descr: {
      en: "Polyols are essential components in polyurethane systems, reacting with isocyanates to form foams, elastomers, coatings, and adhesives. They influence flexibility, hardness, and chemical resistance of the final product.",
      ar: "البوليولات هي مكونات أساسية في أنظمة البولي يوريثان، حيث تتفاعل مع الإيزوسيانات لتكوين الرغاوي، الطلاءات، الإيلاستومرات، والمواد اللاصقة. تتحكم في المرونة والصلابة والمقاومة الكيميائية للمنتج النهائي."
    },
    nav: "polyol",
    imagePath: "/Polyol.webp",
    category: CATEGORY_LABELS.polymers

  },

  {
    id: 12,
    title: { en: "Thermoplastic Polyurethane (TPU)", ar: "البولي يوريثان الحراري (TPU)" },
    description: {
      en: "TPU is used for flexible films, coatings, and elastomeric applications.",
      ar: "يُستخدم TPU للأفلام المرنة والطلاءات والتطبيقات المرنة."
    },
    detailed_descr: {
      en: "TPU is a versatile thermoplastic elastomer combining flexibility, abrasion resistance, and mechanical strength. It is widely used in footwear, cables, automotive parts, films, and industrial coatings.",
      ar: "TPU هو إيلاستومر حراري متعدد الاستخدامات يجمع بين المرونة، مقاومة التآكل، والقوة الميكانيكية. يُستخدم في الأحذية، الكابلات، قطع السيارات، الأغشية، والطلاءات الصناعية."
    },
    nav: "tpu",
    imagePath: "/ThermoplasticPoly.webp",
    category: CATEGORY_LABELS.polymers

  },

  {
    id: 13,
    title: { en: "Neoprene", ar: "نيوبرين" },
    description: {
      en: "Neoprene is used in wetsuits, adhesives, and gaskets.",
      ar: "يُستخدم النيوبرين في بدلات الغوص والمواد اللاصقة والحشيات."
    },
    detailed_descr: {
      en: "Neoprene is a synthetic rubber known for its resistance to oils, chemicals, heat, and weathering. It is commonly used in wetsuits, seals, gaskets, hoses, and industrial adhesives.",
      ar: "النيوبرين هو مطاط صناعي يتميز بمقاومة الزيوت، المواد الكيميائية، الحرارة، والعوامل الجوية. يُستخدم في بدلات الغوص، الجوانات، الخراطيم، والمواد اللاصقة الصناعية."
    },
    nav: "neoprene",
    imagePath: "/Neoprene.wepb",
    category: CATEGORY_LABELS.polymers

  }
];

export const chemicalAdditivesElements = [
  {
    id: 14,
    title: { en: "Fumed Silica", ar: "ثاني أكسيد السيليكا المدخن" },
    description: {
      en: "Fumed silica is used as a thickening agent and anti-caking additive.",
      ar: "يُستخدم ثاني أكسيد السيليكا المدخن كعامل ثخانة ومانع للتكتل."
    },
    detailed_descr: {
      en: "Fumed silica is a high-performance additive that enhances viscosity control, improves product stability, and prevents sedimentation in coatings, adhesives, sealants, and chemical formulations.",
      ar: "ثاني أكسيد السيليكا المدخن مادة مضافة عالية الأداء تُستخدم للتحكم في اللزوجة وتحسين ثبات المنتجات ومنع الترسيب في الطلاءات والمواد اللاصقة ومانعات التسرب والتركيبات الكيميائية."
    },
    nav: "fumed-silica",
    imagePath: "/FumedSilica.webp",
    category: CATEGORY_LABELS.chemicalAdditives

  },
  {
    id: 15,
    title: { en: "Silicone Oil", ar: "زيت السيليكون" },
    description: {
      en: "Silicone oil is used for lubrication, coating, and water-repellent applications.",
      ar: "يُستخدم زيت السيليكون للتشحيم والطلاء وتطبيقات مقاومة الماء."
    },
    detailed_descr: {
      en: "Silicone oil is a stable and flexible fluid used for lubrication, surface protection, heat resistance, and water repellency across industrial, cosmetic, and chemical industries.",
      ar: "زيت السيليكون سائل مستقر ومرن يُستخدم في التشحيم وحماية الأسطح ومقاومة الحرارة وصدّ الماء في الصناعات الكيميائية والصناعية والتجميلية."
    },
    nav: "silicone-oil",
    imagePath: "/SiliconeOil.webp",
    category: CATEGORY_LABELS.chemicalAdditives

  },
  {
    id: 16,
    title: { en: "HEDP", ar: "HEDP" },
    description: {
      en: "HEDP is used as a scale and corrosion inhibitor in water treatment.",
      ar: "يُستخدم HEDP كمثبط للترسبات والتآكل في معالجة المياه."
    },
    detailed_descr: {
      en: "HEDP is a phosphonate-based compound widely used to prevent scale formation, control corrosion, and improve system efficiency in water treatment and industrial circulation systems.",
      ar: "HEDP مركب قائم على الفوسفونات يُستخدم على نطاق واسع لمنع الترسبات والتحكم في التآكل وتحسين كفاءة الأنظمة في معالجة المياه وأنظمة التدوير الصناعية."
    },
    nav: "hedp",
    imagePath: "/HEDP.webp",
    category: CATEGORY_LABELS.chemicalAdditives

  }
];


export const preservativesElements = [
  {
    id: 17,
    title: { en: "Sodium Metabisulfite (Food Grade)", ar: "ثنائي ميتابيسلفيت الصوديوم (درجة غذائية)" },
    description: {
      en: "Used as a preservative and antioxidant in food products.",
      ar: "يُستخدم كمادة حافظة ومضاد للأكسدة في المنتجات الغذائية."
    },
    detailed_descr: {
      en: "Sodium metabisulfite (food grade) is commonly used to preserve freshness, prevent oxidation, and extend shelf life in food and beverage products.",
      ar: "ثنائي ميتابيسلفيت الصوديوم (درجة غذائية) يُستخدم للحفاظ على الطزاجة ومنع الأكسدة وإطالة العمر التخزيني للمنتجات الغذائية والمشروبات."
    },
    nav: "sodium-metabisulfite",
    imagePath: "/SodiumMetabisulfi.webp",
    category: CATEGORY_LABELS.preservatives

  },
  {
    id: 18,
    title: { en: "Citric Acid (Food Grade)", ar: "حمض الستريك (درجة غذائية)" },
    description: {
      en: "Used to add acidity and preserve food products.",
      ar: "يُستخدم لإضافة الحموضة وحفظ المنتجات الغذائية."
    },
    detailed_descr: {
      en: "Citric acid (food grade) is a natural acid used to regulate acidity, enhance flavor, and improve preservation in food, beverage, and pharmaceutical products.",
      ar: "حمض الستريك (درجة غذائية) حمض طبيعي يُستخدم لتنظيم الحموضة وتعزيز النكهة وتحسين حفظ المنتجات الغذائية والمشروبات والمنتجات الدوائية."
    },
    nav: "citric-acid",
    imagePath: "/CitricAcid.webp",
    category: CATEGORY_LABELS.preservatives

  }
];


export const pigmentsFillersElements = [
  {
    id: 19,
    title: { en: "Titanium Dioxide (TiO2)", ar: "ثنائي أكسيد التيتانيوم (TiO2)" },
    description: {
      en: "Titanium dioxide is used as a white pigment in paints, coatings, and plastics.",
      ar: "يُستخدم ثنائي أكسيد التيتانيوم كصبغة بيضاء في الطلاءات والبلاستيك."
    },
    detailed_descr: {
      en: "Titanium dioxide (TiO2) is a high-opacity white pigment used to enhance brightness, coverage, and durability in paints, coatings, plastics, inks, and construction materials.",
      ar: "ثنائي أكسيد التيتانيوم (TiO2) صبغة بيضاء عالية التغطية تُستخدم لتعزيز السطوع والمتانة وقوة التغطية في الطلاءات والبلاستيك والأحبار ومواد البناء."
    },
    nav: "titanium-dioxide",
    imagePath: "/TitaniumDioxide (TiO2).webp",
    category: CATEGORY_LABELS.pigmentsFillers

  }
];


export const allElements = [
  ...solventsElements,
  ...polymersElements,
  ...chemicalAdditivesElements,
  ...preservativesElements,
  ...pigmentsFillersElements
];
