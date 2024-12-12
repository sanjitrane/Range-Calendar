Dependencies:
React, React-dom

Dev Dependencies:

- Babel: @babel/core @babel/preset-env @babel/preset-react babel-loader
- Webpack: webpack webpack-cli webpack-dev-server
- Typescript: typescript

Run:

- npm install
- npm run start
- http://localhost:3000/

# Usage:

- Calander loads with the current month and year.
- Current date is marked with a gray border
- Clicking on a date marks the start date and the date is displayed with blue bg.
- Clicking again on another date marks as the end date.
- All the dates in-between the start and end dates are highlighted except the weekends (sat and sun).
- The selected date range and weekends info is displayed below the calendar component.

# Calendar Header:

- Today button: To jump to the current date on the calendar.
- Months can be navigated by clicking on the prev and next arrows surrounding the Month name.
- Months quick jump grid is displayed on clicking on the Month name.
- Clicking on any month from the grid will close the grid and the calendar will display the selected month.
- Years can be navigated by clicking on the prev and next arrows surrounding the Year.
- Navigating the year will load the calendar for the selected month of the selected year.
- Last 7 days button: This will auto-select the last 7 days from the current (including current) on the calendar.
- Last 30 days button: This will auto-select the last 30 days from the current (including current) on the calendar.
- If the start date from these selection falls on the previous month then the calendar displays the previous month with the the days highlighted.
