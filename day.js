// 🔥 Analytics SaaS MVP - Actual Project Data
// Starting exactly from April 25
const myProjectJourney = [
  {
    dateStr: "Apr 24, 2026",
    rawDate: new Date("2026-04-24T10:00:00"),
    dayNumber: 1,
    tasks: [
      { text: "Initialized Backend (Node + Express) and Frontend (React/Vite) architecture.", status: "done" },
      { text: "Planned full Analytics SaaS system structure.", status: "done" }
    ]
  },
  {
    dateStr: "Apr 25, 2026",
    rawDate: new Date("2026-04-25T10:00:00"),
    dayNumber: 2,
    tasks: [
      { text: "Connected MongoDB database.", status: "done" },
      { text: "Created models (User, Site, Event, Session).", status: "done" }
    ]
  },
  {
    dateStr: "Apr 26, 2026",
    rawDate: new Date("2026-04-26T10:00:00"),
    dayNumber: 3,
    tasks: [
      { text: "Built tracking API (POST /api/track).", status: "done" },
      { text: "Stored page path, session, device, browser, OS, timestamp.", status: "done" }
    ]
  },
  {
    dateStr: "Apr 27, 2026",
    rawDate: new Date("2026-04-27T10:00:00"),
    dayNumber: 4,
    tasks: [
      { text: "Deployed backend to Render.", status: "done" },
      { text: "Tested API endpoints with real data.", status: "done" }
    ]
  },
  {
    dateStr: "Apr 28, 2026",
    rawDate: new Date("2026-04-28T10:00:00"),
    dayNumber: 5,
    tasks: [
      { text: "Built analytics API (GET /api/analytics).", status: "done" },
      { text: "Added grouped metrics (visitors, sessions, page views).", status: "done" }
    ]
  },
  {
    dateStr: "Apr 29, 2026",
    rawDate: new Date("2026-04-29T10:00:00"),
    dayNumber: 6,
    tasks: [
      { text: "Created tracker.js (production-level tracking script).", status: "done" },
      { text: "Implemented session tracking and device detection.", status: "done" }
    ]
  },
  {
    dateStr: "Apr 30, 2026",
    rawDate: new Date("2026-04-30T10:00:00"),
    dayNumber: 7,
    tasks: [
      { text: "Added SPA tracking support (pushState).", status: "done" },
      { text: "Implemented visibility tracking and fallback API.", status: "done" }
    ]
  },
  {
    dateStr: "May 01, 2026",
    rawDate: new Date("2026-05-01T10:00:00"),
    dayNumber: 8,
    tasks: [
      { text: "Designed Analytics Dashboard UI.", status: "done" },
      { text: "Built KPI cards (views, sessions, users).", status: "done" }
    ]
  },
  {
    dateStr: "May 02, 2026",
    rawDate: new Date("2026-05-02T10:00:00"),
    dayNumber: 9,
    tasks: [
      { text: "Integrated charts (traffic visualization).", status: "done" },
      { text: "Added time filtering (24h / 7d).", status: "done" }
    ]
  },
  {
    dateStr: "May 03, 2026",
    rawDate: new Date("2026-05-03T10:00:00"),
    dayNumber: 10,
    tasks: [
      { text: "Built Top pages and activity panel.", status: "done" },
      { text: "Improved UI/UX (tooltips, layout fixes).", status: "done" }
    ]
  },
  {
    dateStr: "May 04, 2026",
    rawDate: new Date("2026-05-04T10:00:00"),
    dayNumber: 11,
    tasks: [
      { text: "Implemented Socket.io for real-time updates.", status: "done" },
      { text: "Built live visitors feed and status indicator.", status: "done" }
    ]
  },
  {
    dateStr: "May 05, 2026",
    rawDate: new Date("2026-05-05T10:00:00"),
    dayNumber: 12,
    tasks: [
      { text: "Deployed frontend to Vercel.", status: "done" },
      { text: "Fixed tracking bugs (localhost, socket, banner).", status: "done" },
      { text: "Planned advanced analytics features (bounce rate, multi-site, export).", status: "done" }
    ]
  }
];

