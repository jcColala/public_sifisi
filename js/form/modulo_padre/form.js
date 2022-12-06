const text_icono = (e, obj, _key, _paht) => {
    let valor = $('input:text[name=icono]').val()
    set_icono(_key, valor, _paht)
}

form.register(_path_controller_modulo_padre, {
    nuevo: function() {
        get_modal(_path_controller_modulo_padre, _prefix_modulo_padre)
    },
    editar: function(id) {
        get_modal(_path_controller_modulo_padre, _prefix_modulo_padre, "edit", id)
    },
    eliminar_restaurar: function(id, obj) {
        var $self = this
        let accion__ = obj.getAttribute('data-action')
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_modulo_padre + '.destroy', 'delete'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //loading();
                },
                success: function(response) {
                    //return console.log(response)
                    toastr.success('Registro ' + textaccion__ + ' correctamente', 'Notificación módulo padre')
                    $self.callback(response)
                    init_btndelete()
                },
                complete: function() {
                    //loading("complete");
                },
                error: function(e) {
                    if (e.status == 422) { //Errores de Validacion
                        $.each(e.responseJSON.errors, function(i, item) {
                            if (i == 'referencias') {
                                toastr.warning(item, 'Notificación módulo padre')
                            }

                        });
                    } else {
                        mostrar_errores_externos(e)
                    }
                }
            })
        })

    },
    guardar: function() {
        var $self = this;
        let _form = "#form-" + _path_controller_modulo_padre
        let post_data = $(_form).serialize()

        $.ajax({
            url: route(_path_controller_modulo_padre + '.store'),
            type: 'POST',
            data: post_data,
            cache: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                //toastr.success('Datos grabados correctamente','Notificación '+_path_controller_modulo_padre, {"timeOut":500000,"tapToDismiss": false})
                toastr.success('Datos grabados correctamente', 'Notificación módulo padre')
                $self.callback(response)
                close_modal(_path_controller_modulo_padre)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                //Msj($("#descripcion"), "Ingrese Descripcion ","","above",false)
                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_modulo_padre);
                    $.each(e.responseJSON.errors, function(i, item) {
                        $('#' + i + "_" + _prefix_modulo_padre).addClass('is_invalid');
                        $('.' + i + "_" + _prefix_modulo_padre).removeClass('d-none');
                        $('.' + i + "_" + _prefix_modulo_padre).attr('data-content', item);
                        $('.' + i + "_" + _prefix_modulo_padre).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_modulo_padre + " .msj_error_exist").first().popover('show');


                } else {
                    mostrar_errores_externos(e)
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_modulo_padre);
    }
});
