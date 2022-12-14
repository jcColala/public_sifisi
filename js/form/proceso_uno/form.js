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
    ver: function(id) {
        get_modal(_path_controller_proceso_uno, _prefix_proceso_uno, "ver", id)
        
    },
    aprobar: function(id){
        var $self = this
        let accion__ = 'aprobar'
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {
            $.ajax({
                url: route(_path_controller_proceso_uno + '.aprobar'),
                data: { id: id, accion: accion__ },
                type: 'POST',
                beforeSend: function() {
                    //LOADING PAGE
                },
                success: function(response) {
                    //return console.log(response)
                    if(response.idestado == 2){
                        toastr.error("No se puede realizar la acción en un registro que no se encuentra en estado pendiente")
                        $self.callback(response)
                        return init_btndelete()
                    }
                    
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
                                toastr.warning(item, 'Notificación Entidades')
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
        
        var formData = new FormData();
        formData.append('id', $('#id_').val());
        formData.append('idpersona_solicita', $('#idpersona_solicita_').val());
        formData.append('idproceso_cero', $('#idproceso_cero_').val());
        formData.append('codigo', $('#codigo_hidde_').val());
        formData.append('descripcion', $('#descripcion_').val());
        formData.append('version', $('#version_').val());
        formData.append('fecha_aprobado', $('#fecha_aprobado_').val());
        //formData.append('diagrama', $('#diagrama_')[0].files[0]);
        //formData.append('documento', $('#documento_')[0].files[0]);

        /* ---------ID INDICADOR */
            var id_indicador = new Array();
            $("input[name='id_indicador']").each(function(){
              id_indicador.push($(this).val())
            });

            for (var i = 0; i < id_indicador.length; i++) {
                formData.append('id_indicador['+i+']', id_indicador[i]);
            }

        /* ---------CODIGO INDICADOR */
            var codigo_indicador = new Array();
            $("input[name='codigo_indicador']").each(function(){
              codigo_indicador.push($(this).val())
            });

            for (var i = 0; i < codigo_indicador.length; i++) {
                formData.append('codigo_indicador['+i+']', codigo_indicador[i]);
            }

        /* ---------DESCRIPCION INDICADOR */
            var descripcion_indicador = new Array();
            $("input[name='descripcion_indicador']").each(function(){
              descripcion_indicador.push($(this).val())
            });

            for (var i = 0; i < descripcion_indicador.length; i++) {
                formData.append('descripcion_indicador['+i+']', descripcion_indicador[i]);
            }

        /* ---------ID PROCEDIMIENTO */
            var id_procedimiento = new Array();
            $("input[name='id_procedimiento']").each(function(){
              id_procedimiento.push($(this).val())
            });

            for (var i = 0; i < id_procedimiento.length; i++) {
                formData.append('id_procedimiento['+i+']', id_procedimiento[i]);
            }

        /* ---------CODIGO PROCEDIMIENTO */
            var codigo_procedimiento = new Array();
            $("input[name='codigo_procedimiento']").each(function(){
              codigo_procedimiento.push($(this).val())
            });

            for (var i = 0; i < codigo_procedimiento.length; i++) {
                formData.append('codigo_procedimiento['+i+']', codigo_procedimiento[i]);
            }

        /* ---------DESCRIPCION PROCEDIMIENTO */
            var descripcion_procedimiento = new Array();
            $("input[name='descripcion_procedimiento']").each(function(){
              descripcion_procedimiento.push($(this).val())
            });

            for (var i = 0; i < descripcion_procedimiento.length; i++) {
                formData.append('descripcion_procedimiento['+i+']', descripcion_procedimiento[i]);
            }

        $.ajax({
            url: route(_path_controller_proceso_uno + '.store'),
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,

            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                if(response.type == "error"){
                    toastr.error(response.text)
                    $self.callback(response)
                    return close_modal(_path_controller_proceso_cero)
                }
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
