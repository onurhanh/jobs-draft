const content = document.querySelector('.content');
const details = document.querySelector('.details');
const searchForm = document.querySelector('.searchForm');
const searchBtns = document.querySelectorAll('.searchBtn');

let data = null;

// tema değişikliği için;
function changeTheme() {
  if (localStorage.isDarkMode === 'true') {
    document.body.classList.add('darkMode');
    themeChange.checked = true;
  }

  else {
    document.body.classList.remove('darkMode');
    themeChange.checked = false;
  }

  themeChange.addEventListener("change", function () {
    if (themeChange.checked) {
      document.body.classList.add('darkMode');
      localStorage.isDarkMode = true;
    }
    else {
      document.body.classList.remove('darkMode');
      localStorage.isDarkMode = false;
    }
  });
}

async function init() {
  data = await fetch("./data.json").then((x) => x.json());

  render(data); // datanın ilk render işlemi
  setupEventListeners(data); // event listenerların hepsi burada kurularak veriler parametre olarak aktarılıyor
  mobilFiltre(); // modal için event listener burada çağrılıyor
  changeTheme();
}

// dataların ekrana bastırılması
function render(filteredWord) {
  content.innerHTML = filteredWord.map((x) => `
    <div class="card" data-id="${x.id}">
      <div class="card-logo" style="background-color: ${x.logoBackground};"><img src="${x.logo}" alt=""></div>
      <div class="card-info">
        <span>${x.postedAt} . ${x.contract}</span>
        <h2>${x.position}</h2>
        <span class="company">${x.company}</span>
      </div>
      <p>${x.location}</p>
    </div>
  `).join('');

  const cards = document.querySelectorAll('.card');

  for (const card of cards)

    card.addEventListener('click', function () {
      const postId = Number(this.dataset.id); // Kartın ID'sini alıyoruz
      const selectedData = filteredWord.find(item => item.id === postId); // ID ile doğru veriyi seçiyoruz


      // Detayları gösteriyoruz
      details.innerHTML = `
        <div class="card-details">
          <div class="card-top">
            <div class="card-left-top">
                <div class="detail-logo" style="background-color: ${selectedData.logoBackground};">
                  <img src="${selectedData.logo}" alt="">
                </div>
                <div class="card-head">
                  <h2>${selectedData.company}</h2>
                  <span>${selectedData.company.toLowerCase()}.com</span>
                </div>
              </div>
              <a href="https://example.com/scoot">Company Site</a>
          </div>
          <div class="details-info">
            <div class="info-head">
              <div>
                <span>${selectedData.postedAt} . ${selectedData.contract}</span>
                <h2>${selectedData.position}</h2>
                <p>${selectedData.location}</p>
              </div>
              <div>
              <a href="https://example.com/scoot/apply">Apply Now</a>
              </div>
            </div>
            <div class="description">
              <p>${selectedData.description}</p>
            </div>
            <div class="requirements">
              <h2>Requirements</h2>
              <p>${selectedData.requirements.content}</p>
              <ul>
                ${selectedData.requirements.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="will-do-section">
              <h2>What You Will Do</h2>
              <p>${selectedData.role.content}</p>
              <ol>
                ${selectedData.role.items.map(item => `<li>${item}</li>`).join('')}
              </ol>
            </div>
            
          </div>
          <div class="company-info-bottom">
              <div class="company-inf">
                <h2>${selectedData.position}</h2>
                <span>So Digital Inc.</span>
              </div>
              <div class="bottom-btn">
              <a href="https://example.com/scoot/apply">Apply Now</a>
              </div>
            </div>
        </div>`;
      content.classList.add('d-none');
      searchForm.classList.add('d-none');
    })
}

// tüm input değerleri yakalama ve filtreleme işlemleri
function applyFilters(data) {
  const searchTxtDesktop = searchWordDesktop.value.trim().toLowerCase();
  const searchLocationsDesktop = searchLocationDesktop.value.trim().toLowerCase();
  const searchTxtMobile = searchWordMobile.value.trim().toLowerCase();
  const searchLocationsMobile = searchLocationMobile.value.trim().toLowerCase();
  const isFullTimeCheckedDesktop = fullTimeCheckbox.checked;
  const isFullTimeCheckedMobile = fullTimeCheckboxMobile.checked;
  const isFullTimeChecked = isFullTimeCheckedDesktop || isFullTimeCheckedMobile;

  const searchTxt = searchTxtDesktop || searchTxtMobile;
  const searchLocations = searchLocationsDesktop || searchLocationsMobile;

  const filteredData = data.filter((item) => {
    const matchesText = !searchTxt ||
      item.company.toLowerCase().includes(searchTxt) ||
      item.position.toLowerCase().includes(searchTxt) ||
      item.postedAt.toLowerCase().includes(searchTxt);

    const matchesLocation = !searchLocations ||
      item.location.toLowerCase().includes(searchLocations);

    const matchesFullTime = !isFullTimeChecked ||
      item.contract === 'Full Time';

    return matchesText && matchesLocation && matchesFullTime;
  });

  render(filteredData);
}

// searchBtn eventi ve diğer inputların event dinleme işlemleri
function setupEventListeners(data) {
  for (const searchBtn of searchBtns) {
    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      applyFilters(data);
      mobilDialog.close();
    });
  }

  searchWordDesktop.addEventListener('input', () => control(data));
  searchLocationDesktop.addEventListener('input', () => control(data));
  fullTimeCheckbox.addEventListener('change', () => applyFilters(data));
  searchLocationMobile.addEventListener('input', () => control(data));
  searchWordMobile.addEventListener('input', () => control(data));
  fullTimeCheckboxMobile.addEventListener('input', () => applyFilters(data));
}

// modal penceresi için event listener
function mobilFiltre() {
  const mobilBoiler = document.querySelector('.boiler');
  mobilBoiler.addEventListener('click', function (e) {
    e.preventDefault();
    mobilDialog.showModal();
  });
}

function control(data) {
  if (
    searchWordDesktop.value === '' &&
    searchLocationDesktop.value === '' &&
    fullTimeCheckbox.checked !== true &&
    searchLocationMobile.value === '' &&
    searchWordMobile.value === '' &&
    fullTimeCheckboxMobile.checked !== true
  ) {
    render(data);
  }
}

init();
