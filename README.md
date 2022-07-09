<h4 align="center">
 <b><a href="">Linko<a></b> 
</h4>
<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-red">
</p>

<br>

### 👨‍💻 Used Technologies

The following project was made with

- [.NET](https://dotnet.microsoft.com/en-us/)
- [EntityFramework](https://docs.microsoft.com/en-us/ef/)
- [Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-6.0)
- [Angular](https://angular.io/)
- [NGX-Bootstrap](https://valor-software.com/ngx-bootstrap/#/)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Cloudynary](https://cloudinary.com/)
- [Typescript](https://www.typescriptlang.org/)
- [SignalR](https://dotnet.microsoft.com/en-us/apps/aspnet/signalr)
- [Postgres](https://www.postgresql.org/)
- [JSON Web Token](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Postman](https://insomnia.rest/)
- [Cors](https://www.npmjs.com/package/cors)
- [Eslint](https://www.npmjs.com/package/eslint)

### :muscle: Project
HCL's Power Object .net team Project
The project is a Matching App focused on career and professional relationships.

Consists of .NET in the back end and Angular for the front end. The architecture style is based on many
design patterns, like the use of repositories for data access, role management, centralized error handlleing, and the use of websockets.

The app main features are user Registration and Login, member Sorting and Filtration allowing other users to customize their preferences,
Photos uploading through a thrid party service, and instant messaging so users can communicate when they feel 
like they can collaborate on a project or if someone could be a good fit for a position.

Extras: GitHub actions, CI/CD pipeline and Azure deployment.

### 🙋🏽‍♂️ Author's considerations

### 🖼️ ScreenShots:

---
### :rocket: Submit Your Changes:
- Fork this repository;
- Clone it into your machine;
- Create a branch with your feature: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'Change button color to blue'`
- Push your branch: `git push origin my-feature`
   
---
### ⚒️ Running Locally
   
<b>SSL Certificate</b>
- Create a folder called 'ssl' in the client folder
- Download and install the certificate from: https://github.com/yamgarcia/SSL-Cert ;
- Copy both the server.crt and server.key to your new 'ssl' folder and check angular.json
   projects > architect > serve > options > 
      "sslKey": "./ssl/server.key",
      "sslCert": "./ssl/server.crt",
      "ssl"::true
   
 <b>Dependencies</b>
 - Run npm install in the client folder;
 - Check API.csproj to match your .NET version and TargetFramework (check 'dotnet --version');
   
 <b>Cloudinary</b>
 - Create a file called 'appsettings.json' in the API folder;
 - Use an existent account or create one to get access and then add to the file:
  

```json script
 {
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "CloudinarySettings": {
    "CloudName": "YOUT CLOUD NAME",
    "ApiKey": "YOUR API KEY",
    "ApiSecret": "YOUR API SECRET",
    "secure": true
  },
  "AllowedHosts": "*"
} 

```
   
### :memo: License

This [project](https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch/) is under the MIT License. See the file [LICENSE](LICENSE.md) for more details.

---

<p align="center">Made with love ❤️ by <b><a src="https://github.com/yamgarcia">Marcos Garcia</a></b></p>
