
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Beaker, 
  Dna, 
  Microscope, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Menu, 
  X, 
  FlaskConical, 
  TestTubes,
  ChevronRight,
  Activity,
  Award,
  Factory,
  Package,
  ShoppingCart,
  Languages
} from 'lucide-react';
import { ParticleBackground, GridShimmer, ParallaxShape } from './components/VisualEffects';
import { GlowButton } from './components/InteractiveElements';
import { Language } from './types';

const translations = {
  EN: {
    tagline: "Premier Pharmaceutical Wholesaler in Algeria",
    heroTitle: "Precision Manufacturing, Global Standards.",
    heroSub: "ROVAC is a leading industrial laboratory providing wholesale pharmaceutical and nutritional solutions. We manufacture and distribute high-potency supplements to a vast network of resellers.",
    ctaPrimary: "Wholesale Inquiry",
    ctaSecondary: "Download Catalog",
    statsLab: "Manufacturing Lines",
    statsAccuracy: "Pharma Grade Quality",
    statsReach: "National Distribution",
    servicesTitle: "Our Products",
    servicesSub: "High-quality pharmaceutical supplements manufactured in our ISO-certified facilities.",
    labTitle: "World-Class Infrastructure",
    labSub: "Our Algiers facility utilizes advanced robotics and clean-room environments for large-scale production.",
    wholesaleLabel: "Wholesale Only",
    copyright: "© 2024 ROVAC Laboratory. All rights reserved.",
    viewAll: "View All Products",
    nav: {
      home: "Home",
      products: "Products",
      lab: "Infrastructure",
      wholesale: "Wholesale",
      contact: "Contact"
    }
  },
  FR: {
    tagline: "Premier Grossiste Pharmaceutique en Algérie",
    heroTitle: "Fabrication de Précision, Normes Mondiales.",
    heroSub: "ROVAC est un laboratoire industriel de premier plan offrant des solutions pharmaceutiques et nutritionnelles en gros. Nous fabriquons et distribuons des compléments à haute efficacité.",
    ctaPrimary: "Demande de Gros",
    ctaSecondary: "Télécharger le Catalogue",
    statsLab: "Lignes de Fabrication",
    statsAccuracy: "Qualité Pharmaceutique",
    statsReach: "Distribution Nationale",
    servicesTitle: "Nos Produits",
    servicesSub: "Compléments pharmaceutiques de haute qualité fabriqués dans nos installations certifiées ISO.",
    labTitle: "Infrastructure de Classe Mondiale",
    labSub: "Notre site d'Alger utilise la robotique avancée et des environnements de salle blanche pour la production à grande échelle.",
    wholesaleLabel: "Vente en Gros Uniquement",
    copyright: "© 2024 Laboratoire ROVAC. Tous droits réservés.",
    viewAll: "Voir Tous les Produits",
    nav: {
      home: "Accueil",
      products: "Produits",
      lab: "Infrastructure",
      wholesale: "Vente en Gros",
      contact: "Contact"
    }
  },
  AR: {
    tagline: "الموزع الصيدلاني الرائد في الجزائر",
    heroTitle: "تصنيع دقيق، معايير عالمية.",
    heroSub: "روفاك مختبر صناعي رائد يقدم حلولاً صيدلانية وغذائية بالجملة. نقوم بتصنيع وتوزيع مكملات عالية الفعالية لشبكة واسعة من الموزعين.",
    ctaPrimary: "طلب بالجملة",
    ctaSecondary: "تحميل الكتالوج",
    statsLab: "خطوط التصنيع",
    statsAccuracy: "جودة صيدلانية",
    statsReach: "توزيع وطني",
    servicesTitle: "منتجاتنا",
    servicesSub: "مكملات صيدلانية عالية الجودة مصنعة في مرافقنا المعتمدة من قبل الأيزو.",
    labTitle: "بنية تحتية عالمية",
    labSub: "تستخدم منشأتنا في الجزائر الروبوتات المتقدمة وبيئات الغرف النظيفة للإنتاج واسع النطاق.",
    wholesaleLabel: "للبيع بالجملة فقط",
    copyright: "© 2024 مختبر روفاك. جميع الحقوق محفوظة.",
    viewAll: "عرض جميع المنتجات",
    nav: {
      home: "الرئيسية",
      products: "المنتجات",
      lab: "البنية التحتية",
      wholesale: "الجملة",
      contact: "اتصل بنا"
    }
  }
};

