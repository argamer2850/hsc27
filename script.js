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
    const database = {
        'Physics': [
            { chapter: 'ভৌত জগত ও পরিমাপ', mainVideos: [{ title: 'লেকচার ১', id: '#', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ভেক্টর', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'গতিবিদ্যা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'নিউটনীয় বলবিদ্যা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'কাজ, ক্ষমতা ও শক্তি', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মহাকর্ষ ও অভিকর্ষ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'পদার্থের গাঠনিক ধর্ম', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'পর্যাবৃত্ত গতি', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'তরঙ্গ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'তাপগতিবিদ্যা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'স্থির তড়িৎ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'চল তড়িৎ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'তড়িৎ চৌম্বক আবেশ ও পরিবর্তী প্রবাহ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'জ্যামিতিক আলোকবিজ্ঞান', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ভৌত আলোকবিজ্ঞান', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'আধুনিক পদার্থবিজ্ঞানের সূচনা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'পরমাণুর মডেল এবং নিউক্লিয়ার পদার্থবিজ্ঞান', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'সেমিকন্ডাক্টর ও ইলেক্ট্রনিক্স', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'জ্যোতির্বিজ্ঞান', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] }
        ],
        'Chemistry': [
            { chapter: 'ল্যাবরেটরির নিরাপদ ব্যবহার', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'গুণগত রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'রাসায়নিক পরিবর্তন', mainVideos: [{ title: 'লেকচার ১', id: 'g2zsPta9UMA', slide: 'https://drive.google.com/file/d/1WCaIupiPIEwKpLVVOxkF6TCPXV6_4iro/view?usp=sharing', keywords: ['C1stC4C1'] }, { title: 'লেকচার ২', id: 'KAm2N3GU8qg', slide: 'https://drive.google.com/file/d/143C1fB0Pu3pYWJl-4ZrLUKS5mz96fKOU/view?usp=sharing' }, { title: 'লেকচার ৩', id: 'MlTpKbEuhTY', slide: 'https://drive.google.com/file/d/1zmtOnXmjaphfZb6F6WIMzfGjex33zzcf/view?usp=sharing' }, { title: 'লেকচার ৪', id: 'EB1aodxrujU', slide: 'https://drive.google.com/file/d/1tW_wzoV8EgKEVr57oXr9FBh_Y9md589p/view?usp=sharing' }, { title: 'লেকচার ৫', id: 'ZB2PmU92ofA', slide: 'https://drive.google.com/file/d/1Qu3iA0pj8GLFuZCGE66n1QwPhoeobCXe/view?usp=sharing' }, { title: 'লেকচার ৬', id: 'WdESbko4AnI', slide: 'https://drive.google.com/file/d/1jSTvM_0TB43ESkC1ZJNxu5wGv71ONhDK/view?usp=sharing' }, { title: 'লেকচার ৭', id: 'wgEBKOgbYsQ', slide: 'https://drive.google.com/file/d/1w4wrTdnq826vciPKFCZplurpBoh4L8XR/view?usp=sharing' }, { title: 'লেকচার ৮', id: 'QmeE9Vfk9-Q', slide: 'https://drive.google.com/file/d/1xAwRuWCKkzmRuPeI_5HqIbJcTEVekvV2/view?usp=sharing' }, { title: 'লেকচার ৯', id: 'Iq9cjtW9Ifk', slide: 'https://drive.google.com/file/d/1PF8Awqp0UxTx63nmKxKcE9tkg6IU6X45/view?usp=sharing' }, { title: 'লেকচার ১০', id: '2tieUgpoerk', slide: 'https://drive.google.com/file/d/1rw3Yls-QU_qaI3rrrPywQlQ7b5XuISI2/view?usp=sharing' }, { title: 'লেকচার ১১', id: 'B_PJatsFKLY', slide: 'https://drive.google.com/file/d/1nXlFwh4zW-WbYtajFwCRuAWHnJL1iyed/view?usp=sharing' }, { title: 'লেকচার ১২', id: 'FeWudODIylY', slide: 'https://drive.google.com/file/d/1Wt4GUHSaiyoKpPTT5aRg7HGFRXpKPRDS/view?usp=sharing' }, { title: 'লেকচার ১৩', id: 'yuWA4LcMWcY', slide: 'https://drive.google.com/file/d/1tDZrqIdQblXbHAA1zAsvw2I62I4RRS8V/view?usp=sharing' }, { title: 'লেকচার ১৪', id: 'WLY-cRxoW6k', slide: 'https://drive.google.com/file/d/1j_LjVmbNOZbM7Hx41W9hcsHOULcecW9W/view?usp=sharing' }, { title: 'লেকচার ১৫', id: 'dl74VvGQYyo', slide: 'https://drive.google.com/file/d/1kmznZw9tC_gURefUugfKKxuLjJS7cNaE/view?usp=sharing' }], extraVideos: [
        { title: 'উইকলি এক্সাম ১ সলভ ক্লাস', id: 'f7wd5MIYjGI', slide: 'https://drive.google.com/file/d/1so5zWGOL1QuDrVODTe2KRzXwr3MU26wD/view?usp=sharing' }, { title: 'প্রব্লেম সলভিং ক্লাস ১', id: 'EgEAXUVrOGs', slide: 'javascript:void(0);' }, { title: 'প্রব্লেম সলভিং ক্লাস ২', id: '5dhpljMXzzc', slide: 'javascript:void(0);' }
    ], practiceSheets: ['LINK_HERE'] },
            { chapter: 'কর্মমুখী রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'পরিবেশ রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'জৈব রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'পরিমাণগত রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'তড়িৎ রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'অর্থনৈতিক রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] }
        ],
        'Higher Math': [
            { chapter: 'ম্যাট্রিক্স ও নির্ণায়ক', mainVideos: [{ title: 'লেকচার ১', id: 'Jk7f_Ih4I90', slide: 'https://drive.google.com/file/d/1tJnBIAJMhlDIcTvuDXrcFdxe2F1_0lxE/view?usp=sharing' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ভেক্টর', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'সরলরেখা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'বৃত্ত', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'বিন্যাস ও সমাবেশ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ত্রিকোণমিতিক অনুপাত', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ফাংশন ও ফাংশনের লেখচিত্র', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'অন্তরীকরণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }, { title: 'লেকচার ২', id: 'icS2G4QmWPM', slide: 'https://drive.google.com/file/d/1mqA5_U4fsvUHKxsw9P4zPgF4n-A5FNrV/view?usp=sharing' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'যোগজীকরণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'বাস্তব সংখ্যা ও অসমতা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'যোগাশ্রয়ী প্রোগ্রাম', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'জটিল সংখ্যা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'বহুপদী ও বহুপদী সমীকরণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'দ্বিপদী বিস্তৃতি', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'কনিক', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'স্থিতিবিদ্যা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'সমতলে বস্তুকণার গতি', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'বিস্তার পরিমাপ ও সম্ভাবনা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] }
        ],
        'Biology': [
            { chapter: 'কোষ ও এর গঠন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'N/A' }], practiceSheets: ['N/A'] },
            { chapter: 'কোষ বিভাজন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'কোষ রসায়ন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'অণুজীব', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'শৈবাল ও ছত্রাক', mainVideos: [{ title: 'লেকচার ১', id: '4u3AND4epSU', slide: 'https://drive.google.com/file/d/1zOdoLT-z1wsJUhGaqhkEAbphk4F04Alv/view?usp=sharing' }, { title: 'লেকচার ২', id: 'INv8OUEpGQU', slide: 'https://drive.google.com/file/d/1dVOJ2hj1EDuJaSNn5s4_bR0683XhFUj9/view?usp=sharing' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ব্রায়োফাইটা ও টেরিডোফাইটা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'টিস্যু ও টিস্যুতন্ত্র', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'উদ্ভিদ শারীরতত্ত্ব', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'উদ্ভিদ প্রজনন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'জীবপ্রযুক্তি', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'জীবের পরিবেশ, বিস্তার ও সংরক্ষণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'প্রাণীর পরিচিতি', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানব শারীরতত্ত্ব - পরিপাক ও শোষণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানব শারীরতত্ত্ব - রক্ত ও সঞ্চালন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানব শারীরতত্ত্ব - শ্বসন ও শ্বাসক্রিয়া', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানব শারীরতত্ত্ব - বর্জ্য ও নিষ্কাশন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানব শারীরতত্ত্ব - চলন ও অঙ্গচালনা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানব শারীরতত্ত্ব - সমন্বয় ও নিয়ন্ত্রণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানব জীবনের ধারাবাহিকতা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'মানবদেহের প্রতিরক্ষা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'জিনতত্ত্ব ও বিবর্তন', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'প্রাণীর আচরণ', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] }
        ],
        'English': [
            { chapter: 'English 1st Paper', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'English 2nd Paper', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] }
        ],
        'Bangla': [
            { chapter: 'Bangla 1st Paper', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'Bangla 2nd Paper', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] }
        ],
        'ICT': [
            { chapter: 'তথ্য ও যোগাযোগ প্রযুক্তি - বিশ্ব ও বাংলাদেশ  প্রেক্ষিত', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ওয়েব ডিজাইন পরিচিতি ও HTML', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'প্রোগ্রামিং ভাষা', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] },
            { chapter: 'ডেটাবেজ ম্যানেজমেন্ট সিস্টেম', mainVideos: [{ title: 'লেকচার ১', id: 'ID_HERE', slide: 'LINK_HERE' }], practiceSheets: ['LINK_HERE'] }
        ]
    };

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

    // চ্যাপ্টার ম্যাটেরিয়ালস (প্র্যাকটিস শিট) লজিক
    const practiceSheetLink = chObj.practiceSheets[0];
    const matBtn = document.createElement('a');
    matBtn.className = 'action-btn btn-sheet';
    matBtn.innerHTML = `📥 ডাউনলোড প্র্যাকটিস শিট (.pdf)`;

    if (practiceSheetLink === 'N/A') {
        matBtn.href = "javascript:void(0);";
        matBtn.onclick = function() {
            alert("দুঃখিত! এই চ্যাপ্টারের প্র্যাকটিস শীট এখনো প্রোভাইড করা হয়নি।");
        };
    } else if (!practiceSheetLink || practiceSheetLink === 'LINK_HERE' || practiceSheetLink === '#') {
        matBtn.href = "javascript:void(0);";
        matBtn.onclick = function() {
            alert("দুঃখিত! এই চ্যাপ্টারের প্র্যাকটিস শীট এখনো এড করা হয়নি।");
        };
    } else {
        matBtn.href = practiceSheetLink;
        matBtn.target = "_blank";
    }

    mContainer.innerHTML = ''; // আগের কন্টেন্ট ক্লিয়ার করা
    mContainer.appendChild(matBtn);
    
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
    // Overlay Click = Play/Pause
    document.getElementById('video-overlay').addEventListener('click', (e) => {
        if(!isDragging) togglePlay();
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
    
    // স্লাইড বাটন লজিক
    const slideBtn = document.getElementById('individual-slide');
    if (video.slide === 'N/A') {
        slideBtn.href = "javascript:void(0);";
        slideBtn.onclick = function() {
            alert("দুঃখিত! এই ক্লাসের স্লাইড এখনো প্রোভাইড করা হয়নি।");
        };
    } else if (!video.slide || video.slide === 'LINK_HERE' || video.slide === '#') {
        slideBtn.href = "javascript:void(0);";
        slideBtn.onclick = function() {
            alert("দুঃখিত! এই ক্লাসের স্লাইড এখনো এড করা হয়নি।");
        };
    } else {
        slideBtn.href = video.slide;
        slideBtn.onclick = null;
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
// স্পেস বাটন দিয়ে ভিডিও প্লে/পজ করার কোড
document.addEventListener('keydown', (event) => {
    // যদি বাটনটি স্পেস হয়
    if (event.code === 'Space') {
        event.preventDefault(); // পেজ যেন নিচে স্ক্রল না হয়
        togglePlay();           // আপনার তৈরি করা প্লে/পজ ফাংশনটি কল করবে
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