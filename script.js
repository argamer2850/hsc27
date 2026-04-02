// রাইট ক্লিক বন্ধ করা
document.addEventListener('contextmenu', event => event.preventDefault());

// কিবোর্ড শর্টকাট বন্ধ করা
document.onkeydown = function(e) {
  // event.keyCode এর বদলে e.keyCode ব্যবহার করুন
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
        let totalSecs = 0; // ডিউরেশন ট্র্যাক করার জন্য শুরুতে ০ ধরলাম

        // ১. ভিডিও সংখ্যা এবং ডিউরেশন গণনার লজিক
        if (ch.mainVideos && ch.mainVideos.length > 0) {
            // যদি মেইন ভিডিও থাকে
            totalVideos = ch.mainVideos.length;
            totalSecs = getVideoListTotalDuration(ch.mainVideos);
        } else if (ch.extraSections && ch.extraSections.length > 0) {
            // যদি মেইন ভিডিও না থাকে, তবে এক্সট্রা সেকশনের ভিডিও ও ডিউরেশন যোগ হবে
            ch.extraSections.forEach(section => {
                if (section.videos && section.videos.length > 0) {
                    totalVideos += section.videos.length;
                    totalSecs += getVideoListTotalDuration(section.videos);
                }
            });
        }

        // ২. ডিউরেশন ফরম্যাট করা (টোটাল সেকেন্ড ০ এর বেশি হলে দেখাবে)
        const durationHtml = totalSecs > 0 ? `<br><span style="font-size: 0.75rem; color: #94a3b8; font-weight: 400;">${formatTotalDuration(totalSecs)}</span>` : '';
        
        // ৩. ইনার এইচটিএমএল আউটপুট
        d.innerHTML = `<span>${ch.chapter}</span> <span class="play-icon" style="text-align: right;">${totalVideos} Classes ${durationHtml}</span>`;
        list.appendChild(d);
    });
    
    navTo('chapter-screen');
}

    function openVideoList(chObj) {
    sessionStorage.setItem('currentChapter', chObj.chapter);
    sessionStorage.setItem('currentScreen', 'video-list-screen');
    
    const vContainer = document.getElementById('video-list-container');
    const mContainer = document.getElementById('chap-materials');
    const videoMeta = document.querySelector('.video-meta'); // মেটা ডিভটি ধরলাম
    
    document.getElementById('chap-title').innerText = chObj.chapter;
    vContainer.innerHTML = '';
    mContainer.innerHTML = '';

    // মেইন ক্লাস সেকশন রেন্ডার করা
    if (chObj.mainVideos && chObj.mainVideos.length > 0) {
        renderVideoSection(vContainer, "⭐ মেইন ক্লাস (Main Classes)", chObj.mainVideos, true);
    }

    // এক্সট্রা সেকশন রেন্ডার করা
    if (chObj.extraSections && chObj.extraSections.length > 0) {
        chObj.extraSections.forEach(section => {
            renderVideoSection(vContainer, section.title, section.videos, false);
        });
    }

    // --- মেটা ডিভ হাইড/শো করার লজিক শুরু ---
    let hasValidMaterial = false;

    if (chObj.practiceSheets && chObj.practiceSheets.length > 0) {
        // চেক করছি কোনো একটা লিংকেও আসল ডাটা আছে কি না
        hasValidMaterial = chObj.practiceSheets.some(item => {
            let link = typeof item === 'object' ? item.link : item;
            return link && link !== 'N/A' && link !== 'LINK_HERE' && link !== '';
        });
    }

    if (!hasValidMaterial) {
        // যদি কোনো ভ্যালিড লিংক না থাকে, তবে পুরো মেটা ডিভ হাইড
        videoMeta.style.display = 'none';
    } else {
        // যদি ভ্যালিড ডাটা থাকে, তবে মেটা ডিভ শো করবে এবং বাটন তৈরি হবে
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
            matBtn.style.display = "block";
            matBtn.style.marginBottom = "10px";
            mContainer.appendChild(matBtn);
        });
    }
    // --- লজিক শেষ ---

    navTo('video-list-screen');
}

