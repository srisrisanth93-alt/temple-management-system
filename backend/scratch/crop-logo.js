const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const run = async () => {
  console.log('Installing jimp temporarily...');
  execSync('npm install jimp --no-save', { cwd: path.join(__dirname, '..') });
  
  const { Jimp } = require('jimp');
  const sourcePath = 'C:\\Users\\srisr\\.gemini\\antigravity\\brain\\c760a62a-53b4-4c18-ad03-ebe94dec34f0\\media__1782920616311.jpg';
  const destPath = 'c:\\Users\\srisr\\OneDrive\\Desktop\\GPS\\frontend\\public\\temple_logo.png';
  
  console.log('Loading image:', sourcePath);
  const image = await Jimp.read(sourcePath);
  
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log(`Dimensions: ${width}x${height}`);
  
  // The golden seal circle is in the center
  // Let's crop a square in the center. We estimate the circle size is about 38% of the image size
  const cropSize = Math.floor(width * 0.38);
  const cropX = Math.floor((width - cropSize) / 2);
  const cropY = Math.floor((height - cropSize) / 2);
  
  console.log(`Cropping area: x=${cropX}, y=${cropY}, size=${cropSize}x${cropSize}`);
  
  image.crop({ x: cropX, y: cropY, w: cropSize, h: cropSize });
  
  // Optional: Make it circular by masking or just saving it as is since CSS border-radius is used
  // CSS border-radius will round it perfectly, so saving as a close square crop is ideal!
  
  await image.write(destPath);
  console.log('Logo cropped and saved successfully to:', destPath);
};

run().catch(console.error);
