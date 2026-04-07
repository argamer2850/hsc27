// রাইট ক্লিক বন্ধ করা
document.addEventListener('contextmenu', event => event.preventDefault());

// কিবোর্ড শর্টকাট বন্ধ করা
document.onkeydown = function(e) {
  if(e.keyCode == 123) return false; // F12
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
}

function openSubject(sub) {
    sessionStorage.setItem('currentSubject', sub);
    sessionStorage.setItem('currentScreen', 'chapter-screen');
    const list = document.getElementById('chapter-list');
    document.getElementById('sub-title').innerText = sub;
    list.innerHTML = '';
    const chaps = database[sub] || [];
    
    chaps.forEach(ch => {
        const d = document.createElement('div');
        d.className = 'list-item';
        d.onclick = () => openVideoList(ch);
        
        let totalVideos = 0;
        let totalSecs = 0; 

        if (ch.mainVideos && ch.mainVideos.length > 0) {
            totalVideos = ch.mainVideos.length;
            totalSecs = getVideoListTotalDuration(ch.mainVideos);
        } else if (ch.extraSections && ch.extraSections.length > 0) {
            const firstSection = ch.extraSections[0];
            if (firstSection.videos && firstSection.videos.length > 0) {
                totalVideos = firstSection.videos.length;
                totalSecs = getVideoListTotalDuration(firstSection.videos);
            }
        }

        const durationHtml = totalSecs > 0 ? `<br><span style="font-size: 0.75rem; color: white; font-weight: 400;">${formatTotalDuration(totalSecs)}</span>` : '';
        
        d.innerHTML = `<span>${ch.chapter}</span> <span class="play-icon" style="text-align: center;">${totalVideos} Classes ${durationHtml}</span>`;
        list.appendChild(d);
    });
    
    navTo('chapter-screen');
}

function openVideoList(chObj) {
    sessionStorage.setItem('currentChapter', chObj.chapter);
    sessionStorage.setItem('currentScreen', 'video-list-screen');
    
    const vContainer = document.getElementById('video-list-container');
    const mContainer = document.getElementById('chap-materials');
    const videoMeta = document.querySelector('.video-meta'); 
    
    document.getElementById('chap-title').innerText = chObj.chapter;
    vContainer.innerHTML = '';
    mContainer.innerHTML = '';

    if (chObj.mainVideos && chObj.mainVideos.length > 0) {
        renderVideoSection(vContainer, "⭐ মেইন ক্লাস (Main Classes)", chObj.mainVideos, true);
    }

    if (chObj.extraSections && chObj.extraSections.length > 0) {
        chObj.extraSections.forEach(section => {
            renderVideoSection(vContainer, section.title, section.videos, false);
        });
    }

    let hasValidMaterial = false;

    if (chObj.practiceSheets && chObj.practiceSheets.length > 0) {
        hasValidMaterial = chObj.practiceSheets.some(item => {
            let link = typeof item === 'object' ? item.link : item;
            return link && link !== 'N/A' && link !== 'LINK_HERE' && link !== '';
        });
    }

    if (!hasValidMaterial) {
        videoMeta.style.display = 'none';
    } else {
        videoMeta.style.display = 'block';
        
        chObj.practiceSheets.forEach((item) => {
            let btnName = "📥 ডাউনলোড ম্যাটেরিয়াল";
            let link = typeof item === 'object' ? item.link : item;
            
            if (typeof item === 'object') btnName = `📥 ${item.name}`;

            const matBtn = document.createElement('a');
            matBtn.className = 'action-btn btn-sheet';
            matBtn.innerHTML = btnName;
            matBtn.href = link;
            matBtn.target = "_blank";
            mContainer.appendChild(matBtn);
        });
    }

    navTo('video-list-screen');
}

