export default function handler(req, res) {
  // আপনার আসল আইপি এখানে বসান (একদম সঠিকটি)
  const whitelist = ['202.181.4.185']; 
  
  // ভিজিটরের আইপি বের করা
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

  // আইপি চেক করা
  if (whitelist.includes(ip)) {
    // যদি আইপি মিলে যায়, তবে তাকে সাইটে ঢুকতে দিন
    return res.status(200).json({ message: "Authorized" });
  } else {
    // যদি আইপি না মিলে, তবে ব্লক করুন
    return res.status(403).send("<h1>Access Denied: You are not authorized.</h1>");
  }
}
console.log("Visitor IP:", ip);
