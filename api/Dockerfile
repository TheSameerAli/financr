FROM mcr.microsoft.com/dotnet/sdk:5.0-buster AS build
WORKDIR /app

COPY ./WebApi/ ./financr-api/
WORKDIR /app/financr-api
RUN ls
RUN dotnet restore
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS runtime
WORKDIR /app
COPY --from=build /app/financr-api/out ./
ENTRYPOINT ["dotnet", "WebApi.dll"]
