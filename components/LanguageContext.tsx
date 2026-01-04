
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Nav
    'nav.office': 'O Escritório',
    'nav.practice': 'Atuação',
    'nav.experience': 'Exclusividade',
    'nav.differentials': 'Diferenciais',
    'nav.team': 'Equipe',
    'nav.awards': 'Reconhecimentos',
    'nav.contact': 'Contato',
    'nav.intranet': 'Área Restrita',
    'nav.talk': 'Fale Conosco',
    
    // Hero
    'hero.sub': 'Sociedade de Advogados',
    'hero.cta': 'Agende uma Consulta',
    'hero.desc1': 'Localizado estrategicamente no centro das decisões políticas e jurídicas do país.',
    'hero.desc2': 'Soluções jurídicas para um mundo em constante movimento.',
    'hero.desc3': 'Decisões estratégicas para defesa da sua empresa.',
    'hero.title3': 'Marques & Serra', 
    'hero.sub3': 'Sociedade de Advogados',

    // About
    'about.label': 'Quem Somos',
    'about.title': 'Profissionalismo e',
    'about.title_italic': 'Ética',
    'about.p1': 'A Marques & Serra Sociedade de Advogados é um escritório jurídico de alta especialização, estruturado para atender demandas complexas que exigem excelência técnica, visão estratégica e absoluta segurança jurídica.',
    'about.p2': 'O escritório nasce da união de trajetórias profissionais de Pedro Marques e Ronald Serra marcadas por decisões complexas no centro de governo. Por isso, atuamos de forma personalizada e responsável, assessorando clientes públicos e privados em temas sensíveis.',
    'about.p3': 'Formada por profissionais que atuaram diretamente no núcleo decisório do Estado brasileiro, com passagem pela Presidência da República e tribunais superiores, conferindo compreensão profunda das instituições.',
    'about.p4': 'Mais do que prestar serviços jurídicos, oferecemos soluções jurídicas estratégicas, fundamentadas em experiência concreta e credibilidade institucional.',
    'about.exp': 'De Experiência',
    'about.value': 'Em Valor Envolvido',

    // Experience Section
    'experience.label': 'Exclusividade',
    'experience.title': 'Comodidades e',
    'experience.title_italic': 'Exclusividade',
    'experience.parking': 'Estacionamento Privativo',
    'experience.parking_desc': 'Comodidade total na visita à nossa sede com vagas reservadas para clientes.',
    'experience.transport': 'Transporte Executivo',
    'experience.transport_desc': 'Serviço de motorista exclusivo para traslado de clientes de forma segura e discreta.',
    'experience.schedule': 'Horário Agendado',
    'experience.schedule_desc': 'Pontualidade absoluta e dedicação exclusiva da equipe durante seu atendimento.',

    // Practice
    'practice.label': 'Nossa Expertise',
    'practice.title': 'Áreas de Atuação',
    'practice.learn_more': 'Saiba Mais',
    'practice.corp': 'Empresarial',
    'practice.corp_desc': 'Consultoria societária, gestão corporativa, recuperação de ativos, estructuração e crescimento.',
    'practice.lit': 'Contencioso',
    'practice.lit_desc': 'Atuação vigorosa nos Tribunais Superiores (STF, STJ, TCU, TSE, TST).',
    'practice.tax': 'Tributário',
    'practice.tax_desc': 'Planejamento e contencioso tributário estratégico.',
    'practice.energy': 'Energia',
    'practice.energy_desc': 'Regulação ANEEL, Geração, Transmissão e Distribuição.',
    'practice.oil': 'Óleo & Gás',
    'practice.oil_desc': 'Regulação ANP, Upstream, midstream e downstream.',
    'practice.mining': 'Mineração',
    'practice.mining_desc': 'Direito Minerário, ANM e licenciamento.',

    // Differentials
    'diff.label': 'Nossos Diferenciais',
    'diff.title': 'Excelência em Cada Detalhe',
    'diff.tech': 'Atuação Técnica',
    'diff.tech_desc': 'Equipe multidisciplinar com compreensão técnica dos setores.',
    'diff.result': 'Foco em Resultados',
    'diff.result_desc': 'Postura proativa orientada a destravar valor.',
    'diff.boutique': 'Atendimento Boutique',
    'diff.boutique_desc': 'Atenção direta dos sócios seniores.',

    // Team
    'team.label': 'Liderança',
    'team.title': 'Sócios Nominais',
    'team.view_profile': 'Ver Perfil',
    'team.partner': 'Sócio Nominal',
    'team.bio_pedro': 'Advogado com com ampla atuação no núcleo decisório do Poder Executivo federal. Foi Ministro-Chefe da Secretaria-Geral da Presidência da República (2021) e Secretário Especial de Assuntos Jurídicos da Presidência da República (2020–2022), período em que assessorou diretamente o Presidente da República na sanção e veto de leis, edição de decretos presidenciais, coordenação do processo legislativo e análise jurídica de políticas públicas estratégicas.\n\nAtuou de forma central em ações de controle concentrado no Supremo Tribunal Federal, representando a Presidência da República, bem como na condução jurídica de acordos e tratados internacionais, acompanhamento legislativo e atendimento a demandas institucionais do Congresso Nacional, inclusive em CPIs. Exerceu ainda funções de governança como Conselheiro Fiscal da BNDESPAR e do SENAC, acumulando sólida experiência em gestão pública e controle administrativo.\n\nPossui graduação em Direito e especializações em Direito Constitucional, Gestão em Segurança Pública, processo legislativo, técnica legislativa e orçamento público. Seu trabalho é reconhecido por condecorações oficiais, como a Ordem do Mérito Naval (Grande Oficial), a Ordem de Rio Branco (Grande Oficial) e a Medalha do Mérito Alvorada, refletindo sua destacada contribuição ao Estado brasileiro.',
    'team.bio_ronald': 'Advogado com cerca de 20 anos de experiência jurídica, com trajetória consolidada em órgãos de alta complexidade institucional. Atuou por aproximadamente dez anos como Procurador Federal na Advocacia-Geral da União, com passagens pela PFE/INSS, FUNAI, Procuradoria Federal no Mato Grosso do Sul e atuação estratégica em matéria previdenciária, licitações, contratos administrativos e defesa judicial de políticas públicas.\n\nAntes da AGU, exerceu funções no Tribunal Superior do Trabalho e no Tribunal de Justiça do Distrito Federal e Territórios, assessorando Ministros e Magistrados na elaboração de votos, decisões e sentenças, o que lhe conferiu profundo domínio da técnica processual e da atuação jurisdicional de alto nível. Integrou ainda o núcleo estratégico da Presidência da República, como Subchefe Adjunto de Assuntos Institucionais da SAJ/PR (2021–2022), com atuação em controvérsias constitucionais, gestão de crises e articulação institucional de alto impacto.\n\nFoi Procurador Federal junto à CAPES (2023–2024) e, desde 2024, atua como Consultor Legislativo da Câmara dos Deputados, assessorando diretamente parlamentares e órgãos internos em matérias de elevada complexidade normativa e institucional. Graduado em Direito, com pós-graduação em Direito Público.',
    'team.general_title': 'Corpo Jurídico Especializado',
    'team.general_desc': 'Além de seus sócios nominais, a Marques & Serra conta com uma equipe multidisciplinar composta por advogados, consultores e assessores técnicos, todos com sólida formação acadêmica e vasta experiência profissional em suas áreas de atuação.',

    // Awards Section
    'awards.label': 'Reconhecimentos',
    'awards.title': 'Mérito e',
    'awards.title_italic': 'Carreira',
    'awards.intro': 'Concedidos ao sócio Pedro N. Marques',
    'awards.naval.title': 'Ordem do Mérito Naval',
    'awards.naval.date': '20 DE MAIO DE 2019',
    'awards.naval.grade': 'Grau Grande-Oficial',
    'awards.naval.desc': 'Concedida pela Presidência da República, em reconhecimento aos relevantes serviços prestados à Marinha do Brasil.',
    'awards.defense.title': 'Ordem do Mérito da Defesa',
    'awards.defense.date': '17 DE MAYO DE 2019',
    'awards.defense.grade': 'Grau Comendador',
    'awards.defense.desc': 'Outorgada pelo Ministério da Defesa, pelos serviços relevantes prestados ao Ministério da Defesa e às Forças Armadas.',
    'awards.rio_branco.title': 'Ordem de Rio Branco',
    'awards.rio_branco.date': '30 DE ABRIL DE 2019',
    'awards.rio_branco.grade': 'Grau Grande-Oficial',
    'awards.rio_branco.desc': 'Concedida pelo Ministério das Relações Exteriores, por méritos excepcionais no exercício de funções públicas de interesse nacional.',
    'awards.forces.title': 'Medalha Mérito Estado-Maior Conjunto das Forças Armadas',
    'awards.forces.date': '17 DE NOVEMBRO DE 2021',
    'awards.forces.desc': 'Concedida pelo Estado-Maior Conjunto das Forças Armadas, por contribuição institucional relevante.',
    'awards.maua.title': 'Medalha do Mérito Mauá',
    'awards.maua.date': '6 DE SETEMBRO DE 2021',
    'awards.maua.grade': 'Categoria Serviços Relevantes',
    'awards.maua.desc': 'Outorgada pelo Ministério da Infraestrutura, em reconhecimento a contribuições relevantes para políticas públicas.',

    // Contact
    'contact.label': 'Contato',
    'contact.title1': 'Inicie uma',
    'contact.title2': 'Parceria Estratégica',
    'contact.desc': 'Entre em contato para agendar uma consulta.',
    'contact.form_name': 'Nome',
    'contact.form_email': 'E-mail',
    'contact.form_subject': 'Assunto',
    'contact.form_msg': 'Mensagem',
    'contact.btn_send': 'Enviar Mensagem',
    'contact.phone': 'Telefone / WhatsApp',
    'footer.rights': 'Todos os direitos reservados.',
  },
  en: {
    // Nav
    'nav.office': 'The Firm',
    'nav.practice': 'Practice Areas',
    'nav.experience': 'Exclusivity',
    'nav.differentials': 'Differentials',
    'nav.team': 'Team',
    'nav.awards': 'Recognitions',
    'nav.contact': 'Contact',
    'nav.intranet': 'Restricted Area',
    'nav.talk': 'Talk to Us',

    // Hero
    'hero.sub': 'Law Firm',
    'hero.cta': 'Schedule a Consultation',
    'hero.desc1': 'Strategically located at the center of the country\'s political and legal decisions.',
    'hero.desc2': 'Legal solutions for a world in constant motion.',
    'hero.desc3': 'Strategic decisions to defend your company.',
    'hero.title3': 'Marques & Serra', 
    'hero.sub3': 'Law Firm',

    // About
    'about.label': 'Who We Are',
    'about.title': 'Professionalism and',
    'about.title_italic': 'Ethics',
    'about.p1': 'Marques & Serra Law Firm is a highly specialized legal boutique, structured to handle complex demands requiring technical excellence and strategic vision.',
    'about.p2': 'The firm stems from professional trajectories marked by complex decisions at the center of government.',
    'about.p3': 'Formed by professionals who acted directly in the decision-making core of the Brazilian State.',
    'about.p4': 'More than providing legal services, we offer strategic legal solutions based on concrete experience.',
    'about.exp': 'Years of Experience',
    'about.value': 'In Value Involved',

    // Experience Section
    'experience.label': 'Exclusivity',
    'experience.title': 'Amenities and',
    'experience.title_italic': 'Exclusivity',
    'experience.parking': 'Private Parking',
    'experience.parking_desc': 'Total convenience during your visit with reserved spaces.',
    'experience.transport': 'Executive Transport',
    'experience.transport_desc': 'Exclusive chauffeur service for safe and discreet transfers.',
    'experience.schedule': 'Scheduled Time',
    'experience.schedule_desc': 'Absolute punctuality and exclusive dedication during your appointment.',

    // Practice
    'practice.label': 'Our Expertise',
    'practice.title': 'Practice Areas',
    'practice.learn_more': 'Learn More',
    'practice.corp': 'Corporate',
    'practice.corp_desc': 'Corporate consulting, management, asset recovery, and structuring.',
    'practice.lit': 'Litigation',
    'practice.lit_desc': 'Vigorous action in Superior Courts (STF, STJ, TCU, TSE, TST).',
    'practice.tax': 'Tax',
    'practice.tax_desc': 'Strategic tax planning and litigation.',
    'practice.energy': 'Energy',
    'practice.energy_desc': 'ANEEL Regulation, Generation, Transmission, and Distribution.',
    'practice.oil': 'Oil & Gas',
    'practice.oil_desc': 'ANP Regulation, Upstream, midstream, and downstream.',
    'practice.mining': 'Mining',
    'practice.mining_desc': 'Mining Law, ANM, and licensing.',

    // Differentials
    'diff.label': 'Our Differentials',
    'diff.title': 'Excellence in Every Detail',
    'diff.tech': 'Technical Expertise',
    'diff.tech_desc': 'Multidisciplinary team with technical understanding of sectors.',
    'diff.result': 'Results Oriented',
    'diff.result_desc': 'Proactive stance oriented towards unlocking value.',
    'diff.boutique': 'Boutique Service',
    'diff.boutique_desc': 'Direct attention from senior partners.',

    // Team
    'team.label': 'Leadership',
    'team.title': 'Name Partners', 
    'team.view_profile': 'View Profile',
    'team.partner': 'Name Partner',
    'team.bio_pedro': 'Lawyer with extensive experience in the Federal Executive Branch. Former Chief Minister of the General Secretariat of the Presidency.',
    'team.bio_ronald': 'Lawyer with 20 years of experience. Former Federal Prosecutor at the AGU.',
    'team.general_title': 'Specialized Legal Staff',
    'team.general_desc': 'Beyond name partners, Marques & Serra relies on a highly qualified multidisciplinary team of lawyers and technical consultants with solid academic background and vast professional experience.',

    // Awards
    'awards.label': 'Recognitions',
    'awards.title': 'Merit and',
    'awards.title_italic': 'Career',
    'awards.intro': 'Awarded to partner Pedro N. Marques',
    'awards.naval.title': 'Order of Naval Merit',
    'awards.naval.date': 'MAY 20, 2019',
    'awards.naval.grade': 'Grand Officer Grade',
    'awards.naval.desc': 'Awarded by the Presidency of the Republic for services rendered to the Navy.',
    'awards.defense.title': 'Order of Defense Merit',
    'awards.defense.date': 'MAY 17, 2019',
    'awards.defense.grade': 'Commander Grade',
    'awards.defense.desc': 'Granted by the Ministry of Defense for services to the Armed Forces.',
    'awards.rio_branco.title': 'Order of Rio Branco',
    'awards.rio_branco.date': 'APRIL 30, 2019',
    'awards.rio_branco.grade': 'Grand Officer Grade',
    'awards.rio_branco.desc': 'Awarded by the Ministry of Foreign Affairs for merits in public functions.',
    'awards.forces.title': 'Armed Forces Joint Staff Merit Medal',
    'awards.forces.date': 'NOVEMBER 17, 2021',
    'awards.forces.desc': 'Awarded for relevant institutional contribution to the Armed Forces.',
    'awards.maua.title': 'Mauá Merit Medal',
    'awards.maua.date': 'SEPTEMBER 6, 2021',
    'awards.maua.grade': 'Relevant Services Category',
    'awards.maua.desc': 'Granted by the Ministry of Infrastructure for contributions to national projects.',

    // Contact
    'contact.label': 'Contact',
    'contact.title1': 'Start a',
    'contact.title2': 'Strategic Partnership',
    'contact.desc': 'Contact us to schedule a consultation.',
    'contact.form_name': 'Name',
    'contact.form_email': 'E-mail',
    'contact.form_subject': 'Subject',
    'contact.form_msg': 'Message',
    'contact.btn_send': 'Send Message',
    'contact.phone': 'Phone / WhatsApp',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    // Nav
    'nav.office': 'El Despacho',
    'nav.practice': 'Áreas de Práctica',
    'nav.experience': 'Exclusividad',
    'nav.differentials': 'Diferenciales',
    'nav.team': 'Equipo',
    'nav.awards': 'Reconocimientos',
    'nav.contact': 'Contacto',
    'nav.intranet': 'Área Restringida',
    'nav.talk': 'Hable con Nosotros',

    // Hero
    'hero.sub': 'Sociedad de Abogados',
    'hero.cta': 'Agende una Consulta',
    'hero.desc1': 'Ubicados estratégicamente en el centro de las decisiones del país.',
    'hero.desc2': 'Soluciones jurídicas para un mundo en movimiento.',
    'hero.desc3': 'Decisiones estratégicas para la defensa de su empresa.',
    'hero.title3': 'Marques & Serra', 
    'hero.sub3': 'Sociedade de Advogados',

    // About
    'about.label': 'Quiénes Somos',
    'about.title': 'Profesionalismo e',
    'about.title_italic': 'Ética',
    'about.p1': 'Marques & Serra es una boutique legal de alta especialización, estructurada para demandas complejas.',
    'about.p2': 'El despacho nace de trayectorias profesionales marcadas por decisiones en el centro del gobierno.',
    'about.p3': 'Formado por profesionales que actuaron directamente en el núcleo decisorio del Estado brasileño.',
    'about.p4': 'Más que servicios jurídicos, ofrecemos soluciones estratégicas.',
    'about.exp': 'Años de Experiencia',
    'about.value': 'En Valor Involucrado',

    // Experience
    'experience.label': 'Exclusividad',
    'experience.title': 'Comodidades e',
    'experience.title_italic': 'Exclusividad',
    'experience.parking': 'Estacionamiento Privado',
    'experience.parking_desc': 'Comodidad total con plazas reservadas para clientes.',
    'experience.transport': 'Transporte Ejecutivo',
    'experience.transport_desc': 'Servicio de chofer exclusivo para traslados seguros.',
    'experience.schedule': 'Horario Programado',
    'experience.schedule_desc': 'Puntualidad absoluta y dedicación exclusiva durante su atención.',

    // Practice
    'practice.label': 'Nuestra Experiencia',
    'practice.title': 'Áreas de Práctica',
    'practice.corp': 'Corporativo',
    'practice.corp_desc': 'Consultoría societaria, gestión y estructuración.',
    'practice.lit': 'Litigios',
    'practice.lit_desc': 'Actuación en Tribunales Superiores (STF, STJ, TCU).',
    'practice.tax': 'Tributario',
    'practice.tax_desc': 'Planificación y litigio tributario estratégico.',
    'practice.energy': 'Energía',
    'practice.energy_desc': 'Regulación ANEEL, Generación y Distribución.',
    'practice.oil': 'Petróleo y Gas',
    'practice.oil_desc': 'Regulación ANP, Upstream y Downstream.',
    'practice.mining': 'Minería',
    'practice.mining_desc': 'Derecho Minero, ANM y licenciamiento.',

    // Differentials
    'diff.label': 'Nuestros Diferenciales',
    'diff.title': 'Excelencia en Detalle',
    'diff.tech': 'Actuación Técnica',
    'diff.tech_desc': 'Equipo multidisciplinario con comprensión técnica.',
    'diff.result': 'Foco en Resultados',
    'diff.result_desc': 'Postura proactiva para generar valor.',
    'diff.boutique': 'Atención Boutique',
    'diff.boutique_desc': 'Atención directa de los socios senior.',

    // Team
    'team.label': 'Liderazgo',
    'team.title': 'Socios Nominales',
    'team.view_profile': 'Ver Perfil',
    'team.bio_pedro': 'Abogado con amplia actuación en el núcleo decisorio federal.',
    'team.bio_ronald': 'Abogado con 20 años de experiencia, ex Procurador Federal.',
    'team.general_title': 'Cuerpo Jurídico Especializado',
    'team.general_desc': 'Além de seus sócios nominais, a Marques & Serra conta com uma equipe multidisciplinar composta por advogados, consultores e assessores técnicos, todos com sólida formação acadêmica e vasta experiência profissional em suas áreas de atuação.',

    // Awards
    'awards.label': 'Reconocimientos',
    'awards.title': 'Mérito y',
    'awards.title_italic': 'Carrera',
    'awards.intro': 'Concedidos al socio Pedro N. Marques',
    'awards.naval.title': 'Orden del Mérito Naval',
    'awards.naval.date': '20 DE MAYO DE 2019',
    'awards.naval.grade': 'Grado Gran Oficial',
    'awards.naval.desc': 'Otorgada por la Presidencia por servicios a la Marina.',
    'awards.defense.title': 'Orden del Mérito de la Defensa',
    'awards.defense.date': '17 DE MAYO DE 2019',
    'awards.defense.grade': 'Grado Comendador',
    'awards.defense.desc': 'Otorgada por el Ministerio de Defensa por servicios a las Fuerzas Armadas.',
    'awards.rio_branco.title': 'Orden de Rio Branco',
    'awards.rio_branco.date': '30 DE ABRIL DE 2019',
    'awards.rio_branco.grade': 'Grado Gran Oficial',
    'awards.rio_branco.desc': 'Otorgada por el Ministerio de Relaciones Exteriores.',
    'awards.forces.title': 'Medalla al Mérito del Estado Mayor Conjunto',
    'awards.forces.date': '17 DE NOVIEMBRE DE 2021',
    'awards.forces.desc': 'Concedida por contribución institucional relevante.',
    'awards.maua.title': 'Medalla al Mérito Mauá',
    'awards.maua.date': '6 DE SEPTIEMBRE DE 2021',
    'awards.maua.grade': 'Categoría Servicios Relevantes',
    'awards.maua.desc': 'Otorgada por el Ministerio de Infraestructura por contribuciones nacionales.',

    // Contact
    'contact.label': 'Contacto',
    'contact.title1': 'Inicie una',
    'contact.title2': 'Alianza Estratégica',
    'contact.desc': 'Entre en contacto para agendar una consulta.',
    'contact.form_name': 'Nombre',
    'contact.form_email': 'E-mail',
    'contact.form_subject': 'Asunto',
    'contact.form_msg': 'Mensaje',
    'contact.btn_send': 'Enviar Mensagem',
    'contact.phone': 'Teléfono / WhatsApp',
    'footer.rights': 'Todos os direitos reservados.',
  },
  zh: {
    // Nav
    'nav.office': '关于我们',
    'nav.practice': '业务领域',
    'nav.experience': '专享',
    'nav.differentials': '核心优势',
    'nav.team': '精英团队',
    'nav.awards': '荣誉资质',
    'nav.contact': '联系我们',
    'nav.intranet': '内部专区',
    'nav.talk': '在线咨询',

    // Hero
    'hero.sub': '律师事务所',
    'hero.cta': '预约咨询',
    'hero.desc1': '战略性地位于国家政治和法律决策的中心。',
    'hero.desc2': '为不断变化的世界提供法律解决方案。',
    'hero.desc3': '捍卫您的企业的战略决策。',
    'hero.title3': 'Marques & Serra', 
    'hero.sub3': '律师事务所',

    // About
    'about.label': '关于我们',
    'about.title': '专业与',
    'about.title_italic': '诚信',
    'about.p1': 'Marques & Serra 律师事务所是一家高度专业的精品律所，旨在处理需要卓越技术和战略眼光的复杂需求。',
    'about.p2': '本律所源于政府核心部门的职业生涯，具备处理复杂决策的背景。',
    'about.p3': '由直接在巴西国家决策核心（包括总统府和最高法院）工作的专业人士组成。',
    'about.p4': '我们不仅提供法律服务，还基于具体经验提供战略性法律解决方案。',
    'about.exp': '多年经验',
    'about.value': '涉及价值',

    // Experience
    'experience.label': '专享',
    'experience.title': '便捷与',
    'experience.title_italic': '专享',
    'experience.parking': '私家车位',
    'experience.parking_desc': '为客户预留专属车位，确保到访无忧。',
    'experience.transport': '商务专车',
    'experience.transport_desc': '专属司机服务，为客户提供安全、隐秘的接送。',
    'experience.schedule': '预约服务',
    'experience.schedule_desc': '绝对准时，精英团队在预约时间内全心投入服务。',

    // Practice
    'practice.label': '专业领域',
    'practice.title': '核心业务',
    'practice.corp': '企业法律',
    'practice.corp_desc': '公司咨询、管理咨询、资产回收及结构化。',
    'practice.lit': '诉讼业务',
    'practice.lit_desc': '在最高法院 (STF, STJ, TCU) 开展强有力的法律行动。',
    'practice.tax': '税务法律',
    'practice.tax_desc': '战略性税务规划与税务诉讼。',
    'practice.energy': '能源法律',
    'practice.energy_desc': 'ANEEL 监管、发电、输电与配电业务。',
    'practice.oil': '油气法律',
    'practice.oil_desc': 'ANP 监管、上游、中游与下游业务。',
    'practice.mining': '矿业法律',
    'practice.mining_desc': '矿业法、ANM 监管与许可业务。',

    // Differentials
    'diff.label': '律所优势',
    'diff.title': '追求细节卓越',
    'diff.tech': '专业技术',
    'diff.tech_desc': '跨学科团队，深刻理解各行业技术细节。',
    'diff.result': '结果导向',
    'diff.result_desc': '积极主动，旨在为客户释放价值。',
    'diff.boutique': '精品服务',
    'diff.boutique_desc': '资深合伙人直接负责并提供关注。',

    // Team
    'team.label': '领导力量',
    'team.title': '创始合伙人', 
    'team.view_profile': '查看详情',
    'team.bio_pedro': '在联邦行政部门决策核心拥有丰富经验。曾任总统府总秘书处首席部长。',
    'team.bio_ronald': '拥有20年法律经验。曾任 AGU 联邦检察官。',
    'team.general_title': '专业法律团队',
    'team.general_desc': 'Além de seus sócios nominais, a Marques & Serra conta com uma equipe multidisciplinar composta por advogados, consultores e assessores técnicos, todos com sólida formação acadêmica e vasta experiência profissional em suas áreas de atuação.',

    // Awards
    'awards.label': '荣誉资质',
    'awards.title': '勋章与',
    'awards.title_italic': '职业生涯',
    'awards.intro': '授予合伙人 Pedro N. Marques',
    'awards.naval.title': '海军功绩勋章',
    'awards.naval.date': '2019年5月20日',
    'awards.naval.grade': '大军官勋衔',
    'awards.naval.desc': '由共和国总统颁发，以表彰对巴西海军做出的卓越贡献。',
    'awards.defense.title': '国防功绩勋章',
    'awards.defense.date': '2019年5月17日',
    'awards.defense.grade': '司令官勋衔',
    'awards.defense.desc': '由国防部授予，以表彰对国防部 and 武装部队的杰出服务。',
    'awards.rio_branco.title': '里奥·布兰科勋章',
    'awards.rio_branco.date': '2019年4月30日',
    'awards.rio_branco.grade': '大军官勋衔',
    'awards.rio_branco.desc': '由外交部颁发，表彰在国家利益公共职能中的卓越功勋。',
    'awards.forces.title': '武装部队参谋部功绩奖章',
    'awards.forces.date': '2021年11月17日',
    'awards.forces.desc': '由武装部队联合参谋部颁发，表彰相关的机构贡献。',
    'awards.maua.title': '马里亚功绩奖章',
    'awards.maua.date': '2021年9月6日',
    'awards.maua.grade': '杰出服务类',
    'awards.maua.desc': '由基础设施部授予，以表彰在国家基础设施战略项目中的贡献。',

    // Contact
    'contact.label': '联系我们',
    'contact.title1': '开启',
    'contact.title2': '战略合作伙伴',
    'contact.desc': '联系我们预约咨询服务。',
    'contact.form_name': '姓名',
    'contact.form_email': '电子邮箱',
    'contact.form_subject': '主题',
    'contact.form_msg': '留言内容',
    'contact.btn_send': '发送留言',
    'contact.phone': '电话 / 微信 / WhatsApp',
    'footer.rights': '版权所有。',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
