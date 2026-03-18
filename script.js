// রাইট ক্লিক বন্ধ করা
document.addEventListener('contextmenu', event => event.preventDefault());

// কিবোর্ড শর্টকাট বন্ধ করা (F12, Ctrl+Shift+I, Ctrl+U)
document.onkeydown = function(e) {
  if(event.keyCode == 123) return false; // F12
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
}
    

    function navTo(id, pushHistory = true) {
    const element = document.getElementById(id);
    if (!element) return;

    ['subject-screen', 'chapter-screen', 'video-list-screen', 'player-screen'].forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
    
    element.classList.remove('hidden');

    // বাটনটি শুধু subject-screen (হোমপেজ) এ দেখাবে
    const homeBtn = document.getElementById('home-top-button');
    if (id === 'subject-screen') {
        homeBtn.style.display = 'block';
    } else {
        homeBtn.style.display = 'none';
    }

    if (pushHistory) {
        window.history.pushState({ screen: id }, "", `#${id}`);
    }
    window.scrollTo(0,0);
}

    function stopAndNavTo(id) {
    if(player && player.pauseVideo) player.pauseVideo();
    
    // ভিডিও প্লেয়ার থেকে বের হওয়ার সময়ও ব্রাউজারের হিস্ট্রি আপডেটের জন্য 
    // navTo-তে 'true' পাঠাতে হবে।
    navTo(id, true); 
}

    function openSubject(sub) {
        const list = document.getElementById('chapter-list');
        document.getElementById('sub-title').innerText = sub;
        list.innerHTML = '';
        const chaps = database[sub] || [];
        chaps.forEach(ch => {
            const d = document.createElement('div');
            d.className = 'list-item';
            d.onclick = () => openVideoList(ch);
            d.innerHTML = `<span>${ch.chapter}</span> <span class="play-icon">${ch.mainVideos?.length || 0} Classes</span>`;
            list.appendChild(d);
        });
        navTo('chapter-screen');
    }

    function openVideoList(chObj) {
    const vContainer = document.getElementById('video-list-container');
    const mContainer = document.getElementById('chap-materials');
    document.getElementById('chap-title').innerText = chObj.chapter;
    vContainer.innerHTML = '';
    
    // মেইন ক্লাস সেকশন
    if (chObj.mainVideos && chObj.mainVideos.length > 0) {
        const h3 = document.createElement('h3');
        h3.style = "color: var(--primary); margin: 20px 0 15px 5px; font-size: 1.2rem;";
        h3.innerText = "⭐ মেইন ক্লাস (Main Classes)";
        vContainer.appendChild(h3);

        chObj.mainVideos.forEach((v, i) => {
            const d = document.createElement('div');
            d.className = 'list-item';
            d.onclick = () => playNow(v);
            d.innerHTML = `<span>Class ${i+1}: ${v.title}</span> <span class="play-icon">▶ Watch Now</span>`;
            vContainer.appendChild(d);
        });
    }

    // এডিশনাল ক্লাস সেকশন
    if (chObj.extraVideos && chObj.extraVideos.length > 0) {
        const h3 = document.createElement('h3');
        h3.style = "color: var(--accent); margin: 30px 0 15px 5px; font-size: 1.2rem;";
        h3.innerText = "➕ এডিশনাল ক্লাস (Additional Classes)";
        vContainer.appendChild(h3);

        chObj.extraVideos.forEach((v, i) => {
            const d = document.createElement('div');
            d.className = 'list-item';
            d.onclick = () => playNow(v);
            d.innerHTML = `<span>Extra ${i+1}: ${v.title}</span> <span class="play-icon">▶ Watch Now</span>`;
            vContainer.appendChild(d);
        });
    }

    // --- চ্যাপ্টার ম্যাটেরিয়ালস (কাস্টম নামসহ একাধিক বাটন) লজিক শুরু ---
    mContainer.innerHTML = ''; 

    if (chObj.practiceSheets && chObj.practiceSheets.length > 0) {
        chObj.practiceSheets.forEach((item) => {
            // item এখন একটা অবজেক্ট হতে পারে { name: "নাম", link: "লিঙ্ক" }
            // আবার সরাসরি স্ট্রিং বা লিঙ্কও হতে পারে
            let btnName = "📥 ডাউনলোড ম্যাটেরিয়াল";
            let link = "";

            if (typeof item === 'object') {
                btnName = `📥 ${item.name}`; // ডাটাবেসে দেওয়া নাম নিবে
                link = item.link;
            } else {
                link = item; // যদি শুধু লিঙ্ক দেন তবে ডিফল্ট নাম থাকবে
            }

            if (link === 'LINK_HERE' || link === '#' || !link) return;

            const matBtn = document.createElement('a');
            matBtn.className = 'action-btn btn-sheet';
            matBtn.innerHTML = btnName;
            
            if (link === 'N/A') {
                matBtn.href = "javascript:void(0);";
                matBtn.onclick = () => alert("দুঃখিত! এটি এখনো দেওয়া হয়নি।");
            } else {
                matBtn.href = link;
                matBtn.target = "_blank";
            }
            
            matBtn.style.marginBottom = "10px";
            matBtn.style.display = "block";
            mContainer.appendChild(matBtn);
        });
    }
    // --- লজিক শেষ ---
    
    navTo('video-list-screen');
}

    // --- Custom Video Player Logic --- //
   let player;
