@echo off
echo Copying entities to backend...

if not exist "backend\src\main\java\com\example\thangcachep\movie_project_be\entities" mkdir "backend\src\main\java\com\example\thangcachep\movie_project_be\entities"

copy /Y "database\entities\BaseEntity.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\RoleEntity.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\UserEntity.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\CategoryEntity.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Movie*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Episode*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Comment*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Rating*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Favorite*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Watchlist*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\WatchHistory*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Transaction*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Notification*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"
copy /Y "database\entities\Report*.java" "backend\src\main\java\com\example\thangcachep\movie_project_be\entities\"

echo Entities copied successfully!
pause


