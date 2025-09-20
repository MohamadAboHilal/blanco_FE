import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: {
        home: "Home",
        services: "Services",
        contact: "Contact Us",
        about: "About Us",
        faq: "FAQ",
      },
      hero: {
        // title1: "Make It Sparkle",
        title1: "Cleaning Services Company",
        title2: "Make It Sparkle",
        sub: "Transform your space with our Expert Cleaning Team. From homes to offices, we deliver spotless results every time.",
        highlight: "Expert Cleaning Team",
        guarantee: "100% Satisfaction Guaranteed",
        call: "Call",
      },
      about: {
        heading: "Who <blue>We Are</blue>",
        specializations: "Our Specializations",
        missionTitle: "Our Mission",
        missionText:
          "To provide dependable and professional cleaning services...",
        visionTitle: "Our Vision",
        visionText:
          "To become Syria’s leading name in professional cleaning services...",
      },
      services: {
        our: "Our",
        cleaning: "Cleaning",
        service: "Services",
        description:
          "Blanco offers a range of service packages to suit different needs and environments. Whether you require basic maintenance or specialized cleaning, we have the right solution for your business",
      },
      clients: {
        our: "Our",
        clients: "Clients",
        description: "Some of our latest clients",
      },
      reviews: {
        whatOur: "What Our",
        clients: "Clients",
        say: "say",
        description:
          "Don’t just take our word for it – hear from our satisfied customers",
      },
      tips: {
        professional: "Professional",
        cleaning: "Cleaning",
        tips: "Tips",
        description: "Expert advice from our professional cleaning team",
      },
      faq: {
        frequentlyAsked: "Frequently Asked",
        questions: "Questions",
        p1: "Find answers to common questions about",
        p2: "our cleaning services.",
      },
      contact: {
        getIn: "Get in",
        touch: "Touch",
        description:
          "Ready to experience professional cleaning services? Contact us today for a free consultation and a customized cleaning plan for your business.",
        email: "Email",
        name: "Name",
        message: "Your Message",
        send: "Send",
        alert: "Thanks! Your message has been sent.",
        phone: "Phone Number",
      },
      about: {
        who: "Who",
        weAre: "We Are",
        blanco: "BLANCO",
        is: "is a professional cleaning company based in Damascus, Syria, specializing in",
        b2b: "B2B",
        cleaning:
          "cleaning services for offices, retail stores, restaurants, schools, universities, healthcare centers, and government buildings.",
        ourSpecializations: "Our Specializations",
        ourMission: "Our Mission",
        missionText:
          "To provide dependable and professional cleaning services that help businesses and institutions maintain a clean, safe, and welcoming environment, every day.",
        ourVision: "Our Vision",
        visionText:
          "To become Syria’s leading name in professional cleaning services, setting the benchmark for quality and consistency, and expanding across all cities to be the go-to reference for cleanliness solutions.",
      },
      specializations: {
        building: "Offices & Corporate Buildings",
        buildingDescription:
          "We provide thorough cleaning services to maintain a clean, professional, and productive work environment.",
        school: "Schools & Universities",
        schoolDescription:
          "Creating a safe and hygienic learning environment with regular and deep cleaning services.",
        hospital: "Healthcare Centers",
        hospitalDescription:
          "Specialized cleaning solutions that meet health and safety standards to protect staff and patients",
        shop: "Retail Stores & Restaurants",
        shopDescription:
          "We ensure your space is spotless and welcoming for your customers and staff",
        government: "Governmental Buildings",
        governmentDescription:
          "Reliable cleaning services tailored to the needs of public service facilities.",
        house: "Residential Cleaning",
        houseDescription:
          "Making your home shine with customized cleaning plans that suit your lifestyle.",
      },
      work: {
        our: "Our",
        work: "Work",
        gallery: "Gallery",
        description:
          "See the transformation - Before and after photos & videos",
        all: "All Work",
        beforeAfter: "Before & After",
        video: "Video",
        before: "Before",
        after: "After",
      },

      footer: {
        make: "Make It Sparkle",
        cleaning: "Cleaning Services Company",
        useful: "Useful Links",
        find: "You Can Find Us",
        email: "Blanco@gmail.com",
        service: "Services",
        about: "About Us",
        contact: "Contact Us",
      },
      aboutBlanco: {
        about: "About",
        blanco: "Blanco",
        mission: "Our Mission",
        missionText:
          "To provide dependable and professional cleaning services that help businesses and institutions maintain a clean, safe, and welcoming environment, every day.",
        values: "Our Values",
        valuesText:
          "1. Integrity – We do what is right, even when no one is watching.\n2. Transparency – Clear communication and honest service at every step.\n3. Credibility – Trust earned through reliable and consistent performance.\n4. Quality – Excellence is not an act, it is our habit.\n5. Accountability – We take full responsibility for our work.\n6. Customer-Centric – Your needs shape our solutions.",
        vision: "Our Vision",
        visionText:
          "To become Syria’s leading name in professional cleaning services, setting the benchmark for quality and consistency.\nExpanding across all cities to be the go-to reference for cleanliness solutions.\nIn the next decade, Blanco will become a leading national provider of cleanliness solutions by expanding into materials, tools, and innovations that redefine how Syrian institutions manage cleanliness.",
      },
    },
  },
  ar: {
    translation: {
      header: {
        home: "الرئيسية",
        services: "الخدمات",
        contact: "اتصل بنا",
        about: "من نحن",
        faq: "الأسئلة الشائعة",
      },
      // hero: {
      //   title1: "خلّيها تلمع",
      //   title2: "شركة خدمات تنظيف",
      //   sub: "حوّل مساحتك مع فريق التنظيف الخبير. من المنازل إلى المكاتب، نقدّم نتائج مثالية في كل مرة.",
      //   guarantee: "رضاكم 100% مضمون",
      //   call: "اتصل",
      // },
      hero: {
        // title1: "Make It Sparkle",
        title1: "شركة خدمات تنظيف",
        title2: "خلّيها تلمع",
        sub: "حوّل مساحتك مع فريق التنظيف الخبير. من المنازل إلى المكاتب، نقدّم نتائج مثالية في كل مرة.",
        highlight: "فريق التنظيف الخبير",
        guarantee: "100% رضا مضمون",
        call: "اتصل",
      },
      about: {
        heading: "من <blue>نحن</blue>",
        specializations: "تخصصاتنا",
        missionTitle: "رسالتنا",
        missionText: "تقديم خدمات تنظيف موثوقة واحترافية...",
        visionTitle: "رؤيتنا",
        visionText: "أن نصبح الاسم الرائد في سوريا في خدمات التنظيف المهنية...",
      },
      services: {
        our: "خدمات",
        cleaning: "التنظيف",
        service: "التي نقدمها",
        description:
          "تقدم بلانكو مجموعة من حزم الخدمات لتلبية الاحتياجات والبيئات المختلفة. سواء كنت بحاجة إلى صيانة أساسية أو تنظيف متخصص، لدينا الحل المناسب لعملك",
      },
      clients: {
        our: "بعض من",
        clients: "عملائنا",
        description: "بعض من أحدث عملائنا",
      },
      reviews: {
        whatOur: "تعليقات",
        clients: "عملائنا",
        say: "حول الخدمات",
        description: "لا تأخذ كلامنا فقط - استمع إلى عملائنا الراضين",
      },
      tips: {
        professional: "نصائح",
        cleaning: "تنظيف",
        tips: "احترافية",
        description: "نصائح خبراء من فريق التنظيف المحترف لدينا",
      },
      faq: {
        frequentlyAsked: "الأسئلة",
        questions: "الاكثر شيوعاً",
        p1: "ابحث عن إجابات للأسئلة الشائعة حول",
        p2: "خدمات التنظيف لدينا.",
      },
      contact: {
        getIn: "تواصل",
        touch: "معنا",
        description:
          "هل أنت مستعد لتجربة خدمات التنظيف الاحترافية؟ تواصل معنا اليوم للحصول على استشارة مجانية وخطة تنظيف مخصصة لعملك.",
        email: "البريد الإلكتروني",
        name: "الاسم",
        message: "رسالتك",
        send: "إرسال",
        alert: "شكراً! تم إرسال رسالتك.",
        phone: "رقم الهاتف",
      },
      about: {
        who: "من",
        weAre: "نحن",
        blanco: "بلانكو",
        is: "هي شركة تنظيف محترفة مقرها دمشق، سوريا، متخصصة ",
        b2b: "من شركة إلى شركة",
        cleaning:
          "في خدمات التنظيف للمكاتب، والمتاجر، والمطاعم، والمدارس، والجامعات، والمراكز الصحية، والمباني الحكومية.",
        ourSpecializations: "تخصصاتنا",
        ourMission: "مهمتنا",
        missionText:
          "تقديم خدمات تنظيف موثوقة واحترافية تساعد الشركات والمؤسسات في الحفاظ على بيئة نظيفة وآمنة ومرحبة، كل يوم.",
        ourVision: "رؤيتنا",
        visionText:
          "أن نصبح الاسم الرائد في سوريا في خدمات التنظيف الاحترافية، مع ترسيخ معيار للجودة والاتساق، والتوسع في جميع المدن لنكون الوجهة الأولى لحلول النظافة.",
      },
      specializations: {
        building: "المكاتب والمباني الإدارية",
        buildingDescription:
          "نقدّم خدمات تنظيف شاملة للحفاظ على بيئة عمل نظيفة، احترافية، ومنتجة.",
        school: "المدارس والجامعات",
        schoolDescription:
          "نوفّر بيئة تعليمية آمنة وصحية من خلال خدمات التنظيف الدورية والعميقة.",
        hospital: "المراكز الصحية",
        hospitalDescription:
          "حلول تنظيف متخصصة تلبي معايير الصحة والسلامة لحماية الموظفين والمرضى.",
        shop: "المتاجر والمطاعم",
        shopDescription: "نضمن أن تكون مساحتك نظيفة ومرحبة بالعملاء والموظفين.",
        government: "المباني الحكومية",
        governmentDescription:
          "خدمات تنظيف موثوقة مصممة لتلبية احتياجات المرافق العامة.",
        house: "تنظيف المنازل",
        houseDescription:
          "نجعل منزلك متألقًا بخطط تنظيف مخصصة تناسب أسلوب حياتك.",
      },
      work: {
        our: "معرض",
        work: "أعمال",
        gallery: "فريقنا",
        description: "شاهد الفرق — صور ومقاطع قبل وبعد",
        all: "جميع الاعمال",
        beforeAfter: "قبل وبعد",
        video: "فيديو",
        before: "قبل",
        after: "بعد",
      },

      footer: {
        make: "خليّها تلمع",
        cleaning: "شركة خدمات تنظيف",
        useful: "روابط مفيدة",
        find: "يمكنك العثور علينا",
        email: "Blanco@gmail.com",
        service: "الخدمات",
        about: "من نحن",
        contact: "اتصل بنا",
      },
      aboutBlanco: {
        about: "حول",
        blanco: "بلانكو",
        mission: "مهمتنا",
        missionText:
          "تقديم خدمات تنظيف موثوقة واحترافية تساعد الشركات والمؤسسات على الحفاظ يومياً على بيئة نظيفة وآمنة ومرحبة.",
        values: "قيمنا",
        valuesText:
          "1. النزاهة – نفعل ما هو صواب حتى عندما لا يرانا أحد.\n2. الشفافية – تواصل واضح وخدمة صادقة في كل خطوة.\n3. المصداقية – ثقة تُكتسب من خلال الأداء الموثوق والمتسق.\n4. الجودة – التميز ليس فعلاً مؤقتاً، بل عادتنا الدائمة.\n5. المساءلة – نتحمل المسؤولية الكاملة عن عملنا.\n6. التركيز على العميل – احتياجاتكم تشكل حلولنا.",
        vision: "رؤيتنا",
        visionText:
          "أن تصبح بلانكو الاسم الرائد في سوريا في مجال خدمات التنظيف الاحترافية، وأن تضع معايير للجودة والاتساق.\nالتوسع في جميع المدن لتكون المرجع الأول لحلول النظافة.\nخلال العقد القادم، ستصبح بلانكو مزوداً وطنياً رائداً لحلول النظافة عبر التوسع في المواد والأدوات والابتكارات التي تعيد تعريف كيفية إدارة المؤسسات السورية للنظافة.",
      },
    },
  },
};

const startLang = localStorage.getItem("lang") || "en";
i18n.use(initReactI18next).init({
  resources,
  lng: startLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
