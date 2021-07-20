# Developing for Microsoft Teams
This is the repository for the LinkedIn Learning course Developing for Microsoft Teams. The full course is available from [LinkedIn Learning][lil-course-url].

![Developing for Microsoft Teams][lil-thumbnail-url] 

Microsoft Teams is one of the fastest growing enterprise tools and lets workers collaborate, conduct meetings, share data and information, and use applications, all within Teams. The versatility of Teams means it is also a rich development platform. In this course, software developer Bill Ayers teaches how to build custom tabs and extensions in Teams using open web technologies like Node.js, TypeScript, and React. With more and more users not just using Teams, but also doing more and more within Teams, understanding how to develop for this platform will be increasingly important for any software developer who wants to reach their users where they are.

## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"


### Instructor

Bill Ayers 
  
_Consultant Developer, Solution Architect_

Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/bill-ayers).

[lil-course-url]: https://www.linkedin.com/learning/developing-for-microsoft-teams
[lil-thumbnail-url]: https://cdn.lynda.com/course/2880242/2880242-1624381908353-16x9.jpg
