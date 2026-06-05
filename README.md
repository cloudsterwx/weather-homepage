# About This Project
- This is a simple project based on this guide found in Hack Club's Macondo's Docs: https://macondo.hackclub.com/docs/api-homepage
- In addition to such directions, this project adds new logic for time (leading zeroes) as well as more API calls (to weather.gov and catfact.ninja).
- To run the project, open the index.html file in a browser or visit the GitHub Pages deployment.
- This project requires the user's location to run in order to call the weather APIs.
- To update weather information and cat facts, the page must be refreshed.
- Because this project calls the api.weather.gov API, the Weather Alert data only works within the United States. Could potentially add support for other, non-US locations in the future.
- My passion for weather was the impetus that made me want to learn how to call APIs for the purpose of getting real time, up-to-date weather information from APIs like api.weather.gov. This was accomplished through this program: I now know how to call such APIs.

## Screenshot
<img width="1602" height="935" alt="Screenshot 2026-06-04 at 11 14 30 PM" src="https://github.com/user-attachments/assets/07a6e0ca-ffaf-49de-bbab-56e9194cfa56" />

## Calling the NWS APIs
<img width="1010" height="114" alt="Screenshot 2026-06-01 at 3 41 51 PM" src="https://github.com/user-attachments/assets/34cfc1e0-cbf6-4fb2-84e3-81a61fc7a3a3" />
As I was developing the weather alert portion of this project, I realized the glaring issue of the NWS API for alerts at a point not being available.
- Initially I was going to call this /alerts/active/point?lat,lon path, but because it was broken, I had to improvise.
- Instead, the program finds the user's county ID from the location, and uses the /alerts/active/zone?{countyID} path.
- This might not be the most precise for position-level warnings (e.g. Tornado, Severe Thunderstorm Warnings), but it was my best option in development.
