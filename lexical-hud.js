/* ═══════════════════════════════════════════════════════════════
   LEXICAL HUD v2 — DET Practice App
   Context-aware vocabulary graph · Canvas API · no dependencies
   API: window.LexicalHUD.{open,close,toggle,hear,setContext,clearContext}
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── VOCABULARY ─────────────────────────────────────────────────
     Strategy: cognates first (easy for Spanish speakers), high DET
     impact (B2-C1 markers evaluators detect), avoid hard clusters.
     First 14 = canvas nodes · All 25 = shown in word panel.
  ─────────────────────────────────────────────────────────────── */
  const PILLARS = [
    {
      id: 'academic', label: 'Academic', angle: 270,
      color: '#C084FC', glow: 'rgba(192,132,252,.75)',
      words: [
        /* ── 14 graph nodes ─ cognates easy for Sp. speakers ── */
        'Analysis',          // análisis ✓
        'Hypothesis',        // hipótesis ✓
        'Methodology',       // metodología ✓
        'Institution',       // institución ✓
        'Curriculum',        // currículo ✓
        'Perspective',       // perspectiva ✓
        'Comprehensive',     // comprensivo ✓
        'Systematic',        // sistemático ✓
        'Coherent',          // coherente ✓
        'Implication',       // implicación ✓
        'Discourse',         // discurso ✓
        'Criteria',          // criterios ✓
        'Assertion',         // aseveración ✓
        'Empirical',         // empírico ✓
        /* ── 11 panel-only extras ── */
        'Theoretical',       // teórico ✓
        'Rationale',         // racional ✓
        'Rigorous',          // riguroso ✓
        'Elaborate',         // elaborado ✓
        'Conceptual',        // conceptual ✓
        'Profound',          // profundo ✓
        'Substantial',       // sustancial ✓
        'Innovative',        // innovador ✓
        'Fundamental',       // fundamental ✓
        'Objective',         // objetivo ✓
        'Relevant',          // relevante ✓
        /* ── 15 expanded ── */
        'Intellectual',      // intelectual ✓
        'Interdisciplinary', // interdisciplinario ✓
        'Paradigm',          // paradigma ✓
        'Validity',          // validez ✓
        'Inference',         // inferencia ✓
        'Correlation',       // correlación ✓
        'Nuanced',
        'Articulate',        // articulado ✓
        'Evaluate',          // evaluar ✓
        'Synthesize',        // sintetizar ✓
        'Acknowledge',       // reconocer ✓
        'Distinguish',       // distinguir ✓
        'Scholarly',
        'Discipline',        // disciplina ✓
        'Evidence-based'
      ],
      keywords: ['education','school','university','learn','study','teach',
                 'knowledge','academic','science','book','language','degree',
                 'scholar','thesis','intellectual','literacy','course','research',
                 'theory','subject','classroom','lecture','professor','essay']
    },
    {
      id: 'technical', label: 'Technical', angle: 330,
      color: '#38BDF8', glow: 'rgba(56,189,248,.75)',
      words: [
        /* ── 14 graph nodes ── */
        'Innovation',        // innovación ✓
        'Automation',        // automatización ✓
        'Infrastructure',    // infraestructura ✓
        'Integration',       // integración ✓
        'Optimization',      // optimización ✓
        'Digital',           // digital ✓
        'Platform',          // plataforma ✓
        'Artificial',        // artificial ✓
        'Transformation',    // transformación ✓
        'Sustainability',    // sostenibilidad ✓
        'Proliferation',     // proliferación ✓
        'Ecosystem',         // ecosistema ✓
        'Algorithm',         // algoritmo ✓
        'Disruption',        // disrupción ✓
        /* ── 11 panel-only extras ── */
        'Scalability',       // escalabilidad ✓
        'Cybersecurity',     // ciberseguridad ✓
        'Renewable energy',  // energía renovable ✓
        'Decentralized',     // descentralizado ✓
        'Efficiency',        // eficiencia ✓
        'Prototype',         // prototipo ✓
        'Connectivity',      // conectividad ✓
        'Data-driven',
        'Interoperability',
        'Progressive',       // progresivo ✓
        'Accelerate',        // acelerar ✓
        /* ── 15 expanded ── */
        'Bandwidth',
        'Interface',         // interfaz ✓
        'Framework',
        'Deployment',
        'Visualization',     // visualización ✓
        'Analytics',         // analítica ✓
        'Functionality',     // funcionalidad ✓
        'Blockchain',
        'Transparency',      // transparencia ✓
        'Repository',        // repositorio ✓
        'Robotics',          // robótica ✓
        'Virtualization',    // virtualización ✓
        'Semiconductor',     // semiconductor ✓
        'Microchip',
        'Cloud computing'
      ],
      keywords: ['technology','ai','artificial intelligence','digital','innovation',
                 'internet','computer','software','automation','machine','robot',
                 'smartphone','device','tech','startup','engineering','data',
                 'network','cyber','app','programming','code','system','tool']
    },
    {
      id: 'logical', label: 'Connectors', angle: 30,
      color: '#F87171', glow: 'rgba(248,113,113,.75)',
      words: [
        /* ── 14 graph nodes — high-impact DET discourse markers ── */
        'Consequently',      // consecuentemente ✓
        'Furthermore',       // además ✓
        'Nevertheless',      // sin embargo ✓ (4 syllables, manageable)
        'Therefore',         // por lo tanto ✓
        'In contrast',
        'Moreover',          // además ✓
        'Fundamentally',     // fundamentalmente ✓
        'Evidently',         // evidentemente ✓
        'In light of this',
        'Demonstrate',       // demostrar ✓
        'To illustrate',
        'On the contrary',
        'It follows that',
        'From my perspective',
        /* ── 11 panel-only extras ── */
        'In addition',
        'As a result',
        'In essence',
        'On balance',
        'Building upon this',
        'It is worth noting',
        'Admittedly',
        'Undeniably',
        'Given that',
        'In summary',
        'Ultimately',
        /* ── 15 expanded ── */
        'In particular',
        'As a consequence',
        'To begin with',
        'In general',
        'Specifically',
        'Notably',
        'In other words',
        'For this reason',
        'Above all',
        'By contrast',
        'With regard to',
        'Even though',
        'Despite this',
        'That being said',
        'To clarify'
      ],
      keywords: ['argue','reason','opinion','discuss','explain','compare','effect',
                 'cause','result','evidence','support','claim','perspective','view',
                 'think','believe','should','why','how','advantage','disadvantage',
                 'benefit','challenge','point','argument','debate','conclusion']
    },
    {
      id: 'social', label: 'Social', angle: 90,
      color: '#FB923C', glow: 'rgba(251,146,60,.75)',
      words: [
        /* ── 14 graph nodes ── */
        'Community',         // comunidad ✓
        'Diversity',         // diversidad ✓
        'Globalization',     // globalización ✓
        'Inequality',        // inequidad ✓
        'Collaboration',     // colaboración ✓
        'Representation',    // representación ✓
        'Inclusion',         // inclusión ✓
        'Solidarity',        // solidaridad ✓
        'Socioeconomic',     // socioeconómico ✓
        'Polarization',      // polarización ✓
        'Cultural heritage',
        'Equity',            // equidad ✓
        'Advocacy',          // ≈ abogacía
        'Cohesion',          // cohesión ✓
        /* ── 11 panel-only extras ── */
        'Social mobility',
        'Civic engagement',
        'Accountability',    // rendición de cuentas
        'Philanthropy',      // filantropía ✓
        'Migration',         // migración ✓
        'Marginalized',
        'Demographic',       // demográfico ✓
        'Discrimination',    // discriminación ✓
        'Participation',     // participación ✓
        'Sustainability',    // sostenibilidad ✓
        'Collective',        // colectivo ✓
        /* ── 15 expanded ── */
        'Urbanization',      // urbanización ✓
        'Citizenship',       // ciudadanía ✓
        'Multiculturalism',  // multiculturalismo ✓
        'Legislation',       // legislación ✓
        'Coexistence',       // coexistencia ✓
        'Tolerance',         // tolerancia ✓
        'Privilege',         // privilegio ✓
        'Coalition',         // coalición ✓
        'Mobilization',      // movilización ✓
        'Social justice',
        'Human rights',
        'Grassroots',
        'Gentrification',
        'Interdependence',   // interdependencia ✓
        'Humanitarian'       // humanitario ✓
      ],
      keywords: ['community','society','people','culture','diversity','social media',
                 'neighbor','public','relationship','friend','group','collective',
                 'politics','government','global','world','nation','citizenship',
                 'equality','social','together','media','communication','influence']
    },
    {
      id: 'emotional', label: 'Emotional', angle: 150,
      color: '#FACC15', glow: 'rgba(250,204,21,.75)',
      words: [
        /* ── 14 graph nodes ── */
        'Resilience',        // resiliencia ✓
        'Empathy',           // empatía ✓
        'Compassion',        // compasión ✓
        'Perseverance',      // perseverancia ✓
        'Vulnerability',     // vulnerabilidad ✓
        'Gratitude',         // gratitud ✓
        'Contentment',       // contentamiento ✓
        'Fulfillment',
        'Enthusiasm',        // entusiasmo ✓
        'Introspection',     // introspección ✓
        'Motivation',        // motivación ✓
        'Confidence',        // confianza ✓
        'Inspiration',       // inspiración ✓
        'Determination',     // determinación ✓
        /* ── 11 panel-only extras ── */
        'Self-awareness',
        'Mindfulness',
        'Fortitude',         // fortaleza ✓
        'Tenacity',          // tenacidad ✓
        'Empowerment',
        'Equanimity',        // ecuanimidad ✓
        'Emotional intelligence',
        'Optimism',          // optimismo ✓
        'Adaptability',      // adaptabilidad ✓
        'Serenity',          // serenidad ✓
        'Overcome',          // superar ✓
        /* ── 15 expanded ── */
        'Catharsis',         // catarsis ✓
        'Altruism',          // altruismo ✓
        'Benevolence',       // benevolencia ✓
        'Humility',          // humildad ✓
        'Wellbeing',
        'Clarity',           // claridad ✓
        'Steadfast',
        'Passionate',        // apasionado ✓
        'Courage',           // coraje ✓
        'Acceptance',        // aceptación ✓
        'Sincerity',         // sinceridad ✓
        'Patience',          // paciencia ✓
        'Awareness',
        'Flourish',
        'Strength'           // fortaleza ✓
      ],
      keywords: ['feel','emotion','happiness','stress','mental','health','wellbeing',
                 'resilience','anxiety','fear','confidence','overcome','personal',
                 'experience','proud','difficult','challenging','meaningful','impact',
                 'motivat','inspir','passion','dream','grow','change','strength']
    },
    {
      id: 'domestic', label: 'Domestic', angle: 219,
      color: '#4ADE80', glow: 'rgba(74,222,128,.75)',
      words: [
        /* ── 14 graph nodes ── */
        'Stability',         // estabilidad ✓
        'Traditions',        // tradiciones ✓
        'Routine',           // rutina ✓
        'Heritage',          // herencia ✓
        'Livelihood',
        'Residence',         // residencia ✓
        'Sustain',           // sostener ✓
        'Nurture',
        'Harmony',           // harmonía ✓
        'Cohabitation',      // cohabitación ✓
        'Upbringing',
        'Sanctuary',
        'Daily rituals',
        'Self-sufficient',
        /* ── 11 panel-only extras ── */
        'Household',
        'Maintenance',       // mantenimiento ✓
        'Provisions',        // provisiones ✓
        'Work-life balance',
        'Neighborhood',      // vecindario ✓
        'Frugality',
        'Domesticity',       // domesticidad ✓
        'Subsistence',       // subsistencia ✓
        'Dwelling',
        'Family values',
        'Community bonds',
        /* ── 15 expanded ── */
        'Upkeep',
        'Budgeting',
        'Ancestral',         // ancestral ✓
        'Lifestyle',
        'Hospitality',       // hospitalidad ✓
        'Independence',      // independencia ✓
        'Hygiene',           // higiene ✓
        'Nourishment',
        'Security',          // seguridad ✓
        'Privacy',           // privacidad ✓
        'Recreation',        // recreación ✓
        'Relaxation',        // relajación ✓
        'Simplicity',        // simplicidad ✓
        'Gathering',
        'Chores'
      ],
      keywords: ['home','house','family','daily','routine','cook','food','meal',
                 'domestic','living','neighborhood','city','apartment','lifestyle',
                 'tradition','habit','travel','vacation','hobby','childhood',
                 'memory','parent','grow','place','local','town','community']
    },
    {
      id: 'power', label: 'Power Frames', angle: 64,
      color: '#F472B6', glow: 'rgba(244,114,182,.75)',
      words: [
        /* ── 14 graph nodes — sentence openers that signal C1/C2 ── */
        'One could argue',         // se podría argumentar ✓
        'It is worth noting',      // cabe destacar ✓
        'From my perspective',     // desde mi perspectiva ✓
        'What is striking is',     // lo que llama la atención ✓
        'The evidence suggests',   // la evidencia sugiere ✓
        'It goes without saying',  // va sin decir ✓
        'This raises the question',// esto plantea la pregunta ✓
        'A key consideration',     // una consideración clave ✓
        'By the same token',       // de la misma manera ✓
        'The implications of',     // las implicaciones de ✓
        'On balance',              // en balance ✓
        'It could be contended',   // se podría sostener ✓
        'What is clear is',        // lo que está claro es ✓
        'To put it simply',        // para decirlo simplemente ✓
        /* ── 11 panel-only extras ── */
        'From a broader view',
        'Building upon this',
        'The reality is that',
        'Not to mention that',
        'This is evident in',
        'It must be said that',
        'Taking this into account',
        'Without a doubt',
        'Needless to say',
        'It is undeniable that',
        'In this regard',
        /* ── 15 expanded ── */
        'All things considered',
        'What stands out is',
        'To put it differently',
        'Broadly speaking',
        'In many respects',
        'It bears mentioning',
        'The key point here is',
        'It should be emphasized',
        'At the heart of this',
        'One thing is certain',
        'Looking at the big picture',
        'This leads me to believe',
        'The fact remains that',
        'It goes to show that',
        'Suffice it to say'
      ],
      keywords: ['discuss','talk','explain','describe','opinion','perspective',
                 'argue','suggest','consider','important','key','significant',
                 'think','believe','claim','point','view','say','state','express',
                 'analyze','evaluate','assess','reflect','respond','answer']
    }
  ];

  /* Top starter words shown in context panel — best DET impact + pronounceable */
  /* 20 highlighted words per pillar — shown as ctx chips + suggested in context bar */
  const STARTERS = {
    academic: [
      'Analysis','Perspective','Comprehensive','Implication','Empirical','Fundamental',
      'Methodology','Discourse','Systematic','Coherent','Theoretical','Assertion',
      'Evaluate','Nuanced','Intellectual','Paradigm','Validity','Scholarly','Synthesize','Acknowledge'
    ],
    technical: [
      'Innovation','Automation','Infrastructure','Transformation','Sustainability','Disruption',
      'Integration','Algorithm','Optimization','Cybersecurity','Analytics','Visualization',
      'Framework','Robotics','Blockchain','Connectivity','Efficiency','Digital','Platform','Cloud computing'
    ],
    logical: [
      'Consequently','Furthermore','Nevertheless','In light of this','On balance','It follows that',
      'Therefore','Moreover','In contrast','As a result','In other words','For this reason',
      'That being said','Notably','Despite this','In particular','Above all','To begin with','By contrast','Specifically'
    ],
    social: [
      'Diversity','Inequality','Collaboration','Solidarity','Cultural heritage','Representation',
      'Community','Inclusion','Globalization','Equity','Multiculturalism','Social justice',
      'Human rights','Tolerance','Advocacy','Urbanization','Citizenship','Cohesion','Migration','Interdependence'
    ],
    emotional: [
      'Resilience','Empathy','Perseverance','Determination','Inspiration','Compassion',
      'Confidence','Motivation','Gratitude','Vulnerability','Courage','Patience',
      'Humility','Wellbeing','Strength','Adaptability','Sincerity','Acceptance','Passionate','Clarity'
    ],
    domestic: [
      'Stability','Traditions','Heritage','Livelihood','Harmony','Upbringing',
      'Routine','Sustain','Nurture','Sanctuary','Household','Family values',
      'Work-life balance','Neighborhood','Hospitality','Lifestyle','Recreation','Security','Independence','Simplicity'
    ],
    power: [
      'One could argue','It is worth noting','From my perspective','The evidence suggests','By the same token','What is striking is',
      'This raises the question','The implications of','It could be contended','What is clear is',
      'All things considered','Broadly speaking','That being said','The key point here is',
      'It should be emphasized','The reality is that','It is undeniable that','Without a doubt',
      'Looking at the big picture','To put it differently'
    ]
  };

  /* Number of words rendered as graph nodes (rest shown only in word panel) */
  const GRAPH_NODES = 14;

  /* Cross-pillar thematic connections */
  const CROSS = [
    ['academic','Methodology','technical','Algorithm'],
    ['academic','Discourse','social','Dialogue'],
    ['academic','Assertion','logical','Coherent'],
    ['academic','Empirical','logical','Demonstrate'],
    ['academic','Implication','power','The implications of'],
    ['technical','Automation','social','Inequality'],
    ['technical','Innovation','academic','Systematic'],
    ['technical','Sustainability','domestic','Sustain'],
    ['technical','Transformation','power','One could argue'],
    ['social','Diversity','emotional','Empathy'],
    ['social','Globalization','technical','Integration'],
    ['social','Inequality','power','What is striking is'],
    ['emotional','Resilience','domestic','Stability'],
    ['emotional','Inspiration','power','From my perspective'],
    ['domestic','Traditions','social','Cultural heritage'],
    ['logical','Consequently','power','By the same token'],
    ['logical','Furthermore','power','It is worth noting'],
  ];

  /* ─── CONNECTOR KEYWORD MAP — one entry per connector word ──────
     Used to match which connectors fit the current question text.
  ──────────────────────────────────────────────────────────────── */
  const CONNECTOR_KEYS = {
    /* causal / result */
    'Consequently':       ['because','result','effect','impact','cause','outcome','therefore','leads'],
    'Therefore':          ['because','result','hence','thus','conclude','reason','consequence'],
    'As a result':        ['result','effect','outcome','therefore','because','since','impact'],
    'For this reason':    ['reason','because','since','why','cause','explain'],
    'In light of this':   ['considering','given','therefore','context','since','result','fact'],
    'It follows that':    ['logical','result','therefore','implies','thus','conclude','follows'],
    'As a consequence':   ['result','effect','impact','because','outcome','cause'],
    /* contrast */
    'Nevertheless':       ['however','although','despite','challenge','difficulty','obstacle','still'],
    'In contrast':        ['compare','different','whereas','unlike','opposite','but','other'],
    'On the contrary':    ['opposite','wrong','actually','false','rather','instead','but'],
    'By contrast':        ['compare','different','whereas','unlike','opposite','other'],
    'Even though':        ['although','despite','while','regardless','still','but','even'],
    'Despite this':       ['despite','although','but','however','regardless','still','yet'],
    'That being said':    ['however','but','although','yet','still','nevertheless'],
    'Admittedly':         ['admit','however','concede','true','but','grant','acknowledge'],
    /* addition */
    'Furthermore':        ['also','more','second','third','support','add','additionally','another'],
    'Moreover':           ['also','second','additionally','besides','further','add','more'],
    'In addition':        ['also','another','more','additionally','plus','include','add'],
    'Above all':          ['important','key','mainly','especially','crucial','most','primarily'],
    'In particular':      ['specific','especially','notably','particularly','certain','key'],
    'Notably':            ['notable','significant','especially','worth','key','remarkable','important'],
    'Specifically':       ['specific','particular','exactly','especially','detail','namely'],
    'Not to mention that':['also','plus','besides','additionally','included','furthermore'],
    'Building upon this': ['extend','expand','add','further','develop','build','continue','also'],
    /* opinion / perspective */
    'From my perspective':['opinion','think','believe','view','feel','argue','personal','consider'],
    'One could argue':    ['argue','opinion','claim','suggest','think','believe','view','contend'],
    'It is worth noting': ['important','note','observe','interesting','key','mention','point'],
    'On balance':         ['overall','both','weigh','balance','pros','cons','total','consider'],
    'All things considered':['overall','weigh','conclude','sum','balance','consider','pros'],
    'Broadly speaking':   ['general','overall','typically','usually','mostly','tend','common'],
    /* exemplify */
    'To illustrate':      ['example','instance','show','demonstrate','case','such','like'],
    'Demonstrate':        ['show','prove','example','evidence','illustrate','explain','fact'],
    'In other words':     ['mean','explain','clarify','rephrase','say','restate','put'],
    'To clarify':         ['explain','clear','mean','rephrase','understand','say'],
    'To begin with':      ['first','start','begin','initially','primary','main','introduce'],
    /* conclude / summarize */
    'In summary':         ['conclude','summary','overall','finally','end','recap','brief'],
    'Ultimately':         ['conclude','finally','end','overall','therefore','last','result'],
    'In essence':         ['basically','core','essential','mainly','simply','heart','fundamental'],
    'To put it differently':['rephrase','other','way','say','clarify','simply','mean'],
    'In general':         ['typically','usually','generally','mostly','tend','common','overall'],
    /* emphasis */
    'Undeniably':         ['certain','fact','true','clear','obvious','definitely','without'],
    'Without a doubt':    ['certain','definitely','clear','fact','true','obvious','sure'],
    'Evidently':          ['clear','obvious','evident','proof','demonstrate','clearly','show'],
    'Fundamentally':      ['basic','core','essential','key','underlying','primarily','deep'],
    'Given that':         ['since','because','given','considering','fact','as','reason'],
    /* discourse / flow */
    'In many respects':   ['many','several','various','ways','aspects','different','multiple'],
    'With regard to':     ['about','regarding','concerning','topic','subject','matter','issue'],
    'That being said':    ['however','but','although','yet','still','nevertheless','point'],
    'Despite this':       ['despite','still','however','yet','regardless','nevertheless'],
  };

  /* ─── STATE ──────────────────────────────────────────────────── */
  let canvas, ctx, nodes = [], animId = null, t = 0;
  let selectedPillar  = null;
  let hoveredNode     = null;
  let contextScores   = null;
  let contextTop      = [];
  let isOpen          = false;
  let pronWord        = '';
  let pronColor       = '#C084FC';
  let pronActive      = false;
  let lastContextText = '';
  let aiSuggestions   = [];   // [{word, category, hint}] — proposed by AI
  let aiVocabLoad     = false;
  let myChosenWords   = [];   // [{word, category, hint}] — user selected
  let showHiddenWords = false;
  let showVocabBank   = false;
  let showConnectors  = false;

  const CATEGORY_PILLAR = {
    Academic:'academic', Technical:'technical', Social:'social',
    Emotional:'emotional', Domestic:'domestic', Connector:'logical', Power:'power'
  };
  function getVocabBank() {
    try { return JSON.parse(localStorage.getItem('lhud_bank') || '{}'); } catch(e) { return {}; }
  }
  function saveVocabBank(b) { localStorage.setItem('lhud_bank', JSON.stringify(b)); }

  /* Smooth zoom state (0 = full graph, 1 = cluster detail) */
  let zoomP  = 0;  // current progress
  let zoomT  = 0;  // target

  /* ─── LERP HELPER ────────────────────────────────────────────── */
  const lerp = (a, b, k) => a + (b - a) * k;

  /* ─── CONTEXT ENGINE ─────────────────────────────────────────── */
  function scoreText(text) {
    const low = text.toLowerCase();
    const raw = {};
    PILLARS.forEach(p => {
      raw[p.id] = p.keywords.reduce((n, kw) => n + (low.includes(kw) ? 1 : 0), 0);
    });
    const max = Math.max(...Object.values(raw), 1);
    const out = {};
    PILLARS.forEach(p => { out[p.id] = raw[p.id] / max; });
    return out;
  }

  function setContext(text) {
    if (!text || text.length < 8) return;
    contextScores = scoreText(text);
    const isNewQuestion = text !== lastContextText;
    lastContextText = text;
    if (isNewQuestion) { myChosenWords = []; aiSuggestions = []; }
    /* Connectors + Power Frames are universal — never consume a context slot */
    contextTop = Object.entries(contextScores)
      .sort((a, b) => b[1] - a[1])
      .filter(([id, v]) => v > 0 && id !== 'logical' && id !== 'power')
      .slice(0, 2)
      .map(([id]) => id);
    renderContextPanel();
    renderWordGrid();
    if (contextTop[0]) {
      const sec = document.getElementById('hwg-' + contextTop[0]);
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showFabBadge(true);
    /* Fetch AI vocab for new questions (async, non-blocking) */
    if (isNewQuestion) loadAiVocab(text);
  }

  function clearContext() {
    contextScores = null; contextTop = []; lastContextText = '';
    aiSuggestions = []; aiVocabLoad = false; myChosenWords = [];
    renderContextPanel(); renderWordGrid(); showFabBadge(false);
  }

  /* ─── CONTEXT PANEL ──────────────────────────────────────────── */
  function renderContextPanel() {
    const bar = document.getElementById('hud-context-bar');
    if (!bar) return;

    if (!contextTop.length) {
      bar.className = 'hcb-idle';
      bar.innerHTML = `<span class="hcb-idle-txt">🔍 Inicia un ejercicio · el HUD detectará el vocabulario ideal</span>`;
      return;
    }

    const p1 = PILLARS.find(p => p.id === contextTop[0]);
    const p2 = contextTop[1] ? PILLARS.find(p => p.id === contextTop[1]) : null;
    const words1 = STARTERS[p1.id].slice(0, 8);
    const words2 = p2 ? STARTERS[p2.id].slice(0, 5) : [];

    bar.className = 'hcb-active';
    bar.innerHTML = `
      <div class="hcb-row">
        <span class="hcb-lbl">💡 USA EN ESTA RESPUESTA</span>
        <span class="hcb-pill" style="--pc:${p1.color}">${p1.label}</span>
        ${p2 ? `<span class="hcb-pill" style="--pc:${p2.color}">${p2.label}</span>` : ''}
        <span class="hcb-lbl" style="margin-left:auto;font-size:.55rem">← 20 en la cuadrícula</span>
      </div>
      <div class="hcb-words">
        ${words1.map(w => chip(w, p1.color)).join('')}
        ${words2.map(w => chip(w, p2.color)).join('')}
      </div>`;
  }

  function chip(word, color) {
    return `<span class="hwp-chip hcb-chip" style="--chip-color:${color}"
      onclick="LexicalHUD.hear('${word}');this.classList.toggle('used')">${word}</span>`;
  }

  /* ─── FAB BADGE ──────────────────────────────────────────────── */
  function showFabBadge(show) {
    const b = document.getElementById('hud-fab-badge');
    if (b) b.classList.toggle('show', show);
  }

  /* ─── MUTATION OBSERVER ──────────────────────────────────────── */
  function watchQuestions() {
    const WATCH = [
      { id: 'ph-title', skip: t => t.startsWith('—') || t.length < 6 },
      { id: 'rd-q',     skip: t => t.startsWith('Press') || t.length < 6 },
      { id: 'sp-q',     skip: t => t.startsWith('Press') || t.length < 6 },
      { id: 'is-q',     skip: t => t.startsWith('Press') || t.length < 10 },
      { id: 'c1-ex',    skip: t => t.length < 10 },
    ];
    WATCH.forEach(({ id, skip }) => {
      const el = document.getElementById(id);
      if (!el) return;
      new MutationObserver(() => {
        const txt = (el.textContent || '').trim();
        if (!skip(txt)) setContext(txt);
      }).observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

  /* ─── BUILD NODES ────────────────────────────────────────────── */
  function buildNodes() {
    nodes = [];
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const PR  = Math.min(W, H) * 0.29;   // hub orbit radius (global view)
    const WR  = Math.min(W, H) * 0.135;  // word orbit radius (global view)
    const WRZ = Math.min(W, H) * 0.36;   // word orbit radius (zoomed view)
    const nP  = PILLARS.length;           // works for any number of pillars

    PILLARS.forEach((p, pi) => {
      /* Evenly distribute N pillars starting from top (270°) */
      const angleDeg = (270 + (pi * 360 / nP)) % 360;
      const rad = (angleDeg * Math.PI) / 180;
      const hx  = cx + PR * Math.cos(rad);
      const hy  = cy + PR * Math.sin(rad);

      /* Hub */
      nodes.push({
        id: p.id+'_hub', pillar: p.id, label: p.label,
        bx: hx, by: hy,   // global base pos
        zx: cx,  zy: cy,  // zoomed pos (center)
        x: hx, y: hy, r: 20, isHub: true,
        phase: (pi * Math.PI * 2) / 6,
        color: p.color, glow: p.glow
      });

      /* Words */
      /* Only first GRAPH_NODES words rendered as canvas nodes */
      p.words.slice(0, GRAPH_NODES).forEach((word, wi) => {
        const wAngle = rad + (wi / GRAPH_NODES) * Math.PI * 2;
        const wx = hx + WR  * Math.cos(wAngle);
        const wy = hy + WR  * Math.sin(wAngle);
        const zx = cx + WRZ * Math.cos(wAngle);
        const zy = cy + WRZ * Math.sin(wAngle);
        nodes.push({
          id: p.id+'_'+word, pillar: p.id, label: word,
          bx: wx, by: wy, zx, zy,
          x: wx, y: wy, r: 7, isHub: false,
          phase: (pi * Math.PI * 2) / 6 + wi * 0.35,
          color: p.color, glow: p.glow,
          hubBx: hx, hubBy: hy, wAngle
        });
      });
    });
  }

  /* ─── RESIZE ─────────────────────────────────────────────────── */
  function onResize() {
    const wrap = document.getElementById('hud-canvas-wrap');
    if (!wrap || !canvas) return;
    canvas.width  = wrap.clientWidth  || 420;
    canvas.height = wrap.clientHeight || 360;
    buildNodes();
  }

  /* ─── PILLAR ALPHA ───────────────────────────────────────────── */
  function pillarAlpha(id) {
    if (selectedPillar) return selectedPillar === id ? 1 : Math.max(0.04, 1 - zoomP * 0.96);
    if (contextScores) return 0.22 + (contextScores[id] || 0) * 0.78;
    return 1;
  }

  /* ─── ANIMATION LOOP ─────────────────────────────────────────── */
  function startAnim() {
    if (!canvas || !ctx) return; // canvas hidden — skip animation
    if (animId) cancelAnimationFrame(animId);
    (function loop() {
      if (!isOpen || !canvas) { animId = null; return; }
      t   += 0.011;
      zoomP = lerp(zoomP, zoomT, 0.07);

      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;

      nodes.forEach(n => {
        const osc_x = Math.sin(t + n.phase) * 2.2;
        const osc_y = Math.cos(t * 0.7 + n.phase) * 2.2;
        const isSel = n.pillar === selectedPillar;

        if (selectedPillar && isSel) {
          /* Lerp toward zoomed position */
          n.x = lerp(n.bx + osc_x, n.zx, zoomP);
          n.y = lerp(n.by + osc_y, n.zy, zoomP);
        } else if (selectedPillar && !isSel) {
          /* Non-selected: stay but shrink toward hub direction */
          n.x = n.bx + osc_x;
          n.y = n.by + osc_y;
        } else {
          n.x = n.bx + osc_x;
          n.y = n.by + osc_y;
        }
      });

      draw();
      animId = requestAnimationFrame(loop);
    })();
  }

  /* ─── DRAW ───────────────────────────────────────────────────── */
  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    drawBg(W, H);

    /* Cross links — only when not zoomed */
    const crossAlpha = 1 - zoomP;
    if (crossAlpha > 0.01) {
      CROSS.forEach(([pA, wA, pB, wB]) => {
        const nA = nd(pA+'_'+wA), nB = nd(pB+'_'+wB);
        if (!nA || !nB) return;
        const a = !selectedPillar
          ? 0.10 * crossAlpha
          : (nA.pillar===selectedPillar||nB.pillar===selectedPillar ? 0.10 : 0.02) * crossAlpha;
        drawLine(nA.x, nA.y, nB.x, nB.y, '#fff', a, 0.6);
      });
    }

    /* Hub → word edges */
    PILLARS.forEach(p => {
      const hub = nd(p.id+'_hub');
      const a = pillarAlpha(p.id);
      p.words.forEach(w => {
        const wn = nd(p.id+'_'+w);
        if (hub && wn) drawLine(hub.x, hub.y, wn.x, wn.y, p.color, a * 0.5, 1.1);
      });
    });

    /* Word nodes */
    nodes.filter(n => !n.isHub).forEach(n => drawWordNode(n, pillarAlpha(n.pillar)));

    /* Hub nodes */
    nodes.filter(n => n.isHub).forEach(n => drawHubNode(n, pillarAlpha(n.pillar)));

    /* Particles on selected or top-context pillar */
    const flowId = selectedPillar || contextTop[0];
    if (flowId) {
      const hub = nd(flowId+'_hub');
      const p   = PILLARS.find(p => p.id === flowId);
      if (hub && p) {
        p.words.forEach((w, wi) => {
          const wn = nd(flowId+'_'+w);
          if (!wn) return;
          const prog = ((t * 0.65 + wi * 0.20) % 1 + 1) % 1;
          drawParticle(hub.x, hub.y, wn.x, wn.y, prog, p.color);
        });
      }
    }
  }

  function drawBg(W, H) {
    ctx.fillStyle = '#07071A';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,0.036)';
    for (let x = 22; x < W; x += 26)
      for (let y = 22; y < H; y += 26) {
        ctx.beginPath(); ctx.arc(x, y, 0.6, 0, Math.PI * 2); ctx.fill();
      }
    const g = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.min(W,H)*0.5);
    g.addColorStop(0, 'rgba(100,50,200,0.07)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }

  function drawLine(x1,y1,x2,y2,color,alpha,lw) {
    ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=color; ctx.lineWidth=lw;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.restore();
  }

  function drawWordNode(n, alpha) {
    const isHov  = hoveredNode === n;
    const isSel  = n.pillar === selectedPillar;
    /* Node size scales with zoom */
    const rBase  = lerp(n.r, n.r * 1.85, isSel ? zoomP : 0);
    const r      = isHov ? rBase * 1.45 : rBase;

    ctx.save();
    ctx.globalAlpha = alpha;
    if (isSel || isHov) { ctx.shadowColor = n.glow; ctx.shadowBlur = isHov ? 20 : lerp(9, 22, zoomP); }
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0A1F'; ctx.fill();
    ctx.strokeStyle = n.color; ctx.lineWidth = isSel ? lerp(1, 2, zoomP) : 1; ctx.stroke();
    ctx.restore();

    /* Label direction: outward from hub */
    let nx, ny;
    if (isSel && zoomP > 0.3) {
      /* In zoom mode: direction is wAngle from canvas center */
      nx = Math.cos(n.wAngle); ny = Math.sin(n.wAngle);
    } else {
      const dx = n.bx - n.hubBx, dy = n.by - n.hubBy;
      const len = Math.sqrt(dx*dx+dy*dy) || 1;
      nx = dx/len; ny = dy/len;
    }
    const lx = n.x + nx*(r+4), ly = n.y + ny*(r+4);
    const fSize = isSel ? lerp(7.5, 13, zoomP) : 7.5;

    ctx.save();
    ctx.globalAlpha = alpha * (isHov ? 1 : 0.82);
    ctx.fillStyle   = isHov || (isSel && zoomP > 0.6) ? n.color : 'rgba(220,220,255,.88)';
    ctx.font        = `${isSel && zoomP > 0.4 ? 700 : 500} ${fSize}px 'Nunito',sans-serif`;
    ctx.textAlign   = nx>0.3?'left':nx<-0.3?'right':'center';
    ctx.textBaseline= ny>0.3?'top':ny<-0.3?'bottom':'middle';
    ctx.fillText(n.label, lx, ly);
    ctx.restore();
  }

  function drawHubNode(n, alpha) {
    const pulse  = 1 + Math.sin(t*1.8+n.phase)*0.055;
    const rBase  = lerp(n.r, n.r * 1.6, n.pillar===selectedPillar ? zoomP : 0);
    const r      = rBase * pulse;
    const isHov  = hoveredNode === n;
    const isSel  = n.pillar === selectedPillar;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = n.glow;
    ctx.shadowBlur  = isSel ? lerp(14, 42, zoomP) : isHov ? 22 : 12;

    /* Halo ring */
    ctx.beginPath(); ctx.arc(n.x, n.y, r+6, 0, Math.PI*2);
    ctx.strokeStyle = n.color; ctx.lineWidth = 0.6;
    ctx.globalAlpha = alpha * 0.22; ctx.stroke();

    ctx.globalAlpha = alpha;
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2);
    const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r);
    g.addColorStop(0, n.color+'55'); g.addColorStop(1, n.color+'18');
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = n.color; ctx.lineWidth = isSel ? lerp(1.6, 2.5, zoomP) : 1.6; ctx.stroke();
    ctx.restore();

    /* Hub label */
    const fSize = isSel ? lerp(10, 15, zoomP) : 10;
    ctx.save();
    ctx.globalAlpha  = alpha;
    ctx.shadowColor  = n.glow; ctx.shadowBlur = 7;
    ctx.fillStyle    = isSel && zoomP > 0.5 ? n.color : '#fff';
    ctx.font         = `900 ${fSize}px 'Nunito',sans-serif`;
    ctx.textAlign    = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(n.label.toUpperCase(), n.x, n.y);
    ctx.restore();
  }

  function drawParticle(x1,y1,x2,y2,prog,color) {
    const x=x1+(x2-x1)*prog, y=y1+(y2-y1)*prog;
    ctx.save(); ctx.shadowColor=color; ctx.shadowBlur=10;
    ctx.fillStyle=color; ctx.globalAlpha=0.9;
    ctx.beginPath(); ctx.arc(x,y,2.6,0,Math.PI*2); ctx.fill(); ctx.restore();
  }

  /* ─── INTERACTION ────────────────────────────────────────────── */
  function nd(id) { return nodes.find(n => n.id === id) || null; }

  function hitTest(ex, ey) {
    let best=null, bestD=Infinity;
    nodes.forEach(n => {
      const dx=n.x-ex, dy=n.y-ey, d=Math.sqrt(dx*dx+dy*dy);
      const hr = n.isHub ? n.r+14 : n.r+10;
      if (d<hr && d<bestD) { best=n; bestD=d; }
    });
    return best;
  }

  function onCanvasClick(e) {
    const r   = canvas.getBoundingClientRect();
    const hit = hitTest(e.clientX-r.left, e.clientY-r.top);
    if (hit) {
      if (selectedPillar === hit.pillar) {
        selectedPillar = null; zoomT = 0; // deselect → zoom out
      } else {
        selectedPillar = hit.pillar; zoomT = 1; // select → zoom in
      }
    } else {
      selectedPillar = null; zoomT = 0; // click background → zoom out
    }
    renderWordPanel();
  }

  function onCanvasHover(e) {
    const r = canvas.getBoundingClientRect();
    hoveredNode = hitTest(e.clientX-r.left, e.clientY-r.top);
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  }

  function onCanvasTouch(e) {
    e.preventDefault();
    const r  = canvas.getBoundingClientRect();
    const tc = e.changedTouches[0];
    const hit = hitTest(tc.clientX-r.left, tc.clientY-r.top);
    if (hit) {
      selectedPillar = selectedPillar===hit.pillar ? null : hit.pillar;
      zoomT = selectedPillar ? 1 : 0;
    } else {
      selectedPillar = null; zoomT = 0;
    }
    renderWordPanel();
  }

  /* ─── WORD GRID (big left column) ──────────────────────────────── */
  function renderWordGrid() {
    const grid = document.getElementById('hud-word-grid');
    if (!grid) return;

    /* ── My chosen words (top of grid) ── */
    let chosenHtml = '';
    if (myChosenWords.length > 0) {
      const chips = myChosenWords.map(({ word, category, hint }) => {
        const stKey  = 'lhud_my_' + word;
        const st     = parseInt(localStorage.getItem(stKey) || '0');
        const stCls  = st > 0 ? ' st' + st : '';
        const icon   = st === 0 ? '●' : st === 1 ? '↺' : '✓';
        const wSafe  = word.replace(/'/g, '&#39;');
        const hSafe  = hint.replace(/'/g, '&#39;');
        const catAb  = (category || 'Gen').slice(0, 3).toUpperCase();
        return `<span class="hwg-chip hwg-chip-mine${stCls}" data-key="${stKey}" style="--chip-color:#FACC15" title="${hSafe}"><span class="hwg-chip-txt" onclick="LexicalHUD.listen('${wSafe}','#FACC15')">${word}</span><span class="hwg-chip-cat" style="color:rgba(250,204,21,.6)">${catAb}</span><span class="hwg-chip-state" onclick="LexicalHUD.cycle(this)">${icon}</span><span class="hwg-chip-rm" onclick="LexicalHUD.removeWord('${wSafe}')">×</span></span>`;
      }).join('');
      chosenHtml = `<div class="hwg-section hwg-mine-section" id="hwg-mine">
        <div class="hwg-section-head">
          <span class="hwg-dot" style="background:#FACC15;box-shadow:0 0 8px #FACC15"></span>
          <span class="hwg-lbl" style="color:#FACC15">Mis Palabras · Esta Pregunta</span>
          <span class="hwg-badge" style="color:#FACC15;border-color:#FACC15">&#9733; ${myChosenWords.length} elegidas</span>
        </div>
        <div class="hwg-chips">${chips}</div>
      </div>`;
    }

    /* ── Hero: PARA ESTE EJERCICIO (AI + connectors) ── */
    const bank         = getVocabBank();
    const allBankWords = new Set(Object.values(bank).flatMap(arr => (arr || []).map(w => w.word)));

    let heroAiPart = '';
    if (aiVocabLoad) {
      heroAiPart = `<div class="hwg-hero-sub"><div class="hwg-ai-loading"><span class="hwg-ai-spin">🤖</span> <span>Generando vocabulario C1/C2…</span></div></div>`;
    } else if (aiSuggestions.length > 0) {
      const notChosen = aiSuggestions.filter(s => !allBankWords.has(s.word));
      if (notChosen.length > 0) {
        const aiChips = notChosen.map(({ word, category, hint }) => {
          const wSafe = word.replace(/'/g, '&#39;');
          const hSafe = hint.replace(/'/g, '&#39;');
          return `<span class="hwg-sug-chip hwg-sug-hero" onclick="LexicalHUD.addWord('${wSafe}','${category}','${hSafe}')" title="${hint}"><span class="hwg-sug-plus">&#65291;</span><span class="hwg-sug-word">${word}</span></span>`;
        }).join('');
        heroAiPart = `<div class="hwg-hero-sub">
          <div class="hwg-hero-sub-label hwg-ai-lbl">&#129302; VOCABULARIO IA &middot; C1/C2</div>
          <div class="hwg-hero-chips">${aiChips}</div>
        </div>`;
      }
    }

    // Build connectors (collapsed by default)
    const heroConnRaw = [];
    if (lastContextText) {
      const low = lastContextText.toLowerCase();
      const lp  = PILLARS.find(p => p.id === 'logical');
      if (lp) {
        const ranked = lp.words
          .map(w => ({ w, s: (CONNECTOR_KEYS[w] || []).filter(k => low.includes(k)).length }))
          .sort((a, b) => b.s - a.s);
        const matched = ranked.filter(x => x.s > 0).slice(0, 8).map(x => x.w);
        (matched.length >= 2 ? matched : STARTERS.logical.slice(0, 6)).forEach(w => heroConnRaw.push(w));
      }
    } else {
      STARTERS.logical.slice(0, 6).forEach(w => heroConnRaw.push(w));
    }
    const bankLogical = new Set((bank.logical || []).map(w => w.word));
    const connToShow  = heroConnRaw.filter(w => !bankLogical.has(w));
    const connChips   = connToShow.map(w => {
      const wSafe = w.replace(/'/g, '&#39;');
      return `<span class="hwg-sug-chip hwg-sug-hero hwg-conn-chip" onclick="LexicalHUD.addWord('${wSafe}','Connector','')" title="Agregar conector"><span class="hwg-sug-plus hwg-conn-plus">&#65291;</span><span class="hwg-sug-word hwg-conn-word">${w}</span></span>`;
    }).join('');
    const connSection = connToShow.length > 0
      ? `<div class="hwg-conn-toggle" onclick="LexicalHUD.toggleConn()">&#8680; Conectores <span>${showConnectors ? '&#9650;' : '&#9660;'}</span></div>
         ${showConnectors ? `<div class="hwg-hero-chips hwg-conn-row">${connChips}</div>` : ''}`
      : '';

    const heroHtml = `<div class="hwg-hero">
      <div class="hwg-hero-title">&#9889; VOCABULARIO PARA ESTE EJERCICIO</div>
      ${!heroAiPart && !aiVocabLoad ? `<div class="hwg-hero-empty">Empieza un ejercicio de Speaking para ver vocabulario C1/C2</div>` : ''}
      ${heroAiPart}
      ${connSection}
    </div>`;

    /* ── Mi banco de vocabulario (acumulado, oculto por defecto) ── */
    const bankTotal = Object.values(bank).reduce((n, arr) => n + (arr || []).length, 0);
    let bankHtml = '';
    if (bankTotal > 0) {
      const bankToggle = `<div class="hwg-bank-toggle" onclick="LexicalHUD.toggleBank()">
        &#128218; Mi vocabulario &middot; ${bankTotal} palabra${bankTotal !== 1 ? 's' : ''}
        <span class="hwg-bank-arrow">${showVocabBank ? '&#9650;' : '&#9660;'}</span>
      </div>`;
      let bankSections = '';
      if (showVocabBank) {
        bankSections = PILLARS.map(p => {
          const bWords = (bank[p.id] || []).filter(({ word }) => {
            const st = parseInt(localStorage.getItem('lhud_' + p.id + '_' + word) || '0');
            return showHiddenWords || st !== 3;
          });
          if (bWords.length === 0) return '';
          const chips = bWords.map(({ word }) => {
            const stKey = 'lhud_' + p.id + '_' + word;
            const st    = parseInt(localStorage.getItem(stKey) || '0');
            const stCls = st > 0 ? ' st' + st : '';
            const icon  = ['●','↺','✓','🚫'][st] || '●';
            const wSafe = word.replace(/'/g, '&#39;');
            return `<span class="hwg-chip${stCls}" data-key="${stKey}" style="--chip-color:${p.color}"><span class="hwg-chip-txt" onclick="LexicalHUD.listen('${wSafe}','${p.color}')">${word}</span><span class="hwg-chip-state" onclick="LexicalHUD.cycle(this)">${icon}</span><span class="hwg-chip-rm" onclick="LexicalHUD.rmBank('${wSafe}','${p.id}')">×</span></span>`;
          }).join('');
          return `<div class="hwg-section" id="hwg-bank-${p.id}" style="--sc:${p.color}">
            <div class="hwg-section-head">
              <span class="hwg-dot" style="background:${p.color};box-shadow:0 0 6px ${p.color}"></span>
              <span class="hwg-lbl" style="color:${p.color}">${p.label}</span>
              <span class="hwg-count">${bWords.length}</span>
            </div>
            <div class="hwg-chips">${chips}</div>
          </div>`;
        }).join('');
      }
      bankHtml = bankToggle + bankSections;
    }

    grid.innerHTML = heroHtml + bankHtml;

    /* Pronunciation practice bar — sticky bottom */
    if (pronWord) {
      const wSafe = pronWord.replace(/'/g, '&#39;');
      grid.innerHTML += `
      <div class="hwg-pron-bar" id="hwg-pron-bar">
        <div class="hwg-pron-head">
          <span class="hwg-pron-lbl">📢 PRONUNCIACIÓN</span>
          <button class="hwg-pron-close" onclick="LexicalHUD.closePron()">✕</button>
        </div>
        <div class="hwg-pron-body">
          <span class="hwg-pron-word" style="color:${pronColor}">${pronWord}</span>
          <div class="hwg-pron-btns">
            <button class="hwg-pron-btn" onclick="LexicalHUD.hear('${wSafe}')">🔊 Escuchar</button>
            <button class="hwg-pron-btn mic" id="hwg-pron-mic" onclick="LexicalHUD.startCheck()">🎤 Repetir</button>
          </div>
          <div class="hwg-pron-result" id="hwg-pron-result"></div>
        </div>
      </div>`;
    }
  }

  /* ─── CYCLE WORD STATE (new → repeat → mastered → hidden → new) ─── */
  function cycleState(btnEl) {
    const chip = btnEl.parentElement;
    if (!chip || !chip.dataset.key) return;
    const key  = chip.dataset.key;
    const cur  = parseInt(localStorage.getItem(key) || '0');
    const next = (cur + 1) % 4;
    localStorage.setItem(key, next);
    if (next === 3 || cur === 3) {
      renderWordGrid();
      return;
    }
    chip.classList.remove('st1', 'st2', 'st3', 'ctx');
    if (next > 0) chip.classList.add('st' + next);
    btnEl.textContent = ['●','↺','✓','🚫'][next];
  }

  /* ─── TOGGLE HIDDEN WORDS VISIBILITY ─────────────────────────────── */
  function toggleHidden() {
    showHiddenWords = !showHiddenWords;
    renderWordGrid();
  }

  /* ─── PRONUNCIATION PRACTICE ──────────────────────────────────── */
  function listenAndPractice(word, color) {
    if (pronActive) return;
    pronWord  = word;
    pronColor = color || '#C084FC';
    hearWord(word);
    renderWordGrid();
    requestAnimationFrame(() => {
      const bar = document.getElementById('hwg-pron-bar');
      if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function startPronCheck() {
    const SRC = window.SpeechRecognition || window.webkitSpeechRecognition;
    const result = document.getElementById('hwg-pron-result');
    const mic    = document.getElementById('hwg-pron-mic');
    if (!SRC) {
      if (result) result.innerHTML = '<span style="color:#F87171">⚠️ Usa Chrome para esta función</span>';
      return;
    }
    if (pronActive) return;
    pronActive = true;
    if (mic)    mic.textContent  = '🔴 Escuchando…';
    if (result) result.textContent = '';

    const rec = new SRC();
    rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 5;

    rec.onresult = (e) => {
      pronActive = false;
      if (mic) mic.textContent = '🎤 Repetir';
      const said = Array.from(e.results[0]).map(r => r.transcript.toLowerCase().trim());
      const tgt  = pronWord.toLowerCase().trim();
      const exact = said.some(s => s === tgt || s.includes(tgt) || tgt.includes(s));
      const close = !exact && said.some(s => levenshtein(s, tgt) <= Math.ceil(tgt.replace(/\s/g,'').length * 0.4));
      if (result) {
        if      (exact) result.innerHTML = '<span style="color:#4ADE80;font-size:.9rem">✅ ¡Excelente! Pronunciación correcta</span>';
        else if (close) result.innerHTML = `<span style="color:#FACC15;font-size:.85rem">⚠️ Casi — dijiste: "<em>${said[0]}</em>"</span>`;
        else            result.innerHTML = `<span style="color:#F87171;font-size:.85rem">❌ Dijiste: "<em>${said[0]}</em>" — inténtalo de nuevo</span>`;
      }
    };
    rec.onerror = () => {
      pronActive = false;
      if (mic)    mic.textContent = '🎤 Repetir';
      if (result) result.innerHTML = '<span style="color:#F87171">⚠️ Error — revisa permisos del micrófono</span>';
    };
    rec.onend = () => { pronActive = false; if (mic) mic.textContent = '🎤 Repetir'; };
    rec.start();
  }

  function closePronBar() {
    pronWord = ''; pronColor = '#C084FC'; pronActive = false;
    renderWordGrid();
  }

  /* ─── MY WORD LIST — user picks from AI suggestions ────────────── */
  function addWord(word, category, hint) {
    if (myChosenWords.some(w => w.word === word)) return;
    myChosenWords.push({ word, category, hint });
    hearWord(word);
    const pid  = CATEGORY_PILLAR[category] || 'academic';
    const bank = getVocabBank();
    if (!bank[pid]) bank[pid] = [];
    if (!bank[pid].some(w => w.word === word)) {
      bank[pid].push({ word, hint, category });
      saveVocabBank(bank);
    }
    showVocabBank = true;
    renderWordGrid();
  }

  function removeWord(word) {
    myChosenWords = myChosenWords.filter(w => w.word !== word);
    renderWordGrid();
  }

  function removeFromBank(word, pid) {
    const bank = getVocabBank();
    if (bank[pid]) {
      bank[pid] = bank[pid].filter(w => w.word !== word);
      saveVocabBank(bank);
    }
    myChosenWords = myChosenWords.filter(w => w.word !== word);
    renderWordGrid();
  }

  function toggleVocabBank() {
    showVocabBank = !showVocabBank;
    renderWordGrid();
  }

  function toggleConnectors() {
    showConnectors = !showConnectors;
    renderWordGrid();
  }

  /* ─── AI VOCABULARY GENERATION ──────────────────────────────────
     Calls Claude Haiku with the detected question → returns C1/C2
     words specific to that question. Cached in localStorage.
  ──────────────────────────────────────────────────────────────── */
  async function fetchAiVocab(questionText) {
    const apiKey = localStorage.getItem('claude_api_key');
    if (!apiKey || apiKey.length < 20) return [];

    const cacheKey = 'lhud_ai4_' + questionText.trim().slice(0, 80).toLowerCase().replace(/\W+/g, '_');
    const cached = localStorage.getItem(cacheKey);
    if (cached) { try { return JSON.parse(cached); } catch(e) {} }

    const prompt = `You are a DET (Duolingo English Test) vocabulary coach. A Spanish-speaking student must answer this 45-second speaking question:

"${questionText}"

List exactly 20 high-value SINGLE English words directly useful for THIS specific question. Strict rules:
- ONLY content words: nouns, adjectives, or verbs that fit THIS topic
- NO connectors, no discourse markers (furthermore, however, consequently, moreover — forbidden)
- NO phrases or compound words — single words only
- C1/C2 level: sophisticated, impressive to evaluators, NOT generic (no: important, good, nice, big, people, things, use, make)
- Prefer cognates with Spanish for easier pronunciation
- Must be words that would naturally appear in a spoken answer to THIS specific question
- Vary the types: mix nouns, adjectives AND verbs
- Format each line exactly as: WORD | TYPE | Spanish equivalent
  Types: Academic, Technical, Social, Emotional, Domestic, Power
- Output ONLY the 20 lines, nothing else.`;

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5',
          max_tokens: 700,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      if (!resp.ok) return [];
      const data = await resp.json();
      const raw  = (data.content && data.content[0] && data.content[0].text) || '';
      const words = raw.split('\n')
        .filter(l => l.includes('|'))
        .slice(0, 20)
        .map(l => {
          const parts = l.split('|').map(s => s.trim());
          return { word: parts[0], category: parts[1] || 'Academic', hint: parts[2] || '' };
        })
        .filter(w => w.word && w.word.length > 1 && w.word.length < 45);
      if (words.length > 0) localStorage.setItem(cacheKey, JSON.stringify(words));
      return words;
    } catch (e) { return []; }
  }

  async function loadAiVocab(questionText) {
    aiSuggestions = []; aiVocabLoad = true;
    renderWordGrid();
    aiSuggestions = await fetchAiVocab(questionText);
    aiVocabLoad   = false;
    renderWordGrid();
    if (aiSuggestions.length > 0) openHUD();
  }

  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({length: m+1}, (_, i) =>
      Array.from({length: n+1}, (_, j) => j === 0 ? i : 0));
    for (let j = 1; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1]
                 : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  }

  /* ─── WORD PANEL ─────────────────────────────────────────────── */
  function renderWordPanel() {
    /* Grid handles display; just highlight the selected section */
    const panel = document.getElementById('hud-word-panel');
    if (panel) { panel.innerHTML = ''; panel.classList.remove('visible'); }

    document.querySelectorAll('.hwg-section').forEach(el => el.classList.remove('sel'));
    if (selectedPillar) {
      const sec = document.getElementById('hwg-' + selectedPillar);
      if (sec) {
        sec.classList.add('sel');
        sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  /* ─── OPEN / CLOSE ───────────────────────────────────────────── */
  function openHUD() {
    const modal = document.getElementById('lexical-hud');
    if (!modal || isOpen) return;
    isOpen = true; modal.classList.add('open');
    showFabBadge(false);
    renderWordGrid();
    requestAnimationFrame(() => { onResize(); startAnim(); });
  }

  function closeHUD() {
    const modal = document.getElementById('lexical-hud');
    if (!modal || !isOpen) return;
    isOpen = false; modal.classList.remove('open');
    if (animId) { cancelAnimationFrame(animId); animId = null; }
  }

  function toggleHUD() { isOpen ? closeHUD() : openHUD(); }

  function hearWord(word) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US'; u.rate = 0.9;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }

  /* ─── INIT ───────────────────────────────────────────────────── */
  function init() {
    canvas = document.getElementById('hud-canvas');
    if (canvas) {
      ctx = canvas.getContext('2d');
      canvas.addEventListener('click',     onCanvasClick);
      canvas.addEventListener('mousemove', onCanvasHover);
      canvas.addEventListener('touchend',  onCanvasTouch, { passive: false });
      window.addEventListener('resize',    onResize);
    }
    renderContextPanel();
    watchQuestions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.LexicalHUD = {
    open: openHUD, close: closeHUD, toggle: toggleHUD,
    hear: hearWord, listen: listenAndPractice,
    cycle: cycleState, startCheck: startPronCheck, closePron: closePronBar,
    addWord, removeWord, rmBank: removeFromBank, toggleHidden, toggleBank: toggleVocabBank, toggleConn: toggleConnectors,
    setContext, clearContext
  };
})();
