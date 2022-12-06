//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_modulo).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_modulo + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            {
                data: 'padre.descripcion',
                orderable: false,

            },
            {
                data: 'modulopadre.modulo',
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    if (data) {
                        return data
                    }
                    return '';
                }
            },
            { data: 'modulo', name: 'modulo' },
            { data: 'url', name: 'url' },
            {
                data: 'icono',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            { data: 'orden', name: 'orden', className: "text-center" },
            {
                data: 'estado',
                orderable: false,
                searchable: false,
                className: "text-center"
            },

        ],
        order: [
            [1, 'ASC'],
            [3, 'ASC']
        ]
    });

    //-------------------------------------------------------- Horrores Datatable
    $('#dt-' + _path_controller_modulo).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}

//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_modulo).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_modulo);

    if (id != null) {
        form.get(_path_controller_modulo).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});

//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_modulo);
    if (id != null) {
        form.get(_path_controller_modulo).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});
