<?php
// ১. ইউজারদের ডাটা এবং পারমিশন লিস্ট
$user_permissions = [
    'Abdur Rahman PC' => [
        'role' => 'admin', 
        'device_ids' => ['832c0468e1719fe896d4a7a3'],
        'ips' => ['182.48.65.223'] 
    ],
    'Abdur Rahman' => [
        'role' => 'admin', 
        'device_ids' => ['8388a254b8efab35e90b428f'],
        'ips' => ['202.181.4.166'] 
    ],
    'Sin' => [
        'role' => 'admin', 
        'device_ids' => ['946a3b49566e5bd55eed70a3'],
        'ips' => ['103.13.193.243'] 
    ],
    'Siam' => [
        'role' => 'admin', 
        'device_ids' => ['3861012ecf7f00e0630a375e'],
        'ips' => ['103.144.49.105'] 
    ],
    'Mahian' => [
        'role' => 'admin', 
        'device_ids' => ['2577a9cc6a36d8fe0a237c1b'],
        'ips' => ['43.245.120.36'] 
    ],
    'Rakib' => [
        'role' => 'admin', 
        'device_ids' => ['a3d7b4a440f1416b96b5522d'],
        'ips' => ['116.206.255.42'] 
    ],
    'Sadik' => [
        'role' => 'restricted',
        'device_ids' => ['833e2a5a3d7b908de4bf619d'],
        'ips' => ['103.133.201.168'],
        'allowed' => [
            'Physics' => 'ALL',
            'Chemistry' => 'ALL',
            'Higher Math' => 'ALL',
            'Biology' => 'ALL',
            'ICT' => 'ALL'
        ]
    ],
    'Jawad' => [
        'role' => 'restricted',
        'device_ids' => ['775fab6abff4c3e9ea6dd631'],
        'ips' => ['103.138.120.32'],
        'allowed' => [
            'Higher Math' => [
                'অন্তরীকরণ' => 'ALL'
            ]
        ]
    ],
    'Jubayer' => [
        'role' => 'admin', 
        'device_ids' => ['05e2aa8373f3618b28718085'],
        'ips' => ['104.28.166.114']
        
    ],
    'Adeeb' => [
        'role' => 'restricted',
        'device_ids' => ['c700802c75fd953974bb1ba8'],
        'ips' => ['103.51.2.19'],
        'allowed' => [
            'Chemistry' => 'ALL'
        ]
    ],
    'Nabila' => [
        'role' => 'restricted',
        'device_ids' => ['aa9cc3d0485f849119091d99'],
        'ips' => ['103.42.53.224'],
        'allowed' => [
            'Physics' => [
                'নিউটনীয় বলবিদ্যা' => 'ALL',
                'কাজ, ক্ষমতা ও শক্তি' => 'ALL',
                'মহাকর্ষ ও অভিকর্ষ' => 'ALL',
                'পদার্থের গাঠনিক ধর্ম' => 'ALL'
            ]
        ]
    ]
];

$user_ip = $_SERVER['REMOTE_ADDR'];
$device_id = isset($_GET['device_id']) ? $_GET['device_id'] : (isset($_COOKIE['dev_token']) ? $_COOKIE['dev_token'] : null);

$current_user_data = null;
$clarity_name = "Unknown"; 

// এক্সেস চেক করার লজিক
foreach ($user_permissions as $username => $data) {
    $id_match = ($device_id && in_array($device_id, $data['device_ids']));
    $ip_match = in_array($user_ip, $data['ips']);

    if ($id_match || $ip_match) {
        $current_user_data = $data;
        $clarity_name = $username; 
        break; 
    }
}

if (!$current_user_data) {
    include('access-request-page.php');
    exit;
}

$allowed_ips = ['202.181.4.166', '182.48.65.223', '116.206.255.42', '103.144.49.105', '103.133.201.168', '43.245.120.36', '103.138.120.32', '104.28.166.114', '103.51.2.19', '103.42.53.224', '103.13.193.243']; 
$allowed_devices = ['8388a254b8efab35e90b428f', '832c0468e1719fe896d4a7a3', 'a3d7b4a440f1416b96b5522d', '3861012ecf7f00e0630a375e', '833e2a5a3d7b908de4bf619d', '2577a9cc6a36d8fe0a237c1b', '775fab6abff4c3e9ea6dd631', '05e2aa8373f3618b28718085', 'c700802c75fd953974bb1ba8', 'aa9cc3d0485f849119091d99', '946a3b49566e5bd55eed70a3']; 

