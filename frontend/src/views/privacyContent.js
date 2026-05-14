export const privacyMeta = {
  en: { title: 'Privacy Policy',        sub: 'Last updated: 2025' },
  lt: { title: 'Privatumo politika',    sub: 'Paskutinį kartą atnaujinta: 2025 m.' },
  de: { title: 'Datenschutzrichtlinie', sub: 'Zuletzt aktualisiert: 2025' },
  es: { title: 'Política de privacidad',sub: 'Última actualización: 2025' },
  fr: { title: 'Politique de confidentialité', sub: 'Dernière mise à jour : 2025' },
  ru: { title: 'Политика конфиденциальности', sub: 'Последнее обновление: 2025' },
}

export const privacyIntro = {
  en: 'SaveUpNow is a free personal savings app created by <b>Simas Puleikis</b> and <b>Deimantas Česnaitis</b>. Project supervisor: <b>Žilvinas Z. Tarvydas</b>.',
  lt: 'SaveUpNow yra nemokama asmeninio taupymo programėlė, sukurta <b>Simo Puleikio</b> ir <b>Deimanio Česnaičio</b>. Projekto vadovas: <b>Žilvinas Z. Tarvydas</b>.',
  de: 'SaveUpNow ist eine kostenlose persönliche Spar-App, entwickelt von <b>Simas Puleikis</b> und <b>Deimantas Česnaitis</b>. Projektleiter: <b>Žilvinas Z. Tarvydas</b>.',
  es: 'SaveUpNow es una aplicación gratuita de ahorro personal creada por <b>Simas Puleikis</b> y <b>Deimantas Česnaitis</b>. Supervisor del proyecto: <b>Žilvinas Z. Tarvydas</b>.',
  fr: 'SaveUpNow est une application d\'épargne personnelle gratuite créée par <b>Simas Puleikis</b> et <b>Deimantas Česnaitis</b>. Responsable du projet : <b>Žilvinas Z. Tarvydas</b>.',
  ru: 'SaveUpNow — бесплатное приложение для личных сбережений, созданное <b>Симасом Пулейкисом</b> и <b>Дейментасом Чеснайтисом</b>. Руководитель проекта: <b>Жилвинас З. Тарвидас</b>.',
}

