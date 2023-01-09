//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_tipo_entidad).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_tipo_entidad + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            {
                data: 'descripcion',
                orderable: false,
                searchable: true,
            },
            {
                data: 'estado',
                orderable: false,
                searchable: true,  
                className: "text-center"
            },
            {
                data: 'activo',
                orderable: false,
                searchable: true, 
                className: "text-center" 
            }

        ],
        order: [
            [1, 'ASC']
        ]
    });

    //-------------------------------------------------------- Horrores Datatable
    $('#dt-' + _path_controller_tipo_entidad).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}

//------------------------------------------------------- VER
$("#btn-ver").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_tipo_entidad);

    if (id != null) {
        form.get(_path_controller_tipo_entidad).ver(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------- APROBAR
$("#btn-aprobar").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_tipo_entidad);

    if (id != null) {
        form.get(_path_controller_tipo_entidad).aprobar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_tipo_entidad).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_tipo_entidad);

    if (id != null) {
        form.get(_path_controller_tipo_entidad).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_tipo_entidad);
    if (id != null) {
        form.get(_path_controller_tipo_entidad).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});
