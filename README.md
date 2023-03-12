# Employee Tracker

## Description


I was wanting to create a user friendly database that could be run via the command line to be able to view what job titles are available as well as what departments there are.  I was also wanting be able to add new employees and be able to assign them to a job title within a respective department.  It solved the ability to be able to view all the departments as well as each employee and each job title that are currently available.  I was also wanting to be able to new jobs and departments  that would be added in the future to accommodate a growing company.  While working on this projects I learned more about using with statements as well as a process in which to use a command line interface to interact with a sequel database.


## Installation

To be able to utilize this project you need to first clone the repository, then do “npm I” to install the necessary modules.  Next to seed the initial database first you need to open in an integrated terminal within the db folder and on the command line type in mysql -u root -p to open the root users shell and enter your users password.  Next excuse a couple of files.  First you will type “source schema.sql”, quotes are not to be put in just the source schema.sql, to make sure the databases is created fresh.  Then we will type in “source seeds.sql to seethe database.  After words quit the database portion by typing in “quit”.  From here you can run the rest in the command line with Node.js by typing “node index.js to start the application.

## Usage

The following is a link to a video demonstrating the application and its capabilities.

https://drive.google.com/file/d/1xtsl1ZC8V614vmlsbtHGkJ3-c26qsqMw/view

The following are some screenshots during various points of interaction within the application.

![Screenshot of startup](./Assets/Screenshot%201.png)

![Screenshot viewing departments and roles](./Assets/Screenshot%202.png)

![Screenshot of adding a new role](./Assets/Screenshot%203.png)

