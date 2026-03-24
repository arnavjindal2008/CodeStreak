CodeStreak – Competitive Programming Tracker

CodeStreak is a web-based application designed to help competitive programming students monitor their coding activity and stay updated with upcoming contests. The application allows users to enter their Codeforces or LeetCode username to view useful statistics such as the number of solved problems, difficulty-wise problem distribution, and recent submissions. It also provides information about upcoming programming contests so that users can plan their practice schedule effectively.

The main objective of this project is to understand how to integrate public APIs using JavaScript and dynamically render real-time data on a webpage. The project also focuses on implementing important interactive features such as searching, filtering, and sorting using JavaScript array higher-order functions like filter() and sort().

This application uses the Codeforces Public API to fetch contest details and user submission data. The endpoints used include https://codeforces.com/api/contest.list to retrieve contest information and https://codeforces.com/api/user.status?handle={handle} to access user submissions and problem ratings. Additionally, an unofficial LeetCode Stats API (https://leetcode-stats-api.herokuapp.com/{username}) is used to display solved problem counts and difficulty breakdown.

Planned features include a tab-based interface for switching between Codeforces and LeetCode tracking, contest search functionality, difficulty-based filtering of problems, and rating-wise sorting to support structured practice. Additional features such as dark mode toggle, loading indicators during API calls, and saving contest reminders using LocalStorage will enhance usability.

The project is built using HTML, CSS, and Vanilla JavaScript. To run the project, clone the repository, open the project folder, and launch the index.html file in a web browser.
