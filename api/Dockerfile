FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app

COPY ./WebApi/ ./financr-api/
WORKDIR /app/financr-api
RUN ls
RUN dotnet restore
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
WORKDIR /app
COPY --from=build /app/financr-api/out ./
ENTRYPOINT ["dotnet", "WebApi.dll"]