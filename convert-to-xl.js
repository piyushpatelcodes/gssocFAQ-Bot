const fs = require('fs');
const XLSX = require('xlsx');

// Load the leaderboard JSON
const data = JSON.parse(fs.readFileSync('leaderboard.json', 'utf8'));

const rows = [];

for (const [username, userData] of Object.entries(data)) {
  const { prs, currentPoints, expectedPoints, avatar_url, profile_url } = userData;

  prs.forEach(pr => {
    rows.push({
      Username: username,
      Profile_URL: profile_url,
      Avatar_URL: avatar_url,
      Repo: pr.repo,
      PR_Title: pr.title,
      PR_URL: pr.url,
      Level: pr.level || "Not Labeled",
      Points: pr.points,
      Merged: pr.merged,
      PR_State: pr.state,
      Created_At: pr.created_at,
      Updated_At: pr.updated_at,
      Merged_At: pr.merged_at || "",
      User_Current_Points: currentPoints,
      User_Expected_Points: expectedPoints
    });
  });
}

// Convert to worksheet and workbook
const worksheet = XLSX.utils.json_to_sheet(rows);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Leaderboard");

// Save as Excel
XLSX.writeFile(workbook, "leaderboard.xlsx");
console.log("✅ leaderboard.xlsx created successfully!");