let timeUpdater;
let showRemaining = false;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '100%',
            width: '100%',
            playerVars: {
                'autoplay': 1,
                'controls': 0, // Hides default controls
                'disablekb': 1, // Disable keyboard shortcuts
                'fs': 0, // Disable default fullscreen
                'rel': 0, // Don't show related videos
                'modestbranding': 1, // Minimize YouTube logo
                'playsinline': 1,
                'iv_load_policy': 3 // Hide annotations
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
function onPlayerReady(event) {
    // Overlay Click = Play/Pause (শুধুমাত্র পিসির জন্য)
    document.getElementById('video-overlay').addEventListener('click', (e) => {
        // এখানে চেক করা হচ্ছে ইউজার পিসি ব্যবহার করছে কি না
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if(!isMobile && !isDragging) {
            togglePlay();
        }
    });
    
    // Play/Pause Button
    document.getElementById('play-pause-btn').addEventListener('click', togglePlay);
    
    // Volume Slider
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

    // Mute Button
    document.getElementById('mute-btn').addEventListener('click', () => {
        if(player.isMuted()) {
            player.unMute();
            document.getElementById('volume-slider').value = player.getVolume();
        } else {
            player.mute();
            document.getElementById('volume-slider').value = 0;
        }
    });

    // স্পিড কন্ট্রোল লজিক
document.getElementById('speed-input').addEventListener('input', (e) => {
    let speed = parseFloat(e.target.value);
    
    // ইউটিউব প্লেয়ারের সর্বোচ্চ সীমা ২.০, তাই এখানে ২.০ এর বেশি দেওয়া যাবে না
    if(speed >= 0.25 && speed <= 2.0) {
        player.setPlaybackRate(speed);
    } else if (speed > 2.0) {
        // যদি কেউ ভুল করে ২ এর বেশি লেখে, তাকে ২ এ ফিরিয়ে আনা
        e.target.value = 2.0;
        player.setPlaybackRate(2.0);
    }
});

    // --- ড্র্যাগিং লজিক (পিসি ও মোবাইল) ---
    const progressContainer = document.getElementById('progress-container');
    const timePreview = document.getElementById('time-preview');
    let isDragging = false;

    const handleMove = (e) => {
        if (!isDragging) return;
        
        // টাচ ইভেন্ট নাকি মাউস ইভেন্ট তা চেক করা
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        
        const rect = progressContainer.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        
        // নীল বার ও প্রিভিউ আপডেট
        document.getElementById('progress-bar').style.width = `${pos * 100}%`;
        const time = pos * player.getDuration();
        timePreview.innerText = formatTime(time);
        timePreview.style.left = `${pos * 100}%`;
        timePreview.style.display = 'block';

        // ভিডিও সিক করা
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

    // মাউস ইভেন্ট
    progressContainer.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDrag);

    // টাচ ইভেন্ট (মোবাইলের জন্য)
    progressContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleMove(e);
    });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', stopDrag);

    // Fullscreen Toggle
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

        // অটো ফুলস্ক্রিন লজিক
        if (shouldAutoFullscreen) {
            toggleFullScreen(); // ফুলস্ক্রিন ফাংশন কল করুন
            shouldAutoFullscreen = false; // একবার হওয়ার পর এটি রিসেট করে দিন যাতে বারবার না হয়
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

    // --- নতুন অংশ: লোকাল স্টোরেজে সেভ করা ---
    // ভিডিওর আইডি অনুযায়ী তার বর্তমান সময় সেভ করে রাখা হচ্ছে
    const videoId = player.getVideoData().video_id;
    if (videoId) {
        localStorage.setItem('resume_' + videoId, current);
    }
    // ------------------------------------

    const durationSpan = document.getElementById('duration');
    if (showRemaining) {
        const remaining = duration - current;
        durationSpan.innerText = "-" + formatTime(remaining);
    } else {
        durationSpan.innerText = formatTime(duration);
    }
}

    // --- Updated Time Formatting Logic --- //
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

   let shouldAutoFullscreen = false; // এটি গ্লোবাল ডিক্লেয়ার করুন