export const privacySections = {
  en: [
    {
      num: '1.', title: 'General Provisions',
      body: 'This Privacy Policy (hereinafter – Policy) establishes how our application "SaveUpNow" (hereinafter – App) collects, uses, stores and protects users\' personal data. The Policy applies to all persons using the App and has been drawn up in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council (GDPR) and the laws of the Republic of Lithuania.\n\nBy using the App, you confirm that you have read, understood and agree to the conditions set out in this Policy.',
    },
    {
      num: '2.', title: 'Data Controller',
      body: 'Data controllers: Simas Puleikis, Deimantas Česnaitis\nProject supervisor: Žilvinas Z. Tarvydas\nContact email for data protection enquiries: [contact to be provided]',
    },
    {
      num: '3.', title: 'Personal Data Collected',
      subsections: [
        {
          title: '3.1. Registration & Identity Data',
          items: [
            'Copy of identity document (submitted for age verification)',
            'Unique account unlock code',
            'Biometric data (fingerprint or face recognition) if the user chooses biometric login',
          ],
        },
        {
          title: '3.2. Financial Data',
          items: [
            'Income information (manually entered or automatically recorded)',
            'Expense data by category (e.g. food, entertainment, transport)',
            'Savings goals and progress',
            'Bank card transaction data (only if the user grants access)',
          ],
        },
        {
          title: '3.3. Usage Data',
          items: [
            'Device type and operating system (iOS)',
            'Login date and time',
            'App usage statistics',
          ],
        },
      ],
    },
    {
      num: '4.', title: 'Purposes and Legal Basis for Data Processing',
      body: 'Your personal data is processed for the following purposes:',
      items: [
        'User identity verification and age check – legal basis: contractual necessity and legal obligation.',
        'Creation of a personal savings plan and monitoring of financial goals – legal basis: contractual necessity.',
        'Sending automated reminders and motivational notifications – legal basis: user consent.',
        'Expense analysis and savings statistics – legal basis: contractual necessity.',
        'Ensuring App quality and security – legal basis: legitimate interest.',
        'Social savings feature (comparison with friends) – legal basis: user consent.',
      ],
    },
    {
      num: '5.', title: 'Data Storage and Security Measures',
      body: 'All user data is stored securely in cloud storage systems or local device memory, applying the following protective measures:',
      items: [
        'Data encryption in transit (SSL/TLS) and at rest (AES-256)',
        'Two-factor authentication (2FA)',
        'Biometric authentication (optional)',
        'Unique unlock code per user',
        'Access restrictions based on the principle of least privilege',
      ],
      footer: 'Identity document data is retained only as long as necessary for age verification, then deleted. Financial data is stored for the duration of App use and 12 months after account closure, unless otherwise required by law.',
    },
    {
      num: '6.', title: 'Data Transfer to Third Parties',
      body: 'We do not sell or transfer your personal data to third parties for commercial purposes. Data may only be shared in the following cases:',
      items: [
        'Technical service providers (e.g. cloud storage services) acting as data processors under separate GDPR-compliant agreements.',
        'Competent authorities when required by Lithuanian or EU law.',
        'In other cases – only with prior and explicit user consent.',
      ],
    },
    {
      num: '7.', title: 'User Rights',
      body: 'Under the GDPR, every user has the following rights:',
      items: [
        'Right of access – you may obtain a copy of all data being processed.',
        'Right to rectification – you may request correction of inaccurate or incomplete data.',
        'Right to erasure ("right to be forgotten") – you may request deletion of your data in cases provided by the GDPR.',
        'Right to restriction of processing – in certain cases you may restrict the processing of your data.',
        'Right to data portability – you may receive your data in a structured, commonly used format.',
        'Right to object – you may object to data processing for certain purposes.',
        'Right to withdraw consent – you may withdraw consent at any time without affecting the lawfulness of prior processing.',
      ],
      footer: 'To exercise these rights, contact us at the email address provided. We will respond within 30 days.',
    },
    {
      num: '8.', title: 'Protection of Minors',
      body: 'The App is intended only for persons aged 18 and over. Age must be verified by submitting a valid identity document. If we become aware that data was collected from a person under 18, such data will be immediately deleted.',
    },
    {
      num: '9.', title: 'Cookies and Other Tracking Tools',
      body: 'The App may use technical tools (e.g. local cache, session tokens) to ensure its proper operation. These tools are not used for advertising or behavioural tracking purposes.',
    },
    {
      num: '10.', title: 'Policy Changes',
      body: 'We reserve the right to amend this Policy. Users will be notified of material changes via the App or email. Continued use of the App after changes are published constitutes acceptance of the new terms.',
    },
    {
      num: '11.', title: 'Right to File a Complaint',
      body: 'If you believe your personal data is being processed in violation of applicable law, you have the right to file a complaint with the supervisory authority – the State Data Protection Inspectorate of the Republic of Lithuania:',
      items: [
        'Website: www.vdai.lrv.lt',
        'Email: ada@ada.lt',
        'Address: L. Sapiegos g. 17, LT-10312, Vilnius',
      ],
    },
  ],

  lt: [
    {
      num: '1.', title: 'Bendrosios nuostatos',
      body: 'Ši privatumo politika (toliau – Politika) nustato, kaip mūsų programa „SaveUpNow" (toliau – Programėlė) renka, naudoja, saugo ir apsaugo vartotojų asmens duomenis. Politika taikoma visiems asmenims, naudojantiems Programėlę, ir yra sudaryta vadovaujantis 2016 m. balandžio 27 d. Europos Parlamento ir Tarybos reglamentu (ES) 2016/679 (BDAR / GDPR) bei Lietuvos Respublikos teisės aktais.\n\nNaudodamiesi Programėle, jūs patvirtinate, kad perskaitėte, supratote ir sutinkate su šioje Politikoje nustatytomis sąlygomis.',
    },
    {
      num: '2.', title: 'Duomenų valdytojas',
      body: 'Duomenų valdytojai: Simas Puleikis, Deimantas Česnaitis\nProjekto vadovas: Žilvinas Z. Tarvydas\nKontaktinis el. pašto adresas dėl duomenų apsaugos klausimų: [nurodyti kontaktą]',
    },
    {
      num: '3.', title: 'Renkami asmens duomenys',
      subsections: [
        {
          title: '3.1. Registracijos ir tapatybės duomenys',
          items: [
            'Asmens tapatybės dokumento kopija (pateikiama amžiaus patvirtinimui)',
            'Unikalus paskyros atrakinimo kodas',
            'Biometriniai duomenys (piršto atspaudas arba veido atpažinimas), jeigu vartotojas pasirenka biometrinį prisijungimą',
          ],
        },
        {
          title: '3.2. Finansiniai duomenys',
          items: [
            'Pajamų informacija (rankiniu būdu įvesta arba automatiškai užregistruota)',
            'Išlaidų duomenys pagal kategorijas (pvz., maistas, pramogos, transportas)',
            'Taupymo tikslai ir progresas',
            'Banko kortelės operacijų duomenys (tik tuo atveju, jei vartotojas suteikia prieigą)',
          ],
        },
        {
          title: '3.3. Naudojimo duomenys',
          items: [
            'Įrenginio tipas ir operacinė sistema (iOS)',
            'Prisijungimo data ir laikas',
            'Programėlės naudojimo statistika',
          ],
        },
      ],
    },
    {
      num: '4.', title: 'Duomenų naudojimo tikslai ir teisinis pagrindas',
      body: 'Jūsų asmens duomenys tvarkomi šiais tikslais:',
      items: [
        'Vartotojo tapatybės patvirtinimas ir amžiaus tikrinimas – teisinis pagrindas: sutartinis būtinumas ir teisinė prievolė.',
        'Asmeninio taupymo plano sudarymas ir finansinių tikslų stebėjimas – teisinis pagrindas: sutartinis būtinumas.',
        'Automatinių priminimų ir motyvuojančių pranešimų siuntimas – teisinis pagrindas: vartotojo sutikimas.',
        'Išlaidų analizė ir taupymo statistikos pateikimas – teisinis pagrindas: sutartinis būtinumas.',
        'Programėlės kokybės ir saugumo užtikrinimas – teisinis pagrindas: teisėtas interesas.',
        'Socialinio taupymo funkcijos (lyginimas su draugais) – teisinis pagrindas: vartotojo sutikimas.',
      ],
    },
    {
      num: '5.', title: 'Duomenų saugojimas ir saugumo priemonės',
      body: 'Visi vartotojų duomenys saugomi saugiai – debesų saugojimo sistemose arba vietiniame įrenginio atmintyje, taikant šias apsaugos priemones:',
      items: [
        'Duomenų šifravimas perdavimo metu (SSL/TLS protokolai) ir saugojimo metu (AES-256)',
        'Dviejų veiksnių autentifikavimas (2FA)',
        'Biometrinė autentifikacija (pasirenkama)',
        'Unikalus atrakinimo kodas kiekvienam vartotojui',
        'Prieigos teisių apribojimas pagal minimalios prieigos principą',
      ],
      footer: 'Asmens tapatybės dokumento duomenys saugomi tik tiek laiko, kiek būtina amžiaus patvirtinimui, po to yra ištrinami. Finansiniai duomenys saugomi tol, kol vartotojas naudojasi Programėle ir dar 12 mėnesių po paskyros uždarymo, nebent teisės aktai numato kitaip.',
    },
    {
      num: '6.', title: 'Duomenų perdavimas trečiosioms šalims',
      body: 'Mes neparduodame ir neperduodame jūsų asmens duomenų trečiosioms šalims komerciniais tikslais. Duomenys gali būti perduodami tik šiais atvejais:',
      items: [
        'Techniniams paslaugų teikėjams (pvz., debesų saugojimo paslaugos), veikiantiems kaip duomenų tvarkytojai pagal atskiras sutartis, atitinkančias BDAR reikalavimus.',
        'Kompetentingoms institucijoms, kai to reikalauja Lietuvos Respublikos ar ES teisės aktai.',
        'Kitais atvejais – tik gavus išankstinį ir aiškų vartotojo sutikimą.',
      ],
    },
    {
      num: '7.', title: 'Vartotojo teisės',
      body: 'Vadovaujantis BDAR, kiekvienas vartotojas turi šias teises:',
      items: [
        'Teisė susipažinti su savo asmens duomenimis – galite gauti visų tvarkomų duomenų kopiją.',
        'Teisė ištaisyti – galite reikalauti ištaisyti netikslius ar nepilnus duomenis.',
        'Teisė ištrinti („teisė būti pamirštam") – galite reikalauti ištrinti savo duomenis tam tikrais BDAR numatytais atvejais.',
        'Teisė apriboti tvarkymą – tam tikrais atvejais galite apriboti savo duomenų tvarkymą.',
        'Teisė į duomenų perkeliamumą – galite gauti savo duomenis struktūruotu, įprastai naudojamu formatu.',
        'Teisė nesutikti – galite nesutikti su duomenų tvarkymu tam tikrais tikslais.',
        'Teisė atšaukti sutikimą – bet kada galite atšaukti duotą sutikimą, tai neturės įtakos iki atšaukimo atlikto tvarkymo teisėtumui.',
      ],
      footer: 'Norėdami pasinaudoti šiomis teisėmis, susisiekite su mumis nurodytu kontaktiniu el. pašto adresu. Į jūsų prašymą atsakysime ne vėliau kaip per 30 dienų.',
    },
    {
      num: '8.', title: 'Nepilnamečių apsauga',
      body: 'Programėlė skirta tik asmenims, kuriems suėjo 18 metų. Norint naudotis Programėle, privaloma patvirtinti savo amžių pateikiant galiojantį asmens tapatybės dokumentą. Jeigu sužinome, kad duomenis rinko jaunesnis nei 18 metų asmuo, tokie duomenys nedelsiant ištrinami.',
    },
    {
      num: '9.', title: 'Slapukai ir kiti sekimo įrankiai',
      body: 'Programėlė gali naudoti technines priemones (pvz., vietinę talpyklą, seanso žetonus) tinkamam jos veikimui užtikrinti. Šios priemonės nėra naudojamos reklamos tikslais ar elgsenos sekimui.',
    },
    {
      num: '10.', title: 'Politikos pakeitimai',
      body: 'Pasiliekame teisę keisti šią Politiką. Apie esminius pakeitimus informuosime vartotojus per Programėlę arba el. paštu. Tolesnį Programėlės naudojimą po pakeitimų paskelbimo laikome naujų sąlygų priėmimu.',
    },
    {
      num: '11.', title: 'Teisė pateikti skundą',
      body: 'Jeigu manote, kad jūsų asmens duomenys tvarkomi pažeidžiant galiojančius teisės aktus, turite teisę pateikti skundą priežiūros institucijai – Lietuvos Respublikos Valstybinei duomenų apsaugos inspekcijai:',
      items: [
        'Interneto svetainė: www.vdai.lrv.lt',
        'El. paštas: ada@ada.lt',
        'Adresas: L. Sapiegos g. 17, LT-10312, Vilnius',
      ],
    },
  ],

  de: [
    {
      num: '1.', title: 'Allgemeine Bestimmungen',
      body: 'Diese Datenschutzrichtlinie (nachfolgend – Richtlinie) legt fest, wie unsere Anwendung „SaveUpNow" (nachfolgend – App) personenbezogene Daten der Nutzer erhebt, verwendet, speichert und schützt. Die Richtlinie gilt für alle Personen, die die App nutzen, und wurde gemäß der Verordnung (EU) 2016/679 (DSGVO) und den Rechtsvorschriften der Republik Litauen erstellt.\n\nDurch die Nutzung der App bestätigen Sie, dass Sie diese Richtlinie gelesen und verstanden haben und den darin festgelegten Bedingungen zustimmen.',
    },
    {
      num: '2.', title: 'Verantwortlicher',
      body: 'Verantwortliche: Simas Puleikis, Deimantas Česnaitis\nProjektleiter: Žilvinas Z. Tarvydas\nKontakt-E-Mail für Datenschutzfragen: [Kontakt anzugeben]',
    },
    {
      num: '3.', title: 'Erhobene personenbezogene Daten',
      subsections: [
        {
          title: '3.1. Registrierungs- und Identitätsdaten',
          items: [
            'Kopie des Ausweisdokuments (zur Altersverifizierung)',
            'Eindeutiger Konto-Entsperrcode',
            'Biometrische Daten (Fingerabdruck oder Gesichtserkennung), wenn der Nutzer biometrische Anmeldung wählt',
          ],
        },
        {
          title: '3.2. Finanzdaten',
          items: [
            'Einkommensinformationen (manuell eingegeben oder automatisch erfasst)',
            'Ausgabendaten nach Kategorien (z. B. Lebensmittel, Unterhaltung, Transport)',
            'Sparziele und Fortschritt',
            'Bankkartentransaktionsdaten (nur wenn der Nutzer Zugriff gewährt)',
          ],
        },
        {
          title: '3.3. Nutzungsdaten',
          items: [
            'Gerätetyp und Betriebssystem (iOS)',
            'Anmeldedatum und -uhrzeit',
            'App-Nutzungsstatistiken',
          ],
        },
      ],
    },
    {
      num: '4.', title: 'Zwecke und Rechtsgrundlagen der Verarbeitung',
      body: 'Ihre personenbezogenen Daten werden für folgende Zwecke verarbeitet:',
      items: [
        'Identitätsverifizierung und Altersüberprüfung – Rechtsgrundlage: vertragliche Notwendigkeit und rechtliche Verpflichtung.',
        'Erstellung eines persönlichen Sparplans und Überwachung der Finanzziele – Rechtsgrundlage: vertragliche Notwendigkeit.',
        'Versand automatischer Erinnerungen und Motivationsnachrichten – Rechtsgrundlage: Einwilligung des Nutzers.',
        'Ausgabenanalyse und Sparstatistiken – Rechtsgrundlage: vertragliche Notwendigkeit.',
        'Sicherstellung der App-Qualität und -Sicherheit – Rechtsgrundlage: berechtigtes Interesse.',
        'Soziale Sparfunktion (Vergleich mit Freunden) – Rechtsgrundlage: Einwilligung des Nutzers.',
      ],
    },
    {
      num: '5.', title: 'Datenspeicherung und Sicherheitsmaßnahmen',
      body: 'Alle Nutzerdaten werden sicher in Cloud-Speichersystemen oder im lokalen Gerätespeicher unter folgenden Schutzmaßnahmen gespeichert:',
      items: [
        'Datenverschlüsselung bei der Übertragung (SSL/TLS) und im Ruhezustand (AES-256)',
        'Zwei-Faktor-Authentifizierung (2FA)',
        'Biometrische Authentifizierung (optional)',
        'Eindeutiger Entsperrcode pro Nutzer',
        'Zugangsbeschränkungen nach dem Prinzip der minimalen Rechtevergabe',
      ],
      footer: 'Ausweisdokumentdaten werden nur so lange aufbewahrt, wie für die Altersverifizierung erforderlich, danach gelöscht. Finanzdaten werden für die Nutzungsdauer der App und 12 Monate nach Kontoschließung gespeichert, sofern nicht gesetzlich anders vorgeschrieben.',
    },
    {
      num: '6.', title: 'Datenweitergabe an Dritte',
      body: 'Wir verkaufen oder übermitteln Ihre personenbezogenen Daten nicht zu kommerziellen Zwecken an Dritte. Daten können nur in folgenden Fällen weitergegeben werden:',
      items: [
        'Technische Dienstleister (z. B. Cloud-Speicherdienste) als Auftragsverarbeiter gemäß DSGVO-konformen Verträgen.',
        'Zuständige Behörden, wenn dies nach litauischem oder EU-Recht erforderlich ist.',
        'In anderen Fällen – nur mit vorheriger ausdrücklicher Einwilligung des Nutzers.',
      ],
    },
    {
      num: '7.', title: 'Rechte der Nutzer',
      body: 'Gemäß DSGVO hat jeder Nutzer folgende Rechte:',
      items: [
        'Auskunftsrecht – Sie können eine Kopie aller verarbeiteten Daten erhalten.',
        'Recht auf Berichtigung – Sie können die Korrektur unrichtiger oder unvollständiger Daten verlangen.',
        'Recht auf Löschung („Recht auf Vergessenwerden") – Sie können die Löschung Ihrer Daten in den von der DSGVO vorgesehenen Fällen verlangen.',
        'Recht auf Einschränkung der Verarbeitung – In bestimmten Fällen können Sie die Verarbeitung Ihrer Daten einschränken.',
        'Recht auf Datenübertragbarkeit – Sie können Ihre Daten in einem strukturierten, gängigen Format erhalten.',
        'Widerspruchsrecht – Sie können der Verarbeitung Ihrer Daten für bestimmte Zwecke widersprechen.',
        'Recht auf Widerruf der Einwilligung – Sie können Ihre Einwilligung jederzeit widerrufen, ohne dass die Rechtmäßigkeit der bisherigen Verarbeitung berührt wird.',
      ],
      footer: 'Um diese Rechte auszuüben, kontaktieren Sie uns unter der angegebenen E-Mail-Adresse. Wir antworten innerhalb von 30 Tagen.',
    },
    {
      num: '8.', title: 'Schutz Minderjähriger',
      body: 'Die App richtet sich ausschließlich an Personen ab 18 Jahren. Zur Nutzung muss das Alter durch ein gültiges Ausweisdokument bestätigt werden. Sollten wir feststellen, dass Daten von einer Person unter 18 Jahren erhoben wurden, werden diese Daten unverzüglich gelöscht.',
    },
    {
      num: '9.', title: 'Cookies und andere Tracking-Tools',
      body: 'Die App kann technische Mittel (z. B. lokalen Cache, Sitzungstoken) verwenden, um ihren ordnungsgemäßen Betrieb zu gewährleisten. Diese Mittel werden nicht für Werbezwecke oder Verhaltens-Tracking verwendet.',
    },
    {
      num: '10.', title: 'Änderungen der Richtlinie',
      body: 'Wir behalten uns das Recht vor, diese Richtlinie zu ändern. Über wesentliche Änderungen werden die Nutzer über die App oder per E-Mail informiert. Die weitere Nutzung der App nach der Veröffentlichung von Änderungen gilt als Annahme der neuen Bedingungen.',
    },
    {
      num: '11.', title: 'Recht auf Beschwerde',
      body: 'Wenn Sie der Meinung sind, dass Ihre personenbezogenen Daten unter Verstoß gegen geltendes Recht verarbeitet werden, haben Sie das Recht, eine Beschwerde bei der Aufsichtsbehörde einzureichen – der Staatlichen Datenschutzinspektion der Republik Litauen:',
      items: [
        'Website: www.vdai.lrv.lt',
        'E-Mail: ada@ada.lt',
        'Adresse: L. Sapiegos g. 17, LT-10312, Vilnius',
      ],
    },
  ],

  es: [
    {
      num: '1.', title: 'Disposiciones Generales',
      body: 'Esta política de privacidad (en adelante – Política) establece cómo nuestra aplicación "SaveUpNow" (en adelante – App) recopila, utiliza, almacena y protege los datos personales de los usuarios. La Política se aplica a todas las personas que utilizan la App y ha sido elaborada de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la legislación de la República de Lituania.\n\nAl utilizar la App, confirma que ha leído, comprendido y acepta las condiciones establecidas en esta Política.',
    },
    {
      num: '2.', title: 'Responsable del Tratamiento',
      body: 'Responsables: Simas Puleikis, Deimantas Česnaitis\nSupervisor del proyecto: Žilvinas Z. Tarvydas\nCorreo electrónico de contacto para consultas de protección de datos: [indicar contacto]',
    },
    {
      num: '3.', title: 'Datos Personales Recopilados',
      subsections: [
        {
          title: '3.1. Datos de registro e identidad',
          items: [
            'Copia del documento de identidad (presentada para verificación de edad)',
            'Código de desbloqueo de cuenta único',
            'Datos biométricos (huella dactilar o reconocimiento facial) si el usuario elige inicio de sesión biométrico',
          ],
        },
        {
          title: '3.2. Datos financieros',
          items: [
            'Información de ingresos (introducida manualmente o registrada automáticamente)',
            'Datos de gastos por categoría (p. ej. alimentación, entretenimiento, transporte)',
            'Metas de ahorro y progreso',
            'Datos de transacciones de tarjeta bancaria (solo si el usuario otorga acceso)',
          ],
        },
        {
          title: '3.3. Datos de uso',
          items: [
            'Tipo de dispositivo y sistema operativo (iOS)',
            'Fecha y hora de inicio de sesión',
            'Estadísticas de uso de la App',
          ],
        },
      ],
    },
    {
      num: '4.', title: 'Finalidades y Bases Legales del Tratamiento',
      body: 'Sus datos personales se tratan para los siguientes fines:',
      items: [
        'Verificación de identidad y comprobación de edad – base legal: necesidad contractual y obligación legal.',
        'Elaboración de un plan de ahorro personal y seguimiento de objetivos financieros – base legal: necesidad contractual.',
        'Envío de recordatorios automáticos y notificaciones motivacionales – base legal: consentimiento del usuario.',
        'Análisis de gastos y estadísticas de ahorro – base legal: necesidad contractual.',
        'Garantía de calidad y seguridad de la App – base legal: interés legítimo.',
        'Función de ahorro social (comparación con amigos) – base legal: consentimiento del usuario.',
      ],
    },
    {
      num: '5.', title: 'Almacenamiento y Medidas de Seguridad',
      body: 'Todos los datos de los usuarios se almacenan de forma segura en sistemas de almacenamiento en la nube o en la memoria local del dispositivo, aplicando las siguientes medidas de protección:',
      items: [
        'Cifrado de datos en tránsito (SSL/TLS) y en reposo (AES-256)',
        'Autenticación de dos factores (2FA)',
        'Autenticación biométrica (opcional)',
        'Código de desbloqueo único por usuario',
        'Restricciones de acceso basadas en el principio de mínimo privilegio',
      ],
      footer: 'Los datos del documento de identidad se conservan solo el tiempo necesario para la verificación de edad y luego se eliminan. Los datos financieros se conservan durante el uso de la App y 12 meses después del cierre de la cuenta, salvo que la ley exija lo contrario.',
    },
    {
      num: '6.', title: 'Transferencia de Datos a Terceros',
      body: 'No vendemos ni transferimos sus datos personales a terceros con fines comerciales. Los datos solo pueden compartirse en los siguientes casos:',
      items: [
        'Proveedores de servicios técnicos (p. ej. servicios de almacenamiento en la nube) que actúen como encargados del tratamiento conforme al RGPD.',
        'Autoridades competentes cuando lo exija la legislación lituana o de la UE.',
        'En otros casos, solo con consentimiento previo y explícito del usuario.',
      ],
    },
    {
      num: '7.', title: 'Derechos de los Usuarios',
      body: 'De conformidad con el RGPD, cada usuario tiene los siguientes derechos:',
      items: [
        'Derecho de acceso – puede obtener una copia de todos los datos tratados.',
        'Derecho de rectificación – puede solicitar la corrección de datos inexactos o incompletos.',
        'Derecho de supresión ("derecho al olvido") – puede solicitar la eliminación de sus datos en los casos previstos por el RGPD.',
        'Derecho a la limitación del tratamiento – en ciertos casos puede limitar el tratamiento de sus datos.',
        'Derecho a la portabilidad – puede recibir sus datos en un formato estructurado y de uso común.',
        'Derecho de oposición – puede oponerse al tratamiento de sus datos para determinados fines.',
        'Derecho a retirar el consentimiento – puede retirar su consentimiento en cualquier momento sin afectar la licitud del tratamiento previo.',
      ],
      footer: 'Para ejercer estos derechos, contáctenos en el correo electrónico indicado. Responderemos en un plazo máximo de 30 días.',
    },
    {
      num: '8.', title: 'Protección de Menores',
      body: 'La App está destinada únicamente a personas mayores de 18 años. Para utilizar la App es obligatorio verificar la edad mediante un documento de identidad válido. Si descubrimos que los datos fueron recopilados de una persona menor de 18 años, dichos datos serán eliminados inmediatamente.',
    },
    {
      num: '9.', title: 'Cookies y Otras Herramientas de Seguimiento',
      body: 'La App puede utilizar medios técnicos (p. ej. caché local, tokens de sesión) para garantizar su correcto funcionamiento. Estos medios no se utilizan con fines publicitarios ni para el seguimiento del comportamiento.',
    },
    {
      num: '10.', title: 'Cambios en la Política',
      body: 'Nos reservamos el derecho de modificar esta Política. Los usuarios serán informados de cambios sustanciales a través de la App o por correo electrónico. El uso continuado de la App tras la publicación de cambios implica la aceptación de las nuevas condiciones.',
    },
    {
      num: '11.', title: 'Derecho a Presentar una Reclamación',
      body: 'Si considera que sus datos personales se tratan en infracción de la legislación vigente, tiene derecho a presentar una reclamación ante la autoridad supervisora – la Inspección Estatal de Protección de Datos de la República de Lituania:',
      items: [
        'Sitio web: www.vdai.lrv.lt',
        'Correo electrónico: ada@ada.lt',
        'Dirección: L. Sapiegos g. 17, LT-10312, Vilnius',
      ],
    },
  ],

  fr: [
    {
      num: '1.', title: 'Dispositions Générales',
      body: 'La présente politique de confidentialité (ci-après – Politique) définit la manière dont notre application « SaveUpNow » (ci-après – Application) collecte, utilise, conserve et protège les données personnelles des utilisateurs. La Politique s\'applique à toutes les personnes utilisant l\'Application et a été rédigée conformément au règlement (UE) 2016/679 (RGPD) et à la législation de la République de Lituanie.\n\nEn utilisant l\'Application, vous confirmez avoir lu, compris et accepté les conditions énoncées dans la présente Politique.',
    },
    {
      num: '2.', title: 'Responsable du Traitement',
      body: 'Responsables du traitement : Simas Puleikis, Deimantas Česnaitis\nResponsable du projet : Žilvinas Z. Tarvydas\nAdresse e-mail de contact pour les questions de protection des données : [à préciser]',
    },
    {
      num: '3.', title: 'Données Personnelles Collectées',
      subsections: [
        {
          title: '3.1. Données d\'inscription et d\'identité',
          items: [
            'Copie du document d\'identité (fournie pour la vérification de l\'âge)',
            'Code de déverrouillage de compte unique',
            'Données biométriques (empreinte digitale ou reconnaissance faciale) si l\'utilisateur choisit la connexion biométrique',
          ],
        },
        {
          title: '3.2. Données financières',
          items: [
            'Informations sur les revenus (saisies manuellement ou enregistrées automatiquement)',
            'Données de dépenses par catégorie (p. ex. alimentation, loisirs, transport)',
            'Objectifs d\'épargne et progression',
            'Données de transactions de carte bancaire (uniquement si l\'utilisateur y accorde l\'accès)',
          ],
        },
        {
          title: '3.3. Données d\'utilisation',
          items: [
            'Type d\'appareil et système d\'exploitation (iOS)',
            'Date et heure de connexion',
            'Statistiques d\'utilisation de l\'Application',
          ],
        },
      ],
    },
    {
      num: '4.', title: 'Finalités et Bases Légales du Traitement',
      body: 'Vos données personnelles sont traitées aux fins suivantes :',
      items: [
        'Vérification de l\'identité et contrôle de l\'âge – base légale : nécessité contractuelle et obligation légale.',
        'Établissement d\'un plan d\'épargne personnel et suivi des objectifs financiers – base légale : nécessité contractuelle.',
        'Envoi de rappels automatiques et de notifications de motivation – base légale : consentement de l\'utilisateur.',
        'Analyse des dépenses et fourniture de statistiques d\'épargne – base légale : nécessité contractuelle.',
        'Garantie de la qualité et de la sécurité de l\'Application – base légale : intérêt légitime.',
        'Fonction d\'épargne sociale (comparaison avec des amis) – base légale : consentement de l\'utilisateur.',
      ],
    },
    {
      num: '5.', title: 'Conservation des Données et Mesures de Sécurité',
      body: 'Toutes les données des utilisateurs sont stockées en toute sécurité dans des systèmes de stockage en nuage ou dans la mémoire locale de l\'appareil, avec les mesures de protection suivantes :',
      items: [
        'Chiffrement des données en transit (SSL/TLS) et au repos (AES-256)',
        'Authentification à deux facteurs (2FA)',
        'Authentification biométrique (optionnelle)',
        'Code de déverrouillage unique par utilisateur',
        'Restrictions d\'accès selon le principe du moindre privilège',
      ],
      footer: 'Les données du document d\'identité ne sont conservées que le temps nécessaire à la vérification de l\'âge, puis supprimées. Les données financières sont conservées pendant l\'utilisation de l\'Application et 12 mois après la clôture du compte, sauf disposition légale contraire.',
    },
    {
      num: '6.', title: 'Transfert de Données à des Tiers',
      body: 'Nous ne vendons ni ne transférons vos données personnelles à des tiers à des fins commerciales. Les données ne peuvent être partagées que dans les cas suivants :',
      items: [
        'Prestataires de services techniques (p. ex. services de stockage en nuage) agissant en tant que sous-traitants dans le cadre de contrats conformes au RGPD.',
        'Autorités compétentes lorsque la législation lituanienne ou européenne l\'exige.',
        'Dans d\'autres cas, uniquement avec le consentement préalable et explicite de l\'utilisateur.',
      ],
    },
    {
      num: '7.', title: 'Droits des Utilisateurs',
      body: 'Conformément au RGPD, chaque utilisateur dispose des droits suivants :',
      items: [
        'Droit d\'accès – vous pouvez obtenir une copie de toutes les données traitées.',
        'Droit de rectification – vous pouvez demander la correction de données inexactes ou incomplètes.',
        'Droit à l\'effacement (« droit à l\'oubli ») – vous pouvez demander la suppression de vos données dans les cas prévus par le RGPD.',
        'Droit à la limitation du traitement – dans certains cas, vous pouvez limiter le traitement de vos données.',
        'Droit à la portabilité – vous pouvez recevoir vos données dans un format structuré et couramment utilisé.',
        'Droit d\'opposition – vous pouvez vous opposer au traitement de vos données à certaines fins.',
        'Droit de retirer le consentement – vous pouvez retirer votre consentement à tout moment sans affecter la licéité du traitement antérieur.',
      ],
      footer: 'Pour exercer ces droits, contactez-nous à l\'adresse e-mail indiquée. Nous répondrons dans un délai de 30 jours.',
    },
    {
      num: '8.', title: 'Protection des Mineurs',
      body: 'L\'Application est destinée uniquement aux personnes âgées de 18 ans et plus. Pour utiliser l\'Application, l\'âge doit être vérifié au moyen d\'un document d\'identité valide. Si nous apprenons que des données ont été collectées auprès d\'une personne de moins de 18 ans, ces données seront immédiatement supprimées.',
    },
    {
      num: '9.', title: 'Cookies et Autres Outils de Suivi',
      body: 'L\'Application peut utiliser des moyens techniques (p. ex. cache local, jetons de session) pour assurer son bon fonctionnement. Ces moyens ne sont pas utilisés à des fins publicitaires ou de suivi comportemental.',
    },
    {
      num: '10.', title: 'Modifications de la Politique',
      body: 'Nous nous réservons le droit de modifier la présente Politique. Les utilisateurs seront informés des modifications importantes via l\'Application ou par e-mail. La poursuite de l\'utilisation de l\'Application après la publication des modifications vaut acceptation des nouvelles conditions.',
    },
    {
      num: '11.', title: 'Droit de Déposer une Réclamation',
      body: 'Si vous estimez que vos données personnelles sont traitées en violation de la législation applicable, vous avez le droit de déposer une réclamation auprès de l\'autorité de contrôle – l\'Inspection nationale de la protection des données de la République de Lituanie :',
      items: [
        'Site web : www.vdai.lrv.lt',
        'E-mail : ada@ada.lt',
        'Adresse : L. Sapiegos g. 17, LT-10312, Vilnius',
      ],
    },
  ],

  ru: [
    {
      num: '1.', title: 'Общие положения',
      body: 'Настоящая политика конфиденциальности (далее – Политика) устанавливает, как наше приложение «SaveUpNow» (далее – Приложение) собирает, использует, хранит и защищает персональные данные пользователей. Политика распространяется на всех лиц, использующих Приложение, и составлена в соответствии с Регламентом (ЕС) 2016/679 (GDPR) и законодательством Литовской Республики.\n\nИспользуя Приложение, вы подтверждаете, что прочитали, поняли и согласны с условиями, установленными в настоящей Политике.',
    },
    {
      num: '2.', title: 'Контролёр данных',
      body: 'Контролёры данных: Симас Пулейкис, Дейментас Чеснайтис\nРуководитель проекта: Жилвинас З. Тарвидас\nКонтактный адрес электронной почты по вопросам защиты данных: [указать контакт]',
    },
    {
      num: '3.', title: 'Собираемые персональные данные',
      subsections: [
        {
          title: '3.1. Регистрационные и идентификационные данные',
          items: [
            'Копия документа, удостоверяющего личность (предоставляется для подтверждения возраста)',
            'Уникальный код разблокировки учётной записи',
            'Биометрические данные (отпечаток пальца или распознавание лица), если пользователь выбирает биометрический вход',
          ],
        },
        {
          title: '3.2. Финансовые данные',
          items: [
            'Информация о доходах (введённая вручную или зарегистрированная автоматически)',
            'Данные о расходах по категориям (напр., питание, развлечения, транспорт)',
            'Цели накоплений и прогресс',
            'Данные о транзакциях банковской карты (только если пользователь предоставил доступ)',
          ],
        },
        {
          title: '3.3. Данные об использовании',
          items: [
            'Тип устройства и операционная система (iOS)',
            'Дата и время входа в систему',
            'Статистика использования Приложения',
          ],
        },
      ],
    },
    {
      num: '4.', title: 'Цели и правовые основания обработки данных',
      body: 'Ваши персональные данные обрабатываются в следующих целях:',
      items: [
        'Подтверждение личности пользователя и проверка возраста – правовое основание: договорная необходимость и правовое обязательство.',
        'Составление личного плана накоплений и отслеживание финансовых целей – правовое основание: договорная необходимость.',
        'Отправка автоматических напоминаний и мотивационных уведомлений – правовое основание: согласие пользователя.',
        'Анализ расходов и предоставление статистики накоплений – правовое основание: договорная необходимость.',
        'Обеспечение качества и безопасности Приложения – правовое основание: законный интерес.',
        'Функция социальных накоплений (сравнение с друзьями) – правовое основание: согласие пользователя.',
      ],
    },
    {
      num: '5.', title: 'Хранение данных и меры безопасности',
      body: 'Все данные пользователей хранятся в облачных системах хранения или в локальной памяти устройства с применением следующих мер защиты:',
      items: [
        'Шифрование данных при передаче (SSL/TLS) и при хранении (AES-256)',
        'Двухфакторная аутентификация (2FA)',
        'Биометрическая аутентификация (по выбору)',
        'Уникальный код разблокировки для каждого пользователя',
        'Ограничение доступа по принципу минимальных привилегий',
      ],
      footer: 'Данные документа, удостоверяющего личность, хранятся только столько времени, сколько необходимо для подтверждения возраста, после чего удаляются. Финансовые данные хранятся в течение всего периода использования Приложения и ещё 12 месяцев после закрытия учётной записи, если иное не предусмотрено законом.',
    },
    {
      num: '6.', title: 'Передача данных третьим лицам',
      body: 'Мы не продаём и не передаём ваши персональные данные третьим лицам в коммерческих целях. Данные могут передаваться только в следующих случаях:',
      items: [
        'Техническим поставщикам услуг (напр., облачного хранения), действующим в качестве обработчиков данных в соответствии с GDPR.',
        'Компетентным органам, когда этого требует законодательство Литвы или ЕС.',
        'В иных случаях – только при наличии предварительного явного согласия пользователя.',
      ],
    },
    {
      num: '7.', title: 'Права пользователей',
      body: 'В соответствии с GDPR каждый пользователь имеет следующие права:',
      items: [
        'Право на доступ – вы можете получить копию всех обрабатываемых данных.',
        'Право на исправление – вы можете потребовать исправления неточных или неполных данных.',
        'Право на удаление («право быть забытым») – вы можете потребовать удаления своих данных в случаях, предусмотренных GDPR.',
        'Право на ограничение обработки – в определённых случаях вы можете ограничить обработку своих данных.',
        'Право на переносимость данных – вы можете получить свои данные в структурированном общепринятом формате.',
        'Право на возражение – вы можете возражать против обработки данных в определённых целях.',
        'Право отозвать согласие – вы можете отозвать согласие в любое время, что не повлияет на законность предыдущей обработки.',
      ],
      footer: 'Для реализации этих прав свяжитесь с нами по указанному адресу электронной почты. Мы ответим не позднее чем через 30 дней.',
    },
    {
      num: '8.', title: 'Защита несовершеннолетних',
      body: 'Приложение предназначено исключительно для лиц старше 18 лет. Для использования Приложения необходимо подтвердить возраст, предъявив действующий документ, удостоверяющий личность. Если нам станет известно, что данные были собраны у лица моложе 18 лет, такие данные будут немедленно удалены.',
    },
    {
      num: '9.', title: 'Файлы cookie и другие инструменты отслеживания',
      body: 'Приложение может использовать технические средства (напр., локальный кэш, токены сеанса) для обеспечения своей корректной работы. Эти средства не используются в рекламных целях или для поведенческого отслеживания.',
    },
    {
      num: '10.', title: 'Изменения Политики',
      body: 'Мы оставляем за собой право вносить изменения в настоящую Политику. О существенных изменениях пользователи будут уведомлены через Приложение или по электронной почте. Продолжение использования Приложения после публикации изменений означает принятие новых условий.',
    },
    {
      num: '11.', title: 'Право на подачу жалобы',
      body: 'Если вы считаете, что ваши персональные данные обрабатываются с нарушением действующего законодательства, вы имеете право подать жалобу в надзорный орган – Государственную инспекцию защиты данных Литовской Республики:',
      items: [
        'Веб-сайт: www.vdai.lrv.lt',
        'Электронная почта: ada@ada.lt',
        'Адрес: L. Sapiegos g. 17, LT-10312, Vilnius',
      ],
    },
  ],
}

