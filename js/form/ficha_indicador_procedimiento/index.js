//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
    console.log(route(_path_controller_ficha_indicador_procedimiento + ".grilla"))
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_ficha_indicador_procedimiento).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_ficha_indicador_procedimiento + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            {
                data: 'codigo',
                orderable: false,
                searchable: true
            },
            {
                data: 'descripcion',
                orderable: true,
                searchable: true
            },
            {
                data: 'version',
                orderable: false,
                searchable: true,
            },
            {
                data: 'tipo_accion.descripcion',
                orderable: true,
                searchable: true,
                className: "text-center"
            },
            {
                data: 'estado.descripcion',
                orderable: false,
                searchable: true,
                className: "text-center"
            },

        ],
        order: [
            [1, 'ASC']
        ]
    });

    //-------------------------------------------------------- Horrores Datatable
    $('#dt-' + _path_controller_ficha_indicador_procedimiento).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}


//------------------------------------------------------- VER
$("#btn-ver").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_ficha_indicador_procedimiento);

    if (id != null) {
        form.get(_path_controller_ficha_indicador_procedimiento).ver(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});


//----------------------------------------------------------APROBAR
$("#btn-aprobar").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_ficha_indicador_procedimiento);

    if (id != null) {
        form.get(_path_controller_ficha_indicador_procedimiento).aprobar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});

//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_ficha_indicador_procedimiento).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_ficha_indicador_procedimiento);

    if (id != null) {
        form.get(_path_controller_ficha_indicador_procedimiento).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_ficha_indicador_procedimiento);
    if (id != null) {
        form.get(_path_controller_ficha_indicador_procedimiento).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});