$special_ips = ['103.144.49.105', '43.245.120.36']; 
$special_device_ids = ['3861012ecf7f00e0630a375e', '2577a9cc6a36d8fe0a237c1b'];

$is_access_allowed = false;
$is_special_user = false;

if (in_array($user_ip, $special_ips)) {
    $is_special_user = true;
} elseif (isset($_COOKIE['dev_token']) && in_array($_COOKIE['dev_token'], $special_device_ids)) {
    $is_special_user = true;
}

$is_normal_player_user = $is_special_user ? 'true' : 'false';

if (in_array($user_ip, $allowed_ips)) {
    $is_access_allowed = true;
} elseif (isset($_COOKIE['dev_token']) && in_array($_COOKIE['dev_token'], $allowed_devices)) {
    $is_access_allowed = true;
}

if (!$is_access_allowed) {
    include('access-request-page.php');
    exit;
}

// JSON ডাটাবেস লোড
$full_db_json = file_get_contents('data.json'); 
$full_db = json_decode($full_db_json, true);
$filtered_db = [];

if ($current_user_data['role'] === 'admin') {
    $filtered_db = $full_db;
} else {
    $allowed_data = $current_user_data['allowed'];
    foreach ($full_db as $subject_name => $chapters) {
        if (!array_key_exists($subject_name, $allowed_data)) continue;
        
        $subject_permission = $allowed_data[$subject_name];
        $filtered_chapters = [];

        foreach ($chapters as $chapter) {
            $chapter_name = $chapter['chapter'];

            if ($subject_permission === 'ALL') {
                $filtered_chapters[] = $chapter;
                continue;
            }
            if (!array_key_exists($chapter_name, $subject_permission)) continue;

            $chapter_permission = $subject_permission[$chapter_name];

            if ($chapter_permission === 'ALL') {
                $filtered_chapters[] = $chapter;
                continue;
            }

            if (is_array($chapter_permission)) {
                $filtered_chapter = $chapter;
                $filtered_main_videos = [];
                foreach ($chapter['mainVideos'] as $video) {
                    if (in_array($video['title'], $chapter_permission)) {
                        $filtered_main_videos[] = $video;
                    }
                }
                $filtered_chapter['mainVideos'] = $filtered_main_videos;
                $filtered_chapters[] = $filtered_chapter;
            }
        }
        if (!empty($filtered_chapters)) {
            $filtered_db[$subject_name] = $filtered_chapters;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <script>
        const isNormalPlayerUser = <?php echo $is_normal_player_user; ?>;
        const database = <?php echo json_encode($filtered_db); ?>;
        const currentUserName = "<?php echo $clarity_name; ?>"; // নতুন লাইন যোগ করা হয়েছে
    </script>
    <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "w3i6kaomof");
    window.clarity("identify", "<?php echo $clarity_name; ?>");
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="robots" content="noindex, nofollow">
    <title>HSC 27 All In One</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="icon" type="image/png" href="icon.png">
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;500&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="style.css?v=13">
    <script>
    async function syncGlobalID() {
        const hardwareInfo = [
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            navigator.hardwareConcurrency,
            new Date().getTimezoneOffset(),
            navigator.platform
        ].join('|');
        
        if (!document.cookie.includes('dev_token')) {
            const id = await generateGlobalID(); 
            document.cookie = "dev_token=" + id + "; max-age=31536000; path=/; SameSite=Lax";
            window.location.reload();
        }
    }
    syncGlobalID();
    </script>
</head>
<body class="<?php echo $is_special_user ? 'normal-yt-mode' : ''; ?>">
    <script>
        // পেজ লোড হওয়ার আগেই থিম চেক করে বডিতে ক্লাস বসিয়ে দিবে 
        (function() {
            const savedTheme = sessionStorage.getItem('theme');
            const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            
            if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }
        })();
    </script>
    <div id="site-loader-container">
        <div id="site-loader-bar"></div>
    </div>

    <div class="container">
        <nav>
            <a href="javascript:void(0)" onclick="goHome()" style="text-decoration: none; color: inherit;">
                <div class="logo">HSC<span>27</span></div>
            </a>
            <div class="nav-subtitle">All In One</div>
        </nav>

        <div id="subject-screen">
            <h2>কোন বিষয়ের কোর্স দেখতে চান?</h2>
            
            <div class="search-wrapper">
                <input type="text" id="search-box" placeholder="ভিডিওর কীওয়ার্ডটি বসান... (যেমন: P1stC1C1)">
                <button onclick="handleSearch()" class="search-btn">সার্চ করুন</button>
            </div>
            
            <div class="grid-layout" id="subject-cards-container">
            </div>
        </div>

        <div id="chapter-screen" class="hidden">
            <button class="btn-back" onclick="goBackUI('subject-screen')">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                ফিরে যান
            </button>
            <h2 id="sub-title"></h2>
            <div id="chapter-list"></div>
        </div>

        <div id="video-list-screen" class="hidden">
            <button class="btn-back" onclick="goBackUI('chapter-screen')">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                চ্যাপ্টার লিস্ট
            </button>
            <h2 id="chap-title"></h2>
            <div id="video-list-container"></div>
            
            <div class="video-meta" style="margin-top: 40px;">
                <h4 style="color: var(--accent); font-size: 1.2rem; margin-bottom: 5px;">চ্যাপ্টার ম্যাটেরিয়ালস</h4>
                <div id="chap-materials" class="mat-box"></div>
            </div>
        </div>

    </div>

    <div id="player-screen" class="hidden">
        <div id="back-button-section" class="screen-header shared-style-box">
            <button class="btn-back" onclick="stopAndNavTo('video-list-screen')">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                ভিডিও লিস্ট
            </button>
        </div>
            
        <div class="custom-video-container" id="video-container">
            <div id="yt-player"></div>
            <div id="video-progress-percentage" class="live-progress-badge"><span id="progress-percent-text">0</span>% Watched</div>
            <div class="resize-handle"></div>
            <div class="video-overlay" id="video-overlay"></div>
            
            <div id="volume-indicator" class="volume-status-overlay hidden">
                <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                <span id="volume-status-text">50%</span>
            </div>
            
            <div id="seek-indicator" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
             background: rgba(15,23,42,0.8); color: white; padding: 12px 25px; border-radius: 20px; 
             display: none; z-index: 100; font-weight: bold; pointer-events: none; backdrop-filter: blur(8px);">
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
                    <span id="volume-display" style="font-size: 0.75rem; color: #cbd5e1; margin-left: 5px;">100%</span>
                </div>

                <div class="speed-wrapper">
    <select id="speed-select-dropdown" class="speed-select">
        <option value="1.0">1.0x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="1.75">1.75x</option>
        <option value="2.0">2.0x</option>
        <option value="custom">Custom</option>
    </select>
    <input type="number" id="speed-input-custom" class="speed-select hidden" value="1.0" step="0.1" min="0.5" max="2.0" style="margin-left: 8px; max-width: 70px;">
</div>

                <button class="control-btn" id="fullscreen-btn">
                    <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                </button>
            </div>
        </div>

        <div id="external-link-container" class="shared-style-box alert-box alert-dashed-primary" style="display: none;">
            <p style="margin-bottom: 20px; color: var(--text-muted); font-size: 15px;">এই ক্লাসটির ভিডিও সরাসরি ওয়েবসাইট এ এম্বেড করা সম্ভব হয়নি। ক্লাসটি দেখতে নিচের বাটনে ক্লিক করুন: (গ্রুপে জয়েন হয়ে না থাকলে <a href="https://www.facebook.com/groups/764779363156075" target="_blank" style="color: var(--primary);">রিকোয়েস্ট পাঠান</a>)</p>
            <a id="external-link-btn" href="#" target="_blank" class="action-btn btn-sheet">
                🔗 ক্লাসটি ওপেন করুন
            </a>
        </div>
        
        <div id="not-uploaded-container" class="shared-style-box alert-box alert-dashed-danger" style="display: none;">
            <div style="font-size: 3.5rem; margin-bottom: 15px;">⏳</div>
            <h3 style="color: #f87171; margin-bottom: 10px; font-size: 1.4rem;">এই ক্লাসটি এখনো আপলোড করা হয়নি।</h3>
            <p style="color: var(--text-muted); font-size: 1rem;">অনুগ্রহ করে অপেক্ষা করুন, খুব শীঘ্রই এটি যুক্ত করা হবে।</p>
        </div>
        
        <div class="video-meta shared-style-box">
            <h2 id="vid-title" style="text-align: left; margin-bottom: 0;"></h2>
            <div id="slide-buttons-container" class="mat-box"></div>
        </div>
    </div>

    <button id="theme-toggle" class="theme-btn" title="Toggle Theme">
        <div class="sun-moon-container">
            <span id="theme-icon">☀️</span>
        </div>
    </button>

    <script src="script.js?v=13"></script>
    <script src="https://www.youtube.com/iframe_api" defer></script>
</body>
</html>