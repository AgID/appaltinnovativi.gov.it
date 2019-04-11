<#
.SYNOPSIS
    Builda e deploya sul container registry selezionato
.DESCRIPTION
    Utilizzando il Dockerfile builda il servizioe lo pusha sul container registry
.NOTES
    File Name  : build.ps1
    Author     : Simone Natalini
    Appears in -full
.LINK
    http://almaviva.it
.EXAMPLE
    .\build.ps1 -azurehost xxx.azurecr.io -username xxx -passwrd xxx
    .\acrBuildDeploy.ps1 -azurehost cdcreg.azurecr.io -user cdcreg -passwrd TO1za8p3Xx4+xXUd=Ch4AMZqAAocVc/h
.INPUTTYPE
   azurehost:
   Input type  [System.String]
   username:
   Input type  [System.String]
   passwrd:
   Input type  [System.String]
#>

param(
    [string]$azurehost = $(Read-Host "Inserisci l'url del container registry di azure"),
    [string]$user = $(Read-Host "Inserisci il nome utente del container registry"),
    [string]$passwrd = $(Read-Host "Inserisci la password del container registry")
)

docker login $azurehost -u $user -p $passwrd
$id = docker build . -q
docker tag $id $azurehost/sgi-bo-dk-standardtipo:latest
docker push $azurehost/sgi-bo-dk-standardtipo:latest