function renderVideoSection(container, title, videos, isMain) {
    const h3 = document.createElement('h3');
    h3.style = `color: ${isMain ? 'var(--primary)' : 'var(--accent)'}; margin: 25px 0 15px 5px; font-size: 1.2rem; display: flex; justify-content: space-between; align-items: center;`;

    const sectionTotalSecs = getVideoListTotalDuration(videos);
    const durationText = sectionTotalSecs > 0 ? `<span style="font-size: 0.85rem; color: #94a3b8; font-weight: 400;">${formatTotalDuration(sectionTotalSecs)}</span>` : '';

    h3.innerHTML = `<span>${title}</span> ${durationText}`;
    container.appendChild(h3);

    videos.forEach((v, i) => {
        const d = document.createElement('div');
        d.className = 'list-item';
        d.onclick = () => playNow(v); 
        
        const label = isMain ? `Class ${i+1}: ` : "";
        let durationDisplay = "";

        if (v.duration && v.duration.trim() !== "") {
            durationDisplay = `🕒 ${v.duration}`;
        } else if (v.link && v.link.trim() !== "") {
            durationDisplay = "▶ Get Video";
        } else if (v.id && v.id.trim() !== "") {
            durationDisplay = "🕒 --:--";
        } else {
            durationDisplay = "⏳ Not Uploaded";
            d.style.opacity = "0.6"; 
            d.style.pointerEvents = "none"; 
        }
        
        d.innerHTML = `<span>${label}${v.title}</span> <span class="play-icon">${durationDisplay}</span>`;
        container.appendChild(d);
    });
}

let player;
let timeUpdater;
let showRemaining = false;

function onYouTubeIframeAPIReady() {
    let playerVarsConfig = {
        'autoplay': 1,
        'controls': 0, 
        'disablekb': 1, 
        'fs': 0, 
        'rel': 0, 
        'modestbranding': 1, 
        'playsinline': 1,
        'iv_load_policy': 3 
    };

    if (typeof isNormalPlayerUser !== 'undefined' && isNormalPlayerUser) {
        playerVarsConfig.controls = 1; 
        playerVarsConfig.disablekb = 0; 
        playerVarsConfig.fs = 1; 
    }

    player = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        playerVars: playerVarsConfig,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    if (typeof isNormalPlayerUser !== 'undefined' && isNormalPlayerUser) return;
    document.getElementById('video-overlay').addEventListener('click', (e) => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) return;
        if (!isDragging) {
            togglePlay();
        }
    });
    
    document.getElementById('play-pause-btn').addEventListener('click', togglePlay);
    
    const volumeSlider = document.getElementById('volume-slider');
    const volumeDisplay = document.getElementById('volume-display');

    volumeSlider.addEventListener('input', (e) => {
        let vol = e.target.value;
        player.setVolume(vol);
        if(volumeDisplay) {
            volumeDisplay.innerText = vol + "%";
        }
        if(vol > 0) player.unMute();
        else player.mute();
    });

    document.getElementById('mute-btn').addEventListener('click', () => {
        if(player.isMuted()) {
            player.unMute();
            document.getElementById('volume-slider').value = player.getVolume();
        } else {
            player.mute();
            document.getElementById('volume-slider').value = 0;
        }
    });

    const speedDropdown = document.getElementById('speed-select-dropdown');
    const customSpeedInput = document.getElementById('speed-input-custom');

    // ড্রপডাউন পরিবর্তনের লজিক
    speedDropdown.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            customSpeedInput.classList.remove('hidden');
            customSpeedInput.focus();
        } else {
            customSpeedInput.classList.add('hidden');
            let speed = parseFloat(e.target.value);
            player.setPlaybackRate(speed);
        }
    });

    // কাস্টম ইনপুট ম্যানুয়ালি দেওয়ার লজিক (সর্বোচ্চ ২.০)
    customSpeedInput.addEventListener('input', (e) => {
        let speed = parseFloat(e.target.value);
        if(speed >= 0.25 && speed <= 2.0) {
            player.setPlaybackRate(speed);
        } else if (speed > 2.0) {
            e.target.value = 2.0;
            player.setPlaybackRate(2.0);
        }
    });

    const progressContainer = document.getElementById('progress-container');
    const timePreview = document.getElementById('time-preview');
    let isDragging = false;

    const handleMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const rect = progressContainer.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        
        document.getElementById('progress-bar').style.width = `${pos * 100}%`;
        const time = pos * player.getDuration();
        timePreview.innerText = formatTime(time);
        timePreview.style.left = `${pos * 100}%`;
        timePreview.style.display = 'block';

        player.seekTo(time, true);
    };

    const startDrag = (e) => {
        isDragging = true;
        handleMove(e);
    };

    const stopDrag = () => {
        isDragging = false;
        timePreview.style.display = 'none';
    };

    progressContainer.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDrag);

    progressContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleMove(e);
    });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', stopDrag);

    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
}