function playNow(video) {
    const defaultVideoId = 'eztiE0DHtr0'; 
    let finalId = (video.id === 'ID_HERE' || !video.id || video.id === '#') ? defaultVideoId : video.id;

    // --- নতুন অংশ: সেভ করা টাইম খুঁজে বের করা ---
    const savedTime = localStorage.getItem('resume_' + finalId);
    const startAt = savedTime ? parseFloat(savedTime) : 0;
    // ------------------------------------------

    if(player && player.loadVideoById) {
        player.loadVideoById({ 
            'videoId': finalId, 
            'suggestedQuality': 'hd1080',
            'startSeconds': startAt // আগের দেখা অংশ থেকে শুরু হবে
        });
    }
    
    document.getElementById('vid-title').innerText = video.title;
    
    // নতুন স্লাইড বাটন লজিক (একাধিক বাটন সাপোর্ট করবে)
    const slideContainer = document.getElementById('slide-buttons-container');
    slideContainer.innerHTML = ''; // আগের বাটন মুছে ফেলা

    if (video.slide && Array.isArray(video.slide)) {
        // যদি ডাটাবেসে একাধিক স্লাইড থাকে
        video.slide.forEach(s => {
            const sBtn = document.createElement('a');
            sBtn.className = 'action-btn btn-slide';
            sBtn.style.marginBottom = "10px";
            sBtn.style.display = "block";
            sBtn.innerHTML = `📄 ${s.name}`;
            sBtn.href = s.link;
            sBtn.target = "_blank";
            slideContainer.appendChild(sBtn);
        });
    } else if (video.slide && video.slide !== 'LINK_HERE' && video.slide !== 'N/A' && video.slide !== '#') {
        // যদি একটি মাত্র লিঙ্ক (পুরানো নিয়ম) থাকে
        const sBtn = document.createElement('a');
        sBtn.className = 'action-btn btn-slide';
        sBtn.innerHTML = "📄 স্লাইড ডাউনলোড করুন";
        sBtn.href = video.slide;
        sBtn.target = "_blank";
        slideContainer.appendChild(sBtn);
    } else {
        // যদি কোনো স্লাইড না থাকে
        const noSlide = document.createElement('p');
        noSlide.style.color = "#94a3b8";
        noSlide.style.fontSize = "0.9rem";
        noSlide.innerText = "স্লাইড এখনো যুক্ত করা হয়নি।";
        slideContainer.appendChild(noSlide);
    }

    navTo('player-screen');

    if (finalId === targetVideoId) {
        setTimeout(toggleFullScreen, 500);
    }
}
    // কন্ট্রোল অটো-হাইড লজিক
// কন্ট্রোল অটো-হাইড লজিক
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

function showCursorOnly() {
    container.classList.remove('hide-cursor');
    clearTimeout(cursorTimeout);

    cursorTimeout = setTimeout(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            container.classList.add('hide-cursor');
        }
    }, 2000);
}

function resetAutoHide() {
    showControls();
}

function toggleDurationView() {
    showRemaining = !showRemaining;
    updateProgress(); // ক্লিক করার সাথে সাথে ভিউ আপডেট করার জন্য
}

