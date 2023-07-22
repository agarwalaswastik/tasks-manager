# tasks-manager

This is a web application built using React, Redux, Tailwind CSS, and Vite. It allows users to create task lists, add tasks to those lists, reorder tasks, move tasks between lists, apply filters to tasks, and search tasks by description and filters.

## Deployment

Tasks Manager is deployed and accessible on GitHub Pages. You can access the live version of the app by following this link: [Task Manager App - Live](https://agarwalaswastik.github.io/tasks-manager/)

## Features

- Create Task Lists: Users can create task lists by clicking on the green plus icon on the top right
- Create Task: Users can create a task by clicking the plus icon inside a task list
- Add Task Filter: Users can start typing a filter of their choice in the "filters..." prompt inside a task. Hitting the space bar or enter key adds the filter to the task. **A filter will not be added unless the space bar on enter key is pressed.**
- Edit Descriptions: Users can edit task lists or task descriptions by clicking the edit icon after the editable text. A text box will appear where the new description should be added. The new description will be added once enter key is pressed.
- Rearranging Tasks or Task Lists: Users can simply drag tasks and task lists and rearrange them. It's also possible to move tasks between task lists.
- Search Tasks: Tasks can be searched by filters or/and by description using the search bar on top of the page.
- Filter Suggestions: On any "filters..." prompt in the app, once the user starts typing, filter suggestions will be displayed on the screen using the filters that have been previously used in other areas of the app. The suggestions can be clicked. Hitting the space bar or enter keys will also auto-add the suggestion.
- Persistence: The app implements data persistence using browser local storage so that user data isn't lost after closing the app.

## Dependencies
 - react
 - react-dom
 - react-beautiful-dnd (for implementing the drag & drop functioning)
 - react-icons
 - react-redux
 - @reduxjs/toolkit
 - redux-persist
 - redux-thunk
 - uuid (for generating unique IDs for filters, tasks, and task lists.)