function onPlayerStateChange(event) {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    if (event.data == YT.PlayerState.PLAYING) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        timeUpdater = setInterval(updateProgress, 500);
        document.getElementById('duration').innerText = formatTime(player.getDuration());

        if (shouldAutoFullscreen) {
            toggleFullScreen(); 
            shouldAutoFullscreen = false; 
        }
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        clearInterval(timeUpdater);
    }
    if (event.data == YT.PlayerState.ENDED) {
        const videoId = player.getVideoData().video_id;
        localStorage.removeItem('resume_' + videoId);
    }
}

function togglePlay() {
    isAutoPaused = false;
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function updateProgress() {
    const current = player.getCurrentTime();
    const duration = player.getDuration();
    const percentage = (current / duration) * 100;
    
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    document.getElementById('current-time').innerText = formatTime(current);

    const videoId = player.getVideoData().video_id;
    if (videoId) {
        localStorage.setItem('resume_' + videoId, current);
    }

    const durationSpan = document.getElementById('duration');
    if (showRemaining) {
        const remaining = duration - current;
        durationSpan.innerText = "-" + formatTime(remaining);
    } else {
        durationSpan.innerText = formatTime(duration);
    }
}

function formatTime(seconds) {
    if (!seconds) return "0:00";
    seconds = Math.floor(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
        return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function toggleFullScreen() {
    const container = document.getElementById('video-container');
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) { container.requestFullscreen(); }
        else if (container.webkitRequestFullscreen) { container.webkitRequestFullscreen(); }
    } else {
        if (document.exitFullscreen) { document.exitFullscreen(); }
        else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    }
}

let shouldAutoFullscreen = false; 

function playNow(video) {
    sessionStorage.setItem('currentVideo', video.title);
    sessionStorage.setItem('currentScreen', 'player-screen');
    const videoContainer = document.querySelector('.custom-video-container');
    const linkContainer = document.getElementById('external-link-container');
    const notUploadedContainer = document.getElementById('not-uploaded-container');
    const linkBtn = document.getElementById('external-link-btn');
    const vidTitle = document.getElementById('vid-title');

    vidTitle.innerText = video.title;

    if (videoContainer) videoContainer.style.display = 'none';
    if (linkContainer) linkContainer.style.display = 'none';
    if (notUploadedContainer) notUploadedContainer.style.display = 'none';

    const isMissingId = !video.id || video.id === 'ID_HERE' || video.id === 'LINK_HERE' || video.id === '#' || video.id === 'LINK';
    const hasExternalLink = video.link && video.link !== '#' && video.link !== 'N/A';

    if (isMissingId) {
        if (hasExternalLink) {
            if (linkContainer) {
                linkContainer.style.display = 'block';
                linkBtn.href = video.link;
            }
        } else {
            if (notUploadedContainer) notUploadedContainer.style.display = 'block';
        }
    } else {
        if (videoContainer) videoContainer.style.display = 'block';

        const savedTime = localStorage.getItem('resume_' + video.id);
        const startAt = savedTime ? parseFloat(savedTime) : 0;

        if (player && player.loadVideoById) {
            player.loadVideoById({ 
                'videoId': video.id, 
                'suggestedQuality': 'hd1080',
                'startSeconds': startAt 
            });
        }
        
        if (shouldAutoFullscreen) {
            setTimeout(toggleFullScreen, 500);
            shouldAutoFullscreen = false; 
        }
    }
    
    const slideContainer = document.getElementById('slide-buttons-container');
    if (slideContainer) {
        slideContainer.innerHTML = '';

        let slides = video.slide;
        const slidesArray = (slides && Array.isArray(slides)) 
                            ? slides 
                            : [{ name: "ক্লাস স্লাইড", link: slides || '' }];
        
        let hasValidSlide = slidesArray.some(s => {
            return s.link && s.link !== 'N/A' && s.link !== 'LINK_HERE' && s.link !== '' && s.link !== '#';
        });

        if (!hasValidSlide) {
            slideContainer.style.display = 'none';
        } else {
            slideContainer.style.display = 'flex'; 
            
            slidesArray.forEach(s => {
                if (s.link && s.link !== 'N/A' && s.link !== 'LINK_HERE' && s.link !== '' && s.link !== '#') {
                    const btn = document.createElement('a');
                    btn.className = 'action-btn btn-slide';
                    btn.innerHTML = `📄 ${s.name}`;
                    btn.href = s.link;
                    btn.target = "_blank";
                    
                    slideContainer.appendChild(btn);
                }
            });
        }
    }

    navTo('player-screen');
} 

let controlTimeout;
let cursorTimeout;
const container = document.getElementById('video-container');
const controls = document.getElementById('controls');

function showControls() {
    container.classList.add('show-controls');
    container.classList.remove('hide-cursor');
    clearTimeout(controlTimeout);
    clearTimeout(cursorTimeout);

    controlTimeout = setTimeout(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            container.classList.remove('show-controls');
        }
    }, 4000);

    cursorTimeout = setTimeout(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            container.classList.add('hide-cursor');
        }
    }, 4000);
}

