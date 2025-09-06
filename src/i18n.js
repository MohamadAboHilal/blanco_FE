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
        title1: "Make It Sparkle",
        title2: "Cleaning Services Company",
        sub: "Transform your space with our Expert Cleaning Team. From homes to offices, we deliver spotless results every time.",
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
        p1: "Find Answers To Common Questions About",
        p2: "Our Cleaning Services.",
      },
      contact: {
        getIn: "Get in",
        touch: "Touch",
        description:
          "Ready to experience professional cleaning services? Contact us today for a free consultation and a customized cleaning plan foryour business.",
        email: "Email",
        name: "Name",
        message: "Your Message",
        send: "Send",
        alert: "Thanks! Your message has been sent.",
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
        offices: "Offices & Corporate Buildings",
        schools: "Schools & Universities",
        healthcare: "Healthcare Centers",
        retail: "Retail Stores & Restaurants",
        government: "Governmental Buildings",
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
      hero: {
        title1: "خلّيها تلمع",
        title2: "شركة خدمات تنظيف",
        sub: "حوّل مساحتك مع فريق التنظيف الخبير. من المنازل إلى المكاتب، نقدّم نتائج مثالية في كل مرة.",
        guarantee: "رضاكم 100% مضمون",
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
        offices: "المكاتب والمباني التجارية",
        schools: "المدارس والجامعات",
        healthcare: "المراكز الصحية",
        retail: "المتاجر والمطاعم",
        government: "المباني الحكومية",
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
