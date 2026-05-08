import type { ComplianceRule } from "../types";

export const complianceRules: ComplianceRule[] = [
  {
    id: "gdpr-data-minimization-001",
    regulation: "GDPR",
    title: "Minimalizuj dane zbierane w procesie",
    description: "Proces powinien zbierać tylko dane potrzebne do jasno określonego celu.",
    legalReference: "GDPR Art. 5(1)(c)",
    appliesWhen: [
      { field: "dataTypes", operator: "includes", value: "personal_data" },
      { field: "answers.storesData", operator: "is_true" }
    ],
    question: "Czy proces zbiera dane osobowe, które nie są niezbędne do wykonania głównej akcji?",
    riskLevel: "medium",
    engineeringControl: "Ogranicz domyślny payload i przenieś opcjonalne pola do późniejszych etapów.",
    riskExplanation: "Nadmiarowe dane zwiększają skutki incydentu i utrudniają uzasadnienie celu przetwarzania.",
    businessImpact: "Może wydłużyć audyt i wymagać zmian w formularzach, dokumentacji oraz polityce prywatności.",
    remediationTasks: [
      "Przejrzyj wszystkie pola formularza i oznacz dane opcjonalne.",
      "Usuń pola, które nie są wymagane do wykonania procesu.",
      "Udokumentuj cel przetwarzania dla każdego pozostawionego atrybutu."
    ],
    evidenceExamples: [
      "Mapa pól formularza z przypisanym celem przetwarzania",
      "Zrzut ekranu uproszczonego formularza",
      "Fragment dokumentacji produktowej"
    ],
    answerKey: "storesData",
    failWhen: true
  },
  {
    id: "gdpr-purpose-notice-001",
    regulation: "GDPR",
    title: "Wyjaśnij cel przetwarzania danych",
    description: "Użytkownik powinien wiedzieć, dlaczego dane są zbierane przed ich wysłaniem.",
    legalReference: "GDPR Art. 5(1)(b), Art. 13",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy interfejs pokazuje cel przetwarzania i link do właściwej informacji prywatności?",
    riskLevel: "medium",
    engineeringControl: "Dodaj krótki opis celu przy formularzu i wersjonowany link do polityki prywatności.",
    riskExplanation: "Brak jasnego celu utrudnia wykazanie przejrzystości i ograniczenia celu przetwarzania.",
    businessImpact: "Może obniżyć zaufanie użytkowników i zwiększyć liczbę pytań podczas audytu.",
    remediationTasks: [
      "Dodaj copy o celu przetwarzania obok formularza.",
      "Wersjonuj politykę prywatności widoczną w momencie zbierania danych.",
      "Zapisuj wersję informacji prywatności dla regulowanych formularzy."
    ],
    evidenceExamples: [
      "Zrzut ekranu formularza z informacją o celu",
      "Historia wersji polityki prywatności",
      "Specyfikacja danych zbieranych w procesie"
    ],
    answerKey: "privacyNotice",
    failWhen: false
  },
  {
    id: "gdpr-consent-proof-001",
    regulation: "GDPR",
    title: "Zapisuj historię zgód",
    description: "Zgody marketingowe i opcjonalne powinny mieć trwały dowód pozyskania.",
    legalReference: "GDPR Art. 7",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "marketing_consent_data" }],
    question: "Czy system zapisuje kiedy, jak i na jaki cel użytkownik wyraził zgodę?",
    riskLevel: "high",
    engineeringControl: "Utwórz ledger zgód z timestampem, źródłem, celem i wersją polityki.",
    riskExplanation: "Bez dowodu zgody trudno wykazać zgodność przetwarzania marketingowego.",
    businessImpact: "Ryzyko blokady kampanii marketingowych i konieczności ponownego zbierania zgód.",
    remediationTasks: [
      "Dodaj tabelę lub event stream consent_events.",
      "Zapisuj userId, purpose, granted, policyVersion, collectedAt i source.",
      "Udostępnij historię zgód w panelu administracyjnym."
    ],
    evidenceExamples: [
      "Schemat tabeli consent_events",
      "Przykładowy rekord zgody",
      "Zrzut ekranu panelu z historią zgód"
    ],
    answerKey: "consentLog",
    failWhen: false
  },
  {
    id: "gdpr-marketing-opt-in-001",
    regulation: "GDPR",
    title: "Wymagaj aktywnej zgody marketingowej",
    description: "Newsletter nie powinien używać zaznaczonych domyślnie checkboxów ani zgód pakietowych.",
    legalReference: "GDPR Art. 4(11), Art. 7",
    appliesWhen: [
      { field: "process", operator: "equals", value: "newsletter_signup" },
      { field: "dataTypes", operator: "includes", value: "marketing_consent_data" }
    ],
    question: "Czy zgoda marketingowa wymaga aktywnego działania użytkownika?",
    riskLevel: "high",
    engineeringControl: "Użyj osobnego, niezaznaczonego checkboxa dla marketingu.",
    riskExplanation: "Zgoda domyślna albo wymuszona może nie spełniać wymogu dobrowolności i jednoznaczności.",
    businessImpact: "Może unieważnić bazę mailingową i utrudnić prowadzenie kampanii.",
    remediationTasks: [
      "Usuń domyślnie zaznaczone zgody marketingowe.",
      "Rozdziel zgody transakcyjne i marketingowe.",
      "Zapisuj treść zgody widoczną użytkownikowi."
    ],
    evidenceExamples: [
      "Zrzut ekranu formularza newslettera",
      "Rekord zgody marketingowej",
      "Test UI potwierdzający brak domyślnego zaznaczenia"
    ],
    answerKey: "marketingOptIn",
    failWhen: false
  },
  {
    id: "gdpr-unsubscribe-001",
    regulation: "GDPR",
    title: "Umożliw wycofanie zgody marketingowej",
    description: "Użytkownik musi mieć prosty sposób wypisania się z komunikacji marketingowej.",
    legalReference: "GDPR Art. 7; ePrivacy baseline",
    appliesWhen: [
      { field: "process", operator: "equals", value: "newsletter_signup" },
      { field: "dataTypes", operator: "includes", value: "marketing_consent_data" }
    ],
    question: "Czy wiadomości marketingowe zawierają działający mechanizm wypisania?",
    riskLevel: "high",
    engineeringControl: "Dodaj podpisane linki unsubscribe i natychmiastową listę suppression.",
    riskExplanation: "Brak łatwego wycofania zgody powoduje dalsze przetwarzanie mimo sprzeciwu użytkownika.",
    businessImpact: "Może prowadzić do skarg, utraty reputacji i ręcznej obsługi wypisań.",
    remediationTasks: [
      "Generuj podpisany link unsubscribe dla każdej kampanii.",
      "Sprawdzaj suppression list przed wysyłką.",
      "Zapisuj timestamp i źródło wycofania zgody."
    ],
    evidenceExamples: [
      "Przykładowy link unsubscribe",
      "Log wypisania użytkownika",
      "Konfiguracja suppression list"
    ],
    answerKey: "unsubscribeFlow",
    failWhen: false
  },
  {
    id: "gdpr-erasure-001",
    regulation: "GDPR",
    title: "Obsłuż prawo do usunięcia danych",
    description: "Użytkownik powinien mieć ścieżkę żądania usunięcia danych osobowych.",
    legalReference: "GDPR Art. 17",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy użytkownik może zażądać usunięcia swoich danych?",
    riskLevel: "high",
    engineeringControl: "Zbuduj workflow usuwania danych z wyjątkami retencyjnymi i śladem audytowym.",
    riskExplanation: "Brak procesu usuwania danych utrudnia realizację praw osób, których dane dotyczą.",
    businessImpact: "Może generować ręczną obsługę, opóźnienia i ryzyko eskalacji do organu nadzorczego.",
    remediationTasks: [
      "Dodaj endpoint lub formularz żądania usunięcia danych.",
      "Uruchamiaj joby usuwania dla usług zależnych.",
      "Dokumentuj wyjątki retencyjne, np. billing lub legal hold."
    ],
    evidenceExamples: [
      "Dokumentacja workflow usuwania konta",
      "Log wykonania żądania usunięcia",
      "Lista systemów objętych usuwaniem"
    ],
    answerKey: "accountDeletion",
    failWhen: false
  },
  {
    id: "gdpr-data-export-001",
    regulation: "GDPR",
    title: "Udostępnij eksport danych użytkownika",
    description: "Użytkownik może potrzebować dostępu do danych zapisanych w systemie.",
    legalReference: "GDPR Art. 15, Art. 20",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy użytkownik może pobrać swoje dane w kontrolowany sposób?",
    riskLevel: "medium",
    engineeringControl: "Stwórz uwierzytelniony eksport danych z ograniczonym zakresem.",
    riskExplanation: "Brak eksportu utrudnia realizację prawa dostępu i przenoszenia danych.",
    businessImpact: "Zespół supportu może być zmuszony do ręcznego zbierania danych z wielu systemów.",
    remediationTasks: [
      "Zmapuj źródła danych osobowych per usługa.",
      "Wygeneruj archiwum eksportu z podpisanym URL.",
      "Loguj wykonanie żądania dostępu."
    ],
    evidenceExamples: [
      "Przykładowy plik eksportu",
      "Log realizacji żądania dostępu",
      "Mapa źródeł danych użytkownika"
    ],
    answerKey: "dataExport",
    failWhen: false
  },
  {
    id: "gdpr-retention-001",
    regulation: "GDPR",
    title: "Zdefiniuj retencję danych osobowych",
    description: "Dane osobowe nie powinny być przechowywane bezterminowo.",
    legalReference: "GDPR Art. 5(1)(e)",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy istnieje polityka retencji danych i techniczne joby czyszczące?",
    riskLevel: "high",
    engineeringControl: "Przypisz okres retencji do rekordów i uruchom cykliczne czyszczenie.",
    riskExplanation: "Nieograniczona retencja zwiększa zakres danych objętych incydentem i audytem.",
    businessImpact: "Większy zakres danych oznacza większe koszty obsługi incydentów i migracji.",
    remediationTasks: [
      "Dodaj metadane retencji do tabel z danymi osobowymi.",
      "Skonfiguruj zaplanowane joby usuwania lub anonimizacji.",
      "Udokumentuj wyjątki retencyjne."
    ],
    evidenceExamples: [
      "Konfiguracja joba retencyjnego",
      "Tabela okresów retencji",
      "Log usunięcia przeterminowanych rekordów"
    ],
    answerKey: "retentionPolicy",
    failWhen: false
  },
  {
    id: "gdpr-location-timing-001",
    regulation: "GDPR",
    title: "Nie zbieraj lokalizacji zbyt wcześnie",
    description: "Precyzyjna lokalizacja podczas rejestracji często nie jest potrzebna do utworzenia konta.",
    legalReference: "GDPR Art. 5(1)(c)",
    appliesWhen: [
      { field: "process", operator: "equals", value: "user_registration" },
      { field: "dataTypes", operator: "includes", value: "location_data" }
    ],
    question: "Czy precyzyjna lokalizacja jest zbierana już podczas rejestracji?",
    riskLevel: "medium",
    engineeringControl: "Zbieraj lokalizację dopiero w kontekście funkcji, która jej wymaga.",
    riskExplanation: "Zbyt wczesne zbieranie lokalizacji może naruszać minimalizację danych.",
    businessImpact: "Może wymagać zmiany onboardingu i doprecyzowania polityki prywatności.",
    remediationTasks: [
      "Usuń pole lokalizacji z domyślnego formularza rejestracji.",
      "Dodaj zgodę dopiero przy użyciu funkcji wymagającej lokalizacji.",
      "Zapisuj timestamp zgody i wersję polityki prywatności."
    ],
    evidenceExamples: [
      "Payload rejestracji bez lokalizacji",
      "Zrzut ekranu prośby o zgodę w kontekście funkcji",
      "Log zgody lokalizacyjnej"
    ],
    answerKey: "preciseLocationAtSignup",
    failWhen: true
  },
  {
    id: "gdpr-children-consent-001",
    regulation: "GDPR",
    title: "Zweryfikuj podstawę przetwarzania danych dzieci",
    description: "Procesy dotyczące dzieci wymagają dodatkowej kontroli zgód i wieku.",
    legalReference: "GDPR Art. 8",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "children_data" }],
    question: "Czy system obsługuje zgodę opiekuna lub inną właściwą podstawę przetwarzania danych dzieci?",
    riskLevel: "critical",
    engineeringControl: "Dodaj kontrolę wieku, zgodę opiekuna i osobny ślad audytowy.",
    riskExplanation: "Dane dzieci mają podwyższone ryzyko regulacyjne i reputacyjne.",
    businessImpact: "Błędny proces może zatrzymać wdrożenie produktu w danej jurysdykcji.",
    remediationTasks: [
      "Dodaj kontrolę wieku w procesie rejestracji.",
      "Zaprojektuj workflow zgody opiekuna.",
      "Oddziel logi zgód dotyczących dzieci od standardowych zgód marketingowych."
    ],
    evidenceExamples: [
      "Specyfikacja age-gate",
      "Log zgody opiekuna",
      "Test procesu wycofania zgody"
    ],
    answerKey: "childrenConsent",
    failWhen: false
  },
  {
    id: "gdpr-access-restriction-001",
    regulation: "GDPR",
    title: "Ogranicz dostęp do danych osobowych",
    description: "Dostęp do danych osobowych powinien wynikać z roli i potrzeby biznesowej.",
    legalReference: "GDPR Art. 32",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy dostęp do danych osobowych jest ograniczony rolami?",
    riskLevel: "high",
    engineeringControl: "Wymuś RBAC dla widoków, eksportów i API z danymi osobowymi.",
    riskExplanation: "Szeroki dostęp zwiększa prawdopodobieństwo nadużyć i wycieku.",
    businessImpact: "Może utrudnić audyt dostępu i wymusić pilny przegląd uprawnień.",
    remediationTasks: [
      "Zdefiniuj role mające dostęp do danych osobowych.",
      "Zablokuj szeroki dostęp administratorów do eksportów.",
      "Wprowadź kwartalny przegląd uprawnień."
    ],
    evidenceExamples: [
      "Macierz ról i uprawnień",
      "Konfiguracja polityk dostępu",
      "Raport z przeglądu uprawnień"
    ],
    answerKey: "roleBasedAccess",
    failWhen: false
  },
  {
    id: "pci-raw-card-storage-001",
    regulation: "PCI_DSS",
    title: "Nie przechowuj surowych danych kart",
    description: "System nie powinien przechowywać PAN ani danych uwierzytelniających karty po autoryzacji.",
    legalReference: "PCI DSS Requirement 3",
    appliesWhen: [
      { field: "process", operator: "equals", value: "payment_processing" },
      { field: "dataTypes", operator: "includes", value: "payment_data" }
    ],
    question: "Czy system przechowuje surowe dane kart płatniczych?",
    riskLevel: "critical",
    engineeringControl: "Użyj hostowanych pól płatności i tokenów dostawcy płatności.",
    riskExplanation: "Przechowywanie danych kart gwałtownie zwiększa zakres PCI DSS i skutki incydentu.",
    businessImpact: "Może wymagać drogiego audytu PCI, migracji danych i natychmiastowego czyszczenia storage.",
    remediationTasks: [
      "Przenieś zbieranie kart do hostowanego komponentu dostawcy płatności.",
      "Zastąp zapisany PAN tokenem dostawcy.",
      "Usuń historyczne dane kart po migracji."
    ],
    evidenceExamples: [
      "Konfiguracja hostowanych pól płatniczych",
      "Migracja usuwająca PAN",
      "Dowód tokenizacji rekordów płatności"
    ],
    answerKey: "rawCardStorage",
    failWhen: true
  },
  {
    id: "pci-tokenization-001",
    regulation: "PCI_DSS",
    title: "Tokenizuj dane płatnicze",
    description: "Tokenizacja ogranicza zakres systemów objętych wymogami PCI DSS.",
    legalReference: "PCI DSS Requirement 3.5",
    appliesWhen: [
      { field: "process", operator: "equals", value: "payment_processing" },
      { field: "dataTypes", operator: "includes", value: "payment_data" }
    ],
    question: "Czy dane płatnicze są reprezentowane tokenami dostawcy?",
    riskLevel: "high",
    engineeringControl: "Przechowuj wyłącznie tokeny i minimalne metadane płatności.",
    riskExplanation: "Brak tokenizacji utrzymuje wysoką ekspozycję na dane płatnicze.",
    businessImpact: "Większy zakres PCI zwiększa koszt audytów i utrzymania kontroli.",
    remediationTasks: [
      "Zintegruj API tokenizacji dostawcy płatności.",
      "Przechowuj token, brand, last4 i datę wygaśnięcia bez pełnego PAN.",
      "Ogranicz użycie tokenu do właściwego klienta i kontekstu."
    ],
    evidenceExamples: [
      "Schemat tabeli payment_methods bez PAN",
      "Dokumentacja integracji tokenizacji",
      "Test płatności z tokenem"
    ],
    answerKey: "paymentTokenization",
    failWhen: false
  },
  {
    id: "pci-payment-encryption-001",
    regulation: "PCI_DSS",
    title: "Szyfruj dane płatnicze w spoczynku",
    description: "Dane płatnicze i billingowe powinny być chronione kryptograficznie.",
    legalReference: "PCI DSS Requirement 3.4",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "payment_data" }],
    question: "Czy dane płatnicze są szyfrowane w spoczynku?",
    riskLevel: "high",
    engineeringControl: "Włącz szyfrowanie storage i field-level encryption dla wrażliwych pól.",
    riskExplanation: "Brak szyfrowania zwiększa skutki dostępu do bazy lub backupów.",
    businessImpact: "Może wymagać awaryjnej rotacji kluczy i ponownej oceny ryzyka płatności.",
    remediationTasks: [
      "Włącz szyfrowanie bazy danych zarządzane przez KMS.",
      "Zaszyfruj wrażliwe pola billingowe na poziomie aplikacji.",
      "Udokumentuj właściciela i rotację kluczy."
    ],
    evidenceExamples: [
      "Zrzut konfiguracji szyfrowania bazy",
      "Dokumentacja KMS",
      "Test odczytu danych po rotacji klucza"
    ],
    answerKey: "encryptedAtRest",
    failWhen: false
  },
  {
    id: "pci-payment-access-001",
    regulation: "PCI_DSS",
    title: "Ogranicz dostęp do danych płatniczych",
    description: "Dane płatnicze powinny być dostępne tylko dla ról z uzasadnioną potrzebą.",
    legalReference: "PCI DSS Requirement 7",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "payment_data" }],
    question: "Czy dostęp do danych płatniczych jest ograniczony rolami?",
    riskLevel: "high",
    engineeringControl: "Dodaj RBAC dla widoków płatności, eksportów i kont serwisowych.",
    riskExplanation: "Nieograniczony dostęp zwiększa ryzyko nadużyć oraz naruszeń danych płatniczych.",
    businessImpact: "Może opóźnić audyt PCI i wymagać pilnego przeglądu dostępów.",
    remediationTasks: [
      "Zdefiniuj role payment_admin, support_limited i finance_readonly.",
      "Zablokuj eksport danych płatniczych dla ról ogólnych.",
      "Przeglądaj dostępy do płatności co kwartał."
    ],
    evidenceExamples: [
      "Macierz uprawnień płatniczych",
      "Log odmowy dostępu",
      "Raport z przeglądu dostępów"
    ],
    answerKey: "roleBasedAccess",
    failWhen: false
  },
  {
    id: "pci-payment-audit-logs-001",
    regulation: "PCI_DSS",
    title: "Loguj dostęp do danych płatniczych",
    description: "Odczyty, eksporty i zmiany danych płatniczych muszą być możliwe do prześledzenia.",
    legalReference: "PCI DSS Requirement 10",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "payment_data" }],
    question: "Czy dostęp do danych płatniczych jest logowany?",
    riskLevel: "high",
    engineeringControl: "Emituj niezmienne logi dostępu do rekordów płatniczych.",
    riskExplanation: "Bez logów trudno wykryć nadużycia i udowodnić kontrolę dostępu.",
    businessImpact: "W razie incydentu zespół nie będzie w stanie szybko określić zakresu ekspozycji.",
    remediationTasks: [
      "Instrumentuj odczyty i eksporty rekordów płatniczych.",
      "Wysyłaj logi do odpornego na modyfikacje sinka.",
      "Dodaj alerty dla nietypowych odczytów."
    ],
    evidenceExamples: [
      "Przykładowy log odczytu danych płatniczych",
      "Konfiguracja SIEM lub log sink",
      "Alert dla masowego eksportu"
    ],
    answerKey: "auditLogs",
    failWhen: false
  },
  {
    id: "pci-service-account-review-001",
    regulation: "PCI_DSS",
    title: "Przeglądaj konta serwisowe w obszarze płatności",
    description: "Konta serwisowe powinny mieć minimalny zakres i regularny przegląd.",
    legalReference: "PCI DSS Requirement 8",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "payment_data" }],
    question: "Czy konta serwisowe z dostępem do płatności są cyklicznie przeglądane?",
    riskLevel: "medium",
    engineeringControl: "Wprowadź ownera, zakres i datę przeglądu dla każdego konta serwisowego.",
    riskExplanation: "Porzucone konta serwisowe są częstą ścieżką nieautoryzowanego dostępu.",
    businessImpact: "Może prowadzić do niejawnych zależności i trudnej rotacji sekretów.",
    remediationTasks: [
      "Dodaj inventory kont serwisowych z ownerem.",
      "Usuń nieużywane tokeny i klucze.",
      "Zaplanuj kwartalny przegląd kont płatniczych."
    ],
    evidenceExamples: [
      "Lista kont serwisowych z ownerami",
      "Protokół przeglądu kwartalnego",
      "Dowód usunięcia nieużywanego klucza"
    ],
    answerKey: "serviceAccountReview",
    failWhen: false
  },
  {
    id: "hipaa-rbac-001",
    regulation: "HIPAA",
    title: "Ogranicz dostęp do danych zdrowotnych według ról",
    description: "Dane zdrowotne powinny być dostępne tylko dla upoważnionych ról.",
    legalReference: "HIPAA Security Rule 164.312(a)",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "health_data" }],
    question: "Czy dostęp do danych zdrowotnych jest ograniczony rolami?",
    riskLevel: "critical",
    engineeringControl: "Wymuś RBAC lub ABAC dla odczytu, eksportu i zmiany danych zdrowotnych.",
    riskExplanation: "Szeroki dostęp do danych zdrowotnych znacząco zwiększa ryzyko naruszenia prywatności.",
    businessImpact: "Może zatrzymać wdrożenie u klientów medycznych i wymagać pełnego review bezpieczeństwa.",
    remediationTasks: [
      "Zdefiniuj role kliniczne, supportowe i administracyjne.",
      "Domyślnie blokuj eksport danych zdrowotnych.",
      "Dodaj break-glass access z obowiązkowym uzasadnieniem."
    ],
    evidenceExamples: [
      "Macierz ról dla danych zdrowotnych",
      "Log użycia break-glass",
      "Test odmowy dostępu dla roli supportowej"
    ],
    answerKey: "roleBasedAccess",
    failWhen: false
  },
  {
    id: "hipaa-access-logs-001",
    regulation: "HIPAA",
    title: "Loguj dostęp do danych zdrowotnych",
    description: "Każdy dostęp do danych zdrowotnych powinien być możliwy do prześledzenia.",
    legalReference: "HIPAA Security Rule 164.312(b)",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "health_data" }],
    question: "Czy system zapisuje logi dostępu do danych zdrowotnych?",
    riskLevel: "critical",
    engineeringControl: "Loguj odczyty, eksporty i zmiany rekordów zdrowotnych z kontekstem użytkownika.",
    riskExplanation: "Bez logów dostępów nie da się sprawdzić, kto widział dane pacjenta.",
    businessImpact: "Ogranicza możliwość odpowiedzi na incydenty i pytania klientów healthcare.",
    remediationTasks: [
      "Loguj actor, role, action, recordId, reason i timestamp.",
      "Przechowuj logi w odpornym na modyfikacje miejscu.",
      "Dodaj cykliczny przegląd nietypowych dostępów."
    ],
    evidenceExamples: [
      "Przykładowy log dostępu do rekordu zdrowotnego",
      "Konfiguracja log sink",
      "Raport z przeglądu dostępu"
    ],
    answerKey: "healthAccessLogs",
    failWhen: false
  },
  {
    id: "hipaa-health-encryption-001",
    regulation: "HIPAA",
    title: "Szyfruj dane zdrowotne",
    description: "Dane zdrowotne wymagają silnej ochrony w storage i transmisji.",
    legalReference: "HIPAA Security Rule 164.312(e)",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "health_data" }],
    question: "Czy dane zdrowotne są szyfrowane w spoczynku?",
    riskLevel: "high",
    engineeringControl: "Szyfruj storage, backupy i pola szczególnie wrażliwe zarządzanymi kluczami.",
    riskExplanation: "Brak szyfrowania zwiększa skutki utraty bazy danych lub backupów.",
    businessImpact: "Może uniemożliwić sprzedaż do organizacji healthcare bez dodatkowych kontroli.",
    remediationTasks: [
      "Włącz szyfrowanie bazy danych i backupów.",
      "Dodaj field-level encryption dla danych klinicznych.",
      "Udokumentuj zarządzanie kluczami i rotację."
    ],
    evidenceExamples: [
      "Konfiguracja szyfrowania storage",
      "Dowód szyfrowania backupów",
      "Dokument rotacji kluczy"
    ],
    answerKey: "encryptedAtRest",
    failWhen: false
  },
  {
    id: "hipaa-minimum-necessary-001",
    regulation: "HIPAA",
    title: "Stosuj zasadę minimum necessary",
    description: "Proces powinien używać tylko minimalnego zakresu danych zdrowotnych potrzebnego do celu.",
    legalReference: "HIPAA Privacy Rule minimum necessary standard",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "health_data" }],
    question: "Czy proces ogranicza zakres danych zdrowotnych do minimum?",
    riskLevel: "high",
    engineeringControl: "Wydziel profile dostępu i widoki z ograniczonym zakresem pól.",
    riskExplanation: "Nadmierna ekspozycja danych zdrowotnych zwiększa ryzyko naruszenia prywatności.",
    businessImpact: "Może wymagać przebudowy widoków supportu i eksportów danych.",
    remediationTasks: [
      "Zidentyfikuj pola zdrowotne potrzebne dla każdej roli.",
      "Usuń dane zdrowotne z widoków, które ich nie wymagają.",
      "Dodaj testy zakresu odpowiedzi API."
    ],
    evidenceExamples: [
      "Macierz pól dostępnych per rola",
      "Test kontraktu API",
      "Zrzut widoku z ograniczonym zakresem danych"
    ],
    answerKey: "roleBasedAccess",
    failWhen: false
  },
  {
    id: "ccpa-notice-001",
    regulation: "CCPA",
    title: "Informuj o kategoriach zbieranych danych",
    description: "Użytkownik z Kalifornii powinien wiedzieć, jakie kategorie danych są zbierane.",
    legalReference: "CCPA/CPRA Notice at Collection",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy proces pokazuje informację o kategoriach danych przy ich zbieraniu?",
    riskLevel: "medium",
    engineeringControl: "Dodaj notice at collection z kategoriami danych i celami przetwarzania.",
    riskExplanation: "Brak notice at collection utrudnia wykazanie przejrzystości wobec konsumenta.",
    businessImpact: "Może wymagać aktualizacji interfejsów i polityki prywatności dla rynku USA.",
    remediationTasks: [
      "Dodaj listę kategorii danych w interfejsie zbierania.",
      "Połącz notice z właściwą wersją polityki prywatności.",
      "Udokumentuj mapowanie kategorii danych na cele."
    ],
    evidenceExamples: [
      "Zrzut ekranu notice at collection",
      "Mapowanie kategorii danych",
      "Wersja polityki prywatności dla CCPA"
    ],
    answerKey: "privacyNotice",
    failWhen: false
  },
  {
    id: "ccpa-deletion-001",
    regulation: "CCPA",
    title: "Obsłuż żądania usunięcia danych",
    description: "Konsumenci powinni mieć kontrolowany proces żądania usunięcia danych.",
    legalReference: "CCPA/CPRA Deletion Rights",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy konsument może zażądać usunięcia danych osobowych?",
    riskLevel: "high",
    engineeringControl: "Stwórz weryfikowany workflow żądań usunięcia z rejestrem statusów.",
    riskExplanation: "Brak procesu usunięcia danych utrudnia realizację praw konsumenta.",
    businessImpact: "Może generować zaległości operacyjne i ryzyko skarg użytkowników.",
    remediationTasks: [
      "Dodaj formularz żądania usunięcia.",
      "Weryfikuj tożsamość przed usunięciem danych.",
      "Rejestruj status i datę realizacji żądania."
    ],
    evidenceExamples: [
      "Log żądania usunięcia CCPA",
      "Opis procesu weryfikacji",
      "Dowód zakończenia usunięcia"
    ],
    answerKey: "accountDeletion",
    failWhen: false
  },
  {
    id: "ccpa-opt-out-001",
    regulation: "CCPA",
    title: "Obsłuż opt-out sprzedaży lub udostępniania danych",
    description: "Jeśli dane są udostępniane zewnętrznym dostawcom, użytkownik może potrzebować ścieżki opt-out.",
    legalReference: "CCPA/CPRA Right to Opt-Out",
    appliesWhen: [{ field: "answers.thirdPartySharing", operator: "is_true" }],
    question: "Czy użytkownik może wybrać opt-out sprzedaży lub udostępniania danych?",
    riskLevel: "high",
    engineeringControl: "Dodaj preferencję opt-out i respektuj ją w integracjach zewnętrznych.",
    riskExplanation: "Udostępnianie danych bez ścieżki opt-out może naruszać oczekiwania CCPA/CPRA.",
    businessImpact: "Może wymusić zmianę integracji analytics i marketing automation.",
    remediationTasks: [
      "Dodaj preferencję opt-out w ustawieniach prywatności.",
      "Przekazuj sygnał opt-out do systemów marketingowych i analytics.",
      "Loguj moment zmiany preferencji."
    ],
    evidenceExamples: [
      "Zrzut ustawienia opt-out",
      "Log zmiany preferencji",
      "Lista integracji respektujących opt-out"
    ],
    answerKey: "thirdPartySharing",
    failWhen: true
  },
  {
    id: "ccpa-data-export-001",
    regulation: "CCPA",
    title: "Udostępnij eksport danych konsumenta",
    description: "Konsumenci mogą żądać kopii danych zebranych przez organizację.",
    legalReference: "CCPA/CPRA Right to Know",
    appliesWhen: [{ field: "dataTypes", operator: "includes", value: "personal_data" }],
    question: "Czy system umożliwia eksport danych konsumenta?",
    riskLevel: "medium",
    engineeringControl: "Wygeneruj raport danych konsumenta z kontrolą tożsamości i logiem realizacji.",
    riskExplanation: "Brak eksportu danych utrudnia obsługę prawa do informacji.",
    businessImpact: "Może zwiększyć obciążenie supportu i czas odpowiedzi na żądania prywatnościowe.",
    remediationTasks: [
      "Zbuduj endpoint eksportu danych konsumenta.",
      "Dodaj weryfikację tożsamości przed udostępnieniem eksportu.",
      "Rejestruj wygenerowane eksporty."
    ],
    evidenceExamples: [
      "Przykładowy eksport danych",
      "Log weryfikacji żądania",
      "Lista źródeł danych objętych eksportem"
    ],
    answerKey: "dataExport",
    failWhen: false
  },
  {
    id: "ccpa-sharing-notice-001",
    regulation: "CCPA",
    title: "Informuj o sprzedaży lub udostępnianiu danych",
    description: "Proces powinien jasno wskazywać, czy dane trafiają do zewnętrznych dostawców.",
    legalReference: "CCPA/CPRA Sharing Disclosure",
    appliesWhen: [{ field: "answers.thirdPartySharing", operator: "is_true" }],
    question: "Czy informacja prywatności opisuje udostępnianie danych zewnętrznym dostawcom?",
    riskLevel: "medium",
    engineeringControl: "Utrzymuj rejestr integracji i odzwierciedl go w informacji prywatności.",
    riskExplanation: "Nieujawnione udostępnianie danych może być kwestionowane przez użytkowników i audytorów.",
    businessImpact: "Może wymagać aktualizacji vendor inventory i renegocjacji procesów marketingowych.",
    remediationTasks: [
      "Zmapuj zewnętrznych odbiorców danych.",
      "Dodaj kategorie odbiorców do informacji prywatności.",
      "Połącz każdą integrację z ownerem i celem biznesowym."
    ],
    evidenceExamples: [
      "Vendor inventory",
      "Fragment polityki prywatności o sharingu",
      "Mapa przepływów danych do dostawców"
    ],
    answerKey: "privacyNotice",
    failWhen: false
  },
  {
    id: "security-rbac-001",
    regulation: "SECURITY_BASELINE",
    title: "Wymuś RBAC dla danych wrażliwych",
    description: "Dostęp do danych wrażliwych powinien być kontrolowany rolami.",
    legalReference: "Security Baseline AC-01",
    appliesWhen: [],
    question: "Czy dostęp do danych wrażliwych jest ograniczony rolami?",
    riskLevel: "high",
    engineeringControl: "Zdefiniuj role, uprawnienia i domyślną odmowę dostępu.",
    riskExplanation: "Brak RBAC zwiększa ryzyko przypadkowego lub celowego nadużycia dostępu.",
    businessImpact: "Może utrudnić sprzedaż enterprise i przejście security review klienta.",
    remediationTasks: [
      "Zdefiniuj role i przypisane uprawnienia.",
      "Dodaj middleware autoryzacyjny do endpointów wrażliwych.",
      "Przeglądaj role po zmianach organizacyjnych."
    ],
    evidenceExamples: [
      "Macierz RBAC",
      "Test odmowy dostępu",
      "Konfiguracja polityk autoryzacji"
    ],
    answerKey: "roleBasedAccess",
    failWhen: false
  },
  {
    id: "security-audit-logs-001",
    regulation: "SECURITY_BASELINE",
    title: "Loguj dostęp do danych wrażliwych",
    description: "System powinien emitować logi dostępu do istotnych rekordów i eksportów.",
    legalReference: "Security Baseline AU-01",
    appliesWhen: [],
    question: "Czy system zapisuje logi dostępu do danych wrażliwych?",
    riskLevel: "high",
    engineeringControl: "Dodaj audyt odczytów, eksportów, zmian uprawnień i działań administratorów.",
    riskExplanation: "Bez logów zespół nie ma śladu do wykrywania nadużyć i analiz incydentów.",
    businessImpact: "Może wydłużyć incident response i obniżyć wiarygodność w rozmowach z klientami.",
    remediationTasks: [
      "Instrumentuj odczyty i eksporty wrażliwych danych.",
      "Dodaj log zmian uprawnień.",
      "Przechowuj logi w centralnym miejscu z ograniczonym dostępem."
    ],
    evidenceExamples: [
      "Przykładowy log audytowy",
      "Dashboard logów dostępu",
      "Konfiguracja retencji logów"
    ],
    answerKey: "auditLogs",
    failWhen: false
  },
  {
    id: "security-encryption-at-rest-001",
    regulation: "SECURITY_BASELINE",
    title: "Szyfruj dane w spoczynku",
    description: "Dane w bazach, plikach i backupach powinny być chronione szyfrowaniem.",
    legalReference: "Security Baseline CR-01",
    appliesWhen: [{ field: "answers.storesData", operator: "is_true" }],
    question: "Czy dane są szyfrowane w spoczynku?",
    riskLevel: "high",
    engineeringControl: "Włącz szyfrowanie storage i zarządzanie kluczami przez KMS.",
    riskExplanation: "Brak szyfrowania zwiększa skutki kompromitacji storage lub backupów.",
    businessImpact: "Może zatrzymać procurement enterprise i wymagać pilnej zmiany infrastruktury.",
    remediationTasks: [
      "Włącz szyfrowanie bazy danych i bucketów.",
      "Zarządzaj kluczami przez KMS.",
      "Udokumentuj procedurę rotacji kluczy."
    ],
    evidenceExamples: [
      "Zrzut konfiguracji szyfrowania",
      "Polityka KMS",
      "Dowód szyfrowania backupów"
    ],
    answerKey: "encryptedAtRest",
    failWhen: false
  },
  {
    id: "security-encryption-in-transit-001",
    regulation: "SECURITY_BASELINE",
    title: "Szyfruj dane w transmisji",
    description: "Komunikacja między klientem, API i usługami powinna używać TLS.",
    legalReference: "Security Baseline CR-02",
    appliesWhen: [],
    question: "Czy dane są szyfrowane w transmisji?",
    riskLevel: "high",
    engineeringControl: "Wymuś TLS dla ruchu zewnętrznego i wewnętrznego pomiędzy usługami.",
    riskExplanation: "Brak szyfrowania transmisji umożliwia podsłuch danych wrażliwych.",
    businessImpact: "Może zablokować integracje z klientami wymagającymi standardów bezpieczeństwa.",
    remediationTasks: [
      "Wymuś HTTPS i HSTS na publicznych endpointach.",
      "Włącz TLS dla komunikacji service-to-service.",
      "Dodaj testy konfiguracji TLS do checklisty release."
    ],
    evidenceExamples: [
      "Wynik testu TLS",
      "Konfiguracja load balancera",
      "Manifest polityki mTLS lub service mesh"
    ],
    answerKey: "encryptedInTransit",
    failWhen: false
  },
  {
    id: "security-secrets-management-001",
    regulation: "SECURITY_BASELINE",
    title: "Zarządzaj sekretami poza kodem",
    description: "Sekrety aplikacyjne powinny być przechowywane w dedykowanym managerze sekretów.",
    legalReference: "Security Baseline SM-01",
    appliesWhen: [],
    question: "Czy sekrety są przechowywane i rotowane w bezpieczny sposób?",
    riskLevel: "high",
    engineeringControl: "Użyj secrets managera, krótkich TTL i rotacji kluczy.",
    riskExplanation: "Sekrety w repozytorium lub konfiguracji statycznej zwiększają ryzyko przejęcia usług.",
    businessImpact: "Może wymagać masowej rotacji kluczy i czasowego wyłączenia integracji.",
    remediationTasks: [
      "Przenieś sekrety do secrets managera.",
      "Usuń sekrety z repozytorium i historii konfiguracji.",
      "Dodaj harmonogram rotacji kluczy."
    ],
    evidenceExamples: [
      "Konfiguracja secrets managera",
      "Raport skanowania sekretów",
      "Log rotacji klucza"
    ],
    answerKey: "secretsManaged",
    failWhen: false
  },
  {
    id: "security-service-account-review-001",
    regulation: "SECURITY_BASELINE",
    title: "Przeglądaj konta serwisowe",
    description: "Konta serwisowe powinny mieć ownera, minimalny zakres i datę przeglądu.",
    legalReference: "Security Baseline IAM-02",
    appliesWhen: [],
    question: "Czy konta serwisowe są regularnie przeglądane?",
    riskLevel: "medium",
    engineeringControl: "Utrzymuj inventory kont serwisowych i usuwaj nieużywane poświadczenia.",
    riskExplanation: "Nieużywane konta serwisowe często zachowują szerokie uprawnienia.",
    businessImpact: "Może tworzyć ukryte zależności i utrudnić rotację poświadczeń po incydencie.",
    remediationTasks: [
      "Dodaj ownera do każdego konta serwisowego.",
      "Usuń nieużywane konta i tokeny.",
      "Wprowadź kwartalny przegląd kont."
    ],
    evidenceExamples: [
      "Inventory kont serwisowych",
      "Raport ostatniego przeglądu",
      "Dowód usunięcia nieużywanego konta"
    ],
    answerKey: "serviceAccountReview",
    failWhen: false
  },
  {
    id: "security-incident-contact-001",
    regulation: "SECURITY_BASELINE",
    title: "Ustal kontakt incident response",
    description: "Zespół powinien wiedzieć, kto odpowiada za reakcję na incydent danych.",
    legalReference: "Security Baseline IR-01",
    appliesWhen: [],
    question: "Czy istnieje wskazany kontakt i proces incident response?",
    riskLevel: "medium",
    engineeringControl: "Dodaj ownera IR, kanał eskalacji i minimalny runbook pierwszej reakcji.",
    riskExplanation: "Brak jasnej odpowiedzialności wydłuża czas reakcji po wykryciu incydentu.",
    businessImpact: "Opóźnienia w reakcji zwiększają koszt incydentu i ryzyko naruszenia SLA.",
    remediationTasks: [
      "Wyznacz ownera incident response dla usługi.",
      "Dodaj kanał eskalacji i dyżur.",
      "Utwórz runbook pierwszych 60 minut."
    ],
    evidenceExamples: [
      "Runbook incident response",
      "Lista kontaktów eskalacyjnych",
      "Wynik ćwiczenia tabletop"
    ],
    answerKey: "incidentResponseContact",
    failWhen: false
  },
  {
    id: "security-backup-recovery-001",
    regulation: "SECURITY_BASELINE",
    title: "Przetestuj backup i recovery",
    description: "Kopia zapasowa bez testu odtworzenia nie jest wystarczającą kontrolą techniczną.",
    legalReference: "Security Baseline BR-01",
    appliesWhen: [{ field: "answers.storesData", operator: "is_true" }],
    question: "Czy backup i recovery są skonfigurowane oraz testowane?",
    riskLevel: "medium",
    engineeringControl: "Utrzymuj backupy, testuj restore i dokumentuj RPO/RTO.",
    riskExplanation: "Brak testu recovery może ujawnić się dopiero podczas awarii lub incydentu ransomware.",
    businessImpact: "Może wydłużyć downtime i utrudnić spełnienie wymagań klientów enterprise.",
    remediationTasks: [
      "Zdefiniuj RPO i RTO dla usługi.",
      "Uruchom test odtworzenia backupu.",
      "Udokumentuj wynik testu i datę kolejnego ćwiczenia."
    ],
    evidenceExamples: [
      "Raport testu restore",
      "Konfiguracja harmonogramu backupów",
      "Dokument RPO/RTO"
    ],
    answerKey: "backupRecovery",
    failWhen: false
  }
];
