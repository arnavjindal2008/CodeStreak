let solvedSet = new Set();
let attemptedSet = new Set();
let submissionsList = [];
const btn = document.getElementById("saveHandle");

document.addEventListener("DOMContentLoaded", () => {
    const savedHandle = localStorage.getItem("cf_handle");

    if (savedHandle) {
        loadSubmissions(savedHandle);
        loadUserData(savedHandle);
        loadProblems();
    }
});

btn.addEventListener("click", () => {
    const handle = document.getElementById("handleInput").value;
    if(handle === ""){
        document.getElementById("errorhandle").innerText = "User Handle Name not Entered";
        return;
    }
    document.getElementById("errorhandle").innerText = ""
    localStorage.setItem("cf_handle", handle);
    loadUserData(handle);
    loadSubmissions(handle);
    loadProblems();
});

async function loadUserData(handle){
    try {
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await res.json();
        const user = data.result[0];
        document.getElementById("stats").innerHTML = `
            <h3>Username: ${localStorage.getItem("cf_handle")}
            <h3>Name: ${user.firstName || ""} ${user.lastName || ""}</h3>
            <h3>Rating: ${user.rating || "Unrated"} , Max Rating: ${user.maxRating || "Unrated"}</h3>
        `;
    }
    catch(err) {
        document.getElementById("stats").innerHTML = "<p style='color:red;'>Error Occurred Please Retry !!</p>";
    }
}

async function loadSubmissions(handle){
    try {
        const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const data = await res.json();
        const submissions = data.result;
        submissions.forEach((sub) => {
            const key = sub.problem.contestId + "-" + sub.problem.index;
            if(sub.verdict === "OK"){
                solvedSet.add(key);
            }else{
                if(!solvedSet.has(key)){
                    attemptedSet.add(key);
                }
            }
        });
        document.getElementById("details").innerHTML = `
        <h3>Solved: ${solvedSet.size}</h3>
        <h3>Pending: ${attemptedSet.size}</h3>
        `;
        submissionsList = submissions;
    }
    catch(err) {
        document.getElementById("stats").innerHTML = "<p style='color:red;'>Error Occurred Please Retry !!</p>";
    }
}

let allProblems = [];
let currentPage = 1;
const perPage = 51;
let filteredSubs = [];
let list = [];

async function loadProblems(){
    try {
        const res = await fetch("https://codeforces.com/api/problemset.problems");
        const data = await res.json();
        allProblems = data.result.problems;
        renderProblems();
    }
    catch(err) {
        document.getElementById("stats").innerHTML = "<p style='color:red;'>Error Occurred Please Retry !!</p>";
    }
}
async function renderProblems(){
    try {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        list = filteredSubs.length > 0 ? filteredSubs : submissionsList;
        const pageSubs = list.slice(start, end);
        const questions = pageSubs.map((sub) => {
            const problem = sub.problem;
            const key = problem.contestId + "-" + problem.index;
            let statusClass = "";
            if(sub.verdict === "OK"){
                statusClass = "solved";
            }
            else{
                statusClass = "attempted";
            }
            return `
            <a href="https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}" target="_blank"
                <div class="problem ${statusClass}">
                    <b>${problem.name}</b>
                    <p>Contest: ${key}</p>
                    <p>Rating: ${sub.problem.rating || 0}</p>
                    <p>Verdict: ${sub.verdict}</p>
                </div>
            </a>
            `;
        }).join("");
        document.getElementById("problemsContainer").innerHTML = questions;
        renderPagination();
    }
    catch(err) {
        document.getElementById("stats").innerHTML = "<p style='color:red;'>Error Occurred Please Retry !!</p>";
    }
}

async function renderPagination(){
    try {
        const totalPages = Math.ceil(list.length / perPage);
        const navigation = `
            <button class="page-btn" onclick="prevPage()">Prev</button>
            <span>Page ${currentPage} / ${totalPages}</span>
            <button class="page-btn" onclick="nextPage()">Next</button>
        `;
        document.getElementById("pagination").innerHTML = navigation;
    }
    catch(err) {
        document.getElementById("stats").innerHTML = "<p style='color:red;'>Error Occurred Please Retry !!</p>";
    }
}

function nextPage(){
    const totalPages = Math.ceil(list.length / perPage);
    if(currentPage < totalPages){
        currentPage++;
        renderProblems();
    }
}
function prevPage(){
    if(currentPage > 1){
        currentPage--;
        renderProblems();
    }
}

const search = document.getElementById("searchBox");
search.addEventListener("input",() => {
    const value = search.value.toLowerCase();
    filteredSubs = submissionsList.filter((sub) => {
        const name = sub.problem.name.toLowerCase()
        return name.includes(value)
    })
    currentPage = 1;
    renderProblems();
})

const sort = document.getElementById("sortSelect");
sort.addEventListener("change",() => {
    const value = sort.value;
    if (value === "low") {
        list.sort((a,b) => {
            return (a.problem.rating || 0) - (b.problem.rating || 0)
        })
    }
    else if (value === "high"){
        list.sort((a,b) => {
            return (b.problem.rating || 0) - (a.problem.rating || 0)
        })
    }
    else {
        filteredSubs = []
    }
    currentPage = 1;
    renderProblems();
})

const promlemtype = document.getElementById("filterSelect");
promlemtype.addEventListener("change",() => {
    const value = promlemtype.value;
    if (value === "solved") {
    filteredSubs = submissionsList.filter((q) => {
            if (q.verdict === "OK") {
                return true
            }
        })
    }
    else if (value === "attempted") {
        filteredSubs = submissionsList.filter((q) => {
            if (q.verdict === "WRONG_ANSWER") {
                return true
            }
        })
    }
    else {
        filteredSubs = []
    }
    currentPage = 1;
    renderProblems();
})

// logout 
const logoutbtn = document.getElementById("logout")
logoutbtn.addEventListener("click", () => {
    window.location.href = "index.html"
})