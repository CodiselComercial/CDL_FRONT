# Script para arreglar permisos del directorio dist para IIS
# Ejecutar como Administrador

$distPath = Join-Path $PSScriptRoot "dist"

Write-Host "Configurando permisos para: $distPath" -ForegroundColor Green

# Verificar que el directorio existe
if (-not (Test-Path $distPath)) {
    Write-Host "Error: El directorio dist no existe. Ejecuta 'npm run build' primero." -ForegroundColor Red
    exit 1
}

# Obtener el usuario del Application Pool (por defecto IIS_IUSRS)
$iisUsers = "IIS_IUSRS"
$everyone = "Everyone"

try {
    # Obtener ACL actual
    $acl = Get-Acl $distPath
    
    # Agregar permisos para IIS_IUSRS
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule(
        $iisUsers,
        "ReadAndExecute,Read",
        "ContainerInherit,ObjectInherit",
        "None",
        "Allow"
    )
    $acl.SetAccessRule($accessRule)
    
    # Agregar permisos para Everyone (solo lectura)
    $accessRule2 = New-Object System.Security.AccessControl.FileSystemAccessRule(
        $everyone,
        "ReadAndExecute,Read",
        "ContainerInherit,ObjectInherit",
        "None",
        "Allow"
    )
    $acl.SetAccessRule($accessRule2)
    
    # Aplicar los cambios
    Set-Acl $distPath $acl
    
    Write-Host "Permisos configurados correctamente!" -ForegroundColor Green
    Write-Host "Usuario IIS_IUSRS y Everyone ahora tienen permisos de lectura en el directorio dist." -ForegroundColor Yellow
    
} catch {
    Write-Host "Error al configurar permisos: $_" -ForegroundColor Red
    Write-Host "Asegúrate de ejecutar este script como Administrador." -ForegroundColor Yellow
    exit 1
}

