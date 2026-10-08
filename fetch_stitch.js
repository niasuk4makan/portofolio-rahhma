const fs = require('fs');

async function main() {
  const apiKey = '';
  const url = 'https://stitch.googleapis.com/v1/projects/9886785470074420184/screens/0957482ade5549ff8263155bd7b94968';

  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey
    }
  });

  const data = await res.json();
  fs.writeFileSync('screen_data.json', JSON.stringify(data, null, 2));
  console.log('Keys:', Object.keys(data));
  if (data.screen) {
    console.log('Screen keys:', Object.keys(data.screen));
  }
}

main().catch(console.error);