// ইভেন্ট লিসেনারসমূহ
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

window.addEventListener('popstate', (event) => {
    // ভিডিও পজ করা
    if (typeof player !== 'undefined' && player.pauseVideo) {
        player.pauseVideo();
    }

    // যদি হিস্ট্রিতে স্ক্রিনের নাম থাকে তবে সেটি দেখাবে, না থাকলে হোম পেজে পাঠাবে
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
// স্পেস বাটন দিয়ে ভিডিও প্লে/পজ করার সংশোধিত কোড
document.addEventListener('keydown', (event) => {
    // চেক করা হচ্ছে কার্সার কি কোনো ইনপুট বক্স বা টেক্সট এরিয়াতে আছে কি না
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return; // ইনপুট বক্সে থাকলে এই ফাংশনটি আর কাজ করবে না (স্পেস লেখা যাবে)
    }

    // যদি বাটনটি স্পেস হয় এবং কার্সার ইনপুট বক্সে না থাকে
    if (event.code === 'Space') {
        event.preventDefault(); // পেজ যেন নিচে স্ক্রল না হয়
        togglePlay();           
    }
});
// --- Updated Seek Logic --- //
let seekAccumulator = 0; 
let seekTimeout;

function showSeekMessage(seconds) {
    seekAccumulator += seconds;
    const indicator = document.getElementById('seek-indicator');
    
    // পজিটিভ বা নেগেটিভ সাইনসহ সময় দেখানো
    const sign = seekAccumulator >= 0 ? "+" : "";
    indicator.innerText = `${sign}${seekAccumulator} সেকেন্ড`;
    indicator.style.display = 'block';
    
    // আগের টাইমার ক্লিয়ার করা যাতে বারবার ক্লিক করলে লেখা আপডেট হয়
    clearTimeout(seekTimeout);
    
    // ২ সেকেন্ড পর মেসেজটি হাইড হবে এবং কাউন্টার রিসেট হবে
    seekTimeout = setTimeout(() => {
        indicator.style.display = 'none';
        seekAccumulator = 0;
    }, 2000);
}

// কিবোর্ড ইভেন্ট লিসেনার
document.addEventListener('keydown', (e) => {
    if (!player) return;
    if (e.code === 'ArrowRight') {
        player.seekTo(player.getCurrentTime() + 5, true);
        showSeekMessage(5);
    } else if (e.code === 'ArrowLeft') {
        player.seekTo(player.getCurrentTime() - 5, true);
        showSeekMessage(-5);
    }
});

// মোবাইল বাটন ইভেন্ট লিসেনার
document.getElementById('rewind-btn').addEventListener('click', () => {
    player.seekTo(player.getCurrentTime() - 5, true);
    showSeekMessage(-5);
});

document.getElementById('forward-btn').addEventListener('click', () => {
    player.seekTo(player.getCurrentTime() + 5, true);
    showSeekMessage(5);
});
// কিবোর্ড আপ এরো / ডাউন এরো দিয়ে ভলিউম নিয়ন্ত্রণের কোড
document.addEventListener('keydown', (e) => {
    if (!player) return;
    
    // বর্তমান ভলিউম নেওয়া
    let currentVol = player.getVolume();
    
    if (e.code === 'ArrowUp') {
        e.preventDefault(); // পেজ স্ক্রল হওয়া বন্ধ করবে
        let newVol = Math.min(currentVol + 5, 100); // ১০০ এর বেশি হবে না
        player.setVolume(newVol);
        updateVolumeUI(newVol); // UI আপডেট করবে
    } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        let newVol = Math.max(currentVol - 5, 0); // ০ এর নিচে নামবে না
        player.setVolume(newVol);
        updateVolumeUI(newVol);
    }
});

