document.addEventListener('DOMContentLoaded', function() {
  // 1. Téma váltó gomb
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    const icon = this.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', newTheme);
    
    // Animáció hozzáadása
    this.classList.add('xyz-pulse');
    setTimeout(() => this.classList.remove('xyz-pulse'), 500);
  });

  // Alapértelmezett téma beállítása
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  const icon = themeToggle.querySelector('i');
  icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

  // 2. Keresési kártyák
  document.querySelectorAll('.search-card').forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Animáció
      this.classList.add('xyz-out');
      this.style.transform = 'scale(0.95)';
      
      // Szimulált navigáció (valós alkalmazásban átirányítás)
      setTimeout(() => {
        console.log(`Navigating to ${category} category`);
        alert(`Keresés indítása: ${category} kategória`);
        this.classList.remove('xyz-out');
        this.style.transform = '';
      }, 300);
    });
    
    // Billentyűzet támogatás
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // 3. AI ajánlások lapok
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Minden gomb és tartalom inaktiválása
      document.querySelectorAll('.tab-btn, .recommendation-content').forEach(el => {
        el.classList.remove('active');
      });
      
      // Aktív gomb és tartalom beállítása
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
      
      // Animáció
      this.classList.add('xyz-pulse');
      setTimeout(() => this.classList.remove('xyz-pulse'), 500);
    });
  });

  // 4. Kedvenc gombok
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const icon = this.querySelector('i');
      
      if (icon.classList.contains('far')) {
        // Hozzáadás
        icon.className = 'fas fa-heart';
        icon.style.color = '#EF4444';
        
        // Visszajelzés
        const feedback = document.createElement('span');
        feedback.className = 'wishlist-feedback xyz-in';
        feedback.setAttribute('xyz', 'fade up-1 duration-5');
        feedback.textContent = 'Hozzáadva!';
        this.appendChild(feedback);
        
        setTimeout(() => {
          feedback.remove();
        }, 1000);
      } else {
        // Eltávolítás
        icon.className = 'far fa-heart';
        icon.style.color = '';
      }
    });
  });

  // 5. Részletek gombok
  document.querySelectorAll('.btn.primary').forEach(button => {
    if (button.textContent.includes('Részletek')) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const destination = this.closest('.destination-card').querySelector('h3').textContent;
        
        // Animáció
        this.classList.add('xyz-pulse');
        setTimeout(() => this.classList.remove('xyz-pulse'), 500);
        
        // Szimulált részletek megjelenítése
        alert(`Részletek megjelenítése: ${destination}`);
      });
    }
  });

  // 6. AI asszisztens üzenetküldés
  const assistantInput = document.querySelector('.assistant-input input');
  const assistantSendBtn = document.querySelector('.assistant-input .btn');
  const assistantMessages = document.querySelector('.assistant-messages');

  function addMessage(content, isAI = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isAI ? 'ai-message' : 'user-message'} xyz-in`;
    messageDiv.setAttribute('xyz', 'fade small stagger-1 ease-out-back');
    
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas ${isAI ? 'fa-robot' : 'fa-user'}"></i>
      </div>
      <div class="message-content">
        <p>${content}</p>
      </div>
    `;
    
    assistantMessages.appendChild(messageDiv);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('kedvezmény') || lowerMessage.includes('akció')) {
      return "Jelenleg a következő kedvezményes ajánlatok állnak rendelkezésre:\n- Balaton: 35% kedvezmény\n- Maldív-szigetek: 20% korai foglalási kedvezmény\n- Dubai: 15% hosszútávú tartózkodásra";
    } else if (lowerMessage.includes('ajánl') || lowerMessage.includes('javasol')) {
      return "Az Ön korábbi utazásai alapján a következő célpontokat ajánlom:\n1. Kerala, India - kulturális élmények\n2. Szikhol, Grúzia - történelmi felfedezés\n3. Párizs, Franciaország - romantikus utazás";
    } else if (lowerMessage.includes('célpont') || lowerMessage.includes('nyaralás')) {
      return "A jelenlegi szezonban ezek a célpontok a legnépszerűbbek:\n- Bali, Indonézia\n- Olasz Riviera\n- Japán tavaszi virágzás\nMelyik érdekelne részletesebben?";
    } else {
      const randomResponses = [
        "Érdekes kérdés! Tudok segíteni bármilyen utazással kapcsolatos dologban.",
        "Kérdezzen bátran, szívesen segítek utazási terveiben!",
        "Az Ön korábbi preferenciái alapján ezeket ajánlom...",
        "Van néhány nagyszerű ajánlatom, melyek illeszkednek az Ön stílusához."
      ];
      return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }
  }

  function sendMessage() {
    const message = assistantInput.value.trim();
    if (message) {
      addMessage(message);
      assistantInput.value = '';
      
      setTimeout(() => {
        const response = getAIResponse(message);
        addMessage(response, true);
      }, 1000);
    }
  }

  assistantSendBtn.addEventListener('click', sendMessage);
  assistantInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // 7. Gyorskérdés gombok
  document.querySelectorAll('.quick-question-btn').forEach(button => {
    button.addEventListener('click', function() {
      const question = this.textContent;
      addMessage(question);
      
      setTimeout(() => {
        const response = getAIResponse(question);
        addMessage(response, true);
      }, 1000);
      
      // Animáció
      this.classList.add('xyz-pulse');
      setTimeout(() => this.classList.remove('xyz-pulse'), 500);
    });
  });

  // 8. Alsó navigációs menü - FRISSÍTVE
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Minden elem inaktiválása
      document.querySelectorAll('.bottom-nav .nav-item').forEach(el => {
        el.classList.remove('active');
      });
      
      // Aktív elem beállítása
      this.classList.add('active');
      
      // Animáció
      this.classList.add('xyz-pulse');
      setTimeout(() => this.classList.remove('xyz-pulse'), 500);
      
      // Az aktuális oldal tartalmának megjelenítése
      const page = this.querySelector('span').textContent;
      showPageContent(page);
    });
  });

  // 9. Oldaltartalmak kezelése
  function showPageContent(page) {
    // Elrejtjük az összes fő szekciót
    document.querySelectorAll('main > section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Megjelenítjük a kiválasztott oldal tartalmát
    switch(page) {
      case 'Kezdőlap':
        // Az összes fő szekciót megjelenítjük
        document.querySelectorAll('main > section').forEach(section => {
          section.style.display = 'block';
        });
        break;
      case 'Keresés':
        document.querySelector('.quick-search').style.display = 'block';
        document.querySelector('.ai-recommendations').style.display = 'block';
        break;
      case 'Kedvencek':
        // Létrehozunk egy üzenetet a kedvencek oldalhoz
        const favoritesContent = `
          <section class="favorites-page">
            <h2 class="section-title"><i class="fas fa-heart"></i> Kedvenceid</h2>
            <div class="no-favorites">
              <i class="fas fa-heart-broken"></i>
              <p>Még nincsenek kedvenceid</p>
              <button class="btn primary">Tallózz ajánlatokat</button>
            </div>
          </section>
        `;
        document.querySelector('main').insertAdjacentHTML('beforeend', favoritesContent);
        break;
      case 'Profil':
        // Létrehozunk egy egyszerű profil oldalt
        const profileContent = `
          <section class="profile-page">
            <h2 class="section-title"><i class="fas fa-user"></i> Profilod</h2>
            <div class="profile-card">
              <div class="profile-header">
                <img src="https://i.pravatar.cc/150?img=3" alt="Profilkép" class="profile-image">
                <h3>Gergő</h3>
                <p class="member-since">Tag since: 2021</p>
              </div>
              <div class="profile-details">
                <div class="detail-item">
                  <i class="fas fa-envelope"></i>
                  <span>gergo@example.com</span>
                </div>
                <div class="detail-item">
                  <i class="fas fa-phone"></i>
                  <span>+36 30 123 4567</span>
                </div>
                <div class="detail-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>Budapest, Magyarország</span>
                </div>
              </div>
              <button class="btn primary">Profil szerkesztése</button>
            </div>
          </section>
        `;
        document.querySelector('main').insertAdjacentHTML('beforeend', profileContent);
        break;
    }
    
    // Görgetés az oldal tetejére
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 10. Statisztika diagram
  const ctx = document.getElementById('travelStatsChart').getContext('2d');
  const travelStatsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({length: 31}, (_, i) => i + 1 + '.'),
      datasets: [
        {
          label: 'Kulturális',
          data: [0,0,0,0,0,0,0,0,9,80,11,18,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],
          backgroundColor: '#6366F1',
          borderRadius: 4
        },
        {
          label: 'Kikapcsolódás',
          data: [0,0,0,0,0,0,0,0,5,70,10,15,18,20,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],
          backgroundColor: '#10B981',
          borderRadius: 4
        },
        {
          label: 'Üzleti',
          data: [0,0,0,0,0,0,0,0,3,60,8,12,15,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52],
          backgroundColor: '#F59E0B',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: { callback: value => value + '%' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => context.dataset.label + ': ' + context.raw + '%'
          }
        }
      }
    }
  });

  // 11. Animációk kezelése scrollozáskor
  function handleAnimations() {
    document.querySelectorAll('.xyz-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        el.classList.add('xyz-in');
      }
    });
  }

  window.addEventListener('scroll', handleAnimations);
  handleAnimations(); // Azonnali ellenőrzés betöltéskor
});