const text_icono = (e, obj, _key, _paht) => {
    let valor = $('input:text[name=icono]').val()
    set_icono(_key, valor, _paht)
}

form.register(_path_controller_resoluciones, {
    nuevo: function() {
        get_modal(_path_controller_resoluciones,_prefix_resoluciones)
    },
    editar: function(id) {
        get_modal(_path_controller_resoluciones, _prefix_resoluciones, "edit", id)
    },
    ver: function(id) {
        get_modal(_path_controller_resoluciones, _prefix_resoluciones, "ver", id)
        
    },
    aprobar: function(id){
        var $self = this
        let accion__ = 'aprobar'
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {
            $.ajax({
                url: route(_path_controller_resoluciones + '.aprobar'),
                data: { id: id, accion: accion__ },
                type: 'POST',
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
                url: route(_path_controller_resoluciones + '.destroy', 'delete'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //loading();
                },
                success: function(response) {
                    if(response.type == "error"){
                        toastr.error(response.text)
                        $self.callback(response)
                        return close_modal(_path_controller_resoluciones)
                    }
                    
                    toastr.success('Registro ' + textaccion__ + ' correctamente', 'Notificación Procesos Nivel 0')
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
                                toastr.warning(item, 'Notificación Proceso Nivel Cero')
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
        let _form = "#form-" + _path_controller_resoluciones
                var formData = new FormData();
        formData.append('id', $('#id_').val());
        formData.append('idpersona_solicita', $('#idpersona_solicita_').val());
        formData.append('descripcion', $('#descripcion_').val());
        formData.append('fecha_aprobado', $('#fecha_aprobado_').val());
        //formData.append('diagrama', $('#diagrama_')[0].files[0]);
        //formData.append('documento', $('#documento_')[0].files[0]);

        /* ---------ID DOCUMENTO */
            var id_indicador = new Array();
            $("input[name='id_indicador']").each(function(){
              id_indicador.push($(this).val())
            });

            for (var i = 0; i < id_indicador.length; i++) {
                formData.append('id_indicador['+i+']', id_indicador[i]);
            }

        /* ---------CODIGO DOCUMENTO */
            var codigo_documento = new Array();
            $("input[name='codigo_documento']").each(function(){
              codigo_documento.push($(this).val())
            });

            for (var i = 0; i < codigo_documento.length; i++) {
                formData.append('codigo_documento['+i+']', codigo_documento[i]);
            }

        /* ---------DESCRIPCION DOCUMENTO */
            var descripcion_documento = new Array();
            $("input[name='descripcion_documento']").each(function(){
              descripcion_documento.push($(this).val())
            });

            for (var i = 0; i < descripcion_documento.length; i++) {
                formData.append('descripcion_documento['+i+']', descripcion_documento[i]);
            }

        /* ---------VERSION DOCUMENTO */
            var version_documento = new Array();
            $("input[name='version_documento']").each(function(){
              version_documento.push($(this).val())
            });

            for (var i = 0; i < version_documento.length; i++) {
                formData.append('version_documento['+i+']', version_documento[i]);
            }

        /* ---------ARCHIVO DOCUMENTO 
            var archivo_documento = new Array();
            $("input[name='archivo_documento']").each(function(){
              archivo_documento.push($(this).val())
            });

            for (var i = 0; i < archivo_documento.length; i++) {
                formData.append('archivo_documento['+i+']', archivo_documento[i]);
            }*/

        $.ajax({
            url: route(_path_controller_resoluciones + '.store'),
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                //toastr.success('Datos grabados correctamente','Notificación '+_path_controller_resoluciones, {"timeOut":500000,"tapToDismiss": false})}
                if(response.type == "error"){
                    toastr.error(response.text)
                    $self.callback(response)
                    return close_modal(_path_controller_resoluciones)
                }
                toastr.success('Datos grabados correctamente', 'Notificación Procesos Nivel Cero')
                $self.callback(response)
                close_modal(_path_controller_resoluciones)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                //Msj($("#descripcion"), "Ingrese Descripcion ","","above",false)
                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_resoluciones);
                    $.each(e.responseJSON.errors, function(i, item) {
                        $('#' + i+"_"+_prefix_resoluciones).addClass('is_invalid');
                        $('.' + i+"_"+_prefix_resoluciones).removeClass('d-none');
                        $('.' + i+"_"+_prefix_resoluciones).attr('data-content', item);
                        $('.' + i+"_"+_prefix_resoluciones).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_resoluciones + " .msj_error_exist").first().popover('show');


                } else if (e.status == 419) {
                    console.log(msj_sesion);
                } else if (e.status == 500) {
                    console.log((e.responseJSON.message) ? msj_soporte : ' ');
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_resoluciones);
    }
});
