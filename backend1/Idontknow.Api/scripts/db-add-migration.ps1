Param(
  [Parameter(Mandatory=$true)][string]$MigrationName
)
dotnet ef migrations add $MigrationName -p ..\Idontknow.DAL\Idontknow.DAL.csproj