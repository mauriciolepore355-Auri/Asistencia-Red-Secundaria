# Plan — AsistenciaRed para Secundarias Básicas y Técnicas (Prov. de Buenos Aires)

Adaptación del registro institucional que hoy usás en escuelas especiales.
Base: tu `index.html` (HTML único + Firebase Realtime Database).

---

## 1. Resumen de los cambios acordados

| # | Cambio | Decisión tomada |
|---|--------|-----------------|
| 1 | Listado de alumnos | **Lista única alfabética** por curso (se elimina Varones / Mujeres / Domiciliarios) |
| 2 | Régimen de asistencia | **Se mantiene P / T / A / AJ** y los % actuales |
| 3 | Unidad de toma | **Por materia / módulo** (no más un registro único por día) |
| 4 | Cómo aparecen las materias | **Se eligen al momento** de tomar asistencia (sin horario fijo) |

Lo demás del sistema (login por institución, roles, feriados argentinos, comunicados,
exportes PDF, nuevo ciclo lectivo) se conserva y se adapta donde haga falta.

---

## 2. Modelo de datos: antes y después

### Antes (escuelas especiales)
```
instituciones/{instId}/
  cursos/{cursoId}/
    nombre, docenteId
    varones: ["Apellido, Nombre", ...]
    mujeres: [...]
    domi:    [...]
    alumnosData/{v0|m0|d0}/  → ficha (dni, estado, fechaAlta, ...)
  asistencia/{cursoId}/{fecha}/
    _tipo: ''|F|P|L|J
    v0: 'P'|'T'|'A'
    just_v0: true
    obs_v0: '...'
    _notas, _registrado
```

### Después (secundaria)
```
instituciones/{instId}/
  cursos/{cursoId}/
    nombre            → ej. "3°A", "6°2da Electromecánica"
    docenteId         (ver punto abierto B)
    materias: ["Matemática","Lengua","Taller de Electricidad", ...]
    alumnos/{alumnoId}/   → objeto con id estable
        apellido, nombre, dni, estado, fechaAlta, fechaEgreso, ficha...
  asistencia/{cursoId}/{fecha}/
    _tipo: ''|F|P|L|J            ← sigue siendo a nivel DÍA (un feriado tapa todo el día)
    materias/{materiaId}/
        _registrado: {nombre, ts}
        _notas: '...'
        {alumnoId}: 'P'|'T'|'A'
        just_{alumnoId}: true
        obs_{alumnoId}: '...'
```

**Cambio de fondo importante:** hoy las claves de asistencia se atan a la *posición*
del alumno en el array (`v0` = primer varón). Si ordenamos alfabéticamente eso se rompe.
Por eso paso a **IDs estables por alumno** (`alumnos/{id}`): el orden de pantalla se
calcula por apellido, pero la asistencia histórica nunca se desarma aunque agregues,
ordenes o des de baja alumnos. Es la base para que la lista única funcione bien.

---

## 3. Pantallas y flujo

### Login
Sin cambios de estructura. Solo retoques de texto: ejemplos de placeholder pensados
para secundaria ("Ej: EES N°5", "3°A", etc.).

### Toma de asistencia (vista Docente / Preceptor)
1. Se elige el **día** (navegador de fecha actual).
2. Si el día está marcado Feriado/Paro/Lluvia/Jornada → tapa todo el día (igual que hoy).
3. Si es día normal, aparece la lista de **materias del curso**. El usuario toca
   **"+ Tomar asistencia"** y elige una materia de la lista.
4. Para esa materia se despliega la grilla de alumnos (lista única alfabética) con los
   botones P → T → A y el botón "Justificar" sobre las ausencias. Idéntico al actual.
5. Se pueden registrar **varias materias el mismo día**; cada una guarda su propia toma,
   sus observaciones y sus "notas de la clase".
6. Indicador visual de qué materias del día ya tienen asistencia tomada.

### Resumen, Calendario, Fichas
- **Resumen:** pasa a mostrar estadística **por materia** + un **consolidado del alumno**
  (ver sección 4).
- **Calendario:** un día queda "con clase" si tiene al menos una materia registrada.
- **Ficha del alumno:** se conserva; se la adapta a campos de secundaria (apellido,
  nombre, DNI, legajo opcional, contacto/tutor, estado).

---

## 4. Cómo se calculan las estadísticas (el punto delicado)

Al pasar de "1 registro por día" a "N materias por día", el % de asistencia necesita
una definición clara. Propongo:

- **Por materia:** `% = (P + T) / clases dictadas de esa materia`. Sirve para ver
  regularidad materia por materia (muy útil en técnicas con talleres).
- **Consolidado del alumno:** suma de presencias en todas las materias sobre el total de
  clases-materia registradas. Es un % global ponderado por carga horaria, más cercano al
  espíritu de las inasistencias por materia de secundaria.
- Se conservan las **alertas** (amarilla < 80 %, roja < 70 %) sobre el consolidado.
- **Media falta por tardanza (T):** hoy "T" cuenta como asistencia. Si en PBA querés que
  la llegada tarde compute como **media falta**, lo ajusto en el cálculo. → *Punto abierto A.*

Todos los exportes (informe individual, comunicado a familia, resumen grupal) se rehacen
para contemplar materias. Es la parte que más trabajo lleva.

---

## 5. Adaptaciones específicas de secundaria PBA

- Se elimina por completo el grupo **Domiciliarios** (propio de especial).
- Terminología: "Curso" admite división (3°A, 6°2da); "materias" incluye talleres/módulos
  para técnicas.
- Feriados argentinos ya cargados se mantienen; los **días no laborables** manuales
  (asuetos provinciales, jornadas) siguen disponibles.
- Roles iguales: Docente, Preceptor, Directivo, Admin.

---

## 6. Puntos abiertos a decidir (no me bloquean, pero los necesito antes de cerrar)

- **A. Tardanza (T):** ¿cuenta como asistencia (como hoy) o como **media falta**?
- **B. Asignación docente:** en secundaria un docente da *materias*, no el curso entero.
  ¿Querés que cada docente vea solo *sus materias* (asignación docente↔materia), o el
  modelo simple actual donde el docente toma de todo el curso y el preceptor también?
- **C. Carga de materias:** ¿se cargan desde el rol Admin al crear el curso, o cualquier
  preceptor/docente puede agregar materias sobre la marcha?
- **D. Migración:** ¿esto arranca como institución nueva (base limpia) o hay que migrar
  datos ya cargados del sistema de especiales?

---

## 7. Plan de trabajo por etapas

1. **Base y modelo de datos** — lista única con IDs estables + estructura `materias`.
2. **Toma por materia** — selector "elegir materia al momento" + grilla reutilizada.
3. **Estadísticas** — por materia + consolidado del alumno.
4. **Exportes PDF** — informe individual, comunicado y resumen grupal con materias.
5. **Vistas Preceptor / Directivo / Admin** — adaptadas a la nueva estructura.
6. **Pruebas** — alta de curso, materias, toma en varios días/materias, % y PDFs.

> Cuando me confirmes los puntos A–D (o me digas "arrancá con los valores por defecto"),
> empiezo a construir el `index.html` adaptado.
