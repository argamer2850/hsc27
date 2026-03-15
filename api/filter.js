export default function handler(req, res) {
  // ১. আপনার অনুমোদিত IP এখানে লিখুন
  const whitelist = ['202.181.4.175']; 
  
  // ২. ভিজিটরের IP শনাক্ত করা
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // ৩. চেক করা (যদি IP লিস্টে না থাকে, তবে ব্লক)
  if (!whitelist.includes(ip)) {
    return res.status(403).send("Access Denied: You are not authorized.");
  }

  // ৪. যদি IP মিলে যায়, তবে মেইন সাইটে পাঠিয়ে দেওয়া
  res.writeHead(302, { Location: '/index.html' });
  res.end();
}