const products = [
  {
    id: 'vitzinc',
    name: 'VITZINC C',
    category: 'Immunity',
    img: 'https://images.unsplash.com/photo-1616671276445-169d9c133301?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Vitamin C (250mg) + Zinc Gluconate (10mg). Essential for collagen synthesis, cell protection, and immune defense.",
      FR: "Vitamine C (250mg) + Gluconate de Zinc (10mg). Essentiel pour la synthèse du collagène, la protection cellulaire et l'immunité.",
      AR: "فيتامين سي (250 ملغ) + غلوكونات الزنك (10 ملغ). ضروري لتكوين الكولاجين وحماية الخلايا والدفاع المناعي."
    }
  },
  {
    id: 'romega3-e',
    name: 'ROMEGA 3 + Vit E',
    category: 'Cardiovascular',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Rich in EPA & DHA (1000mg) with Vitamin E. Supports heart, nervous system, and vision. No fishy odor.",
      FR: "Riche en EPA & DHA (1000mg) avec Vitamine E. Soutient le cœur, le système nerveux et la vision. Sans odeur de poisson.",
      AR: "غني بـ EPA و DHA (1000 ملغ) مع فيتامين هـ. يدعم القلب والجهاز العصبي والرؤية. بدون رائحة سمك."
    }
  },
  {
    id: 'artromega',
    name: 'ARTROMEGA',
    category: 'Joint Health',
    img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Avocado and Soy unsaponifiables. Relieves joint pain and contributes to osteoarthritis comfort.",
      FR: "Insaponifiables d'avocat et de soja. Soulage les douleurs articulaires et l'arthrose.",
      AR: "زيوت الأفوكادو والصويا غير القابلة للتصبن. يخفف آلام المفاصل ويساهم في راحة هشاشة العظام."
    }
  },
  {
    id: 'cla-400',
    name: 'CLA ROVAC 400',
    category: 'Weight Management',
    img: 'https://images.unsplash.com/photo-1550572017-ed20bb063162?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Conjugated Linoleic Acid (Safflower Oil). Helps prevent fat accumulation and maintains healthy cholesterol levels.",
      FR: "Acide Linoléique Conjugué (Huile de Carthame). Aide à prévenir l'accumulation de graisse et maintient le cholestérol.",
      AR: "حمض اللينوليك المقترن (زيت القرطم). يساعد على منع تراكم الدهون والحفاظ على مستويات الكوليسترول الصحية."
    }
  },
  {
    id: 'romega3-500',
    name: 'ROMEGA 3 (500mg)',
    category: 'General Health',
    img: 'https://images.unsplash.com/photo-1471864190281-ad5fe9bb0724?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Fish Oil EPA + DHA (500mg). Suitable for adults and children for cardiovascular and immune balance.",
      FR: "Huile de poisson EPA + DHA (500mg). Convient aux adultes et enfants pour l'équilibre cardiaque et immunitaire.",
      AR: "زيت السمك EPA + DHA (500 ملغ). مناسب للبالغين والأطفال لتوازن القلب والمناعة."
    }
  },
  {
    id: 'romega3-d3',
    name: 'ROMEGA 3 + Vit D3',
    category: 'Bone & Immunity',
    img: 'https://images.unsplash.com/photo-1527632911563-ee4b6b720327?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Omega 3 combined with Vitamin D3. Enhances calcium absorption, strengthens bone tissue, and supports immunity.",
      FR: "Oméga 3 combiné à la Vitamine D3. Améliore l'absorption du calcium, renforce le tissu osseux et l'immunité.",
      AR: "أوميغا 3 مع فيتامين د3. يعزز امتصاص الكالسيوم ويقوي الأنسجة العظمية ويدعم المناعة."
    }
  },
  {
    id: 'rovit-d3',
    name: 'ROVIT D3',
    category: 'Vitamin Support',
    img: 'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Vitamin D3 (Cholecalciferol) 50,000 UI. High potency dose to prevent deficiency and boost immune system.",
      FR: "Vitamine D3 (Cholécalciférol) 50 000 UI. Dose haute puissance pour prévenir les carences et booster l'immunité.",
      AR: "فيتامين د3 (كوليكالسيفيرول) 50000 وحدة دولية. جرعة عالية الفعالية لمنع النقص وتعزيز الجهاز المناعي."
    }
  },
  {
    id: 'astaxanthine',
    name: 'ASTAXANTHINE',
    category: 'Antioxidant',
    img: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Natural Astaxanthin 8mg. 6000x more powerful than Vit C. Protection for skin, eyes, and cellular health.",
      FR: "Astaxanthine naturelle 8mg. 6000x plus puissant que la Vit C. Protection pour la peau, les yeux et la santé cellulaire.",
      AR: "أستازانتين طبيعي 8 ملغ. أقوى 6000 مرة من فيتامين سي. حماية للبشرة والعينين وصحة الخلايا."
    }
  },
  {
    id: 'rovit-e',
    name: 'ROVIT E',
    category: 'Skin & Hair',
    img: 'https://images.unsplash.com/photo-1550572017-ed20bb063162?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Vitamin E 400 UI. Powerful antioxidant that protects cells against oxidative stress. Ideal for skin and hair health.",
      FR: "Vitamine E 400 UI. Antioxydant puissant qui protège les cellules contre le stress oxydatif. Idéal pour la peau et les cheveux.",
      AR: "فيتامين هـ 400 وحدة دولية. مضاد أكسدة قوي يحمي الخلايا من الإجهاد التأكسدي. مثالي لصحة البشرة والشعر."
    }
  },
  {
    id: 'prostac',
    name: 'PROSTAC Caps',
    category: "Men's Health",
    img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Virgin Pumpkin Seed Oil (700mg). Natural support for masculine urinary comfort.",
      FR: "Huile vierge de pépins de courge (700mg). Soutien naturel pour le confort urinaire masculin.",
      AR: "زيت بذور اليقطين البكر (700 ملغ). دعم طبيعي لراحة المسالك البولية للرجال."
    }
  },
  {
    id: 'charborovac',
    name: 'CHARBOVAC Plus',
    category: 'Digestion',
    img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Activated Charcoal, Anise, and Peppermint. Relieves digestive discomfort and bloating.",
      FR: "Charbon Actif, Anis et Menthe Poivrée. Soulage l'inconfort digestif et les ballonnements.",
      AR: "الفحم النشط واليانسون والنعناع. يخفف من الانزعاج الهضمي والانتفاخ."
    }
  },
  {
    id: 'gesta-elle',
    name: 'Gesta-elle',
    category: 'Maternity',
    img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Complete formula with Vitamins, Minerals, and Omega 3. For preconception, pregnancy, and nursing.",
      FR: "Formule complète avec Vitamines, Minéraux et Oméga 3. Pour préconception, grossesse et allaitement.",
      AR: "تركيبة كاملة من الفيتامينات والمعادن وأوميغا 3. لما قبل الحمل والحمل والرضاعة."
    }
  },
  {
    id: 'rovyx',
    name: 'ROVYX',
    category: 'Vitality',
    img: 'https://images.unsplash.com/photo-1550572017-ed20bb063162?auto=format&fit=crop&q=80&w=400',
    desc: {
      EN: "Natural formula to reinforce male performance, libido, and confidence.",
      FR: "Formule naturelle pour renforcer la performance masculine, la libido et la confiance.",
      AR: "تركيبة طبيعية لتعزيز الأداء الذكوري والرغبة الجنسية والثقة."
    }
  }
];

