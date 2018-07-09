# What is it
Webpack plugin to track time spent working on a project and individual files.


### Todo
 - **Reporting**
 - Username strategy can be a promise = implement smart username strategy runner
 - Username strategy can be automatically detected
   - make sure that username won't change during development though
   - implement mergeusernames in config to report multiple users as a single user
 - detect file changes by git checkout (and similar) to prevent tracking polution
 - dependency injected Reader and Writer to the main plugin, so other implementations (like MongoWriter) can be used 
   - Reader is only model for Reporter