// ভিডিও লিস্ট রেন্ডার করার জন্য একটি কমন ফাংশন (সহজ করার জন্য)
function renderVideoSection(container, title, videos, isMain) {
    const h3 = document.createElement('h3');
    // ফ্লেক্সবক্স ব্যবহার করা হয়েছে যাতে টাইটেল বামে আর ডিউরেশন ডানে থাকে
    h3.style = `color: ${isMain ? 'var(--primary)' : 'var(--accent)'}; margin: 25px 0 15px 5px; font-size: 1.2rem; display: flex; justify-content: space-between; align-items: center;`;

    // সেকশনের মোট ডিউরেশন বের করা (আমাদের নতুন ফাংশন ব্যবহার করে)
    const sectionTotalSecs = getVideoListTotalDuration(videos);
    const durationText = sectionTotalSecs > 0 ? `<span style="font-size: 0.85rem; color: #94a3b8; font-weight: 400;">${formatTotalDuration(sectionTotalSecs)}</span>` : '';

    // টাইটেল এবং ডিউরেশন সেট করা
    h3.innerHTML = `<span>${title}</span> ${durationText}`;
    container.appendChild(h3);

    videos.forEach((v, i) => {
    const d = document.createElement('div');
    d.className = 'list-item';
    d.onclick = () => playNow(v); 
    
    const label = isMain ? `Class ${i+1}: ` : "";
    let durationDisplay = "";

    // ১. যদি duration থাকে (id থাক বা না থাক), তবে সময় দেখাবে
    if (v.duration && v.duration.trim() !== "") {
        durationDisplay = `🕒 ${v.duration}`;
    } 
    // ২. যদি duration না থাকে কিন্তু link থাকে, তবে "Get Video" দেখাবে
    else if (v.link && v.link.trim() !== "") {
        durationDisplay = "▶ Get Video";
    }
    // ৩. যদি duration না থাকে কিন্তু YouTube id থাকে, তবে "🕒 --:--" দেখাবে
    else if (v.id && v.id.trim() !== "") {
        durationDisplay = "🕒 --:--";
    }
    // ৪. যদি id এবং link দুইটাই ফাঁকা থাকে, তবে "Not Uploaded" দেখাবে
    else {
        durationDisplay = "⏳ Not Uploaded";
        d.style.opacity = "0.6"; // হালকা ঝাপসা করে দেওয়া যাতে বোঝা যায় এটা এখনো আসেনি
        d.style.pointerEvents = "none"; // ক্লিক করা বন্ধ করে দেওয়া
    }
    
    d.innerHTML = `
        <span>${label}${v.title}</span> 
        <span class="play-icon">${durationDisplay}</span>
    `;
    
    container.appendChild(d);
});
}

    // --- Custom Video Player Logic --- //
   let player;
