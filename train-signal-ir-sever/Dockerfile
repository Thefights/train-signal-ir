FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5285

ENV ASPNETCORE_URLS=http://+:5285

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["train-signal-ir-sever/train-signal-ir-sever.csproj", "train-signal-ir-sever/"]
RUN dotnet restore "train-signal-ir-sever/train-signal-ir-sever.csproj"
COPY . .
WORKDIR "/src/train-signal-ir-sever"
RUN dotnet build "train-signal-ir-sever.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "train-signal-ir-sever.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "train-signal-ir-sever.dll"]
