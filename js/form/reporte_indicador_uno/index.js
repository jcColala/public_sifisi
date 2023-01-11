//------------------------------------------------------------- Cargar al Inicio
$(document).ready(function() {
    load_datatable();
});

//------------------------------------------------------------- Datatable
const load_datatable = () => {
    table = $('#dt-' + _path_controller_reporte_indicador_uno).DataTable({
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,
        ordering: true,
        rowId: "id",
        bJQueryUI: true,
        ajax: route(_path_controller_reporte_indicador_uno + ".grilla"),
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false,
                className: "text-center"
            },
            {
                data: 'proceso_uno.codigo',
                orderable: false,
                searchable: true,
            },
            {
                data: 'proceso_uno.descripcion',
                orderable: false,
                searchable: true,
                className: "text-center"

            },
            {
                data: 'codigo',
                orderable: false,
                searchable: true,  
                className: "text-center"
            },
            {
                data: 'descripcion',
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
    $('#dt-' + _path_controller_reporte_indicador_uno).on('error.dt', function(e, settings, techNote, message) {
        console.log('error ajax: ', message);
    }).DataTable();
}

//------------------------------------------------------- VER
$("#btn-pdf").on("click", function(e){
    e.preventDefault();
    window.open(_path_controller_reporte_indicador_uno+'/pdf', '_blank');
});

//------------------------------------------------------- VER
$("#btn-ver").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_reporte_indicador_uno);

    if (id != null) {
        form.get(_path_controller_reporte_indicador_uno).ver(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------- APROBAR
$("#btn-aprobar").on("click", function(e){
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_reporte_indicador_uno);

    if (id != null) {
        form.get(_path_controller_reporte_indicador_uno).aprobar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Nuevo
$("#btn-create").on("click", function(e) {
    e.preventDefault();
    form.get(_path_controller_reporte_indicador_uno).nuevo();
});

//------------------------------------------------------------- Editar
$("#btn-edit").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_reporte_indicador_uno);

    if (id != null) {
        form.get(_path_controller_reporte_indicador_uno).editar(id);
    } else {
        alertas.warning("Ups..!");
    }
});


//------------------------------------------------------------- Eliminar
$("#btn-destroy").on("click", function(e) {
    e.preventDefault();
    var id = grilla.get_id(_name_tabla_reporte_indicador_uno);
    if (id != null) {
        form.get(_path_controller_reporte_indicador_uno).eliminar_restaurar(id, this);
    } else {
        alertas.warning("Ups..!");
    }
});
