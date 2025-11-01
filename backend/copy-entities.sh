#!/bin/bash

echo "Copying entities to backend..."

mkdir -p backend/src/main/java/com/example/thangcachep/movie_project_be/entities

cp database/entities/BaseEntity.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/RoleEntity.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/UserEntity.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/CategoryEntity.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Movie*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Episode*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Comment*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Rating*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Favorite*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Watchlist*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/WatchHistory*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Transaction*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Notification*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/
cp database/entities/Report*.java backend/src/main/java/com/example/thangcachep/movie_project_be/entities/

echo "Entities copied successfully!"


