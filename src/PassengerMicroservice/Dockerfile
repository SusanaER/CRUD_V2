#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["PassengerMicroservice/PassengerMicroservice.csproj", "PassengerMicroservice/"]
COPY ["PassengerMicroservice.ApplicationServices/PassengerMicroservice.ApplicationServices.csproj", "PassengerMicroservice.ApplicationServices/"]
COPY ["PassengerMicroservice.DataAccess/PassengerMicroservice.DataAccess.csproj", "PassengerMicroservice.DataAccess/"]
COPY ["PassengerMicroservice.Core/PassengerMicroservice.Core.csproj", "PassengerMicroservice.Core/"]
RUN dotnet restore "PassengerMicroservice/PassengerMicroservice.csproj"
COPY . .
WORKDIR "/src/PassengerMicroservice"
RUN dotnet build "PassengerMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PassengerMicroservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PassengerMicroservice.dll"]