// ভলিউম স্লাইডার এবং ডিসপ্লে আপডেট করার জন্য একটি ছোট ফাংশন
function updateVolumeUI(vol) {
    const slider = document.getElementById('volume-slider');
    const display = document.getElementById('volume-display');
    if (slider) slider.value = vol;
    if (display) display.innerText = vol + "%";
    
    // মিউট বা আনমিউট লজিক
    if(vol > 0) player.unMute();
    else player.mute();
}
document.addEventListener('keydown', (e) => {
    const playerScreen = document.getElementById('player-screen');
    const isPlayerVisible = playerScreen && !playerScreen.classList.contains('hidden');
    
    // যদি ইনপুট বক্সে লিখালিখি হয়, তবে শর্টকাট কাজ করবে না
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (isPlayerVisible && (e.key === 'f' || e.key === 'F')) {
        toggleFullScreen();
    }
});
// ট্যাব পরিবর্তন বা অন্য উইন্ডোতে (App) গেলে ভিডিও অটো পজ করার কোড
function pauseVideo() {
    if (player && player.pauseVideo) {
        player.pauseVideo();
    }
}

// ১. ট্যাব পরিবর্তন করলে (Tab Change)
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        pauseVideo();
    }
});

// ২. ব্রাউজার থেকে অন্য উইন্ডোতে বা অ্যাপে ক্লিক করলে (Window Focus Out)
window.addEventListener("blur", function() {
    pauseVideo();
});

// টেক্সট সিলেকশন বা কপি করা বন্ধ করা
document.addEventListener('copy', (e) => {
    e.preventDefault();
});

document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});

// ড্র্যাগ করা বন্ধ করা
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
// সার্চ বক্সের এন্টার কি (Enter Key) কাজ করানোর জন্য
document.getElementById('search-box').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    let query = document.getElementById('search-box').value.toLowerCase().trim();
    if (!query) return;

    let found = false;
    for (let subject in database) {
        let chapters = database[subject];
        for (let ch of chapters) {
            // মেইন ভিডিওগুলো চেক করা
            for (let v of ch.mainVideos) {
                if (v.keywords && v.keywords.some(k => k.toLowerCase() === query)) {
                    // প্রথমে সাবজেক্ট এবং চ্যাপ্টার লিস্ট পেজটা হিস্ট্রিতে পুশ করি
                    openSubject(subject); 
                    openVideoList(ch);
                    
                    // এবার ভিডিও প্লে করি
                    playNow(v);
                    found = true;
                    break;
                }
            }
        }
    }

    if (!found) {
        alert("দুঃখিত, এই কি-ওয়ার্ডের কোনো ভিডিও পাওয়া যায়নি।");
    }
}
// রিলোড দিলে সবসময় হোম পেজে (subject-screen) ফিরিয়ে নেওয়ার কোড
window.onload = function() {
    // URL থেকে পুরনো সব হ্যাশ (#) মুছে ফেলে ফ্রেশ করবে
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    // হোম স্ক্রিন দেখাবে
    navTo('subject-screen', false);
};
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// ব্রাউজারে আগে থেকে সেভ করা থিম চেক
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.innerText = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeIcon.innerText = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.innerText = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});
function showUpdateLog() {
    const listContainer = document.getElementById('full-class-list');
    listContainer.innerHTML = ''; // আগের লিস্ট ক্লিয়ার করা
    
    // ডাটাবেস থেকে সব সাবজেক্ট লুপ করা
    for (let subject in database) {
        database[subject].forEach(ch => {
            ch.mainVideos.forEach(video => {
                // প্রতিটি ভিডিওর জন্য একটি বক্স তৈরি
                const updateItem = document.createElement('div');
                updateItem.className = 'chapter-item';
                updateItem.style.display = 'flex';
                updateItem.style.justifyContent = 'space-between';
                
                updateItem.innerHTML = `
                    <div>
                        <strong style="color: var(--accent);">${subject}</strong> - ${ch.chapter}
                        <p style="font-size: 0.9rem; margin-top: 5px;">${video.title}</p>
                    </div>
                    <button class="action-btn" onclick="playSpecificVideo('${subject}', '${ch.chapter}', '${video.title}')" style="padding: 5px 10px; font-size: 0.75rem;">দেখুন</button>
                `;
                listContainer.appendChild(updateItem);
            });
        });
    }
    navTo('update-list-screen');
}

