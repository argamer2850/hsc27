import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const whitelist = ['202.181.4.185']; // এখানে আপনার আইপি দিন
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

  if (whitelist.includes(ip)) {
    // যদি আইপি মিলে যায়, তবে সরাসরি index.html ফাইলটি পড়ে দেখাবে
    const filePath = path.join(process.cwd(), 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } else {
    // আইপি না মিললে ব্লক
    res.status(403).send("<h1>Access Denied: You are not authorized.</h1>");
  }
}
