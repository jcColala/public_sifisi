//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();

    //------------------------------------------------------------- Localstore
    if (localStorage.getItem("usuario")) {
        toastr.success(localStorage.getItem("usuario"), 'Notificación módulo' + _path_controller_usuario)
        setTimeout(deletemsj_localstore("usuario"),100);
    }
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_usuario).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_usuario + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            { data: 'persona.nombres' },
            { data: 'persona.apellido_paterno' },
            { data: 'persona.apellido_materno' },
            { data: 'persona.numero_documento_identidad' },
            { data: 'usuario' },
            {
                data: 'estado',
                orderable: false,
                searchable: false,
                className: "text-center"
            },

        ],
        order: [
            [1, 'ASC'],
            [2, 'ASC'],
            [3, 'ASC'],
            [5, 'ASC']

        ]
    });

    //-------------------------------------------------------- Horrores Datatable
    $('#dt-' + _path_controller_usuario).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}

//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    window.location.href = route(_path_controller_usuario+".create");
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_usuario);

    if (id != null) {
        window.location.href = route(_path_controller_usuario+".edit", id);
    } else {
        alertas.warning("Ups..!");
    }
});

//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_usuario);
    if (id != null) {
        form.get(_path_controller_usuario).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});
