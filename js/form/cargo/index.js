//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_cargo).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_cargo + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            {
                data: 'descripcion',
                orderable: true,
                searchable: true
            },
            {
                data: 'responsable.nombres',
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
    $('#dt-' + _path_controller_cargo).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}

//------------------------------------------------------- VER
$("#btn-ver").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_cargo);

    if (id != null) {
        form.get(_path_controller_cargo).ver(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});

//----------------------------------------------------------APROBAR
$("#btn-aprobar").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_cargo);

    if (id != null) {
        form.get(_path_controller_cargo).aprobar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});

//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_cargo).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_cargo);

    if (id != null) {
        form.get(_path_controller_cargo).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_cargo);
    if (id != null) {
        form.get(_path_controller_cargo).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});
