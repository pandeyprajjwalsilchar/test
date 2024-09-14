---------------------KANBAN dashboard---------------------

Project Overview: Kanban Web Page with React
	We need to build a Kanban board application using ReactJS and pure CSS. The application should fetch data from the provided API and display it in an interactive and visually appealing Kanban layout. The user should be able to organize tasks based on different criteria (Status, User, Priority) and sort them by Priority and Title. The following features and functionalities are required:

Key Features:
1. Fetch Data from API:

	We'll be using this API: Frontend Assignment API. The data fetched will include tickets with information like title, status, user, priority, etc.

2. Display Options:
	A button called "Display" will allow users to toggle between two grouping options:
	a) Grouping:
		By Status: Display tickets grouped by their current status (e.g., To-Do, In-Progress, Done).
		By User: Group tickets based on the assigned user.
		By Priority: Organize tickets by their priority levels (Urgent, High, Medium, Low, No Priority).
	b) Sorting:
		By Priority: Sort tickets by their priority levels
		By Title: Sort tickets by their title levels


3. Responsive Design:
	The layout should adapt to different screen sizes for better user experience.

4. State Persistence:
	When a user reloads the page, the last selected display state should persist. We can achieve this by storing the selected state in local Storage.

5. UI Components:
	a) Kanban Board:
		It should dynamically change based on the selected Display option (Group by, Sort by).
	b) Kanban Card:
		We'll create cards for each task with the following structure:
		Title
		Assigned User
		Priority Level
		Status

Priority Levels:
	Each card will have a priority level with the following values:
		Urgent (Priority 4)
		High (Priority 3)
		Medium (Priority 2)
		Low (Priority 1)
		No Priority (Priority 0)
Status Levels:
	Each card will have a status level with the following values:
		Done
		In Progress
		To Do 
		Backlog
		Cancelled

Here are some demo:
Group by priority-

![k1](https://github.com/user-attachments/assets/27bddbd4-eb20-4843-a5b6-f5e65c1ede84)


Group by user and Sort by priority-

![k2](https://github.com/user-attachments/assets/e05ceca3-c72c-43e1-82b1-56e72171eeda)


Group by user and Sort by title-

![k3](https://github.com/user-attachments/assets/3be00cc2-4804-454e-ab04-b086375042d8)


