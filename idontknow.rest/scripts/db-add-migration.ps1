Param(
  [Parameter(Mandatory=$true)][string]$MigrationName
)
dotnet ef migrations add $MigrationName -p ..\Backend\Idontknow.DAL\Idontknow.DAL.csproj