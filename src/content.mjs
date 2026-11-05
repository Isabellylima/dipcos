// =====================================================================
//  DIPCOS ENERGY — conteúdo do site (EN + PT)
//  Edite os textos aqui e corra `node build.mjs` para regenerar /public
// =====================================================================

export const SITE = {
  name: "Dipcos Energy",
  url: "https://www.dipcos.pt", // domínio canónico (usado em canonical, sitemap, dados estruturados)
  email: "info@dipcos.net",
  phone: "+351 289 703 453",
  phoneHref: "+351289703453",
  address: {
    street: "Rua Bartolomeu Constantino, lote 6 R/C Dir.",
    postalCode: "8700-256",
    city: "Olhão",
    region: "Faro",
    country: "PT",
  },
  geo: { lat: 37.0286, lng: -7.8411 },
  // Adicione aqui os perfis oficiais (LinkedIn, Instagram...). Aparecem no rodapé
  // e no "sameAs" dos dados estruturados — importante para Google e IAs ligarem a marca.
  social: [
    // { name: "LinkedIn", url: "https://www.linkedin.com/company/..." },
    // { name: "Instagram", url: "https://www.instagram.com/..." },
  ],
  elfsightApp: "elfsight-app-60c128fd-4573-4d6f-8841-e812ea848a9a",
};

// Imagens atuais do site (alojadas no Squarespace).
// Para independência total do Squarespace, guarde-as em static/assets/img/ e troque os URLs.
const CDN = "https://images.squarespace-cdn.com/content/v1/697e1e2b51c5ce0813b6de98/";
const img = (p, w = 1500) => `${CDN}${p}?format=${w}w`;
export const IMG = {
  hero: img("98305e40-13a9-468d-8ef0-d0faf275d93d/Design+sem+nome+%281%29.png", 2500),
  services: img("6519e637-cd92-46c5-a9e0-9e6e4701482a/Design+sem+nome+%282%29.png"),
  cta: img("bf4bf5ce-b808-4460-a3f5-c2c83efdaee1/5.png", 2500),
  about1: img("a6f636af-71ae-442c-be20-3ddd34308c25/2.png"),
  about2: img("16dd72b7-1c03-44e2-9027-7e263a564ccb/6.png"),
  install: img("430ea0da-d311-4cd4-876c-c2e0ca264d0b/DSC_6015.png", 2500),
  kit1: img("abde19cb-ae9e-4a4d-9ba2-d24a3c47e1ab/kit+1.png", 1000),
  kit2: img("9ed3a335-e81b-4e56-98e8-a527b35b3107/kit+2.png", 1000),
};

