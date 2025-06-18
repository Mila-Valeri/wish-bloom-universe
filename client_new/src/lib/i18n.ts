export type Language = 'en' | 'ua';

export interface Translations {
  // Navigation
  home: string;
  profile: string;
  settings: string;
  signIn: string;
  signOut: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  exploreWishes: string;
  
  // Wishes
  createWish: string;
  editWish: string;
  deleteWish: string;
  wishTitle: string;
  wishDescription: string;
  wishLink: string;
  wishStatus: string;
  wishImage: string;
  
  // Status options
  completed: string;
  notCompleted: string;
  noStatus: string;
  
  // Actions
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  like: string;
  message: string;
  
  // Wish Grid
  wishCollection: string;
  discoverDreams: string;
  addWish: string;
  noWishesYet: string;
  beFirst: string;
  
  // Filter options
  filters: string;
  allWishes: string;
  priorityWishes: string;
  completedWishes: string;
  notCompletedWishes: string;
  
  // Form labels
  title: string;
  description: string;
  link: string;
  status: string;
  image: string;
  optional: string;
  required: string;
  
  // Placeholders
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  linkPlaceholder: string;
  
  // Messages
  charactersRemaining: string;
  uploadImage: string;
  clickToSelect: string;
  supportedFormats: string;
  cropImage: string;
  aspectRatio: string;
  zoom: string;
  rotation: string;
  applyCrop: string;
  changeImage: string;
  removeImage: string;
  
  // Link display
  linkLabel: string;
  wishLinkLabel: string;
  copyLink: string;
  linkCopied: string;
  
  // Errors
  errorUploadingImage: string;
  errorCreatingWish: string;
  errorUpdatingWish: string;
  errorDeletingWish: string;
  
  // Loading states
  loading: string;
  creating: string;
  updating: string;
  deleting: string;
  
  // Pages
  myWishes: string;
  editWishPage: string;
  backToHome: string;
  
  // Auth
  login: string;
  logout: string;
  
  // Confirmations
  confirmDelete: string;
  areYouSure: string;
  
  // Notifications
  wishCreated: string;
  wishUpdated: string;
  wishDeleted: string;
  
  // Profile page
  profileTitle: string;
  welcomeProfile: string;
  manageInformation: string;
  emailAddress: string;
  fullName: string;
  enterFullName: string;
  editName: string;
  noNameSet: string;
  memberSince: string;
  unknown: string;
  nameMinLength: string;
  nameLettersOnly: string;
  
  // Settings page
  settingsTitle: string;
  accountSettings: string;
  preferences: string;
  themePreference: string;
  lightMode: string;
  darkMode: string;
  languagePreference: string;
  english: string;
  ukrainian: string;
  notifications: string;
  emailNotifications: string;
  pushNotifications: string;
  marketingEmails: string;
  privacy: string;
  dataExport: string;
  deleteAccount: string;
  exportData: string;
  permanentlyDelete: string;
  thisActionCannot: string;
  
  // Settings additional
  loginSecurity: string;
  accountManagement: string;
  manageEmail: string;
  removeEmail: string;
  enterNewEmail: string;
  addEmail: string;
  password: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  enterCurrentPassword: string;
  enterNewPassword: string;
  repeatPassword: string;
  savePassword: string;
  forgotPassword: string;
  passwordsDoNotMatch: string;
  deleteMyAccount: string;
  absolutelySure: string;
  permanentlyDeleteAccount: string;
  removeAllData: string;
  yesDeleteAccount: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    
    // Hero section
    heroTitle: 'Your Wishes Come True',
    heroSubtitle: 'A space for dreams open to the world. Maybe you\'re the one who can bring them to life.',
    getStarted: 'Get Started',
    exploreWishes: 'Explore Wishes',
    
    // Wishes
    createWish: 'Create Wish',
    editWish: 'Edit Wish',
    deleteWish: 'Delete Wish',
    wishTitle: 'Wish Title',
    wishDescription: 'Wish Description',
    wishLink: 'Wish Link',
    wishStatus: 'Wish Status',
    wishImage: 'Wish Image',
    
