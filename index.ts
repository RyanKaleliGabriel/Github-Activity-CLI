#!/usr/bin/env node
// Makes the script executable in Unix based systems.

// Use Node js https module to make a request to the github web server
import * as https from "https";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function fetchUserActivity(username: string, eventType: string) { 
  // Configure the HTTPS request options:
  const options = {
    hostname: "api.github.com",
    path: `/users/${username}/events`,
    method: "GET",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
      "User-Agent": "github-activity-cli",
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  };

  // Make the request to get the user's recent events, such as public pushes, forks, and pull requests.
  const req = https.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    // Parse the JSON response data, typically a list of event objects, and check the HTTP status code.
    res.on("end", () => {
      const events = JSON.parse(data);
      // If the status code is 200 (OK), proceed to dishplay the events, log anu errors that occur.
      if (res.statusCode === 200) {
        if (events.length === 0) {
          console.log(`No recent activity found for user: ${username}`);
          return;
        }
        console.log(`Recent Github activities for ${username}`);
        let finalEvents = eventType
          ? events.filter((event: any) => event.type === eventType)
          : events;

        finalEvents.forEach((event: any, index: number) => {
          const { type, created_at } = event;
          const repoName = event.repo.name;

          console.log(`${index + 1}. ${type} in ${repoName} at ${created_at}`);
        });
      } else {
        console.error(`Error fetching activities: ${events.message}`);
      }
    });
  });

  req.on("error", (error) => {
    console.error(`Request error ${error.message}`);
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
const username = process.argv[2];
const eventType = process.argv[3];

if (!username) {
  console.log("Please provide a Github username.");
  process.exit(1);
}

fetchUserActivity(username, eventType);
