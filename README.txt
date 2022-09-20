

HIT mapping using Qgis, Angular and C#.
  1. install visual studio 2019
  2. To use the web application clone the repository to local folder 
  3. Change path in backend ("ValuesController cs file lines 24,25") to the local repository


How does it works 
  1. After web application starts it will try to read the database.json file(the database export from Qgis)
  2. If file not found it will copy "scene.js" file to database.json and reload the website
  3. Then you selecting building -> room type you looking for -> room number and click search
  4. It will remove building "cover" and show the selected room with information popup
  