function resetAutoHide() {
    showControls();
}

function toggleDurationView() {
    showRemaining = !showRemaining;
    updateProgress(); 
}

container.addEventListener('mousemove', resetAutoHide);
container.addEventListener('mouseenter', resetAutoHide);
container.addEventListener('touchstart', showControls);
container.addEventListener('click', showControls);

controls.addEventListener('mouseenter', () => {
    container.classList.remove('hide-cursor');
    clearTimeout(controlTimeout);
    clearTimeout(cursorTimeout);
});

controls.addEventListener('mouseleave', () => {
    showControls();
});

container.addEventListener('mouseleave', () => {
    container.classList.remove('hide-cursor');
    clearTimeout(cursorTimeout);
});



let seekAccumulator = 0; 
let seekTimeout;

function showSeekMessage(seconds) {
    seekAccumulator += seconds;
    const indicator = document.getElementById('seek-indicator');
    
    // ইউটিউবের মত ডানে-বামে পজিশন সেট করা
    if (seekAccumulator < 0) {
        indicator.style.left = '10%';
        indicator.style.right = 'auto';
        indicator.style.transform = 'translateY(-50%)';
    } else if (seekAccumulator > 0) {
        indicator.style.left = 'auto';
        indicator.style.right = '10%';
        indicator.style.transform = 'translateY(-50%)';
    } else {
        indicator.style.left = '50%';
        indicator.style.right = 'auto';
        indicator.style.transform = 'translate(-50%, -50%)';
    }

    const sign = seekAccumulator > 0 ? "+" : "";
    indicator.innerText = `${sign}${seekAccumulator} সেকেন্ড`;
    indicator.style.display = 'block';
    
    clearTimeout(seekTimeout);
    
    // ইউটিউব খুব দ্রুত ইনডিকেটর হাইড করে, তাই ৮০০ মিলি-সেকেন্ড দেওয়া হলো
    seekTimeout = setTimeout(() => {
        indicator.style.display = 'none';
        seekAccumulator = 0;
    }, 800); 
}

