types of changes made:

1. setup
2. fixed errors found in browser
3. Address the squiggles from Intellisense
4. Fix weird code patterns I recognize 
5. Add features I think should be a part of the product


Things I wanted to get to but did not:
1. All advocate values would not be sent to the client but instead this service would ping an database with a users search query and then return the results. Queries could be cached for site performance depending on how often advocates are added to the network. Depending on the experience the queries can be on keystroke or onEnter depending on the userexperience you want to deliver and what the servers can take. 
3. Using tailwind at all. I've never used it and would need more time to play with it to apply it thoughfully so i just used plain html and css. Definitely willing to learn Tailwind though. Would rather not apply it badly under this time constaint.
4. Turning the table into a component.
5. Making the page more ✨beautiful✨.
6. Make it workable on mobile and tablet. For the interest of time I focused on desktop.


Site considerations if this project were production:
1. User eventing for data collection which can aid in product development/performance
2. Product performance analytics
3. Tests to make sure we aren't breaking anything with each merge.