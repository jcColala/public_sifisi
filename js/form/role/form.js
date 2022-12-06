
form.register(_path_controller_role, {
    nuevo: function() {
        get_modal(_path_controller_role, _prefix_role)
    },
    editar: function(id) {
        get_modal(_path_controller_role, _prefix_role, "edit", id)
    },
    eliminar_restaurar: function(id, obj) {
        var $self = this
        let accion__ = obj.getAttribute('data-action')
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_role + '.destroy', 'delete'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //loading();
                },
                success: function(response) {
                    //return console.log(response)
                    toastr.success('Registro ' + textaccion__ + ' correctamente', 'Notificación módulo rol')
                    $self.callback(response)
                    init_btndelete()
                },
                complete: function() {
                    //loading("complete");
                },
                error: function(e) {
                    mostrar_errores_externos(e)
                }
            })
        })

    },
    guardar: function() {
        var $self = this;
        let _form = "#form-" + _path_controller_role
        let post_data = $(_form).serialize()

        $.ajax({
            url: route(_path_controller_role + '.store'),
            type: 'POST',
            data: post_data,
            cache: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                toastr.success('Datos grabados correctamente', 'Notificación módulo rol')
                $self.callback(response)
                close_modal(_path_controller_role)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                //Msj($("#descripcion"), "Ingrese Descripcion ","","above",false)
                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_role);
                    $.each(e.responseJSON.errors, function(i, item) {
                        $('#' + i + "_" + _prefix_role).addClass('is_invalid');
                        $('.' + i + "_" + _prefix_role).removeClass('d-none');
                        $('.' + i + "_" + _prefix_role).attr('data-content', item);
                        $('.' + i + "_" + _prefix_role).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_role + " .msj_error_exist").first().popover('show');


                } else {
                    mostrar_errores_externos(e)
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_role);
    }
});
