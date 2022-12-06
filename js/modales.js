//------------------------------------------------------------- Variables globales
let selected = ""
let data_form = ""
let btn_el_rest = "#btn-destroy"
let msj_sesion = "La sesión ya expiró, por favor cierre sesión y vuelva a ingresar."
let msj_soporte = "Hubo problemas internos, por favor comunicate de inmediato con SOPORTE."
let msj_accesos = "Lo sentimos, usted no tiene los permisos para realizar dicha acción."
let msj_denegada = "El registro actual no tiene las opciones de editar y eliminar."
csrf_token($('meta[name="csrf-token"]').attr('content'))


//------------------------------------------------------------- Csrf token
function csrf_token(csrf_token) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': csrf_token
        }
    });
}

//------------------------------------------------------------- Borrar localStore
const deletemsj_localstore = (id) => {
    localStorage.removeItem(id);
}

//------------------------------------------------------------- Cambiar tema
$(".cambiar_tema").on("click", function(e) {
    let actual = ($("#body").attr("data-tema") == 1) ? 2 : 1
    $.ajax({
        url: route('tema', actual),
        type: 'GET',
        cache: false,
        processData: false,
        beforeSend: function() {

        },
        success: function(response) {
            $("#body").removeClass("dark-mode")
            $("#body").attr("data-tema", actual)
            if (actual == 2)
                $("#body").addClass("dark-mode")
        },
        complete: function() {

        },
        error: function(e) {
            if (e.status == 419) {
                console.log(msj_sesion);
            } else if (e.status == 500) {
                console.log((e.responseJSON.message) ? msj_soporte : '');
            }
        }
    });
})

//------------------------------------------------------------- Select tr
$(".databale").on('click', 'tr', function(e) {
    selected = table.row(this).data();

    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');

        if (document.querySelectorAll(btn_el_rest).length && table.row(this).data() != undefined)
            init_btndelete()
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');

        //selecionar el estado
        if (document.querySelectorAll(btn_el_rest).length && table.row(this).data() != undefined) {
            $(btn_el_rest).attr("class", "")
            if(table.row(this).data()["editable"] != undefined){
                if (!table.row(this).data()["editable"]) {
                    setTimeout(function() { table.$('tr.selected').removeClass('selected') }, 600)
                    init_btndelete()
                    return alertas.warning("Acción denegada!", msj_denegada);
                }
            }
            if (table.row(this).data()["deleted_at"] == null) {
                $(btn_el_rest).html("<i class='fe fe-trash bt_grilla text-primary-shadow'></i> &nbsp;Eliminar&nbsp;")
                $(btn_el_rest).attr("data-action", " eliminar")
                $(btn_el_rest).addClass("btn btn-outline-danger")
            } else {
                $(btn_el_rest).html('<i class="fe fe-rotate-ccw bt_grilla text-primary-shadow"></i>Restaurar')
                $(btn_el_rest).attr("data-action", "restaurar")
                $(btn_el_rest).addClass("btn btn-outline-success")

            }
        }
    }

})

//------------------------------------------------------------- Alertas
var alertas = function() {

    function warning(titulo = '', texto = 'Seleccione un registro.', tipo = 'warning', texto_bnt = 'Entendido') {
        swal({
            title: titulo,
            text: texto,
            type: tipo,
            confirmButtonText: texto_bnt
        })
    }
    return { warning: warning };

}();

//------------------------------------------------------------- Grilla
var grilla = function() {

    function _get_real_id(idobject) {
        if ($("table[realid='" + idobject + "']").length == 1) {
            var table = "dt-" + idobject;

            var realId = "#" + table;

            if ($.fn.DataTable.isDataTable(realId)) {
                return table;
            } else {
                console.log(idobject + " podria no ser una instancia de DataTables");
            }
        } else {
            console.log("El objeto DOM no existe o existe mas de una instancia para " + idobject);
        }

        return false;
    }

    function get_data(idobject, iRow) {
        var table = _get_real_id(idobject);

        if (table !== false) {
            var api = $("#" + table).DataTable();

            if (iRow === undefined) {
                //console.log(api);
                if (api.$("tr.selected").length) {
                    iRow = api.$("tr.selected");
                } else if (api.$("tr.DTTT_selected[role='row']").length) {
                    iRow = api.$("tr.DTTT_selected[role='row']");
                }
            }

            if (iRow !== undefined) {
                return api.row(iRow).id() || null;
            }
        }
        return null;
    }

    function get_id(idobject, iRow) {
        var row = get_data(idobject, iRow);

        if (row != null) {
            return row;
        }
        return null;
    }

    function reload(idobject, bool) {
        var table = _get_real_id(idobject);
        if (typeof bool != 'boolean')
            bool = true;

        if (table !== false) {
            $("#" + table).DataTable().draw(bool);
        }
    }

    return { get_id: get_id, get_data: get_data, reload: reload };

}();

