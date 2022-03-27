#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["TicketMicroservice/TicketMicroservice.csproj", "TicketMicroservice/"]
COPY ["TicketMicroservice.ApliccationServices/TicketMicroservice.ApliccationServices.csproj", "TicketMicroservice.ApliccationServices/"]
COPY ["TicketMicroservice.Core/TicketMicroservice.Core.csproj", "TicketMicroservice.Core/"]
COPY ["TicketMicroservice.DataAccess/TicketMicroservice.DataAccess.csproj", "TicketMicroservice.DataAccess/"]
RUN dotnet restore "TicketMicroservice/TicketMicroservice.csproj"
COPY . .
WORKDIR "/src/TicketMicroservice"
RUN dotnet build "TicketMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TicketMicroservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TicketMicroservice.dll"]