document.getElementById('rewind-btn').addEventListener('click', () => {
    player.seekTo(player.getCurrentTime() - 5, true);
    showSeekMessage(-5);
});

document.getElementById('forward-btn').addEventListener('click', () => {
    player.seekTo(player.getCurrentTime() + 5, true);
    showSeekMessage(5);
});

let isPlayerFocused = false;

document.getElementById('video-container').addEventListener('click', (e) => {
    isPlayerFocused = true;
    e.stopPropagation(); 
});

document.addEventListener('click', () => {
    isPlayerFocused = false;
});

function updateVolumeUI(vol) {
    const slider = document.getElementById('volume-slider');
    const display = document.getElementById('volume-display');
    if (slider) slider.value = vol;
    if (display) display.innerText = vol + "%";
    
    if(vol > 0) player.unMute();
    else player.mute();
}

document.addEventListener('keydown', (e) => {
    if (typeof isNormalPlayerUser !== 'undefined' && isNormalPlayerUser) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (!player) return;

    const playerScreen = document.getElementById('player-screen');
    const isPlayerVisible = playerScreen && !playerScreen.classList.contains('hidden');
    if (!isPlayerVisible) return;

    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowRight':
            player.seekTo(player.getCurrentTime() + 5, true);
            showSeekMessage(5);
            break;
        case 'ArrowLeft':
            player.seekTo(player.getCurrentTime() - 5, true);
            showSeekMessage(-5);
            break;
        case 'ArrowUp':
            if (isPlayerFocused) {
                e.preventDefault();
                let vUp = Math.min(player.getVolume() + 5, 100);
                player.setVolume(vUp);
                updateVolumeUI(vUp);
                showVolumeStatus(vUp);
            }
            break;
        case 'ArrowDown':
            if (isPlayerFocused) {
                e.preventDefault();
                let vDown = Math.max(player.getVolume() - 5, 0);
                player.setVolume(vDown);
                updateVolumeUI(vDown);
                showVolumeStatus(vDown);
            }
            break;
        case 'KeyF':
            toggleFullScreen();
            break;
    }
});

let isAutoPaused = false;

function handleVisibilityChange() {
    if (!player || typeof player.getPlayerState !== 'function') return;
    
    if (document.hidden) {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING) {
            isAutoPaused = true;
            player.pauseVideo();
        }
    } else {
        if (isAutoPaused) {
            player.playVideo();
            isAutoPaused = false;
        }
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

window.addEventListener("blur", function() {
    if (document.hidden) return; // visibilitychange ইভেন্টকে প্রাধান্য দিতে
    if (player && typeof player.getPlayerState === 'function' && player.getPlayerState() === YT.PlayerState.PLAYING) {
        isAutoPaused = true;
        player.pauseVideo();
    }
});

window.addEventListener("focus", function() {
    if (isAutoPaused && player && typeof player.playVideo === 'function') {
        player.playVideo();
        isAutoPaused = false;
    }
});

document.getElementById('play-pause-btn').addEventListener('click', () => {
    isAutoPaused = false; 
});

document.addEventListener('copy', (e) => { e.preventDefault(); });
document.addEventListener('selectstart', (e) => { e.preventDefault(); });
document.addEventListener('dragstart', (e) => { e.preventDefault(); });

document.getElementById('search-box').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    let query = document.getElementById('search-box').value.toLowerCase().trim();
    if (!query) return;

    for (let subject in database) {
        let chapters = database[subject];
        for (let ch of chapters) {
            
            // ১. mainVideos-এর ভেতরে সার্চ
            if (ch.mainVideos) {
                for (let v of ch.mainVideos) {
                    if (v.keywords && v.keywords.some(k => k.toLowerCase() === query)) {
                        openSubject(subject); 
                        openVideoList(ch);
                        playNow(v);
                        return; 
                    }
                }
            }
            
            // ২. extraSections-এর ভেতরেও সার্চ
            if (ch.extraSections) {
                for (let section of ch.extraSections) {
                    if (section.videos) {
                        for (let v of section.videos) {
                            if (v.keywords && v.keywords.some(k => k.toLowerCase() === query)) {
                                openSubject(subject); 
                                openVideoList(ch);
                                playNow(v);
                                return; 
                            }
                        }
                    }
                }
            }
            
        }
    }
    alert("দুঃখিত, এই কি-ওয়ার্ডের কোনো ভিডিও পাওয়া যায়নি।");
}

