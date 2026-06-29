import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    navHome: "Home",
    navAbout: "About Temple",
    navPooja: "Festivals",
    navPoojaOnly: "Poojai",
    navGallery: "Gallery",
    navDonations: "Donations",
    navContact: "Contact Us",
    navAdmin: "Admin Panel",
    logout: "Logout",
    
    // Theme & Lang
    langToggle: "தமிழ்",
    themeLight: "Light Mode",
    themeDark: "Dark Mode",

    // Home Page
    templeName: "அருள்மிகு ஸ்ரீ பராசக்தி அம்மன் மற்றும் ஸ்ரீ முனியப்பன் சுவாமி திருக்கோவில்",
    templeSubtitle: "A Sacred Abode of Protection, Peace and Divine Blessings",
    welcomeHeader: "Welcome to Sri Muniyappan Temple",
    welcomeText: "Experience the divine grace and tranquil ambiance of our heritage temple. Established with historical significance, the temple serves as a spiritual beacon for thousands of devotees seeking the protection and blessings of Lord Munniyappan.",
    announcements: "Latest Announcements",
    noAnnouncements: "No announcements at this time.",
    timingsHeader: "Temple Timings",
    dailyTimings: "Daily Schedule",
    morningTimings: "Morning: 6:00 AM - 12:00 PM",
    eveningTimings: "Evening: 4:00 PM - 9:00 PM",
    contactQuickInfo: "Quick Contact Info",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    readMore: "Read More",
    pinned: "Pinned",
    templeAddress: "Arulmigu Sri Parasakthi Amman and Sri Muniyappan Swamy Temple, 9th Ward, Annangar, Keeripatti Village, Attur Taluk, Salem District, Tamil Nadu – 636107, India.",

    // About Page
    aboutHeader: "About Our Temple",
    historyTitle: "Temple History",
    historyText: "Built over a century ago, Munniyappan Kovil stands as a testimony of rich cultural heritage and spiritual shelter. Established as a sacred guardian shrine, the temple has been maintained and expanded by generation after generation of local villagers and merchant guilds. Generations of devotees have found immense peace and protection under the divine eyes of Lord Munniyappan.",
    deityTitle: "Divine Presiding Deity - Lord Munniyappan",
    deityText: "The presiding deity of the temple is Lord Munniyappan, a powerful guardian deity in Tamil tradition who represents strength, protection, and justice. Devotees offer prayers here for family well-being and resolving personal obstacles. Worshipping Lord Munniyappan brings peace of mind, fearlessness, and absolute prosperity.",
    significanceTitle: "Spiritual Significance",
    significanceText: "Special prayers and Abhishekam are performed on auspicious Fridays and festival days. It is believed that offering simple prayers, lamps, and visiting the shrine brings immediate protective blessings to the family.",

    // Pooja Page
    poojaHeader: "Pooja Timings & Festivals",
    poojaSub: "Plan your spiritual visit according to the daily rituals and upcoming festivals",
    dailyPoojaTitle: "Daily Pooja Schedule",
    upcomingFestivalsTitle: "Upcoming Festivals & Events",
    noFestivals: "No upcoming festivals listed at the moment.",
    poojaTime: "Time",
    poojaName: "Ritual / Pooja",
    poojaDesc: "Description",
    registerPoojaBtn: "Register for Pooja",

    // Gallery Page
    galleryHeader: "Temple Gallery",
    gallerySub: "Glimpses of divine rituals, festivals, and temple architecture",
    all: "All Media",
    photos: "Photos",
    videos: "Videos",
    filterFestivals: "Festivals",
    filterDeity: "Deity",
    filterGeneral: "General",
    noMedia: "No photos or videos uploaded in this category.",

    // Donations Page
    donationsHeader: "Temple Contributions & Donations",
    donationsSub: "Support our temple maintenance, daily Annadhanam, and festival celebrations.",
    bankDetailsTitle: "Bank Account Details for Direct Transfer",
    bankName: "Bank Name: Sri Siddhi Vinayagar Temple Trust Bank",
    accNumber: "Account Number: 100987654321",
    ifscCode: "IFSC Code: SVTB0004321",
    branchName: "Branch: Main Temple Road Branch",
    donationFormTitle: "Online Donation Form (Simulated Gateway)",
    donorNameLabel: "Full Name",
    donorEmailLabel: "Email Address",
    donorPhoneLabel: "Phone Number",
    donorAmountLabel: "Donation Amount (INR)",
    donorPurposeLabel: "Donation Purpose",
    donorAddressLabel: "Residential Address",
    submitDonation: "Proceed to Donate",
    donationSuccess: "Donation Successful!",
    receiptDownloadBtn: "Download PDF/HTML Receipt",
    receiptHeader: "Official Donation Receipt",
    receiptSubtitle: "Arulmigu Sri Siddhi Vinayagar Temple Trust",
    txnIdLabel: "Transaction ID",
    statusLabel: "Status",
    dateLabel: "Date",
    thankYouMsg: "Thank you for your generous contribution. May Lord Siddhi Vinayagar bless you and your family with abundance and happiness.",

    // Contact Page
    contactHeader: "Get in Touch",
    contactSub: "Feel free to write to us or visit the temple office for inquiries",
    contactOfficeTitle: "Temple Office",
    officeHours: "Office Hours: 9:00 AM - 1:00 PM, 3:00 PM - 8:00 PM",
    formName: "Your Name",
    formEmail: "Your Email",
    formPhone: "Your Phone (Optional)",
    formSubject: "Subject",
    formMessage: "Message / Inquiry",
    submitMessage: "Send Message",
    msgSuccess: "Thank you! Your message has been sent successfully. We will contact you soon.",
    msgSending: "Sending...",
    locationTitle: "Temple Location on Google Maps",

    // Admin Panel
    adminLoginTitle: "Admin Access Portal",
    usernameLabel: "Username",
    passwordLabel: "Password",
    loginBtn: "Login",
    loginError: "Invalid credentials. Please try again.",
    adminDashboardTitle: "Admin Dashboard",
    totalDonations: "Total Donations",
    totalMessages: "Inquiries",
    totalGallery: "Media Items",
    totalAnnouncements: "Announcements",
    manageAnnouncementsBtn: "Announcements",
    manageFestivalsBtn: "Festivals & Poojas",
    manageGalleryBtn: "Gallery Uploads",
    manageDonationsBtn: "Donation Log",
    manageMessagesBtn: "Inquiries Log",
    
    // CRUD Labels
    addBtn: "Add New",
    editBtn: "Edit",
    deleteBtn: "Delete",
    saveBtn: "Save Changes",
    cancelBtn: "Cancel",
    actions: "Actions",
    pinnedLabel: "Pin to Top",
    categoryLabel: "Category",
    mediaTypeLabel: "Media Type",
    uploadMediaLabel: "Select File (Photo/Video)",
    confirmDelete: "Are you sure you want to delete this item?",
    titleEnLabel: "Title (English)",
    titleTaLabel: "Title (Tamil)",
    contentEnLabel: "Content (English)",
    contentTaLabel: "Content (Tamil)",
    nameEnLabel: "Name (English)",
    nameTaLabel: "Name (Tamil)",
    descEnLabel: "Description (English)",
    descTaLabel: "Description (Tamil)",
  },
  ta: {
    // Navigation
    navHome: "முகப்பு",
    navAbout: "கோவில் பற்றி",
    navPooja: "திருவிழா",
    navPoojaOnly: "பூஜை",
    navGallery: "புகைப்படங்கள்",
    navDonations: "நன்கொடைகள்",
    navContact: "தொடர்புக்கு",
    navAdmin: "நிர்வாகி",
    logout: "வெளியேறு",
    
    // Theme & Lang
    langToggle: "English",
    themeLight: "பகல் வடிவம்",
    themeDark: "இரவு வடிவம்",

    // Home Page
    templeName: "அருள்மிகு ஸ்ரீ பராசக்தி அம்மன் மற்றும் ஸ்ரீ முனியப்பன் சுவாமி திருக்கோவில்",
    templeSubtitle: "பாதுகாப்பு, அமைதி மற்றும் தெய்வீக அருளின் புனித இருப்பிடம்",
    welcomeHeader: "ஸ்ரீ முனியப்பன் திருக்கோவிலுக்கு உங்களை வரவேற்கிறோம்",
    welcomeText: "நமது பாரம்பரிய கோவிலின் தெய்வீக அருளையும் அமைதியான சூழலையும் அனுபவியுங்கள். வரலாற்று முக்கியத்துவம் வாய்ந்த இக்கோவில், ஸ்ரீ முனியப்பனின் பாதுகாப்பு மற்றும் ஆசிகளை நாடி வரும் ஆயிரக்கணக்கான பக்தர்களுக்கு ஆன்மீக புகலிடமாக விளங்குகிறது.",
    announcements: "சமீபத்திய அறிவிப்புகள்",
    noAnnouncements: "தற்போது அறிவிப்புகள் ஏதுமில்லை.",
    timingsHeader: "தரிசன நேரங்கள்",
    dailyTimings: "தினசரி கால அட்டவணை",
    morningTimings: "காலை: 6:00 மணி - மதியம் 12:00 மணி",
    eveningTimings: "மாலை: 4:00 மணி - இரவு 9:00 மணி",
    contactQuickInfo: "தொடர்பு விபரங்கள்",
    addressLabel: "முகவரி",
    phoneLabel: "தொலைபேசி",
    emailLabel: "மின்னஞ்சல்",
    readMore: "மேலும் படிக்க",
    pinned: "முக்கியமானது",
    templeAddress: "அருள்மிகு ஸ்ரீ பராசக்தி அம்மன் மற்றும் ஸ்ரீ முனியப்பன் சுவாமி திருக்கோவில், 9வது வார்டு, அண்ணாநகர், கீரிப்பட்டி கிராமம், ஆத்தூர் வட்டம், சேலம் மாவட்டம், தமிழ்நாடு – 636107, இந்தியா.",

    // About Page
    aboutHeader: "எங்கள் கோவில் பற்றி",
    historyTitle: "கோவில் வரலாறு",
    historyText: "ஒரு நூற்றாண்டுக்கு முன்பு கட்டப்பட்ட முனியப்பன் கோவில், சிறந்த ஆன்மீக மற்றும் கலாச்சார பாரம்பரியத்தின் சான்றாகத் திகழ்கிறது. கிராமத்தின் காவல் தெய்வமாக நிறுவப்பட்ட இக்கோவில், தலைமுறை தலைமுறையாக உள்ளூர் மக்கள் மற்றும் அறங்காவலர்களால் பராமரிக்கப்பட்டு விரிவுபடுத்தப்பட்டுள்ளது. பல தலைமுறை பக்தர்கள் ஸ்ரீ முனியப்பனின் தெய்வீகப் பார்வையின் கீழ் அளவற்ற அமைதியையும் பாதுகாப்பையும் பெற்றுள்ளனர்.",
    deityTitle: "மூலவர் - ஸ்ரீ முனியப்பன்",
    deityText: "இங்கு வீற்றிருக்கும் மூலவர் ஸ்ரீ முனியப்பன், தமிழ் பாரம்பரியத்தில் வலிமை, பாதுகாப்பு மற்றும் நீதியின் அடையாளமாக விளங்கும் ஆற்றல் மிக்க காவல் தெய்வம் ஆவார். குடும்ப நலன், பாதுகாப்பு மற்றும் தடைகள் நீங்குவதற்காக பக்தர்கள் இங்கு பிரார்த்தனை செய்கிறார்கள். ஸ்ரீ முனியப்பனை வழிபடுவதால் மன அமைதி, அச்சமின்மை மற்றும் சகல நன்மைகளும் கிட்டும்.",
    significanceTitle: "ஆன்மீக முக்கியத்துவம்",
    significanceText: "ஒவ்வொரு வெள்ளிக்கிழமையும் மற்றும் விசேஷ நாட்களிலும் சிறப்பு அபிஷேக ஆராதனைகள் நடைபெறும். இக்கோவிலில் தீபமேற்றி வழிபடுவதால் குடும்பத்திற்கு உடனடி காவல் அரணும் நல்வாழ்வும் கிடைக்கும் என்பது பக்தர்களின் அசைக்க முடியாத நம்பிக்கை.",

    // Pooja Page
    poojaHeader: "பூஜை நேரங்கள் & திருவிழாக்கள்",
    poojaSub: "தினசரி சடங்குகள் மற்றும் வரவிருக்கும் திருவிழாக்களுக்கு ஏற்ப உங்களது ஆன்மீக பயணத்தை திட்டமிடுங்கள்",
    dailyPoojaTitle: "தினசரி பூஜை விபரங்கள்",
    upcomingFestivalsTitle: "வரவிருக்கும் திருவிழாக்கள் & நிகழ்வுகள்",
    noFestivals: "தற்போது திருவிழாக்கள் ஏதுமில்லை.",
    poojaTime: "நேரம்",
    poojaName: "சடங்கு / பூஜை",
    poojaDesc: "விளக்கம்",
    registerPoojaBtn: "பூஜைக்கு பதிவு செய்க",

    // Gallery Page
    galleryHeader: "கோவில் புகைப்பட தொகுப்பு",
    gallerySub: "தெய்வீக சடங்குகள், திருவிழாக்கள் மற்றும் கோவில் கட்டிடக்கலையின் காட்சிகள்",
    all: "அனைத்தும்",
    photos: "புகைப்படங்கள்",
    videos: "காணொளிகள்",
    filterFestivals: "திருவிழாக்கள்",
    filterDeity: "மூலவர்",
    filterGeneral: "பொதுவானவை",
    noMedia: "இந்த பிரிவில் புகைப்படங்கள் அல்லது வீடியோக்கள் இல்லை.",

    // Donations Page
    donationsHeader: "கோவில் பங்களிப்புகள் & நன்கொடைகள்",
    donationsSub: "கோவில் பராமரிப்பு, தினசரி அன்னதானம் மற்றும் திருவிழா கொண்டாட்டங்களுக்கு ஆதரவளிக்கவும்.",
    bankDetailsTitle: "நேடிடி வங்கி பரிமாற்றத்திற்கான விபரங்கள்",
    bankName: "வங்கி: ஸ்ரீ சித்தி விநாயகர் கோவில் அறக்கட்டளை வங்கி",
    accNumber: "கணக்கு எண்: 100987654321",
    ifscCode: "ஐஎஃப்எஸ்சி குறியீடு: SVTB0004321",
    branchName: "கிளை: முதன்மை கோவில் சாலை கிளை",
    donationFormTitle: "ஆன்லைன் நன்கொடை படிவம் (மாதிரி)",
    donorNameLabel: "முழு பெயர்",
    donorEmailLabel: "மின்னஞ்சல் முகவரி",
    donorPhoneLabel: "தொலைபேசி எண்",
    donorAmountLabel: "நன்கொடை தொகை (ரூபாய்)",
    donorPurposeLabel: "நன்கொடையின் நோக்கம்",
    donorAddressLabel: "வீட்டு முகவரி",
    submitDonation: "நன்கொடை வழங்குக",
    donationSuccess: "நன்கொடை வெற்றிகரமாக செலுத்தப்பட்டது!",
    receiptDownloadBtn: "நன்கொடை ரசீதை பதிவிறக்கவும்",
    receiptHeader: "அதிகாரப்பூர்வ நன்கொடை ரசீது",
    receiptSubtitle: "அருள்மிகு ஸ்ரீ சித்தி விநாயகர் கோவில் அறக்கட்டளை",
    txnIdLabel: "பரிவர்த்தனை ஐடி",
    statusLabel: "நிலை",
    dateLabel: "தேதி",
    thankYouMsg: "உங்களின் தாராளமான பங்களிப்புக்கு நன்றி. சித்தி விநாயகப் பெருமான் உங்களுக்கும் உங்கள் குடும்பத்தினருக்கும் அனைத்து செல்வங்களையும் மகிழ்ச்சியையும் தந்து ஆசீர்வதிப்பாராக.",

    // Contact Page
    contactHeader: "தொடர்பு கொள்ள",
    contactSub: "விசாரணைகளுக்கு எங்களை எழுதவும் அல்லது கோவில் அலுவலகத்திற்கு நேரில் வரவும்",
    contactOfficeTitle: "கோவில் அலுவலகம்",
    officeHours: "அலுவலக நேரம்: காலை 9:00 - மதியம் 1:00, மாலை 3:00 - இரவு 8:00 மணி வரை",
    formName: "உங்கள் பெயர்",
    formEmail: "உங்கள் மின்னஞ்சல்",
    formPhone: "உங்கள் தொலைபேசி (தேவைப்பட்டால்)",
    formSubject: "விஷயம்",
    formMessage: "செய்தி / விசாரணை",
    submitMessage: "செய்தி அனுப்பு",
    msgSuccess: "நன்றி! உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது. விரைவில் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",
    msgSending: "அனுப்பப்படுகிறது...",
    locationTitle: "கோவிலின் கூகுள் மேப் வரைபடம்",

    // Admin Panel
    adminLoginTitle: "நிர்வாகி உள்நுழைவு",
    usernameLabel: "பயனர் பெயர்",
    passwordLabel: "கடவுச்சொல்",
    loginBtn: "உள்நுழைக",
    loginError: "தவறான பயனர் பெயர் அல்லது கடவுச்சொல்.",
    adminDashboardTitle: "நிர்வாக டாஷ்போர்டு",
    totalDonations: "மொத்த நன்கொடைகள்",
    totalMessages: "விசாரணைகள்",
    totalGallery: "ஊடக கோப்புகள்",
    totalAnnouncements: "அறிவிப்புகள்",
    manageAnnouncementsBtn: "அறிவிப்புகள்",
    manageFestivalsBtn: "விழாக்கள் & பூஜைகள்",
    manageGalleryBtn: "புகைப்படங்கள் பதிவேற்றம்",
    manageDonationsBtn: "நன்கொடை பதிவுகள்",
    manageMessagesBtn: "செய்திகள் பதிவு",
    
    // CRUD Labels
    addBtn: "புதிதாக சேர்",
    editBtn: "திருத்து",
    deleteBtn: "நீக்கு",
    saveBtn: "மாற்றங்களைச் சேமி",
    cancelBtn: "ரத்து செய்",
    actions: "செயல்கள்",
    pinnedLabel: "முக்கிய அறிவிப்பு",
    categoryLabel: "பிரிவு",
    mediaTypeLabel: "ஊடக வகை",
    uploadMediaLabel: "கோப்பைத் தேர்ந்தெடுக்கவும் (படம்/வீடியோ)",
    confirmDelete: "இதை நீக்க விரும்புகிறீர்களா?",
    titleEnLabel: "தலைப்பு (ஆங்கிலம்)",
    titleTaLabel: "தலைப்பு (தமிழ்)",
    contentEnLabel: "உள்ளடக்கம் (ஆங்கிலம்)",
    contentTaLabel: "உள்ளடக்கம் (தமிழ்)",
    nameEnLabel: "பெயர் (ஆங்கிலம்)",
    nameTaLabel: "பெயர் (தமிழ்)",
    descEnLabel: "விளக்கம் (ஆங்கிலம்)",
    descTaLabel: "விளக்கம் (தமிழ்)",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('temple_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('temple_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