// এই ফাংশনটি লিস্ট থেকে সরাসরি ভিডিও প্লে করতে সাহায্য করবে
function playSpecificVideo(subjectName, chapterName, videoTitle) {
    const subject = database[subjectName];
    const ch = subject.find(c => c.chapter === chapterName);
    const v = ch.mainVideos.find(vid => vid.title === videoTitle);
    
    if (v) {
        openSubject(subjectName);
        openVideoList(ch);
        playNow(v);
    }
}
// পপআপ খোলার এবং লিস্ট জেনারেট করার ফাংশন
function openAllClassesModal() {
    const modal = document.getElementById('videoListModal');
    const listBody = document.getElementById('modal-class-list');
    listBody.innerHTML = '';
    let totalVideoCount = 0;

    for (const subject in database) {
        database[subject].forEach(chapterObj => {
            // মেইন ভিডিও লিস্ট প্রসেসিং
            chapterObj.mainVideos.forEach(video => {
                if (video.id !== '#' && video.id !== 'ID_HERE') {
                    totalVideoCount++;
                    const item = document.createElement('div');
                    item.className = 'list-item';
                    item.innerHTML = `
                        <div style="flex:1">
                            <div style="font-size: 0.75rem; color: var(--accent); opacity: 0.8;">${subject} • ${chapterObj.chapter}</div>
                            <div style="font-weight: 600; font-size: 0.95rem;">${video.title} (Main)</div>
                        </div>
                        <button class="action-btn" onclick="playFromModal('${subject}', '${chapterObj.chapter}', '${video.title}')" style="font-size: 0.8rem; padding: 8px 15px;">Play</button>
                    `;
                    listBody.appendChild(item);
                }
            });

            // এডিশনাল/অতিরিক্ত ভিডিও লিস্ট প্রসেসিং (যদি থাকে)
            if (chapterObj.extraVideos) {
                chapterObj.extraVideos.forEach(video => {
                    if (video.id !== '#' && video.id !== 'ID_HERE') {
                        totalVideoCount++;
                        const item = document.createElement('div');
                        item.className = 'list-item';
                        item.style.borderLeft = "4px solid var(--secondary)"; // আলাদা করে চেনার জন্য
                        item.innerHTML = `
                            <div style="flex:1">
                                <div style="font-size: 0.75rem; color: var(--secondary); opacity: 0.8;">${subject} • ${chapterObj.chapter}</div>
                                <div style="font-weight: 600; font-size: 0.95rem;">${video.title} (Additional)</div>
                            </div>
                            <button class="action-btn" onclick="playFromModal('${subject}', '${chapterObj.chapter}', '${video.title}')" style="font-size: 0.8rem; padding: 8px 15px; background: var(--secondary);">Play</button>
                        `;
                        listBody.appendChild(item);
                    }
                });
            }
        });
    }

    // পপআপের হেডারে মোট ভিডিও সংখ্যা আপডেট
    const modalHeader = modal.querySelector('h2');
    modalHeader.innerHTML = `🎥 ক্লাসের তালিকা (মোট: ${totalVideoCount}টি)`;

    if (totalVideoCount === 0) {
        listBody.innerHTML = '<p style="text-align:center; padding: 20px; color: #94a3b8;">এখনো কোনো ক্লাস যোগ করা হয়নি।</p>';
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('videoListModal').style.display = 'none';
}

function playFromModal(subjectName, chapterName, videoTitle) {
    closeModal();
    const subject = database[subjectName];
    const ch = subject.find(c => c.chapter === chapterName);
    
    // প্রথমে মেইন ভিডিওর মধ্যে খোঁজা হবে
    let v = ch.mainVideos.find(vid => vid.title === videoTitle);
    
    // যদি মেইন ভিডিওতে না পাওয়া যায়, তবে এডিশনাল (extraVideos) লিস্টে খোঁজা হবে
    if (!v && ch.extraVideos) {
        v = ch.extraVideos.find(vid => vid.title === videoTitle);
    }
    
    if (v) {
        openSubject(subjectName);
        openVideoList(ch);
        playNow(v);
    }
}

// পপআপের বাইরে ক্লিক করলে বন্ধ হবে
window.onclick = function(event) {
    const modal = document.getElementById('videoListModal');
    if (event.target == modal) {
        closeModal();
    }
}

// নেভিগেশন চেক: হোম পেজ ছাড়া অন্য কোথাও বাটন দেখাবে না
function checkHomeButton() {
    const homeBtn = document.getElementById('home-top-button');
    // আপনার বিদ্যমান navTo ফাংশনের সাথে এটি কাজ করবে
    const currentScreen = document.querySelector('.screen[style*="display: block"]');
    // যদি বর্তমান স্ক্রিন 'subject-screen' না হয় তবে বাটন হাইড থাকবে
    // যেহেতু আপনি শুরুতে navTo('subject-screen') কল করেন, আমরা সেটা চেক করব
}
// --- মোবাইলে ডাবল ট্যাপ করে সামনে-পিছে করার ফিচার --- //
let lastTap = 0;
const videoOverlay = document.getElementById('video-overlay');

videoOverlay.addEventListener('touchstart', function (e) {
    const now = new Date().getTime();
    const timesince = now - lastTap;
    
    // যদি ৩০০ মিলিসেকেন্ডের মধ্যে আবার টাচ হয়, তবে সেটা ডাবল ট্যাপ
    if (timesince < 300 && timesince > 0) {
        // স্ক্রিনের প্রস্থ (Width) বের করা
        const width = videoOverlay.offsetWidth;
        // যেখানে টাচ করা হয়েছে সেই পজিশন
        const touchX = e.touches[0].clientX;

        if (touchX < width / 2) {
            // স্ক্রিনের বাম পাশে ডাবল ট্যাপ করলে ৫ সেকেন্ড পিছিয়ে যাবে
            player.seekTo(player.getCurrentTime() - 5, true);
            showSeekMessage(-5);
        } else {
            // স্ক্রিনের ডান পাশে ডাবল ট্যাপ করলে ৫ সেকেন্ড এগিয়ে যাবে
            player.seekTo(player.getCurrentTime() + 5, true);
            showSeekMessage(5);
        }
        e.preventDefault(); // ডাবল ট্যাপে যেন জুম না হয়
    }
    lastTap = now;
});
// পপআপের ভেতরে সার্চ করার ফাংশন
document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'modal-search-box') {
        const searchTerm = e.target.value.toLowerCase();
        const modalList = document.getElementById('modal-class-list');
        const sections = modalList.getElementsByTagName('div'); // প্রতিটি সাবজেক্ট সেকশন

        for (let section of sections) {
            // যদি এটি একটি চ্যাপ্টার আইটেম হয়
            if (section.classList.contains('list-item')) {
                const chapterName = section.textContent.toLowerCase();
                if (chapterName.includes(searchTerm)) {
                    section.style.display = 'flex';
                } else {
                    section.style.display = 'none';
                }
            }
            
            // সাবজেক্টের হেডার (যেমন: Physics, Chemistry) গুলোকে ম্যানেজ করা
            if (section.tagName === 'H3') {
                // আপাতত হেডারগুলো দেখাবে, তবে সার্চের সাথে সামঞ্জস্য রাখতে চাইলে এখানে আরও কোড যোগ করা যায়
            }
        }
    }
});