window.onload = function() {
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    renderSubjectCards(); 

    const lastScreen = sessionStorage.getItem('currentScreen');
    const sub = sessionStorage.getItem('currentSubject');
    const chap = sessionStorage.getItem('currentChapter');
    const vidTitle = sessionStorage.getItem('currentVideo');

    if (lastScreen && sub && database[sub]) {
        if (lastScreen === 'chapter-screen') {
            openSubject(sub);
        } 
        else if ((lastScreen === 'video-list-screen' || lastScreen === 'player-screen') && chap) {
            const chObj = database[sub].find(c => c.chapter === chap);
            if (chObj) {
                openSubject(sub); 
                openVideoList(chObj); 
                
                if (lastScreen === 'player-screen' && vidTitle) {
                    let targetVid = chObj.mainVideos?.find(v => v.title === vidTitle);
                    if(!targetVid && chObj.extraSections) {
                        chObj.extraSections.forEach(sec => {
                            let found = sec.videos?.find(v => v.title === vidTitle);
                            if(found) targetVid = found;
                        });
                    }
                    if(targetVid) {
                        playNow(targetVid);
                    }
                }
            } else {
                navTo('subject-screen', false);
            }
        }
    } else {
        navTo('subject-screen', false);
    }
};

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const systemTheme = window.matchMedia('(prefers-color-scheme: light)');

function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        themeIcon.innerText = '🌙';
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.innerText = '☀️';
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    applyTheme(true); 
} else if (savedTheme === 'dark') {
    applyTheme(false); 
} else {
    applyTheme(systemTheme.matches);
}

themeToggle.addEventListener('click', () => {
    const isCurrentlyLight = document.body.classList.contains('light-mode');
    applyTheme(!isCurrentlyLight);
    localStorage.setItem('theme', !isCurrentlyLight ? 'light' : 'dark');
});

systemTheme.addEventListener('change', (e) => {
    applyTheme(e.matches);
    localStorage.setItem('theme', e.matches ? 'light' : 'dark'); 
});

let lastTap = 0;
const videoOverlay = document.getElementById('video-overlay');

videoOverlay.addEventListener('touchstart', function (e) {
    const now = new Date().getTime();
    const timesince = now - lastTap;
    
    if (timesince < 300 && timesince > 0) {
        const width = videoOverlay.offsetWidth;
        const touchX = e.touches[0].clientX;

        if (touchX < width / 2) {
            player.seekTo(player.getCurrentTime() - 5, true);
            showSeekMessage(-5);
        } else {
            player.seekTo(player.getCurrentTime() + 5, true);
            showSeekMessage(5);
        }
        e.preventDefault(); 
    }
    lastTap = now;
});

let volumeTimeout;

function showVolumeStatus(vol) {
    const indicator = document.getElementById('volume-indicator');
    const statusText = document.getElementById('volume-status-text');
    
    statusText.innerText = Math.round(vol) + "%";
    indicator.classList.remove('hidden');
    indicator.style.opacity = "1";

    clearTimeout(volumeTimeout);
    volumeTimeout = setTimeout(() => {
        indicator.style.opacity = "0";
        setTimeout(() => indicator.classList.add('hidden'), 300);
    }, 1000); 
}

function parseDurationToSeconds(durationStr) {
    if (!durationStr || typeof durationStr !== 'string') return 0;
    const parts = durationStr.split(':').map(Number);
    if (parts.length === 3) {
        return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
    } 
    else if (parts.length === 2) {
        return (parts[0] || 0) * 60 + (parts[1] || 0);
    }
    return 0;
}

