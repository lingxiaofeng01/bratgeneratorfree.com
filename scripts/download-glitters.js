const https = require('https');
const fs = require('fs');
const path = require('path');

// 从素材文件中提取的所有 glitter 图片文件名
const glitterImages = [
  'DCglit109.gif', 'DCglit111.gif', 'DCaqua.gif', 'DCglit77.gif', 'DCglit150.gif', 
  'DCglit98.gif', 'DCglit69.gif', 'DCglit94.gif', 'DCglit78.gif', 'DCrosey.gif', 
  'DCglit23.gif', 'DCglit29.gif', 'DCabyss.gif', 'DCglit40.gif', 'DCglit123.gif', 
  'DCbe4.gif', 'DCglit134.gif', 'DCglit2.gif', 'DCglit153.gif', 'purplepink.gif', 
  'DCglit92.gif', 'DCglit18.gif', 'DCwavey.gif', 'DCglit82.gif', 'DCglit14.gif', 
  'DCglit11.gif', 'DCglit31.gif', 'DCglit110.gif', 'DCpixdiamonds.gif', 'DCglit8.gif', 
  'DCglit16.gif', 'DCdaisy.gif', 'DCbe2.gif', 'DCsunset2.gif', 'DCglit135.gif', 
  'DCglit54.gif', 'DCglit37.gif', 'DCglit62.gif', 'DCglit33.gif', 'DCglit41.gif', 
  'DCglit64.gif', 'DCglit100.gif', 'DCglit10.gif', 'DCglit65.gif', 'DCglit149.gif', 
  'DCseafoam.gif', 'DCglit165.gif', 'DCglit44.gif', 'DCneopolitan.gif', 'DCglit9.gif', 
  'DCglit79.gif', 'DCglit19.gif', 'DCglit50.gif', 'DCglit3.gif', 'DCglit124.gif', 
  'DCspiderman.gif', 'DCdeepviolet.gif', 'DCglit90.gif', 'DCglit121.gif', 'DCglit148.gif', 
  'DCglit167.gif', 'DCpicnic.gif', 'DCglit36.gif', 'DCglit6.gif', 'DCglit12.gif', 
  'DCglit39.gif', 'DCglit152.gif', 'DCforest.gif', 'DCglit67.gif', 'DCvio.gif', 
  'DCglit161.gif', 'DCglit60.gif', 'DCglit48.gif', 'DCglit52.gif', 'DCglit122.gif', 
  'DCglit160.gif', 'DCglit38.gif', 'DCglit116.gif', 'DCglit155.gif', 'DCglit99.gif', 
  'DCglit30.gif', 'DCglit53.gif', 'DCglit73.gif', 'DCglit88.gif', 'DCglit75.gif', 
  'DCglit74.gif', 'DCglit101.gif', 'DCcheck.gif', 'DCglit25.gif', 'DCglit139.gif', 
  'DCglit93.gif', 'DCbe.gif', 'DCglit63.gif', 'DCglit105.gif', 'DCglit21.gif', 
  'DCglit119.gif', 'DCglit66.gif', 'DCglit118.gif', 'DCglit157.gif', 'DCglit146.gif', 
  'DCglit56.gif', 'DCglit114.gif', 'DCglit102.gif', 'DCglit70.gif', 'DCglit35.gif', 
  'DCglit20.gif', 'DCdeepvio2.gif', 'DCglit28.gif', 'DCsunset.gif', 'DCglit24.gif', 
  'DCglit96.gif', 'DCglit136.gif', 'DCglit113.gif', 'DCchampagne.gif', 'DCglit91.gif', 
  'DCglit83.gif', 'DCindigo.gif', 'DCglit145.gif', 'DCglit162.gif', 'DCgoldnugget.gif', 
  'DCglit57.gif', 'DCglit117.gif', 'DCglit158.gif', 'DCglit144.gif', 'DCglit163.gif', 
  'DCglit17.gif', 'DCglit151.gif', 'DCglit87.gif', 'DCglit143.gif', 'DCglit131.gif', 
  'DCglit137.gif', 'DCglit142.gif', 'DCglit72.gif', 'DCglit43.gif', 'DCglit107.gif', 
  'DCglit159.gif', 'DCglit1.gif', 'DCglit47.gif', 'DCglit106.gif', 'DCflame.gif', 
  'DCglit58.gif', 'DCglit89.gif', 'DCglit147.gif', 'DCdarkness.gif', 'DCglit141.gif', 
  'DCpastel2.gif', 'DCglit32.gif', 'DCglit42.gif', 'DClav.gif', 'DCglit7.gif', 
  'DCglit80.gif', 'DCglit45.gif', 'DCneptune.gif', 'DCglit104.gif', 'DCglit112.gif', 
  'DCglit120.gif', 'DCglit125.gif', 'DCglit34.gif', 'DClav2.gif', 'DCxmas.gif', 
  'DCyelowgreen.gif', 'DCglit164.gif', 'DCglit5.gif', 'DCglit26.gif', 'DCember.gif', 
  'DCglit127.gif', 'DCtmv.gif', 'DCglit15.gif', 'DCglit55.gif', 'DCglit81.gif', 
  'DCglit128.gif', 'DCglit85.gif', 'DCglit140.gif', 'DCtang.gif', 'DCglit76.gif', 
  'DCglit61.gif'
];

const baseUrl = 'https://www.gigaglitters.com/img/';
const outputDir = path.join(__dirname, '..', 'public', 'glitters');

// 创建输出目录
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✅ Created directory: ${outputDir}`);
}

// 下载单个文件
function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const url = baseUrl + filename;
    const outputPath = path.join(outputDir, filename);

    // 如果文件已存在，跳过
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipped (already exists): ${filename}`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve();
        });
      } else {
        fs.unlink(outputPath, () => {});
        console.log(`❌ Failed (${response.statusCode}): ${filename}`);
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      console.log(`❌ Error: ${filename} - ${err.message}`);
      reject(err);
    });
  });
}

// 批量下载，限制并发数
async function downloadAll() {
  console.log(`🚀 Starting download of ${glitterImages.length} glitter images...\n`);
  
  const concurrency = 5; // 同时下载5个文件
  const results = {
    success: 0,
    failed: 0,
    skipped: 0
  };

  for (let i = 0; i < glitterImages.length; i += concurrency) {
    const batch = glitterImages.slice(i, i + concurrency);
    await Promise.allSettled(batch.map(downloadFile))
      .then(outcomes => {
        outcomes.forEach((outcome, index) => {
          if (outcome.status === 'fulfilled') {
            const filename = batch[index];
            const outputPath = path.join(outputDir, filename);
            if (fs.existsSync(outputPath)) {
              const stats = fs.statSync(outputPath);
              if (stats.size > 0) {
                results.success++;
              } else {
                results.skipped++;
              }
            } else {
              results.skipped++;
            }
          } else {
            results.failed++;
          }
        });
      });
    
    // 添加延迟避免请求过快
    if (i + concurrency < glitterImages.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n📊 Download Summary:');
  console.log(`   ✅ Success: ${results.success}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`\n🎉 Download complete! Files saved to: ${outputDir}`);
}

// 执行下载
downloadAll().catch(console.error);

