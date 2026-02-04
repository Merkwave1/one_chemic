# See https://aka.ms/customizecontainer to learn how to customize your debug container

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Onechemic.API/Onechemic.API.csproj", "Onechemic.API/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
RUN dotnet restore "./Onechemic.API/Onechemic.API.csproj"
COPY . .
WORKDIR "/src/Onechemic.API"
RUN dotnet build "./Onechemic.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Onechemic.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create directory for uploaded files
RUN mkdir -p /app/wwwroot/products

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Onechemic.API.dll"]