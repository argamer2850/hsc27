import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const whitelist = ['202.181.4.185']; 
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

  console.log("Visitor IP:", ip); // এটি এখন ঠিক জায়গায় আছে

  if (whitelist.includes(ip)) {
    // এখানে আপনার আসল সাইট ফাইলটি সার্ভ করা হচ্ছে
    const filePath = path.join(process.cwd(), 'public', 'index.html'); 
    const html = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } else {
    return res.status(403).send("<h1>Access Denied: You are not authorized.</h1>");
  }
}