    // Status options
    completed: 'Completed',
    notCompleted: 'Not Completed',
    noStatus: 'Not selected',
    
    // Actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    like: 'Like',
    message: 'Message',
    
    // Wish Grid
    wishCollection: 'Wish Collection',
    discoverDreams: 'Discover amazing dreams and aspirations',
    addWish: 'Add Wish',
    noWishesYet: 'No wishes yet',
    beFirst: 'Be the first to share your dreams!',
    
    // Filter options
    filters: 'Filters',
    allWishes: 'All wishes',
    priorityWishes: 'Priority wishes',
    completedWishes: 'Completed wishes',
    notCompletedWishes: 'Not completed wishes',
    
    // Form labels
    title: 'Title',
    description: 'Description',
    link: 'Link',
    status: 'Status',
    image: 'Image',
    optional: 'optional',
    required: 'required',
    
    // Placeholders
    titlePlaceholder: "What's your wish?",
    descriptionPlaceholder: 'Tell us more about your wish...',
    linkPlaceholder: 'https://...',
    
    // Messages
    charactersRemaining: 'characters remaining',
    uploadImage: 'Upload Image',
    clickToSelect: 'Click to select an image from your device',
    supportedFormats: 'Supports: JPG, PNG, WebP (Max 10MB)',
    cropImage: 'Crop Image',
    aspectRatio: 'Aspect Ratio',
    zoom: 'Zoom',
    rotation: 'Rotation',
    applyCrop: 'Apply Crop',
    changeImage: 'Change',
    removeImage: 'Remove',
    
    // Link display
    linkLabel: 'Link:',
    wishLinkLabel: 'Wish link',
    copyLink: 'Copy link',
    linkCopied: 'Link copied to clipboard',
    
    // Errors
    errorUploadingImage: 'Failed to upload image',
    errorCreatingWish: 'Failed to create wish',
    errorUpdatingWish: 'Failed to update wish',
    errorDeletingWish: 'Failed to delete wish',
    
    // Loading states
    loading: 'Loading...',
    creating: 'Creating...',
    updating: 'Updating...',
    deleting: 'Deleting...',
    
    // Pages
    myWishes: 'My Wishes',
    editWishPage: 'Edit Wish',
    backToHome: 'Back to Home',
    
    // Auth
    login: 'Login',
    logout: 'Logout',
    
    // Confirmations
    confirmDelete: 'Confirm Delete',
    areYouSure: 'Are you sure you want to delete this wish?',
    
    // Notifications
    wishCreated: 'Wish created successfully!',
    wishUpdated: 'Wish updated successfully!',
    wishDeleted: 'Wish deleted successfully!',
    
    // Profile page
    profileTitle: 'Profile',
    welcomeProfile: 'Welcome to your Profile',
    manageInformation: 'Manage your personal information',
    emailAddress: 'Email Address',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    editName: 'Edit name',
    noNameSet: 'No name set',
    memberSince: 'Member Since',
    unknown: 'Unknown',
    nameMinLength: 'Name must be at least 2 characters',
    nameLettersOnly: 'Name can only contain letters and spaces',
    
    // Settings page
    settingsTitle: 'Settings',
    accountSettings: 'Account Settings',
    preferences: 'Preferences',
    themePreference: 'Theme Preference',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    languagePreference: 'Language Preference',
    english: 'English',
    ukrainian: 'Ukrainian',
    notifications: 'Notifications',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    marketingEmails: 'Marketing Emails',
    privacy: 'Privacy',
    dataExport: 'Data Export',
    deleteAccount: 'Delete Account',
    exportData: 'Export Data',
    permanentlyDelete: 'Permanently Delete Account',
    thisActionCannot: 'This action cannot be undone',
    
