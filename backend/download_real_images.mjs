import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

const imagesToFetch = [
    { name: 'pasta1.jpg', keyword: 'pasta,alfredo,food' },
    { name: 'noodles1.jpg', keyword: 'noodles,chinese,food' },
    { name: 'salad2.jpg', keyword: 'salad,caesar,food' },
    { name: 'cake2.jpg', keyword: 'cheesecake,dessert' },
    { name: 'veg2.jpg', keyword: 'pizza,margarita' }
];

async function downloadImages() {
    for (const item of imagesToFetch) {
        const destPath = path.join(uploadsDir, item.name);
        try {
            console.log(`Downloading ${item.name} for keywords ${item.keyword}...`);
            const url = `https://loremflickr.com/800/600/${item.keyword}/all`;
            // Using a fetch with redirection followed
            const res = await fetch(url, { redirect: 'follow' });
            if (!res.ok) throw new Error(`Status Code: ${res.status}`);
            
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs.writeFileSync(destPath, buffer);
            console.log(`✅ Successfully downloaded and saved to ${item.name}`);
        } catch (err) {
            console.error(`❌ Failed to download ${item.name}: ${err.message}`);
        }
    }
}

downloadImages();