const ProductCard: React.FC<{ product: typeof products[0], lang: Language, idx?: number }> = ({ product, lang, idx = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1 }}
    viewport={{ once: true }}
    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
  >
    <div className="relative h-64 overflow-hidden shrink-0">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-700">
        {product.category}
      </div>
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <h4 className="text-2xl font-bold text-slate-900 mb-3">{product.name}</h4>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{product.desc[lang]}</p>
      <GlowButton className="w-full py-2.5 text-sm bg-slate-50 border-transparent hover:bg-teal-50 hover:text-teal-700 mt-auto">
        {lang === 'EN' ? 'Product Specs' : lang === 'FR' ? 'Fiche Technique' : 'مواصفات المنتج'}
      </GlowButton>
    </div>
  </motion.div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('FR');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const t = translations[lang];
  const isRTL = lang === 'AR';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, isRTL]);

  const navItems = [
    { label: t.nav.home, href: "#" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.lab, href: "#lab" },
    { label: t.nav.wholesale, href: "#wholesale" },
    { label: t.nav.contact, href: "#contact" }
  ];

  return (
    <div className={`relative min-h-screen gradient-mesh selection:bg-teal-200 ${isRTL ? 'font-arabic' : ''}`}>
      <ParticleBackground />
      <GridShimmer />
      
      {/* Parallax Background Shapes */}
      <ParallaxShape color="bg-teal-400" className="w-[40rem] h-[40rem] -top-40 -left-40" speed={0.5} />
      <ParallaxShape color="bg-blue-400" className="w-[30rem] h-[30rem] top-[20%] -right-20" speed={0.8} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm border-b border-slate-200" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-teal-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
              <FlaskConical size={24} />
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">ROVAC</span>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">{t.wholesaleLabel}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 pl-8 border-l border-slate-200">
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
                {(['EN', 'FR', 'AR'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === l ? "bg-white text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <GlowButton primary className="scale-90 px-6">
                <ShoppingCart size={16} /> {t.ctaPrimary}
              </GlowButton>
            </div>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-bold mb-6 border border-teal-100">
              <Package size={14} /> {t.tagline}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GlowButton primary className="text-lg py-4 px-10">
                {t.ctaPrimary} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
              </GlowButton>
              <GlowButton className="text-lg py-4 px-10">
                {t.ctaSecondary}
              </GlowButton>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative z-10 p-4 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1579154235602-3c3d52724484?auto=format&fit=crop&q=80&w=800" alt="Laboratory Facility" className="rounded-[2rem] object-cover aspect-video w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 z-20 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50">
              <div className="text-4xl font-black text-teal-600 mb-1">ISO 9001</div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certified Production Line</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Catalog - Show First 6 */}
      <section id="products" className="py-24 px-6 bg-white/50 backdrop-blur-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-teal-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">{t.nav.products}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t.servicesTitle}</h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.servicesSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, idx) => (
              <ProductCard key={product.id} product={product} lang={lang} idx={idx} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
             <GlowButton onClick={() => setIsProductModalOpen(true)}>
               {t.viewAll}
             </GlowButton>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="lab" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2">
             <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg h-60 w-full object-cover" alt="Machinery" />
                <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg h-60 w-full object-cover mt-8" alt="Clean Room" />
                <img src="https://images.unsplash.com/photo-1631549916768-4119b295f926?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg h-60 w-full object-cover -mt-8" alt="Production" />
                <img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg h-60 w-full object-cover" alt="Quality Control" />
             </div>
          </div>
          <div className="md:w-1/2">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-8">
              <Factory size={32} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">{t.labTitle}</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">{t.labSub}</p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="text-3xl font-black text-teal-600 mb-1">12+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.statsLab}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600 mb-1">500k+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Units / Month</div>
              </div>
            </div>
            <GlowButton primary>{lang === 'EN' ? 'Facility Tour' : lang === 'FR' ? 'Visiter l\'Usine' : 'جولة في المنشأة'}</GlowButton>
          </div>
        </div>
      </section>

      {/* Wholesale Inquiry */}
      <section id="wholesale" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-3xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full border-[40px] border-white/20 rounded-full translate-x-1/2" />
          </div>
          
          <div className="relative z-10 text-center md:text-left grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">{lang === 'EN' ? 'Scale Your Pharmaceutical Business' : lang === 'FR' ? 'Développez Votre Activité Pharmaceutique' : 'قم بتطوير عملك الصيدلاني'}</h2>
              <p className="text-slate-400 text-lg mb-10">{lang === 'EN' ? 'Join our elite network of distributors across Algeria. We provide competitive pricing, logistical support, and certified high-quality products.' : lang === 'FR' ? 'Rejoignez notre réseau d\'élite de distributeurs à travers l\'Algérie. Nous offrons des prix compétitifs et des produits de haute qualité.' : 'انضم إلى شبكة النخبة من الموزعين في جميع أنحاء الجزائر. نحن نقدم أسعارًا تنافسية ومنتجات عالية الجودة معتمدة.'}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <GlowButton primary className="bg-teal-500 hover:bg-teal-400 text-white">{t.ctaPrimary}</GlowButton>
                <GlowButton className="bg-white/5 border-white/10 text-white hover:bg-white/10">{lang === 'EN' ? 'Dealer Portal' : lang === 'FR' ? 'Portail Revendeur' : 'بوابة الوكلاء'}</GlowButton>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400"><ShieldCheck /></div>
                  <div>
                    <div className="text-white font-bold">{lang === 'EN' ? 'Quality Assurance' : 'Assurance Qualité'}</div>
                    <div className="text-slate-500 text-xs">GMP Compliant</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Globe /></div>
                  <div>
                    <div className="text-white font-bold">{lang === 'EN' ? 'National Logistics' : 'Logistique Nationale'}</div>
                    <div className="text-slate-500 text-xs">All 58 Wilayas</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><Award /></div>
                  <div>
                    <div className="text-white font-bold">{lang === 'EN' ? 'Product Certification' : 'Certification Produits'}</div>
                    <div className="text-slate-500 text-xs">MOH Registered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                  <FlaskConical size={20} />
                </div>
                <span className="text-xl font-bold text-slate-900">ROVAC</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-6">
                {lang === 'EN' ? 'Industrial laboratory specializing in the wholesale manufacturing of pharmaceutical and nutritional supplements.' : 'Laboratoire industriel spécialisé dans la fabrication en gros de compléments pharmaceutiques et nutritionnels.'}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">{t.nav.wholesale}</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">B2B Portal</a></li>
                <li><a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">Catalog Download</a></li>
                <li><a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">Reseller Terms</a></li>
                <li><a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">ROVAC Lab</h4>
              <p className="text-slate-500 mb-4">12 Zone Industrielle, Alger, Algérie</p>
              <p className="text-slate-500 mb-4">+213 (0) 23 45 67 89</p>
              <p className="text-teal-600 font-bold">contact@rovac.dz</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Languages</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => setLang('EN')} className={`text-left text-sm ${lang === 'EN' ? 'text-teal-600 font-bold' : 'text-slate-500'}`}>English</button>
                <button onClick={() => setLang('FR')} className={`text-left text-sm ${lang === 'FR' ? 'text-teal-600 font-bold' : 'text-slate-500'}`}>Français</button>
                <button onClick={() => setLang('AR')} className={`text-left text-sm ${lang === 'AR' ? 'text-teal-600 font-bold' : 'text-slate-500'}`}>العربية</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-sm">{t.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Full Product Modal */}
      <AnimatePresence>
        {isProductModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 py-12">
               <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900">{t.servicesTitle}</h2>
                  <button
                    onClick={() => setIsProductModalOpen(false)}
                    className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X size={24} />
                  </button>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  {products.map((product, idx) => (
                    <ProductCard key={product.id} product={product} lang={lang} idx={idx} />
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
