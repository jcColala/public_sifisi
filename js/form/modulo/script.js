//------------------------------------------------------------- Variables globales
var acceso_directo_ = "N"
var array_funcion = []

//------------------------------------------------------------- Focus
$("#form-" + _path_controller_modulo + " input").on("focus", function(e) {
    $("#form-" + _path_controller_modulo + " .msj_error_exist").first().popover('hide')
})

$(".div-select2").on("click", function(e) {
    $("#form-" + _path_controller_modulo + " .msj_error_exist").first().popover('hide')
})

//------------------------------------------------------------- Acceso directo
$("#acceso_directo_" + _prefix_modulo).on("change", function(e) {
    e.preventDefault();
    acceso_directo_ = acceso_directo_ == "N" ? "S" : "N"
})

//------------------------------------------------------------- modulos padre
$("#idmodulo_padre_" + _prefix_modulo).on("change", function(e) {
    e.preventDefault();
    get_modulos($(this).val())
})

function get_modulos(idmodulo_padre) {
    $.ajax({
        url: route(_path_controller_modulo + '.get_modulos'),
        type: 'GET',
        data: { idmodulo_padre: idmodulo_padre, id: $("#id_" + _prefix_modulo).val() },
        dataType: 'json',
        beforeSend: function() {
            //loading();
        },
        success: function(response) {
            let list = []
            var seleccion__ = -1
            list = "<option label='Selecciona el padre'></option>";
            list += "<option value=' '>Selecciona el padre</option>";

            if (data_form != [])
                seleccion__ = data_form["idpadre"]

            $(response).each(function(key, val) {
                let selected__ = ""
                if (val["id"] == seleccion__)
                    selected__ = "selected"
                list += "<option value='" + val["id"] + "' " + selected__ + " >" + val["modulo"] + "</option>";
            });
            $("#idpadre_" + _prefix_modulo).html(list);
        },
        complete: function() {
            //loading("complete");
        },
        error: function(e) {
            mostrar_errores_externos(e)
        }
    })
}

function select_funcion(event, obj) {
    event.preventDefault()
    let id = parseInt($(obj).val())
    let nombre = $(obj).find(':selected').attr('data-nombre')
    let icono = $(obj).find(':selected').attr('data-icono')
    var data = []
    var comprobar = array_funcion.find(element => (element["item"].id === id)) ? true : false;
    
    if (id == 0 || isNaN(id)) { return false }
    if (comprobar) {
        toastr.error('La funcion ya fue agregada', 'Notificación ' + _path_controller_modulo)
        setTimeout(limpiar_select2(), 1);
        return false
    }

    data["item"] = { id: id, nombre: nombre, icono: icono }
    array_funcion.push(data)

    //---- Crear tabla
    document.getElementById("table_funcion").innerHTML = ""
    crear_tabla()
    setTimeout(limpiar_select2(), 1);
}

function crear_tabla() {
    const lista = document.querySelector('#table_funcion')
    const template = document.querySelector('#template_funcion').content
    const fragment = document.createDocumentFragment()
    array_funcion.forEach((data, index) => {
        template.querySelector('.nro_funcion').textContent = index + 1;
        template.querySelector('.nombre_funcion i').setAttribute("class", data.item.icono)
        template.querySelector('.nombre_funcion span').textContent = data.item.nombre
        template.querySelector('.btn_eliminar').setAttribute("onclick", "eliminar_funcion(event," + index + ")");
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        lista.appendChild(fragment)
    })
}

function eliminar_funcion(e, id) {
    e.preventDefault()
    array_funcion.splice(id, 1);
    document.getElementById("table_funcion").innerHTML = ""
    crear_tabla()
}

function limpiar_select2(id) {
    $("#idfuncion_" + _prefix_modulo).select2("val", 0);
}


function init() {
    if ($("#acceso_directo_" + _prefix_modulo).val() == "S")
        $("#foracceso_directo_" + _prefix_modulo).click()

    if ($("#idmodulo_padre_" + _prefix_modulo).val())
        get_modulos($("#idmodulo_padre_" + _prefix_modulo).val())

    if (funcion_modulo.length) {
        funcion_modulo.forEach((datos, index) => {
            var data = []
            data["item"] = { id: datos.idfuncion, nombre: datos.funcion.nombre, icono: datos.funcion.icono }
            array_funcion.push(data)
        })

        //---- Crear tabla
        document.getElementById("table_funcion").innerHTML = ""
        crear_tabla()
    }
}