export const privacyFooter = {
  en: { line1: 'Document prepared by: Simas Puleikis, Deimantas Česnaitis', line2: 'Project supervisor: Žilvinas Z. Tarvydas', line3: 'Kaunas, 2025–2026' },
  lt: { line1: 'Dokumentą parengė: Simas Puleikis, Deimantas Česnaitis', line2: 'Projekto vadovas: Žilvinas Z. Tarvydas', line3: 'Kaunas, 2025–2026 m.' },
  de: { line1: 'Dokument erstellt von: Simas Puleikis, Deimantas Česnaitis', line2: 'Projektleiter: Žilvinas Z. Tarvydas', line3: 'Kaunas, 2025–2026' },
  es: { line1: 'Documento elaborado por: Simas Puleikis, Deimantas Česnaitis', line2: 'Supervisor del proyecto: Žilvinas Z. Tarvydas', line3: 'Kaunas, 2025–2026' },
  fr: { line1: 'Document rédigé par : Simas Puleikis, Deimantas Česnaitis', line2: 'Responsable du projet : Žilvinas Z. Tarvydas', line3: 'Kaunas, 2025–2026' },
  ru: { line1: 'Документ подготовили: Симас Пулейкис, Дейментас Чеснайтис', line2: 'Руководитель проекта: Жилвинас З. Тарвидас', line3: 'Каунас, 2025–2026' },
}
