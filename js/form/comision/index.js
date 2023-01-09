//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_comision).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_comision + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            {
                data: 'idcreador',
                orderable: true,
                searchable: true
            },
            {
                data: 'descripcion',
                orderable: true,
                searchable: true
            },
            {
                data: 'resolucion',
                orderable: true,
                searchable: true
            },
            {
                data: 'fecha_inicio',
                orderable: true,
                searchable: true
            },
            {
                data: 'fecha_fin',
                orderable: true,
                searchable: true
            },
            {
                data: 'estado',
                orderable: true,
                searchable: true
            }

        ],
        order: [
            [1, 'ASC']
        ]
    });

    //-------------------------------------------------------- Horrores Datatable
    $('#dt-' + _path_controller_comision).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}

//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_comision).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_comision);

    if (id != null) {
        form.get(_path_controller_comision).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});

//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_comision);
    if (id != null) {
        form.get(_path_controller_comision).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});