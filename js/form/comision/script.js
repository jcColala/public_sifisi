//------------------------------------------------------------- Variables globales
var especiales_ = "N"
var array_responsables = []

//------------------------------------------------------------- Focus
$("#form-" + _path_controller_comision + " input").on("focus", function(e) {
    $("#form-" + _path_controller_comision + " .msj_error_exist").first().popover('hide')
})

//------------------------------------------------------------- Focus
$("#form-" + _path_controller_comision + " .tabs-menu").on("click", function(e) {
    $("#form-" + _path_controller_comision + " .msj_error_exist").first().popover('hide')
})

//------------------------------------------------------------- Especiales
$("#especiales_" + _prefix_comision).on("change", function(e) {
    e.preventDefault();
    especiales_ = especiales_ == "N" ? "S" : "N"
})

//------------------------------------------------------------- Autocomplete
if ($("#autocomplete").length) {
    new Autocomplete('#autocomplete', {

        search: input => {

            return new Promise(resolve => {
                if (input.length < 2) {
                    return resolve([])
                }

                fetch(route("persona.buscar", encodeURI(input)))
                    .then(response => response.json())
                    .then(data => {
                        const results = data.search.map((result, index) => {
                            return { ...result, index }
                        })
                        resolve(results)
                    })
            })
        },

        renderResult: (result, props) => {
            return `
          <li ${props}>
            <div class="wiki-title">
              ${result.numero_documento_identidad}
            </div>
            <div class="wiki-snippet">
                ${result.apellido_paterno} ${result.apellido_materno} ${result.nombres} 
            </div>
          </li>`
        },

        getResultValue: result => result.apellido_paterno + ' ' + result.apellido_materno + ' ' + result.nombres,
        onSubmit: result => {
            var evento = window.event || event
            evento.preventDefault()
            var data = []
            data["item"] = { id: result.id, numero_documento: result.numero_documento_identidad, nombres: result.apellido_paterno + ' ' + result.apellido_materno + ' ' + result.nombres, presidente: 'N' }
            array_responsables.push(data)
            document.getElementById("table_responsable").innerHTML = ""
            crear_tabla()
            setTimeout(limpiar_buscador(), 1);
        }
    })
}

function crear_tabla() {
    var presidente = "";
    const lista = document.querySelector('#table_responsable')
    const template = document.querySelector('#template_responsable').content
    const fragment = document.createDocumentFragment()
    array_responsables.forEach((data, index) => {
        template.querySelector('.nro_responsable').textContent = index + 1;
        template.querySelector('.nrodocumento_responsable').textContent = data.item.numero_documento
        template.querySelector('.nombres_responsable').textContent = data.item.nombres
        template.querySelector('.presidente_responsable input').id = "presidente" + index;
        if (data.item.presidente == "S")
            presidente = index
        template.querySelector('.presidente_responsable input').setAttribute("onchange", "seleccionar_presidente(event," + index + ")");
        template.querySelector('.btn_eliminar').setAttribute("onclick", "eliminar_responsable(event," + index + ")");
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        lista.appendChild(fragment)
    })
    select_presidente(presidente)
}

function select_presidente(id) {
    if (id === "")
        return false
    document.querySelector('#presidente' + id).checked = true;
}

function seleccionar_presidente(e, id) {
    array_responsables.forEach((data, index) => {
        array_responsables[index].item.presidente = 'N'
    })
    array_responsables[id].item.presidente = 'S'
}

function eliminar_responsable(e, id) {
    e.preventDefault()
    array_responsables.splice(id, 1);
    document.getElementById("table_responsable").innerHTML = ""
    crear_tabla()
}

function limpiar_buscador(id) {
    $("#persona_nombres_" + _prefix_comision).val("");
}

function init() {
    if ($("#especiales_" + _prefix_comision).val() == "S")
        $("#forespeciales_" + _prefix_comision).click()

    if (data_responsable.length) {
        data_responsable.forEach((datos, index) => {
            var data = []
            data["item"] = { id: datos.idresponsable, numero_documento: datos.persona.numero_documento_identidad, nombres: datos.persona.apellido_paterno + ' ' + datos.persona.apellido_materno + ' ' + datos.persona.nombres, presidente: datos.presidente }
            array_responsables.push(data)
        })

        //---- Crear tabla
        document.getElementById("table_responsable").innerHTML = ""
        crear_tabla()
    }
}