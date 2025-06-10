const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [
    { width: 300, suffix: 'small' },
    { width: 600, suffix: 'medium' },
    { width: 900, suffix: 'large' }
];

const imageDir = 'resimler';
const supportedFormats = ['.jpg', '.jpeg', '.png'];

async function optimizeImages() {
    try {
        // Resimler klasörünü oku
        const files = await fs.readdir(imageDir);
        
        for (const file of files) {
            // Sadece desteklenen formatları işle
            if (!supportedFormats.includes(path.extname(file).toLowerCase())) {
                continue;
            }

            const filePath = path.join(imageDir, file);
            const fileName = path.parse(file).name;

            // Her boyut için optimize et
            for (const size of sizes) {
                const outputPath = path.join(
                    imageDir,
                    `${fileName}-${size.suffix}${path.extname(file)}`
                );

                await sharp(filePath)
                    .resize(size.width)
                    .jpeg({ quality: 80, progressive: true })
                    .withMetadata()
                    .toFile(outputPath);

                console.log(`Optimized: ${outputPath}`);
            }

            // WebP versiyonlarını oluştur
            for (const size of sizes) {
                const outputPath = path.join(
                    imageDir,
                    `${fileName}-${size.suffix}.webp`
                );

                await sharp(filePath)
                    .resize(size.width)
                    .webp({ quality: 80 })
                    .withMetadata()
                    .toFile(outputPath);

                console.log(`Created WebP: ${outputPath}`);
            }
        }

        console.log('Image optimization completed successfully!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages(); 