using Core.Entities;
using Infrastructure.persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.DataSeeding
{
    public static class DbInitializer
    {
        public static async Task SeedProductsAsync(ApplicationDbContext context)
        {
            if (await context.Products.AnyAsync())
                return;

            var products = new List<Product>
                {
                    // Solvents
                    new Product
                    {
                        TitleEn = "Methylene Chloride",
                        TitleAr = "ثنائي كلورو الميثان",
                        DescriptionEn = "Methylene chloride is a solvent used in industrial applications.",
                        DescriptionAr = "ثنائي كلورو الميثان هو مذيب يستخدم في التطبيقات الصناعية.",
                        DetailedDescriptionEn = "Methylene chloride is a powerful chlorinated solvent widely used in paint removers, metal degreasing, pharmaceutical processing, and chemical manufacturing. It offers fast evaporation, high solvency, and excellent efficiency in dissolving oils, resins, and polymers.",
                        DetailedDescriptionAr = "ثنائي كلورو الميثان هو مذيب كلوري قوي يُستخدم على نطاق واسع في مزيلات الطلاء، إزالة الشحوم من المعادن، الصناعات الدوائية، والتصنيع الكيميائي. يتميز بسرعة التبخر وقوة الإذابة العالية وكفاءة ممتازة في إذابة الزيوت والراتنجات والبوليمرات.",
                        Nav = "methylene-chloride",
                        ImagePath = "/MethyleneChloride1.webp",
                        CategoryEn = "Solvents",
                        CategoryAr = "مذيبات"
                    },
                    new Product
                    {
                        TitleEn = "Methyl Ethyl Ketone (MEK)",
                        TitleAr = "ميثيل إيثيل كيتون",
                        DescriptionEn = "MEK is commonly used in coatings and adhesives.",
                        DescriptionAr = "يُستخدم MEK عادة في الطلاء والمواد اللاصقة.",
                        DetailedDescriptionEn = "MEK is a fast-evaporating solvent used in coatings, adhesives, inks, and resins. It improves drying time, enhances film durability, and provides excellent compatibility with industrial polymers.",
                        DetailedDescriptionAr = "ميثيل إيثيل كيتون هو مذيب سريع التبخر يُستخدم في الطلاءات، المواد اللاصقة، الأحبار، والراتنجات. يساعد على تسريع الجفاف وتحسين متانة الطبقة النهائية.",
                        Nav = "methyl-ethyl-ketone",
                        ImagePath = "/MEK.webp",
                        CategoryEn = "Solvents",
                        CategoryAr = "مذيبات"
                    },
                    new Product
                    {
                        TitleEn = "Toluene",
                        TitleAr = "تولوين",
                        DescriptionEn = "Toluene is used as an industrial solvent and chemical feedstock.",
                        DescriptionAr = "يُستخدم التولوين كمذيب صناعي وكمادة خام كيميائية.",
                        DetailedDescriptionEn = "Toluene is an aromatic solvent widely used in paints, rubber, adhesives, and chemical synthesis. It offers strong solvency, stability, and consistent performance in demanding industrial environments.",
                        DetailedDescriptionAr = "التولوين هو مذيب عطري يُستخدم في الدهانات، المطاط، المواد اللاصقة، والتصنيع الكيميائي. يتميز بقوة الإذابة والثبات والأداء الموثوق.",
                        Nav = "toluene",
                        ImagePath = "/Toluene.webp",
                        CategoryEn = "Solvents",
                        CategoryAr = "مذيبات"
                    },
                    new Product
                    {
                        TitleEn = "Xylene",
                        TitleAr = "زيلين",
                        DescriptionEn = "Xylene is used in the production of plastics and coatings.",
                        DescriptionAr = "يُستخدم الزيلين في إنتاج البلاستيك والطلاءات.",
                        DetailedDescriptionEn = "Xylene is an aromatic hydrocarbon solvent used in coatings, inks, rubber, and resin manufacturing. It improves flow properties and enhances coating performance.",
                        DetailedDescriptionAr = "الزيلين هو مذيب هيدروكربوني عطري يُستخدم في الطلاءات، الأحبار، المطاط، وصناعة الراتنجات، ويساعد على تحسين السيولة وجودة الطلاء.",
                        Nav = "xylene",
                        ImagePath = "/Xylene1.webp",
                        CategoryEn = "Solvents",
                        CategoryAr = "مذيبات"
                    },
                    new Product
                    {
                        TitleEn = "Ethyl Acetate",
                        TitleAr = "أسيتات الإيثيل",
                        DescriptionEn = "Ethyl acetate is a solvent commonly used in paints and coatings.",
                        DescriptionAr = "أسيتات الإيثيل هو مذيب يُستخدم عادة في الطلاء والطلاءات.",
                        DetailedDescriptionEn = "Ethyl acetate is a low-toxicity solvent used in coatings, inks, pharmaceuticals, and food-related applications. It provides smooth evaporation and excellent solvency.",
                        DetailedDescriptionAr = "أسيتات الإيثيل هو مذيب منخفض السمية يُستخدم في الطلاءات، الأحبار، الصناعات الدوائية، وبعض التطبيقات الغذائية.",
                        Nav = "ethyl-acetate",
                        ImagePath = "/Ethyl Acetate.webp",
                        CategoryEn = "Solvents",
                        CategoryAr = "مذيبات"
                    },
                    new Product
                    {
                        TitleEn = "Methyl Acetate",
                        TitleAr = "أسيتات الميثيل",
                        DescriptionEn = "Methyl acetate is used in adhesives, coatings, and cleaning products.",
                        DescriptionAr = "أسيتات الميثيل يُستخدم في المواد اللاصقة والطلاءات ومنتجات التنظيف.",
                        DetailedDescriptionEn = "Methyl acetate is a fast-drying solvent ideal for coatings, adhesives, and surface cleaners. It is valued for its pleasant odor and efficient evaporation.",
                        DetailedDescriptionAr = "أسيتات الميثيل هو مذيب سريع الجفاف يُستخدم في الطلاءات، المواد اللاصقة، ومنتجات التنظيف، ويتميز برائحة خفيفة وكفاءة عالية.",
                        Nav = "methyl-acetate",
                        ImagePath = "/MethylAcetate.webp",
                        CategoryEn = "Solvents",
                        CategoryAr = "مذيبات"
                    },
                    new Product
                    {
                        TitleEn = "Butyl Acetate",
                        TitleAr = "أسيتات البيوتيل",
                        DescriptionEn = "Butyl acetate is commonly used in coatings, inks, and adhesives.",
                        DescriptionAr = "أسيتات البيوتيل يُستخدم عادة في الطلاءات والأحبار والمواد اللاصقة.",
                        DetailedDescriptionEn = "Butyl acetate is a medium-evaporation solvent used to improve flow and leveling in paints, lacquers, and inks.",
                        DetailedDescriptionAr = "أسيتات البيوتيل هو مذيب متوسط التبخر يُستخدم لتحسين السيولة والتسوية في الدهانات والأحبار.",
                        Nav = "butyl-acetate",
                        ImagePath = "/butllAcetate.webp",
                        CategoryEn = "Solvents",
                        CategoryAr = "مذيبات"
                    },

                    // Polymers
                    new Product
                    {
                        TitleEn = "PVA 24 - 88",
                        TitleAr = "PVA 24 - 88",
                        DescriptionEn = "Polyvinyl alcohol (PVA) 24 - 88 is used in adhesives and coatings.",
                        DescriptionAr = "البولي فينيل الكحول (PVA) 24 - 88 يُستخدم في المواد اللاصقة والطلاءات.",
                        DetailedDescriptionEn = "PVA 24-88 is a water-soluble synthetic polymer known for its excellent adhesive strength, film-forming ability, and chemical stability. It is widely used in adhesives, paper processing, textile sizing, construction chemicals, and coating formulations.",
                        DetailedDescriptionAr = "PVA 24-88 هو بوليمر صناعي قابل للذوبان في الماء يتميز بقوة التصاق عالية وقدرة ممتازة على تكوين الأغشية وثبات كيميائي جيد. يُستخدم على نطاق واسع في المواد اللاصقة، معالجة الورق، تجهيز المنسوجات، والكيماويات الإنشائية.",
                        Nav = "pva-24-88",
                        ImagePath = "/PolyvinylAlcohol.webp",
                        CategoryEn = "Polymers",
                        CategoryAr = "بوليمرات"
                    },
                    new Product
                    {
                        TitleEn = "PVA 26 - 88",
                        TitleAr = "PVA 26 - 88",
                        DescriptionEn = "Polyvinyl alcohol (PVA) 26 - 88 is used in textile and paper applications.",
                        DescriptionAr = "البولي فينيل الكحول (PVA) 26 - 88 يُستخدم في تطبيقات النسيج والورق.",
                        DetailedDescriptionEn = "PVA 26-88 offers higher viscosity and improved bonding performance, making it suitable for textile sizing, paper coatings, adhesives, and emulsions. It enhances strength, flexibility, and surface quality in finished products.",
                        DetailedDescriptionAr = "PVA 26-88 يتميز بلزوجة أعلى وأداء التصاق أفضل، مما يجعله مناسبًا لتجهيز المنسوجات، طلاء الورق، المواد اللاصقة، والمستحلبات. يساعد على تحسين القوة والمرونة وجودة السطح.",
                        Nav = "pva-26-88",
                        ImagePath = "/PolyvinylAlcohol.webp",
                        CategoryEn = "Polymers",
                        CategoryAr = "بوليمرات"
                    },
                    new Product
                    {
                        TitleEn = "TDI (Toluene diisocyanate)",
                        TitleAr = "TDI (تولوين دايسوسيانات)",
                        DescriptionEn = "TDI is used in the production of polyurethane foams and coatings.",
                        DescriptionAr = "TDI يُستخدم في إنتاج الرغاوي والبولي يوريثان والطلاءات.",
                        DetailedDescriptionEn = "TDI is a key raw material used in manufacturing flexible polyurethane foams, elastomers, adhesives, and coatings. It provides excellent mechanical strength, elasticity, and durability in polyurethane systems.",
                        DetailedDescriptionAr = "TDI هو مادة خام أساسية تُستخدم في تصنيع رغاوي البولي يوريثان المرنة، الإيلاستومرات، المواد اللاصقة، والطلاءات. يوفر قوة ميكانيكية عالية ومرونة ومتانة ممتازة.",
                        Nav = "tdi",
                        ImagePath = "/TDI.webp",
                        CategoryEn = "Polymers",
                        CategoryAr = "بوليمرات"
                    },
                    new Product
                    {
                        TitleEn = "Polyol",
                        TitleAr = "بوليول",
                        DescriptionEn = "Polyol is a key component in polyurethane production.",
                        DescriptionAr = "البوليول هو مكون أساسي في إنتاج البولي يوريثان.",
                        DetailedDescriptionEn = "Polyols are essential components in polyurethane systems, reacting with isocyanates to form foams, elastomers, coatings, and adhesives. They influence flexibility, hardness, and chemical resistance of the final product.",
                        DetailedDescriptionAr = "البوليولات هي مكونات أساسية في أنظمة البولي يوريثان، حيث تتفاعل مع الإيزوسيانات لتكوين الرغاوي، الطلاءات، الإيلاستومرات، والمواد اللاصقة. تتحكم في المرونة والصلابة والمقاومة الكيميائية للمنتج النهائي.",
                        Nav = "polyol",
                        ImagePath = "/Polyol.webp",
                        CategoryEn = "Polymers",
                        CategoryAr = "بوليمرات"
                    },
                    new Product
                    {
                        TitleEn = "Thermoplastic Polyurethane (TPU)",
                        TitleAr = "البولي يوريثان الحراري (TPU)",
                        DescriptionEn = "TPU is used for flexible films, coatings, and elastomeric applications.",
                        DescriptionAr = "يُستخدم TPU للأفلام المرنة والطلاءات والتطبيقات المرنة.",
                        DetailedDescriptionEn = "TPU is a versatile thermoplastic elastomer combining flexibility, abrasion resistance, and mechanical strength. It is widely used in footwear, cables, automotive parts, films, and industrial coatings.",
                        DetailedDescriptionAr = "TPU هو إيلاستومر حراري متعدد الاستخدامات يجمع بين المرونة، مقاومة التآكل، والقوة الميكانيكية. يُستخدم في الأحذية، الكابلات، قطع السيارات، الأغشية، والطلاءات الصناعية.",
                        Nav = "tpu",
                        ImagePath = "/ThermoplasticPoly.webp",
                        CategoryEn = "Polymers",
                        CategoryAr = "بوليمرات"
                    },
                    new Product
                    {
                        TitleEn = "Neoprene",
                        TitleAr = "نيوبرين",
                        DescriptionEn = "Neoprene is used in wetsuits, adhesives, and gaskets.",
                        DescriptionAr = "يُستخدم النيوبرين في بدلات الغوص والمواد اللاصقة والحشيات.",
                        DetailedDescriptionEn = "Neoprene is a synthetic rubber known for its resistance to oils, chemicals, heat, and weathering. It is commonly used in wetsuits, seals, gaskets, hoses, and industrial adhesives.",
                        DetailedDescriptionAr = "النيوبرين هو مطاط صناعي يتميز بمقاومة الزيوت، المواد الكيميائية، الحرارة، والعوامل الجوية. يُستخدم في بدلات الغوص، الجوانات، الخراطيم، والمواد اللاصقة الصناعية.",
                        Nav = "neoprene",
                        ImagePath = "/Neoprene.webp",
                        CategoryEn = "Polymers",
                        CategoryAr = "بوليمرات"
                    },

                    // Chemical Additives
                    new Product
                    {
                        TitleEn = "Fumed Silica",
                        TitleAr = "ثاني أكسيد السيليكا المدخن",
                        DescriptionEn = "Fumed silica is used as a thickening agent and anti-caking additive.",
                        DescriptionAr = "يُستخدم ثاني أكسيد السيليكا المدخن كعامل ثخانة ومانع للتكتل.",
                        DetailedDescriptionEn = "Fumed silica is a high-performance additive that enhances viscosity control, improves product stability, and prevents sedimentation in coatings, adhesives, sealants, and chemical formulations.",
                        DetailedDescriptionAr = "ثاني أكسيد السيليكا المدخن مادة مضافة عالية الأداء تُستخدم للتحكم في اللزوجة وتحسين ثبات المنتجات ومنع الترسيب في الطلاءات والمواد اللاصقة ومانعات التسرب والتركيبات الكيميائية.",
                        Nav = "fumed-silica",
                        ImagePath = "/FumedSilica.webp",
                        CategoryEn = "Chemical Additives",
                        CategoryAr = "إضافات كيميائية"
                    },
                    new Product
                    {
                        TitleEn = "Silicone Oil",
                        TitleAr = "زيت السيليكون",
                        DescriptionEn = "Silicone oil is used for lubrication, coating, and water-repellent applications.",
                        DescriptionAr = "يُستخدم زيت السيليكون للتشحيم والطلاء وتطبيقات مقاومة الماء.",
                        DetailedDescriptionEn = "Silicone oil is a stable and flexible fluid used for lubrication, surface protection, heat resistance, and water repellency across industrial, cosmetic, and chemical industries.",
                        DetailedDescriptionAr = "زيت السيليكون سائل مستقر ومرن يُستخدم في التشحيم وحماية الأسطح ومقاومة الحرارة وصدّ الماء في الصناعات الكيميائية والصناعية والتجميلية.",
                        Nav = "silicone-oil",
                        ImagePath = "/SiliconeOil.webp",
                        CategoryEn = "Chemical Additives",
                        CategoryAr = "إضافات كيميائية"
                    },
                    new Product
                    {
                        TitleEn = "HEDP",
                        TitleAr = "HEDP",
                        DescriptionEn = "HEDP is used as a scale and corrosion inhibitor in water treatment.",
                        DescriptionAr = "يُستخدم HEDP كمثبط للترسبات والتآكل في معالجة المياه.",
                        DetailedDescriptionEn = "HEDP is a phosphonate-based compound widely used to prevent scale formation, control corrosion, and improve system efficiency in water treatment and industrial circulation systems.",
                        DetailedDescriptionAr = "HEDP مركب قائم على الفوسفونات يُستخدم على نطاق واسع لمنع الترسبات والتحكم في التآكل وتحسين كفاءة الأنظمة في معالجة المياه وأنظمة التدوير الصناعية.",
                        Nav = "hedp",
                        ImagePath = "/HEDP.webp",
                        CategoryEn = "Chemical Additives",
                        CategoryAr = "إضافات كيميائية"
                    },

                    // Chemical Preservatives
                    new Product
                    {
                        TitleEn = "Sodium Metabisulfite (Food Grade)",
                        TitleAr = "ثنائي ميتابيسلفيت الصوديوم (درجة غذائية)",
                        DescriptionEn = "Used to preserve freshness and extend shelf life in food and beverages.",
                        DescriptionAr = "يُستخدم للحفاظ على الطزاجة وإطالة العمر التخزيني للمنتجات الغذائية والمشروبات.",
                        DetailedDescriptionEn = "Sodium metabisulfite (food grade) is used to preserve freshness, prevent oxidation, and extend the shelf life of food products and beverages.",
                        DetailedDescriptionAr = "ثنائي ميتابيسلفيت الصوديوم (درجة غذائية) يُستخدم للحفاظ على الطزاجة ومنع الأكسدة وإطالة العمر التخزيني للمنتجات الغذائية والمشروبات.",
                        Nav = "sodium-metabisulfite",
                        ImagePath = "/SodiumMetabisulfi.webp",
                        CategoryEn = "Chemical Preservatives",
                        CategoryAr = "مواد حافظة كيميائية"
                    },
                    new Product
                    {
                        TitleEn = "Citric Acid (Food Grade)",
                        TitleAr = "حمض الستريك (درجة غذائية)",
                        DescriptionEn = "Used to add acidity and preserve food products.",
                        DescriptionAr = "يُستخدم لإضافة الحموضة وحفظ المنتجات الغذائية.",
                        DetailedDescriptionEn = "Citric acid (food grade) is a natural acid used to regulate acidity, enhance flavor, and improve preservation in food, beverage, and pharmaceutical products.",
                        DetailedDescriptionAr = "حمض الستريك (درجة غذائية) حمض طبيعي يُستخدم لتنظيم الحموضة وتعزيز النكهة وتحسين حفظ المنتجات الغذائية والمشروبات والمنتجات الدوائية.",
                        Nav = "citric-acid",
                        ImagePath = "/CitricAcid.webp",
                        CategoryEn = "Chemical Preservatives",
                        CategoryAr = "مواد حافظة كيميائية"
                    },

                    // Pigments and Fillers
                    new Product
                    {
                        TitleEn = "Titanium Dioxide (TiO2)",
                        TitleAr = "ثنائي أكسيد التيتانيوم (TiO2)",
                        DescriptionEn = "Used as a white pigment in paints, plastics, and cosmetics.",
                        DescriptionAr = "يُستخدم كصبغة بيضاء في الدهانات والبلاستيك ومستحضرات التجميل.",
                        DetailedDescriptionEn = "Titanium dioxide (TiO2) is a high-opacity white pigment used to enhance brightness, durability, and hiding power in coatings, plastics, inks, and construction materials.",
                        DetailedDescriptionAr = "ثنائي أكسيد التيتانيوم (TiO2) صبغة بيضاء عالية التغطية تُستخدم لتعزيز السطوع والمتانة وقوة التغطية في الطلاءات والبلاستيك والأحبار ومواد البناء.",
                        Nav = "titanium-dioxide",
                        ImagePath = "/TitaniumDioxide (TiO2).webp",
                        CategoryEn = "Pigments & Fillers",
                        CategoryAr = "أصباغ ومواد مالئة"
                    }
                };
            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}