    // Settings additional
    loginSecurity: 'Login & Security',
    accountManagement: 'Account Management',
    manageEmail: 'Manage your email address',
    removeEmail: 'Remove email',
    enterNewEmail: 'Enter new email',
    addEmail: 'Add email',
    password: 'Password',
    changePassword: 'Change your password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    repeatNewPassword: 'Repeat new password',
    enterCurrentPassword: 'Enter current password',
    enterNewPassword: 'Enter new password',
    repeatPassword: 'Repeat new password',
    savePassword: 'Save password',
    forgotPassword: 'Forgot password?',
    passwordsDoNotMatch: 'Passwords do not match',
    deleteMyAccount: 'Delete my account',
    absolutelySure: 'Are you absolutely sure?',
    permanentlyDeleteAccount: 'Permanently delete your account and all associated data',
    removeAllData: 'This action cannot be undone. This will permanently delete your account and remove all your data from our servers.',
    yesDeleteAccount: 'Yes, delete my account',
  },
  
  ua: {
    // Navigation
    home: 'Головна',
    profile: 'Профіль',
    settings: 'Налаштування',
    signIn: 'Увійти',
    signOut: 'Вийти',
    
    // Hero section
    heroTitle: 'Ваші мрії збуваються',
    heroSubtitle: 'Простір для мрій, відкритих світові. Можливо, саме ти зможеш втілити їх у реальність.',
    getStarted: 'Почати',
    exploreWishes: 'Переглянути мрії',
    
    // Wishes
    createWish: 'Створити мрію',
    editWish: 'Редагувати мрію',
    deleteWish: 'Видалити мрію',
    wishTitle: 'Назва мрії',
    wishDescription: 'Опис мрії',
    wishLink: 'Посилання на мрію',
    wishStatus: 'Статус мрії',
    wishImage: 'Зображення мрії',
    
    // Status options
    completed: 'Виконано',
    notCompleted: 'Не виконано',
    
    // Actions
    save: 'Зберегти',
    cancel: 'Скасувати',
    delete: 'Видалити',
    edit: 'Редагувати',
    like: 'Подобається',
    message: 'Повідомлення',
    
    // Wish Grid
    wishCollection: 'Колекція бажань',
    discoverDreams: 'Відкрийте дивовижні мрії та прагнення',
    addWish: 'Додати бажання',
    noWishesYet: 'Поки що немає бажань',
    beFirst: 'Будьте першим, хто поділиться своїми мріями!',
    
    // Filter options
    filters: 'Фільтри',
    allWishes: 'Усі мрії',
    priorityWishes: 'Пріоритетні мрії',
    completedWishes: 'Виконані мрії',
    notCompletedWishes: 'Невиконані мрії',
    
    // Form labels
    title: 'Назва',
    description: 'Опис',
    link: 'Посилання',
    status: 'Статус',
    image: 'Зображення',
    optional: 'необов\'язково',
    required: 'обов\'язково',
    
    // Placeholders
    titlePlaceholder: 'Яка ваша мрія?',
    descriptionPlaceholder: 'Розкажіть більше про вашу мрію...',
    linkPlaceholder: 'https://...',
    
    // Messages
    charactersRemaining: 'символів залишилося',
    uploadImage: 'Завантажити зображення',
    clickToSelect: 'Натисніть, щоб вибрати зображення з вашого пристрою',
    supportedFormats: 'Підтримуються: JPG, PNG, WebP (Макс 10МБ)',
    cropImage: 'Обрізати зображення',
    aspectRatio: 'Співвідношення сторін',
    zoom: 'Масштаб',
    rotation: 'Поворот',
    applyCrop: 'Застосувати обрізку',
    changeImage: 'Змінити',
    removeImage: 'Видалити',
    
    // Link display
    linkLabel: 'Посилання:',
    wishLinkLabel: 'Посилання на бажання',
    copyLink: 'Копіювати посилання',
    linkCopied: 'Посилання скопійовано в буфер обміну',
    
    // Errors
    errorUploadingImage: 'Не вдалося завантажити зображення',
    errorCreatingWish: 'Не вдалося створити мрію',
    errorUpdatingWish: 'Не вдалося оновити мрію',
    errorDeletingWish: 'Не вдалося видалити мрію',
    
    // Loading states
    loading: 'Завантаження...',
    creating: 'Створення...',
    updating: 'Оновлення...',
    deleting: 'Видалення...',
    
    // Pages
    myWishes: 'Мої бажання',
    editWishPage: 'Редагувати бажання',
    backToHome: 'На головну',
    
    // Auth
    login: 'Увійти',
    logout: 'Вийти',
    
    // Confirmations
    confirmDelete: 'Підтвердити видалення',
    areYouSure: 'Ви впевнені, що хочете видалити це бажання?',
    
    // Notifications
    wishCreated: 'Бажання успішно створено!',
    wishUpdated: 'Бажання успішно оновлено!',
    wishDeleted: 'Бажання успішно видалено!',
    
    // Profile page
    profileTitle: 'Профіль',
    welcomeProfile: 'Ласкаво просимо до вашого профілю',
    manageInformation: 'Керуйте своєю особистою інформацією',
    emailAddress: 'Електронна адреса',
    fullName: 'Повне ім\'я',
    enterFullName: 'Введіть ваше повне ім\'я',
    editName: 'Редагувати ім\'я',
    noNameSet: 'Ім\'я не встановлено',
    memberSince: 'Учасник з',
    unknown: 'Невідомо',
    nameMinLength: 'Ім\'я має містити принаймні 2 символи',
    nameLettersOnly: 'Ім\'я може містити тільки літери та пробіли',
    
    // Settings page
    settingsTitle: 'Налаштування',
    accountSettings: 'Налаштування облікового запису',
    preferences: 'Переваги',
    themePreference: 'Тема оформлення',
    lightMode: 'Світла тема',
    darkMode: 'Темна тема',
    languagePreference: 'Мовні переваги',
    english: 'Англійська',
    ukrainian: 'Українська',
    notifications: 'Сповіщення',
    emailNotifications: 'Email сповіщення',
    pushNotifications: 'Push сповіщення',
    marketingEmails: 'Маркетингові листи',
    privacy: 'Приватність',
    dataExport: 'Експорт даних',
    deleteAccount: 'Видалити обліковий запис',
    exportData: 'Експортувати дані',
    permanentlyDelete: 'Назавжди видалити обліковий запис',
    thisActionCannot: 'Цю дію неможливо скасувати',
    
    // Settings additional
    loginSecurity: 'Вхід та безпека',
    accountManagement: 'Керування обліковим записом',
    manageEmail: 'Керування електронною адресою',
    removeEmail: 'Видалити email',
    enterNewEmail: 'Введіть новий email',
    addEmail: 'Додати email',
    password: 'Пароль',
    changePassword: 'Змінити пароль',
    currentPassword: 'Поточний пароль',
    newPassword: 'Новий пароль',
    repeatNewPassword: 'Повторіть новий пароль',
    enterCurrentPassword: 'Введіть поточний пароль',
    enterNewPassword: 'Введіть новий пароль',
    repeatPassword: 'Повторіть новий пароль',
    savePassword: 'Зберегти пароль',
    forgotPassword: 'Забули пароль?',
    passwordsDoNotMatch: 'Паролі не співпадають',
    deleteMyAccount: 'Видалити мій обліковий запис',
    absolutelySure: 'Ви абсолютно впевнені?',
    permanentlyDeleteAccount: 'Назавжди видалити ваш обліковий запис та всі пов\'язані дані',
    removeAllData: 'Цю дію неможливо скасувати. Це назавжди видалить ваш обліковий запис та всі дані з наших серверів.',
    yesDeleteAccount: 'Так, видалити мій обліковий запис',
    noStatus: 'Не вибрано',
  },
};

export const useTranslation = (language: Language = 'en') => {
  const t = translations[language];
  
  return {
    t,
    language,
  };
};