// ---------------------------------------------------------------------
//  Textos de interface + páginas
// ---------------------------------------------------------------------
export const T = {
  en: {
    htmlLang: "en",
    ogLocale: "en_GB",
    paths: { home: "/", services: "/services", about: "/about", blog: "/blog/", shop: "/shop", contact: "/contact", terms: "/terms" },
    nav: { services: "Solutions", about: "About", blog: "Insights", shop: "Shop", contact: "Contact", cta: "Book a free call", menu: "Menu", skip: "Skip to content" },
    langLabel: "Português",
    footer: {
      tagline: "Modular, intelligent energy storage for homes, businesses and critical infrastructure.",
      explore: "Explore", contact: "Contact", legal: "Terms & Conditions",
      rights: "All rights reserved.",
    },
    home: {
      title: "Dipcos Energy — Intelligent Energy Storage in Portugal & Europe",
      description: "Dipcos Energy designs modular, scalable LFP battery storage systems with intelligent energy management for homes, businesses and industry. Based in Olhão, Portugal, serving Europe.",
      heroEyebrow: "Energy storage · Portugal & Europe",
      heroTitle: ["Your energy", "shouldn’t", "depend on the grid."],
      heroLead: "It depends on you. Dipcos designs modular, intelligent energy storage systems that keep homes and businesses running — with predictable costs and real control.",
      heroCta: "Book a free consultation", heroCta2: "See solutions",
      claims: ["Modular LFP storage", "Scalable from 0 to 500+ kW", "Intelligent energy management"],
      introEyebrow: "What we do",
      introTitle: "Energy solutions designed around real needs.",
      introBody: "Dipcos delivers scalable and intelligent energy storage solutions, tailored to different consumption profiles — from residential and small commercial systems to high-power industrial installations. Every solution is designed to ensure energy security, efficiency and long-term economic return, without unnecessary complexity.",
      scaleEyebrow: "One platform, three scales",
      scaleTitle: "Storage that grows with your demand.",
      problemEyebrow: "Why storage",
      problemTitle: "Security is not a luxury. It’s a necessity.",
      problems: [
        ["Rising energy costs", "Store energy when it is cheaper or self-produced and use it when grid prices peak."],
        ["Outages and instability", "Keep critical loads running during grid failures, without interrupting operations."],
        ["Lack of control", "Intelligent management shows where energy goes and optimises consumption automatically."],
      ],
      processEyebrow: "How we work",
      processTitle: "From analysis to long-term monitoring.",
      process: [
        ["Consumption analysis", "We study your consumption profile, operational requirements and expectations."],
        ["Technical sizing", "We size and configure the system — capacity, inverter and battery compatibility."],
        ["Installation coordination", "We guide and coordinate with qualified, certified installers."],
        ["Monitoring & support", "Intelligent monitoring and ongoing technical support for the life of the system."],
      ],
      aboutEyebrow: "About Dipcos",
      aboutTitle: "Over 30 years of experience in energy efficiency and intelligent power.",
      aboutBody: "Dipcos began in the early 1990s as a distributed power control system for boats and caravans — with multi-point control, real-time monitoring and fault detection long before they were standard. Today it brings that engineering vision to modern energy storage.",
      aboutCta: "Our story",
      faqEyebrow: "FAQ",
      faqTitle: "Frequently asked questions",
      ctaTitle: "Let’s analyse your energy needs together.",
      ctaBody: "Every project starts with understanding. Schedule a free consultation with our specialists and we will design the most efficient, scalable solution for your situation.",
      blogEyebrow: "Insights",
      blogTitle: "Latest from Dipcos",
      blogAll: "All articles",
    },
    tiers: [
      {
        id: "residential", range: "0–50 kW",
        name: "Residential & Small Commercial",
        lead: "For homes and small businesses seeking independence and stability.",
        body: "Energy storage and intelligent control for homes, shops, offices and restaurants — reducing energy costs, protecting against outages and increasing self-consumption.",
        benefits: ["Energy security during outages", "Lower electricity bills", "Smart energy storage", "Scalable modular system", "Ready for solar integration and EV charging"],
        apps: "Homes, retail stores, small offices, cafés, service businesses.",
        image: "kit1",
      },
      {
        id: "commercial", range: "50–500 kW",
        name: "Commercial, Hospitality & Mid-Scale Industry",
        lead: "For operations that cannot afford downtime.",
        body: "Designed for hotels, commercial buildings and medium-scale industrial facilities — ensuring operational continuity, cost control and energy reliability in higher-consumption environments.",
        benefits: ["Business continuity and backup power", "Optimised energy costs", "Modular expansion as demand grows", "Smart load management", "Increased operational resilience"],
        apps: "Hotels, warehouses, commercial buildings, medium industrial facilities.",
        image: "kit2",
      },
      {
        id: "industrial", range: "500+ kW",
        name: "High-Power & Industrial",
        lead: "For critical infrastructure and large-scale energy demand.",
        body: "For large industries and critical operations requiring extended autonomy, high storage capacity and advanced energy management — including energy storage for solar farms.",
        benefits: ["High-capacity energy storage", "Multi-day autonomy options", "Advanced system scalability", "AI-driven energy optimisation", "Designed for mission-critical operations"],
        apps: "Large industries, logistics hubs, manufacturing plants, solar farms, critical infrastructure.",
        image: "kit2",
      },
    ],
    tierLabels: { benefits: "Key benefits", apps: "Typical applications", more: "Learn more" },
    faq: [
      ["What does Dipcos Energy do?", "Dipcos Energy designs and supplies modular, scalable energy storage systems — LFP batteries, hybrid inverters and intelligent energy management — for homes, businesses, industry and critical infrastructure in Portugal and across Europe."],
      ["Is Dipcos a solar panel company?", "No. Dipcos specialises in energy storage and intelligent management. Our systems integrate with solar panels, the grid and EV charging, but our focus is storing and controlling energy."],
      ["Does energy independence mean disconnecting from the grid?", "Not necessarily. For most clients it means reducing dependency and gaining control: storing energy for later, using it when grid prices peak and protecting operations during outages."],
      ["What battery technology do you use?", "Our modular solutions are based on LFP (lithium iron phosphate) battery technology, combined with hybrid inverters that manage solar, battery and grid in a single system."],
      ["Does Dipcos install the systems?", "Dipcos does not perform installation directly unless agreed in writing. We provide technical guidance, verify compatibility, recommend qualified certified installers and coordinate the process."],
      ["How do I know which system size I need?", "Book a free consultation. We analyse your consumption, operational requirements and goals, then size the system — from 0–50 kW residential setups to 500+ kW industrial installations."],
      ["Where does Dipcos operate?", "Dipcos is based in Olhão, in the Algarve, Portugal, and serves clients in Portugal and across Europe."],
    ],
    services: {
      title: "Energy Storage Solutions — Residential, Commercial & Industrial | Dipcos Energy",
      description: "Modular LFP energy storage from 0–50 kW for homes, 50–500 kW for hotels and businesses, and 500+ kW for industry and critical infrastructure. Free consultation.",
      eyebrow: "Solutions", h1: "Energy storage for every scale.",
      lead: "Modular, scalable and intelligent energy storage solutions, tailored to different consumption profiles — designed to ensure energy security, efficiency and long-term economic return, without unnecessary complexity.",
      servicesTitle: "Services that support every system",
      servicesList: [
        ["Consumption analysis", "Understanding your real load profile before anything is sized."],
        ["Technical sizing", "Capacity, voltage, inverter and battery compatibility verified."],
        ["AI integration", "Intelligent decision-making for when to store, use or draw energy."],
        ["Monitoring & support", "Long-term monitoring and technical guidance."],
      ],
    },
    about: {
      title: "About Dipcos Energy — Engineering Intelligent Energy Since the 1990s",
      description: "Dipcos Energy is a technology-driven company from Olhão, Portugal, with over 30 years of experience in energy efficiency and intelligent power solutions.",
      eyebrow: "About us", h1: "Energy designed for independence, efficiency and security.",
      p1: "Dipcos Energy is a technology-driven company with over 30 years of experience in energy efficiency and intelligent power solutions. We develop modular, scalable energy storage systems designed to adapt to real needs — from residential applications to complex industrial environments.",
      p2: "Our focus is simple: deliver reliable, efficient and future-ready energy solutions that provide autonomy, cost control and long-term value. No overengineering. No unnecessary complexity. Just energy that works — when you need it most.",
      h2: "Engineering solutions for a changing energy landscape.",
      p3: "As energy systems become more vulnerable and demand continues to grow, Dipcos exists to help homes and businesses take control of their energy. We combine technical expertise, intelligent design and advanced storage technology to create solutions that ensure continuity, resilience and sustainability.",
      p4: "From initial analysis to long-term monitoring, every Dipcos system is designed with one goal in mind: energy that adapts to you — not the other way around.",
      timelineTitle: "Our story",
      timeline: [
        ["Early 1990s", "Dipcos is created as a distributed power control system for boats and caravans, with multi-point control, real-time monitoring and fault detection over a low-cost optical fibre network."],
        ["The years between", "Founder JP Ajami builds Global Fire Equipment, founded in Denmark and later established in Portugal — later acquired by a group under Halma PLC."],
        ["Today", "Dipcos returns, focused on energy storage, control and system intelligence for homes, businesses and industry."],
      ],
      missionTitle: "Mission", mission: "To develop modular, intelligent and accessible energy systems that provide autonomy, efficiency and security.",
      visionTitle: "Vision", vision: "To be a European reference in scalable, reliable and sustainable energy storage solutions.",
      valuesTitle: "Values", values: ["Energy security", "Engineering with purpose", "Clarity and transparency", "Real efficiency", "Responsible sustainability"],
    },
    contact: {
      title: "Contact Dipcos Energy — Book a Free Energy Consultation",
      description: "Tell us about your residential, commercial or industrial energy project. Call +351 289 703 453 or email info@dipcos.net. Dipcos Energy, Olhão, Portugal.",
      eyebrow: "Contact", h1: "Tell us about your project. We’re here to help.",
      lead: "Whether you’re planning a residential system, a commercial installation or an industrial solution, our team is ready to support you. Share your project with us and let’s find the right energy solution together.",
      form: { name: "Name", email: "Email", phone: "Phone (optional)", type: "Project type", types: ["Residential (0–50 kW)", "Commercial / Hospitality (50–500 kW)", "Industrial (500+ kW)", "Not sure yet"], message: "Tell us about your project", send: "Send message", note: "Sending opens your email app with the message ready to go.", subject: "Project enquiry — website" },
      phoneL: "Phone", emailL: "Email", addressL: "Address",
    },
    shop: {
      title: "Shop — LFP Batteries & Hybrid Inverters | Dipcos Energy",
      description: "Professional-grade energy storage and hybrid inverter solutions for residential and commercial applications. Talk to our team about compatibility before you buy.",
      eyebrow: "Shop", h1: "Build your energy independence.",
      lead: "Professional-grade storage and hybrid inverter solutions for residential and commercial applications.",
      helpTitle: "Need help choosing the right solution?",
      help: "If you have any questions about our products, compatibility or installation, our team is available to guide you and help you make the right decision.",
    },
    blog: {
      title: "Insights — Energy Storage, Hybrid Inverters & Energy Independence | Dipcos Energy",
      description: "Articles from Dipcos Energy on energy storage, hybrid inverters, energy independence in Europe and the future of intelligent energy systems.",
      eyebrow: "Insights", h1: "Energy, explained clearly.",
      lead: "Technical clarity on storage, inverters and energy independence — without the hype.",
      read: "Read article", back: "All articles", min: "min read", notice: "",
    },
    terms: { title: "Terms & Conditions | Dipcos Energy", description: "Terms and conditions for the use of the Dipcos Energy website and the purchase of products.", h1: "Terms & Conditions" },
    notFound: { title: "Page not found | Dipcos Energy", h1: "Page not found.", body: "The page you are looking for may have moved. Let’s get you back on track.", cta: "Back to home" },
  },

  pt: {
    htmlLang: "pt-PT",
    ogLocale: "pt_PT",
    paths: { home: "/pt/", services: "/pt/solucoes", about: "/pt/sobre", blog: "/pt/artigos", shop: "/pt/loja", contact: "/pt/contacto", terms: "/terms" },
    nav: { services: "Soluções", about: "Sobre", blog: "Artigos", shop: "Loja", contact: "Contacto", cta: "Marcar chamada gratuita", menu: "Menu", skip: "Saltar para o conteúdo" },
    langLabel: "English",
    footer: {
      tagline: "Armazenamento de energia modular e inteligente para casas, empresas e infraestruturas críticas.",
      explore: "Explorar", contact: "Contacto", legal: "Termos e Condições (EN)",
      rights: "Todos os direitos reservados.",
    },
    home: {
      title: "Dipcos Energy — Armazenamento Inteligente de Energia em Portugal",
      description: "A Dipcos Energy desenvolve sistemas modulares e escaláveis de armazenamento de energia com baterias LFP e gestão inteligente para casas, empresas e indústria. Olhão, Algarve.",
      heroEyebrow: "Armazenamento de energia · Portugal e Europa",
      heroTitle: ["A energia da sua casa", "não deve", "depender da rede."],
      heroLead: "Depende de si. A Dipcos desenvolve sistemas modulares e inteligentes de armazenamento de energia que mantêm casas e empresas a funcionar — com custos previsíveis e controlo real.",
      heroCta: "Marcar consulta gratuita", heroCta2: "Ver soluções",
      claims: ["Armazenamento modular LFP", "Escalável de 0 a 500+ kW", "Gestão inteligente de energia"],
      introEyebrow: "O que fazemos",
      introTitle: "Soluções de energia pensadas para necessidades reais.",
      introBody: "A Dipcos fornece soluções escaláveis e inteligentes de armazenamento de energia, adaptadas a diferentes perfis de consumo — de sistemas residenciais e pequenos comércios a instalações industriais de alta potência. Cada solução é desenhada para garantir segurança energética, eficiência e retorno económico a longo prazo, sem complexidade desnecessária.",
      scaleEyebrow: "Uma plataforma, três escalas",
      scaleTitle: "Armazenamento que cresce com o seu consumo.",
      problemEyebrow: "Porquê armazenar",
      problemTitle: "Segurança não é um luxo. É uma necessidade.",
      problems: [
        ["Custos de energia elevados", "Armazene energia quando é mais barata ou produzida por si e use-a nos picos de preço da rede."],
        ["Falhas e instabilidade", "Mantenha as cargas críticas a funcionar durante falhas da rede, sem interromper a operação."],
        ["Falta de controlo", "A gestão inteligente mostra para onde vai a energia e otimiza o consumo automaticamente."],
      ],
      processEyebrow: "Como trabalhamos",
      processTitle: "Da análise à monitorização contínua.",
      process: [
        ["Análise de consumo", "Estudamos o seu perfil de consumo, requisitos operacionais e expectativas."],
        ["Dimensionamento técnico", "Dimensionamos e configuramos o sistema — capacidade e compatibilidade de inversor e baterias."],
        ["Coordenação da instalação", "Orientamos e coordenamos com instaladores qualificados e certificados."],
        ["Monitorização e suporte", "Monitorização inteligente e apoio técnico ao longo da vida do sistema."],
      ],
      aboutEyebrow: "Sobre a Dipcos",
      aboutTitle: "Mais de 30 anos de experiência em eficiência energética e energia inteligente.",
      aboutBody: "A Dipcos nasceu no início dos anos 90 como um sistema distribuído de controlo de energia para barcos e caravanas — com controlo multiponto, monitorização em tempo real e deteção de falhas muito antes de serem padrão. Hoje leva essa visão de engenharia ao armazenamento de energia moderno.",
      aboutCta: "A nossa história",
      faqEyebrow: "FAQ",
      faqTitle: "Perguntas frequentes",
      ctaTitle: "Vamos analisar juntos as suas necessidades energéticas.",
      ctaBody: "Cada projeto começa por compreender. Marque uma consulta gratuita com os nossos especialistas e desenhamos a solução mais eficiente e escalável para a sua situação.",
      blogEyebrow: "Artigos",
      blogTitle: "Novidades da Dipcos",
      blogAll: "Todos os artigos",
    },
    tiers: [
      {
        id: "residencial", range: "0–50 kW",
        name: "Residencial e Pequeno Comércio",
        lead: "Para casas e pequenos negócios que procuram independência e estabilidade.",
        body: "Armazenamento de energia e controlo inteligente para casas, lojas, escritórios e restaurantes — reduzindo custos de energia, protegendo contra falhas e aumentando o autoconsumo.",
        benefits: ["Segurança energética durante falhas", "Faturas de eletricidade mais baixas", "Armazenamento inteligente", "Sistema modular escalável", "Preparado para solar e carregamento de veículos elétricos"],
        apps: "Moradias, lojas, pequenos escritórios, cafés, empresas de serviços.",
        image: "kit1",
      },
      {
        id: "comercial", range: "50–500 kW",
        name: "Comercial, Hotelaria e Média Indústria",
        lead: "Para operações que não podem parar.",
        body: "Pensado para hotéis, edifícios comerciais e unidades industriais de média dimensão — garante continuidade operacional, controlo de custos e fiabilidade energética em ambientes de maior consumo.",
        benefits: ["Continuidade do negócio e energia de reserva", "Custos de energia otimizados", "Expansão modular à medida da procura", "Gestão inteligente de cargas", "Maior resiliência operacional"],
        apps: "Hotéis, armazéns, edifícios comerciais, unidades industriais médias.",
        image: "kit2",
      },
      {
        id: "industrial", range: "500+ kW",
        name: "Alta Potência e Industrial",
        lead: "Para infraestruturas críticas e grandes necessidades energéticas.",
        body: "Para grandes indústrias e operações críticas que exigem autonomia prolongada, elevada capacidade de armazenamento e gestão avançada de energia — incluindo armazenamento para parques solares.",
        benefits: ["Armazenamento de alta capacidade", "Opções de autonomia de vários dias", "Escalabilidade avançada", "Otimização energética com IA", "Desenhado para operações críticas"],
        apps: "Grandes indústrias, centros logísticos, fábricas, parques solares, infraestruturas críticas.",
        image: "kit2",
      },
    ],
    tierLabels: { benefits: "Principais benefícios", apps: "Aplicações típicas", more: "Saber mais" },
    faq: [
      ["O que faz a Dipcos Energy?", "A Dipcos Energy desenvolve e fornece sistemas modulares e escaláveis de armazenamento de energia — baterias LFP, inversores híbridos e gestão inteligente de energia — para casas, empresas, indústria e infraestruturas críticas em Portugal e na Europa."],
      ["A Dipcos é uma empresa de painéis solares?", "Não. A Dipcos é especialista em armazenamento e gestão inteligente de energia. Os nossos sistemas integram-se com painéis solares, a rede e carregamento de veículos elétricos, mas o nosso foco é armazenar e controlar a energia."],
      ["Independência energética significa desligar da rede?", "Não necessariamente. Para a maioria dos clientes significa reduzir a dependência e ganhar controlo: guardar energia para mais tarde, usá-la nos picos de preço e proteger a operação durante falhas."],
      ["Que tecnologia de baterias utilizam?", "As nossas soluções modulares baseiam-se em baterias LFP (fosfato de ferro-lítio), combinadas com inversores híbridos que gerem solar, bateria e rede num único sistema."],
      ["A Dipcos faz a instalação?", "A Dipcos não realiza instalações diretamente, salvo acordo escrito. Damos orientação técnica, verificamos a compatibilidade, recomendamos instaladores qualificados e certificados e coordenamos o processo."],
      ["Como sei que dimensão de sistema preciso?", "Marque uma consulta gratuita. Analisamos o seu consumo, requisitos operacionais e objetivos e dimensionamos o sistema — de 0–50 kW residencial a instalações industriais de 500+ kW."],
      ["Onde atua a Dipcos?", "A Dipcos está sediada em Olhão, no Algarve, e serve clientes em Portugal e em toda a Europa."],
    ],
    services: {
      title: "Soluções de Armazenamento de Energia — Residencial, Comercial e Industrial | Dipcos",
      description: "Armazenamento modular LFP de 0–50 kW para casas, 50–500 kW para hotéis e empresas e 500+ kW para indústria e infraestruturas críticas. Consulta gratuita.",
      eyebrow: "Soluções", h1: "Armazenamento de energia para todas as escalas.",
      lead: "Soluções modulares, escaláveis e inteligentes de armazenamento de energia, adaptadas a diferentes perfis de consumo — para garantir segurança energética, eficiência e retorno a longo prazo, sem complexidade desnecessária.",
      servicesTitle: "Serviços que acompanham cada sistema",
      servicesList: [
        ["Análise de consumo", "Conhecer o seu perfil de carga real antes de dimensionar."],
        ["Dimensionamento técnico", "Capacidade, tensão e compatibilidade de inversor e baterias verificadas."],
        ["Integração com IA", "Decisões inteligentes sobre quando armazenar, usar ou consumir da rede."],
        ["Monitorização e suporte", "Monitorização contínua e orientação técnica."],
      ],
    },
    about: {
      title: "Sobre a Dipcos Energy — Engenharia de Energia Inteligente desde os anos 90",
      description: "A Dipcos Energy é uma empresa tecnológica de Olhão com mais de 30 anos de experiência em eficiência energética e soluções inteligentes de energia.",
      eyebrow: "Sobre nós", h1: "Energia pensada para independência, eficiência e segurança.",
      p1: "A Dipcos Energy é uma empresa tecnológica com mais de 30 anos de experiência em eficiência energética e soluções inteligentes de energia. Desenvolvemos sistemas de armazenamento modulares e escaláveis, pensados para se adaptarem a necessidades reais — de aplicações residenciais a ambientes industriais complexos.",
      p2: "O nosso foco é simples: fornecer soluções de energia fiáveis, eficientes e preparadas para o futuro, que garantam autonomia, controlo de custos e valor a longo prazo. Sem sobre-engenharia. Sem complexidade desnecessária. Apenas energia que funciona — quando mais precisa.",
      h2: "Engenharia para um panorama energético em mudança.",
      p3: "À medida que os sistemas energéticos se tornam mais vulneráveis e a procura continua a crescer, a Dipcos existe para ajudar casas e empresas a assumir o controlo da sua energia. Combinamos conhecimento técnico, design inteligente e tecnologia de armazenamento avançada para criar soluções que garantem continuidade, resiliência e sustentabilidade.",
      p4: "Da análise inicial à monitorização a longo prazo, cada sistema Dipcos tem um objetivo: energia que se adapta a si — e não o contrário.",
      timelineTitle: "A nossa história",
      timeline: [
        ["Início dos anos 90", "A Dipcos nasce como sistema distribuído de controlo de energia para barcos e caravanas, com controlo multiponto, monitorização em tempo real e deteção de falhas sobre uma rede de fibra ótica de baixo custo."],
        ["Os anos seguintes", "O fundador, JP Ajami, constrói a Global Fire Equipment, fundada na Dinamarca e depois estabelecida em Portugal — mais tarde adquirida por um grupo da Halma PLC."],
        ["Hoje", "A Dipcos regressa, focada em armazenamento, controlo e inteligência de sistemas para casas, empresas e indústria."],
      ],
      missionTitle: "Missão", mission: "Desenvolver sistemas de energia modulares, inteligentes e acessíveis que ofereçam autonomia, eficiência e segurança.",
      visionTitle: "Visão", vision: "Ser referência europeia em soluções de armazenamento de energia escaláveis, confiáveis e sustentáveis.",
      valuesTitle: "Valores", values: ["Segurança energética", "Engenharia com propósito", "Clareza e transparência", "Eficiência real", "Sustentabilidade responsável"],
    },
    contact: {
      title: "Contacto Dipcos Energy — Marque uma Consulta Energética Gratuita",
      description: "Fale-nos do seu projeto de energia residencial, comercial ou industrial. Ligue +351 289 703 453 ou escreva para info@dipcos.net. Dipcos Energy, Olhão.",
      eyebrow: "Contacto", h1: "Fale-nos do seu projeto. Estamos aqui para ajudar.",
      lead: "Quer esteja a planear um sistema residencial, uma instalação comercial ou uma solução industrial, a nossa equipa está pronta para apoiar. Partilhe o seu projeto e encontramos juntos a solução certa.",
      form: { name: "Nome", email: "Email", phone: "Telefone (opcional)", type: "Tipo de projeto", types: ["Residencial (0–50 kW)", "Comercial / Hotelaria (50–500 kW)", "Industrial (500+ kW)", "Ainda não sei"], message: "Fale-nos do seu projeto", send: "Enviar mensagem", note: "Ao enviar, abre a sua app de email com a mensagem pronta.", subject: "Pedido de contacto — website" },
      phoneL: "Telefone", emailL: "Email", addressL: "Morada",
    },
    shop: {
      title: "Loja — Baterias LFP e Inversores Híbridos | Dipcos Energy",
      description: "Soluções profissionais de armazenamento e inversores híbridos para aplicações residenciais e comerciais. Fale com a equipa sobre compatibilidade antes de comprar.",
      eyebrow: "Loja", h1: "Construa a sua independência energética.",
      lead: "Soluções profissionais de armazenamento e inversores híbridos para aplicações residenciais e comerciais.",
      helpTitle: "Precisa de ajuda a escolher?",
      help: "Se tiver dúvidas sobre produtos, compatibilidade ou instalação, a nossa equipa está disponível para o orientar e ajudar a tomar a decisão certa.",
    },
    blog: {
      title: "Artigos — Armazenamento de Energia e Independência Energética | Dipcos Energy",
      description: "Artigos da Dipcos Energy sobre armazenamento de energia, inversores híbridos e independência energética na Europa.",
      eyebrow: "Artigos", h1: "Energia, explicada com clareza.",
      lead: "Clareza técnica sobre armazenamento, inversores e independência energética — sem exageros.",
      read: "Ler artigo", back: "Todos os artigos", min: "min de leitura", notice: "Artigos disponíveis em inglês.",
    },
    terms: { title: "Termos e Condições | Dipcos Energy", description: "", h1: "Termos e Condições" },
    notFound: { title: "Página não encontrada | Dipcos Energy", h1: "Página não encontrada.", body: "A página que procura pode ter mudado de endereço.", cta: "Voltar ao início" },
  },
};

