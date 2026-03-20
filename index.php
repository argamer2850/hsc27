<?php
// যদি device_id কুঁকিটি না থাকে, তবে তাকে সাইটে ঢুকতে দিবে না
if (!isset($_COOKIE['device_id_2'])) {
    die("Access Denied: আপনার এক্সেস এই সাইটের জন্য অনুমোদিত নয়।");
}
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vyo3ldtrwc");
</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>HSC 27</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="icon" type="image/png" href="icon.png">
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;600;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="style.css?v=11">
</head>
<body>

<div class="container">
    <nav>
        <a href="index.php" style="text-decoration: none; color: inherit;"><div class="logo">HSC<span>27</span></div></a>
        <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 500; letter-spacing: 1px;">All In One Place</div>
    </nav>
<div id="videoListModal" class="modal-overlay" style="display:none;">
    <div class="modal-content shared-style-box">
        <div class="modal-header">
            <h2 style="color: var(--primary);">🎥 যুক্ত হওয়া ক্লাসের তালিকা</h2>
            <button class="close-btn" onclick="closeModal()">×</button>
        </div>
        <div style="padding: 15px; max-width: 90%; margin: 0 auto;">
    <div style="position: relative; display: flex; align-items: center;">
        <span style="position: absolute; left: 15px; display: flex; align-items: center; color: #94a3b8; pointer-events: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </span>
        <input type="text" id="modal-search-box" placeholder="চ্যাপ্টারের নাম লিখে সার্চ দিন..." 
        style="width: 100%; padding: 12px 12px 12px 42px; border-radius: 12px; border: 1px solid var(--glass-border); background: rgba(15, 23, 42, 0.8); color: white; outline: none; font-size: 0.95rem; display: block;">
    </div>
</div>
        <div id="modal-class-list" class="modal-body">
            </div>
    </div>
</div>

<div id="home-top-button" style="margin-bottom: 20px;">
    <button class="action-btn" onclick="openAllClassesModal()" style="width: 100%; padding: 15px; border-radius: 15px; font-weight: 600; background: linear-gradient(90deg, var(--primary), var(--secondary)); border: none; color: white; cursor: pointer;">
        📋 এখন পর্যন্ত যে যে ক্লাস আপলোড করা হয়েছে
    </button>
</div>
    <div id="subject-screen">
        <h2 style="margin-bottom: 40px; text-align: center; font-size: 2rem;">কোন বিষয়ের কোর্স দেখতে চান?</h2>
        <div style="margin-bottom: 40px; text-align: center; display: flex; justify-content: center; gap: 10px;">
    <input type="text" id="search-box" placeholder="নির্দিষ্ট ভিডিও দেখতে কীওয়ার্ডটি বসান...." 
    style="width: 60%; padding: 12px; border-radius: 25px; border: 1px solid var(--glass-border); background: rgba(15, 23, 42, 0.8); color: white; text-align: center;">
    
    <button onclick="handleSearch()" style="padding: 10px 20px; border-radius: 25px; background: var(--primary); color: white; border: none; cursor: pointer;">সার্চ</button>
</div>
        <div class="grid-layout">
            <div class="card" onclick="openSubject('Physics')"><h3>Physics</h3></div>
            <div class="card" onclick="openSubject('Chemistry')"><h3>Chemistry</h3></div>
            <div class="card" onclick="openSubject('Higher Math')"><h3>Higher Math</h3></div>
            <div class="card" onclick="openSubject('Biology')"><h3>Biology</h3></div>
            <div class="card" onclick="openSubject('English')"><h3>English</h3></div>
            <div class="card" onclick="openSubject('Bangla')"><h3>Bangla</h3></div>
            <div class="card" onclick="openSubject('ICT')"><h3>ICT</h3></div>
        </div>
    </div>
    

    <div id="chapter-screen" class="hidden">
        <button class="btn-back" onclick="navTo('subject-screen')">← ফিরে যান</button>
        <h2 id="sub-title" style="margin-bottom: 30px; font-size: 1.8rem;"></h2>
        <div id="chapter-list"></div>
    </div>

    <div id="video-list-screen" class="hidden">
        <button class="btn-back" onclick="navTo('chapter-screen')">← চ্যাপ্টার লিস্ট</button>
        <h2 id="chap-title" style="margin-bottom: 30px; font-size: 1.8rem;"></h2>
        <div id="video-list-container"></div>
        
        <div class="video-meta" style="margin-top: 40px; border-left: 4px solid var(--accent);">
            <h4 style="color: var(--accent); font-size: 1.1rem; margin-bottom: 5px;">চ্যাপ্টার ম্যাটেরিয়ালস</h4>
            <div id="chap-materials" class="mat-box"></div>
        </div>
    </div>

    