// যখন পপআপ বন্ধ হবে, সার্চ বক্স খালি করে দেওয়া
function closeModal() {
    document.getElementById('videoListModal').style.display = 'none';
    const searchBox = document.getElementById('modal-search-box');
    if(searchBox) searchBox.value = ''; // সার্চ ক্লিয়ার করা
    
    // সব লিস্ট আবার আগের মতো দেখানো
    const items = document.querySelectorAll('#modal-class-list .list-item');
    items.forEach(item => item.style.display = 'flex');
}
// document.getElementById('toggle-filter-btn').addEventListener('click', function() {
//     const iframe = document.querySelector('.custom-video-container iframe');
//     const statusText = document.getElementById('filter-status');
    
//     if (iframe) {
//         // 'no-filter' ক্লাসটি অদলবদল (Toggle) করবে
//         iframe.classList.toggle('no-filter');
        
//         // বাটন এর লেখা পরিবর্তন করবে
//         if (iframe.classList.contains('no-filter')) {
//             statusText.innerText = 'OFF';
//             this.style.background = 'rgba(255, 0, 0, 0.2)'; // অফ থাকলে লালচে দেখাবে
//         } else {
//             statusText.innerText = 'ON';
//             this.style.background = 'transparent'; // অন থাকলে আগের মতো
//         }
//     }
// });