// ---------------------------------------------------------------------
//  Artigos (conteúdo original do blog, em inglês)
// ---------------------------------------------------------------------
export const POSTS = [
  {
    slug: "hybrid-inverters-explained-the-core-of-modern-energy-systems",
    title: "Hybrid Inverters Explained: The Core of Modern Energy Systems",
    description: "What a hybrid inverter is, how it manages solar, battery and grid energy, and why it sits at the core of scalable, intelligent energy systems.",
    date: "2026-05-04",
    image: CDN + "4461eb16-9651-4859-86f2-3d4afe49c4ca/POST+1-+1+%283%29.jpg?format=1500w",
    body: `
<p>As energy systems become more advanced, the role of the inverter is evolving. Traditional inverters convert energy — but hybrid inverters manage it.</p>
<h2>What is a hybrid inverter?</h2>
<p>A hybrid inverter is designed to integrate multiple energy sources into a single system:</p>
<ul><li>Solar panels</li><li>Battery storage</li><li>The electrical grid</li></ul>
<p>Instead of simply converting energy, it controls how energy flows within the system.</p>
<h2>How it works</h2>
<p>A hybrid inverter continuously manages energy based on availability and demand. This allows it to:</p>
<ul><li>Store excess solar energy in batteries</li><li>Supply energy when solar production is low</li><li>Draw energy from the grid when necessary</li><li>Optimise consumption automatically</li></ul>
<h2>Why it matters</h2>
<p>Hybrid inverters provide a level of flexibility and control that traditional systems cannot offer. They enable:</p>
<ul><li>Greater energy efficiency</li><li>Reduced reliance on the grid</li><li>Protection against outages</li><li>Smarter energy usage</li></ul>
<h2>A system that adapts</h2>
<p>One of the key advantages of hybrid systems is adaptability. As energy needs grow, storage capacity can be increased and system configurations adjusted. This makes hybrid inverters a central component in scalable energy solutions.</p>
<h2>Looking ahead</h2>
<p>The future of energy systems is not just about production — it is about intelligent management. Hybrid inverters are at the core of that transformation.</p>`,
  },
  {
    slug: "why-energy-independence-matters-in-todays-europe",
    title: "Why Energy Independence Matters in Today’s Europe",
    description: "Rising demand, grid pressure and volatile prices are changing Europe’s energy landscape. What energy independence really means — and the role of storage.",
    date: "2026-04-27",
    image: CDN + "06a3e228-6479-4006-9bf2-868126d7d025/POST+1-+1+%282%29.jpg?format=1500w",
    body: `
<p>Energy systems across Europe are under increasing pressure. Rising demand, infrastructure limitations and external dependencies are contributing to higher costs and reduced reliability. In recent years, power disruptions and instability have highlighted the vulnerability of traditional energy models.</p>
<h2>A changing energy landscape</h2>
<p>Historically, energy systems were designed around centralised production and stable distribution. Today, that model is being challenged:</p>
<ul><li>Energy prices are increasingly volatile</li><li>Grid stability is under pressure</li><li>Demand continues to grow</li><li>External factors influence supply</li></ul>
<p>This creates a new reality where dependence on a single energy source becomes a risk.</p>
<h2>What energy independence really means</h2>
<p>Energy independence does not necessarily mean disconnecting from the grid. It means reducing dependency and gaining control. This includes:</p>
<ul><li>Storing energy for later use</li><li>Managing consumption more efficiently</li><li>Protecting operations during outages</li><li>Optimising energy costs over time</li></ul>
<h2>The role of energy storage</h2>
<p>Energy storage is a key component in achieving this independence. By integrating storage systems, it becomes possible to:</p>
<ul><li>Use energy when it is most needed</li><li>Reduce reliance on peak grid pricing</li><li>Maintain continuity during disruptions</li><li>Increase overall system resilience</li></ul>
<h2>Looking forward</h2>
<p>As energy systems continue to evolve, the ability to control and manage energy will become increasingly important. Energy independence is no longer a future concept — it is becoming a practical necessity.</p>
<p>Dipcos Energy develops solutions designed to support this transition, combining modular design with intelligent energy management.</p>`,
  },
  {
    slug: "the-origin-of-dipcos-engineering-vision-ahead-of-its-time",
    title: "The Origin of Dipcos: Engineering Vision Ahead of Its Time",
    description: "How Dipcos began in the early 1990s as a distributed power control system for boats and caravans — and why that vision returns today in energy storage.",
    date: "2026-04-20",
    image: CDN + "f2aaf00c-3244-4326-a142-998dac980f08/POST+1-+1.jpg?format=1500w",
    body: `
<p>Dipcos was first developed in the early 1990s as a distributed power control system designed to monitor and manage electrical loads across mobile environments such as boats and caravans.</p>
<p>At a time when energy management technologies were still limited, Dipcos introduced forward-thinking concepts including multi-point control, real-time monitoring and fault detection — supported by a low-cost optical fibre communication network. These innovations anticipated many of the capabilities that are now considered essential in modern energy systems.</p>
<h2>A vision before its time</h2>
<p>Despite its technological advancement, the market at the time remained conservative and resistant to change. As a result, the system was not widely adopted. However, the core vision — intelligent control and monitoring of distributed energy — remained highly relevant.</p>
<h2>From fire systems to energy systems</h2>
<p>Following this initial project, JP Ajami focused on developing Global Fire Equipment, a company founded in Denmark and later established in Portugal. The company grew into an internationally recognised business and was eventually acquired by a group under Halma PLC.</p>
<p>Rather than stepping away from engineering and innovation, JP returned to one of his original areas of interest: energy.</p>
<h2>The return of Dipcos</h2>
<p>Dipcos today represents the evolution of that original vision. It combines decades of engineering expertise with modern energy challenges — focusing on storage, control and system intelligence.</p>
<p>As energy systems become more complex and decentralised, the need for reliable, scalable and intelligent solutions becomes increasingly critical. Dipcos is built to respond to that need.</p>`,
  },
  {
    slug: "introducing-dipcos-energy-building-the-future-of-intelligent-energy-systems",
    title: "Introducing Dipcos Energy: Building the Future of Intelligent Energy Systems",
    description: "Dipcos Energy delivers modular, intelligent and scalable energy storage solutions designed for real-world applications across Europe and beyond.",
    date: "2026-04-19",
    image: CDN + "22317e68-ffc6-4a65-b713-e79d3c9bd02b/POST+1-+11.png?format=1500w",
    body: `
<p>Energy systems are undergoing a fundamental transformation. Across Europe and beyond, increasing demand, rising costs and infrastructure limitations are reshaping how energy is produced, distributed and consumed.</p>
<p>In this evolving landscape, traditional models are no longer sufficient. Dipcos Energy was created to address this shift — delivering modular, intelligent and scalable energy storage solutions designed for real-world applications.</p>
<h2>A new approach to energy</h2>
<p>Energy today is not just about generation. It is about control, optimisation and resilience. Dipcos systems are designed to:</p>
<ul><li>Improve energy efficiency</li><li>Reduce dependency on the grid</li><li>Support renewable integration</li><li>Ensure continuity during power disruptions</li></ul>
<p>From residential environments to commercial and industrial applications, each solution is built with a focus on adaptability and long-term performance.</p>
<h2>Designed for real-world needs</h2>
<p>Modern energy challenges require flexible systems. That is why Dipcos focuses on modular design — allowing systems to scale according to consumption needs, without unnecessary complexity or overengineering.</p>
<h2>Looking ahead</h2>
<p>The future of energy will not be defined by generation alone. It will be defined by the ability to store, manage and control energy intelligently. At Dipcos, we are building solutions that respond to that future — today.</p>`,
  },
  {
    slug: "driving-energy-resilience-beyond-borders",
    title: "Driving Energy Resilience Beyond Borders",
    description: "Dipcos Energy at The Solar and Storage Live Africa: why energy storage is becoming a strategic necessity for grid stability and renewable integration.",
    date: "2026-03-30",
    image: CDN + "4e9f31f2-efd5-4402-b02f-954325341a9c/4.png?format=1500w",
    gallery: [
      CDN + "1774864777487-ANE4I49TH8J6983DPVN4/1.png?format=1000w",
      CDN + "1774864776038-0W4N96T21OAAL87OXGKH/2.png?format=1000w",
      CDN + "1774864790555-S8EHQAXQ0ZPZ2FQV4JLY/3.png?format=1000w",
    ],
    body: `
<p>At the end of last week, Dipcos Energy was present at The Solar and Storage Live Africa, one of the leading events focused on renewable energy, storage and power infrastructure across the African market.</p>
<p>The event highlighted a clear and accelerating trend: energy security is no longer optional — it is a strategic necessity.</p>
<p>Across discussions and technologies showcased, one topic stood out consistently: the growing role of energy storage systems in stabilising grids, supporting renewables integration and ensuring continuity in regions facing increasing energy demand and infrastructure challenges.</p>
<p>Markets like Africa are rapidly adopting decentralised and scalable energy solutions — reinforcing a global shift that is equally relevant across Europe.</p>
<p>At Dipcos, this aligns directly with our mission: to deliver modular, intelligent and reliable energy storage systems that enable real energy independence.</p>
<p>Events like this confirm that the future of energy is not just renewable — it is stable, flexible and storage-driven.</p>`,
  },
];