</div>
<div id="player-screen" class="hidden">
    <div id="back-button-section" class="screen-header shared-style-box">
        <button class="btn-back" onclick="stopAndNavTo('video-list-screen')">← ভিডিও লিস্ট</button>
        </div>
        
        <div class="custom-video-container" id="video-container">
            <div id="yt-player"></div>
            <div class="resize-handle"></div>
            <div class="video-overlay" id="video-overlay"></div>
            <div id="volume-indicator" class="volume-status-overlay hidden">
    <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
    <span id="volume-status-text">50%</span>
</div>
            <div id="seek-indicator" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
         background: rgba(0,0,0,0.6); color: white; padding: 10px 20px; border-radius: 20px; 
         display: none; z-index: 100; font-weight: bold; pointer-events: none;">
    </div>
            
            <div class="custom-controls" id="controls">
                <button class="control-btn" id="play-pause-btn">
                    <svg id="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <svg id="pause-icon" class="hidden" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                </button>
                <button class="control-btn" id="rewind-btn" title="৫ সেকেন্ড পিছিয়ে যান">
    <svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
</button>

<button class="control-btn" id="forward-btn" title="৫ সেকেন্ড এগিয়ে যান">
    <svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
</button>

                <div class="time-display">
    <span id="current-time">0:00</span> / 
    <span id="duration" onclick="toggleDurationView()" style="cursor: pointer;">0:00</span>
</div>

                <div class="progress-container" id="progress-container">
    <div class="progress-bar" id="progress-bar"></div>
    <div id="time-preview">0:00</div>
</div>

                <div class="volume-container">
                    <button class="control-btn" id="mute-btn">
                        <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                    </button>
                    <input type="range" class="volume-slider" id="volume-slider" min="0" max="100" value="100">
                    <span id="volume-display" style="font-size: 0.7rem; color: #cbd5e1; margin-left: 5px;">100%</span>
                </div>

                <div class="speed-wrapper">
    <input type="number" id="speed-input" class="speed-select" 
           value="1.0" step="0.1" min="0.5" max="2.0" 
           style="text-align: center; background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 5px; outline: none;">
</div>
<button id="toggle-filter-btn" class="control-btn" style="margin-left: 10px; font-size: 12px; padding: 5px 10px;">
    Filters: <span id="filter-status">ON</span>
</button>
                <button class="control-btn" id="fullscreen-btn">
                    <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                </button>
            </div>
        </div>
<div id="external-link-container" class="shared-style-box" style="display: none; text-align: center; padding: 40px 20px; margin-bottom: 20px; border: 1px dashed var(--primary);">
    <p style="margin-bottom: 20px; color: #94a3b8; font-size: 14px;">এই ক্লাসটির ভিডিও সরাসরি ওয়েবসাইট এ এম্বেড করা সম্ভব হয়নি। ক্লাসটি দেখতে নিচের বাটনে ক্লিক করুন: (গ্রুপে জয়েন হয়ে না থাকলে রিকোয়েস্ট পাঠান)</p>
    <a id="external-link-btn" href="#" target="_blank" class="control-btn" style="padding: 12px 25px; text-decoration: none; display: inline-block; background: var(--primary); border-radius: 8px; color: white; font-weight: bold;">
        🔗 ক্লাসটি ওপেন করুন (External Link)
    </a>
</div>
<div id="not-uploaded-container" class="shared-style-box" style="display: none; text-align: center; padding: 40px 20px; margin-bottom: 20px; border: 1px dashed #f87171;">
    <div style="font-size: 3rem; margin-bottom: 15px;">⏳</div>
    <h3 style="color: #f87171; margin-bottom: 10px;">এই ক্লাসটি এখনো আপলোড করা হয়নি।</h3>
    <p style="color: #94a3b8; font-size: 0.9rem;">অনুগ্রহ করে অপেক্ষা করুন, খুব শীঘ্রই এটি যুক্ত করা হবে।</p>
</div>
        <div class="video-meta shared-style-box">
            <h2 id="vid-title" style="font-size: 1.5rem; -webkit-text-fill-color: initial; color: #fff;"></h2>
            <div class="mat-box">
                <div id="slide-buttons-container" class="mat-box"></div>
            </div>
        </div>
    </div>
    <button id="theme-toggle" class="theme-btn" title="Toggle Theme">
    <div class="sun-moon-container">
        <span id="theme-icon">☀️</span>
    </div>
</button>
<script src="database.js"></script>
<script src="script.js?v=11"></script>
<script src="https://www.youtube.com/iframe_api" defer></script>
</body>
</html>