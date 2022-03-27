#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["JourneyMicroservice/JourneyMicroservice.csproj", "JourneyMicroservice/"]
COPY ["JourneyMicroservice.ApplicationService/JourneyMicroservice.ApplicationService.csproj", "JourneyMicroservice.ApplicationService/"]
COPY ["JourneyMicroservice.Core/JourneyMicroservice.Core.csproj", "JourneyMicroservice.Core/"]
COPY ["JourneyMicroservice.DataAccess/JourneyMicroservice.DataAccess.csproj", "JourneyMicroservice.DataAccess/"]
RUN dotnet restore "JourneyMicroservice/JourneyMicroservice.csproj"
COPY . .
WORKDIR "/src/JourneyMicroservice"
RUN dotnet build "JourneyMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JourneyMicroservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JourneyMicroservice.dll"]