function formatTotalDuration(totalSeconds) {
    if (totalSeconds === 0) return '';
    
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    
    if (h > 0 && m === 0) {
        return `⏱️ ${h} ঘণ্টা`;
    }
    if (h > 0 && m > 0) {
        return `⏱️ ${h} ঘণ্টা ${m} মিনিট`;
    }
    if (m > 0) {
        return `⏱️ ${m} মিনিট`;
    }
    
    return ''; 
}

function renderSubjectCards() {
    const container = document.getElementById('subject-cards-container');
    if (!container) return;

    container.innerHTML = ''; 

    Object.keys(database).forEach(subject => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openSubject(subject);
        card.innerHTML = `<h3>${subject}</h3>`;
        container.appendChild(card);
    });
}

function getVideoListTotalDuration(videoArray) {
    let total = 0;
    if (videoArray && Array.isArray(videoArray)) {
        videoArray.forEach(v => {
            if (v.duration) {
                total += parseDurationToSeconds(v.duration);
            }
        });
    }
    return total;
}

function goHome() {
    sessionStorage.clear();
    navTo('subject-screen');
    window.location.reload(); 
}

let appHistoryCount = 0;

function navTo(id, pushHistory = true) {
    const element = document.getElementById(id);
    if (!element) return;

    sessionStorage.setItem('currentScreen', id);

    if (id === 'subject-screen') {
        sessionStorage.clear(); 
    } else if (id === 'chapter-screen') {
        sessionStorage.removeItem('currentChapter');
        sessionStorage.removeItem('currentVideo');
    } else if (id === 'video-list-screen') {
        sessionStorage.removeItem('currentVideo');
    }
    
    const loaderBar = document.getElementById('site-loader-bar');
    const loaderContainer = document.getElementById('site-loader-container');
    
    if(loaderContainer && loaderBar) {
        loaderContainer.style.display = 'block';
        loaderContainer.classList.add('active-lock');
        loaderBar.style.width = '30%';
    }
    
    isPlayerFocused = false;

    ['subject-screen', 'chapter-screen', 'video-list-screen', 'player-screen'].forEach(s => {
        const el = document.getElementById(s);
        if(el) el.classList.add('hidden');
    });
    
    element.classList.remove('hidden');
    
    if(loaderContainer && loaderBar) {
        setTimeout(() => {
            loaderBar.style.width = '100%';
            setTimeout(() => {
                loaderContainer.classList.remove('active-lock');
                loaderContainer.classList.add('fade-out');
                setTimeout(() => {
                    loaderContainer.style.display = 'none';
                    loaderContainer.classList.remove('fade-out');
                    loaderBar.style.width = '0%';
                }, 500);
            }, 550);
        }, 150);
    }

    if (pushHistory) {
        appHistoryCount++; 
        window.history.pushState({ screen: id }, "", `#${id}`);
    }
    window.scrollTo(0,0);
}

function goBackUI(fallbackId) {
    if (appHistoryCount > 0) {
        window.history.back(); 
    } else {
        navTo(fallbackId, true);
    }
}

function stopAndNavTo(id) {
    if(player && player.pauseVideo) {
        try { player.pauseVideo(); } catch(e) {}
    }
    goBackUI(id); 
}

window.addEventListener('popstate', (event) => {
    if (appHistoryCount > 0) {
        appHistoryCount--;
    }

    if (typeof player !== 'undefined' && player.pauseVideo) {
        try { player.pauseVideo(); } catch(e) {}
    }

    if (event.state && event.state.screen) {
        const screens = ['subject-screen', 'chapter-screen', 'video-list-screen', 'player-screen'];
        if (screens.includes(event.state.screen)) {
            navTo(event.state.screen, false);
        } else {
            navTo('subject-screen', false);
        }
    } else {
        navTo('subject-screen', false);
    }
});