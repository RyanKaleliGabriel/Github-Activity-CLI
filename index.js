#!/usr/bin/env node
"use strict";
// Makes the script executable in Unix based systems.
Object.defineProperty(exports, "__esModule", { value: true });
// Use Node js https module to make a request to the github web server
var https = require("https");
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
function fetchUserActivity(username, eventType) {
    // Configure the HTTPS request options:
    var options = {
        hostname: "api.github.com",
        path: "/users/".concat(username, "/events"),
        method: "GET",
        headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            Accept: "application/vnd.github+json",
            "User-Agent": "github-activity-cli",
            Authorization: "token ".concat(GITHUB_TOKEN),
        },
    };
    // Make the request to get the user's recent events, such as public pushes, forks, and pull requests.
    var req = https.request(options, function (res) {
        var data = "";
        res.on("data", function (chunk) {
            data += chunk;
        });
        // Parse the JSON response data, typically a list of event objects, and check the HTTP status code.
        res.on("end", function () {
            var events = JSON.parse(data);
            // If the status code is 200 (OK), proceed to dishplay the events, log anu errors that occur.
            if (res.statusCode === 200) {
                if (events.length === 0) {
                    console.log("No recent activity found for user: ".concat(username));
                    return;
                }
                console.log("Recent Github activities for ".concat(username));
                var finalEvents = eventType
                    ? events.filter(function (event) { return event.type === eventType; })
                    : events;
                finalEvents.forEach(function (event, index) {
                    var type = event.type, created_at = event.created_at;
                    var repoName = event.repo.name;
                    console.log("".concat(index + 1, ". ").concat(type, " in ").concat(repoName, " at ").concat(created_at));
                });
            }
            else {
                console.error("Error fetching activities: ".concat(events.message));
            }
        });
    });
    req.on("error", function (error) {
        console.error("Request error ".concat(error.message));
    });
    req.end();
}
// The process.argv proptertyreturns an array containing the command-line arguements passed when
// Node.js process was launched.
// The first element will be process.execPath which returns the absolute pathname of the executable that
// started the Nodejs process
// The second element will be the path to the JavaScript file being executed.
// The remaining elements will be any additional command-line arguments.
// Get the username from the command line arguement
var username = process.argv[2];
var eventType = process.argv[3];
if (!username) {
    console.log("Please provide a Github username.");
    process.exit(1);
}
fetchUserActivity(username, eventType);
