# SLSU-HC-Priority-Dashboard

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSC Priority Line Portal</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app">
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="brand-logo">SSC</div>
        <div>
          <h1>SLSU HC</h1>
          <span>Supreme Student Council</span>
        </div>
      </div>

      <nav>
        <button class="nav-item active" data-page="dashboard">⌂ <span>Dashboard</span></button>
        <button class="nav-item" data-page="print">▣ <span>Print Requests</span></button>
        <button class="nav-item" data-page="borrow">▱ <span>Borrow Requests</span></button>
        <button class="nav-item" data-page="concerns">✉ <span>SSC Concerns</span></button>
        <button class="nav-item" data-page="excuse">▤ <span>Excuse Letters</span></button>
        <button class="nav-item" data-page="queue"># <span>Priority Queue</span></button>
        <button class="nav-item" data-page="reports">◫ <span>Reports</span></button>
      </nav>

      <div class="sidebar-bottom">
        <button class="nav-item" data-page="settings">⚙ <span>Settings</span></button>
        <button class="nav-item" id="logoutBtn">⇥ <span>Logout</span></button>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <button class="menu-btn" id="menuBtn">☰</button>
        <div>
          <p class="eyebrow">SSC PRIORITY LINE</p>
          <h2 id="pageTitle">Dashboard</h2>
        </div>
        <div class="top-actions">
          <button class="icon-btn" id="refreshBtn" title="Refresh">↻</button>
          <div class="profile">
            <div class="avatar">SA</div>
            <div><strong>SSC Admin</strong><small>Administrator</small></div>
          </div>
        </div>
      </header>

      <section id="page-dashboard" class="page active">
        <div class="welcome">
          <div>
            <p class="eyebrow">WELCOME BACK</p>
            <h3>SSC Priority Line Management</h3>
            <p>Manage student requests, concerns, documents, and the daily priority queue from one dashboard.</p>
          </div>
          <button class="primary" id="newRequestBtn">＋ New Request</button>
        </div>

        <div class="stats">
          <div class="stat-card"><span class="stat-icon blue">◎</span><div><small>Total Requests</small><strong id="totalStat">0</strong></div></div>
          <div class="stat-card"><span class="stat-icon orange">◷</span><div><small>Pending</small><strong id="pendingStat">0</strong></div></div>
          <div class="stat-card"><span class="stat-icon purple">↻</span><div><small>Under Review</small><strong id="reviewStat">0</strong></div></div>
          <div class="stat-card"><span class="stat-icon green">✓</span><div><small>Completed</small><strong id="completedStat">0</strong></div></div>
        </div>

        <div class="grid two">
          <div class="panel">
            <div class="panel-head"><div><h3>Today's Priority Queue</h3><p>Live service counter</p></div><button class="ghost" data-page-link="queue">View Queue</button></div>
            <div class="queue-display">
              <span>NOW SERVING</span>
              <strong id="nowServing">—</strong>
              <div class="queue-next">NEXT: <b id="nextQueue">—</b></div>
            </div>
            <div class="queue-actions">
              <button class="primary" id="callNextBtn">Call Next</button>
              <button class="secondary" id="resetQueueBtn">Reset Queue</button>
            </div>
          </div>

          <div class="panel">
            <div class="panel-head"><div><h3>Quick Actions</h3><p>Frequently used SSC tools</p></div></div>
            <div class="quick-grid">
              <button data-open-form="Print Organization Papers">▣<span>Print Papers</span></button>
              <button data-open-form="Borrow">▱<span>Borrow</span></button>
              <button data-open-form="SSC Concern">✉<span>Concern</span></button>
              <button data-open-form="Submitting Excuse Letter">▤<span>Excuse Letter</span></button>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head">
            <div><h3>Recent Requests</h3><p>Latest student transactions</p></div>
            <input class="search" id="dashboardSearch" placeholder="Search reference or student...">
          </div>
          <div class="table-wrap"><table><thead><tr><th>Reference</th><th>Student</th><th>Service</th><th>Date</th><th>Priority</th><th>Status</th><th></th></tr></thead>
          <tbody id="recentTable"></tbody></table></div>
        </div>
      </section>

      <section id="page-print" class="page">
        <div class="page-intro"><div><p class="eyebrow">SERVICE MANAGEMENT</p><h3>Print Organization Papers</h3><p>Review and manage organization printing requests.</p></div><button class="primary" data-open-form="Print Organization Papers">＋ New Request</button></div>
        <div class="panel"><div class="panel-head"><h3>Print Requests</h3><input class="search" data-filter="print" placeholder="Search..."></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Student</th><th>Organization</th><th>Copies</th><th>Paper</th><th>Status</th><th>Action</th></tr></thead><tbody id="printTable"></tbody></table></div></div>
      </section>

      <section id="page-borrow" class="page">
        <div class="page-intro"><div><p class="eyebrow">SERVICE MANAGEMENT</p><h3>Borrow Requests</h3><p>Manage requests for SSC equipment and property.</p></div><button class="primary" data-open-form="Borrow">＋ New Request</button></div>
        <div class="panel"><div class="panel-head"><h3>Borrow Requests</h3><input class="search" data-filter="borrow" placeholder="Search..."></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Student</th><th>Item</th><th>Borrow Date</th><th>Return Date</th><th>Status</th><th>Action</th></tr></thead><tbody id="borrowTable"></tbody></table></div></div>
      </section>

      <section id="page-concerns" class="page">
        <div class="page-intro"><div><p class="eyebrow">STUDENT SERVICES</p><h3>SSC Concerns</h3><p>Handle inquiries, suggestions, complaints, and student concerns.</p></div><button class="primary" data-open-form="SSC Concern">＋ New Concern</button></div>
        <div class="panel"><div class="panel-head"><h3>Concern Records</h3><input class="search" data-filter="concern" placeholder="Search..."></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Student</th><th>Category</th><th>Concern</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead><tbody id="concernTable"></tbody></table></div></div>
      </section>

      <section id="page-excuse" class="page">
        <div class="page-intro"><div><p class="eyebrow">DOCUMENT SUBMISSION</p><h3>Excuse Letters</h3><p>Review submitted excuse letters and supporting information.</p></div><button class="primary" data-open-form="Submitting Excuse Letter">＋ Submit Letter</button></div>
        <div class="panel"><div class="panel-head"><h3>Excuse Letter Submissions</h3><input class="search" data-filter="excuse" placeholder="Search..."></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Student</th><th>Date of Absence</th><th>Reason</th><th>Attachment</th><th>Status</th><th>Action</th></tr></thead><tbody id="excuseTable"></tbody></table></div></div>
      </section>

      <section id="page-queue" class="page">
        <div class="page-intro"><div><p class="eyebrow">LIVE SERVICE COUNTER</p><h3>Priority Queue</h3><p>Call and manage the current service queue.</p></div><button class="primary" id="queueAddBtn">＋ Add to Queue</button></div>
        <div class="queue-large panel">
          <div class="queue-display large"><span>NOW SERVING</span><strong id="queueNow">—</strong><div class="queue-next">NEXT: <b id="queueNext">—</b></div></div>
          <div class="queue-actions"><button class="primary" id="queueCallBtn">Call Next</button><button class="secondary" id="queueResetBtn">Reset Queue</button></div>
        </div>
        <div class="panel"><div class="panel-head"><h3>Waiting Queue</h3><span class="badge neutral" id="queueCount">0 waiting</span></div><div id="waitingList" class="waiting-list"></div></div>
      </section>

      <section id="page-reports" class="page">
        <div class="page-intro"><div><p class="eyebrow">ANALYTICS</p><h3>Reports</h3><p>Overview of SSC Priority Line activity.</p></div><button class="secondary" id="exportBtn">⇩ Export CSV</button></div>
        <div class="report-grid">
          <div class="report-card"><small>Print Requests</small><strong id="reportPrint">0</strong></div>
          <div class="report-card"><small>Borrow Requests</small><strong id="reportBorrow">0</strong></div>
          <div class="report-card"><small>Concerns</small><strong id="reportConcern">0</strong></div>
          <div class="report-card"><small>Excuse Letters</small><strong id="reportExcuse">0</strong></div>
        </div>
        <div class="panel"><div class="panel-head"><h3>Request Summary</h3></div><div class="bar-chart" id="barChart"></div></div>
      </section>

      <section id="page-settings" class="page">
        <div class="page-intro"><div><p class="eyebrow">SYSTEM</p><h3>Settings</h3><p>Configure basic portal preferences.</p></div></div>
        <div class="panel settings">
          <label>SSC Office Name<input id="officeName" value="Supreme Student Council"></label>
          <label>Campus<input value="SLSU Hinunangan Campus"></label>
          <label>Queue Prefix<input id="queuePrefix" value="SSC"></label>
          <button class="primary" id="saveSettings">Save Settings</button>
        </div>
      </section>
    </main>
  </div>

  <div class="modal-backdrop" id="modalBackdrop">
    <div class="modal">
      <div class="modal-head"><div><p class="eyebrow">NEW TRANSACTION</p><h3 id="modalTitle">Create Request</h3></div><button class="close" id="closeModal">×</button></div>
      <form id="requestForm">
        <input type="hidden" id="formService">
        <div class="form-grid">
          <label>Student Name<input id="student" required placeholder="Full name"></label>
          <label>Student ID<input id="studentId" placeholder="Optional"></label>
          <label id="orgField">Organization<input id="organization" placeholder="Organization / Department"></label>
          <label id="itemField" class="hidden">Item to Borrow<input id="item" placeholder="e.g. Projector"></label>
          <label id="copiesField" class="hidden">Number of Copies<input id="copies" type="number" min="1" value="1"></label>
          <label id="paperField" class="hidden">Paper Size<select id="paper"><option>A4</option><option>Short</option><option>Long</option></select></label>
          <label id="borrowDateField" class="hidden">Borrow Date<input id="borrowDate" type="date"></label>
          <label id="returnDateField" class="hidden">Return Date<input id="returnDate" type="date"></label>
          <label id="categoryField" class="hidden">Concern Category<select id="category"><option>Inquiry</option><option>Suggestion</option><option>Complaint</option><option>Student Welfare</option><option>Other</option></select></label>
          <label id="absenceField" class="hidden">Date of Absence<input id="absenceDate" type="date"></label>
          <label id="attachmentField" class="hidden">Attachment<input id="attachment" type="file"></label>
          <label>Priority<select id="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label>
          <label class="full">Details / Purpose / Reason<textarea id="details" required placeholder="Enter the details of the request..."></textarea></label>
        </div>
        <div class="form-actions"><button type="button" class="secondary" id="cancelModal">Cancel</button><button class="primary" type="submit">Submit Request</button></div>
      </form>
    </div>
  </div>

  <div class="toast" id="toast"></div>
  <script src="script.js"></script>
</body>
</html>
