//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_documentos).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_documentos + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            {
                data: 'codigo',
                orderable: true,
                searchable: true
            },
            {
                data: 'descripcion',
                orderable: true,
                searchable: true
            },
            {
                data: 'tipo_accion.descripcion',
                orderable: true,
                searchable: true
            },
            {
                data: 'estado.descripcion',
                orderable: true,
                searchable: true
            },

        ],
        order: [
            [1, 'ASC']
        ]
    });

    //-------------------------------------------------------- Horrores Datatable
    $('#dt-' + _path_controller_documentos).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}

//----------------------------------------------------------APROBAR
$("#btn-aprobar").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_documentos);

    if (id != null) {
        form.get(_path_controller_documentos).aprobar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});

//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_documentos).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_documentos);

    if (id != null) {
        form.get(_path_controller_documentos).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_documentos);
    if (id != null) {
        form.get(_path_controller_documentos).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});