// Using your actual project data!
const workLog = window.workLog || myProjectJourney;

function initReport() {
  const feedContainer = document.getElementById("report-feed");
  
  // 1. Get active days and ensure newest is on top (it's already sorted, but let's be safe)
  const activeLogs = workLog.filter(day => day.tasks.length > 0).sort((a, b) => b.rawDate - a.rawDate); 

  // Update total tasks badge
  const totalTasks = activeLogs.reduce((sum, day) => sum + day.tasks.length, 0);
  document.getElementById("stats").innerText = `MVP Built: ${totalTasks} Features Shipped`;

  if (activeLogs.length === 0) {
    feedContainer.innerHTML = `<p style="color: #64748b;">No activity logged yet.</p>`;
    return;
  }

  // 2. Calculate the "Last 7 Days" window based on your newest log
  const newestDate = activeLogs[0].rawDate;
  const sevenDaysAgo = new Date(newestDate);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // 3. Group the data dynamically
  const groups = {
    "Latest Milestones": []
  };

  activeLogs.forEach(log => {
    // If it's within 7 days of your most recent log, group it together
    if (log.rawDate >= sevenDaysAgo) {
      groups["Latest Milestones"].push(log);
    } else {
      // Group by Month Year (e.g., "April 2024")
      const monthYear = log.rawDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(log);
    }
  });

  // Clean up empty groups
  if (groups["Latest Milestones"].length === 0) {
    delete groups["Latest Milestones"];
  }

  feedContainer.innerHTML = ""; 

  // 4. Render HTML elements based on groups
  let groupIndex = 0;
  for (const [groupName, logs] of Object.entries(groups)) {
    
    const groupWrapper = document.createElement("div");
    // Open the very first group by default
    groupWrapper.className = `time-group ${groupIndex === 0 ? 'open' : ''}`;
    
    // Build the timeline items for this specific group
    const timelineItemsHtml = logs.map((log, logIndex) => {
      // Every single task uses the green tick mark
      const tasksHtml = log.tasks.map(t => `
        <div class="task-item">
          <div class="status-icon"></div>
          <span class="task-text">${t.text}</span>
        </div>
      `).join('');

      // Open the newest day by default
      const isDayOpen = (groupIndex === 0 && logIndex === 0) ? 'open' : '';

      return `
        <div class="timeline-item ${isDayOpen}">
          <div class="timeline-dot"></div>
          <div class="timeline-item-card">
            <div class="timeline-header" onclick="toggleAccordion(this, 'timeline-item')">
              <div class="day-meta">
                <span class="day-date">${log.dateStr}</span>
                <span class="day-label">Day ${log.dayNumber || '-'}</span>
              </div>
              <div class="chevron"></div>
            </div>
            <div class="task-wrapper">
              <div class="task-wrapper-inner">
                <div class="task-card">
                  <div class="task-list">
                    ${tasksHtml}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Put it all together inside the Group wrapper
    groupWrapper.innerHTML = `
      <div class="group-header" onclick="toggleAccordion(this, 'time-group')">
        <div class="group-title-wrapper">
          <h2 class="group-title">${groupName}</h2>
          <span class="group-badge">${logs.length} Days Logged</span>
        </div>
        <div class="chevron"></div>
      </div>
      <div class="group-body-wrapper">
        <div class="group-body">
          <div class="timeline">
            ${timelineItemsHtml}
          </div>
        </div>
      </div>
    `;

    feedContainer.appendChild(groupWrapper);
    groupIndex++;
  }
}

// Universal toggle function for both Group Accordions and Day Accordions
window.toggleAccordion = function(element, parentClass) {
  const parent = element.closest('.' + parentClass);
  if(parent) {
    parent.classList.toggle('open');
  }
};

// Initialize the report once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initReport);