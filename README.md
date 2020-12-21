# DattingApp

--- Points to remember ----

> dotnet new sln
> dotnet new webapi -o API
> dotnet sln add API


---Extensions needs to be installed in VS code ---
> C#
> C# extensions
> Material Icon Theme
> Nuget Gallery
> Sql lite

-- To run the API ---
> dotnet run

-- nuget Package needs to be installed--
> dotnet-ef

---dotnet Migration EF for .NET core CLI commands ---

Eg: 
> dotnet ef migrations add InitialCreate -o Data/Migrations

 please refer below link
 
 https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli
 
 --- Enable SSL certification in Angular Project---
 
  Create folder with name SSL in angular project
  and copy and paste the following files
  
  server.crt
  server.key
  
  do the following changes in angular.json
  
  "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "sslCert": "./ssl/server.crt",
            "sslKey": "./ssl/server.key",
            "ssl": true,
            "browserTarget": "client:build"
          },
  
  