let timeUpdater;
let showRemaining = false;

    function onYouTubeIframeAPIReady() {
    // ডিফল্ট কাস্টম প্লেয়ারের সেটিংস
    let playerVarsConfig = {
        'autoplay': 1,
        'controls': 0, // ডিফল্টভাবে ইউটিউব কন্ট্রোল হাইড
        'disablekb': 1, // কীবোর্ড শর্টকাট বন্ধ
        'fs': 0, 
        'rel': 0, 
        'modestbranding': 1, 
        'playsinline': 1,
        'iv_load_policy': 3 
    };

    // যদি স্পেশাল আইপির ইউজার হয়, তবে সেটিংস পরিবর্তন হবে
    if (typeof isNormalPlayerUser !== 'undefined' && isNormalPlayerUser) {
        playerVarsConfig.controls = 1; // নর্মাল ইউটিউব কন্ট্রোল অন
        playerVarsConfig.disablekb = 0; // কীবোর্ড শর্টকাট অন
        playerVarsConfig.fs = 1; // ফুলস্ক্রিন অন
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
    // Overlay Click = Play/Pause Logic
    if (typeof isNormalPlayerUser !== 'undefined' && isNormalPlayerUser) return;
document.getElementById('video-overlay').addEventListener('click', (e) => {
    // ১. চেক করা হচ্ছে ইউজার কি মোবাইল ব্যবহার করছে?
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // ২. যদি মোবাইল হয়, তবে ক্লিক লজিক এখানেই থামিয়ে দাও (রিটার্ন করো)
    if (isMobile) return;

    // ৩. যদি পিসি হয় এবং ইউজার স্লাইডার নিয়ে টানাটানি না করে, তবেই প্লে/পজ হবে
    if (!isDragging) {
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
    sessionStorage.setItem('currentVideo', video.title);
    sessionStorage.setItem('currentScreen', 'player-screen');
    const videoContainer = document.querySelector('.custom-video-container');
    const linkContainer = document.getElementById('external-link-container');
    const notUploadedContainer = document.getElementById('not-uploaded-container');
    const linkBtn = document.getElementById('external-link-btn');
    const vidTitle = document.getElementById('vid-title');

    // টাইটেল সেট করা
    vidTitle.innerText = video.title;

    // সব কন্টেইনার আগে হাইড করে নেওয়া
    if (videoContainer) videoContainer.style.display = 'none';
    if (linkContainer) linkContainer.style.display = 'none';
    if (notUploadedContainer) notUploadedContainer.style.display = 'none';

    // কন্ডিশন ১: ভিডিও আইডি নেই অথবা ID_HERE/LINK_HERE বা # দেওয়া আছে
    const isMissingId = !video.id || video.id === 'ID_HERE' || video.id === 'LINK_HERE' || video.id === '#' || video.id === 'LINK';
    const hasExternalLink = video.link && video.link !== '#' && video.link !== 'N/A';

    if (isMissingId) {
        if (hasExternalLink) {
            // আইডি নেই কিন্তু লিংক আছে -> এক্সটারনাল লিংক দেখাবে
            if (linkContainer) {
                linkContainer.style.display = 'block';
                linkBtn.href = video.link;
            }
        } else {
            // আইডি-ও নেই, লিংক-ও নেই -> আপলোড হয়নি মেসেজ
            if (notUploadedContainer) notUploadedContainer.style.display = 'block';
        }
    } else {
        // আইডি আছে -> ভিডিও প্লেয়ার দেখাবে
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
    
    // স্লাইড বাটন লজিক (আপডেটেড - Practice Sheets এর মতো মেকানিজম)
    const slideContainer = document.getElementById('slide-buttons-container');
    if (slideContainer) {
        slideContainer.innerHTML = '';

        let slides = video.slide;
        const slidesArray = (slides && Array.isArray(slides)) 
                            ? slides 
                            : [{ name: "ক্লাস স্লাইড", link: slides || '' }];
        
        // চেক করছি কোনো একটা স্লাইডের লিংকেও আসল ডাটা আছে কি না
        let hasValidSlide = slidesArray.some(s => {
            return s.link && s.link !== 'N/A' && s.link !== 'LINK_HERE' && s.link !== '' && s.link !== '#';
        });

        if (!hasValidSlide) {
            // যদি কোনো ভ্যালিড লিংক না থাকে, তবে স্লাইড কন্টেইনারটি হাইড করে দিবো
            slideContainer.style.display = 'none';
        } else {
            // ভ্যালিড ডাটা থাকলে কন্টেইনার শো করবে এবং বাটন তৈরি হবে
            slideContainer.style.display = 'flex'; // আপনার css অনুযায়ী flex
            
            slidesArray.forEach(s => {
                // শুধুমাত্র ভ্যালিড লিংকগুলোর জন্যই বাটন বানাবো
                if (s.link && s.link !== 'N/A' && s.link !== 'LINK_HERE' && s.link !== '' && s.link !== '#') {
                    const btn = document.createElement('a');
                    btn.className = 'action-btn btn-slide';
                    btn.style.marginBottom = "10px";
                    btn.style.display = "block";
                    btn.style.color = "#ffffff"; 
                    btn.innerHTML = `📄 ${s.name}`;
                    btn.href = s.link;
                    btn.target = "_blank";
                    
                    slideContainer.appendChild(btn);
                }
            });
        }
    }

    navTo('player-screen');
} // playNow ফাংশন এখানে শেষ
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
// ১. প্লেয়ার ফোকাস ট্র্যাক করার জন্য একটি ভেরিয়েবল
let isPlayerFocused = false;

// ২. ভিডিও কন্টেইনারে ক্লিক করলে ফোকাস সেট করা
document.getElementById('video-container').addEventListener('click', (e) => {
    isPlayerFocused = true;
    e.stopPropagation(); // ক্লিকটি যেন বাইরের এলিমেন্টে না যায়
});

// ৩. প্লেয়ারের বাইরে কোথাও ক্লিক করলে ফোকাস সরিয়ে দেওয়া
document.addEventListener('click', () => {
    isPlayerFocused = false;
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
    // ১. ইনপুট বক্সে থাকলে শর্টকাট কাজ করবে না
    // স্পেশাল ইউজার হলে কাস্টম কীবোর্ড শর্টকাট কাজ করবে না
    if (typeof isNormalPlayerUser !== 'undefined' && isNormalPlayerUser) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (!player) return;

    // ২. প্লেয়ার স্ক্রিন ভিজিবল কি না চেক
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
// একটি ভেরিয়েবল যা মনে রাখবে ভিডিওটি অটো-পজ হয়েছে কি না
let isAutoPaused = false;

function pauseVideo(auto = false) {
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        if (auto) {
            isAutoPaused = true; // শুধু সিস্টেম পজ করলে এটি true হবে
        }
    }
}

function resumeVideo() {
    // যদি আগে অটো-পজ হয়ে থাকে, তবেই রিজিউম হবে
    if (player && isAutoPaused) {
        player.playVideo();
        isAutoPaused = false; // রিজিউম হওয়ার পর রিসেট
    }
}

// ১. ট্যাব পরিবর্তন করলে (Tab Change)
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        pauseVideo(true); // অটো-পজ মোড অন
    } else {
        resumeVideo();
    }
});

// ২. উইন্ডো থেকে ফোকাস চলে গেলে (Window Blur)
window.addEventListener("blur", function() {
    pauseVideo(true); // অটো-পজ মোড অন
});

// ৩. উইন্ডোতে ফিরে আসলে (Window Focus)
window.addEventListener("focus", function() {
    resumeVideo();
});

// গুরুত্বপূর্ণ: ইউজার যদি নিজে প্লে/পজ বাটনে ক্লিক করে, তবে অটো-পজ স্ট্যাটাস রিসেট করতে হবে
document.getElementById('play-pause-btn').addEventListener('click', () => {
    isAutoPaused = false; 
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

    for (let subject in database) {
        let chapters = database[subject];
        for (let ch of chapters) {
            for (let v of ch.mainVideos) {
                if (v.keywords && v.keywords.some(k => k.toLowerCase() === query)) {
                    openSubject(subject); 
                    openVideoList(ch);
                    playNow(v);
                    return; // ভিডিও পাওয়া গেলে ফাংশন এখানেই শেষ
                }
            }
        }
    }
    alert("দুঃখিত, এই কি-ওয়ার্ডের কোনো ভিডিও পাওয়া যায়নি।");
}
// রিলোড দিলে সবসময় হোম পেজে (subject-screen) ফিরিয়ে নেওয়ার কোড
window.onload = function() {
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    renderSubjectCards(); 

    // রিলোড ম্যানেজমেন্ট (sessionStorage থেকে ডাটা নেওয়া হচ্ছে)
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
                openSubject(sub); // ব্যাকগ্রাউন্ড রেডি করার জন্য
                openVideoList(chObj); 
                
                if (lastScreen === 'player-screen' && vidTitle) {
                    // ভিডিওটি খোঁজার চেষ্টা
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
// পপআপ খোলার এবং সব ভিডিওর লিস্ট জেনারেট করার সংশোধিত ফাংশন
// পপআপে সব ক্লাসের লিস্ট দেখানোর আপডেট লজিক
// function openAllClassesModal() {
//     const modal = document.getElementById('videoListModal');
//     const listBody = document.getElementById('modal-class-list');
//     listBody.innerHTML = '';
//     let totalVideoCount = 0;

//     // ভিডিওটি 'Valid Class' কিনা তা চেক করার ফাংশন
//     const isValidClass = (v) => {
//         const hasId = v.id && !['', '#', 'ID_HERE', 'LINK_HERE', 'LINK'].includes(v.id.trim());
//         const hasLink = v.link && !['', '#', 'LINK_HERE', 'N/A'].includes(v.link.trim());
//         return hasId || hasLink;
//     };

//     for (const subject in database) {
//         database[subject].forEach(chapterObj => {
            
//             // ১. মেইন ভিডিও চেক
//             if (chapterObj.mainVideos) {
//                 chapterObj.mainVideos.forEach(video => {
//                     if (isValidClass(video)) {
//                         totalVideoCount++;
//                         createModalItem(listBody, subject, chapterObj, video, "Main");
//                     }
//                 });
//             }

//             // ২. এক্সট্রা সেকশন এবং তার ভেতরের ভিডিও চেক
//             if (chapterObj.extraSections) {
//                 chapterObj.extraSections.forEach(section => {
//                     if (section.videos) {
//                         section.videos.forEach(video => {
//                             if (isValidClass(video)) {
//                                 totalVideoCount++;
//                                 createModalItem(listBody, subject, chapterObj, video, section.title);
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }

//     const modalHeader = modal.querySelector('h2');
//     modalHeader.innerHTML = `🎥 ক্লাসের তালিকা (মোট: ${totalVideoCount}টি)`;

//     if (totalVideoCount === 0) {
//         listBody.innerHTML = '<p style="text-align:center; padding: 20px; color: #94a3b8;">এখনো কোনো ক্লাস আপলোড করা হয়নি।</p>';
//     }

//     modal.style.display = 'flex';
// }

// লিস্ট আইটেম তৈরি করার হেল্পার ফাংশন (আগের মতোই)
// function createModalItem(listBody, subject, chapterObj, video, typeLabel) {
//     const item = document.createElement('div');
//     item.className = 'list-item';
    
//     if (typeLabel !== "Main") {
//         item.style.borderLeft = "4px solid var(--secondary)";
//     }

//     item.innerHTML = `
//         <div style="flex:1; text-align:left;">
//             <div style="font-size: 0.75rem; color: var(--accent); opacity: 0.8;">${subject} • ${chapterObj.chapter}</div>
//             <div style="font-weight: 600; font-size: 0.95rem;">${video.title} ${typeLabel !== 'Main' ? '('+typeLabel+')' : ''}</div>
//         </div>
//         <button class="action-btn" style="font-size: 0.8rem; padding: 8px 15px; ${typeLabel !== 'Main' ? 'background: var(--secondary);' : ''}">Play</button>
//     `;
    
//     // এখানে typeLabel পাস করা হয়েছে
//     item.onclick = () => {
//         playFromModal(subject, chapterObj.chapter, video.title, typeLabel);
//     };
//     listBody.appendChild(item);
// }


// মোডাল থেকে ভিডিও প্লে করার সংশোধিত ফাংশন
// function playFromModal(subjectName, chapterName, videoTitle, typeLabel) {
//     closeModal();
//     const subject = database[subjectName];
//     const ch = subject.find(c => c.chapter === chapterName);
    
//     let v;

//     // যদি টাইপ 'Main' হয় তবে শুধু মেইন ভিডিওতে খুঁজবে
//     if (typeLabel === "Main") {
//         v = ch.mainVideos.find(vid => vid.title === videoTitle);
//     } 
//     // অন্যথায় নির্দিষ্ট এক্সট্রা সেকশনে খুঁজবে
//     else if (ch.extraSections) {
//         const targetSection = ch.extraSections.find(sec => sec.title === typeLabel);
//         if (targetSection) {
//             v = targetSection.videos.find(vid => vid.title === videoTitle);
//         }
//     }
    
//     if (v) {
//         openSubject(subjectName);
//         openVideoList(ch);
//         playNow(v);
//     }
// }

// function closeModal() {
//     document.getElementById('videoListModal').style.display = 'none';
// }



// পপআপের বাইরে ক্লিক করলে বন্ধ হবে
// window.onclick = function(event) {
//     const modal = document.getElementById('videoListModal');
//     if (event.target == modal) {
//         closeModal();
//     }
// }

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
// document.addEventListener('input', function (e) {
//     if (e.target && e.target.id === 'modal-search-box') {
//         const searchTerm = e.target.value.toLowerCase();
//         const modalList = document.getElementById('modal-class-list');
//         const sections = modalList.getElementsByTagName('div'); // প্রতিটি সাবজেক্ট সেকশন

//         for (let section of sections) {
//             // যদি এটি একটি চ্যাপ্টার আইটেম হয়
//             if (section.classList.contains('list-item')) {
//                 const chapterName = section.textContent.toLowerCase();
//                 if (chapterName.includes(searchTerm)) {
//                     section.style.display = 'flex';
//                 } else {
//                     section.style.display = 'none';
//                 }
//             }
            
//             // সাবজেক্টের হেডার (যেমন: Physics, Chemistry) গুলোকে ম্যানেজ করা
//             if (section.tagName === 'H3') {
//                 // আপাতত হেডারগুলো দেখাবে, তবে সার্চের সাথে সামঞ্জস্য রাখতে চাইলে এখানে আরও কোড যোগ করা যায়
//             }
//         }
//     }
// });

// যখন পপআপ বন্ধ হবে, সার্চ বক্স খালি করে দেওয়া
// function closeModal() {
//     document.getElementById('videoListModal').style.display = 'none';
//     const searchBox = document.getElementById('modal-search-box');
//     if(searchBox) searchBox.value = ''; // সার্চ ক্লিয়ার করা
    
//     // সব লিস্ট আবার আগের মতো দেখানো
//     const items = document.querySelectorAll('#modal-class-list .list-item');
//     items.forEach(item => item.style.display = 'flex');
// }
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
// script.js এ কিবোর্ড লজিকের ভেতর নিচের কোডটি যুক্ত করুন

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
    }, 1000); // ১ সেকেন্ড পর চলে যাবে
}
// --- চ্যাপ্টারের টোটাল ডিউরেশন হিসাব করার ফাংশন --- //
function parseDurationToSeconds(durationStr) {
    if (!durationStr || typeof durationStr !== 'string') return 0;
    const parts = durationStr.split(':').map(Number);
    // যদি HH:MM:SS ফরম্যাটে থাকে
    if (parts.length === 3) {
        return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
    } 
    // যদি MM:SS ফরম্যাটে থাকে
    else if (parts.length === 2) {
        return (parts[0] || 0) * 60 + (parts[1] || 0);
    }
    return 0;
}

function formatTotalDuration(totalSeconds) {
    if (totalSeconds === 0) return '';
    
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    
    // যদি শুধু ঘণ্টা থাকে (মিনিট ০)
    if (h > 0 && m === 0) {
        return `⏱️ ${h} ঘণ্টা`;
    }
    // যদি ঘণ্টা এবং মিনিট উভয়ই থাকে
    if (h > 0 && m > 0) {
        return `⏱️ ${h} ঘণ্টা ${m} মিনিট`;
    }
    // যদি শুধু মিনিট থাকে (ঘণ্টা ০)
    if (m > 0) {
        return `⏱️ ${m} মিনিট`;
    }
    
    return ''; // যদি সেকেন্ড ১ মিনিটের কম হয়
}



function renderSubjectCards() {
    const container = document.getElementById('subject-cards-container');
    if (!container) return;

    container.innerHTML = ''; // আগের সব কার্ড পরিষ্কার করা

    // database অবজেক্টের মধ্যে এখন শুধু পারমিশন পাওয়া সাবজেক্টগুলোই আছে
    Object.keys(database).forEach(subject => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openSubject(subject);
        card.innerHTML = `<h3>${subject}</h3>`;
        container.appendChild(card);
    });
}
// এটি নতুন ফাংশন, যা যেকোনো ভিডিও অ্যারের মোট সময় বের করবে
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
// let previousOnlineCount = -1; // -1 দিলাম যাতে প্রথমবারেই সাউন্ড না বাজে
// const notificationSound = new Audio('notification.mp3');

// function checkOnlineUsers() {
//     fetch('heartbeat.php')
//         .then(response => response.json())
//         .then(data => {
//             const currentCount = data.count;
//             const textElement = document.getElementById('online-text');
            
//             if (textElement) {
//                 if (currentCount === 0) {
//                     textElement.innerText = "আপনি একাই আছেন";
//                     textElement.style.color = "#94a3b8"; // একা থাকলে একটু হালকা কালার
//                 } else {
//                     textElement.innerText = `আপনার সাথে আরও ${currentCount} জন আছেন`;
//                     textElement.style.color = "#10b981"; // কেউ থাকলে সবুজ কালার
//                 }
//             }

//             // যদি আগের চেয়ে ইউজার সংখ্যা বাড়ে এবং আগে থেকে ডাটা লোড হয়ে থাকে
//             if (currentCount > previousOnlineCount && previousOnlineCount !== -1) {
//                 notificationSound.play().catch(e => console.log("Auto-play blocked by browser."));
//             }
            
//             previousOnlineCount = currentCount;
//         })
//         .catch(err => console.error('Error fetching heartbeat:', err));
// }

// // প্রথমবার সাথে সাথে চেক করবে
// checkOnlineUsers();

// // এরপর প্রতি ১০ সেকেন্ড পরপর চেক করবে
// setInterval(checkOnlineUsers, 10000);
function goHome() {
    // সেশন স্টোরেজ পুরো ক্লিয়ার করে দিবে যাতে রিলোড দিলে আর আগের জায়গায় না নেয়
    sessionStorage.clear();
    
    // হোম স্ক্রিনে পাঠিয়ে দিবে
    navTo('subject-screen');
    
    // পেজটা একবার হার্ড রিফ্রেশ বা স্টেট ক্লিন করার জন্য নিচের লাইনটি দিতে পারেন (ঐচ্ছিক)
    window.location.reload(); 
}
// ব্রাউজার হিস্ট্রি ট্র্যাক করার জন্য একটি ভেরিয়েবল
let appHistoryCount = 0;

// navTo ফাংশন (আপডেট করা হয়েছে)
function navTo(id, pushHistory = true) {
    const element = document.getElementById(id);
    if (!element) return;

    // সেশন স্টোরেজে বর্তমান স্ক্রিন সেভ করা
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

    const homeBtn = document.getElementById('home-top-button');
    if(homeBtn) {
        if (id === 'subject-screen') {
            homeBtn.style.display = 'block';
        } else {
            homeBtn.style.display = 'none';
        }
    }

    if (pushHistory) {
        appHistoryCount++; // হিস্ট্রি কাউন্ট বাড়ানো হলো
        window.history.pushState({ screen: id }, "", `#${id}`);
    }
    window.scrollTo(0,0);
}

// ওয়েবসাইটের ভিতরের ব্যাক বাটনের জন্য নতুন ফাংশন
function goBackUI(fallbackId) {
    if (appHistoryCount > 0) {
        window.history.back(); // ব্রাউজারের অরিজিনাল ব্যাক ফাংশন কাজ করবে
    } else {
        navTo(fallbackId, true);
    }
}

// stopAndNavTo ফাংশন (আপডেট করা হয়েছে)
function stopAndNavTo(id) {
    if(player && player.pauseVideo) {
        try { player.pauseVideo(); } catch(e) {}
    }
    goBackUI(id); 
}

// ব্রাউজার/ফোনের ব্যাক বাটন কন্ট্রোল (আপডেট করা হয়েছে)
window.addEventListener('popstate', (event) => {
    if (appHistoryCount > 0) {
        appHistoryCount--;
    }

    // ভিডিও পজ করা
    if (typeof player !== 'undefined' && player.pauseVideo) {
        try { player.pauseVideo(); } catch(e) {}
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