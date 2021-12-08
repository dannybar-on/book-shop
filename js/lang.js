'use strict';

var gTrans = {
  title: {
    en: 'Welcome to my Bookshop',
    he: 'ברוכים הבאים לחנות הספרים שלי',
  },
  'select-lang': {
    en: 'Select language',
    he: 'בחר שפה',
  },
  'create-book': {
    en: 'Create a new book',
    he: 'צור ספר חדש',
  },
  'read-btn': {
    en: 'Read',
    he: 'פרטים',
  },
  'update-btn': {
    en: 'Update',
    he: 'עדכן',
  },
  'del-btn': {
    en: 'Delete',
    he: 'מחק',
  },
  'id-header': {
    en: 'Id',
    he: 'מספר זיהוי',
  },
  'title-header': {
    en: 'Title',
    he: 'כותרת',
  },
  'price-header': {
    en: 'Price',
    he: 'מחיר',
  },
  'actions-header': {
    en: 'Actions',
    he: 'פעולות',
  },
  'next-page': {
    en: 'Next Page >',
    he: '< עמוד הבא',
  },
  'prev-page': {
    en: '< Prev Page',
    he: 'עמוד קודם >',
  },
  'added-name-placeholder': {
    en: "Enter Book's title",
    he: 'הכנס שם ספר שברצונך להוסיף',
  },
  'added-price-placeholder': {
    en: 'Enter Price',
    he: 'הכנס מחיר',
  },
  'submit-btn': {
    en: 'Submit',
    he: 'בצע',
  },
  'cancel-btn': {
    en: 'Cancel',
    he: 'בטל',
  },
  'book-desc': {
    en: 'Book Description',
    he: 'תקציר הספר',
  },
  'close-modal-btn': {
    en: 'Close',
    he: 'סגור',
  },
  'update-price-modal': {
    en: 'New Price?',
    he: 'מחיר חדש?',
  },
};

var gCurrLang = 'en';

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');

  els.forEach((el) => {
    const transKey = el.dataset.trans;
    if (el.nodeName === 'INPUT') {
      if (el.placeholder) el.placeholder = getTrans(transKey);
      if (el.value) el.value = getTrans(transKey);
    } else {
      el.innerText = getTrans(transKey);
    }
  });
}

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans['en'];

  return txt;
}

function setLang(lang) {
  gCurrLang = lang;
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
  if (gCurrLang === 'he') {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(num);
  } else
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
}

function convertToIls(num) {
  if (gCurrLang === 'he') return (num *= 3.12);
  else return num;
}
