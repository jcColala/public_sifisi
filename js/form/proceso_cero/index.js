//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_proceso_cero).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_proceso_cero + ".grilla"),
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
                data: 'codigo',
                orderable: false,
                searchable: true,
                className: "text-center"

            },
            {
                data: 'tipo_proceso.descripcion',
                orderable: true,
                searchable:true,
                className: "text-center"
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
    $('#dt-' + _path_controller_proceso_cero).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}
//------------------------------------------------------- VER
$("#btn-ver").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_proceso_cero);

    if (id != null) {
        form.get(_path_controller_proceso_cero).ver(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});

//-----------------------------------------------------APROBAR
$("#btn-aprobar").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_proceso_cero);

    if (id != null) {
        form.get(_path_controller_proceso_cero).aprobar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});

//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_proceso_cero).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_proceso_cero);

    if (id != null) {
        form.get(_path_controller_proceso_cero).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_proceso_cero);
    if (id != null) {
        form.get(_path_controller_proceso_cero).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});
