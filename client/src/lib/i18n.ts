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
  priority: string;
  completed: string;
  unfulfilled: string;
  
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
    heroSubtitle: 'Share your dreams and make them reality with our wishboard community',
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
    priority: 'Priority',
    completed: 'Completed',
    unfulfilled: 'Unfulfilled',
    
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
    heroSubtitle: 'Поділіться своїми мріями та втіліть їх у реальність разом з нашою спільнотою',
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
    priority: 'Пріоритет',
    completed: 'Виконано',
    unfulfilled: 'Не виконано',
    
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
  },
};

export const useTranslation = (language: Language = 'en') => {
  const t = translations[language];
  
  return {
    t,
    language,
  };
};