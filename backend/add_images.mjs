import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Map the DB expected filename down to the generated source artifact
const artifactDir = process.env.IMAGE_SOURCE_DIR || path.join(__dirname, 'uploads');
const imageMap = {
    'salad1.jpg': 'salad1_image_1776611116780.png',
    'roll1.jpg': 'roll1_image_1776611216450.png',
    'desert1.jpg': 'desert1_image_1776611244381.png',
    'sandwich1.jpg': 'sandwich1_image_1776611463441.png',
    'cake1.jpg': 'cake1_image_1776611532572.png',
    'veg1.jpg': 'veg1_image_1776611594998.png',
    // Missing items will use generic placehold images
    'pasta1.jpg': 'Pasta_Alfredo',
    'noodles1.jpg': 'Hakka_Noodles',
    'salad2.jpg': 'Caesar_Salad',
    'roll2.jpg': 'Egg_Roll',
    'cake2.jpg': 'Cheesecake',
    'veg2.jpg': 'Pizza'
};

async function setupImages() {
    for (const [targetName, srcName] of Object.entries(imageMap)) {
        const destPath = path.join(uploadsDir, targetName);
        
        if (srcName.endsWith('.png')) {
            // It's a generated artifact
            const srcPath = path.join(artifactDir, srcName);
            try {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied ${srcName} to ${targetName}`);
            } catch (err) {
                console.error(`Failed to copy ${srcName}: ${err.message}`);
            }
        } else {
            // It's a missing image, download a placeholder
            try {
                const url = `https://placehold.co/400x300/ff6347/white/png?text=${srcName}`;
                const res = await fetch(url);
                const arrayBuffer = await res.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                fs.writeFileSync(destPath, buffer);
                console.log(`Downloaded placeholder for ${targetName}`);
            } catch (err) {
                console.error(`Failed to download ${targetName}: ${err.message}`);
            }
        }
    }
    console.log("Image setup complete!");
}

setupImages();
