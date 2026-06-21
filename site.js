(() => {
  const pages = [
    ['index.html', 'Home', '主页'],
    ['students.html', 'Team', '团队'],
    ['publication.html', 'Publications', '论文'],
    ['funding.html', 'Funding', '基金'],
    ['teaching.html', 'Teaching', '教学'],
    ['services.html', 'Services', '学术服务'],
    ['publicity.html', 'Publicity', '学术报告'],
    ['misc.html', 'Misc', '其他']
  ];

  const filename = window.location.pathname.split('/').pop() || 'index.html';
  const currentPage = pages.find(([path]) => path === filename) || pages[0];
  const links = pages.map(([path, en, zh]) =>
    `<a${path === filename ? ' class="active" aria-current="page"' : ''} href="${path}" data-en="${en}" data-zh="${zh}">${en}</a>`
  ).join('');

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <nav class="nav-shell" aria-label="Main navigation">
      <a class="brand" href="index.html" data-en="Yao Chen" data-zh="陈瑶">Yao Chen</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>
      <div class="nav-links" id="nav-links">
        ${links}
        <button class="language-toggle" type="button" aria-label="Switch language">中文</button>
      </div>
    </nav>`;

  const archive = document.createElement('main');
  archive.className = 'archive-shell';
  const title = document.createElement('h1');
  title.className = 'archive-title';
  title.dataset.en = currentPage[1];
  title.dataset.zh = currentPage[2];
  title.textContent = currentPage[1];
  archive.append(title);

  [...document.body.childNodes].forEach((node) => {
    if (node.nodeName !== 'SCRIPT') archive.append(node);
  });
  document.body.prepend(header);
  document.body.append(archive);

  const languageButton = header.querySelector('.language-toggle');
  const navToggle = header.querySelector('.nav-toggle');
  let language = localStorage.getItem('language') || 'en';

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-lang]').forEach((element) => {
      element.hidden = element.dataset.lang !== language;
      element.style.display = element.dataset.lang === language
        ? (element.tagName === 'SPAN' ? 'inline' : 'block')
        : 'none';
    });
    document.querySelectorAll('[data-en][data-zh]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    languageButton.textContent = language === 'en' ? '中文' : 'English';
    languageButton.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    localStorage.setItem('language', language);
  }

  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    header.querySelector('.nav-links').classList.toggle('open', !open);
  });

  setLanguage(language);
  window.addEventListener('load', () => setLanguage(language));
})();
