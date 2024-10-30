# GitHub User Activity Command Line Interface

> This is a command line interface(CLI) to fetch the recent activity of a GitHub user and display it in the terminal.

## Table of Contents

- [Take Aways](#take-aways)
- [Requirements](#requirements)
- [Additionals](#additionals)
- [Stack](#stack)
- [Usage](#usage)
  - [Installation](#installation)
  - [Example Commands](#example-commands)
  - [Using Docker](#using-docker)
  - [Expected Output](#expected-output)
- [Error Handling](#error-handling)
- [Project URL](#project-url)

## Take Aways

- Working with extrernal APIs.

- Handling JSON data.

- Building a CLI interface.

- Graceful error handling

- No external libraries or frameworks to fetch the Github activity.

## Requirements

The application runs in the command line, accepts the Github username as arguement and an optional arguement that filters the activities by the event type.

Activities are fetched using the Github API and displayed in the terminal

## Additionals

- Filtering by event type

- Displaying activities in a structured way

## Stack

- Node Js
- Docker

## Usage

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/github-activity-cli.git
   cd github-activity-cli
   ```

2. Set Environment Variables: The github API requires authentication for certain request. To avoid rate limits, you can use a personal Github access token. Create a .env file and add the your access token.

   ```bash
   GITHUB_TOKEN=<your_github_token>
   ```

3. Running the CLI: Compile the typecript file (index.ts) then call it with the required arguements.

    ```bash
    tsc index.ts
    node --env-file=.env index.js <username> [event-type]
    ```
    - [username] (required): The GitHub username whose recent activity you want to fetch.
    - [event-type] (optional): Filter by the type of event (e.g., PushEvent, ForkEvent, etc.).

### Example Commands

1. Basic Fetch (No Event Filter): To fetch all recent activities for a user

   ```bash
    node --env-file=.env index.js ryankaleligabriel
   ```

2. Fetch and Filter by Event Type: To fetch only PushEvent activities

   ```bash
    node --env-file=.env index.js ryankaleligabriel PushEvent
   ```

### Using Docker
1. Pull the image from docker hub

   ```
   docker pull ryankaleligabriel/github-activity-cli
   ```

2. Build the image

   ```
   docker build -t ryankaleligabriel/github-acitvity-cli .
   ```

3. Run the image

   ```
   docker run --name <your_container_name> -d -p 3000 -e GITHUB_TOKEN=<your_github_access_token> ryankaleligabriel/github-activity-cli <your_github_username> <event_type>(optional)
   ```

4. Check for your output

   ```
   docker logs <your_container_name>
   ```


### Expected Output

```bash
Recent Github activities for ryankaleligabriel
1. PublicEvent in RyanKaleliGabriel/Bookify at 2024-10-28T17:30:56Z
2. PushEvent in RyanKaleliGabriel/Bookify at 2024-10-28T16:49:22Z
```

## Error Handling

If there are issues such as invalid username, rate limit issues, or network problems, the CLI will display appropriate error messages.

## Project URL
https://roadmap.sh/projects/github-user-activity