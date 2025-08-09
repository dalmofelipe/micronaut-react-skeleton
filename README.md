## Skeleton Micronaut React

### Backend

    #bash
    export FRONTEND_URL=http://localhost:5173 && \
        mvn clean mn:run -Dmicronaut.test.resources.enabled=false

    #powershell
    $env:FRONTEND_URL="http://localhost:5173"; mvn clean mn:run -Dmicronaut.test.resources.enabled=false

### Frontend

    npm run dev
