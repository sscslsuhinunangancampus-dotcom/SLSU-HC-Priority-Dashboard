const seedRequests = [
 {id:"SSC-0042",student:"Maria Santos",service:"Submitting Excuse Letter",date:"2026-09-25",priority:"Normal",status:"Pending",details:"Family emergency",absence:"2026-09-24"},
 {id:"SSC-0041",student:"John Dela Cruz",service:"Borrow",date:"2026-09-25",priority:"High",status:"Under Review",details:"Projector for organization meeting",item:"Projector",borrowDate:"2026-09-26",returnDate:"2026-09-26"},
 {id:"SSC-0040",student:"Angela Reyes",service:"Print Organization Papers",date:"2026-09-25",priority:"Normal",status:"Completed",details:"Print event proposal",organization:"ACS",copies:5,paper:"A4"},
 {id:"SSC-0039",student:"Kevin Flores",service:"SSC Concern",date:"2026-09-25",priority:"Urgent",status:"Under Review",details:"Concern regarding student activity",category:"Student Welfare"}
];
let requests = JSON.parse(localStorage.getItem("sscRequests") || "null") || seedRequests;
let queue = JSON.parse(localStorage.getItem("sscQueue") || "null") || ["SSC-0042","SSC-0041","SSC-0040"];
let nowServing = localStorage.getItem("sscNow") || "";
let settings = JSON.parse(localStorage.getItem("sscSettings") || "{}");

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
function save(){localStorage.setItem("sscRequests",JSON.stringify(requests));localStorage.setItem("sscQueue",JSON.stringify(queue));localStorage.setItem("sscNow",nowServing);localStorage.setItem("sscSettings",JSON.stringify(settings));}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
function statusBadge(s){let c=s==="Pending"?"pending":s==="Under Review"?"review":s==="Completed"?"completed":"returned";return `<span class="badge ${c}">${s}</span>`}
function serviceShort(s){return s.replace("Submitting ","").replace("Organization Papers","Papers")}
function renderStats(){
 $("#totalStat").textContent=requests.length;
 $("#pendingStat").textContent=requests.filter(r=>r.status==="Pending").length;
 $("#reviewStat").textContent=requests.filter(r=>r.status==="Under Review").length;
 $("#completedStat").textContent=requests.filter(r=>r.status==="Completed").length;
}
function renderDashboard(filter=""){
 const rows=requests.filter(r=>(r.id+" "+r.student+" "+r.service).toLowerCase().includes(filter.toLowerCase())).slice(0,10);
 $("#recentTable").innerHTML=rows.map(r=>`<tr><td><b>${r.id}</b></td><td>${r.student}</td><td>${serviceShort(r.service)}</td><td>${r.date}</td><td class="priority-${r.priority.toLowerCase()}">${r.priority}</td><td>${statusBadge(r.status)}</td><td><button class="action-btn" onclick="cycleStatus('${r.id}')">Update</button></td></tr>`).join("") || `<tr><td colspan="7">No requests found.</td></tr>`;
}
function tableRows(type,filter=""){
 let service=type==="print"?"Print Organization Papers":type==="borrow"?"Borrow":type==="concern"?"SSC Concern":"Submitting Excuse Letter";
 let rows=requests.filter(r=>r.service===service);
 rows=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(filter.toLowerCase()));
 if(type==="print") $("#printTable").innerHTML=rows.map(r=>`<tr><td><b>${r.id}</b></td><td>${r.student}</td><td>${r.organization||"—"}</td><td>${r.copies||"—"}</td><td>${r.paper||"—"}</td><td>${statusBadge(r.status)}</td><td><button class="action-btn" onclick="cycleStatus('${r.id}')">Update</button></td></tr>`).join("")||empty(7);
 if(type==="borrow") $("#borrowTable").innerHTML=rows.map(r=>`<tr><td><b>${r.id}</b></td><td>${r.student}</td><td>${r.item||"—"}</td><td>${r.borrowDate||"—"}</td><td>${r.returnDate||"—"}</td><td>${statusBadge(r.status)}</td><td><button class="action-btn" onclick="cycleStatus('${r.id}')">Update</button></td></tr>`).join("")||empty(7);
 if(type==="concern") $("#concernTable").innerHTML=rows.map(r=>`<tr><td><b>${r.id}</b></td><td>${r.student}</td><td>${r.category||"—"}</td><td>${r.details||"—"}</td><td class="priority-${r.priority.toLowerCase()}">${r.priority}</td><td>${statusBadge(r.status)}</td><td><button class="action-btn" onclick="cycleStatus('${r.id}')">Update</button></td></tr>`).join("")||empty(7);
 if(type==="excuse") $("#excuseTable").innerHTML=rows.map(r=>`<tr><td><b>${r.id}</b></td><td>${r.student}</td><td>${r.absence||"—"}</td><td>${r.details||"—"}</td><td>${r.attachment||"None"}</td><td>${statusBadge(r.status)}</td><td><button class="action-btn" onclick="cycleStatus('${r.id}')">Update</button></td></tr>`).join("")||empty(7);
}
function empty(n){return `<tr><td colspan="${n}">No requests found.</td></tr>`}
function renderQueue(){
 $("#nowServing").textContent=nowServing||"—";$("#queueNow").textContent=nowServing||"—";
 const next=queue[0]||"—";$("#nextQueue").textContent=next;$("#queueNext").textContent=next;$("#queueCount").textContent=`${queue.length} waiting`;
 $("#waitingList").innerHTML=queue.map((id,i)=>`<div class="waiting-item"><span><b>${i+1}.</b> ${id}</span><span class="badge neutral">Waiting</span></div>`).join("")||"<p style='color:#8793a5'>No students are waiting.</p>";
}
function renderReports(){
 const counts={print:requests.filter(r=>r.service==="Print Organization Papers").length,borrow:requests.filter(r=>r.service==="Borrow").length,concern:requests.filter(r=>r.service==="SSC Concern").length,excuse:requests.filter(r=>r.service==="Submitting Excuse Letter").length};
 $("#reportPrint").textContent=counts.print;$("#reportBorrow").textContent=counts.borrow;$("#reportConcern").textContent=counts.concern;$("#reportExcuse").textContent=counts.excuse;
 const max=Math.max(1,...Object.values(counts));$("#barChart").innerHTML=Object.entries(counts).map(([k,v])=>`<div class="bar-row"><span>${k[0].toUpperCase()+k.slice(1)}</span><div class="bar"><i style="width:${v/max*100}%"></i></div><b>${v}</b></div>`).join("");
}
function renderAll(){renderStats();renderDashboard($("#dashboardSearch")?.value||"");["print","borrow","concern","excuse"].forEach(t=>tableRows(t));renderQueue();renderReports()}
function cycleStatus(id){const r=requests.find(x=>x.id===id);if(!r)return;r.status=r.status==="Pending"?"Under Review":r.status==="Under Review"?"Completed":"Pending";save();renderAll();toast(`${id} updated to ${r.status}`)}
function openForm(service){
 $("#formService").value=service;$("#modalTitle").textContent=service;
 ["orgField","itemField","copiesField","paperField","borrowDateField","returnDateField","categoryField","absenceField","attachmentField"].forEach(id=>$("#"+id).classList.add("hidden"));
 if(service==="Print Organization Papers")["orgField","copiesField","paperField"].forEach(id=>$("#"+id).classList.remove("hidden"));
 if(service==="Borrow")["itemField","borrowDateField","returnDateField"].forEach(id=>$("#"+id).classList.remove("hidden"));
 if(service==="SSC Concern")$("#categoryField").classList.remove("hidden");
 if(service==="Submitting Excuse Letter")["absenceField","attachmentField"].forEach(id=>$("#"+id).classList.remove("hidden"));
 $("#modalBackdrop").classList.add("show");
}
function closeForm(){$("#modalBackdrop").classList.remove("show");$("#requestForm").reset()}
function submitForm(e){
 e.preventDefault();const service=$("#formService").value;const n=requests.length+43;const r={id:`SSC-${String(n).padStart(4,"0")}`,student:$("#student").value,studentId:$("#studentId").value,service,date:new Date().toISOString().slice(0,10),priority:$("#priority").value,status:"Pending",details:$("#details").value};
 if(service==="Print Organization Papers")Object.assign(r,{organization:$("#organization").value,copies:$("#copies").value,paper:$("#paper").value});
 if(service==="Borrow")Object.assign(r,{item:$("#item").value,borrowDate:$("#borrowDate").value,returnDate:$("#returnDate").value});
 if(service==="SSC Concern")r.category=$("#category").value;
 if(service==="Submitting Excuse Letter"){r.absence=$("#absenceDate").value;r.attachment=$("#attachment").files[0]?.name||"None"}
 requests.unshift(r);queue.push(r.id);save();closeForm();renderAll();toast(`Request ${r.id} submitted successfully`);showPage("dashboard");
}
function showPage(page){
 $$(".page").forEach(p=>p.classList.remove("active"));$("#page-"+page).classList.add("active");
 $$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===page));
 const names={dashboard:"Dashboard",print:"Print Requests",borrow:"Borrow Requests",concerns:"SSC Concerns",excuse:"Excuse Letters",queue:"Priority Queue",reports:"Reports",settings:"Settings"};
 $("#pageTitle").textContent=names[page]||"Dashboard";window.scrollTo({top:0,behavior:"smooth"});
}
$$(".nav-item[data-page]").forEach(b=>b.addEventListener("click",()=>{showPage(b.dataset.page);$("#sidebar").classList.remove("open")}));
$$("[data-page-link]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.pageLink)));
$$("[data-open-form]").forEach(b=>b.addEventListener("click",()=>openForm(b.dataset.openForm)));
$("#newRequestBtn").onclick=()=>openForm("SSC Concern");$("#closeModal").onclick=closeForm;$("#cancelModal").onclick=closeForm;$("#requestForm").onsubmit=submitForm;
$("#dashboardSearch").oninput=e=>renderDashboard(e.target.value);
$$("[data-filter]").forEach(i=>i.oninput=e=>tableRows(i.dataset.filter,e.target.value));
$("#callNextBtn").onclick=$("#queueCallBtn").onclick=()=>{if(!queue.length){toast("No one is waiting.");return}nowServing=queue.shift();save();renderQueue();toast(`Now serving ${nowServing}`)};
$("#resetQueueBtn").onclick=$("#queueResetBtn").onclick=()=>{nowServing="";queue=[];save();renderQueue();toast("Queue reset.")};
$("#queueAddBtn").onclick=()=>openForm("SSC Concern");
$("#refreshBtn").onclick=()=>{renderAll();toast("Dashboard refreshed.")};
$("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");
$("#exportBtn").onclick=()=>{const head=["Reference","Student","Service","Date","Priority","Status","Details"];const csv=[head,...requests.map(r=>[r.id,r.student,r.service,r.date,r.priority,r.status,r.details])].map(x=>x.map(v=>`"${String(v||"").replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="ssc-priority-line-report.csv";a.click();toast("CSV report exported.")};
$("#saveSettings").onclick=()=>{settings={office:$("#officeName").value,prefix:$("#queuePrefix").value};save();toast("Settings saved.")};
$("#logoutBtn").onclick=()=>toast("Demo logout: connect this button to your authentication system.");
renderAll();
