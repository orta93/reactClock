## ReactClock

## Uso

Descargar el archivo e inscrustarlo
```
<script type="text/javascript" src="reactClock.js"></script>
```

Inserte el elemento con la clase "reactClock"

Asigne data-date, data-time y data-type

data-date debe tener el formato yyyy-mm-dd

date-time debe tener el formato h:i o Vacío

data-type puede ser "d", "h", "m", "s" o "" (Vacío)
```
<div class="reactClock" data-date="{date}" data-time="{time}" data-type="{type}"></div>
```
Al iniciar las dependencias de javascript, ejecutar:

```
$('.reactClock').reactClock();
```

## Dependencias
- jQuery