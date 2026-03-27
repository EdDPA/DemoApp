<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
</head>
<body>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @inertia
</body>
</html>