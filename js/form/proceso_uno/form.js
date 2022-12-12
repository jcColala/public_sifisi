const text_icono = (e, obj, _key, _paht) => {
    let valor = $('input:text[name=icono]').val()
    set_icono(_key, valor, _paht)
}

form.register(_path_controller_proceso_uno, {
    nuevo: function() {
        get_modal(_path_controller_proceso_uno,_prefix_proceso_uno)
    },
    editar: function(id) {
        get_modal(_path_controller_proceso_uno, _prefix_proceso_uno, "edit", id)
    },
    aprobar: function(id){
        var $self = this
        let accion__ = 'aprobar'
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_proceso_uno + '.destroy', 'aprobar'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //LOADING PAGE
                },
                success: function(response) {
                    //return console.log(response)
                    if(response.type == "error"){
                        toastr.error(response.text)
                        $self.callback(response)
                        return init_btndelete()
                    }
                    
                    toastr.success('Registro ' + textaccion__ + ' correctamente')
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
                                toastr.warning(item, 'Notificación tipo_procesoes')
                            }

                        });
                    }
                    if (e.status == 419) { //Errores de Sesión
                        console.log(msj_sesion);
                    } else if (e.status == 500) {
                        console.log((e.responseJSON.message) ? msj_soporte : ' ');
                    }
                }
            })
        })
    },
    eliminar_restaurar: function(id, obj) {
        var $self = this
        let accion__ = obj.getAttribute('data-action')
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_proceso_uno + '.destroy', 'delete'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //loading();
                },
                success: function(response) {
                    toastr.success('Registro ' + textaccion__ + ' correctamente', 'Notificación Procesos Nivel Cero')
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
                                toastr.warning(item, 'Notificación Procesos Nivel Cero')
                            }

                        });
                    }
                    if (e.status == 419) { //Errores de Sesión
                        console.log(msj_sesion);
                    } else if (e.status == 500) {
                        console.log((e.responseJSON.message) ? msj_soporte : ' ');
                    }
                }
            })
        })

    },
    guardar: function() {
        var $self = this;
        let _form = "#form-" + _path_controller_proceso_uno
        let post_data = $(_form).serialize()

        $.ajax({
            url: route(_path_controller_proceso_uno + '.store'),
            type: 'POST',
            data: post_data,
            cache: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                //toastr.success('Datos grabados correctamente','Notificación '+_path_controller_proceso_uno, {"timeOut":500000,"tapToDismiss": false})
                toastr.success('Datos grabados correctamente', 'Notificación Procesos Nivel Cero')
                $self.callback(response)
                close_modal(_path_controller_proceso_uno)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                //Msj($("#descripcion"), "Ingrese Descripcion ","","above",false)
                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_proceso_uno);
                    $.each(e.responseJSON.errors, function(i, item) {
                        $('#' + i+"_"+_prefix_proceso_uno).addClass('is_invalid');
                        $('.' + i+"_"+_prefix_proceso_uno).removeClass('d-none');
                        $('.' + i+"_"+_prefix_proceso_uno).attr('data-content', item);
                        $('.' + i+"_"+_prefix_proceso_uno).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_proceso_uno + " .msj_error_exist").first().popover('show');


                } else if (e.status == 419) {
                    console.log(msj_sesion);
                } else if (e.status == 500) {
                    console.log((e.responseJSON.message) ? msj_soporte : ' ');
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_proceso_uno);
    }
});
