 <script>
        let isLoggedIn = false;
        let favorites = [];

        function loadContent(page) {
            const mainContent = document.getElementById('mainContent');
            switch(page) {
                case 'home':
                    mainContent.innerHTML = `
                        <h1>Экии, ${isLoggedIn ? document.getElementById('username').textContent : 'аалчы'}!</h1>
                        <div class="section">
                            <h2 class="section-title">Сеңээ таарыштыр</h2>
                            <div class="card-grid">
                                ${createCard('Тыва хөөмей', 'Хөөмейниң эң-не эки ырлары', 'tyva-khoomei.jpg')}
                                ${createCard('Амгы үениң ырылары', 'Тываның аныяк салгалының ырлары', 'amgy-uenin-yrylary.jpg')}
                                ${createCard('Тыва рок', 'Тываның рок бөлүктериниң эң эки ырлары', 'tyva-rock.jpg')}
                            </div>
                        </div>
                        <div class="section">
                            <h2 class="section-title">Чоокта чаа дыңнаан</h2>
                            <div class="card-grid">
                                ${createCard('Саян Бапа', 'Хөөмейжи', 'sayan-bapa.jpg')}
                                ${createCard('Ят-Ха', 'Тыва рок бөлүк', 'yat-kha.jpg')}
                                ${createCard('Артыш Кара-оол', 'Амгы үениң ыраажызы', 'artysh-kara-ool.jpg')}
                            </div>
                        </div>
                    `;
                    break;
                case 'search':
                    mainContent.innerHTML = `
                        <h1>Дилээр</h1>
                        <div class="search-container">
                            <input type="text" class="search-input" placeholder="Ыраажы, ыры азы альбом дилээр...">
                        </div>
                        <div class="section">
                            <h2 class="section-title">Чүүлдер</h2>
                            <div class="card-grid">
                                ${createCard('Хөөмей', 'Тыва хөөмейниң эң эки үлегерлери', 'khoomei.jpg')}
                                ${createCard('Рок', 'Тыва рок музыказының чыындызы', 'rock.jpg')}
                                ${createCard('Чоннуң ыры', 'Тыва чоннуң ырларының эң эки чыындызы', 'chonnun-yry.jpg')}
                                ${createCard('Амгы үе', 'Амгы үениң тыва ыраажыларының чыындызы', 'amgy-ue.jpg')}
                            </div>
                        </div>
                    `;
                    break;
                case 'library':
                    if (isLoggedIn) {
                        mainContent.innerHTML = `
                            <h1>Сээң библиотекаң</h1>
                            <div class="section">
                                <h2 class="section-title">Чоокта чаа дыңнаан альбомнар</h2>
                                <div class="card-grid">
                                    ${createCard('Алаш Топ', 'Ят-Ха', 'alash-top.jpg')}
                                    ${createCard('Песни Степных Рек', 'Саян Бапа', 'pesni-stepnyh-rek.jpg')}
                                    ${createCard('Тувинские Кавер-Версии', 'Артыш Кара-оол', 'tuvinskie-kaver-versii.jpg')}
                                </div>
                            </div>
                        `;
                    } else {
                        mainContent.innerHTML = `
                            <h1>Библиотека</h1>
                            <p>Библиотеканы көөр дээш, бүрүткенип алыңар азы кириңер.</p>
                        `;
                    }
                    break;
                case 'playlists':
                    mainContent.innerHTML = `
                        <h1>Плейлисттер</h1>
                        <div class="card-grid">
                            ${createCard('Тыва хөөмей', 'Тываның эң-не эки хөөмейжилериниң ырлары', 'tyva-khoomei-playlist.jpg')}
                            ${createCard('Амгы үениң ырылары', 'Тываның аныяк салгалының ырлары', 'amgy-uenin-yrylary-playlist.jpg')}
                            ${createCard('Тыва рок', 'Тываның рок бөлүктериниң эң эки ырлары', 'tyva-rock-playlist.jpg')}
                            ${createCard('Чоннуң ырлары', 'Тываның төөгүлүг болгаш чоннуң ырлары', 'chonnun-yrlary-playlist.jpg')}
                        </div>
                    `;
                    break;
                case 'artists':
                    mainContent.innerHTML = `
                        <h1>Ыраажылар</h1>
                        <div class="card-grid">
                            ${createCard('Саян Бапа', 'Хөөмей, Чаңгы-хөөмей', 'sayan-bapa-artist.jpg')}
                            ${createCard('Ят-Ха', 'Тыва рок, Этно-рок', 'yat-kha-artist.jpg')}
                            ${createCard('Артыш Кара-оол', 'Амгы үениң ыры', 'artysh-kara-ool-artist.jpg')}
                            ${createCard('Команда Ондар', 'Хөөмей, Уругларның ыры', 'komanda-ondar-artist.jpg')}
                        </div>
                    `;
                    break;
                case 'favorites':
                    mainContent.innerHTML = `
                        <h1>Ынак ырылар</h1>
                        <ul class="playlist-tracks">
                            ${favorites.map(fav => `
                                <li class="playlist-track">
                                    <img src="https://example.com/images/${fav.image}" alt="${fav.track}" width="40" height="40">
                                    <div class="playlist-track-info">
                                        <div class="playlist-track-title">${fav.track}</div>
                                        <div class="playlist-track-artist">${fav.artist}</div>
                                    </div>
                                    <button class="like-button active" onclick="removeFromFavorites('${fav.track}')">
                                        <i class="material-icons">favorite</i>
                                    </button>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                    break;
                case 'login':
                    mainContent.innerHTML = `
                        <div class="auth-form">
                            <h2>Кирер</h2>
                            <input type="text" placeholder="Э-почта адрезиңер" id="loginEmail">
                            <input type="password" placeholder="Чажыт сөзүңер" id="loginPassword">
                            <button onclick="login()">Кирер</button>
                        </div>
                    `;
                    break;
                case 'register':
                    mainContent.innerHTML = `
                        <div class="auth-form">
                            <h2>Бүрүткээр</h2>
                            <input type="text" placeholder="Адыңар" id="registerName">
                            <input type="text" placeholder="Э-почта адрезиңер" id="registerEmail">
                            <input type="password" placeholder="Чажыт сөзүңер" id="registerPassword">
                            <button onclick="register()">Бүрүткээр</button>
                        </div>
                    `;
                    break;
            }
        }

        function createCard(title, description, image) {
            return `
                <div class="card" onclick="openPlaylist('${title}')">
                    <img src="https://example.com/images/${image}" alt="${title}" class="card-image" width="160" height="160">
                    <div class="card-title">${title}</div>
                    <div class="card-description">${description}</div>
                </div>
            `;
        }

        function openPlaylist(playlistTitle) {
            const tracks = generatePlaylistTracks(playlistTitle);
            const mainContent = document.getElementById('mainContent');
            mainContent.innerHTML = `
                <h1>${playlistTitle}</h1>
                <ul class="playlist-tracks">
                    ${tracks.map((track, index) => `
                        <li class="playlist-track">
                            <img src="https://example.com/images/${track.image}" alt="${track.title}" width="40" height="40">
                            <div class="playlist-track-info">
                                <div class="playlist-track-title">${track.title}</div>
                                <div class="playlist-track-artist">${track.artist}</div>
                            </div>
                            <div class="playlist-track-duration">${track.duration}</div>
                            <button class="like-button playlist-track-like" onclick="toggleLike('${track.title}', '${track.artist}', '${track.image}')">
                                <i class="material-icons">${favorites.some(fav => fav.track === track.title) ? 'favorite' : 'favorite_border'}</i>
                            </button>
                        </li>
                    `).join('')}
                </ul>
            `;
        }

        function generatePlaylistTracks(playlistTitle) {
            // Здесь мы генерируем фиктивные треки для плейлиста
            const tracks = [
                { title: "Хөөмей күүзү", artist: "Саян Бапа", duration: "3:45", image: "sayan-bapa-track1.jpg" },
                { title: "Кыш бажы", artist: "Ят-Ха", duration: "4:12", image: "yat-kha-track1.jpg" },
                { title: "Тувам", artist: "Артыш Кара-оол", duration: "3:58", image: "artysh-kara-ool-track1.jpg" },
                { title: "Хөөмейжи", artist: "Команда Ондар", duration: "4:30", image: "komanda-ondar-track1.jpg" },
                { title: "Чаяна", artist: "Саян Бапа", duration: "3:22", image: "sayan-bapa-track2.jpg" }
            ];
            return tracks;
        }

        let isPlaying = false;
        let currentTrack = '';
        let currentArtist = '';
        let currentImage = '';

        function playTrack(track, artist, image) {
            currentTrack = track;
            currentArtist = artist;
            currentImage = image;
            isPlaying = true;
            updatePlayerUI();
        }

        function togglePlay() {
            if (currentTrack) {
                isPlaying = !isPlaying;
                updatePlayerUI();
            }
        }

        function previousTrack() {
            console.log('Переключение на предыдущий трек');
        }

        function nextTrack() {
            console.log('Переключение на следующий трек');
        }

        function updatePlayerUI() {
            const playPauseIcon = document.getElementById('playPauseIcon');
            const progressBar = document.getElementById('progressBar');
            const currentTimeEl = document.getElementById('currentTime');
            const totalTimeEl = document.getElementById('totalTime');
            const playerTrackTitle = document.getElementById('playerTrackTitle');
            const playerTrackArtist = document.getElementById('playerTrackArtist');
            const playerTrackImage = document.getElementById('playerTrackImage');

            playerTrackTitle.textContent = currentTrack;
            playerTrackArtist.textContent = currentArtist;
            playerTrackImage.src = `https://example.com/images/${currentImage}`;
            playerTrackImage.alt = currentTrack;

            if (isPlaying) {
                playPauseIcon.textContent = 'pause';
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 1;
                    progressBar.style.width = `${progress}%`;
                    currentTimeEl.textContent = formatTime(progress * 3);
                    if (progress >= 100) {
                        clearInterval(interval);
                        isPlaying = false;
                        updatePlayerUI();
                    }
                }, 1000);
            } else {
                playPauseIcon.textContent = 'play_arrow';
            }

            totalTimeEl.textContent = '5:00';
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        function login() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log(`Выполняется вход: ${email}`);
            
            isLoggedIn = true;
            document.getElementById('authButtons').style.display = 'none';
            document.getElementById('userProfile').style.display = 'flex';
            document.getElementById('username').textContent = email.split('@')[0];
            loadContent('home');
        }

        function register() {
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            console.log(`Регистрация нового пользователя: ${name}, ${email}`);
            
            isLoggedIn = true;
            document.getElementById('authButtons').style.display = 'none';
            document.getElementById('userProfile').style.display = 'flex';
            document.getElementById('username').textContent = name;
            loadContent('home');
        }

        function toggleLikeCurrentTrack() {
            toggleLike(currentTrack, currentArtist, currentImage);
        }

        function toggleLike(track, artist, image) {
            const index = favorites.findIndex(fav => fav.track === track);
            if (index === -1) {
                favorites.push({ track, artist, image });
            } else {
                favorites.splice(index, 1);
            }
            updateLikeButtons(track);
        }

        function updateLikeButtons(track) {
            const likeButtons = document.querySelectorAll('.like-button');
            likeButtons.forEach(button => {
                const icon = button.querySelector('i');
                if (favorites.some(fav => fav.track === track)) {
                    icon.textContent = 'favorite';
                    button.classList.add('active');
                } else {
                    icon.textContent = 'favorite_border';
                    button.classList.remove('active');
                }
            });
        }

        function removeFromFavorites(track) {
            favorites = favorites.filter(fav => fav.track !== track);
            loadContent('favorites');
        }

        loadContent('home');
    </script>