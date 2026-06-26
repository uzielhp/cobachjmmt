#!/bin/bash

# Configuración de rutas
CARPETA_IMGS="imgs/galeria"
ARCHIVO_OUTPUT="galeria.json"

# Verificar si la carpeta existe
if [ ! -d "$CARPETA_IMGS" ]; then
    echo "Error: La carpeta $CARPETA_IMGS no existe."
    exit 1
fi

echo "Procesando imágenes en $CARPETA_IMGS..."

# Iniciar el formato JSON de un array ejecutable
echo "[" > "$ARCHIVO_OUTPUT"

# Buscar extensiones (ignora mayúsculas/minúsculas gracias a shopt)
shopt -s nocaseglob
PRIMERA=true

# Almacenar los archivos encontrados en un array y ordenarlos de forma natural con 'sort -V'
# Usamos 'printf %s\n' para pasar la lista a sort de manera segura
archivos_ordenados=$(printf "%s\n" "$CARPETA_IMGS"/*.{jpg,jpeg,png,webp} | sort -V)

shopt -u nocaseglob # Restaurar configuración de la terminal inmediatamente

# Leer los archivos ya ordenados línea por línea
while IFS= read -r archivo; do
    # Validar si el archivo realmente existe (por si la carpeta está vacía o el glob falló)
    [ -e "$archivo" ] || continue
    
    # Si no es la primera línea, añade una coma para separar los elementos del JSON
    if [ "$PRIMERA" = true ]; then
        PRIMERA=false
    else
        echo "," >> "$ARCHIVO_OUTPUT"
    fi
    
    # Imprimir la ruta entre comillas con indentación limpia
    echo -n "  \"$archivo\"" >> "$ARCHIVO_OUTPUT"
done <<< "$archivos_ordenados"

# Cerrar el array JSON
echo "" >> "$ARCHIVO_OUTPUT"
echo "]" >> "$ARCHIVO_OUTPUT"

echo "¡Éxito! Archivo $ARCHIVO_OUTPUT generado correctamente con orden numérico natural."