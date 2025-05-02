// 언어 버튼을 동적으로 생성하여 페이지에 추가
(function () {
  const langButtonContainer = document.createElement('div');
  langButtonContainer.style.position = 'fixed';
  langButtonContainer.style.top = '10px';
  langButtonContainer.style.right = '10px';
  langButtonContainer.style.zIndex = '1000';

  const koButton = document.createElement('button');
  koButton.textContent = '한국어';
  koButton.onclick = function() { setLanguage('ko'); };

  const enButton = document.createElement('button');
  enButton.textContent = 'English';
  enButton.onclick = function() { setLanguage('en'); };

  langButtonContainer.appendChild(enButton);
  langButtonContainer.appendChild(koButton);
  
  
  document.body.appendChild(langButtonContainer);

  // 언어 설정 함수
  async function setLanguage(lang) {
    const res = await fetch(`/lang/lang-${lang}.json`);
    const texts = await res.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (texts[key]) el.textContent = texts[key];
    });

    localStorage.setItem('language', lang);
  }

  // 초기 언어 설정
  const savedLang = localStorage.getItem('language') || 'ko';
  setLanguage(savedLang);
})();