//------------------------------------------------------------- Modal
var form = function() {
    var aControllers = [];

    function clearfix(keyvar) {
        keyvar = $.trim(keyvar);
        keyvar = keyvar.replace(/\W+/g, "");
        keyvar = keyvar.replace(/\s+/g, "");
        return keyvar;
    }

    function register(key, val, replace) {
        key = clearfix(key);

        if (typeof replace != "boolean")
            replace = false;

        if (key != "") {
            if (replace === true) { // nueva asignacion
                aControllers[key] = val;
            } else if (!(key in aControllers)) { // no existe el registro
                aControllers[key] = val;
            } else if (!$.isPlainObject(val)) { // no es un objeto
                aControllers[key] = val;
            } else if ($.isEmptyObject(val)) { // objeto esta vacio
                aControllers[key] = val;
            } else { // extendemos nomas
                var object = $.extend({}, get(key), val);
                aControllers[key] = object;
            }
        }
    }

    function get(key) {
        key = clearfix(key);
        if (!(key in aControllers)) {
            console.log("key " + key + " not found");
            return {};
        }

        return aControllers[key];
    }

    return { register: register, get: get }
}();


//------------------------------------------------------------- Abrir modal
const get_modal = (_paht, _prefix, funcion = "create", id = null) => {

    $.ajax({
        url: route(_paht + "." + funcion, id),
        type: 'GET',
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            $("#div_md-" + _paht).html(response)

            if (data_form.length != 0) {
                $.each(data_form, function(key, val) {
                    $("#" + key + "_" + _prefix, "#form-" + _paht).val(val)

                    if (key == "icono" | key == "icon")
                        set_icono(key, val, _paht)
                })
                if (typeof init === 'function')
                    init()
            }
        },
        complete: function() {
            $("#md-" + _paht).modal('toggle')
        },
        error: function(e) {
            $("#div_md-" + _paht).html('')

            if (e.status == 419) {
                console.log(msj_sesion);
            } else if (e.status == 500) {
                console.log((e.responseJSON.message) ? msj_soporte : ' ');
            } else if (e.status == 403) {
                toastr.warning(msj_accesos, 'Notificación accesos')
            }
        }
    });
}

//------------------------------------------------------------- Cerrar modal
const close_modal = (_paht) => {
    $("#md-" + _paht).modal("hide")
}
//------------------------------------------------------------- Acciones modal
const md_guardar = (e, obj) => {
    e.preventDefault()
    let accion = ($("#" + obj).attr('data-acciones')).split('-')
    form.get(accion[1]).guardar()
}

//------------------------------------------------------------- Selec icono
const selecionar_icono = (e, obj, __key, __paht, id_icono, __prefix) => {
    let class_icono = obj.getElementsByTagName("i")[0].getAttribute('class')
    set_icono(__key, class_icono, __paht)
    $("#" + id_icono + "_" + __prefix).val(class_icono)
}

//------------------------------------------------------------- Ver icono
const set_icono = (_key, _icono, _paht) => {
    $("#form-" + _key + "-" + _paht).attr('class', '')
    $("#form-" + _key + "-" + _paht).addClass(_icono)
}

//------------------------------------------------------------- Limpieza
const limpieza = (_paht) => {
    id = "#form-" + _paht

    $("#form-" + _paht + " .msj_error_exist").first().popover('hide');
    $(id + " .msj_error").addClass("d-none");
    $(id + " .msj_error").removeClass("msj_error_exist");
    $(id + " input").removeClass("is_invalid");
    $(id + ' .select2-is_invalid').removeClass('select2-is_invalid');

}

const init_btndelete = () => {
    if (document.querySelectorAll(btn_el_rest).length) {
        $(btn_el_rest).attr("class", "")
        $(btn_el_rest).html("<i class='fe fe-circle bt_grilla text-primary-shadow'></i> Elim/Rest")
        $(btn_el_rest).attr("data-action", "")
        $(btn_el_rest).addClass("btn btn-outline-default")
    }
}


const mostrar_errores_externos = (e) => {
    if (e.status == 419) {
        console.log(msj_sesion);
    } else if (e.status == 500) {
        console.log((e.responseJSON.message) ? msj_soporte : ' ');
    } else if (e.status == 403) {
        toastr.warning(msj_accesos, 'Notificación accesos')
    }
}